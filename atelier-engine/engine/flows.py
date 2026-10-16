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
        "**It also paints in behind the nearest thing**, the same way *Take a "
        "figure out* does. When a near slice shifts it leaves a gap, and with "
        "nothing behind it the gap is a smear of the edge it dragged along. "
        "Filled, there is real paint back there for the slice to move across. "
        "Name whatever is nearest in **what to look for** — it is the thing "
        "that moves furthest and so the thing whose gap shows.\n\n"
        "The fill is why this is no longer the fastest flow here: the depth "
        "map is a hundred megabytes of model and a few seconds, and LaMa is "
        "another pass. Still seconds rather than the minutes an edit costs.\n\n"
        "Run it, then press See it move."
    ),
    nodes=(
        Placed(at="painting", type="painting", column=0, row=0),
        Placed(at="depth", type="depth", column=1, row=0),
        Placed(at="keep", type="save", params={"name": "depth"}, column=2, row=0),
        Placed(at="find", type="find", params={"phrase": "a girl"}, column=1, row=1),
        Placed(at="isolate", type="isolate", column=2, row=1),
        # Grown before the fill, as in Take a figure out: the ring of pixels
        # just outside a figure carries the colour the brush left going past,
        # and the inpainter reads it as context and paints a faint outline of
        # the very thing that was removed.
        Placed(at="grow", type="grow", params={"pixels": 12}, column=3, row=1),
        Placed(at="behind", type="fill", column=4, row=1),
        Placed(at="background", type="save", params={"name": "background"}, column=5, row=1),
    ),
    edges=(
        ("painting", "image", "depth", "image"),
        ("depth", "image", "keep", "image"),
        ("painting", "image", "find", "image"),
        ("painting", "image", "isolate", "image"),
        ("find", "box", "isolate", "box"),
        ("isolate", "mask", "grow", "mask"),
        ("painting", "image", "behind", "image"),
        ("grow", "mask", "behind", "mask"),
        ("behind", "image", "background", "image"),
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

FILM_IT = Flow(
    key="film-it",
    label="Film it",
    blurb="A painting and a sentence into a few seconds of actual video.",
    about=(
        "The other kind of motion, and the opposite trade to *Make it move*. "
        "Parallax can only shift pixels you painted, which is why it stays "
        "faithful and why it can never do anything you did not paint. This "
        "invents every frame after the first.\n\n"
        "That is the cost as well as the point. It will resolve a brushstroke "
        "into something photographic if the sentence invites it, and a clip "
        "that looks like a film of a painting is a different object from a "
        "painting that moves. Use whichever one the piece wants.\n\n"
        "Say what *happens*, not what it looks like — the painting already "
        "supplies the look. Three seconds at 832 is the place to start; seconds "
        "and size are what cost the time and they multiply, so find the "
        "motion small and raise it once.\n\n"
        "It writes an mp4 into the engine's folder. No Keep is needed, and "
        "none would help: Keep takes a picture, not a film."
    ),
    nodes=(
        Placed(at="painting", type="painting", column=0, row=0),
        Placed(
            at="film",
            type="video",
            params={"prompt": "the light shifts slowly across her face, dust drifting"},
            column=1,
            row=0,
        ),
    ),
    edges=(("painting", "image", "film", "image"),),
)

REPAINT_IT = Flow(
    key="repaint-it",
    label="Repaint the whole thing",
    blurb="A painting and a sentence into a new image.",
    about=(
        "The plainest thing the editor does, and the one that was missing from "
        "this row: a painting in, a sentence, a new image out. No mask, no "
        "finding anything by name.\n\n"
        "No mask means the whole canvas is repainted, so expect the brushwork "
        "to drift — the model repaints what it sees in its own hand, and a "
        "passage you never asked it to touch comes back changed. When only one "
        "part should move, *Change one part* holds the rest still and is the "
        "better flow by a distance.\n\n"
        "Say what should be different, not what the painting is. **How "
        "literally** is the dial worth turning: low lets it wander, high holds "
        "it to the sentence and to the canvas. It takes minutes rather than "
        "seconds, because the model is larger than the card and is streamed "
        "through it."
    ),
    nodes=(
        Placed(at="painting", type="painting", column=0, row=0),
        Placed(
            at="edit",
            type="edit",
            params={"instruction": "the sky turns to late evening, the light goes orange"},
            column=1,
            row=0,
        ),
        Placed(at="keep", type="save", params={"name": "repainted"}, column=2, row=0),
    ),
    edges=(
        ("painting", "image", "edit", "image"),
        ("edit", "image", "keep", "image"),
    ),
)

IN_MY_STYLE = Flow(
    key="in-my-style",
    label="In my style",
    blurb="Repaints the image in his own hand, oil or watercolour.",
    about=(
        "The editor, shown two of his own paintings beside the one being "
        "changed. No training and nothing downloaded: Qwen-Image-Edit takes "
        "three images, and an instruction that says the other two are the "
        "manner rather than the subject is most of what makes this a restyle "
        "and not a collage.\n\n"
        "**Which hand** is oil or watercolour, and they are not "
        "interchangeable: a watercolour reference thins an oil painting out. "
        "**Which references** steps through the pairs of his paintings and "
        "wraps — the cheapest thing to change when the hand comes out wrong, "
        "and worth two or three goes before any number is touched.\n\n"
        "Leave **and also change** empty for a straight restyle. Anything "
        "typed there happens in the same pass.\n\n"
        "A figure walking in from one of the references is the failure to "
        "watch for. Raise **how literally** and it holds closer to the canvas "
        "it was given. As slow as any edit: minutes, not seconds."
    ),
    nodes=(
        Placed(at="painting", type="painting", column=0, row=0),
        Placed(
            at="style",
            type="edit",
            params={"style": "oil", "instruction": ""},
            column=1,
            row=0,
        ),
        Placed(at="keep", type="save", params={"name": "in-my-style"}, column=2, row=0),
    ),
    edges=(
        ("painting", "image", "style", "image"),
        ("style", "image", "keep", "image"),
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
    flow.key: flow
    for flow in (
        MOVE,
        CHANGE_A_PART,
        REPAINT_IT,
        IN_MY_STYLE,
        TAKE_A_FIGURE_OUT,
        FILM_IT,
        WRITE_A_PIECE,
    )
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
