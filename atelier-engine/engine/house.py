"""What every picture and every clip is told, whoever asked for it.

Two things live here, and they are different in kind.

**The negative** is committed, because it is a fact about the models rather
than about him: left alone they drift towards the flat, outlined, evenly lit
look of an illustration, and his painting is none of those things. Saying so
once, in one place, is cheaper than remembering it in every prompt.

**The hand is not committed.** Which painters he wants the work to lean
towards is his business and nobody else's, so it lives in `local/`, which git
ignores, and the repository ships without it. An engine with no such file
behaves exactly as it did before: `hand()` answers an empty string and the
prompts are the prompts.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Callable

from .nodes import GraphError

HERE = Path(__file__).resolve().parent.parent
LOCAL = HERE / "local"
HAND = LOCAL / "style.txt"

#: What no picture here is meant to look like.
#:
#: Three words rather than a paragraph. A negative prompt is a direction, not
#: a wall, and a long one spends the model's attention on avoiding things
#: nobody was going to ask for.
NEVER = "Cartoonish, Illustration, Comic"


def hand() -> str:
    """The painters the work should lean towards, or nothing.

    Read on every call rather than at import: he edits it from the page and
    the next run should be the one that changes, not the next restart.
    """
    try:
        return HAND.read_text(encoding="utf-8").strip()
    except (OSError, UnicodeDecodeError):
        return ""


def set_hand(saying: str) -> str:
    """Writes it down, and answers with what is now there.

    Trimmed and written as one line. Empty puts it back to nothing, which is
    the state the repository ships in.
    """
    LOCAL.mkdir(parents=True, exist_ok=True)
    HAND.write_text(saying.strip(), encoding="utf-8", newline="\n")
    return hand()


def asked(prompt: str) -> str:
    """A prompt with the hand added, if there is one.

    Added at the end and named for what it is — the manner of the thing, not
    its subject — so that it colours the picture rather than becoming it. A
    prompt that starts with painters' names is a prompt about painters.
    """
    wanted = (prompt or "").strip()
    manner = hand()
    if not manner:
        return wanted
    if not wanted:
        return f"In the manner of {manner}."
    return f"{wanted} In the manner of {manner}."


def never(also: str = "") -> str:
    """The negative prompt, with anything a particular model needs as well."""
    extra = (also or "").strip().strip(",")
    return f"{NEVER}, {extra}" if extra else NEVER


#: Where the verdicts are kept, beside the hand itself and equally not in git.
JUDGED = LOCAL / "hand-known.json"

#: What the model is asked about a name.
#:
#: "Guessing is worse than saying no" earns its place: asked plainly, a model
#: will produce a plausible paragraph about anyone, because producing
#: plausible paragraphs is what it does. Asked to refuse, it refuses — of the
#: seven painters first written in the hand, the five it had never read about
#: all came back no, and the two it had came back with their centuries and
#: their handling of paint.
ASKING = (
    "Who is the painter {name}? Answer in this exact shape and nothing else:\n"
    "KNOWN: yes|no\n"
    "LOOK: one short sentence on how the paintings actually look — colour, "
    "handling of paint, composition — or unknown\n"
    "Say KNOWN: no if you are not sure this is a real painter you have read "
    "about. Guessing is worse than saying no."
)


def names(saying: str | None = None) -> list[str]:
    """The hand as the separate names it is, with the empties dropped."""
    written = hand() if saying is None else saying
    return [part.strip() for part in written.split(",") if part.strip()]


def verdicts() -> dict[str, bool]:
    """What has been decided about each name so far."""
    try:
        read = json.loads(JUDGED.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return {}
    return {name: bool(known) for name, known in read.items()} if isinstance(read, dict) else {}


def remember(name: str, known: bool) -> None:
    """Writes one verdict down, so nothing is ever judged twice."""
    LOCAL.mkdir(parents=True, exist_ok=True)
    all_of_them = verdicts()
    all_of_them[name] = known
    JUDGED.write_text(
        json.dumps(all_of_them, ensure_ascii=False, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
        newline="\n",
    )


def judge(name: str, ask: Callable[[str], str]) -> bool:
    """Whether the model has read about this painter.

    **A proxy, and said as one.** This is the text model, and what matters
    for a prompt is the image model. They are trained on overlapping public
    text and the image model has less of it per person, so a name this cannot
    place is one the image model certainly cannot paint in the manner of.
    The other way round is a maybe rather than a yes.

    Asked once per name and written down, because asking costs eighteen
    gigabytes of model load and a name does not change its mind.
    """
    said = ask(ASKING.format(name=name))
    known = "known: yes" in said.lower()
    remember(name, known)
    return known


def unknown(saying: str | None = None) -> list[str]:
    """Which names in the hand have been judged and found wanting.

    A name nobody has judged is not in here: it is not known to be bad, and
    refusing a run over a question never asked would be worse than letting it
    go ahead.
    """
    decided = verdicts()
    return [name for name in names(saying) if decided.get(name) is False]


def refuse_unknown() -> None:
    """Stops a run before it starts if the hand names someone unreadable.

    **Half an hour is too long to find out at the end.** A name the model has
    never read about does not make the picture look like that painter: it
    makes it look like whatever the model associates with the shape of the
    name, which is the language it is written in and other painters called
    something similar. That is not a style, and it is worse than asking for
    nothing, because it spends the prompt on it.

    Only names already judged and found wanting. A name nobody has asked
    about is let through — refusing a run over a question never put is worse
    than the run.
    """
    missing = unknown()
    if not missing:
        return
    raise GraphError(
        "the style names "
        + ", ".join(missing)
        + " mean nothing to the model — it has never read about them, so asking for their "
        "manner spends the prompt on a name instead of a style. Take them out of the style "
        "field, or use In my style, which shows the model paintings instead of naming them."
    )
