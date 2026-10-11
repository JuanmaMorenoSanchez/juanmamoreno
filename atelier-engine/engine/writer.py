"""
Writing, on this machine: the essays and the short descriptions.

Qwen3-VL-8B-Instruct, Apache 2.0. **Vision-language, and it has to be** — the
brief shows the model the painting, up to four images with the frontal view
first, and the short description is written from the picture too. A text-only
model cannot do either job.

**This module owns no prompt.** The brief is 439 lines of TypeScript in the
backend, with its own tests, and it has been corrected by hand many times; a
second copy here would drift from it within a week and nobody would notice
which one was being used. So the backend assembles the brief, the page carries
it here, and this runs a model over it. The only thing this file knows about
art criticism is how to hold the text while the model reads it.

**8B against 8 GB.** The weights are 16 GB in bfloat16, so the model is split
between the card and system memory rather than spilled to disk: the image
editor pays the disk price because it is 20B and has no choice, and this one
does not have to. Thirty-one gigabytes of RAM is enough to hold what will not
fit on the card.
"""

from __future__ import annotations

import base64
import io
from functools import lru_cache
from pathlib import Path
from typing import Callable

from PIL import Image

MODELS = Path(__file__).resolve().parent.parent / "models"
WRITER = "Qwen/Qwen3-VL-8B-Instruct"

#: How much of the card to leave the model. The rest of it goes to system
#: memory, which is slower to reach and very much faster than a disk.
ON_CARD = "6GiB"
IN_MEMORY = "22GiB"

#: The longest an essay may run before it is cut off.
#:
#: The brief asks for about four hundred words, which is roughly six hundred
#: tokens in Spanish; this is generous enough that the short version after it
#: also fits, and tight enough that a model which has started repeating itself
#: stops within a minute rather than filling the context.
MOST_TOKENS = 1400


def available() -> bool:
    """Whether the weights are here, without loading a gigabyte to find out.

    The weights, not the config. `config.json` is a few kilobytes and arrives
    first, so a check for it answers True about a download that has barely
    started — which it did, and the failure would have surfaced minutes later
    as a missing shard rather than as "not downloaded yet".
    """
    shards = list(MODELS.glob("models--Qwen--Qwen3-VL-8B-Instruct/snapshots/*/*.safetensors"))
    if not shards:
        return False
    # An index names every shard the model needs; without it, trust the bytes.
    index = next(
        MODELS.glob("models--Qwen--Qwen3-VL-8B-Instruct/snapshots/*/model.safetensors.index.json"),
        None,
    )
    if index is None:
        return True

    import json

    wanted = set(json.loads(index.read_text(encoding="utf-8"))["weight_map"].values())
    return wanted <= {shard.name for shard in shards}


@lru_cache(maxsize=1)
def _model():
    """Built once and kept. Setting it up costs a few minutes."""
    import torch
    from transformers import AutoProcessor, Qwen3VLForConditionalGeneration

    if not available():
        raise FileNotFoundError(
            f"{WRITER} is not downloaded. Run `python fetch_writer.py`."
        )

    processor = AutoProcessor.from_pretrained(WRITER, cache_dir=MODELS)
    model = Qwen3VLForConditionalGeneration.from_pretrained(
        WRITER,
        cache_dir=MODELS,
        dtype=torch.bfloat16,
        device_map="auto",
        max_memory={0: ON_CARD, "cpu": IN_MEMORY},
    )
    model.eval()
    return processor, model


def _as_image(data: str) -> Image.Image:
    """One image, from base64 with or without a data-url prefix."""
    if "," in data[:64] and data.lstrip().startswith("data:"):
        data = data.split(",", 1)[1]
    return Image.open(io.BytesIO(base64.b64decode(data))).convert("RGB")


def write(
    prompt: str,
    images: list[str] | None = None,
    most_tokens: int = MOST_TOKENS,
    temperature: float = 0.9,
    watching: Callable[[str], None] | None = None,
) -> str:
    """Whatever the brief asked for, as text.

    `prompt` is assembled elsewhere and passed through untouched. `images` are
    base64 JPEGs, the frontal view first, exactly as the backend already sends
    them to Gemini.
    """
    import torch

    if watching is not None:
        watching("loading the model — the first run of a session takes minutes")

    processor, model = _model()
    pictures = [_as_image(one) for one in (images or [])]

    content: list[dict] = [{"type": "image", "image": picture} for picture in pictures]
    content.append({"type": "text", "text": prompt})

    text = processor.apply_chat_template(
        [{"role": "user", "content": content}],
        tokenize=False,
        add_generation_prompt=True,
    )
    inputs = processor(
        text=[text],
        images=pictures or None,
        return_tensors="pt",
    ).to(model.device)

    if watching is not None:
        watching("writing")

    with torch.no_grad():
        produced = model.generate(
            **inputs,
            max_new_tokens=most_tokens,
            do_sample=True,
            temperature=temperature,
            top_p=0.95,
            # Repetition is the failure mode of a small model asked for long
            # prose, and it is better to loosen this than to cut the essay off.
            repetition_penalty=1.05,
        )

    answer = processor.batch_decode(
        produced[:, inputs.input_ids.shape[-1] :],
        skip_special_tokens=True,
        clean_up_tokenization_spaces=False,
    )[0]
    return answer.strip()
