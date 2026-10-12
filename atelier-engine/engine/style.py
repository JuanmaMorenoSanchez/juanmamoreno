"""
Editing in his own hand, by showing the model his own paintings.

Qwen-Image-Edit-2509 takes up to three images and works in the manner of the
ones it is shown. So this needs no training and no second model: the painting
being changed, two of his canvases beside it, and an instruction that says the
references are the manner rather than the subject.

**Two references, and that is the ceiling.** Three images in total, one of them
the painting. Which two they are changes the answer more than any setting here,
so `pick` walks through the pairs rather than hiding the choice.

**The instruction is the delicate part.** Shown two paintings and told to
repaint, the model will take the content as well — a figure from one reference
walks into the canvas. Naming what the references are for, and naming what must
not come across, is most of the difference between a restyle and a collage.

**Trained models are the next step, not this one.** A LoRA on his work would
hold the hand more tightly than a reference can, and a Qwen-Image LoRA wants
24 GB to train against the 8 on this card. Z-Image is 6B and Apache 2.0 and
trains in 8, which is the route if what this produces is close but not his.
"""

from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent.parent
REFERENCES = HERE / "references"

#: What each style is called, and how to ask for it.
#:
#: Written out rather than generated from the folder names, because the
#: sentence is the instruction and the folder is only where the pictures are.
STYLES: dict[str, str] = {
    "oil": (
        "Repaint the first image in the painting style of the other images: "
        "oil on canvas, the same handling of paint, the same palette, the same "
        "edges and brushwork. Keep the first image's subject, composition and "
        "layout exactly as they are. Take nothing else from the other images: "
        "none of their figures, objects, places or subject matter."
    ),
    "watercolour": (
        "Repaint the first image in the painting style of the other images: "
        "watercolour on paper, the same washes and bleeds, the same palette, "
        "the paper showing through where it shows. Keep the first image's "
        "subject, composition and layout exactly as they are. Take nothing "
        "else from the other images: none of their figures, objects, places or "
        "subject matter."
    ),
}

#: The model takes three images in total and one of them is the painting.
AT_ONCE = 2


def available(style: str | None = None) -> bool:
    """Whether there are references to work from.

    Checked before the run starts rather than when the images are opened: by
    then the segmenter has been evicted and twelve gigabytes of editor are on
    their way through the card, and a missing folder would surface as a
    failure eighteen minutes in.
    """
    wanted = STYLES if style is None else {style: STYLES.get(style, "")}
    return all(len(_found(name)) >= AT_ONCE for name in wanted)


@lru_cache(maxsize=4)
def _found(style: str) -> tuple[Path, ...]:
    """The reference files for a style, in a fixed order.

    Sorted, so that `pick` means the same pair today as it did yesterday. An
    arbitrary order would make a seed useless: the one thing a seed is for is
    being able to arrive at the same image twice.
    """
    folder = REFERENCES / style
    if not folder.is_dir():
        return ()
    return tuple(sorted(p for p in folder.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png"}))


def references(style: str, pick: int = 0) -> list[Image.Image]:
    """The two paintings to show the model, as images.

    `pick` chooses the pair and wraps, so every number is a valid pair and
    stepping it is how a different reading of the same style is found.
    """
    files = _found(style)
    if len(files) < AT_ONCE:
        raise FileNotFoundError(
            f"no {style} references in {REFERENCES / style}. Run `python fetch_references.py`."
        )

    at = (int(pick) * AT_ONCE) % len(files)
    chosen = [files[(at + step) % len(files)] for step in range(AT_ONCE)]
    return [Image.open(path).convert("RGB") for path in chosen]


def instruction(style: str, asking: str = "") -> str:
    """The sentence the model is given: the style, then anything he added.

    His own instruction comes second and is marked as a change rather than as
    a description, because the first sentence already told the model to keep
    the subject and the two would otherwise contradict each other.
    """
    if style not in STYLES:
        raise ValueError(f"no style called {style!r}; there is {', '.join(STYLES)}")

    said = STYLES[style]
    asked = asking.strip()
    if asked:
        said = f"{said} While repainting it, also make this change: {asked}"
    return said
