"""
Filling in what was lifted out.

LaMa, as ONNX and on the CPU. Two deliberate choices:

**ONNX rather than TorchScript.** An ONNX graph is data and cannot run code when
it is loaded; a TorchScript file or a pickle can, and the well-known `big-lama.pt`
files are individuals' GitHub releases. For a model downloaded once and run over
his own paintings, the format that cannot execute anything is worth a little
inconvenience.

**The CPU, not the card.** It is 51M parameters and the segmenter needs every
megabyte of the 8 GB. Filling in takes a few seconds here and competes for
nothing.

**It is not in the model registry.** That registry exists to keep one model at a
time in VRAM, and this is never in VRAM — putting it there would evict the
segmenter to make room for something that does not need the room.
"""

from __future__ import annotations

from functools import lru_cache
from pathlib import Path

import numpy as np
from PIL import Image

from .images import bounds, grow

SIZE = 512
"""What the graph was exported at. Both inputs are fixed at 512x512."""

GROW = 0.012
"""How far to widen the mask before filling, as a fraction of the canvas.

A mask traces the figure's edge, so the pixels just outside it still carry the
colour the brush left going past. Left in, the inpainter reads them as context
and paints a faint outline of the thing being removed. About one percent is
enough to lose that and little enough not to eat into what is really behind.
"""

PAD = 0.35
"""How much context to include around the hole, as a fraction of its size.

LaMa only sees what it is given. With no margin it is asked to invent a region
with nothing around it to continue; with too much, the hole shrinks to a few
pixels of a 512 square and the fill comes back soft.
"""

MODEL = Path(__file__).resolve().parent.parent / "models" / "lama" / "lama_fp32.onnx"


@lru_cache(maxsize=1)
def _session():
    import onnxruntime as ort

    if not MODEL.exists():
        raise FileNotFoundError(
            f"LaMa is not downloaded. Expected it at {MODEL} — see the README."
        )
    options = ort.SessionOptions()
    options.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
    return ort.InferenceSession(str(MODEL), options, providers=["CPUExecutionProvider"])


def _window(mask: np.ndarray, width: int, height: int) -> tuple[int, int, int, int]:
    """A square around the hole, with context, clamped to the canvas.

    Square because the graph is square: feeding it a wide crop squashed into 512
    stretches the brushwork, and a fill that does not match the stroke direction
    around it is worse than a visible seam.
    """
    box = bounds(mask)
    if box is None:
        raise ValueError("nothing to fill: the mask is empty")
    x0, y0, x1, y1 = box

    side = max(x1 - x0, y1 - y0)
    side = int(side * (1 + 2 * PAD))
    side = min(side, width, height)

    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    left = max(0, min(cx - side // 2, width - side))
    top = max(0, min(cy - side // 2, height - side))
    return left, top, left + side, top + side


def fill(painting: Image.Image, hole: np.ndarray) -> Image.Image:
    """The painting with the masked region painted over.

    `hole` is True where the pixels should be invented — so to fill in behind a
    figure that has been cut out, pass that figure's own mask.

    Only the hole is replaced. Everything else is the original at its original
    resolution, because the graph runs at 512 and giving it the whole of a
    3000-pixel canvas would soften all of it to repair a corner.
    """
    if hole.shape[:2] != (painting.height, painting.width):
        raise ValueError(
            f"the mask is {hole.shape[:2]} and the painting is "
            f"{(painting.height, painting.width)}"
        )

    hole = grow(hole, int(GROW * max(painting.width, painting.height)))
    left, top, right, bottom = _window(hole, painting.width, painting.height)

    crop = painting.convert("RGB").crop((left, top, right, bottom)).resize(
        (SIZE, SIZE), Image.Resampling.LANCZOS
    )
    hole_crop = Image.fromarray((hole * 255).astype(np.uint8), mode="L").crop(
        (left, top, right, bottom)
    ).resize((SIZE, SIZE), Image.Resampling.NEAREST)

    image_in = np.asarray(crop, dtype=np.float32).transpose(2, 0, 1)[None] / 255.0
    mask_in = (np.asarray(hole_crop, dtype=np.float32)[None, None] > 127).astype(np.float32)

    session = _session()
    painted = session.run(None, {"image": image_in, "mask": mask_in})[0]

    # The graph takes 0..1 in and gives 0..255 back, which is not symmetrical and
    # not written down anywhere. Treating the output as 0..1 clips every pixel to
    # white, which is what the first run produced: a clean silhouette of nothing.
    painted = np.clip(painted[0].transpose(1, 2, 0), 0, 255)
    filled = Image.fromarray(painted.astype(np.uint8), mode="RGB").resize(
        (right - left, bottom - top), Image.Resampling.LANCZOS
    )

    # Paste back through the hole only. The model repaints the whole square it
    # was given, and the rest of that square is already the painting at full
    # resolution — there is nothing to gain by replacing it with a 512 copy.
    out = painting.convert("RGB").copy()
    patch = out.crop((left, top, right, bottom))
    patch.paste(filled, (0, 0), hole_crop.resize((right - left, bottom - top)))
    out.paste(patch, (left, top))
    return out
