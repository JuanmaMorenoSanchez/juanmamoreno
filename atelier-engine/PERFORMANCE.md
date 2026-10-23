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
request:

| | |
|---|---|
| building the pipeline, and writing 28 GiB of spill | **162 s** |
| encoding the instruction and the negative prompt, and the first step | **254 s** |
| each step after that | **133 s** |
| decoding and returning | **30 s** |
| **a four-step draft** | **845 s — 14 minutes** |
| twenty steps, by the same arithmetic | **~49 minutes** |

The three steps measured 132.7, 133.0 and 133.4 seconds. It is not noisy.

## What a step is made of

**A step is two passes over the whole transformer, not one.** `true_cfg_scale`
above 1 with a negative prompt sets `do_true_cfg`, and the pipeline then calls
the transformer a second time on the negative prompt and takes the difference.
Guidance is therefore a cost dial as well as a look dial: at 1 a step is half
the work. This is now said in the note under the slider.

So 12.16 GiB has to reach the card twice per step. How fast it does that was
measured three ways, on the same 4 GiB of real spill files:

| how the bytes reach the card | rate | one pass over 12.16 GiB |
|---|---|---|
| `load_file(path, device="cuda")` — **what runs today** | 0.46 GiB/s | **26.6 s** |
| `load_file(path, device="cpu")` then a pageable copy | 1.08 GiB/s | 11.3 s |
| held pinned in host memory, copied on a side stream | **4.73 GiB/s** | **2.6 s** |

Two passes at 26.6 seconds is **53 of the 133 seconds**. The other 80 seconds
is the model computing, which for Q4_K_M means dequantising every block on
every pass as well — and because a group is onloaded, used once and dropped,
nothing dequantised is ever reused.

The disk is **not** the bottleneck. At 2.53 GiB/s a pass over the transformer
would be 4.8 seconds. The 0.46 GiB/s figure is what `safetensors` does when
asked to put a file straight onto the card: a synchronous per-tensor copy with
nothing overlapped.

---

## What was tried

### Pinned host memory instead of disk — ten times faster, and it does not fit

The measurement above says it plainly: the same bytes, pinned in host memory
and copied asynchronously, arrive **10.3× faster**. That is the fix. It was
implemented — drop `offload_to_disk_path`, add `use_stream=True` and
`record_stream=True` — and it failed on this machine:

```
CUDA error: out of memory
Returning 2 (CUDA_ERROR_OUT_OF_MEMORY) from cuMemHostAlloc
```

`cuMemHostAlloc`, not a VRAM allocation. Pinning 12.16 GiB means 12.16 GiB that
cannot be paged out, and by the time the transformer is set up the text encoder
has already been loaded; with the editor's own working set that is more than
this machine will lock. It failed after 167 seconds, in the setup, before a
step.

**What would make it work:** more system memory, or a text encoder that is not
sixteen gigabytes. A Q4 GGUF of Qwen2.5-VL-7B is about 4.5 GiB, which would
leave room — that is a model to download and a decision to take, not something
to do quietly.

### Four blocks per group instead of one — 3.5%, and 24 seconds worse to start

If 0.46 GiB/s were per-call overhead rather than bandwidth, bigger groups would
fix it. Measured: **128.1 s a step** against 132.7, and the spill write at
startup went from 162 s to 186 s. So it is bandwidth, the direct-to-card path
is simply slow, and the knob was put back to 1.

### Remembering the prompt — 252 seconds off every repeat

The 254 seconds before the first step is the text encoder running twice, once
for the instruction and once for the negative prompt. It ran again, in full, on
every run — and almost every run after the first asks the same question.
**Draft first** and then the same instruction at twenty steps is the same
prompt on the same picture; so is re-rolling the seed, and so is moving
guidance or how far.

`pipeline.encode_prompt` is now wrapped so that an answer is kept, keyed on the
prompt and on the bytes of the pictures — the encoder here sees the image, so
the picture is part of the question. Four are kept: an instruction and a
negative prompt for the current picture, and room for the pair before it.

### Handing the card back — a bug, not a speed-up

The engine had been up since 09:46 holding **6,525 MiB of VRAM** with `/health`
reporting nothing resident, and `/evict` would not free it. The next edit spent
**218 seconds preparing and then died** of `CUDA error: out of memory`.

The registry can drop what it built; the editor and the clip pipeline are each
held by an `lru_cache` of their own and were never told. They have a `forget()`
now and `/evict` calls both, then asks the driver for the memory back.

---

## Why ComfyUI is faster on the same card

Four mechanisms. The first three are measured above; the fourth is read from
how ComfyUI is built, not timed here.

1. **It never offloads to disk.** Its low-VRAM path holds weights in host
   memory and copies them pinned and asynchronously. That is the 0.46 → 4.73
   GiB/s in the table. It gets away with it where we did not because it is not
   also holding a sixteen-gigabyte bf16 text encoder.
2. **It keeps what fits resident.** ComfyUI measures free VRAM and loads as
   many blocks as will stay, streaming only the remainder. There are ~6.9 GiB
   free on this card against 12.16 GiB of model, so a little over half of it
   would never cross the bus at all — and a resident block's dequantised
   weights are reused instead of being recomputed every pass. `diffusers`'
   `apply_group_offloading` has no equivalent: every group is onloaded, used
   once, and dropped, which is the 80 seconds a step that is not transfer.
3. **It does not re-encode what has not changed.** Its graph caches each node's
   output, so changing only the seed re-runs only the sampler. That is what the
   prompt cache above borrows.
4. **Its GGUF support dequantises in its own kernels** rather than through
   `diffusers`' per-tensor Python path. Not measured here; it is the most
   likely home of the remaining 80 seconds a step, and the thing to measure
   next.

**What is left, in the order worth doing it:**

- Measure where the 80 seconds a step actually goes — dequantisation against
  arithmetic. Everything below depends on the answer.
- A quantised text encoder (~4.5 GiB instead of 16.58), which both removes 252
  seconds from a cold run and makes the pinned-memory path fit. Needs a
  download and a decision.
- Partial residency, by hand: keep what fits on the card and offload the rest.
  Worth perhaps another 2× on the transfer and some of the dequantisation,
  and it is the one change here that `diffusers` will not do for us.

**A note on the spill.** `diffusers` replaces an offloaded tensor with
`torch.empty_like(tensor, device="cpu")`, which commits the same number of
bytes it just freed. Measured: 41.9 GiB committed against a 76.66 GiB commit
limit, with 6.4 GiB of it resident. It costs nothing in speed — the pages are
never touched — but it is why Task Manager shows this process holding forty
gigabytes it is not using.
