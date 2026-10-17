"""
A painting and a sentence, into a few seconds of video.

**This is the thing depth parallax deliberately refuses to do.** Parallax can
only move pixels he painted, which is why it stays faithful; this invents every
frame after the first, and will happily resolve a brushstroke into something
photographic. Both are wanted, for different jobs, so both are here and neither
replaces the other.

Wan 2.2 TI2V-5B, Apache 2.0. "5B" undersells what it costs: the official
repository is 34 GB, because the transformer ships in fp32 at 20 GB and Wan's
umT5-XXL text encoder is another 11.4. Against 8 GB of card that is the MiniMax
trap again, and the way out is the same one the image editor took — a Q8_0 GGUF
transformer at 5.4 GB, the highest-fidelity quant there is, because slow is
preferred to soft.

Nothing is ever all resident. The text encoder runs, its answer is kept and it
is offloaded; the transformer denoises a block at a time off the disk; the VAE
decodes at the end. Each part fits the card on its own, which is the only
reason any of this runs at all.
"""

from __future__ import annotations

import html
import os
import re
import shutil
import subprocess
from functools import lru_cache
from pathlib import Path
from typing import Callable

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

from .nodes import GraphError

MODELS = Path(__file__).resolve().parent.parent / "models"
SPILL = MODELS / "offload"
REPO = "Wan-AI/Wan2.2-TI2V-5B-Diffusers"
QUANTS = "QuantStack/Wan2.2-TI2V-5B-GGUF"
QUANT = "Wan2.2-TI2V-5B-Q8_0.gguf"


def gguf() -> Path | None:
    """The quantised transformer, wherever `fetch_wan.py` left it.

    Searched rather than named. The image editor's GGUF was put in a folder by
    hand and so has a path written down; this one is fetched by a script, and
    `hf_hub_download` keeps it in its own cache under a snapshot hash nobody
    can predict. Copying 5 GB out of there to match the older convention would
    cost the disk twice for tidiness.
    """
    plain = MODELS / "wan" / QUANT
    if plain.exists():
        return plain
    found = sorted(MODELS.glob(f"models--QuantStack--*/snapshots/*/{QUANT}"))
    return found[-1] if found else None

#: Where winget puts ffmpeg, for a shell that has not picked up the new PATH.
WINGET_FFMPEG = (
    Path(os.environ.get("LOCALAPPDATA", ""))
    / "Microsoft"
    / "WinGet"
    / "Packages"
    / "Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe"
    / "ffmpeg-9.0.2-full_build"
    / "bin"
    / "ffmpeg.exe"
)

#: Frames per second the model was trained at. Not a preference.
FPS = 24

#: The shortest clip Instagram will take, and so the shortest this will make.
#:
#: Not a preference either. Meta's content-publishing spec puts a reel at three
#: seconds minimum, and a clip below it is refused at the point of publishing —
#: after twenty-odd minutes of generating it. Better to refuse it here, where
#: the only cost is changing a number.
LEAST_SECONDS = 3.0


def available() -> bool:
    """Whether the weights are here. The node says so rather than failing late."""
    return gguf() is not None


def ffmpeg() -> str:
    """Where ffmpeg is, or what to do about it.

    Deliberately a system binary rather than a Python package: `imageio-ffmpeg`
    would vendor the same executable inside the dependency tree, and this tree
    is kept small on purpose.
    """
    found = shutil.which("ffmpeg")
    if found:
        return found
    if WINGET_FFMPEG.exists():
        return str(WINGET_FFMPEG)
    raise FileNotFoundError(
        "ffmpeg is not installed. Install it once with: winget install Gyan.FFmpeg"
    )


@lru_cache(maxsize=1)
def _pipeline():
    """Built once and kept. Setting it up is minutes, not seconds."""
    import torch
    from diffusers import (
        AutoencoderKLWan,
        GGUFQuantizationConfig,
        WanImageToVideoPipeline,
        WanTransformer3DModel,
    )

    weights = gguf()
    if weights is None:
        raise FileNotFoundError(
            f"Wan 2.2 is not downloaded. Run `python fetch_wan.py` to get {QUANT}."
        )

    transformer = WanTransformer3DModel.from_single_file(
        str(weights),
        quantization_config=GGUFQuantizationConfig(compute_dtype=torch.bfloat16),
        dtype=torch.bfloat16,
        config=REPO,
        subfolder="transformer",
    )
    # The VAE in float32. Wan's is a 3D autoencoder and its decode is where the
    # colour of every frame is decided; in bfloat16 it bands visibly in the
    # flat areas a painting is mostly made of.
    vae = AutoencoderKLWan.from_pretrained(
        REPO, subfolder="vae", dtype=torch.float32, cache_dir=MODELS
    )
    pipeline = WanImageToVideoPipeline.from_pretrained(
        REPO,
        transformer=transformer,
        vae=vae,
        dtype=torch.bfloat16,
        cache_dir=MODELS,
    )

    onload, offload = torch.device("cuda"), torch.device("cpu")

    # Scratch belonging to this process, for the reason recorded in `edit.py`:
    # a GGUF-quantised tensor does not survive a safetensors round trip, so a
    # spill written by a previous run is read back cold and dies.
    spill = SPILL / "wan"
    if spill.exists():
        shutil.rmtree(spill, ignore_errors=True)
    spill.mkdir(parents=True, exist_ok=True)

    pipeline.transformer.enable_group_offload(
        onload_device=onload,
        offload_device=offload,
        offload_type="block_level",
        num_blocks_per_group=1,
        offload_to_disk_path=str(spill / "transformer"),
    )
    # The text encoder never touches the card. Streamed onto it a block at a
    # time it still ran out of memory, inside umT5's attention, building the
    # position-bias mask — 512 by 512 per head, against a card that already
    # had 2.8 GB of VAE pinned to it and a transformer to come.
    #
    # It runs once per clip and 11.4 GB of it fits in 31 GB of system memory
    # with room, so it stays there and the prompt is encoded on the processor.
    # Half a minute, once, against an out-of-memory error every time.
    if getattr(pipeline, "text_encoder", None) is not None:
        pipeline.text_encoder.to(offload)

    # Resident, like the image editor's, and for the same reason: a stack of 3D
    # convolutions has no blocks for block_level to find, so grouping it leaves
    # the weights on the CPU while CUDA inputs arrive.
    pipeline.vae.to(onload)
    # Decoding 49 frames at once is what actually runs the card out of memory —
    # far more than any denoising step. Tiled, it decodes a piece at a time.
    pipeline.vae.enable_tiling()
    pipeline.vae.enable_slicing()

    return pipeline


def tidy(text: str) -> str:
    """What diffusers does to a prompt, minus the part that needs `ftfy`.

    Its `prompt_clean` is `ftfy.fix_text`, then two rounds of HTML unescaping,
    then whitespace collapsed. Only the first needs a dependency, and only to
    repair mojibake — text that was decoded with the wrong codec somewhere
    upstream. These prompts are typed into a form and arrive as UTF-8, so
    there is nothing for it to fix, and the rest is the standard library.
    """
    return re.sub(r"\s+", " ", html.unescape(html.unescape(text)).strip()).strip()


def embed(pipeline, prompts: list[str], length: int = 512):
    """Prompts as T5 hidden states, the way the pipeline would have done it.

    Hand-rolled so the engine needs no `ftfy`, and the one place here that
    copies a library's internals rather than calling it. `test_video.py`
    asserts it matches `_get_t5_prompt_embeds` tensor for tensor, with the
    cleaner stubbed out — so a diffusers release that changes the masking
    fails a test rather than quietly degrading every clip.
    """
    import torch

    tokenised = pipeline.tokenizer(
        [tidy(p) for p in prompts],
        padding="max_length",
        max_length=length,
        truncation=True,
        add_special_tokens=True,
        return_attention_mask=True,
        return_tensors="pt",
    )
    ids, mask = tokenised.input_ids, tokenised.attention_mask
    lengths = mask.gt(0).sum(dim=1).long()

    # Wherever the encoder actually is, which for this engine is the
    # processor. Asking the pipeline for its execution device would send the
    # ids to the card and the weights would not be there.
    device = next(pipeline.text_encoder.parameters()).device
    hidden = pipeline.text_encoder(ids.to(device), mask.to(device)).last_hidden_state
    hidden = hidden.to(dtype=pipeline.text_encoder.dtype)

    # Each prompt trimmed to its real length and zero-padded back out, rather
    # than left with the encoder's output over the padding tokens.
    kept = [row[:count] for row, count in zip(hidden, lengths)]
    return torch.stack(
        [torch.cat([row, row.new_zeros(length - row.size(0), row.size(1))]) for row in kept], dim=0
    )


def frames_for(seconds: float) -> int:
    """A frame count the model will accept.

    Wan's VAE compresses time four to one, so the count has to be 4k+1 or the
    latent does not divide. Asking for 2 seconds and silently getting 49 frames
    instead of 48 is better than a shape error from inside the scheduler.

    Never fewer than `LEAST_SECONDS` worth, whatever is asked for. A shorter
    clip cannot be published, and finding that out costs a re-render.
    """
    wanted = round(max(seconds, LEAST_SECONDS) * FPS)
    # Nearest, not floor. Flooring turned every "2 seconds" into 1.88, which
    # is a worse answer than 2.04 and harder to explain.
    return round((wanted - 1) / 4) * 4 + 1


#: What both sides of a generated frame have to be a multiple of.
#:
#: Thirty-two, not the sixteen the VAE's own compression suggests. The
#: pipeline patchifies in pairs on top of that and quietly adjusts anything
#: else: asked for 832x464 it said "Adjusting (464, 832) -> (448, 832)" and
#: carried on, so every clip made before this was a slightly different shape
#: from the one computed for it, and the note went by in a log nobody reads.
STRIDE = 32


def fit(painting: Image.Image, longest: int = 832, in_a_scene: bool = False) -> tuple[int, int]:
    """The size to generate at, as a multiple of 32 the pipeline can use.

    A painting is 3652 pixels across and the model was trained near 480p. Asked
    for the full size it would run the card out of memory long before it
    produced anything.

    **This is not the size the clip comes out at.** Both sides are rounded to
    sixteens, which moves the shape of the picture by up to one part in fifty —
    a 3652×4533 painting generates at 672×832, which is a different rectangle
    from the one he painted. `shown` is the size it is written at, and the
    frames are scaled to it on the way into the file.
    """
    wide, high = (SCENE_SHAPE if in_a_scene else painting.size)
    scale = longest / max(wide, high)
    return (
        max(STRIDE, int(round(wide * scale / STRIDE)) * STRIDE),
        max(STRIDE, int(round(high * scale / STRIDE)) * STRIDE),
    )


def shown(
    painting: Image.Image,
    generated: tuple[int, int],
    width: int = 0,
    height: int = 0,
    in_a_scene: bool = False,
) -> tuple[int, int]:
    """The size to write the clip at: the painting's own shape, or his.

    Nothing in the atelier changes the shape of a painting unless he asks it
    to. The model's size has to be a multiple of sixteen and the painting's
    shape almost never is, so the clip is generated at the size the model will
    take and written at the shape it was painted at.

    `width` and `height` are his, where he has typed them. One of the two is
    enough: the other follows from the painting, which is the only answer that
    does not invent a shape he did not ask for. Both given, both are obeyed —
    including a shape of his own, because that is what typing both means.

    Rounded to even numbers, which H.264 requires of a `yuv420p` file and will
    refuse without.
    """
    wide, high = painting.size
    if wide <= 0 or high <= 0 or in_a_scene:
        # In a scene the frame is the scene's shape, not the painting's: the
        # painting is an object inside it and keeping its ratio would crop the
        # mountain the sentence asked for.
        return even((width, height)) if width > 0 and height > 0 else even(generated)

    if width > 0 and height > 0:
        return even((width, height))
    if width > 0:
        return even((width, round(width * high / wide)))
    if height > 0:
        return even((round(height * wide / high), height))

    # Neither typed: the painting's shape, at about the size it was generated,
    # so a clip is neither upscaled nor shrunk beyond what the model did.
    scale = max(generated) / max(wide, high)
    return even((round(wide * scale), round(high * scale)))


def even(size: tuple[int, int]) -> tuple[int, int]:
    """Both sides even, which `yuv420p` requires. Never below two."""
    return (max(2, size[0] - size[0] % 2), max(2, size[1] - size[1] % 2))


#: The shape of a frame the painting is only part of.
#:
#: Sixteen by nine, because a scene wants room beside the painting and the
#: painting's own shape leaves none: a canvas is roughly square and a square
#: frame filled by a square painting is the thing this switch exists to stop.
#: Overridden by typing a width or a height, like everything else here.
SCENE_SHAPE = (16, 9)

#: How much of the frame the painting takes when it is part of a scene.
ROOM = 45.0

#: How long the model takes to turn the staging into a place, in seconds.
#:
#: The first moments of a staged clip are the model resolving a frame that was
#: assembled rather than photographed: the horizon sharpens, an easel appears
#: under the canvas, the ground finds its texture. It is not motion anybody
#: asked for, so it is generated and then dropped, and the clip he is given
#: starts where the scene is already standing.
SETTLES = 0.75


def staged(painting: Image.Image, size: tuple[int, int], room: float = ROOM) -> Image.Image:
    """The first frame with the painting standing in it, rather than being it.

    **Why this is needed at all.** The model is image-to-video: the image it is
    given *is* the first frame. Asked for a painting on an easel in a mountain,
    with the painting as the whole frame, it can only read the sentence as
    something happening to the picture — which is what it did, and the clip
    came back with the canvas filling the screen while people with torches
    arrived inside it.

    **The surround is a place, not a blur.** The first version put a blurred,
    darkened copy of the painting behind it, and the model did what a
    diffusion model does with an image it has been given: it kept it and
    transformed it. The blur hung in front of the mountain for most of a
    second and then slid away like a blanket being pulled off, because that is
    what "turn this into that" looks like when the thing it starts from is a
    picture of something else.

    So the surround is built as the simplest possible scene instead: light
    above, dark below, a horizon between them, in colours taken from the
    painting. There is nothing in it to peel, and the model has only to
    sharpen what is already the right shape.

    **And the easel is drawn, not left to be invented.** Sitting the canvas on
    the horizon was not enough: the model read that line as a far ridge, put
    the painting up at it, and the canvas hung in the air over a valley with no
    easel at all. So the frame now has three lines in it — a far horizon, the
    ground the easel stands on, and the foot of the canvas between them — and
    four strokes of dark paint where the legs go. The model turns those into
    wood, which is a far smaller thing to ask than inventing a piece of
    furniture and deciding where the floor is.
    """
    wide, high = size
    share = min(max(room, 5.0), 95.0) / 100

    held = painting.convert("RGB").copy()
    held.thumbnail(
        (max(1, round(wide * share)), max(1, round(high * share))), Image.Resampling.LANCZOS
    )

    # Three lines across the frame, which is what a landscape is made of: the
    # far horizon, the ground the easel stands on, and the foot of the canvas
    # between them. The painting sits well below the horizon, or it reads as
    # hanging in the distance — which is what it did when the two were level.
    horizon = round(high * 0.42)
    standing = round(high * 0.92)
    sky, ground = _sky_and_ground(painting)

    frame = Image.new("RGB", size, sky)
    frame.paste(Image.new("RGB", (wide, max(1, high - horizon)), ground), (0, horizon))
    frame = frame.filter(ImageFilter.GaussianBlur(radius=max(2, high // 40)))

    left = (wide - held.width) // 2
    # The legs want to be about as tall as the canvas, or they read as a
    # stand rather than an easel, so the canvas sits at three fifths and the
    # ground is at the bottom of the frame.
    foot = min(standing - round(high * 0.3), max(held.height + 2, round(high * 0.62)))
    frame.paste(held, (left, foot - held.height))

    # A crude easel: two legs to the ground and a bar across them. Four strokes
    # of dark paint, and the model turns them into wood. Invented from nothing
    # it put the easel wherever it liked, which was usually nowhere — the
    # canvas hung in the air over a valley.
    drawn = ImageDraw.Draw(frame)
    timber = tuple(max(0, value - 45) for value in ground)
    thick = max(2, wide // 180)
    spread = round(held.width * 0.38)
    for away in (-1, 1):
        drawn.line(
            [
                (left + held.width // 2 + away * (held.width // 3), foot - held.height // 6),
                (left + held.width // 2 + away * spread, standing),
            ],
            fill=timber,
            width=thick,
        )
    drawn.line(
        [(left + held.width // 4, foot + thick), (left + held.width * 3 // 4, foot + thick)],
        fill=timber,
        width=thick,
    )
    return frame.filter(ImageFilter.GaussianBlur(radius=1))


def _sky_and_ground(painting: Image.Image) -> tuple[tuple[int, int, int], tuple[int, int, int]]:
    """Two colours from the painting: one for above the horizon, one for below.

    Taken from its own top and bottom, so the staging carries the palette he
    painted with rather than a grey nobody chose. Dulled, because this is a
    place for the model to put a mountain and not a thing to look at.
    """
    small = painting.convert("RGB").resize((8, 8), Image.Resampling.LANCZOS)
    rows = list(small.getdata())

    def average(band: list[tuple[int, int, int]], towards: int) -> tuple[int, int, int]:
        count = max(1, len(band))
        mixed = [sum(pixel[at] for pixel in band) // count for at in range(3)]
        # Half way towards light or dark: a flat field of the painting's own
        # colour reads as a wall, and this reads as air or as earth.
        return tuple(round(value * 0.55 + towards * 0.45) for value in mixed)

    return average(rows[:24], 235), average(rows[40:], 40)


#: The largest clip measured to fit, as frames times pixels.
#:
#: Three seconds at 832 on a 3652×4533 painting: 73 frames at 672×832, which
#: is 40.8 million pixels of latent and the combination every default here
#: points at. It is one measured point and the only one — the model holds the
#: whole clip at once, so memory grows with frames and area together.
MEASURED = 73 * 672 * 832

#: How far past it to allow.
#:
#: Twice, which is a judgement and not a measurement: the card has 8 GB, the
#: model and its text encoder are most of that, and the headroom left is not
#: enough to be generous with. Anything beyond this is refused before the
#: model loads, and `animate` catches the card running out anyway — because a
#: line drawn from one point is a line that will be wrong somewhere.
AFFORDABLE = 2.0


def afford(frames: int, width: int, height: int) -> None:
    """Refuses a clip too big for the card, before anything is loaded.

    Measured once at three seconds and 832. The pair of numbers in the message
    is the whole point: an allocator's complaint about 2.53 GiB says nothing
    about which setting to move.
    """
    asked = frames * width * height
    if asked <= MEASURED * AFFORDABLE:
        return

    raise GraphError(
        f"{frames} frames at {width}×{height} is {asked / MEASURED:.1f} times the biggest clip "
        "this card has been measured to hold. Three seconds at 832 fits. Lower the seconds "
        "first: the model works on the whole clip at once, so they cost more than the size does."
    )


def animate(
    painting: Image.Image,
    prompt: str,
    seconds: float = LEAST_SECONDS,
    steps: int = 30,
    guidance: float = 5.0,
    seed: int = 7,
    longest: int = 832,
    in_a_scene: bool = False,
    room: float = ROOM,
    watching: Callable[[int, int], None] | None = None,
    stopped: Callable[[], bool] | None = None,
) -> list[np.ndarray]:
    """The painting, moving, as a list of RGB frames.

    `in_a_scene` decides what the painting is to the model: the whole frame,
    with the sentence describing what happens on the canvas, or an object in a
    wider frame, with the sentence describing what is around it.
    """
    import torch

    width, height = fit(painting, longest, in_a_scene)
    # Generated with the settling time on top, and handed back without it.
    count = frames_for(seconds + SETTLES if in_a_scene else seconds)
    afford(count, width, height)

    pipeline = _pipeline()
    start = (
        staged(painting, (width, height), room)
        if in_a_scene
        else painting.convert("RGB").resize((width, height), Image.Resampling.LANCZOS)
    )

    def stepped(_pipe, step: int, _timestep, kwargs):
        if watching is not None:
            watching(step + 1, steps)
        if stopped is not None and stopped():
            raise StopIteration("stopped between steps")
        return kwargs

    # Wan's own recommendation, and it earns its place: without it the model
    # drifts towards the over-saturated, over-sharpened look that makes a
    # painting read as a render. "painting" and "artwork" are in here on
    # purpose — they push it away from imitating brushwork it cannot do, and
    # towards moving what it was given.
    negative = (
        "bright colours, overexposed, static, blurred detail, subtitles, "
        "style, artwork, painting, picture, still, overall grey, worst quality, "
        "low quality, JPEG artefacts, ugly, deformed, extra fingers, "
        "poorly drawn hands, poorly drawn face, malformed, disfigured, "
        "fused fingers, motionless, cluttered background, three legs, "
        "walking backwards"
    )
    # Encoded here rather than by the pipeline, which cannot do it without
    # `ftfy`. See `embed`.
    said = embed(pipeline, [prompt.strip(), negative]).to(
        device="cuda", dtype=pipeline.transformer.dtype
    )

    try:
        result = pipeline(
            image=start,
            prompt_embeds=said[:1],
            negative_prompt_embeds=said[1:],
            height=height,
            width=width,
            num_frames=count,
            num_inference_steps=steps,
            guidance_scale=guidance,
            generator=torch.Generator(device="cuda").manual_seed(seed),
            output_type="np",
            callback_on_step_end=stepped,
        )
    except torch.cuda.OutOfMemoryError as ran_out:
        # The card's own words are four lines of allocator arithmetic and a
        # link to the PyTorch docs. What is actually needed is which two
        # numbers to lower, so the budget above gets a second chance to be
        # wrong in the right direction: it is drawn from one measured point,
        # and this is what happens when the line is in the wrong place.
        raise GraphError(
            f"{seconds:g} seconds at {longest} did not fit in the card "
            f"({count} frames at {width}×{height}). Three seconds at 832 does. "
            "Lower the seconds first: the model works on the whole clip at once, "
            "so they cost more than the size does."
        ) from ran_out

    # (frames, h, w, 3) in 0..1 — written out as 8-bit here rather than left
    # for the caller to guess at, which is the asymmetry that cost a day in
    # the inpainter.
    frames = [(frame * 255).round().clip(0, 255).astype(np.uint8) for frame in result.frames[0]]

    # The settling frames go. What they hold is the staged frame becoming a
    # place, which is scaffolding coming down and not a thing to watch.
    if in_a_scene:
        settling = min(round(SETTLES * FPS), max(0, len(frames) - frames_for(0)))
        frames = frames[settling:]
    return frames


#: The most scenes one run will chain.
#:
#: Not a memory limit — each scene is generated on its own and costs what one
#: clip costs. It is the drift: every hop starts from a frame the model drew
#: rather than from the painting, so the paint it was imitating is a copy of a
#: copy by the third or fourth, and the look stops being his.
MOST_SCENES = 6


def scenes(
    painting: Image.Image,
    asking: list[str],
    seconds: float = LEAST_SECONDS,
    steps: int = 30,
    guidance: float = 5.0,
    seed: int = 7,
    longest: int = 832,
    in_a_scene: bool = False,
    room: float = ROOM,
    watching: Callable[[int, int], None] | None = None,
    stopped: Callable[[], bool] | None = None,
    saying: Callable[[str | None], None] | None = None,
) -> list[np.ndarray]:
    """One clip in several scenes, each carrying on from the last frame of the one before.

    **Why this is not one longer clip.** The model holds every frame of a clip
    in memory at once, so twelve seconds is four times the memory of three and
    the card has none to spare. Each scene here is generated on its own, at the
    cost of one clip, and the frames are joined at the end — so the length is
    bounded by patience rather than by the card.

    **What it costs instead is faithfulness.** Scene one starts from his
    painting. Scene two starts from a frame the model drew of his painting, and
    scene three from a frame drawn of that. The brushwork softens with each
    hop, which is the trade and is why `MOST_SCENES` exists.

    `asking` is one sentence per scene. The seed walks with the scenes, so a
    rerun gives the same film and changing one sentence does not reroll the
    others.
    """
    wanted = [said.strip() for said in asking if said.strip()]
    if not wanted:
        raise GraphError("there are no scenes here: write one sentence per scene, one to a line")
    if len(wanted) > MOST_SCENES:
        raise GraphError(
            f"{len(wanted)} scenes is more than this will chain. Six is the most, and by the "
            "fourth the paint is a copy of a copy. Keep the ones that matter and film the rest "
            "as a second clip."
        )

    frames: list[np.ndarray] = []
    start = painting
    for at, said in enumerate(wanted):
        if saying is not None:
            saying(f"scene {at + 1} of {len(wanted)}: {said[:60]}")

        made = animate(
            start,
            said,
            seconds=seconds,
            steps=steps,
            guidance=guidance,
            # Walked rather than shared: the same seed on every scene makes
            # every scene the same motion.
            seed=seed + at,
            longest=longest,
            # Only the first scene: after it the frame already holds the
            # scene, and staging it again would put a picture of the mountain
            # on an easel in another mountain.
            in_a_scene=in_a_scene and at == 0,
            room=room,
            watching=watching,
            stopped=stopped,
        )

        # The first frame of a scene is the last frame of the one before it,
        # which is where it was told to start. Kept once, or the film stutters
        # on every join.
        frames.extend(made if at == 0 else made[1:])
        start = Image.fromarray(made[-1])

    if saying is not None:
        saying(None)
    return frames


def write_video(
    frames: list[np.ndarray],
    where: Path,
    fps: int = FPS,
    size: tuple[int, int] | None = None,
) -> Path:
    """The frames as an mp4, through ffmpeg.

    Raw frames go in over a pipe rather than as a few dozen PNGs on disk: the
    temporary files were the only part of this that could be left behind when a
    run was stopped part way.

    `size` is the shape to write at, which is the painting's and not the
    model's. Scaled here rather than frame by frame in Python: ffmpeg is doing
    a pass over every pixel anyway, and lanczos in C is faster than PIL over a
    list of arrays.
    """
    if not frames:
        raise ValueError("there are no frames to write")

    high, wide = frames[0].shape[:2]
    where.parent.mkdir(parents=True, exist_ok=True)

    # Only when it differs: a scale filter that changes nothing still re-reads
    # every pixel.
    scaling = (
        ["-vf", f"scale={size[0]}:{size[1]}:flags=lanczos"]
        if size and size != (wide, high)
        else []
    )

    ran = subprocess.run(
        [
            ffmpeg(),
            "-y",
            "-f", "rawvideo",
            "-pix_fmt", "rgb24",
            "-s", f"{wide}x{high}",
            "-framerate", str(fps),
            "-i", "-",
            # A silent track, at the sample rate and channel count Instagram
            # asks for. The clip has no sound and never will — what this
            # removes is a question nobody can answer without publishing:
            # Meta's spec lists audio requirements and never says audio is
            # optional, so a video-only file might be refused, and finding out
            # costs a published post. Silence weighs a few kilobytes.
            "-f", "lavfi",
            "-i", "anullsrc=channel_layout=stereo:sample_rate=48000",
            "-shortest",
            "-c:a", "aac",
            "-b:a", "128k",
            "-ar", "48000",
            "-ac", "2",
            "-c:v", "libx264",
            # Every player and every phone, which a clip is no use without.
            "-pix_fmt", "yuv420p",
            "-crf", "17",
            "-preset", "slow",
            # Lets a browser start playing before the whole file has arrived.
            "-movflags", "+faststart",
            *scaling,
            str(where),
        ],
        input=b"".join(frame.tobytes() for frame in frames),
        capture_output=True,
    )
    if ran.returncode != 0:
        # The last line of ffmpeg's complaint, which is the one that says why.
        said = (ran.stderr or b"").decode("utf-8", "replace").strip().splitlines()
        raise RuntimeError(f"ffmpeg refused the frames: {said[-1] if said else 'no reason given'}")

    return where
