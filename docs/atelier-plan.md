# The atelier, second attempt — feasibility and architecture

Phase 1 deliverable: what the hardware can actually do, what it cannot, and the
shape I propose building. **No implementation yet.** Written 2026-10-09 against
site 2.0.0, revised the same day after the decision to build our own engine.

The first atelier was removed in 2.0.0 because it depended on Vertex to find the
shape of things in a painting, and Vertex could not. This plan exists to avoid
repeating that: every claim below is either measured on this machine or marked as
needing verification.

## The four constraints this plan answers to

1. **Nothing that charges.** No cloud inference, no external provider, no paid
   API, ever — not now and not by accident later.
2. **Full control and privacy.** What you generate stays on your machine until
   you decide otherwise.
3. **Our own engine**, in this project: a simplified thing that does the few
   jobs you need, not a general-purpose one.
4. **`/atelier` on the web**, as a page of the site.

Offline operation is explicitly _not_ a requirement — that was a proxy for (1)
and (2), and those are met directly.

---

## 1. What is actually on this machine

Measured, not assumed:

|            |                                                                                         |
| ---------- | --------------------------------------------------------------------------------------- |
| GPU        | NVIDIA GeForce RTX 4060 **Laptop**, 8188 MiB, compute capability **8.9** (Ada Lovelace) |
| System RAM | 32 GB                                                                                   |
| CPU        | i7-13700HX                                                                              |
| Display    | driven by the **Intel UHD iGPU**, not the 4060 — good, the dGPU is free for compute     |
| Free disk  | 672 GB on C:                                                                            |
| Python     | 3.11.9 system-wide                                                                      |

Two findings matter more than the VRAM number.

**Compute 8.9 means native FP8.** Ada has FP8 tensor cores, so an FP8 model is
not merely smaller here, it is _faster_. This is the format to prefer. It also
means **NVFP4 is the wrong format** — NVFP4 is Blackwell (compute 10.0+). On Ada
it must be dequantised in software, losing the benefit and possibly the fit.

**Only 847 MiB of VRAM was free while I measured**, because Chrome, VS Code and
Electron held roughly 6.4 GB. The practical budget is:

- **~7.4 GB** with everything closed
- **~1–2 GB** with your normal desktop open

Any plan that assumes "8 GB" is already wrong. Every model below is chosen to
leave room, and §4 makes one-model-at-a-time an explicit rule rather than a hope.

### The 40 GB already downloaded does not fit

`ComfyUI-Shared/models` holds a MiniMax H3 image-to-video stack:

| File                                                               | Size         |
| ------------------------------------------------------------------ | ------------ |
| `minimax_h3_fl2va_pruned_int8_convrot.safetensors`                 | **19.53 GB** |
| `qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors` (text encoder)      | **14.61 GB** |
| `minimax_h3_video_vae_int8_convrot.safetensors`                    | 2.62 GB      |
| `minimax_h3_fl2v_turbo_8step_v1.0_comfyui_bf16.safetensors` (LoRA) | 1.82 GB      |
| `minimax_h3_audio_vae_fp32.safetensors`                            | 0.56 GB      |

I have to be blunt, because it is the most expensive misunderstanding in the
project right now:

- The diffusion model alone is **19.53 GB against ~7.4 GB of usable VRAM — 2.6×
  over**. It could only run by streaming blocks from system RAM across the PCIe
  bus, continuously, for every step of every frame.
- The text encoder is another **14.61 GB**, in a format this GPU does not support
  in hardware.
- Expect tens of minutes per clip at best, and out-of-memory failure as the
  likely outcome.

**Set it aside — keep the files, don't use them.** They cost only disk, of which
you have 672 GB. §5 names a video model that genuinely fits.

---

## 2. `/atelier` on the deployed site

This is what you asked for, and it works. Two things make it work, and one
needs designing around.

**The prerender is not a problem.** There are already five prerendered
admin-guarded routes — `/door`, `/mint`, `/pendingmint`, `/activity` and one
more — all passing `verify-render.mjs`. `/atelier` follows exactly the same
pattern: `canActivate: [readerLanguage, adminOnly]`, a key in both translation
files, an entry in the route table under both language parents. 388 pages becomes 390. No new category of problem.

**The browser-to-localhost call needs a permission, once.** The page is served
from `https://juanmamoreno.com`; the inference service listens on
`http://127.0.0.1`. Chromium gates that with **Local Network Access**, enforced
since Chromium 142 (October 2025), and Chrome 156 — stable **20 October 2026**,
eleven days from now — removes the last enterprise opt-out. The details work in
our favour:

- the permission **can only be requested from an HTTPS page**, which the
  deployed site is (a locally-served dev build would actually have a _harder_
  time here)
- after the grant, **Chrome relaxes mixed-content restrictions for local
  targets**, so plain HTTP to `127.0.0.1` is allowed
- each `fetch` is annotated `targetAddressSpace: 'local'`
- **the grant sticks per origin** — you approve once for `juanmamoreno.com`

One concrete design consequence: **WebSocket has been in LNA's scope since
Chromium 147 and cannot carry the `targetAddressSpace` annotation.** So progress
streaming uses **Server-Sent Events or plain polling over `fetch`**, not a
WebSocket. Worth knowing now rather than after it is built.

**What the page must do when the service is not running:** say so, plainly, and
offer the command to start it. An admin page that silently fails because a local
process is down is the kind of thing that wastes an afternoon.

---

## 3. Our own engine

### What this removes

Building it ourselves is not only a preference — it deletes three problems:

- **No GPL-3.0 question.** ComfyUI is GPL; talking to it over HTTP is
  arm's-length and almost certainly fine, but "almost certainly fine" is a thing
  to explain to a buyer one day. Our own code under our own licence has nothing
  to explain.
- **No paid-node trap.** ComfyUI ships 976 node types of which **286 are billed
  cloud nodes** — Kling, Runway, Veo 3, Luma, Bria — sitting in the same menus
  as local ones with near-identical names (`MiniMaxH3ImageToVideo` is local;
  `MinimaxImageToVideoNode` is not). With our own engine there is no such node to
  emit by mistake. Constraint (1) is satisfied by construction, not by a
  guardrail.
- **No 690 nodes you will never use.**

### What it costs, honestly

The hard part of running these models on 8 GB is not calling them. It is
deciding what is resident in VRAM at any moment. That is what ComfyUI's years of
work bought, and it is the one place where writing our own is genuinely harder.

The mitigating fact: most of that machinery is now library features, not
bespoke code. Hugging Face `diffusers` ships
`enable_model_cpu_offload()` and `enable_sequential_cpu_offload()`, and
`accelerate` does layer-wise offload with a device map. We configure it; we do
not invent it.

So the realistic build is:

| Piece                                                          | Effort                                           |
| -------------------------------------------------------------- | ------------------------------------------------ |
| FastAPI service, ~8 endpoints                                  | small                                            |
| Model registry: load, cache, **evict**                         | **the real work** — one model resident at a time |
| Graph executor: topological order + content-hash caching       | ~100 lines                                       |
| Per-operation glue (segment, mask, cut, inpaint, depth, video) | moderate, one at a time                          |

**The rule that makes it fit: exactly one model in VRAM at a time**, loaded on
demand, evicted before the next. The models in §5 are small enough that this is
cheap — seconds, not minutes.

### Shape

```
Angular /atelier            ──HTTPS──>  GitHub Pages (static, prerendered)
 (juanmamoreno.com)
      │
      ├──fetch, targetAddressSpace:'local'──>  our service  ──>  GPU
      │                                        127.0.0.1:7860
      │                                        (this project, Python)
      │
      └──HTTPS──>  existing Cloud Run backend  ──>  Firestore + bucket
                   (only when you press Save)
```

### What privacy actually means here

Worth being precise, so there is no doubt later:

- **Inference: never leaves the machine.** No image, mask, prompt or video is
  ever sent anywhere.
- **Model downloads: one-time, and they are downloads, not inference.** Fetching
  weights from Hugging Face is the only outbound traffic the engine ever makes,
  it happens once per model, and it can be done by hand if you prefer.
- **Your backend: only on an explicit Save**, to storage you already own.
- **No logs.** Per the standing rule, the atelier records a kind and a time, never
  a prompt, a path or a url.

---

## 4. The editor

### Few nodes, high level

The value of our own editor is not that it is a graph — ComfyUI is already a
graph. It is that ours speaks **your** vocabulary: it knows what a frontal view
is, which token a painting is, and where parallax layers live.

| Atelier node                             | What the service does                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------ |
| **Painting**                             | pick from your catalogue via `ARTWORK_PORT`; load the original from the bucket |
| **Find** (text prompt)                   | Grounding DINO → boxes                                                         |
| **Isolate** (boxes, or your brush hints) | SAM 2.1 → mask                                                                 |
| **Refine edge**                          | grow, then feather — your "subtle fade at the borders"                         |
| **Cut layer**                            | mask → RGBA png                                                                |
| **Fill behind**                          | LaMa over the inverted mask                                                    |
| **Depth**                                | Depth Anything V2 Small → depth map                                            |
| **Animate**                              | depth parallax (cheap), or Wan 2.2 (slow)                                      |
| **Save**                                 | your existing backend, on an explicit press                                    |

A linear pipeline covers all of Workflow B. The free-form graph can come later,
once the node set has earned its shape.

### Nothing new on the npm side

The pipeline for Workflow B is a list of steps with thumbnails, drawn with
signals and SVG — no graph library. If it later grows into a real free-form
canvas we can revisit, but I would rather not add `@xyflow`, `rete` or
`litegraph` for a list.

### Reuse

Already in the repo and directly applicable: `@domain/generative/*` (`Parallax`,
`BeatClock`, `FrameTimeline`, particles), the layer pngs in
`assets/images/canvases/`, the `Sketch` contract, `adminOnly`, `ARTWORK_PORT`.
Workflow B's output is exactly what `Parallax` already consumes.

---

## 5. The models — all Apache 2.0, all fitting 8 GB

Verified by source on 2026-10-09. This stack is deliberately chosen so that
**every licence is Apache 2.0** and no model needs a judgement call.

| Job                 | Model                                | Params / size    | VRAM         | Licence           |
| ------------------- | ------------------------------------ | ---------------- | ------------ | ----------------- |
| Text → boxes        | **Grounding DINO** (Swin-T)          | ~700 MB          | ~1.5 GB      | **Apache 2.0** ✅ |
| Boxes/points → mask | **SAM 2.1 Hiera Small**              | 46M · **184 MB** | ~1 GB        | **Apache 2.0** ✅ |
| Background removal  | **BiRefNet**                         | ~900 MB          | ~2 GB        | MIT ✅            |
| Fill behind         | **LaMa** (big-lama)                  | 51M · ~200 MB    | ~1 GB        | **Apache 2.0** ✅ |
| Depth               | **Depth Anything V2 Small**          | **24.8M**        | ~1 GB        | **Apache 2.0** ✅ |
| Image → video       | **Wan 2.2 TI2V-5B**, FP8             | ~5 GB            | ~6 GB @ 480p | **Apache 2.0** ✅ |
| Code generation     | **Qwen2.5-Coder-7B-Instruct** Q4_K_M | ~4.7 GB          | ~5.5 GB      | **Apache 2.0** ✅ |

Everything for Workflow B together is **under 2 GB of weights** and well under
half the VRAM budget. This is the opposite of the MiniMax situation.

### Why this replaces my earlier recommendation

My first draft proposed SAM 3, which ComfyUI ships natively. It has a custom Meta
licence, not Apache, and your use is commercial — you sell paintings and mint
tokens, so a layer shown on `juanmamoreno.com` is commercial use. **Grounding
DINO + SAM 2.1 gives the same capability — text-prompted segmentation — with two
clean Apache 2.0 licences and no verification hanging over it.** It is also
smaller and faster. Dropping SAM 3 removes the single biggest open question from
the first draft.

### Explicitly avoided

| Model                                  | Why not                                                                    |
| -------------------------------------- | -------------------------------------------------------------------------- |
| RMBG-2.0                               | CC BY-NC 4.0 — no commercial use                                           |
| Depth-Anything-V2 Base / Large / Giant | CC BY-NC 4.0 — **only the Small variant is Apache 2.0**                    |
| FLUX.1 Fill [dev]                      | non-commercial, and ~12 GB anyway                                          |
| Hunyuan Video                          | Tencent Community Licence appears to **exclude the EU** — you are in Spain |
| SAM 3                                  | custom Meta licence; unnecessary now                                       |
| MiniMax H3 (on disk)                   | 2.6× too large; unclear licence                                            |

One caveat I will not paper over: there is an **open issue on the Depth Anything
V2 repository querying dataset-licence risk for the Small model** even though the
weights are Apache 2.0. The weights' licence is clear; the question is about
training data, it is unresolved upstream, and it applies to a depth map used as
an internal intermediate. I judge it a low risk worth noting, not a blocker.

---

## 6. Workflow by workflow

### B — decomposition into layers (do this first)

**Verdict: comfortable, and the thing that defeated Vertex is solved.**

Grounding DINO takes free text and returns boxes; SAM 2.1 turns a box — or a
point, or your brush strokes — into a real mask. The three reasons the Vertex
attempt failed are all gone:

- **no token limit**, so no truncation at 65,519 tokens
- **a real mask**, not 20 polygon points that cut squares and straight lines
- **retries are free**, so a bad result costs two seconds instead of a billed
  call

And when the text prompt is vague — "the girl" on painting 6 — the point and box
prompts are a first-class input, not a workaround. That is the "hint manually,
let the model refine it" idea you raised and set aside, and here it is the
designed path rather than a fallback.

The weak link is **inpainting, not segmentation**. LaMa is excellent at
continuing texture and will not invent brushwork that matches a painting. Expect
to finish some fills by hand.

### A — image to video

**Start without a video model at all.**

For subtle motion on a painting, a video model is the expensive answer and
possibly the wrong one. You already have `Parallax` in `@domain/generative`, and
Depth Anything V2 Small is **24.8M parameters**. Depth map → layer offsets →
render frames gives motion that is _faithful by construction_: it cannot invent
a face or resolve a brushstroke into a photograph, because it only moves pixels
you painted.

That is ~25 MB of model and seconds of compute, against ~5 GB and tens of
minutes. For a painting on a web page I think it is also the better result.

**Wan 2.2 is on hold** — decided 2026-10-09. Depth parallax is the motion the
atelier offers, and the effort that would have gone into a video model goes into
generating sketches from prompts instead (workflow C). This is the right order:
parallax motion and generated sketches both compose with what already exists,
and a 5B video model is the one thing in this plan that does not comfortably fit
the card.

Kept here because it is the obvious next thing when motion needs to do more than
move flat layers: Wan 2.2 TI2V-5B FP8, Apache 2.0, ~6 GB at 480p, described in
current write-ups as running on a laptop-class RTX 4060. Its two problems, for
whenever it comes off hold:

1. **Image-to-video models drift** — fed a painting they resolve its ambiguities
   into photographic plausibility, the opposite of what you want.
2. The mitigation is to **condition on the painting as both first and last
   frame**, forcing a short seamless loop back to the original. For a web page, a
   3-second loop that begins and ends as the painting beats a longer clip that
   wanders.

Expect 10–40 minutes per clip.

### C — generative interactive artworks

**Verdict: more feasible than it sounds, because the target is tiny.**

What must be generated is not arbitrary code — it is one small interface:

```ts
interface Sketch {
  setup(ctx: CanvasRenderingContext2D, width: number, height: number): void | Promise<void>;
  draw(ctx: CanvasRenderingContext2D, frame: Frame): void;
  resize?(...): void;  pointerDown?(x, y): void;  dispose?(): void;
}
```

Canvas 2D, no p5.js, no framework, with `@domain/generative/*` as building
blocks. A 7B coder model can hit a target this narrow, given two or three
existing sketches as examples. Qwen2.5-Coder-7B at Q4_K_M, Apache 2.0, ~4.7 GB.

**Sandboxing.** The boundary must be real, not a validator:

- a **sandboxed iframe** with `sandbox="allow-scripts"` and _not_
  `allow-same-origin` — an opaque origin, so no reach into the parent DOM,
  storage, cookies or your admin session
- a CSP of `default-src 'none'; script-src 'unsafe-inline'` with **no
  `connect-src`**, so `fetch`, `XMLHttpRequest` and `WebSocket` cannot reach
  anything, local or remote
- code in by `postMessage`, drawing to a canvas inside the iframe; errors posted
  back out for repair

A static scan for `fetch`/`eval`/`import` is worth having for _fast feedback_,
but it is not the security boundary — the opaque origin and the CSP are. A
grep-based validator can always be worked around.

A generated sketch still would not become a page: `registry.ts` needs a
hand-written line, which is the gate you deliberately kept.

---

## 7. Teaching it your paintings

Every model here learned from photographs. Your canvases are not photographs,
and that gap is the main risk in this plan. Fine-tuning on your own work is the
answer to it, and the licences allow it outright — Apache 2.0 grants the right to
prepare derivative works, with no field-of-use clause and no acceptable-use
policy to honour.

### Yes, it can be turned on and off

That is exactly what a **LoRA** is: not a changed model but a separate small file
of weight deltas, loaded on top of the base model at a strength you choose. 0.0
is off, 1.0 is full, and the values between are real — so "my style" is a dial
rather than a switch, and you can ask for a quarter of it.

Not everything is LoRA-shaped. A fine-tuned LaMa is a second checkpoint rather
than an overlay, so there it is on or off by which file loads — but each is only
about 200 MB, so keeping both costs nothing.

### The dataset you already have

The build renders pages for about 150 distinct paintings plus second views, and
the high-resolution originals are in the bucket. For everything below that is
enough; people train style LoRAs on twenty images.

### Three candidates, best first

**1. LaMa, self-supervised — no labelling at all.** "Fill behind" is the weakest
part of this plan: a generic inpainter will not invent _your_ brushwork. LaMa
fine-tunes by masking random regions of your own paintings and learning to put
them back, so the annotation is nothing — the paintings are the labels. 150
canvases at full resolution is thousands of crops, the model is 51M parameters,
and training it on 8 GB is untroubled. **Cheapest to do, and it attacks the thing
most likely to disappoint.**

**2. The segmenter, if Phase 2 says it needs it.** If Grounding DINO cannot
ground "the girl" in a painted canvas, fine-tuning it — or SAM 2.1's mask decoder
— on your paintings is the fix. It needs masks, which is the catch-22: masks are
what the thing produces. But you wanted to cut by hand anyway, and **a hand-drawn
mask is a training label**. Thirty or forty is enough to adapt a 46M-parameter
decoder. The brush stops being a workaround and becomes the annotation tool.

**3. A style LoRA — but there is nothing to attach it to yet.** This is the
well-trodden path, and 150 images is generous. The snag: this stack has no
text-to-image model in it. It segments, fills, measures and animates. A style
LoRA would be for a workflow not yet asked for.

### What the hardware allows

Training needs optimiser state and activations on top of the weights — three to
four times inference. So: LaMa (51M) and the SAM decoder (46M) are comfortable;
Grounding DINO (~170M) is fine; a full fine-tune of anything larger is out of the
question on this card. Wan 2.2 would have been the hard case, and it is on hold.

Training locally also means the originals never leave the machine, which is the
privacy property you asked for — and it reads from the bucket and never writes
back, so nothing can downgrade an original.

### The discipline

**Do not fine-tune anything until Phase 2 has measured what the base models
actually do.** Twice this project has built on an assumption that a model could
do something it could not — Gemini's masks, then MiniMax's weights — and both
times the cost was weeks. Fine-tuning is the right answer to a _measured_ gap. If
Grounding DINO grounds "the girl" out of the box, a fine-tune is effort spent on
a problem you do not have.

Training adds `peft` and `datasets` beyond the inference list, so it is a
separate dependency ask when the time comes.

## 8. Order of work

**Phase 1 (this document).** Audit, feasibility, architecture. Done.

**Phase 2 — the spike. Done, 2026-10-09, and it passed.**
`atelier-engine/spike/isolate.py`, run on **painting 6** — the canvas where
"the girl" returned an error from Vertex and "the woman in the bottom" returned
something random. **7 of 7 labels produced a cut.** The mask of the girl follows
her hair, her shoulder and her face and takes nothing else; the face, asked for
separately, is cut to its own contour and excludes the hair.

Measured, not estimated:

|                 |                                                           |
| --------------- | --------------------------------------------------------- |
| Peak VRAM       | **1,808 MiB** — of 7,096 free, so a quarter of the budget |
| Grounding DINO  | 0.3–0.8s per label                                        |
| SAM 2.1         | 0.1–0.4s per mask                                         |
| Weights on disk | 1.1 GB for both                                           |

**What it does well and what it does not** — the finding that shapes the
editor:

- **A tight, well-grounded box gives an excellent mask.** "a girl" (dino 0.41,
  SAM iou 0.98) and "a face" (0.56 / 0.96) are clean enough to cut and use.
- **A loose box on a coherent object gives the object, not the named part.**
  "a blue shirt" returned the whole inverted figure — shirt, hands and head —
  because SAM segments _what the box frames_, not the adjective. Usable as a
  layer; not literal.
- **A diffuse region fails.** "a green field" (iou 0.56) came back as confetti
  scattered over the foliage: SAM looks for an object and there is none. **So do
  not ask for the background — derive it.** The background layer is whatever the
  figures did not take, which is how layered parallax wants it anyway.

Mask precision follows box precision, which is the argument for the brush: a
point or a box drawn by hand is the same kind of input, and the better one when
a word is ambiguous.

**Phase 3 — the engine. Done, 2026-10-09.** The model registry that holds one
model at a time and evicts before loading the next; find, isolate and fill; layers
written as transparent pngs with a softened edge; and an HTTP service on
`127.0.0.1:7860` that takes an uploaded painting and one phrase per line. Thirty
tests, stdlib `unittest`, no test framework added — they run with no GPU and no
weights.

Measured through HTTP on painting 6: **21.2 s** for two layers, a background and
an inpainted back plate, and the card back to 6,908 MiB free afterwards.

Two findings that changed the design:

- **A score is not a presence test.** Asked for "a unicorn" on a canvas with
  none, Grounding DINO returned the arms and the inverted head at **0.395** —
  against **0.418** for "a girl", who is there. Two hundredths apart, so no
  threshold separates them. The service therefore never reports that something
  was _found_: it returns the cut, the score and the coverage, and the page
  shows it for judging by eye.
- **The thirty-day rule needs a second file.** Pinning what the engine imports
  constrained none of what those packages dragged in: eleven arrived newer than
  the rule allows, including a `tokenizers` published that morning and a
  `pydantic` published the day before. `constraints.txt` holds the rest of the
  tree, and `tools/check_ages.py` fails if anything slips.

**Verify: `python -m unittest discover -s tests -t .` and
`python tools/check_ages.py`.**

**Phase 4 — `/atelier`.** The page, the pipeline editor, the LNA permission flow,
Save to the bucket on an explicit press, and **the unreachable state**: when the
local service does not answer — because it is not started, or because you are on
a different machine — the page says exactly that and why, rather than failing
silently or looking broken. The `REQUIREMENTS.md` entry saying the page is
useless without the local service is written in this phase, because
`verify-requirements.mjs` refuses a proof naming a file that does not exist yet.
**Verify: a parallax sketch running on layers this tool cut, and the page read
with the service stopped.**

**Phase 5 — motion, without a video model.** Depth map → layer offsets → frames,
through the `Parallax` logic already in `@domain/generative`. **Verify: a painting
that moves and still reads as that painting.**

**Phase 6 — sketches from prompts.** Qwen2.5-Coder and the sandbox. **Verify: a
generated sketch that satisfies `Sketch`, runs in the iframe, and provably
cannot reach the network.**

Each phase bumps `package.json` and adds its `REQUIREMENTS.md` entries and
`CHANGELOG.md` line in the same commit, as the repo requires.

---

## 9. What I am least sure about

- ~~**Whether these models ground labels in a painting.**~~ **Answered by the
  Phase 2 spike: they do, for figures and objects.** See §8. What they do not do
  is diffuse regions, and the background is now derived rather than asked for.
- **Inpainting quality** on painted texture. Still untested, still the part I
  expect to need hand-finishing — and now the obvious candidate for the
  self-supervised fine-tune in §7.
- **Whether a box is precise enough for the layers you actually want.** The
  spike cut whole figures well. Whether "her sleeve" or "the shadow under the
  arm" can be had without the brush is unmeasured.
- **VRAM for the models still to come.** Measured for segmentation (1.8 GB
  peak); the inpainting and code models are still published figures.
- **Whether a hand-drawn mask is good enough to fine-tune on.** It is the
  fallback if text prompting disappoints, and it has never been tested here.

---

## 10. What was decided

Settled 2026-10-09.

| Question                        | Decision                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------ |
| Run the Phase 2 spike?          | **Yes.**                                                                                         |
| Where does the engine live?     | **`atelier-engine/` in this repo**, beside the site.                                             |
| The 40 GB MiniMax stack?        | **Not used by this project at all** — it stays for ComfyUI, separately.                          |
| Motion                          | **Depth parallax now; Wan 2.2 on hold**, so the effort goes to sketches from prompts instead.    |
| Can "my style" be switched off? | **Yes** — a LoRA is a separate file loaded at a strength, so it is a dial, not a switch. See §7. |
| The page with no local service  | **Says so, explicitly**, naming that the service is unreachable. Built and required in Phase 4.  |

### Dependencies

**npm, in the site: none.** Nothing new, now or planned.

**Python** — and the thirty-day rule now covers pip as well as pnpm, on the
artist's word. pip has no `minimumReleaseAge` setting, so every pin was checked
against PyPI by hand and carries its publication date in `requirements.txt`.

Installed for Phase 2, all verified at least thirty days old on 2026-10-09:

| Package        | Version      | Published  | Age      |
| -------------- | ------------ | ---------- | -------- |
| `torch`        | 2.14.0+cu130 | 2026-09-02 | 36 days  |
| `transformers` | 5.16.1       | 2026-08-26 | 43 days  |
| `pillow`       | 12.3.0       | 2026-07-01 | 99 days  |
| `numpy`        | 2.4.6        | 2026-05-18 | 143 days |

Four packages, not five: **`sam2` is not needed.** `facebook/sam2.1-hiera-small`
is published as a `transformers` model, so the library already in the tree loads
it — one supply chain instead of two, and no install from a git URL, which would
have skipped the age check entirely.

numpy is held at 2.4.x deliberately: 2.5 requires Python 3.12 and this machine
has 3.11. Nothing here needs 2.5.

Still to ask for, when their phase arrives: `fastapi` + `uvicorn` (Phase 3),
`accelerate` (when a model needs offloading), `llama-cpp-python` (Phase 6), and
`peft` + `datasets` (only if fine-tuning, §7). `diffusers` is no longer on the
list, because it was there for Wan 2.2.

---

## Appendix — the service API I propose

`http://127.0.0.1:7860`, ours, every call local:

| Endpoint                    | Use                                            |
| --------------------------- | ---------------------------------------------- |
| `GET /health`               | is it up, which models are resident, VRAM free |
| `GET /models`               | what is downloaded, what is missing            |
| `POST /graph`               | run a pipeline; returns a job id               |
| `GET /jobs/{id}/events`     | **SSE** progress — not a WebSocket, see §2     |
| `GET /jobs/{id}/result/{n}` | fetch an output                                |
| `POST /jobs/{id}/cancel`    | cancellation                                   |

`/health` reporting free VRAM is what lets the page say "close Chrome first"
instead of failing with an out-of-memory error ten minutes in.
