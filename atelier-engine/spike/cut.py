"""
The whole of workflow B, end to end, through the engine rather than by hand.

Names things, cuts each one to a transparent png with a softened edge, and
builds the background out of what is left rather than asking for it. This is the
manual check that the pieces fit together — the unit tests cover the policy, and
this covers the fact that it runs.

Usage:  .venv\\Scripts\\python spike\\cut.py <image> [label ...]
"""

from __future__ import annotations

import sys
import time
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from engine.images import bounds, coverage, remainder, to_layer  # noqa: E402
from engine.operations import find, isolate  # noqa: E402
from engine.registry import ModelRegistry  # noqa: E402

HERE = Path(__file__).resolve().parent.parent
OUT = HERE / "out"
MODELS = HERE / "models"

# Mostly figures, because that is what this does well. A diffuse thing is not
# asked for at all — the background is the remainder.
DEFAULT_LABELS = ["a girl", "a blue shirt"]


def main() -> int:
    if len(sys.argv) < 2:
        print(f"usage: python {Path(__file__).name} <image> [label ...]")
        return 2

    source = Path(sys.argv[1])
    labels = sys.argv[2:] or DEFAULT_LABELS
    if not source.exists():
        print(f"no such image: {source}")
        return 2

    import torch

    device = "cuda" if torch.cuda.is_available() else "cpu"
    registry = ModelRegistry(cache_dir=MODELS, device=device)
    painting = Image.open(source).convert("RGB")
    OUT.mkdir(exist_ok=True)

    free = registry.vram()
    print(f"{source.name}  {painting.width}x{painting.height}  on {device}")
    if free:
        print(f"vram {free[0]:,} MiB free of {free[1]:,}\n")

    started = time.perf_counter()

    # One phrase at a time, and Grounding DINO stays resident across all of them.
    boxes = {}
    for label in labels:
        hits = find(registry, painting, label)
        if not hits:
            print(f"  {label:<16} not found")
            continue
        boxes[label] = hits[0]
        print(f"  {label:<16} {hits[0].score:.3f}  {hits[0].box}")
    print(f"  [resident: {registry.resident}]")

    if not boxes:
        print("\nnothing found, so nothing to cut.")
        return 1

    # Asking SAM for anything evicts Grounding DINO first. That is the rule.
    masks = {}
    for label, hit in boxes.items():
        mask, iou = isolate(registry, painting, box=hit.box)
        if bounds(mask) is None:
            print(f"  {label:<16} empty mask, dropped")
            continue
        masks[label] = mask
        print(f"  {label:<16} iou {iou:.3f}  covers {coverage(mask) * 100:5.1f}%")
    print(f"  [resident: {registry.resident}]")

    for label, mask in masks.items():
        name = f"layer-{label.replace(' ', '-')}.png"
        to_layer(painting, mask).save(OUT / name)
        print(f"  wrote out/{name}")

    back = remainder(list(masks.values()))
    to_layer(painting, back).save(OUT / "layer-background.png")
    print(f"  wrote out/layer-background.png  ({coverage(back) * 100:.1f}% of the canvas)")

    registry.evict()
    print(f"\n{len(masks)} layer(s) and a background in {time.perf_counter() - started:.1f}s")
    if registry.vram():
        print(f"vram {registry.vram()[0]:,} MiB free again, nothing resident")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
