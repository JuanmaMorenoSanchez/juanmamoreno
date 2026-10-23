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

import hashlib
import os
import shutil
import sys
from functools import lru_cache
from typing import Callable
from pathlib import Path
from typing import Any

import numpy as np
from PIL import Image, ImageFilter

from . import house
from .nodes import StoppedEarly

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


def ready() -> bool:
    """Whether the pipeline is already built, so nothing has to be prepared.

    Asked so that the note about the first edit of a session taking minutes is
    only shown when it is true. Measured, a run whose prompt is already known
    reaches its first step in 1.2 seconds, and telling somebody to expect
    minutes is as bad as telling them nothing.
    """
    return _pipeline.cache_info().currsize > 0


def forget() -> bool:
    """Drop the pipeline, and with it the card and the host memory it holds.

    The registry can hand back the models it built, and these two were not
    among them: the editor and the clip model are each held by an `lru_cache`
    of their own, so `/evict` reported the card handed back while six and a
    half gigabytes of it stayed held — and the next edit spent three and a
    half minutes preparing before dying of "CUDA error: out of memory".

    Answers whether there was anything to drop, because asking the driver for
    the memory back is not free: it returns the allocator's warm blocks too,
    and the first edit of a session is measurably slower than the second
    largely because every block it onloads has to be allocated afresh.
    """
    held = _pipeline.cache_info().currsize > 0
    _pipeline.cache_clear()
    return held


def _remembering(encode: Callable[..., Any]) -> Callable[..., Any]:
    """Encode a prompt once per picture rather than once per run.

    The text encoder here is Qwen2.5-VL, sixteen gigabytes, and it is streamed
    from disk like everything else. Measured: two hundred and fifty-four
    seconds between the pipeline being ready and the first step reporting,
    which is this running twice — once for the instruction and once for the
    negative prompt.

    It is run again, in full, every time, and almost every run after the first
    asks it the same question. **Draft first** and then the same instruction at
    twenty steps is the same prompt on the same picture. So is re-rolling the
    seed, and so is moving guidance or how far. Four minutes, paid again for an
    answer already given.

    The embedding depends on the prompt and on the pictures — this model's
    encoder sees the image — so the key is both, and a picture is identified by
    its bytes rather than by being the same object, because the page sends a
    fresh decode of the same file every time. Four are kept: an instruction and
    a negative prompt for the current picture, and room for the pair before it.
    """
    held: dict[tuple[Any, ...], Any] = {}

    def encoding(prompt=None, image=None, **rest):  # noqa: ANN001 - diffusers' shape
        shown = image if isinstance(image, list) else [image] if image is not None else []
        try:
            seen = tuple(
                hashlib.blake2b(each.tobytes(), digest_size=16).digest() for each in shown
            )
        except AttributeError:
            # Not pictures we can fingerprint. Encode it and remember nothing.
            return encode(prompt=prompt, image=image, **rest)

        key = (prompt if isinstance(prompt, str) else tuple(prompt or ()), seen)
        if key not in held:
            if len(held) >= 4:
                held.clear()
            held[key] = encode(prompt=prompt, image=image, **rest)
        embeds, mask = held[key]
        # Handed out as copies: what the pipeline does with them afterwards is
        # its own business, and the point of keeping them is that they stay as
        # they were. The mask is genuinely absent when no token was padded —
        # the pipeline drops a mask that is all ones — so it is only copied if
        # it is there.
        return embeds.clone(), None if mask is None else mask.clone()

    return encoding


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

    # The text encoder goes first, and to disk.
    #
    # It is sixteen gigabytes and it runs twice per generation — once for the
    # instruction and once for the negative prompt — not once per step, so what
    # it costs to fetch is paid twice rather than forty times. Spilling it
    # first is what makes room for the transformer below: until it is on disk,
    # both models are in host memory at once, which on this machine is
    # twenty-nine gigabytes against thirty-one.
    #
    # The spill is thrown away and rewritten every time the pipeline is built,
    # because reloading a block with `safetensors.load_file` works only while
    # the tensors are still in memory from the write. Read back cold, in a
    # later process, it fails with "Attempted to access the data pointer on an
    # invalid python storage".
    if SPILL.exists():
        shutil.rmtree(SPILL, ignore_errors=True)
    SPILL.mkdir(parents=True, exist_ok=True)

    if getattr(pipeline, "text_encoder", None) is not None:
        apply_group_offloading(
            pipeline.text_encoder,
            onload_device=onload,
            offload_device=offload,
            # A layer at a time, and by leaf rather than by block.
            #
            # `block_level` walks `named_children()` and groups whatever it
            # finds that is a `ModuleList`. This encoder's children are `model`
            # and `lm_head`, and the layers are two levels further in, under
            # `model.language_model.layers` and `model.visual.blocks`. So
            # nothing matched, everything fell into the group that holds what
            # did not match, and the whole encoder was offloaded as a **single
            # 16.58 GiB file** — which it then put on an 8 GiB card in one go.
            #
            # On Windows that does not fail. The driver oversubscribes into
            # system memory and the card is left with no free VRAM at all, so
            # the transformer's blocks land in paged memory for the rest of the
            # run. Measured on four-step runs: a step after an encode is 105 s,
            # a step in a run whose prompt was already known is 34 s. The
            # encode cost 254 seconds of its own and then made every step three
            # times slower.
            #
            # `block_modules=["model", "language_model", "visual"]` does find
            # the lists, and fails differently: the outer model reaches
            # `embed_tokens` without going through `language_model.forward`, so
            # the embedding is still on the CPU when the ids arrive on the card
            # — "Expected all tensors to be on the same device". `leaf_level`
            # has no such gap, because every Linear and every Embedding carries
            # its own hook and fetches itself when it is called. It costs more
            # synchronising, which would matter for something that runs forty
            # times a generation and does not for something that runs twice.
            offload_type="leaf_level",
            offload_to_disk_path=str(SPILL / "text_encoder"),
        )

    # The transformer is held in host memory and crosses on its own stream.
    #
    # It used to be spilled to disk like the encoder, which meant each block
    # arrived by `safetensors.load_file(path, device="cuda")` — a synchronous
    # read straight onto the card with nothing overlapped, measured at 0.46
    # GiB/s. The same bytes held in host memory and copied asynchronously
    # measure 4.73 GiB/s, and a step is two passes over all of it whenever
    # guidance is above one, because the model runs again for the negative
    # prompt.
    #
    # `low_cpu_mem_usage=True` is what makes that affordable. Without it,
    # `_init_cpu_param_dict` pins the whole model during setup, and twelve
    # gigabytes in one call failed here with `cuMemHostAlloc ...
    # CUDA_ERROR_OUT_OF_MEMORY` — under the ceiling, but with the encoder
    # still in memory. With it, nothing is pinned here and `_pin` below does
    # it weight by weight against a budget, which is ComfyUI's way and the
    # reason they never hit it.
    #
    # There is no transformer spill any more, so nothing is written at startup
    # but the encoder.
    pipeline.transformer.enable_group_offload(
        onload_device=onload,
        offload_device=offload,
        offload_type="block_level",
        num_blocks_per_group=1,
        use_stream=True,
        record_stream=True,
        low_cpu_mem_usage=True,
    )

    blocks = getattr(pipeline.transformer, "transformer_blocks", None)
    if blocks is not None:
        kept, total = _resident(pipeline.transformer, blocks)
        pinned, wanted = _pin(list(blocks)[kept:])
        print(
            f"atelier: {kept} of {total} transformer blocks on the card, "
            f"{pinned / 2**30:.1f} of {wanted / 2**30:.1f} GiB pinned for the rest",
            flush=True,
        )
    # The vae stays resident: it is a stack of 3D convolutions with no blocks
    # for block_level to find, so grouping it leaves its weights on the CPU
    # while CUDA inputs arrive. A few hundred megabytes, and it ends the
    # "Input type (CUDABFloat16Type) and weight type (CPUBFloat16Type)" failure.
    if getattr(pipeline, "vae", None) is not None:
        pipeline.vae.to(onload)

    pipeline.encode_prompt = _remembering(pipeline.encode_prompt)

    return pipeline


def _soft(mask: np.ndarray, size: tuple[int, int]) -> Image.Image:
    alpha = Image.fromarray((np.asarray(mask, dtype=bool) * 255).astype(np.uint8), mode="L")
    if alpha.size != size:
        alpha = alpha.resize(size, Image.Resampling.BILINEAR)
    return alpha.filter(ImageFilter.GaussianBlur(radius=SEAM))


#: How much of the card to leave for the run itself, in bytes.
#:
#: Taken from ComfyUI 0.39.2, which arrived at it the hard way:
#: `minimum_inference_memory()` is 0.8 GiB plus `EXTRA_RESERVED_VRAM`, and that
#: second number is 400 MiB everywhere except Windows, where it is 600 —
#: commented, in their source, "Windows is higher because of the shared vram
#: issue". The shared vram issue is the one measured here: the driver will
#: oversubscribe into system memory rather than refuse an allocation, so a card
#: filled to the brim does not fail, it goes slow.
#:
#: A third of a gigabyte is added on top of theirs for the text encoder, which
#: they do not have to carry: it is offloaded by leaf and its widest leaf is
#: `lm_head`, a 3,584 by 152,064 matrix, 1.09 GiB on its own.
LEAVE = int(0.8 * 2**30) + 600 * 2**20 + int(1.1 * 2**30)


def _memory() -> tuple[int, int]:
    """Total and available host memory, in bytes.

    By hand because `psutil` is here as somebody else's transitive dependency
    and is not in `requirements.txt`. Adding one is a decision to be asked
    about rather than taken quietly in the middle of something else, and this
    is fifteen lines of the standard library.
    """
    if sys.platform == "win32":
        import ctypes

        class Status(ctypes.Structure):
            _fields_ = [
                ("dwLength", ctypes.c_ulong),
                ("dwMemoryLoad", ctypes.c_ulong),
                ("ullTotalPhys", ctypes.c_ulonglong),
                ("ullAvailPhys", ctypes.c_ulonglong),
                ("ullTotalPageFile", ctypes.c_ulonglong),
                ("ullAvailPageFile", ctypes.c_ulonglong),
                ("ullTotalVirtual", ctypes.c_ulonglong),
                ("ullAvailVirtual", ctypes.c_ulonglong),
                ("ullAvailExtendedVirtual", ctypes.c_ulonglong),
            ]

        status = Status()
        status.dwLength = ctypes.sizeof(Status)
        ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(status))
        return int(status.ullTotalPhys), int(status.ullAvailPhys)

    pages = os.sysconf("SC_PHYS_PAGES")
    spare = os.sysconf("SC_AVPHYS_PAGES")
    size = os.sysconf("SC_PAGE_SIZE")
    return pages * size, spare * size


#: What share of host memory may be pinned.
#:
#: ComfyUI's number, with their comment beside it: `MAX_PINNED_MEMORY = ram *
#: 0.40  # Windows limit is apparently 50%`. Pinned pages cannot be paged out,
#: so this is memory taken away from everything else on the machine, and the
#: operating system will refuse outright somewhere above half.
PINNABLE = 0.40


def may_pin(ram: int, free: int, want: int) -> int:
    """How many bytes it is reasonable to pin, of the `want` that would help.

    Two ceilings and no optimism. The first is the share of total memory the
    system will tolerate being locked; the second is what is actually free
    right now, less a gigabyte, because this is his working machine and taking
    the last of it would be worse than being slow.
    """
    return max(0, min(want, int(ram * PINNABLE), free - 2**30))


def how_many_fit(sizes: list[int], free: int, leave: int = LEAVE) -> int:
    """How many blocks, in order, will fit on the card with room left to work.

    Separated from the moving of them because it is the part worth checking:
    an off-by-one here is a card filled to the brim, which on Windows does not
    fail but quietly runs at the speed of system memory.

    It stops at the first block that does not fit rather than skipping it and
    trying the next. The blocks a transformer runs are run in order, so a gap
    in the middle would be a block fetched between two that were already there,
    and the point is to make the fetching contiguous and rare.
    """
    budget = free - leave
    kept = 0
    for size in sizes:
        if size > budget:
            break
        budget -= size
        kept += 1
    return kept


def _pin(blocks) -> tuple[int, int]:
    """Pin what is still streamed, so it crosses the bus at full speed.

    A block that is not resident is fetched twice a step, forever, and how
    fast it arrives depends entirely on where it is kept. Measured on this
    machine: straight off the disk onto the card, 0.46 GiB/s; the same bytes
    held pinned in host memory and copied asynchronously, 4.73 GiB/s.

    **Pinned one weight at a time, against a budget, which is the whole
    difference.** Asking `diffusers` to do it — `use_stream=True` with
    `low_cpu_mem_usage=False` — pins the entire model in one call during
    setup, and twelve gigabytes of that failed here with
    `cuMemHostAlloc ... CUDA_ERROR_OUT_OF_MEMORY` even though it was under the
    ceiling, because the text encoder was in memory at the time. ComfyUI pins
    per weight against `ram * 0.40` and evicts when it is full, which is why
    they never hit it.

    Each tensor is handed to the hook *and* to the parameter as it is pinned,
    so the unpinned original is released on the spot. Done the other way the
    peak is twice the model, which on this machine is the whole of memory.

    Anything the system refuses stops the loop rather than failing the run:
    half the model pinned is half the model arriving ten times faster, and the
    rest still works the way it did.
    """
    import torch
    from diffusers.hooks import HookRegistry
    from diffusers.hooks.group_offloading import _GROUP_OFFLOADING

    whole, spare = _memory()
    groups = []
    for block in blocks:
        hook = HookRegistry.check_if_exists_or_initialize(block).get_hook(_GROUP_OFFLOADING)
        if hook is not None:
            groups.append(hook.group)

    want = sum(
        held.numel() * held.element_size()
        for group in groups
        for held in getattr(group, "cpu_param_dict", {}).values()
    )
    budget = may_pin(whole, spare, want)

    done = 0
    for group in groups:
        for param, held in list(getattr(group, "cpu_param_dict", {}).items()):
            size = held.numel() * held.element_size()
            if held.is_pinned() or not held.is_contiguous() or size > budget:
                continue
            try:
                pinned = held.pin_memory()
            except RuntimeError:
                # The system said no. Everything already pinned stays pinned.
                return done, want
            group.cpu_param_dict[param] = pinned
            param.data = pinned
            budget -= size
            done += size
    torch.cuda.synchronize()
    return done, want


def _resident(transformer, blocks) -> tuple[int, int]:
    """Pin as many blocks to the card as will fit, and say how many.

    **The one thing `diffusers` will not do for us.** `apply_group_offloading`
    treats every group alike: onloaded when its turn comes, dropped the moment
    it is done, fetched again next step. Sixty blocks, twelve gigabytes, twice
    a step, forever — while five or six gigabytes of the card sit empty because
    the design never considered keeping anything.

    ComfyUI's low-vram path does consider it, and the arithmetic is simply
    `free_vram - minimum_required`: fill the card with weights and stream the
    remainder. On this machine that is about five and a half gigabytes of the
    twelve, so nearly half the model stops crossing the bus at all.

    Done by taking the offload hook off a block and moving it across for good.
    **A block has to be fetched before it can be kept**, which is not obvious
    and cost a whole measurement to learn. `GroupOffloadingHook.initialize_hook`
    calls `group.offload_()` the moment the hook is registered — not on the
    first forward — and offloading to disk writes the weights out and then
    replaces them with `torch.empty_like`. So by the time this runs, every
    block holds a placeholder full of nothing.

    Moving that to the card and removing its hook gives a model whose first
    twenty-two blocks are garbage that will never be filled in, which is both
    wrong and *faster*, and a run of it reported a 17% improvement before
    anybody looked at the picture. So each block is onloaded through the
    group's own code path first, which reads it back from the spill onto the
    card, and only then is the hook taken off so it is never sent away again.

    Each block is measured as it goes rather than assumed equal, because the
    first and last of a transformer rarely weigh what the middle ones do.
    """
    import torch
    from diffusers.hooks import HookRegistry
    from diffusers.hooks.group_offloading import (
        _GROUP_OFFLOADING,
        _LAYER_EXECUTION_TRACKER,
        _LAZY_PREFETCH_GROUP_OFFLOADING,
    )

    # A block that is staying has to leave the prefetch chain as well.
    #
    # With a stream, `enable_group_offload` puts a tracker on every block so it
    # can learn the order they run in, and after the first forward it walks the
    # blocks that ran and reads each one's offload hook to turn on prefetching.
    # A block that executed but no longer has one gives
    # "'NoneType' object has no attribute 'group'" — two and a half minutes
    # into the first run, which is an expensive way to find out.
    #
    # Taking the tracker off too keeps it out of that walk, and dropping its
    # name keeps it out of the warning about layers that never ran.
    lazy = HookRegistry.check_if_exists_or_initialize(transformer).get_hook(
        _LAZY_PREFETCH_GROUP_OFFLOADING
    )
    tracked = getattr(lazy, "_layer_execution_tracker_module_names", set())

    def weighs(block) -> int:
        return sum(p.numel() * p.element_size() for p in block.parameters()) + sum(
            b.numel() * b.element_size() for b in block.buffers()
        )

    free, _ = torch.cuda.mem_get_info()
    wanted = how_many_fit([weighs(block) for block in blocks], free)

    kept = 0
    for at, block in enumerate(list(blocks)[:wanted]):
        registry = HookRegistry.check_if_exists_or_initialize(block)
        hook = registry.get_hook(_GROUP_OFFLOADING)
        if hook is None:
            break
        hook.group.onload_()
        if registry.get_hook(_LAYER_EXECUTION_TRACKER) is not None:
            registry.remove_hook(_LAYER_EXECUTION_TRACKER, recurse=False)
        registry.remove_hook(_GROUP_OFFLOADING, recurse=False)
        tracked.discard(f"transformer_blocks.{at}")
        kept += 1
    return kept, len(blocks)


def _reusing(transformer, reuse: float) -> None:
    """How much of a step may be taken from the step before.

    The one optimisation here that removes work rather than moving it about
    faster. Every other thing in `PERFORMANCE.md` is about getting twelve
    gigabytes to the card more quickly; this is about not fetching it.

    **First Block Cache.** The transformer is sixty blocks and a step runs all
    of them. With this on, the first block is run and what it changed is
    compared with what it changed last step: if the difference is under the
    threshold, the remaining fifty-nine are skipped and last step's residual is
    reused. The saving here is not the arithmetic, which was never the
    expensive part — it is that a skipped block's offload hook never fires, so
    the block never crosses the bus at all. A skipped step moves one sixtieth
    of the model instead of all of it.

    The hook order is what makes that true, and it is true by luck rather than
    by design: `HookRegistry` wraps the current forward each time, so the hook
    registered last is the outermost one. Group offloading is applied when the
    pipeline is built and this when a run starts, so this is outside it and
    returns the cached answer without the offload hook underneath ever being
    reached. Were it the other way round the block would be fetched and then
    not used.

    Zero is off and every step is computed in full. It is off by default
    because it changes the picture: it is a guess that nothing much happened,
    and a threshold high enough to skip most steps is high enough to lose the
    change you asked for.
    """
    from diffusers.hooks import FirstBlockCacheConfig

    if getattr(transformer, "_cache_config", None) is not None:
        transformer.disable_cache()
    if reuse > 0:
        transformer.enable_cache(FirstBlockCacheConfig(threshold=reuse))


def pulled_back(painting: Image.Image, produced: Image.Image, far: float) -> Image.Image:
    """The edit, taken as far as it was asked to go and no further.

    The editor has no denoise strength to turn down — it is instruction-led
    and regenerates the whole canvas, which is why the mask is what keeps the
    rest. So "closer to the original" is done at the end instead: the result
    mixed back over the painting it came from. One is the edit as the model
    made it; a half is the edit half-taken; a tenth is a suggestion of it.

    It is applied before the mask, so a masked edit is pulled back inside its
    own mask and the paint outside it stays exactly as it was either way.
    """
    carried = max(0.0, min(1.0, far))
    if carried >= 1:
        return produced
    return Image.blend(painting.convert("RGB"), produced.convert("RGB"), carried)


def edit(
    painting: Image.Image,
    instruction: str,
    mask: np.ndarray | None = None,
    references: list[Image.Image] | None = None,
    steps: int = 20,
    guidance: float = 4.0,
    far: float = 1.0,
    size: tuple[int, int] | None = None,
    reuse: float = 0.0,
    seed: int = 7,
    watching: Callable[[int, int], None] | None = None,
    stopped: Callable[[], bool] | None = None,
    saying: Callable[[str | None], None] | None = None,
) -> Image.Image:
    """The painting with the instruction carried out.

    With a mask, only the masked region is taken from the model and everything
    outside it is the original at its original resolution — so the answer to
    "it repainted my whole canvas" is to say which part you meant.

    `reuse` lets a step be taken from the step before it where little has
    changed; zero computes every step in full. `size` overrides the megapixel
    the pipeline would otherwise pick for itself. It is how a draft is drawn small; what comes back is scaled to the
    painting either way, so a draft is the same picture softer and not a
    smaller one.

    `watching` is told each step as it finishes, which is the only honest
    progress this has: eighteen minutes of silence is indistinguishable from a
    hang. `stopped` is checked at the same moments, so a run can be abandoned
    within about one step rather than not at all — a single forward pass of a
    20B model is not interruptible.
    """
    import torch

    pipeline = _pipeline()
    _reusing(pipeline.transformer, reuse)

    # Once the steps start there is something countable, so the note goes.
    if saying is not None:
        saying(None)

    def each_step(pipe, index: int, timestep, kwargs):  # noqa: ANN001 - diffusers' shape
        if watching is not None:
            watching(index + 1, steps)
        if stopped is not None and stopped():
            raise StoppedEarly("stopped part way through an edit")
        return kwargs
    # 2509 takes a list, and what the extra images are for is said in the
    # instruction rather than by position: shown two canvases and told to
    # repaint, it works in their manner. The painting stays first, because
    # every style instruction here calls it "the first image".
    produced = pipeline(
        image=[painting, *references] if references else painting,
        prompt=instruction,
        # Without a negative prompt the pipeline quietly disables guidance and
        # follows the instruction more loosely, which is the opposite of why
        # this model is here. It used to be a single space for exactly that
        # reason; now that there is something worth saying, it says it.
        negative_prompt=house.never(),
        num_inference_steps=steps,
        # The pipeline works at about a megapixel whatever it is handed,
        # unless it is told otherwise. A draft tells it otherwise.
        **({"width": size[0], "height": size[1]} if size else {}),
        true_cfg_scale=guidance,
        generator=torch.Generator().manual_seed(seed),
        callback_on_step_end=each_step,
    ).images[0]

    # It normalises to its own resolution, which is rarely the one it was given.
    if produced.size != painting.size:
        produced = produced.resize(painting.size, Image.Resampling.LANCZOS)

    produced = pulled_back(painting, produced, far)

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
