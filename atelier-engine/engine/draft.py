"""A rough version of the same picture, in a fraction of the time.

**Why fewer steps and not fewer pixels.** The obvious way to make a slow
generator fast is to make the picture smaller, and here it does almost
nothing. The edit model is twelve gigabytes against eight of card, so it is
not resident: every step streams the whole transformer in from disk one block
at a time. The recorded measurement is eighteen minutes for twenty steps at
768 px — fifty-four seconds a step — and twelve gigabytes off an SSD is about
fifty seconds of it. The pixels are the rounding error. Halving the longest
side would save seconds; halving the steps saves half the run.

So a draft is **the same picture with fewer steps**: same prompt, same seed,
same references, same mask, same size. Nothing that decides what the picture
*is* changes, which is the whole point — the full run has to be the thing the
draft promised, or a draft is just another picture.

What it costs is resolution of detail rather than resolution in pixels: four
steps of a twenty-step schedule is the composition arrived at and the surface
not yet there. Enough to know whether the idea was right, which is what is
being asked at four minutes rather than thirty.
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
