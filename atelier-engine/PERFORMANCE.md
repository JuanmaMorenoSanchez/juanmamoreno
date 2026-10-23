# Where an edit's time goes

Measured on this machine, 23 October 2026, so that the next person to ask "why
is it so slow" has numbers instead of a guess. Everything here was timed, not
reasoned about; where something is reasoning rather than measurement it says so.

**The machine.** RTX 4060 Laptop, 8,187 MiB of VRAM. 31.6 GiB of system memory.
One NVMe disk, measured at **2.53 GiB/s** sequential read.

**The model.** Qwen-Image-Edit-2509, 20B, at Q4_K_M: **12.16 GiB** of transformer
in 61 offload groups, one block each. Its text encoder is Qwen2.5-VL at bf16,
**16.58 GiB**. Neither fits in 8 GiB, so both are streamed.

---

## The shape of a run

A four-step edit of a 768×768 picture, through the service, timed from the
request. Both columns are cold — a fresh process, an empty spill:

| | before | after |
|---|---|---|
| building the pipeline and writing the spill | 162.4 s | **82.9 s** |
| encoding the instruction and the negative prompt, and the first step | 253.9 s | **73.0 s** |
| each step after that | 132.7 / 133.0 / 133.4 s | **34.0 / 32.8 / 33.4 s** |
| **the whole four-step draft** | **845 s — 14 minutes** | **257 s — 4¼ minutes** |
| twenty steps, by the same arithmetic | ~49 minutes | **~13 minutes** |

It is not noisy: three consecutive steps within 1.2 seconds of each other in
both columns.

## What was wrong: one sixteen-gigabyte group, found by accident

`apply_group_offloading` decides what a block is by walking `named_children()`
**one level deep** and taking whatever is a `ModuleList`. The transformer keeps
its blocks right there, so it was grouped correctly, 61 of them.

The text encoder does not. `Qwen2_5_VLForConditionalGeneration`'s children are
`model` and `lm_head`; the layers are two levels further in, under
`model.language_model.layers` and `model.visual.blocks`. So nothing matched,
everything fell into the group that holds what did not match, and **the whole
encoder was offloaded as a single 16.58 GiB file** — then loaded onto an 8 GiB
card in one call.

On Windows that does not fail. The driver oversubscribes into system memory, the
card is left with **0 MiB free** — caught in that state with `nvidia-smi` — and
the transformer's blocks spend the rest of the run in paged memory.

That is the whole gap, and it was found by accident rather than by inspection.
Three four-step runs against the same engine:

| run | prompt | encode + first step | each step after |
|---|---|---|---|
| cold | new | 221.7 s | 105.4 / 103.7 / 113.6 s |
| second | **already known** | 75.2 s | 40.1 / 34.0 / **33.5 s** |
| third | new again | 159.7 s | 107.4 / 106.0 / 106.9 s |

A step is 34 seconds when the encoder does not run and 105 when it does. It was
not only costing its own four minutes; it was **adding about seventy seconds to
every step of the run that followed it**.

**The fix is `offload_type="leaf_level"` for the encoder.** Naming the models in
between — `block_modules=["model", "language_model", "visual"]` — does find the
lists, 63 groups instead of 1, and prepare drops to 102 s, but it fails
differently: the outer model reaches `embed_tokens` without going through
`language_model.forward`, so the ids are on the card and the embedding is not
(*Expected all tensors to be on the same device*). At leaf level there is no
such gap, because every `Linear` and every `Embedding` carries its own hook and
fetches itself when it is called. It synchronises more, which would matter for
something that runs forty times a generation and does not for something that
runs twice.

## What a step is made of

**A step is two passes over the whole transformer, not one.** `true_cfg_scale`
above 1 with a negative prompt sets `do_true_cfg`, and the pipeline then calls
the transformer a second time on the negative prompt and takes the difference.
Guidance is therefore a cost dial as well as a look dial: **at 1 a step is half
the work**. This is now said in the note under the slider.

So 12.16 GiB has to reach the card twice per step. How fast it does that was
measured three ways, on the same 4 GiB of real spill files:

| how the bytes reach the card | rate | one pass over 12.16 GiB |
|---|---|---|
| `load_file(path, device="cuda")` — **what runs today** | 0.46 GiB/s | **26.6 s** |
| `load_file(path, device="cpu")` then a pageable copy | 1.08 GiB/s | 11.3 s |
| held pinned in host memory, copied on a side stream | **4.73 GiB/s** | **2.6 s** |

The disk is **not** the bottleneck. At 2.53 GiB/s a pass over the transformer
would be 4.8 seconds. The 0.46 GiB/s figure is what `safetensors` does when
asked to put a file straight onto the card: a synchronous per-tensor copy with
nothing overlapped. Measured in isolation that is 53 seconds of a step — more
than a 33-second step contains, which means the figure is pessimistic in situ:
with the card no longer oversubscribed, some of it overlaps with compute.

---

## What else was tried

### Pinned host memory instead of disk — ten times faster, and it does not fit

The same bytes, pinned in host memory and copied asynchronously, arrive
**10.3× faster**. It was implemented — drop `offload_to_disk_path`, add
`use_stream=True` and `record_stream=True` — and failed:

```
CUDA error: out of memory
Returning 2 (CUDA_ERROR_OUT_OF_MEMORY) from cuMemHostAlloc
```

`cuMemHostAlloc`, not a VRAM allocation. Pinning 12.16 GiB means 12.16 GiB that
cannot be paged out, and by the time the transformer is set up the text encoder
has already been loaded. It failed after 167 seconds, in the setup, before a
step.

**What would make it work:** more system memory, or a text encoder that is not
sixteen gigabytes. A Q4 GGUF of Qwen2.5-VL-7B is about 4.5 GiB, which would
leave room — that is a model to download and a decision to take.

### A quarter of the pixels — 21%, which is neither nothing nor the prize

`draft.py` said for a while that fewer pixels saved nothing, reasoning from a
step of 54 seconds of which 50 was the model arriving. The step was never 54
seconds. With the encoder fixed it is **33.4 seconds**, so the question was
open again: the pipeline works at about a megapixel whatever it is handed, and
`height`/`width` were never passed.

Measured, same four steps and the same already-known prompt, at a quarter of
the pixels: **26.3 s a step against 33.4 — 21% off**, and the four-step run
106.5 s against 257. So the pixels are not a rounding error and they are not
the prize either; what a step mostly costs is 12.16 GiB arriving twice and
dequantising on the way through, and neither cares how big the picture is.

Kept, because a fifth is a fifth and a low-resolution preview is what was
asked for. The cost is that a model given less canvas composes a little
differently, so a draft is now a promise about the idea rather than about the
picture — which the note under the switch says.

### Four blocks per group instead of one — 3.5%, and 24 seconds worse to start

If 0.46 GiB/s were per-call overhead rather than bandwidth, bigger groups would
fix it. Measured: **128.1 s a step** against 132.7, and the spill write at
startup went from 162 s to 186 s. So it is bandwidth, and the knob was put
back to 1.

### Remembering the prompt — 149 seconds, and it was hiding the real bug

The text encoder ran twice on every run, in full, and almost every run after
the first asks it the same question. **Draft first** and then the same
instruction at twenty steps is the same prompt on the same picture; so is
re-rolling the seed, and so is moving guidance or how far.

`pipeline.encode_prompt` is now wrapped so the answer is kept, keyed on the
prompt and on the bytes of the pictures — this encoder sees the image, so the
picture is part of the question. Four are kept: an instruction and a negative
prompt for the current picture, and room for the pair before it. Measured:
the first step arrives at 75 s instead of 222.

It is also what exposed the group above. A run that skipped the encoder had
34-second steps, which should have been impossible if the encoder only cost its
own time.

### Handing the card back — a bug, not a speed-up

Two twelve-gigabyte pipelines, one eight-gigabyte card, each held by an
`lru_cache` the registry knows nothing about, and **neither ever dropped the
other**. The engine had been up since 09:46 holding **6,525 MiB of VRAM** with
`/health` reporting nothing resident; `/evict` would not free it; and the next
edit spent **218 seconds preparing and then died** of `CUDA error: out of
memory`.

Both have a `forget()` now. `/evict` calls both, and every box that wants the
card says which pipeline it is about to use and clears the rest off. The
driver is asked for the memory back only when something was actually dropped,
because emptying the allocator's cache also returns every warm block in it.

---

## Why ComfyUI is faster on the same card

Most of the gap was the sixteen-gigabyte group, which is this repository's bug
and not ComfyUI being clever. What is left:

1. **It keeps what fits resident.** ComfyUI measures free VRAM and loads as
   many blocks as will stay, streaming only the remainder. There are ~6.9 GiB
   free on this card against 12.16 GiB of model, so a little over half of it
   would never cross the bus — and a resident block's dequantised weights are
   reused instead of being recomputed every pass. `apply_group_offloading` has
   no equivalent: every group is onloaded, used once, and dropped.
2. **It never offloads to disk.** Its low-VRAM path holds weights in host
   memory and copies them pinned and asynchronously — the 0.46 → 4.73 GiB/s in
   the table. It gets away with it where we did not because it is not also
   holding a sixteen-gigabyte bf16 text encoder.
3. **It does not re-encode what has not changed.** Its graph caches each node's
   output, so changing only the seed re-runs only the sampler. That is what the
   prompt cache above borrows.
4. **Its GGUF support dequantises in its own kernels** rather than through
   `diffusers`' per-tensor Python path. Not measured here.

**What is left, in the order worth doing it:**

- A quantised text encoder (~4.5 GiB instead of 16.58), which would take most
  of the remaining 83 seconds off a cold start **and** make the pinned-memory
  path fit, which is the 10× one. Needs a download and a decision.
- Partial residency, by hand: keep what fits on the card and offload the rest.
  The one change here that `diffusers` will not do for us.

**A note on the spill.** `diffusers` replaces an offloaded tensor with
`torch.empty_like(tensor, device="cpu")`, which commits the same number of
bytes it just freed. Measured: 41.9 GiB committed against a 76.66 GiB commit
limit, with 6.4 GiB of it resident. It costs nothing in speed — the pages are
never touched — but it is why Task Manager shows this process holding forty
gigabytes it is not using.
