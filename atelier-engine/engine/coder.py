"""
Writing a generative sketch from a sentence.

Qwen2.5-Coder, and **no new dependency** to run it. The obvious route is
`llama-cpp-python` with a GGUF, and it publishes no Windows wheel at all — it
would compile from source against MSVC and CMake, which is a C++ toolchain
added to the tree for one model. `transformers` is already here and can do it.

**7B and 1.5B, never 3B.** The sizes are 0.5B, 1.5B, 7B — all Apache 2.0 — and
3B, which is under Qwen's research licence and forbids commercial use. The
convenient middle size is the one that cannot be used beside paintings that are
for sale, exactly as with Depth Anything, where only Small was usable.

The target is unusually small, which is why this works at all: one interface,
Canvas 2D, no framework, with the motion helpers in `@domain/generative` to
draw on. A model this size would not write an application; it can write one
`draw` method.
"""

from __future__ import annotations

import re
from pathlib import Path
from typing import Any, Callable

from .registry import Built, ModelSpec

BIG = "Qwen/Qwen2.5-Coder-7B-Instruct"
SMALL = "Qwen/Qwen2.5-Coder-1.5B-Instruct"

MODELS = Path(__file__).resolve().parent.parent / "models"
SPILL = MODELS / "offload"


def _build_for(repo: str) -> Callable[[str, Path, str], Built]:
    def build(_repo: str, cache_dir: Path, device: str) -> Built:
        import torch
        from transformers import AutoModelForCausalLM, AutoTokenizer

        tokenizer = AutoTokenizer.from_pretrained(repo, cache_dir=cache_dir)

        if repo == BIG:
            # 15 GB against 8 on the card. Split across the card, system
            # memory and disk, the same trade as the image editor: slow rather
            # than soft, which is what was asked for.
            SPILL.mkdir(parents=True, exist_ok=True)
            model = AutoModelForCausalLM.from_pretrained(
                repo,
                cache_dir=cache_dir,
                dtype=torch.bfloat16,
                device_map="auto",
                max_memory={0: "5GiB", "cpu": "12GiB"},
                offload_folder=str(SPILL / "coder"),
            )
        else:
            model = AutoModelForCausalLM.from_pretrained(
                repo, cache_dir=cache_dir, dtype=torch.bfloat16
            ).to(device)

        model.eval()
        return tokenizer, model

    return build


BIG_CODER = ModelSpec(key="coder-7b", repo=BIG, licence="Apache-2.0", build=_build_for(BIG))
SMALL_CODER = ModelSpec(key="coder-1.5b", repo=SMALL, licence="Apache-2.0", build=_build_for(SMALL))


CONTRACT = """\
setup(ctx, width, height)   // once, before the first frame. Seed state on this.
draw(ctx, frame)            // every frame. Must paint the whole canvas.
resize(ctx, width, height)  // optional. The canvas changed size.
pointerDown(x, y)           // optional. A press, in canvas pixels.

// `frame` is a plain object, already built for you:
//   frame.t        seconds since the piece started
//   frame.dt       seconds since the previous frame
//   frame.width    canvas width in pixels
//   frame.height   canvas height in pixels
//   frame.pointer  { x, y, vx, vy, down, active }"""
"""The interface, as comments rather than as a TypeScript `interface`.

It was a TypeScript interface at first, which is the real reason the model
answered in TypeScript: it was shown TypeScript and asked for JavaScript in
the same breath. The example below does the same job and cannot be copied into
the wrong language.
"""

EXAMPLE = """\
class Piece {
  setup(ctx, width, height) {
    this.dots = [];
    for (let i = 0; i < 120; i++) {
      this.dots.push({ x: Math.random() * width, y: Math.random() * height, r: 1 + Math.random() * 2 });
    }
  }

  draw(ctx, frame) {
    ctx.fillStyle = '#0b0b0c';
    ctx.fillRect(0, 0, frame.width, frame.height);
    ctx.fillStyle = '#f2e8d5';
    for (const dot of this.dots) {
      const sway = Math.sin(frame.t * 0.6 + dot.x * 0.01) * 6;
      ctx.beginPath();
      ctx.arc(dot.x + sway, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}"""
"""A worked answer, in the prompt.

The rule "plain JavaScript, not TypeScript" was already there in words, and
the small model answered with `class Piece implements Sketch`, `private width:
number` and `resize?(ctx, ...)` — three separate parse errors. A model this
size copies a shape far more reliably than it follows a prohibition, so it is
shown one instead of told.
"""

INSTRUCTIONS = """\
You write one small generative artwork as a JavaScript class.

Rules, all of them strict:
- Plain JavaScript. **No TypeScript**: no type annotations anywhere, no
  `implements`, no `private`/`public`, no `?` after a method name, no
  `interface`. No imports, no exports, no modules.
- Define exactly one class named Piece, with the methods shown below. No
  constructor — state is set up in setup().
- Canvas 2D only. No libraries, no p5, no WebGL, no fetch, no network of any
  kind, no timers, no document or window access. Draw with ctx and nothing else.
- draw(ctx, frame) is called every frame. Use frame.t for time, in seconds, and
  frame.width and frame.height for the size. Paint the background yourself every
  frame; the canvas is not cleared for you.
- Answer with the class and nothing else: no prose, no markdown fence.

The methods, with what each is given (this is the shape, not code to copy):
%s

An answer in exactly the form wanted:
%s

Now write a piece that: %s
""" % (CONTRACT, EXAMPLE, "%s")

SHARPER = """\
That was not plain JavaScript. Write it again with no type annotations, no \
`implements`, no `private`, and no `?` after any method name — exactly like \
the worked example."""


def write_sketch(
    registry: Any,
    asking: str,
    small: bool = False,
    most_tokens: int = 900,
    watching: Callable[[int, int], None] | None = None,
) -> str:
    """One `Piece` class, as JavaScript. Raises if it writes nothing usable.

    Two attempts, and only when the first comes back as TypeScript. That is
    the one failure worth retrying automatically: it is common, it is detected
    exactly, and it costs the browser a parse error rather than a bad drawing.
    Anything else — an ugly piece, a boring one — is a matter of taste and is
    his to judge, not this function's.
    """
    import torch

    tokenizer, model = registry.get(SMALL_CODER if small else BIG_CODER)

    said: list[dict[str, str]] = [
        {"role": "system", "content": "You write small Canvas 2D sketches and nothing else."},
        {"role": "user", "content": INSTRUCTIONS % asking.strip()},
    ]
    code = ""

    for attempt in (0, 1):
        if watching is not None:
            watching(attempt, 2)

        prompt = tokenizer.apply_chat_template(
            said, tokenize=False, add_generation_prompt=True
        )
        inputs = tokenizer([prompt], return_tensors="pt").to(model.device)

        with torch.no_grad():
            produced = model.generate(
                **inputs,
                max_new_tokens=most_tokens,
                do_sample=True,
                temperature=0.6,
                top_p=0.9,
                pad_token_id=tokenizer.eos_token_id,
            )

        answer = tokenizer.decode(
            produced[0][inputs.input_ids.shape[-1] :], skip_special_tokens=True
        )
        code = _just_the_class(answer)
        if not _typescript_in(code):
            return code

        said = said + [
            {"role": "assistant", "content": answer},
            {"role": "user", "content": SHARPER},
        ]

    raise ValueError(
        "it answered in TypeScript twice, which a browser cannot run. "
        + ("Turn the small model off and try again." if small else "Try a simpler sentence.")
    )


def _just_the_class(said: str) -> str:
    """The class, with whatever the model wrapped it in taken off.

    Asked for no markdown it mostly complies, and sometimes does not. Stripping
    a fence is one line; refusing an answer over punctuation would be silly.
    """
    fenced = re.search(r"```(?:javascript|js|ts|typescript)?\s*(.+?)```", said, re.S)
    code = (fenced.group(1) if fenced else said).strip()

    return _called_piece(code)


def _called_piece(code: str) -> str:
    """The class renamed to `Piece`, if it needs it.

    Asked for a class called Piece and shown one, the model writes perfectly
    good JavaScript and calls it `DustMote`, after the subject. The name is the
    one part of this that is an interface detail rather than the artwork, so it
    is corrected rather than refused — but only when there is exactly one
    class, because with helpers around there is no telling which one is the
    piece.
    """
    if re.search(r"\bclass\s+Piece\b", code):
        return code

    declared = re.findall(r"\bclass\s+(\w+)", code)
    if len(declared) != 1:
        raise ValueError(
            "the model did not write a class called Piece. Try asking for something simpler."
        )

    return re.sub(r"\b%s\b" % re.escape(declared[0]), "Piece", code)


# The TypeScript a small coder actually produces, each of which is a parse
# error in a browser rather than something that merely runs badly. Narrow on
# purpose: every one of these was in a real answer, and none can appear in
# valid JavaScript, so a match is never a false alarm.
TYPESCRIPT = (
    re.compile(r"\bclass\s+Piece\s+implements\b"),
    re.compile(r"^\s*(private|public|protected|readonly)\s+\w", re.M),
    re.compile(r"^\s*\w+\?\s*\(", re.M),
    re.compile(r"\binterface\s+\w+\s*\{"),
    # Needs the brace or semicolon: `cond ? (a) : void 0` is valid JavaScript
    # and would otherwise match, costing the big model a pointless second pass.
    re.compile(r"\)\s*:\s*(void|number|string|boolean)\s*[{;]"),
)


def _typescript_in(code: str) -> bool:
    """Whether the answer is TypeScript wearing a `.js` name."""
    return any(marker.search(code) for marker in TYPESCRIPT)
