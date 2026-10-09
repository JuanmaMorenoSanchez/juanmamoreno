"""
Changing part of a painting by asking for it.

Qwen-Image-Edit, 20B, at Q4_K_M. It follows an instruction — "make the jumper
deep red" — rather than restyling from a prompt, which is why it was chosen
over a model that would have fitted the card comfortably.

**It does not fit, and is streamed instead.** The transformer is 12 GB against
8 GB of VRAM, so it is offloaded to disk and brought over one block at a time.
Measured: 1,384 MiB of VRAM, 18 minutes for twenty steps at 768px. Slow rather
than soft, which is the trade the artist asked for.

Four ways of doing this were tried and failed before the fifth worked. They are
written down in `spike/edit.py`, because every one of them looks correct.

**The mask is the important part.** This model regenerates the whole picture,
so without one, everything drifts: the field, the arms, the surface of the
paint all come back subtly repainted and a little glossier. With one, only what
was asked about is model output and the rest is the original, untouched.
"""

from __future__ import annotations

import shutil
from functools import lru_cache
from pathlib import Path
from typing import Any

import numpy as np
from PIL import Image, ImageFilter

HERE = Path(__file__).resolve().parent.parent
MODELS = HERE / "models"
GGUF = MODELS / "qwen-image-edit" / "Qwen-Image-Edit-2509-Q4_K_M.gguf"
SPILL = MODELS / "offload"
REPO = "Qwen/Qwen-Image-Edit-2509"

SEAM = 2.5
"""How far to soften the edge of the composite.

A hard join between model output and original paint is a visible line, and a
line is the one thing a painting has none of. Slightly wider than the feather
used on a cut layer, because here two different surfaces are being married
rather than one being lifted out.
"""


def available() -> bool:
    """Whether the weights are on disk. The page asks before offering the node."""
    return GGUF.exists()


@lru_cache(maxsize=1)
def _pipeline():
    """Built once and kept. Setting it up costs about twenty seconds."""
    import torch
    from diffusers import (
        GGUFQuantizationConfig,
        QwenImageEditPlusPipeline,
        QwenImageTransformer2DModel,
    )
    from diffusers.hooks import apply_group_offloading

    if not GGUF.exists():
        raise FileNotFoundError(f"Qwen-Image-Edit is not downloaded. Expected {GGUF}")

    transformer = QwenImageTransformer2DModel.from_single_file(
        str(GGUF),
        quantization_config=GGUFQuantizationConfig(compute_dtype=torch.bfloat16),
        torch_dtype=torch.bfloat16,
        config=REPO,
        subfolder="transformer",
    )
    pipeline = QwenImageEditPlusPipeline.from_pretrained(
        REPO, transformer=transformer, torch_dtype=torch.bfloat16, cache_dir=MODELS
    )

    onload, offload = torch.device("cuda"), torch.device("cpu")

    # Thrown away and rewritten every time the pipeline is built.
    #
    # Disk offloading reloads each block with `safetensors.load_file`, and a
    # GGUF-quantised tensor does not survive that round trip — reading one back
    # cold fails with "Attempted to access the data pointer on an invalid
    # python storage". The first run in a process gets away with it because the
    # tensors are still in memory when they are written; the second run, and
    # any later process, reads from disk and dies.
    #
    # So the spill is treated as scratch belonging to this process. It costs
    # one slow write of twelve gigabytes per start, against a failure on every
    # run but the first.
    if SPILL.exists():
        shutil.rmtree(SPILL, ignore_errors=True)
    SPILL.mkdir(parents=True, exist_ok=True)

    pipeline.transformer.enable_group_offload(
        onload_device=onload,
        offload_device=offload,
        offload_type="block_level",
        num_blocks_per_group=1,
        offload_to_disk_path=str(SPILL / "transformer"),
    )
    if getattr(pipeline, "text_encoder", None) is not None:
        apply_group_offloading(
            pipeline.text_encoder,
            onload_device=onload,
            offload_device=offload,
            offload_type="block_level",
            num_blocks_per_group=1,
            offload_to_disk_path=str(SPILL / "text_encoder"),
        )
    # The vae stays resident: it is a stack of 3D convolutions with no blocks
    # for block_level to find, so grouping it leaves its weights on the CPU
    # while CUDA inputs arrive. A few hundred megabytes, and it ends the
    # "Input type (CUDABFloat16Type) and weight type (CPUBFloat16Type)" failure.
    if getattr(pipeline, "vae", None) is not None:
        pipeline.vae.to(onload)

    return pipeline


def _soft(mask: np.ndarray, size: tuple[int, int]) -> Image.Image:
    alpha = Image.fromarray((np.asarray(mask, dtype=bool) * 255).astype(np.uint8), mode="L")
    if alpha.size != size:
        alpha = alpha.resize(size, Image.Resampling.BILINEAR)
    return alpha.filter(ImageFilter.GaussianBlur(radius=SEAM))


def edit(
    painting: Image.Image,
    instruction: str,
    mask: np.ndarray | None = None,
    steps: int = 20,
    guidance: float = 4.0,
    seed: int = 7,
) -> Image.Image:
    """The painting with the instruction carried out.

    With a mask, only the masked region is taken from the model and everything
    outside it is the original at its original resolution — so the answer to
    "it repainted my whole canvas" is to say which part you meant.
    """
    import torch

    pipeline = _pipeline()
    produced = pipeline(
        image=painting,
        prompt=instruction,
        # Without a negative prompt the pipeline quietly disables guidance and
        # follows the instruction more loosely, which is the opposite of why
        # this model is here.
        negative_prompt=" ",
        num_inference_steps=steps,
        true_cfg_scale=guidance,
        generator=torch.Generator().manual_seed(seed),
    ).images[0]

    # It normalises to its own resolution, which is rarely the one it was given.
    if produced.size != painting.size:
        produced = produced.resize(painting.size, Image.Resampling.LANCZOS)

    if mask is None:
        return produced
    return Image.composite(produced, painting.convert("RGB"), _soft(mask, painting.size))


def unload() -> None:
    """Drop the pipeline and hand the card back."""
    _pipeline.cache_clear()
    try:
        import torch

        if torch.cuda.is_available():
            torch.cuda.empty_cache()
    except ImportError:  # pragma: no cover
        pass
