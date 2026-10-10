"""
Graphs already wired up, for the things he does over and over.

A node graph is honest about what it is doing and tedious to build. Three of
these are built most times the page is opened — the painting, a depth map and
a save, every time, before anything interesting starts — and getting one wire
wrong produces an error that reads like a model failing rather than a missing
join. So the common ones arrive ready.

**They live here rather than in the page**, for the same reason the catalogue
does: the page is not allowed to know the name of a node. A flow added to this
file appears as a button on a deployed site with nothing rebuilt and nothing
released, which is the whole point of publishing the catalogue in the first
place.

**Position is a column and a row, not pixels.** Where a box sits on screen
depends on how wide the page draws one, which is the page's business. This
says only what follows what.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass(frozen=True)
class Placed:
    """One box in a flow: what it is, what it is set to, and where it goes."""

    at: str
    """The id within the flow. Made unique by the page when it drops it in."""
    type: str
    params: dict[str, Any] = field(default_factory=dict)
    column: int = 0
    row: int = 0


@dataclass(frozen=True)
class Flow:
    key: str
    label: str
    blurb: str
    """One line, on the button. What it does, not how."""
    about: str
    """What it is for and what to change, shown when he asks."""
    nodes: tuple[Placed, ...]
    edges: tuple[tuple[str, str, str, str], ...]
    """`(from id, from port, to id, to port)`, as the graph endpoint takes them."""


MOVE = Flow(
    key="move",
    label="Make it move",
    blurb="Reads depth, then the painting moves under the pointer.",
    about=(
        "The shortest useful thing the atelier does, and the one with no model "
        "larger than a hundred megabytes in it. Depth Anything measures how far "
        "away each part of the painting is; the page cuts the painting into "
        "slices by that and shifts each by how near it is.\n\n"
        "Every pixel that moves is a pixel you painted. That is not a style "
        "choice — it is the only thing this can do, because it has nothing to "
        "invent with. An image-to-video model would resolve your brushwork into "
        "something photographic, and takes eighteen minutes to do it.\n\n"
        "Nothing to adjust. Run it, then press See it move."
    ),
    nodes=(
        Placed(at="painting", type="painting", column=0, row=0),
        Placed(at="depth", type="depth", column=1, row=0),
        Placed(at="keep", type="save", params={"name": "depth"}, column=2, row=0),
    ),
    edges=(
        ("painting", "image", "depth", "image"),
        ("depth", "image", "keep", "image"),
    ),
)

CHANGE_A_PART = Flow(
    key="change-a-part",
    label="Change one part",
    blurb="Finds a thing by name, then changes only that, by instruction.",
    about=(
        "The whole reason to bother with a mask. Qwen-Image-Edit will follow an "
        "instruction without one, and it repaints the entire canvas doing it — "
        "the field, the other figures and the surface of the paint all come back "
        "subtly different and a little glossier. With a mask, everything outside "
        "it is your original, untouched.\n\n"
        "Two things to set: the **phrase** on Find, which is what to change, and "
        "the **instruction** on Change, which is what to do to it. The mask is "
        "grown slightly first, because an edit that stops exactly at an edge "
        "leaves a visible line where it met the paint.\n\n"
        "When the phrase keeps finding the wrong thing — a fold, a shadow, one "
        "of two similar figures — delete Find and join a **Brush** to Isolate "
        "instead, and point at it. Naming only works for things that have names."
    ),
    nodes=(
        Placed(at="painting", type="painting", column=0, row=0),
        Placed(at="find", type="find", params={"phrase": "a girl"}, column=1, row=0),
        Placed(at="isolate", type="isolate", column=2, row=0),
        Placed(at="grow", type="grow", params={"pixels": 8}, column=3, row=0),
        Placed(
            at="change",
            type="edit",
            params={"instruction": "make the jumper deep red"},
            column=4,
            row=0,
        ),
        Placed(at="keep", type="save", params={"name": "edit"}, column=5, row=0),
    ),
    edges=(
        ("painting", "image", "find", "image"),
        ("painting", "image", "isolate", "image"),
        ("find", "box", "isolate", "box"),
        ("isolate", "mask", "grow", "mask"),
        ("painting", "image", "change", "image"),
        ("grow", "mask", "change", "mask"),
        ("change", "image", "keep", "image"),
    ),
)

TAKE_A_FIGURE_OUT = Flow(
    key="take-a-figure-out",
    label="Take a figure out",
    blurb="Cuts a figure to its own layer and paints the gap behind it.",
    about=(
        "Two layers out of one painting: the figure on transparency, and the "
        "painting with the figure gone and the hole filled in.\n\n"
        "The background is **derived, not asked for**. Asking a model to find "
        "the background does not work — it looks for objects and a field is not "
        "one; asked for a green field it returned confetti scattered over the "
        "foliage. So the figure is cut, what was taken is inverted, and what is "
        "left is a better background than anything it would have drawn, for "
        "nothing.\n\n"
        "The mask is grown before the fill, which is not optional: the ring of "
        "pixels just outside a figure still carries the colour the brush left "
        "going past, and the inpainter reads that ring as context and paints a "
        "faint outline of the very thing you removed."
    ),
    nodes=(
        Placed(at="painting", type="painting", column=0, row=0),
        Placed(at="find", type="find", params={"phrase": "a girl"}, column=1, row=0),
        Placed(at="isolate", type="isolate", column=2, row=0),
        Placed(at="cut", type="cut", column=3, row=0),
        Placed(at="figure", type="save", params={"name": "figure"}, column=4, row=0),
        Placed(at="grow", type="grow", params={"pixels": 12}, column=3, row=1),
        Placed(at="behind", type="fill", column=4, row=1),
        Placed(at="background", type="save", params={"name": "background"}, column=5, row=1),
    ),
    edges=(
        ("painting", "image", "find", "image"),
        ("painting", "image", "isolate", "image"),
        ("find", "box", "isolate", "box"),
        ("painting", "image", "cut", "image"),
        ("isolate", "mask", "cut", "mask"),
        ("cut", "image", "figure", "image"),
        ("isolate", "mask", "grow", "mask"),
        ("painting", "image", "behind", "image"),
        ("grow", "mask", "behind", "mask"),
        ("behind", "image", "background", "image"),
    ),
)

WRITE_A_PIECE = Flow(
    key="write-a-piece",
    label="Write a piece",
    blurb="Writes a small moving artwork from a sentence, as code.",
    about=(
        "The only flow here that needs no painting. A coder model writes a "
        "Canvas 2D class from a sentence, and the page runs it in a frame with "
        "no network and no reach into the site, so code nobody has read costs "
        "nothing to try.\n\n"
        "Set **asking** to what should happen — concrete and visual works best. "
        "Leave the small model off for anything you might keep: the big one "
        "takes about eight minutes and writes code that works, and the small "
        "one takes twenty seconds and writes code that runs.\n\n"
        "Expect two or three goes. A sentence is a loose brief."
    ),
    nodes=(
        Placed(
            at="sketch",
            type="sketch",
            params={"asking": "slow drifting dust motes that gather towards the pointer"},
            column=0,
            row=0,
        ),
    ),
    edges=(),
)

FLOWS: dict[str, Flow] = {
    flow.key: flow for flow in (MOVE, CHANGE_A_PART, TAKE_A_FIGURE_OUT, WRITE_A_PIECE)
}
"""Order matters: it is the order of the buttons, cheapest and shortest first."""


def as_json() -> list[dict[str, Any]]:
    """The flows, for `GET /flows`."""
    return [
        {
            "key": flow.key,
            "label": flow.label,
            "blurb": flow.blurb,
            "about": flow.about,
            "nodes": [
                {
                    "at": node.at,
                    "type": node.type,
                    "params": node.params,
                    "column": node.column,
                    "row": node.row,
                }
                for node in flow.nodes
            ],
            "edges": [list(edge) for edge in flow.edges],
        }
        for flow in FLOWS.values()
    ]
