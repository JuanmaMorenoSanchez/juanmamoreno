"""
His own paintings, as style references for the editor.

**Why this exists.** Qwen-Image-Edit-2509 takes more than one image and will
work in the manner of the ones it is shown. So "paint this in my style" needs
no training and no second model: it needs two of his paintings beside the one
being edited. This downloads them.

**Where they come from.** The site's own MCP server, by medium, newest first —
the same place the essay brief takes its facts from, for the same reason: it
knows which paintings are oil and which are watercolour, and a list typed here
would be wrong within a month. The image each painting carries is the web
resolution, which is what a model reads anyway.

**Two per run, not eight.** The model accepts three images in total and one of
them is the painting being changed. Eight per style are kept so that there is
more than one pair to try, because which two paintings he is shown changes the
answer more than any setting does.

    python fetch_references.py

A few megabytes. They land in `references/`, which is not in git: they are
downloaded from his own public catalogue and do not want a second copy here.
"""

from __future__ import annotations

import json
import re
import urllib.request
from io import BytesIO
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
REFERENCES = HERE / "references"

MCP = "https://backend.juanmamoreno.com/mcp"

#: The medium as the catalogue spells it, against the name of the style.
#:
#: "watercolor" without the u, deliberately: that is how the medium is written
#: in his own catalogue entries, and a search for "watercolour" returns none of
#: the sixty-two that are there.
STYLES = {"oil": "oil", "watercolour": "watercolor"}

HOW_MANY = 8
#: Longest side of a reference. The model reads it at about this and the
#: originals are tens of megabytes.
LONGEST = 1024


def ask(name: str, arguments: dict) -> dict:
    body = json.dumps(
        {"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": name, "arguments": arguments}}
    ).encode("utf-8")
    request = urllib.request.Request(MCP, data=body, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(request, timeout=60) as answer:
        envelope = json.load(answer)
    if "error" in envelope:
        raise RuntimeError(f"{name}: {envelope['error']['message']}")
    return json.loads(envelope["result"]["content"][0]["text"])


def named(title: str) -> str:
    """A filename from a painting's name, so the folder is readable."""
    return re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")[:40]


def fetch(style: str, medium: str) -> None:
    into = REFERENCES / style
    into.mkdir(parents=True, exist_ok=True)

    found = ask("search_paintings", {"medium": medium, "limit": HOW_MANY})
    for painting in found.get("paintings", [])[:HOW_MANY]:
        where = ask("get_painting", {"id": str(painting["id"])}).get("image", {}).get("url")
        if not where:
            print("  no image for", painting["id"], flush=True)
            continue

        with urllib.request.urlopen(where, timeout=120) as answer:
            image = Image.open(BytesIO(answer.read())).convert("RGB")
        image.thumbnail((LONGEST, LONGEST), Image.Resampling.LANCZOS)
        at = into / f"{painting['id']}-{named(painting['name'])}.jpg"
        image.save(at, quality=92)
        print(f"  {at.name} {image.width}x{image.height}", flush=True)


if __name__ == "__main__":
    for style, medium in STYLES.items():
        print(f"{style} ({medium})", flush=True)
        fetch(style, medium)
    print("done ->", REFERENCES, flush=True)
