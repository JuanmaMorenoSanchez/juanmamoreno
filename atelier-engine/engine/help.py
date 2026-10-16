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

from .nodes import Advice

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
    "video": (
        "A painting and a sentence, into a few seconds of actual video.\n\n"
        "This is the thing Depth deliberately will not do. Parallax can only "
        "move pixels you painted, which is why it stays faithful; this invents "
        "every frame after the first, and will resolve a brushstroke into "
        "something photographic if you let it. Both are here because they are "
        "different jobs — one shows your painting moving, the other makes a "
        "film of it.\n\n"
        "The slowest box by a distance. Wan 2.2 is five billion parameters "
        "quantised to five and a half gigabytes, streamed through the card a "
        "block at a time, and the text encoder alone is eleven gigabytes "
        "before a single step runs. Expect the first clip of a session to "
        "spend minutes doing nothing visible.\n\n"
        "Keep it short and small. Seconds and the longest side are what cost "
        "the time, and they multiply: four seconds at 1280 is not twice two "
        "seconds at 832, it is many times it. Find the motion you want at two "
        "seconds and 832, then raise it once.\n\n"
        "It writes an mp4 into the engine's folder and nothing else. No Keep "
        "is needed and none will help — Keep takes a picture, not a film."
    ),
    "sketch": (
        "Writes a small moving piece from a sentence, as code, which then runs "
        "beside the box.\n\n"
        "The target is unusually small, and that is the only reason a model "
        "this size can hit it: one interface, a canvas, no framework and no "
        "library, with the motion helpers already written for the other pieces "
        "to draw on. It would not write an application. It can write one draw "
        "method.\n\n"
        "Two models, both Apache 2.0. The big one is seven billion parameters "
        "and split across the card, the memory and the disk, so it takes "
        "minutes; the small one fits the card and answers in seconds, and "
        "writes worse code. There is a middle size which is not offered, "
        "because its licence forbids commercial use and paintings are sold "
        "from this site.\n\n"
        "What comes back runs in a frame of its own with no network and no "
        "reach into this page, so a piece that misbehaves can only misbehave "
        "at itself. Expect to run it more than once: a sentence is a loose "
        "brief and the model is small."
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
    "my-style": (
        "Repaints the picture in his own hand, by showing the model two of his "
        "paintings beside it.\n\n"
        "No training and nothing new downloaded. Qwen-Image-Edit takes three images, "
        "so the canvas goes in with two of his own and an instruction saying the "
        "other two are the manner and not the subject. The same model as Edit, at "
        "the same price in minutes: what differs is what it is shown.\n\n"
        "Which two matters more than any setting here. Which references steps "
        "through the pairs and wraps, so a style that comes out wrong is worth "
        "another go with a different pair before it is worth a different number.\n\n"
        "A figure walking in from one of the references is the failure to watch for. "
        "The instruction tells it to take nothing but the handling, and it does not "
        "always listen; raising How literally holds it closer to the canvas it was "
        "given.\n\n"
        "The references are his own paintings, by medium, downloaded from the "
        "catalogue by fetch_references.py. Oil has a hundred and four to draw on and "
        "watercolour sixty-two; eight of each are kept here."
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
    ("video", "prompt"): (
        "What should happen, as motion rather than as description. The dust "
        "drifts and the light shifts works; a dusty room is weaker, because "
        "it says nothing about what moves. The painting already supplies what "
        "the thing looks like — this supplies what it does."
    ),
    ("video", "seconds"): (
        "How long the clip runs. The single most expensive setting here: the "
        "model works on the whole clip at once, so five seconds is not twice "
        "the wait of two and a half. Rounded to what the model will take, "
        "which is a frame count of 4n+1 at 24 frames a second.\n\n"
        "Three seconds is the floor and cannot be lowered. Instagram refuses a "
        "reel shorter than that, and it refuses it at the point of publishing "
        "— after the twenty-odd minutes of making it."
    ),
    ("video", "steps"): (
        "How many passes over the whole clip. Fewer is faster and mushier, "
        "and below about twenty the motion starts to judder rather than "
        "flow. Thirty is a reasonable place to start."
    ),
    ("video", "guidance"): (
        "How literally to take the sentence. Higher follows the words and can "
        "force motion that was not in the painting; lower drifts and "
        "sometimes barely moves at all."
    ),
    ("video", "seed"): (
        "Which random start to use. The same seed, sentence and painting give "
        "the same clip, so change it to roll again and keep it when something "
        "nearly worked."
    ),
    ("video", "longest"): (
        "How big to generate, on the long side. The painting is thousands of "
        "pixels across and the model was trained near this size — asked for "
        "the full thing it would run out of memory long before it finished. "
        "Raise it only once the motion is right."
    ),
    ("sketch", "asking"): (
        "What the piece should do, in a sentence. Concrete and visual works best — "
        "what moves, what colour, how fast. A brief it cannot picture comes back as "
        "something generic."
    ),
    ("sketch", "small"): (
        "Use the 1.5B model instead of the 7B. Seconds rather than minutes, and "
        "noticeably worse code. Worth it while trying wordings out."
    ),
    ("sketch", "most_tokens"): (
        "How long the answer may be. A sketch is rarely more than six hundred tokens; "
        "raising this mostly buys comments."
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
    ("my-style", "style"): (
        "Oil or watercolour. Each is a different set of his paintings, and the two "
        "hands are not interchangeable: a watercolour reference will thin an oil "
        "painting out."
    ),
    ("my-style", "asking"): (
        "Left empty it only restyles. Anything typed here is carried out in the same "
        "pass, on top of the repaint, so the sky goes to evening restyles and changes "
        "the sky at once."
    ),
    ("my-style", "pick"): (
        "Which pair of his paintings to show it. Zero is the first two, one the next "
        "two, and it wraps round. The cheapest thing to change when the hand is "
        "wrong."
    ),
    ("my-style", "steps"): (
        "How many passes. More is slower and usually slightly better, and each one "
        "costs about a hundred seconds here."
    ),
    ("my-style", "guidance"): (
        "How literally to hold to the canvas it was given. Higher keeps your "
        "composition and resists the references; lower lets them lead and is where a "
        "figure from one of them starts to walk in."
    ),
    ("my-style", "seed"): (
        "Which random start to use. The same seed, style and pair give the same "
        "picture."
    ),
    ("save", "name"): (
        "What to call the file. A run can keep several things and they are told apart "
        "by this."
    ),
}
"""Keyed by node and parameter, because `steps` means different things elsewhere."""

PARAM_ADVICE: dict[tuple[str, str], Advice] = {
    ("find", "threshold"): Advice(
        below=0.15,
        above=0.5,
        low="Under about 0.15 it offers a box for almost anything asked of it: "
        "a unicorn came back at 0.395 from a canvas with none.",
        high="Over about 0.5 it loses real things before it loses invented ones. "
        "A phrase that keeps finding the wrong thing wants a Brush, not a "
        "higher number.",
    ),
    ("grow", "pixels"): Advice(
        below=2,
        above=40,
        low="Under two pixels is not a widening: the fill has nothing to work "
        "with and the old edge shows through.",
        high="Past about forty it eats into what is genuinely behind the thing, "
        "and the fill invents a wall where an arm was. About one percent of "
        "the canvas is usually right.",
    ),
    ("cut", "feather"): Advice(
        above=4,
        high="Past four pixels it stops looking like a join and starts looking "
        "like a glow around the layer.",
    ),
    ("edit", "steps"): Advice(
        below=12,
        above=35,
        low="Below about ten passes it tends to come apart: the change is there "
        "and the paint around it is mush.",
        high="Each pass costs about a hundred seconds here, so this is over an "
        "hour, and past thirty-five the picture barely changes. Raise the "
        "seed instead and run it again.",
    ),
    ("edit", "guidance"): Advice(
        below=2.5,
        above=7,
        low="Under about 2.5 it wanders off the instruction and repaints "
        "whatever it likes.",
        high="Over about seven it forces the words through: edges harden, "
        "colour goes flat, and the brushwork reads as plastic.",
    ),
    ("my-style", "steps"): Advice(
        below=12,
        above=35,
        low="Below about ten passes the references do not take: it comes back "
        "neither his hand nor the original.",
        high="Each pass costs about a hundred seconds here, so this is over an "
        "hour for a difference that is hard to see.",
    ),
    ("my-style", "guidance"): Advice(
        below=2.5,
        above=7,
        low="Under about 2.5 the references lead, and this is where a figure "
        "from one of them walks into the canvas.",
        high="Over about seven it holds so tightly to the original that the "
        "hand does not come across at all.",
    ),
    ("my-style", "pick"): Advice(
        above=3,
        high="There are eight references per style, two to a pair, so anything "
        "over three wraps round to a pair already offered.",
    ),
    ("video", "seconds"): Advice(
        above=4,
        high="The model works on the whole clip at once, so five seconds is "
        "well over twice the wait of three. Find the motion at three.",
    ),
    ("video", "steps"): Advice(
        below=20,
        above=40,
        low="Below about twenty the motion judders rather than flows.",
        high="Over about forty is minutes of extra waiting for motion that "
        "looks the same.",
    ),
    ("video", "guidance"): Advice(
        below=3,
        above=7,
        low="Under about three it drifts, and sometimes barely moves at all.",
        high="Over about seven it forces motion the painting never suggested.",
    ),
    ("video", "longest"): Advice(
        above=960,
        high="The model was trained near 832, and the time and the memory both "
        "grow with the area. Raise this only once the motion is right.",
    ),
    ("sketch", "most_tokens"): Advice(
        below=400,
        above=1400,
        low="Under about four hundred tokens it is cut off mid-function and the "
        "piece will not run.",
        high="A sketch is rarely more than six hundred tokens. Past about "
        "fourteen hundred this buys comments and a model talking to itself.",
    ),
}
"""What is wise, where that is narrower than what the node will accept.

Keyed like PARAM_HELP and deliberately beside it: a number in red on screen
needs the sentence that justifies it within reading distance, or the next
person to touch it cannot tell a measurement from a guess.

Nothing here for a seed, a name or a style: every value is as good as another.
"""
