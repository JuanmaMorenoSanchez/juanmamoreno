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

from pathlib import Path

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
