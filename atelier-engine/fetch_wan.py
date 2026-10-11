"""
Wan 2.2 TI2V-5B, in the two halves that let it run on 8 GB.

The official repository is 34 GB because the transformer ships in fp32 (20 GB)
and umT5-XXL is another 11. The transformer is taken as a Q8_0 GGUF instead —
5.4 GB, Apache 2.0, and the highest-fidelity quant there is, because slow is
preferred to soft. Everything else comes from the official repo so the pipeline
is assembled from diffusers-shaped parts, exactly as the image editor is.
"""

from huggingface_hub import hf_hub_download, snapshot_download

OFFICIAL = "Wan-AI/Wan2.2-TI2V-5B-Diffusers"
QUANTS = "QuantStack/Wan2.2-TI2V-5B-GGUF"

print("1/2 official parts, without the 20 GB fp32 transformer", flush=True)
snapshot_download(
    OFFICIAL,
    cache_dir="models",
    allow_patterns=[
        "model_index.json",
        "text_encoder/*",
        "tokenizer/*",
        "scheduler/*",
        "vae/*",
    ],
    max_workers=4,
)
print("  done", flush=True)

print("2/2 the transformer, quantised", flush=True)
where = hf_hub_download(QUANTS, "Wan2.2-TI2V-5B-Q8_0.gguf", cache_dir="models")
print("  done ->", where, flush=True)
