"""
Phase 2: can an open-vocabulary model find things in a painting?

This is the only question worth answering before building anything. Gemini could
not: asked for "the girl" on this canvas it returned an error, asked for "the
woman in the bottom" it returned something random, and one answer in six was
usable. The painting used here is that same one — two figures, one of them
inverted, limbs crossing the frame — so the comparison is like for like.

Two models, loaded one at a time because the card holds about 7 GB:

    Grounding DINO   text  -> boxes     (Apache 2.0)
    SAM 2.1 Small    box   -> mask      (Apache 2.0)

Writes a panel per label into out/ so the result is judged by eye rather than by
a number, which is the only way to judge a cut.

Usage:  .venv\\Scripts\\python spike\\isolate.py [path-to-image]
"""

from __future__ import annotations

import sys
import time
from pathlib import Path

import torch
from PIL import Image, ImageDraw
from transformers import (
    GroundingDinoForObjectDetection,
    GroundingDinoProcessor,
    Sam2Model,
    Sam2Processor,
)

HERE = Path(__file__).resolve().parent
OUT = HERE.parent / "out"
MODELS = HERE.parent / "models"

DINO = "IDEA-Research/grounding-dino-base"
SAM = "facebook/sam2.1-hiera-small"

# The things that defeated the old approach, plus two that should be easy, so a
# total failure can be told apart from a failure on the hard ones.
LABELS = [
    "a girl",
    "a woman",
    "a face",
    "blonde hair",
    "a blue shirt",
    "a green field",
    "an arm",
]

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"


def vram(note: str) -> None:
    if DEVICE != "cuda":
        return
    free, total = torch.cuda.mem_get_info()
    peak = torch.cuda.max_memory_allocated() / 2**20
    print(f"    [vram] {note}: {(total - free) / 2**20:,.0f} MiB in use, " f"peak alloc {peak:,.0f} MiB")


def find_boxes(image: Image.Image) -> dict[str, tuple[list[float], float]]:
    """Every label asked for on its own, which is what worked before.

    Grounding DINO takes several phrases at once, but one at a time gives a
    clean score per label and costs a second each. The old lesson — that asking
    for everything in one request tangled the answers — came from a different
    kind of model, but one label per call is still the honest way to read which
    ones it actually knows.
    """
    processor = GroundingDinoProcessor.from_pretrained(DINO, cache_dir=MODELS)
    model = GroundingDinoForObjectDetection.from_pretrained(DINO, cache_dir=MODELS).to(DEVICE)
    model.eval()
    vram("grounding dino loaded")

    found: dict[str, tuple[list[float], float]] = {}
    for label in LABELS:
        started = time.perf_counter()
        # Grounding DINO wants lower case ending in a full stop.
        inputs = processor(images=image, text=f"{label}.", return_tensors="pt").to(DEVICE)
        with torch.no_grad():
            outputs = model(**inputs)

        results = processor.post_process_grounded_object_detection(
            outputs,
            inputs.input_ids,
            threshold=0.25,
            text_threshold=0.25,
            target_sizes=[(image.height, image.width)],
        )[0]

        took = time.perf_counter() - started
        scores = results["scores"]
        if len(scores) == 0:
            print(f"  {label:<16} nothing found            ({took:.1f}s)")
            continue

        best = int(scores.argmax())
        box = [round(v, 1) for v in results["boxes"][best].tolist()]
        score = float(scores[best])
        print(f"  {label:<16} {score:.3f}  {len(scores)} box(es)  {box}  ({took:.1f}s)")
        found[label] = (box, score)

    del model
    if DEVICE == "cuda":
        torch.cuda.empty_cache()
    vram("grounding dino freed")
    return found


def cut_masks(image: Image.Image, found: dict[str, tuple[list[float], float]]):
    """One box in, one mask out, the best of the three SAM offers."""
    processor = Sam2Processor.from_pretrained(SAM, cache_dir=MODELS)
    model = Sam2Model.from_pretrained(SAM, cache_dir=MODELS).to(DEVICE)
    model.eval()
    vram("sam 2.1 loaded")

    masks: dict[str, tuple[torch.Tensor, list[float], float]] = {}
    for label, (box, score) in found.items():
        started = time.perf_counter()
        inputs = processor(images=image, input_boxes=[[box]], return_tensors="pt").to(DEVICE)
        with torch.no_grad():
            outputs = model(**inputs, multimask_output=True)

        # Three candidates per box; SAM's own iou estimate picks the one to keep.
        best = int(outputs.iou_scores[0, 0].argmax())
        mask = processor.post_process_masks(
            outputs.pred_masks.cpu(), inputs["original_sizes"].cpu()
        )[0][0][best]
        iou = float(outputs.iou_scores[0, 0, best])
        took = time.perf_counter() - started
        covered = float(mask.float().mean()) * 100
        print(f"  {label:<16} iou {iou:.3f}  covers {covered:5.1f}% of the canvas  ({took:.1f}s)")
        masks[label] = (mask, box, score)

    del model
    if DEVICE == "cuda":
        torch.cuda.empty_cache()
    vram("sam freed")
    return masks


def draw(image: Image.Image, label: str, mask, box: list[float], score: float) -> Image.Image:
    """The painting dimmed, the cut shown bright through it, the box outlined."""
    import numpy as np

    dimmed = Image.blend(image, Image.new("RGB", image.size, (0, 0, 0)), 0.62)
    lit = Image.composite(image, dimmed, Image.fromarray((mask.numpy() * 255).astype(np.uint8)))

    pen = ImageDraw.Draw(lit)
    pen.rectangle(box, outline=(0, 255, 136), width=3)
    caption = f"{label}   dino {score:.2f}"
    pen.rectangle([0, 0, 8 + 7 * len(caption), 26], fill=(0, 0, 0))
    pen.text((6, 7), caption, fill=(0, 255, 136))
    return lit


def main() -> int:
    source = Path(sys.argv[1]) if len(sys.argv) > 1 else None
    if source is None or not source.exists():
        print(f"usage: python {Path(__file__).name} <image>")
        return 2

    image = Image.open(source).convert("RGB")
    OUT.mkdir(exist_ok=True)
    print(f"painting: {source.name}  {image.width}x{image.height}  on {DEVICE}\n")

    print("finding, one label at a time:")
    found = find_boxes(image)
    if not found:
        print("\nnothing was found at all. That is the answer to Phase 2.")
        return 1

    print("\ncutting:")
    masks = cut_masks(image, found)

    for label, (mask, box, score) in masks.items():
        name = f"spike-{label.replace(' ', '-')}.jpg"
        draw(image, label, mask, box, score).save(OUT / name, quality=88)
        print(f"  wrote out/{name}")

    print(f"\n{len(masks)} of {len(LABELS)} labels produced a cut.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
