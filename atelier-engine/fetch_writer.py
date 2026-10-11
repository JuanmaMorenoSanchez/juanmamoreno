"""
Qwen3-VL-8B-Instruct: the model that writes the essays and the descriptions.

**Vision-language, and it has to be.** The brief shows the model the painting
— up to four images, the frontal view first — and so does the short
description. A text-only model cannot do either job, which was found out by
downloading one first.

Apache 2.0 and ungated, which is what decided the family. Llama 3.1 and Gemma
are both better known and both carry a custom licence behind a manual gate —
the same reason Qwen2.5-Coder-3B was refused for the sketches. Paintings are
sold from this site and anything a model writes appears beside something that
is for sale.
"""

from huggingface_hub import snapshot_download

WRITER = "Qwen/Qwen3-VL-8B-Instruct"

print("fetching", WRITER, flush=True)
where = snapshot_download(
    WRITER,
    cache_dir="models",
    # Weights, tokeniser and config. No ONNX, no duplicate formats.
    allow_patterns=["*.safetensors", "*.json", "*.txt", "tokenizer*"],
    max_workers=4,
)
print("done ->", where, flush=True)
