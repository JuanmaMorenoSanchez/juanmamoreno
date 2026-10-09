"""
Turning a mask into something that can be put on a page.

A mask comes back from SAM as a hard yes or no per pixel. Pasted straight onto
a layer that reads as a cut-out: a paper edge, one pixel wide, over brushwork
that has no such edge anywhere in it. So the alpha is softened very slightly —
enough that the join is not a line, not so much that the thing goes soft.
"""

from __future__ import annotations

import numpy as np
from PIL import Image, ImageFilter

FEATHER_PX = 1.8
"""How far the edge is blurred.

Small on purpose. At 1.8 the cut reads as painted rather than trimmed; by 4 it
reads as a sticker with a glow. The number was chosen by looking, which is the
only way to choose it.
"""


def to_alpha(mask: np.ndarray) -> Image.Image:
    """A boolean or 0-1 mask as an 8-bit alpha channel."""
    if mask.dtype == np.bool_:
        return Image.fromarray((mask * 255).astype(np.uint8), mode="L")
    if mask.max() <= 1.0:
        return Image.fromarray((mask * 255).astype(np.uint8), mode="L")
    return Image.fromarray(mask.astype(np.uint8), mode="L")


def to_layer(
    painting: Image.Image, mask: np.ndarray, feather: float = FEATHER_PX
) -> Image.Image:
    """The painting showing through the mask, as an RGBA image its own size.

    Full size rather than cropped to the mask, because the layers are stacked
    back over each other for the parallax and each one has to agree with the
    others about where it is. Cropping is a separate decision, made by whoever
    is placing them.
    """
    alpha = to_alpha(mask)
    if alpha.size != painting.size:
        alpha = alpha.resize(painting.size, Image.Resampling.BILINEAR)
    if feather > 0:
        alpha = alpha.filter(ImageFilter.GaussianBlur(radius=feather))

    layer = painting.convert("RGBA")
    layer.putalpha(alpha)
    return layer


def grow(mask: np.ndarray, pixels: int) -> np.ndarray:
    """The mask, widened by that many pixels in every direction.

    Needed before filling in behind something. A mask traces the edge of the
    figure, so the ring of pixels just outside it is still half figure — the
    colour the brush left on the way past. Asked to invent inside that ring, the
    inpainter uses it as context and reproduces a faint outline of the thing
    that was removed, which is the one shape that must not survive.
    """
    if pixels <= 0:
        return np.asarray(mask, dtype=bool)
    # MaxFilter is a dilation, and the kernel has to be odd.
    size = pixels * 2 + 1
    widened = to_alpha(np.asarray(mask, dtype=bool)).filter(ImageFilter.MaxFilter(min(size, 99)))
    return np.asarray(widened, dtype=np.uint8) > 127


def bounds(mask: np.ndarray) -> tuple[int, int, int, int] | None:
    """The box the mask actually occupies, or None if it is empty.

    Used to tell a cut that found something from one that found nothing: SAM
    always answers, and an answer covering four pixels is a refusal written in
    the only language it has.
    """
    rows = np.any(mask, axis=1)
    cols = np.any(mask, axis=0)
    if not rows.any() or not cols.any():
        return None
    y0, y1 = np.where(rows)[0][[0, -1]]
    x0, x1 = np.where(cols)[0][[0, -1]]
    return int(x0), int(y0), int(x1) + 1, int(y1) + 1


def coverage(mask: np.ndarray) -> float:
    """What fraction of the canvas the mask takes, 0 to 1.

    Both ends are a warning. Near zero is nothing found; near one is a mask that
    took the whole painting, which is what a label the model did not understand
    tends to produce.
    """
    return float(np.asarray(mask, dtype=bool).mean())


def remainder(masks: list[np.ndarray]) -> np.ndarray:
    """Everything the other layers did not take.

    The background is never asked for. SAM looks for an object and a sky or a
    field is not one — asked for "a green field" it returned confetti scattered
    over the foliage. What is left once the figures are lifted out is a better
    background than anything it would have drawn, and it is free.
    """
    if not masks:
        raise ValueError("the remainder of nothing is the whole painting, not a layer")
    stacked = np.zeros_like(np.asarray(masks[0], dtype=bool))
    for mask in masks:
        stacked |= np.asarray(mask, dtype=bool)
    return ~stacked
