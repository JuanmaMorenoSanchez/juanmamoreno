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
        "is needed and none will help — Keep takes a picture, not a film.\n\n"
        "The clip comes out the shape the painting is. The model needs both "
        "sides to be multiples of sixteen, which a painting almost never is, "
        "so it is generated at the model's size and written at the painting's. "
        "Width out and Height out are for asking for something else; left at "
        "zero they mean the painting.\n\n"
        "The two dots on the right marked width and height are not settings. "
        "They are what the clip came out at, for whatever comes after: the "
        "shelf shows them beside a kept clip, and a video cannot be measured "
        "by loading it into a picture."
    ),
    "scenes": (
        "Several scenes in one clip, each carrying on from the last frame of the one "
        "before. One sentence per scene, one to a line.\n\n"
        "**Why this exists.** The model holds every frame of a clip in memory at once, "
        "so twelve seconds is four times the memory of three and this card has none to "
        "spare: a single clip stops at five seconds and that is the card talking, not a "
        "preference. Each scene here is generated on its own, at the cost of one clip, "
        "and the frames are joined at the end. The length is bounded by patience "
        "instead.\n\n"
        "**What it costs is faithfulness.** The first scene starts from your painting. "
        "The second starts from a frame the model drew of your painting, and the third "
        "from a frame drawn of that. The brushwork softens with every hop, and by the "
        "fourth it is a copy of a copy. Six is the most it will chain, and three is "
        "usually where it stops looking like yours.\n\n"
        "**Write what happens, scene by scene**, and keep each line about motion: she "
        "turns her head towards the window, then the light fails and the room goes "
        "blue. A line describing what the thing looks like wastes a scene, because the "
        "frame it starts from already supplies that.\n\n"
        "Minutes per scene, the same as Video. Find the motion with two scenes at three "
        "seconds before asking for six."
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
        "With a mask, everything outside it is your original, untouched.\n\n"
        "**In my style** decides whose hand it comes back in. Off, the model paints in "
        "whatever manner it likes, which is often photographic. Set to oil or "
        "watercolour, two of his own paintings go in beside the canvas and the "
        "instruction says they are the manner and not the subject: no training, no "
        "second model, the same minutes.\n\n"
        "This was a second box called My style for a week, and it was this one with "
        "two reference images and a sentence in front — same model, same mask, same "
        "settings. Two boxes for one operation is a choice to be made before you know "
        "which you want.\n\n"
        "Which two references matters more than any number here. **Which references** "
        "steps through the pairs and wraps, and is the first thing to change when the "
        "hand comes out wrong. A figure walking in from one of them is the failure to "
        "watch for: raise **how literally** and it holds closer to the canvas it was "
        "given. The references are his own paintings, by medium, downloaded from the "
        "catalogue by fetch_references.py — a hundred and four oils and sixty-two "
        "watercolours, eight of each kept here."
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


#: The draft switch, which both of the slow nodes carry and which says the
#: same thing on each: the same picture, fewer steps.
_FUN = (
        "Boring is your painting barely touched. Fun is the model's own version of it, taken whole and pushed hard. One dial, over two of the model's settings."
        "\n\n"
        "It was built the other way round first. Shown five results from one painting you ranked the untouched painting last and the gentlest result second last, and liked everything above the middle — so boring is not a softer edit, it is no edit, and the bottom of this lands within a couple of counts of your own paint. Keep it low for a precise change like a roof going grey; push it up when you want the model to have the idea."
        "\n\n"
        "The top end is forced rather than obedient: edges harden, colour goes flat and speckles, the brushwork reads as plastic. That is the lossy look, and it is also four times slower — the gentle end measured ninety seconds against four hundred and twenty-nine, because anything forced runs the model a second time for the negative prompt. It stops where the looking stopped; the model would go further and nobody has watched it."
)

_SHAPE = (
        "What proportions to end up in. **Keep** leaves the painting as you painted it; the other two crop it, from the middle, to a shape Instagram shows whole — 1.91 to one across, and down the page four to five for a picture or nine to sixteen for a clip, because a feed and a reel do not want the same tall shape."
        "\n\n"
        "Cropping means cropping. A panorama taken to a reel keeps a strip of itself and loses the rest — 1999 across by 447 down keeps about an eighth of its width. Crop it yourself first if you want a different part of it."
        "\n\n"
        "It is also how a painting too far from square gets animated at all. The model tears a frame it was never trained to draw, so a shape that is refused for being lopsided will go through once a posted shape is chosen."
)


_FROM_THE_PAINTING = (
        "On, a clip opens on your painting and then begins to move. Off, it opens where the moving has already started — the first second and a quarter is generated and then cut off."
        "\n\n"
        "Which you want depends on what the clip is for. Opening on the painting is right when the painting is the subject and the motion is the surprise. It is wrong when the painting is already a picture you have: a reel of it coming to life spends its first second being a still, which is a second of a reel."
        "\n\n"
        "It is paid for in frames. The second and a quarter is generated either way and simply thrown away when it is off, so a clip costs about twenty-eight frames more — enough, on a painting kept at its own proportions, to push a three second clip past what the card holds. Choose a shape and it fits comfortably."
    )


_DRAFT = (
        "Four steps instead of all of them, at a quarter of the pixels: same "
        "prompt, same seed, same references, same mask. Expect the composition "
        "to hold and the detail to move — four steps of a twenty-step schedule "
        "is the same path walked in bigger strides, not the same image at lower "
        "quality — and expect a little of the composition to move too, because "
        "a model given less canvas arranges things a little differently. A "
        "draft is a promise about the idea, not about the picture."
        "\n\n"
        "Both, because both were measured. A step at the size the pipeline "
        "picks for itself is 33.4 seconds; at a quarter of the pixels it is "
        "26.3, which is a fifth off. Four steps instead of twenty is the other "
        "five times. A four-step draft that was fourteen minutes is a hundred "
        "and seven seconds."
        "\n\n"
        "What a step still mostly costs is the model arriving: twelve "
        "gigabytes of transformer, twice over — once for the instruction and "
        "once for the negative prompt — and dequantised on the way through. "
        "Neither cares how big the picture is, which is why the pixels are "
        "worth a fifth and not more. Turning guidance down to one is worth the "
        "other pass."
)

PARAM_HELP: dict[tuple[str, str], str] = {
    ("video", "from_the_painting"): _FROM_THE_PAINTING,
    ("scenes", "from_the_painting"): _FROM_THE_PAINTING,
    ("edit", "fun"): _FUN,
    ("video", "fun"): _FUN,
    ("scenes", "fun"): _FUN,
    ("edit", "shape"): _SHAPE,
    ("video", "shape"): _SHAPE,
    ("scenes", "shape"): _SHAPE,
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
    ("edit", "draft"): _DRAFT,
    ("video", "draft"): _DRAFT,
    ("video", "seed"): (
        "Which random start to use. The same seed, sentence and painting give "
        "the same clip, so change it to roll again and keep it when something "
        "nearly worked."
    ),
    ("scenes", "asking"): (
        "One scene per line. Each starts from the last frame of the one above it, so "
        "they read as a sequence: what happens first, then what happens next."
    ),
    ("scenes", "seconds"): (
        "How long each scene runs, not the whole clip. Six scenes at three seconds is "
        "eighteen seconds of film and six times the wait of one."
    ),
    ("scenes", "seed"): (
        "The random start for the first scene; the others walk up from it. Changing a "
        "later sentence does not reroll the scenes before it."
    ),
    ("video", "in_a_scene"): (
        "What the painting is to the model. Off, it is the whole frame and the sentence "
        "is what happens on the canvas. On, it is an object standing in a wider frame "
        "and the sentence is what is around it: on an easel in the mountains, with "
        "people arriving.\n\n"
        "Off is the right answer for motion in the picture, and was the only answer "
        "until a painting asked to be on an easel in a mountain came back filling the "
        "screen with the mountain inside it. The model is image-to-video: the image it "
        "is given is the first frame, so a painting that fills the frame can only be "
        "the scene."
    ),
    ("scenes", "in_a_scene"): (
        "As on Video, and applied to the first scene only: after it the frame already "
        "holds the scene, and staging it again would put a picture of the mountain on "
        "an easel in another mountain."
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
    ("edit", "seed"): (
        "Which random start to use. The same seed and instruction give the same "
        "picture, so change it to roll again and keep it to reproduce something you "
        "liked."
    ),
    ("edit", "style"): (
        "Oil or watercolour. Each is a different set of his paintings, and the two "
        "hands are not interchangeable: a watercolour reference will thin an oil "
        "painting out."
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
    ("video", "seconds"): Advice(
        above=4,
        high="The model works on the whole clip at once, so five seconds is "
        "well over twice the wait of three. Find the motion at three.",
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
