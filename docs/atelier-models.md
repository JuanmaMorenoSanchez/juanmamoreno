# The models the atelier runs, and why those

Every model here was chosen under three rules, in this order:

1. **It must be licensed for commercial use, cleanly.** Paintings are sold from
   this site, so anything produced from a model appears beside something for
   sale. A non-commercial licence is a blocker, not a technicality.
2. **It must fit an 8 GB laptop RTX 4060** — in practice about 7 GB, and less
   with a browser open.
3. **It must run locally.** No cloud inference, no external provider, no API
   that can start charging.

A fourth rule emerged while building: **prefer a model `transformers` can load
over one that needs its own package.** That is one supply chain instead of two,
and it keeps installs off git URLs, which would skip the thirty-day age check
the dependencies are held to.

The result is a stack where **every licence is Apache 2.0 or MIT**, so there is
nothing to re-read before selling a painting.

---

## The stack

| Job                 | Model                                    | Size            | Licence    | Status       |
| ------------------- | ---------------------------------------- | --------------- | ---------- | ------------ |
| Text → boxes        | `IDEA-Research/grounding-dino-base`      | ~700 MB         | Apache 2.0 | **measured** |
| Box or point → mask | `facebook/sam2.1-hiera-small`            | 184 MB · 46M    | Apache 2.0 | **measured** |
| Fill behind         | LaMa (`big-lama`)                        | ~200 MB · 51M   | Apache 2.0 | planned      |
| Depth               | `depth-anything/Depth-Anything-V2-Small` | ~100 MB · 24.8M | Apache 2.0 | planned      |
| Background removal  | BiRefNet                                 | ~900 MB         | MIT        | optional     |
| Sketch code         | `Qwen/Qwen2.5-Coder-7B-Instruct` Q4_K_M  | ~4.7 GB         | Apache 2.0 | planned      |

Everything needed to cut a painting into layers is **under 2 GB of weights** and
peaked at **1,808 MiB of VRAM** — a quarter of the budget.

---

## Grounding DINO — finding the thing by name

**What it does.** Takes a photograph or painting and a phrase — "a girl", "a
blue shirt" — and returns boxes with confidence scores. Open-vocabulary: it is
not limited to a fixed list of classes, so it answers words it was never
explicitly trained on.

**Why it is here.** This is the capability the whole atelier turns on, and the
one that defeated the previous attempt. Gemini, asked for a mask, either
truncated its answer at 65,519 tokens or returned a polygon of twenty points
that cut squares and straight lines. On the hardest canvas in the catalogue it
produced one usable answer in six, and asking at temperature 0 only made it
wrong the same way every time.

**Why `base` and not `tiny`.** Both are Apache 2.0 and both fit easily. Accuracy
is the entire question being asked, and VRAM is not scarce at this size, so
there is no reason to take the smaller one.

**Measured** on painting 6 (1024×1085), 2026-10-09: **0.3–0.8 s per label**,
seven labels out of seven returning a box. Scores ranged from 0.31 ("an arm",
which is three arms) to 0.74 ("a blue shirt").

**What it does badly — two things, and the second is the one to remember.**

_Diffuse things._ "A green field" scored 0.41 but returned a box covering nearly
the whole canvas, because a field has no boundary to find.

_Absence._ **The score is not a presence test.** Asked for "a unicorn" on a
canvas containing none, it returned the arms and the inverted head — the most
creature-shaped thing available — and scored it **0.395**, against **0.418** for
"a girl", who is really there. Two hundredths apart. No threshold separates
those, and raising one loses real labels before it loses invented ones.

So the engine never reports that something was _found_. It returns the cut, the
score and the coverage, and the page shows the result for judging by eye. This
is the same lesson as the first attempt, in a new place: these models answer
confidently about things that are not there, and the only reliable check is
looking.

---

## SAM 2.1 Hiera Small — turning a box into a shape

**What it does.** Takes an image plus a box, a point, or several points, and
returns a pixel mask. Offers three candidate masks per prompt with its own
quality estimate, so the best can be taken automatically.

**Why it is here.** It converts a rough location into an exact edge, which is
the step Gemini could never do. It also accepts **points**, which matters: when
a word is ambiguous, a point drawn by hand is the same kind of input as a box
and a better one. The brush is not a workaround for this model, it is a
first-class prompt.

**Why Small, and why not SAM 3.** Small is 46M parameters and 184 MB — the
largest variant would buy very little on canvases of this kind. SAM 3 was in the
first draft of the plan because ComfyUI ships it, and was dropped: it carries a
custom Meta licence rather than Apache 2.0, and the use here is commercial.

**Measured**, same run: **0.1–0.4 s per mask**. Self-reported IoU was 0.98 for
the girl, 0.96 for a face, 0.96 for a shirt — and **0.56 for the field**, which
is the model telling the truth about its own failure.

**Three limits worth knowing:**

- **A loose box returns the object it frames, not the adjective.** "A blue
  shirt" came back as the whole inverted figure — shirt, hands and head.
- **Diffuse regions fail.** The field came back as confetti scattered over the
  foliage, because SAM looks for an object and there is none.
- **Mask precision follows box precision.** A tight box gives a clean edge; a
  loose one gives whatever dominates it.

The consequence for the design: **the background is never asked for, it is
derived** — whatever the figures did not take. Which is how layered parallax
wants it anyway.

---

## LaMa — filling in what was lifted out

**What it does.** Inpainting. Given an image and a mask, it reconstructs what
should be behind. Built on Fourier convolutions, which is why it continues
texture and structure across large holes better than its size suggests.

**Why it is here.** Once a figure is cut out, the layer behind has a hole.
Something must fill it, and the alternatives are worse on this hardware: SDXL
Inpainting is ~6 GB and carries OpenRAIL++ use restrictions that travel
downstream; FLUX.1 Fill is non-commercial and 12 GB.

**Why it is the one to fine-tune first.** It is the weakest link — a generic
inpainter will not invent _this_ brushwork. But it fine-tunes **self-supervised**:
mask random regions of the paintings, train it to put them back. No annotation
at all, 51M parameters, comfortable to train on 8 GB. Cheapest fine-tune
available, aimed at the part most likely to disappoint.

**Measured** on painting 6, 2026-10-09: **10–12 s on the CPU**, holding no VRAM
at all. Taken as `Carve/LaMa-ONNX` (`lama_fp32`, 208 MB) rather than TorchScript
— an ONNX graph is data and cannot run code when it is loaded, while the
well-known `big-lama.pt` files are individuals' GitHub releases.

**Two things it needed to be usable.** The graph takes its image in 0–1 and
returns 0–255, which is not symmetrical and not documented; read as 0–1 the
output clips to white, which is what the first run produced. And the mask has to
be **grown about 1% before filling** — a mask traces the figure's edge, so the
ring just outside it still carries the colour the brush left going past, and the
inpainter reads that as context and paints a faint outline of the thing being
removed.

**Honest about the result.** It continues the shirt and the field across a hole
and leaves no seam, but it does not paint: large holes come back as a plausible
soft mass rather than brushwork. For a parallax back plate — glimpsed at the
edges as a layer shifts — that is enough. To stand on its own it is not, which
is what the self-supervised fine-tune in the plan is for.

---

## Depth Anything V2 Small — distance from a flat picture

**What it does.** Monocular depth: one image in, a depth map out. No stereo pair,
no camera data.

**Why it is here.** It drives motion without a video model. Depth map → layer
offsets → frames, through the `Parallax` logic already in `@domain/generative`.
That motion is **faithful by construction**: it can only move pixels that were
painted, so it cannot resolve a brushstroke into a photograph the way an
image-to-video model does.

**Why Small specifically — this one matters.** Only the **Small** variant is
Apache 2.0. Base, Large and Giant are **CC BY-NC 4.0** and cannot be used here
at all. The smallest is the only usable one, which is lucky, because at 24.8M
parameters it is also the cheapest thing in the stack.

**One caveat, not papered over.** There is an unresolved issue upstream querying
dataset-licence risk for this model even though the weights are Apache 2.0. The
weights' licence is clear; the question is about what it was trained on. It is
used here to produce an internal depth map, never published, so the exposure is
small — but it is recorded rather than ignored.

**Not yet measured.**

---

## Qwen2.5-Coder 7B — writing the sketches

**What it does.** Generates code. Run locally through `llama.cpp` at Q4_K_M
quantisation, ~4.7 GB.

**Why it is here, and why 7B is enough.** The target is unusually small: one
interface, `Sketch`, with `setup`, `draw` and three optional methods, Canvas 2D
only, no framework, with the motion logic in `@domain/generative` as building
blocks. A 7B model can hit a target this narrow given two or three existing
sketches as examples. Qwen3-Coder 30B would be better and needs 19 GB, so it is
not a candidate.

**Not yet measured.**

---

## What was rejected, and why

| Model                                      | Reason                                                                                                                                                                        |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RMBG-2.0**                               | CC BY-NC 4.0 — no commercial use                                                                                                                                              |
| **Depth-Anything-V2 Base / Large / Giant** | CC BY-NC 4.0 — only Small is Apache 2.0                                                                                                                                       |
| **FLUX.1 Fill [dev]**                      | Non-commercial, and ~12 GB                                                                                                                                                    |
| **SDXL Inpainting 0.1**                    | OpenRAIL++ use restrictions travel downstream; ~6 GB                                                                                                                          |
| **Hunyuan Video**                          | Tencent Community Licence appears to exclude the EU                                                                                                                           |
| **SAM 3**                                  | Custom Meta licence, not Apache; unnecessary once SAM 2.1 proved out                                                                                                          |
| **Wan 2.2 TI2V-5B**                        | Apache 2.0 and it fits — but **on hold**, in favour of depth parallax                                                                                                         |
| **MiniMax H3**                             | 19.5 GB diffusion model and a 14.6 GB text encoder against ~7 GB of VRAM — 2.6× over. Its text encoder is NVFP4, a Blackwell format this Ada card has no hardware support for |

---

## Open weights is not open source

Worth stating once, because the distinction decided most of the table above.

**Apache 2.0 and MIT** are open-source licences. They permit commercial use,
modification and redistribution, with no field-of-use clause and no acceptable
use policy. Fine-tuning is explicitly allowed — Apache grants the right to
prepare derivative works. The only obligations (keep notices, state changes)
trigger on **distribution**, so running a model locally and publishing images
owes nothing. Apache adds an express patent grant; MIT does not.

**Open weights** means only that the files can be downloaded. The licence on
them may still forbid commercial use (CC BY-NC), restrict what they may be used
for and make you pass those terms downstream (OpenRAIL++), exclude whole
territories (Tencent's licence appears to exclude the EU), or impose revenue
thresholds. All of those models are freely downloadable. None of them are
open-source, and several cannot legally be used here.

Two limits no licence resolves: none of them warrants that the **training data**
was clean, and purely machine-generated output may not be copyrightable. Neither
bites hard here, because the input is always one of his own paintings and the
output is a derivative of a work he already owns.

_Licence terms read, not legal advice._

---

## How this is kept honest

- Each licence is re-read at its source on the day a model is downloaded, not
  trusted to memory.
- Model weights live in `atelier-engine/models/` and are not in git.
- Python dependencies follow the same thirty-day minimum age as the site's pnpm
  rule, checked by hand against PyPI because pip has no setting for it.
- Nothing in this stack can reach a paid API, because nothing in it has a client
  for one.

See `atelier-plan.md` for the architecture and `atelier-schema.svg` for the
shape of it.
