"""
What the atelier can actually do, as nodes.

`nodes.py` is the mechanism — ports, ordering, running. This is the content, and
it is deliberately the only place to change: **adding a capability to the
editor is adding an entry here.** The page reads `GET /nodes` and draws
whatever it finds, so nothing in the Angular side knows the names of any of
these.

Coarse on purpose. "Isolate" is a model load, a prompt, a forward pass and a
mask, because that is one idea to the person using it even though it is four
things to the machine.
"""

from __future__ import annotations

from dataclasses import replace

import uuid
from pathlib import Path
from typing import Any

import numpy as np
from PIL import Image

from .depth import as_image as depth_image, measure as measure_depth
from .edit import available as edit_available, edit as edit_painting
from .help import HELP, PARAM_HELP
from .images import coverage, grow as grow_mask, remainder, to_layer
from .inpaint import fill as fill_behind
from .nodes import NodeType, Param, Port
from .operations import find as find_things, isolate as isolate_thing

OUT = Path(__file__).resolve().parent.parent / "out"


def _painting(inputs, params, context) -> dict[str, Any]:
    """The picture everything starts from, as uploaded with the graph."""
    painting = context.get("painting")
    if painting is None:
        raise ValueError("no painting was sent with this graph")
    return {"image": painting}


def _find(inputs, params, context) -> dict[str, Any]:
    hits = find_things(
        context["registry"], inputs["image"], params["phrase"], threshold=params["threshold"]
    )
    if not hits:
        raise ValueError(f'nothing came back for "{params["phrase"]}"')
    best = hits[0]
    return {"box": list(best.box), "score": round(best.score, 4)}


def _marks(inputs, params, context) -> dict[str, Any]:
    """Points drawn by hand, as they come off the overlay.

    Stored on the node as json rather than carried in some side channel, so a
    graph is still one object that can be saved, reloaded and reasoned about.
    """
    import json

    raw = params["points"]
    try:
        drawn = json.loads(raw) if isinstance(raw, str) else (raw or {})
    except json.JSONDecodeError as exc:
        raise ValueError("the marks on that brush are not readable") from exc

    keep = [(int(p["x"]), int(p["y"])) for p in drawn.get("keep", [])]
    drop = [(int(p["x"]), int(p["y"])) for p in drawn.get("drop", [])]
    if not keep and not drop:
        raise ValueError("nothing has been drawn on the brush yet")
    return {"points": {"keep": keep, "drop": drop}}


def _isolate(inputs, params, context) -> dict[str, Any]:
    box = inputs.get("box")
    marks = inputs.get("points") or {}
    if box is None and not marks.get("keep") and not marks.get("drop"):
        raise ValueError("Isolate needs a box from Find, or marks from a Brush")

    mask, iou = isolate_thing(
        context["registry"],
        inputs["image"],
        box=tuple(box) if box is not None else None,
        points=marks.get("keep") or None,
        negative=marks.get("drop") or None,
    )
    return {"mask": mask, "confidence": round(iou, 4)}


def _grow(inputs, params, context) -> dict[str, Any]:
    return {"mask": grow_mask(inputs["mask"], int(params["pixels"]))}


def _invert(inputs, params, context) -> dict[str, Any]:
    return {"mask": remainder([inputs["mask"]])}


def _cut(inputs, params, context) -> dict[str, Any]:
    layer = to_layer(inputs["image"], inputs["mask"], feather=float(params["feather"]))
    return {"image": layer, "covers": round(coverage(inputs["mask"]), 4)}


def _fill(inputs, params, context) -> dict[str, Any]:
    return {"image": fill_behind(inputs["image"], np.asarray(inputs["mask"], dtype=bool))}


def _edit(inputs, params, context) -> dict[str, Any]:
    """Change part of a painting by asking for it.

    The segmenter is dropped first. This model is streamed block by block
    through the card, and anything else resident is memory it has to work
    around — the registry holds one model at a time and this is the moment
    that rule earns itself.
    """
    registry = context.get("registry")
    if registry is not None:
        registry.evict()

    saying = context.get("saying")
    if saying is not None:
        # Measured at about four minutes the first time in a process: the
        # spill is cleared and twelve gigabytes written back out.
        saying("preparing the model — the first edit of a session takes a few minutes before it starts")

    mask = inputs.get("mask")
    return {
        "image": edit_painting(
            inputs["image"],
            params["instruction"],
            mask=np.asarray(mask, dtype=bool) if mask is not None else None,
            steps=int(params["steps"]),
            guidance=float(params["guidance"]),
            seed=int(params["seed"]),
            saying=saying,
            # Passed down rather than reported by the node, because the node
            # finishes once and the steps are what take the eighteen minutes.
            watching=context.get("watching_steps"),
            stopped=context.get("stopped"),
        )
    }


def _depth(inputs, params, context) -> dict[str, Any]:
    """How far away each part of the painting is.

    Writes the map out without being asked, unlike every other node. It is a
    hundred kilobytes, and the page needs it by name to show the painting
    moving — making that conditional on remembering to join a Keep would hide
    the one thing this node is for.
    """
    depth = measure_depth(context["registry"], inputs["image"])
    picture = depth_image(depth)

    OUT.mkdir(exist_ok=True)
    name = f"{context.get('batch', uuid.uuid4().hex[:8])}-depth.png"
    picture.save(OUT / name)
    context.setdefault("saved", []).append(name)

    return {"image": picture, "depth": depth, "file": name}


def _save(inputs, params, context) -> dict[str, Any]:
    OUT.mkdir(exist_ok=True)
    stem = (params["name"] or "layer").strip().replace(" ", "-") or "layer"
    name = f"{context.get('batch', uuid.uuid4().hex[:8])}-{stem}.png"
    image: Image.Image = inputs["image"]
    image.save(OUT / name)
    # Collected rather than returned, so the service can list everything a run
    # produced without walking the graph again.
    context.setdefault("saved", []).append(name)
    return {"file": name}


CATALOGUE: dict[str, NodeType] = {
    node.key: node
    for node in [
        NodeType(
            key="painting",
            label="Painting",
            category="in",
            summary="The picture to work on.",
            outputs=[Port("image", "image")],
            run=_painting,
        ),
        NodeType(
            key="brush",
            label="Brush",
            category="in",
            summary="Marks drawn on the painting by hand: this, and not that.",
            inputs=[],
            outputs=[Port("points", "points")],
            params=[
                Param(
                    "points",
                    "points",
                    '{"keep":[],"drop":[]}',
                    label="Marks",
                )
            ],
            run=_marks,
        ),
        NodeType(
            key="find",
            label="Find",
            category="cut",
            summary="Where something named might be. The score ranks candidates; it does not say the thing is there.",
            inputs=[Port("image", "image")],
            outputs=[Port("box", "box"), Port("score", "number")],
            params=[
                Param("phrase", "text", "a girl", label="What to look for"),
                Param("threshold", "number", 0.25, label="How sure", minimum=0.05, maximum=0.9, step=0.05),
            ],
            run=_find,
        ),
        NodeType(
            key="isolate",
            label="Isolate",
            category="cut",
            summary="A box in, the exact shape out.",
            inputs=[
                Port("image", "image"),
                # Either will do, and both together is better than either: a
                # box says roughly where, a mark says definitely this and
                # definitely not that.
                Port("box", "box", optional=True),
                Port("points", "points", optional=True),
            ],
            outputs=[Port("mask", "mask"), Port("confidence", "number")],
            run=_isolate,
        ),
        NodeType(
            key="grow",
            label="Grow",
            category="mask",
            summary="Widen a shape. Needed before filling in behind it, or the fill traces its outline.",
            inputs=[Port("mask", "mask")],
            outputs=[Port("mask", "mask")],
            params=[Param("pixels", "number", 12, label="By how much", minimum=0, maximum=200, step=1)],
            run=_grow,
        ),
        NodeType(
            key="invert",
            label="Invert",
            category="mask",
            summary="Everything the shape is not — which is how a background is made, rather than by asking for one.",
            inputs=[Port("mask", "mask")],
            outputs=[Port("mask", "mask")],
            run=_invert,
        ),
        NodeType(
            key="cut",
            label="Cut",
            category="cut",
            summary="The picture showing through the shape, as a layer with a softened edge.",
            inputs=[Port("image", "image"), Port("mask", "mask")],
            outputs=[Port("image", "image"), Port("covers", "number")],
            params=[Param("feather", "number", 1.8, label="Soften the edge", minimum=0, maximum=12, step=0.2)],
            run=_cut,
        ),
        NodeType(
            key="fill",
            label="Fill behind",
            category="paint",
            summary="Paint over a shape with what might have been behind it. Plausible rather than painted.",
            inputs=[Port("image", "image"), Port("mask", "mask")],
            outputs=[Port("image", "image")],
            run=_fill,
        ),
        NodeType(
            key="depth",
            label="Depth",
            category="mask",
            summary="How far away each part of the painting is. White is near, black is far.",
            inputs=[Port("image", "image")],
            outputs=[Port("image", "image"), Port("depth", "depth"), Port("file", "text")],
            run=_depth,
        ),
        NodeType(
            key="edit",
            label="Edit",
            category="paint",
            summary=(
                "Change part of a painting by asking for it. Minutes, not seconds — "
                "the model is larger than the card and is streamed through it. "
                "Join a mask to change only that part; without one the whole canvas "
                "is repainted and the brushwork drifts."
            ),
            inputs=[Port("image", "image"), Port("mask", "mask", optional=True)],
            outputs=[Port("image", "image")],
            params=[
                Param("instruction", "text", "make the jumper deep red", label="What to change"),
                Param("steps", "number", 20, label="Steps", minimum=4, maximum=50, step=1),
                Param("guidance", "number", 4.0, label="How literally", minimum=1, maximum=10, step=0.5),
                Param("seed", "number", 7, label="Seed", minimum=0, maximum=99999, step=1),
            ],
            run=_edit,
        ),
        NodeType(
            key="save",
            label="Keep",
            category="out",
            summary="Write it out. Nothing leaves this machine until you do something else with it.",
            inputs=[Port("image", "image")],
            outputs=[Port("file", "text")],
            params=[Param("name", "text", "layer", label="Call it")],
            run=_save,
        ),
    ]
}


# The explanations live in `help.py` and are fastened on here, so a node is
# defined in one place and described in another without either forgetting the
# other. A node with no entry still works; its ? is simply quiet.
CATALOGUE = {
    key: replace(
        node,
        help=HELP.get(key, ""),
        params=[replace(p, help=PARAM_HELP.get((key, p.name), "")) for p in node.params],
    )
    for key, node in CATALOGUE.items()
}
