"""
Can a 20B instruction-following image editor run on an 8 GB card?

Qwen-Image-Edit was chosen over FLUX.1 schnell because it follows an
instruction — "make the shirt red" — rather than merely restyling from a
prompt. The cost of that choice is that it is 20B parameters and this card
holds about seven gigabytes, so everything below is about not keeping it all in
VRAM at once.

Three pieces, and only one of them is the model people name:

    transformer     Qwen-Image-Edit-2509, GGUF         ~12 GB at Q4_K_M
    text encoder    Qwen2.5-VL-7B                      ~16 GB at bf16
    vae             Qwen-Image VAE                     small

Sequential CPU offload is what makes that possible: each module is moved onto
the card for its own forward pass and off again. It is slow — minutes, not
seconds — which is the trade that was accepted when this model was picked.

Usage:  .venv\\Scripts\\python spike\\edit.py <image> "<instruction>"
"""

from __future__ import annotations

import sys
import time
from pathlib import Path

import torch
from PIL import Image

HERE = Path(__file__).resolve().parent.parent
MODELS = HERE / "models"
OUT = HERE / "out"

GGUF = MODELS / "qwen-image-edit" / "Qwen-Image-Edit-2509-Q4_K_M.gguf"
"""Q4_K_M, not Q2_K.

Q2_K is the one that fits the card whole, and it is the one not wanted: at
about two and a half bits a weight it blurs brushwork and follows an
instruction less reliably, which is the whole reason this model was chosen over
a cheaper one. Q4 does not fit, so it is streamed instead — slow rather than
soft, on the artist's word."""
REPO = "Qwen/Qwen-Image-Edit-2509"


def report(note: str) -> None:
    if not torch.cuda.is_available():
        print(f"    [{note}] no cuda")
        return
    free, total = torch.cuda.mem_get_info()
    print(
        f"    [{note}] {(total - free) / 2**20:,.0f} MiB in use of {total / 2**20:,.0f}, "
        f"peak alloc {torch.cuda.max_memory_allocated() / 2**20:,.0f} MiB"
    )


def main() -> int:
    if len(sys.argv) < 3:
        print(f'usage: python {Path(__file__).name} <image> "<instruction>"')
        return 2

    source = Path(sys.argv[1])
    instruction = sys.argv[2]
    if not source.exists():
        print(f"no such image: {source}")
        return 2
    if not GGUF.exists():
        print(f"the weights are not downloaded. Expected {GGUF}")
        return 2

    from diffusers import (
        GGUFQuantizationConfig,
        QwenImageEditPlusPipeline,
        QwenImageTransformer2DModel,
    )
    from diffusers.hooks import apply_group_offloading

    painting = Image.open(source).convert("RGB")
    # Smaller than the canvas on purpose. The point of this run is whether it
    # works at all and how long it takes, and every extra pixel is paid for in
    # both.
    painting.thumbnail((768, 768))
    OUT.mkdir(exist_ok=True)

    print(f"{source.name} -> {painting.width}x{painting.height}")
    print(f'instruction: "{instruction}"')
    report("before anything")

    started = time.perf_counter()
    print("\nloading the quantised transformer…")
    transformer = QwenImageTransformer2DModel.from_single_file(
        str(GGUF),
        quantization_config=GGUFQuantizationConfig(compute_dtype=torch.bfloat16),
        torch_dtype=torch.bfloat16,
        config=REPO,
        subfolder="transformer",
    )
    report("transformer read")

    print("loading the rest of the pipeline (text encoder and vae)…")
    pipeline = QwenImageEditPlusPipeline.from_pretrained(
        REPO, transformer=transformer, torch_dtype=torch.bfloat16, cache_dir=MODELS
    )

    # Block-level group offloading: the transformer is brought over a few
    # blocks at a time and taken away again, so what has to fit on the card is
    # one group rather than twelve gigabytes.
    #
    # The two obvious alternatives were both tried and both failed, which is
    # worth writing down because they look right:
    #
    #   enable_sequential_cpu_offload  parks each module on the meta device
    #       between passes, and a GGUF parameter does not survive the trip — it
    #       returns without its quantisation type and diffusers dies with
    #       `KeyError: None` in gguf/utils.py.
    #   enable_model_cpu_offload       moves the transformer as one piece, and
    #       one piece is 12 GB against 8 — CUBLAS_STATUS_INTERNAL_ERROR, which
    #       is how running out of memory presents itself inside cuBLAS.
    #
    # One block per group is the most aggressive setting and the slowest, which
    # is the trade that was asked for.
    # Offloaded to disk, not to RAM. The first attempt at this was killed by
    # the OS with no traceback at all: the transformer is 12 GB and the text
    # encoder another 16, and there is nowhere near 28 GB of system memory free
    # on a machine that is also being worked on. Disk is the one resource here
    # that is not scarce — 672 GB of it — and trading speed for space is the
    # trade that was asked for.
    onload = torch.device("cuda")
    offload = torch.device("cpu")
    spill = MODELS / "offload"
    spill.mkdir(parents=True, exist_ok=True)

    pipeline.transformer.enable_group_offload(
        onload_device=onload,
        offload_device=offload,
        offload_type="block_level",
        num_blocks_per_group=1,
        offload_to_disk_path=str(spill / "transformer"),
    )
    # The text encoder is the other big one and gets the same treatment.
    text_encoder = getattr(pipeline, "text_encoder", None)
    if text_encoder is not None:
        apply_group_offloading(
            text_encoder,
            onload_device=onload,
            offload_device=offload,
            offload_type="block_level",
            num_blocks_per_group=1,
            offload_to_disk_path=str(spill / "text_encoder"),
        )

    # The vae stays on the card. Grouping it was tried and fails at the first
    # convolution — "Input type (CUDABFloat16Type) and weight type
    # (CPUBFloat16Type) should be the same" — because block_level finds no
    # blocks to group in a stack of 3D convs and leaves the weights behind
    # while the input arrives on the GPU. It is a few hundred megabytes against
    # a twelve gigabyte transformer, so there is nothing to win by moving it.
    if getattr(pipeline, "vae", None) is not None:
        pipeline.vae.to(onload)

    print(f"loaded in {time.perf_counter() - started:.0f}s")
    report("ready")

    print("\nediting…")
    started = time.perf_counter()
    edited = pipeline(
        image=painting,
        prompt=instruction,
        num_inference_steps=20,
        true_cfg_scale=4.0,
        generator=torch.Generator().manual_seed(7),
    ).images[0]
    took = time.perf_counter() - started
    report("done")

    sheet = Image.new("RGB", (painting.width + edited.width + 12, max(painting.height, edited.height)), (24, 24, 26))
    sheet.paste(painting, (0, 0))
    sheet.paste(edited, (painting.width + 12, 0))
    sheet.save(OUT / "edit-before-after.jpg", quality=90)
    edited.save(OUT / "edit-result.png")
    print(f"\nedited in {took:.0f}s ({took / 60:.1f} min)")
    print("wrote out/edit-before-after.jpg")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
