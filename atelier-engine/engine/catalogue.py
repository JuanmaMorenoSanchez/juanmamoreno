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

from .coder import write_sketch
from .depth import as_image as depth_image, measure as measure_depth
from . import house
from . import dials
from .draft import size as draft_size, steps as draft_steps
from .edit import (
    available as edit_available,
    edit as edit_painting,
    forget as forget_editor,
    ready as editor_ready,
)
from .style import (
    OFF as STYLE_OFF,
    STYLES,
    available as style_available,
    instruction as style_instruction,
    references as style_references,
)
from .help import HELP, PARAM_ADVICE, PARAM_HELP
from .images import coverage, grow as grow_mask, remainder, to_layer
from .inpaint import fill as fill_behind
from .video import (
    animate as animate_painting,
    forget as forget_clips,
    ready as clips_ready,
    scenes as scene_by_scene,
    shown as shown_size,
    write_video,
)
from .nodes import GraphError, NodeType, Param, Port
from .operations import find as find_things, isolate as isolate_thing

OUT = Path(__file__).resolve().parent.parent / "out"


def _painting(inputs, params, context) -> dict[str, Any]:
    """The picture everything starts from, as uploaded with the graph."""
    painting = context.get("painting")
    if painting is None:
        raise ValueError("no painting was sent with this graph")
    return {"image": painting}


def _make_room(context: dict[str, Any], keeping: str) -> None:
    """Hand the card to the box that is about to use it, and to nothing else.

    There are two twelve-gigabyte pipelines here and one eight-gigabyte card.
    Every box that needs the card already dropped whatever the registry was
    holding; none of them dropped the *other* pipeline, because each is kept by
    a cache of its own that the registry knows nothing about.

    So a clip followed by an edit found six and a half gigabytes of the card
    already gone, with `/health` reporting nothing resident, and died of
    "CUDA error: out of memory" after two hundred and eighteen seconds of
    preparing — which is the worst shape a failure can have: long, silent, and
    at the end.

    `keeping` is the one pipeline this box is about to use, by name, so that two
    edits in a row do not rebuild the editor between them. The driver is asked
    for the memory back last, because until the thing holding it has been
    dropped there is nothing to hand over.

    **Asked every time, which was briefly not the case.** Emptying the
    allocator's cache also returns every warm block in it, so it was made
    conditional on something actually having been dropped — and measured, on a
    single run, that cost nothing either way.

    Across runs it is ruinous. An edit keeps the editor, so nothing is dropped,
    so the cache was never emptied, and what each run leaves behind accumulates
    until the card has no free memory at all. Then Windows does what it does:
    it oversubscribes into system memory rather than failing. Measured on five
    edits in a row — the first took 361 seconds and the second **4,179**, with
    `/health` reporting nought free and the card at a hundred per cent.

    It is the same cliff `LEAVE` is about, reached from the other direction.
    """
    registry = context.get("registry")
    if registry is not None:
        registry.evict()
    if keeping != "edit":
        forget_editor()
    if keeping != "video":
        forget_clips()
    if registry is not None:
        registry.release()


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


#: How many steps an edit takes when it is not drafting.
#:
#: Held rather than offered. It was a field from four to fifty, and the only
#: two answers anybody needs are "enough" and "this is a draft" — which is what
#: the switch beside it already says.
EDIT_STEPS = 20

#: The same, for a clip.
CLIP_STEPS = 30

#: How big a clip is generated, on the long side.
#:
#: Also held. 832 is the size the card has been measured to hold for three
#: seconds; the field offered 448 to 1280 and anything past 832 runs out of
#: memory at the length he actually asks for.
CLIP_LONGEST = 832

#: How much of the frame a staged painting takes.
#:
#: Held at the middle of what used to be a field. Its own note said that under
#: twenty-five the painting loses its detail and over sixty there is no scene
#: left to stand it in — a dial whose both ends are wrong is a default wearing
#: a disguise.
CLIP_ROOM = 45


def _edit(inputs, params, context) -> dict[str, Any]:
    """Change part of a painting by asking for it, in his hand or in anyone's.

    **One box, with a switch.** My style was a second box for a week and it was
    this one with two reference images and a sentence in front: same model,
    same minutes, same mask, same settings. Two boxes for one operation is a
    choice to make before knowing which you want, and the switch is the same
    choice made at the moment it matters.

    The segmenter is dropped first. This model is streamed block by block
    through the card, and anything else resident is memory it has to work
    around — the registry holds one model at a time and this is the moment
    that rule earns itself.
    """
    house.refuse_unknown()

    hand = str(params.get("style") or STYLE_OFF)
    if hand != STYLE_OFF and not style_available(hand):
        raise GraphError(
            f"there are no {hand} paintings to work from. "
            "Run `python fetch_references.py` in atelier-engine."
        )

    _make_room(context, keeping="edit")

    saying = context.get("saying")
    if saying is not None and not editor_ready():
        # Measured at about two and a half minutes the first time in a process:
        # the spill is cleared and the text encoder written back out. Said only
        # when it is about to happen — a run whose prompt is already known
        # reaches its first step in 1.2 seconds.
        saying("preparing the model — the first edit of a session takes a few minutes before it starts")

    mask = inputs.get("mask")
    seed = int(params["seed"])
    drafting = bool(params.get("draft"))
    far, guidance = dials.fun(float(params.get("fun", dials.FUN_USUALLY)))

    # Cut to shape before anything else, so what the model is shown is what
    # comes back. A mask belongs to the painting it was drawn on, so cropping
    # is refused rather than silently moving it out from under one.
    painting = dials.cropped(inputs["image"], str(params.get("shape") or dials.KEEP))
    if mask is not None and painting is not inputs["image"]:
        raise GraphError(
            "a shape cannot be chosen for a painting that has a mask on it — the mask was "
            "drawn on the whole picture and cropping would move it. Crop first, then mask."
        )

    return {
        "image": edit_painting(
            painting,
            style_instruction(hand, str(params["instruction"])),
            mask=np.asarray(mask, dtype=bool) if mask is not None else None,
            # Which pair of his paintings, from the seed. It used to be a
            # setting of its own, 0 to 20, of which only 0 to 3 did anything.
            # Tied here instead, so the same seed is the same picture all the
            # way through.
            references=(
                style_references(hand, seed % 4) if hand != STYLE_OFF else None
            ),
            steps=draft_steps(EDIT_STEPS, drafting),
            size=draft_size(painting.size, drafting),
            guidance=guidance,
            far=far,
            seed=seed,
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


def _sketch(inputs, params, context) -> dict[str, Any]:
    """A generative piece, written from a sentence.

    The segmenter is dropped first: even the small coder wants three gigabytes,
    and the big one is split across the card, memory and disk.
    """
    _make_room(context, keeping="nothing")

    saying = context.get("saying")
    if saying is not None:
        saying("writing the piece — the big model is split across disk and takes minutes")

    code = write_sketch(
        registry,
        params["asking"],
        small=bool(params["small"]),
        most_tokens=int(params["most_tokens"]),
    )

    OUT.mkdir(exist_ok=True)
    batch = context.get("batch") or uuid.uuid4().hex[:8]
    name = f"{batch}-{uuid.uuid4().hex[:4]}-piece.js"
    (OUT / name).write_text(code, encoding="utf-8")
    return {"code": code, "file": name}


def _video(inputs, params, context) -> dict[str, Any]:
    """A painting and a sentence, into a few seconds of video.

    The opposite trade to Depth. Parallax can only move pixels he painted,
    which is why it stays faithful; this invents every frame after the first.
    Both are wanted, for different jobs.

    Everything else is dropped first: the transformer is streamed off the disk
    a block at a time and the text encoder is eleven gigabytes on its own, so
    anything else resident is memory this has to work around.
    """
    _make_room(context, keeping="video")

    house.refuse_unknown()

    saying = context.get("saying")
    if saying is not None and not clips_ready():
        saying("preparing the model — the first clip of a session spends minutes before a step runs")

    # A clip is cut to shape before it moves, so the model composes inside the
    # frame it will be posted in rather than having it taken off afterwards.
    painting = dials.cropped(
        inputs["image"], str(params.get("shape") or dials.KEEP), moving=True
    )
    _, guidance = dials.fun(float(params.get("fun", dials.FUN_USUALLY)))

    frames = animate_painting(
        painting,
        params["prompt"],
        seconds=float(params["seconds"]),
        steps=draft_steps(CLIP_STEPS, bool(params.get("draft"))),
        guidance=guidance,
        seed=int(params["seed"]),
        longest=CLIP_LONGEST,
        in_a_scene=bool(params["in_a_scene"]),
        room=CLIP_ROOM,
        watching=context.get("watching_steps"),
        stopped=context.get("stopped"),
    )

    if saying is not None:
        saying("encoding the clip")

    OUT.mkdir(exist_ok=True)
    name = f"{context.get('batch') or uuid.uuid4().hex[:8]}-clip.mp4"

    # The shape he painted, not the multiple of sixteen the model needed. The
    # frames are generated at the model's size and written at the painting's —
    # which is the cropped one when a shape was chosen, so the file comes out
    # at the proportions it will be posted at.
    size = shown_size(
        painting,
        frames[0].shape[1::-1],
        width=0,
        height=0,
        in_a_scene=bool(params["in_a_scene"]),
    )
    write_video(frames, OUT / name, size=size)
    wide, high = size
    # Not added to `saved`: that list is pictures the page shows and offers to
    # keep, and an mp4 in it rendered as a broken image.
    #
    # The size is reported because nothing else can tell it cheaply: a video
    # cannot be measured by loading it into an Image, and decoding one to ask
    # would cost megabytes for two numbers.
    return {"file": name, "frames": len(frames), "width": wide, "height": high}


def _scenes(inputs, params, context) -> dict[str, Any]:
    """One clip in several scenes, each carrying on from the last frame before.

    The same model and the same cost per scene as Video; what it buys is
    length the card could not hold in one pass, and what it costs is the paint
    softening with every hop.
    """
    _make_room(context, keeping="video")

    saying = context.get("saying")
    if saying is not None and not clips_ready():
        saying("preparing the model — the first clip of a session spends minutes before a step runs")

    painting = dials.cropped(
        inputs["image"], str(params.get("shape") or dials.KEEP), moving=True
    )
    _, guidance = dials.fun(float(params.get("fun", dials.FUN_USUALLY)))

    frames = scene_by_scene(
        painting,
        str(params["asking"]).splitlines(),
        seconds=float(params["seconds"]),
        steps=CLIP_STEPS,
        guidance=guidance,
        seed=int(params["seed"]),
        longest=CLIP_LONGEST,
        in_a_scene=bool(params["in_a_scene"]),
        room=CLIP_ROOM,
        watching=context.get("watching_steps"),
        stopped=context.get("stopped"),
        saying=saying,
    )

    if saying is not None:
        saying("encoding the clip")

    OUT.mkdir(exist_ok=True)
    name = f"{context.get('batch') or uuid.uuid4().hex[:8]}-scenes.mp4"
    size = shown_size(
        painting,
        frames[0].shape[1::-1],
        width=0,
        height=0,
        in_a_scene=bool(params["in_a_scene"]),
    )
    write_video(frames, OUT / name, size=size)
    wide, high = size
    return {
        "file": name,
        "frames": len(frames),
        "width": wide,
        "height": high,
        # The one number that is not obvious from the others: a scene is not a
        # fixed length, because the frame count is rounded to what the latent
        # divides by.
        "scenes": len([said for said in str(params["asking"]).splitlines() if said.strip()]),
    }


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
                "Change part of a painting by asking for it, in any hand or in his. "
                "Minutes, not seconds — the model is larger than the card and is "
                "streamed through it. Join a mask to change only that part; without "
                "one the whole canvas is repainted and the brushwork drifts."
            ),
            inputs=[Port("image", "image"), Port("mask", "mask", optional=True)],
            outputs=[Port("image", "image")],
            params=[
                Param("instruction", "text", "make the jumper deep red", label="What to change"),
                # The switch that used to be a second box. `none` leaves the
                # model to its own hand, which is what an edit always did.
                Param(
                    "style",
                    "choice",
                    STYLE_OFF,
                    label="In my style",
                    choices=(STYLE_OFF, *STYLES),
                ),
                # One dial over two of the model's numbers. See `dials.fun`.
                Param(
                    "fun",
                    "slider",
                    dials.FUN_USUALLY,
                    label="Boring to fun",
                    minimum=dials.FUN_LEAST,
                    maximum=dials.FUN_MOST,
                    step=0.5,
                ),
                Param(
                    "shape",
                    "choice",
                    dials.KEEP,
                    label="Shape",
                    choices=dials.SHAPES,
                ),
                Param("seed", "number", 7, label="Seed", minimum=0, maximum=99999, step=1),
                # Four steps instead of twenty, at a quarter of the pixels.
                Param("draft", "toggle", False, label="Draft first"),
            ],
            run=_edit,
        ),
        NodeType(
            key="video",
            label="Video",
            category="paint",
            summary=(
                "A painting and a sentence into a few seconds of video. The slowest "
                "thing here by a distance, and the only one that invents motion "
                "rather than moving what you painted."
            ),
            inputs=[Port("image", "image")],
            outputs=[
                Port("file", "text"),
                Port("frames", "number"),
                Port("width", "number"),
                Port("height", "number"),
            ],
            params=[
                Param("prompt", "text", "the dust drifts slowly, the light shifts", label="What happens"),
                Param("seconds", "number", 3.0, label="How long", minimum=3.0, maximum=5.0, step=0.5),
                Param(
                    "fun",
                    "slider",
                    dials.FUN_USUALLY,
                    label="Boring to fun",
                    minimum=dials.FUN_LEAST,
                    maximum=dials.FUN_MOST,
                    step=0.5,
                ),
                Param(
                    "shape",
                    "choice",
                    dials.KEEP,
                    label="Shape",
                    choices=dials.SHAPES,
                ),
                Param("seed", "number", 7, label="Seed", minimum=0, maximum=99999, step=1),
                Param("draft", "toggle", False, label="Draft first"),
                Param(
                    "in_a_scene",
                    "toggle",
                    False,
                    label="The painting in a scene",
                ),
            ],
            run=_video,
        ),
        NodeType(
            key="scenes",
            label="Scenes",
            category="paint",
            summary=(
                "Several scenes in one clip, each carrying on from the last frame of "
                "the one before. One sentence per scene, one to a line. Longer than "
                "the card can hold in a single pass, at the cost of the paint "
                "softening with every scene."
            ),
            inputs=[Port("image", "image")],
            outputs=[
                Port("file", "text"),
                Port("frames", "number"),
                Port("width", "number"),
                Port("height", "number"),
                Port("scenes", "number"),
            ],
            params=[
                Param(
                    "asking",
                    "text",
                    # Two lines, because one would read as a single prompt and
                    # the whole of this box is that each line is a scene.
                    "\n".join(
                        (
                            "she turns her head towards the window",
                            "the light fails and the room goes blue",
                        )
                    ),
                    label="The scenes",
                ),
                Param("seconds", "number", 3.0, label="Each scene", minimum=3.0, maximum=5.0, step=0.5),
                Param(
                    "fun",
                    "slider",
                    dials.FUN_USUALLY,
                    label="Boring to fun",
                    minimum=dials.FUN_LEAST,
                    maximum=dials.FUN_MOST,
                    step=0.5,
                ),
                Param(
                    "shape",
                    "choice",
                    dials.KEEP,
                    label="Shape",
                    choices=dials.SHAPES,
                ),
                Param("seed", "number", 7, label="Seed", minimum=0, maximum=99999, step=1),
                Param(
                    "in_a_scene",
                    "toggle",
                    False,
                    label="The painting in a scene",
                ),
            ],
            run=_scenes,
        ),
        NodeType(
            key="sketch",
            label="Sketch",
            category="paint",
            summary="Writes a small generative piece from a sentence, in Canvas 2D.",
            inputs=[],
            outputs=[Port("code", "text"), Port("file", "text")],
            params=[
                Param("asking", "text", "dust drifting across a dark field", label="What it should do"),
                Param("small", "toggle", False, label="Use the small model"),
                Param("most_tokens", "number", 900, label="At most", minimum=200, maximum=2000, step=50),
            ],
            run=_sketch,
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
        params=[
            replace(
                p,
                help=PARAM_HELP.get((key, p.name), ""),
                advice=PARAM_ADVICE.get((key, p.name)),
            )
            for p in node.params
        ],
    )
    for key, node in CATALOGUE.items()
}
