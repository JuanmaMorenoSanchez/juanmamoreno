"""
The dials he actually turns, and the numbers they stand for.

The boxes used to show the model's own settings: guidance, denoise strength,
step count, frame width. Each one is a real number with a real effect and not
one of them is a question a painter has. **One dial may move several of them,
in different directions, and be called something a person would say.**

What is here is the arithmetic only — no pipelines, no card, no `torch`. It is
the part that can be checked.
"""

from __future__ import annotations

from PIL import Image

#: The ends of the Fun dial.
#:
#: Named by him: boring is a predictable result, fun is an unexpected or lossy
#: one. What it drives is two of the model's numbers at once.
FUN_LEAST = 0.0
FUN_MOST = 10.0

#: Where the dial sits when a box is new.
#:
#: Two thirds up, not in the middle. Shown five results from one painting he
#: ranked the untouched painting last and the gentlest result second last, and
#: liked everything from the middle upwards. A dial that opened at its centre
#: would open below where he has twice said he wants to be.
FUN_USUALLY = 6.0


def fun(dial: float) -> tuple[float, float]:
    """How far to let it go, and how hard to push — from one number.

    Returns `(far, guidance)`.

    **`far` is the axis he cares about**, which took a strip of five pictures
    to find out. `far` is how much of the model's version survives against the
    painting it came from, and shown the five he called the *untouched
    painting* the boring one. So boring is not a gentler edit, it is no edit:
    the bottom of this dial lands within a couple of counts of his own paint.

    **Guidance rides along, and the direction is the opposite of the obvious
    one.** High guidance does not mean obedient and dull; it means forced —
    "edges harden, colour goes flat, and the brushwork reads as plastic", as
    the old note under it said. That burnt, speckled, over-cooked look is the
    lossy one he asked for. It is also four times slower, because anything
    above one runs the model a second time for the negative prompt: the gentle
    end measured 90 seconds and the forced end 429.

    It stops at seven because seven is the highest that has been generated and
    looked at. The model accepts ten. Shipping a dial whose top third has never
    been seen is how three wrong numbers got into this repository in one day.
    """
    at = max(FUN_LEAST, min(FUN_MOST, dial))
    return (
        min(1.0, 0.25 + at * 0.125),
        2.0 + at * 0.5,
    )


#: What shape to end up in, and what Instagram does with it.
#:
#: `keep` is the painting's own proportions. The other two crop to the shapes
#: that survive being posted: 1.91 to one is the widest the feed will show
#: without letterboxing it, four to five is the tallest a feed picture may be
#: and so the most of the screen a still can occupy, and nine to sixteen is a
#: reel.
#:
#: A still and a clip do not want the same tall shape, which is why there are
#: two of them: a picture goes to the feed and a clip goes to reels.
KEEP = "keep"
SHAPES = (KEEP, "horizontal", "vertical")

WIDE = 1.91
TALL_STILL = 4 / 5
TALL_CLIP = 9 / 16


def shape_of(want: str, moving: bool) -> float | None:
    """The proportion to crop to, or `None` to leave the painting alone."""
    if want == "horizontal":
        return WIDE
    if want == "vertical":
        return TALL_CLIP if moving else TALL_STILL
    return None


def cropped(painting: Image.Image, want: str, moving: bool = False) -> Image.Image:
    """The painting cut to the shape asked for, from the middle.

    **Cut, not stood in a frame.** The other way was offered and he chose this
    one: a painting that does not fit the shape loses its edges rather than
    gaining a surround. It is worth knowing what that means at the extremes —
    his 1999x447 landscape cropped to a reel keeps a strip 251 pixels wide,
    about an eighth of it. That is not a fault, it is what cropping a panorama
    to a tall frame is; crop it himself first if he wants a different part of
    it.

    It is also what keeps the model drawing. A shape too far from square comes
    back as colour tearing — see `video.DRAWABLE` — and cropping to a posted
    shape lands inside what it can draw, so choosing one is the way past that
    refusal as well as a way to frame a picture.
    """
    aspect = shape_of(want, moving)
    if aspect is None:
        return painting

    wide, high = painting.size
    if wide / high > aspect:
        cut = int(round(high * aspect))
        left = (wide - cut) // 2
        return painting.crop((left, 0, left + cut, high))

    cut = int(round(wide / aspect))
    top = (high - cut) // 2
    return painting.crop((0, top, wide, top + cut))
