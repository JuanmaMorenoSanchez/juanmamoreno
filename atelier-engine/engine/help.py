"""
What each box says when you press the ? beside its name.

Kept apart from `catalogue.py` so it reads as prose rather than as arguments,
and kept in the engine rather than in the page for the same reason the ports
are: a node has to arrive complete, explanation and all, or the two drift apart
the moment anyone is in a hurry.

Written for somebody who knows their own paintings and not these models. Each
one says what the box is for, then what it is bad at — because every failure
recorded here was found the hard way, and reading about it beforehand is
cheaper than meeting it.
"""

from __future__ import annotations

HELP: dict[str, str] = {
    "painting": (
        "Where everything starts: the picture chosen above the canvas.\n\n"
        "It is uploaded when you press Run and stored nowhere — not the bucket, not "
        "Firestore, not anywhere on this machine but the engine's own folder. Its "
        "output can feed several boxes at once.\n\n"
        "Nothing to adjust."
    ),
    "brush": (
        "Marks drawn on the painting by hand: a dot for this, a dot for not "
        "that.\n\n"
        "Use it when a word will not do. Naming works when the thing has a name "
        "the model knows — a girl, a shirt — and fails on everything else: a "
        "particular fold, the shadow under an arm, one of two similar figures. "
        "A mark has no such problem, because it points.\n\n"
        "It is not a lesser input than Find. SAM takes points as a first-class "
        "prompt, and a single well-placed dot usually beats a box around "
        "roughly the right area. Two or three negative marks just outside the "
        "thing are what stop it swallowing the background.\n\n"
        "Join it to Isolate. A box and marks together is better than either: "
        "the box says roughly where, the marks say definitely this and "
        "definitely not that."
    ),
    "find": (
        "Asks where something is, by name, and returns a box around its best guess.\n\n"
        "Open-vocabulary, so it is not limited to a list it was taught and odd phrases "
        "are worth trying. Short and concrete works best. It is poor at diffuse "
        "things — a field, a sky — which have no edge to find.\n\n"
        "The score is not a presence test. Asked for a unicorn on a canvas with none, "
        "it returned the arms and the inverted head at 0.395, against 0.418 for a girl "
        "who was really there. Two hundredths apart. A box coming back says nothing "
        "about whether the thing exists, so judge the cut and not the number."
    ),
    "isolate": (
        "Turns a rough box into the exact shape of what is inside it. This is the step "
        "that gives a real edge instead of a rectangle.\n\n"
        "The confidence is its own estimate of the shape. Below about 0.9 is worth a "
        "second look.\n\n"
        "It segments whatever the box frames, not the word you typed: a loose box "
        "around a shirt returns the whole figure, shirt and hands and head, because "
        "that is the object in the frame. Tighter box, tighter shape.\n\n"
        "Needs a box from Find or marks from a Brush — either, or both. Both is "
        "usually best: the box says roughly where and the marks settle what is "
        "in and what is out. When a name keeps finding the wrong thing, the "
        "Brush is the answer, not a better adjective."
    ),
    "grow": (
        "Makes a shape bigger in every direction.\n\n"
        "Almost always wanted before Fill behind. A shape traces the edge of a figure, "
        "and the ring of pixels just outside it still carries the colour the brush "
        "left going past. Fill without growing and the inpainter reads that ring as "
        "context and paints a faint outline of the very thing you removed."
    ),
    "invert": (
        "Everything the shape is not. This is how a background is made.\n\n"
        "Asking for the background directly does not work: the model looks for objects "
        "and a field is not one — asked for a green field it returned confetti "
        "scattered over the foliage. Cut the figures, invert what you took, and what "
        "is left is a better background than it would have drawn, for nothing."
    ),
    "depth": (
        "How far away each part of the painting is, as a grey picture: white "
        "near, black far.\n\n"
        "This is what moves a painting without a video model. The depth map "
        "drives the parallax already written for the generative pieces, which "
        "gives motion that is faithful by construction — it can only move "
        "pixels you painted, so it cannot resolve a brushstroke into a "
        "photograph the way an image-to-video model does.\n\n"
        "A hundred megabytes and about a second, against twelve gigabytes and "
        "eighteen minutes.\n\n"
        "It reads depth from what a painting suggests rather than from any "
        "measurement, so expect it to be confident and sometimes wrong — "
        "a flat area of strong colour can read as near. Keep the map and look "
        "at it; it is a picture like any other."
    ),
    "cut": (
        "The picture showing through a shape, as a transparent layer the size of the "
        "whole canvas.\n\n"
        "Full size rather than trimmed to the shape, because layers are stacked back "
        "over each other for a parallax and have to agree about where they are."
    ),
    "fill": (
        "Paints over a shape with what might have been behind it. Use it on the hole "
        "left by something cut out.\n\n"
        "It runs on the processor rather than the card, so it costs seconds and no "
        "video memory.\n\n"
        "It is plausible rather than painted. It carries a texture across a hole "
        "without leaving a seam, but a large hole comes back as a soft mass, not "
        "brushwork. Behind a parallax layer, glimpsed at the edges, that is enough; on "
        "its own it is not.\n\n"
        "Grow the shape a little first, or it traces an outline of what went."
    ),
    "edit": (
        "Changes part of a painting by asking in words.\n\n"
        "Minutes, not seconds. The model is twenty billion parameters and larger than "
        "the card, so it is streamed through one block at a time: about eighteen "
        "minutes for a small canvas. That is the price of a model that follows an "
        "instruction rather than merely restyling.\n\n"
        "Join a mask and only that part changes. Without one it regenerates the whole "
        "picture — the instruction is obeyed, but the field, the other figures and the "
        "surface of the paint all come back subtly repainted and a little glossier. "
        "With a mask, everything outside it is your original, untouched."
    ),
    "save": (
        "Writes the picture out so it can be seen, and nothing more.\n\n"
        "It lands in the engine's folder on this machine. It does not go to the "
        "bucket, to Firestore, or anywhere near the website.\n\n"
        "Anything worth keeping from a run needs one of these joined to it. Anything "
        "without one is computed, reported as a number, and thrown away."
    ),
}
"""One entry per node. A node without one still works; its ? is simply quiet."""


PARAM_HELP: dict[tuple[str, str], str] = {
    ("brush", "points"): (
        "The marks themselves. Press Draw to put them on the painting: a click "
        "keeps, a shift-click excludes. They are stored on the node, so they "
        "survive a reload along with the rest of the graph."
    ),
    ("find", "phrase"): (
        "What to look for, in plain words. Short and concrete beats elaborate. A word "
        "it does not understand gives a confident box around the wrong thing, so judge "
        "the cut and not the score."
    ),
    ("find", "threshold"): (
        "How sure it must be before offering a box. Lower finds more and is wrong more "
        "often. Raising it loses real things before it loses invented ones, so it is a "
        "blunt instrument."
    ),
    ("grow", "pixels"): (
        "How far to widen, in pixels. About one percent of the canvas is usually right "
        "before a fill. More than that eats into what is genuinely behind."
    ),
    ("cut", "feather"): (
        "How far to soften the edge. A hard edge over brushwork reads as cut paper; "
        "about two pixels makes the join invisible. Past four it starts to look like a "
        "glow."
    ),
    ("edit", "instruction"): (
        "What to change, as an instruction rather than a description. Make the jumper "
        "deep red works; a red jumper is weaker. Say what should stay the same too, if "
        "it matters."
    ),
    ("edit", "steps"): (
        "How many passes. More is slower and usually slightly better, and each one "
        "costs about a hundred seconds here. Below ten it tends to come apart."
    ),
    ("edit", "guidance"): (
        "How literally to take the instruction. Higher follows the words more closely "
        "and can look forced; lower wanders. Four is a reasonable place to start."
    ),
    ("edit", "seed"): (
        "Which random start to use. The same seed and instruction give the same "
        "picture, so change it to roll again and keep it to reproduce something you "
        "liked."
    ),
    ("save", "name"): (
        "What to call the file. A run can keep several things and they are told apart "
        "by this."
    ),
}
"""Keyed by node and parameter, because `steps` means different things elsewhere."""
