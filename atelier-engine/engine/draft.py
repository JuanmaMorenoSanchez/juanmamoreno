"""A rough version of the same picture, in a fraction of the time.

**Fewer steps first, and then fewer pixels.** This said for a while that fewer
pixels saved nothing, reasoning from a step of fifty-four seconds of which
fifty was the model arriving from disk. The step was never fifty-four seconds.
Measured properly it was a hundred and thirty-three, of which about seventy was
the text encoder having left the card oversubscribed — a bug, now fixed — and
the honest figure is **33.4 seconds a step** at the megapixel the pipeline
picks for itself.

Measured again at a quarter of those pixels: **26.3 seconds a step, 21% off**.
So the pixels are not the rounding error the old note claimed, and they are not
the prize either. What a step still mostly costs is twelve gigabytes of
transformer arriving twice — once for the instruction and once for the negative
prompt — and dequantising on the way through, neither of which cares how big
the picture is.

A draft therefore takes both: **four steps of the twenty, at a quarter of the
pixels.** Four steps is five times quicker, the pixels another fifth, and the
four-step draft that was fourteen minutes is now a hundred and seven seconds.

What it costs is honesty about the surface, and a little about the composition.
Same prompt, same seed, same references, same mask — but a model given less
canvas composes a little differently, so a draft is a promise about the idea
and not a promise about the picture. That was the reason for keeping the size
when the size was thought to be free; it is not a reason to pay a fifth for
nothing, now that it is known what it costs.
"""

from __future__ import annotations

#: How many steps a draft takes, whatever it was asked for.
#:
#: Four rather than one or two: below about four the schedule has not resolved
#: into anything a decision can be made about, and the time saved is already
#: most of it by then.
STEPS = 4


def steps(asked: int, drafting: bool) -> int:
    """How many steps to actually take.

    A draft never takes more than it was asked for: a graph set to three steps
    is already quicker than a draft, and making it slower to call it a draft
    would be absurd.
    """
    wanted = max(1, int(asked))
    return min(wanted, STEPS) if drafting else wanted


#: How many pixels a draft is drawn at, against the full run's.
#:
#: The pipeline works at about one megapixel whatever it is handed — it resizes
#: the painting to fit that before it starts, so the size he uploads has never
#: decided anything — and a quarter of that is half the side, with a quarter as
#: many latent tokens to attend over.
PIXELS = 0.25

#: What the pipeline works at when it is not told otherwise.
FULL = 1024 * 1024

#: Both sides have to be a multiple of this or the pipeline rounds them itself
#: and says so in a warning.
STEP = 16


def size(shape: tuple[int, int], drafting: bool) -> tuple[int, int] | None:
    """How wide and high to draw, or `None` for the pipeline's own choice.

    The painting's shape is kept: a draft at a different aspect would be a
    different composition, and then it is not a draft of anything.
    """
    if not drafting:
        return None
    width, height = shape
    if width <= 0 or height <= 0:
        return None
    area = FULL * PIXELS
    across = (area * width / height) ** 0.5
    down = area / across
    return (
        max(STEP, round(across / STEP) * STEP),
        max(STEP, round(down / STEP) * STEP),
    )
