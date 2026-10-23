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

| | before | the 16 GiB group fixed | kept on the card | and pinned |
|---|---|---|---|---|
| each step | 132.7 / 133.0 / 133.4 s | 34.0 / 32.8 / 33.4 s | 27.3 … 28.3 s | **23.7 / 23.8 / 23.7 s** |
| to the first step | 416 s | 156 s | 162 s | **147 s** |
| **a four-step run** | **845 s — 14 minutes** | 257 s | — | **231 s** |
| twenty steps, by the same arithmetic | ~49 minutes | ~13 minutes | ~11½ minutes | **~10 minutes** |

**133 seconds a step to 23.7 — 5.6×**, and about 4.9× over a whole twenty-step
run. It is not noisy: consecutive steps inside a tenth of a second of each
other in the last column.

**And the picture does not change.** Every one of those columns renders the
same four steps at the same seed to **the same file, byte for byte** — mean
absolute difference 0.00, largest difference 0. That is the only check worth
making on a change that is meant to alter nothing, and the one that caught the
empty blocks below.

A draft takes four of those steps at a quarter of the pixels, so the four-step
draft that was fourteen minutes is now a little over a minute and a half of
stepping.

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

### Pinned host memory instead of disk — 15%, once it was done their way

The same bytes, pinned in host memory and copied asynchronously, arrive
**10.3× faster**. Asking `diffusers` for it — drop `offload_to_disk_path`, add
`use_stream=True` and `record_stream=True` — failed:

```
CUDA error: out of memory
Returning 2 (CUDA_ERROR_OUT_OF_MEMORY) from cuMemHostAlloc
```

`cuMemHostAlloc`, not a VRAM allocation. With `low_cpu_mem_usage=False`,
`_init_cpu_param_dict` pins the **entire model in one call** during setup, and
12.16 GiB of locked pages — under ComfyUI's 12.65 GiB ceiling, but with the
text encoder still in memory — is more than the system will give.

**ComfyUI pins per weight against a budget and evicts when it is full**, which
is why they never hit it, and doing the same works here:

- `low_cpu_mem_usage=True`, so `enable_group_offload` pins nothing at setup;
- the blocks that fit go on the card first, which frees their host copies;
- what is left is pinned one tensor at a time against `min(ram * 0.40,
  free - 1 GiB)`, handing each pinned copy to the hook *and* to the parameter
  as it goes, so the unpinned original is released on the spot — done the
  other way the peak is twice the model;
- anything the system refuses stops the loop rather than failing the run.

Measured: **21 blocks on the card and 6.4 of the remaining 7.8 GiB pinned**,
and a step of **23.7 s against 27.8**. The output is identical to the byte.

There is no transformer spill any more either, so startup writes only the
encoder.

**One trap, and it cost a run to find.** With a stream, `enable_group_offload`
puts an execution tracker on every block to learn the order they run in, and
after the first forward walks the blocks that ran and reads each one's offload
hook. A block made resident has had that hook removed, so it gives
`'NoneType' object has no attribute 'group'` — two and a half minutes into the
run. The tracker has to come off with it.

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

### Keeping on the card whatever fits — 17%, and the end of the streaming-everything design

`apply_group_offloading` treats every group alike: onloaded when its turn
comes, dropped the moment it is done, fetched again next step. Sixty blocks,
twelve gigabytes, twice a step, forever — while five gigabytes of the card sat
empty, because keeping anything was never part of the design.

ComfyUI's arithmetic is `free_vram - minimum_required`, and theirs is copied
here: 0.8 GiB plus the 600 MiB they reserve on Windows, plus 1.1 GiB more for
the text encoder they do not have to carry (its widest leaf is `lm_head`, a
3,584 × 152,064 matrix). On this machine that keeps **22 of the 60 blocks**,
so 37% of the model stops crossing the bus.

Measured on eight steps: **27.8 s a step against 33.4 — 17% off**, which is
about what a third of the model should buy if arrival is roughly half a step.
Setting it up costs about 13 seconds at build.

**A block has to be fetched before it can be kept, and getting that wrong is
invisible in a timing.** `GroupOffloadingHook.initialize_hook` calls
`group.offload_()` the moment the hook is registered — not on the first
forward — and offloading to disk writes the weights out and then replaces them
with `torch.empty_like`. The first version of this moved *those* to the card
and removed the hook, giving a model whose first twenty-two blocks were nothing
at all. The blocks still ran, so the step time was the same 27.8 seconds, and
the 17% was reported and released before anybody looked at a picture. It is
onloaded through the group's own code path first now.

The way to check is not to look. **The same four steps with the same seed,
once keeping 22 blocks and once keeping none, produce files that are identical
to the byte** — 27.8 seconds a step against 33.0. That is the only
comparison worth making about a change that is meant to alter nothing.

### Reusing a step — 40× on a step it skips, and it skips almost none

`FirstBlockCache`, which `diffusers` supports for `QwenImageTransformerBlock`:
run the first of the sixty blocks, compare what it changed with what it changed
last step, and if the difference is under a threshold skip the other
fifty-nine and reuse last step's residual. The saving is not the arithmetic —
it is that **a skipped block's offload hook never fires**, so it never crosses
the bus. That holds by luck rather than design: `HookRegistry` wraps the
current forward each time, so the hook registered last is outermost, and the
cache is applied per run while group offloading is applied at build.

Measured over eight steps, same seed, same prompt:

| threshold | a step | steps skipped |
|---|---|---|
| 0 (off) | 33.0–33.5 s | 0 of 7 |
| 0.10 | 33.3–33.6 s | **0 of 7** |
| 0.20 | 0.8 s or 33.9 s | 1 of 7 |

So a skipped step costs **0.8 seconds against 33.4**, and at the threshold
`diffusers` suggests nothing is skipped at all. Eight steps leave little to
reuse, because each is still changing the picture a great deal; the longer the
run the more there is. Exposed as a dial from 0 to 0.5 rather than guessed at,
off by default, because it is the only setting here that changes the picture
without being asked to.

### The asynchronous allocator — nothing, measurably

ComfyUI runs on `cudaMallocAsync`, logged as `Device: cuda:0 ... :
cudaMallocAsync`, and the reason to want it is the churn: a step onloads
thirty-eight blocks and drops them again, twice over, and the default allocator
serialises on `cudaFree`.

Measured with `PYTORCH_CUDA_ALLOC_CONF=backend:cudaMallocAsync`: **27.8 s a
step, against 27.8 without**. Build was 87 s against 96, which is inside the
run-to-run spread. Reverted — a non-default allocator has its own semantics
around `empty_cache`, and there is nothing here to pay for them with.

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

Read out of his own install — Comfy Desktop, ComfyUI **0.39.2**, at
`%LOCALAPPDATA%/Comfy-Desktop/ComfyUI-Installs/Mi Entorno/ComfyUI` — rather
than recalled. Its log confirms the same machine: `Total VRAM 8188 MB, total
RAM 32407 MB`.

**Its constants, which are worth having because they were arrived at the hard
way:**

| | |
|---|---|
| VRAM held back for the run itself | `minimum_inference_memory()` = 0.8 GiB + `EXTRA_RESERVED_VRAM` |
| `EXTRA_RESERVED_VRAM` | 400 MiB, **600 on Windows** — their comment: *"Windows is higher because of the shared vram issue"* |
| weights kept resident | `free_vram - minimum_required`, in `load_models_gpu` |
| `MIN_WEIGHT_MEMORY_RATIO` | 0.4, but **0.0 on NVIDIA** — so on this card the whole remainder is kept |
| max pinned host memory | `ram * 0.40` — **12,962 MiB** on this machine, logged at startup; their comment: *"Windows limit is apparently 50%"* |
| pinning granularity | **per weight**, against that budget, with eviction (`pin_memory`, `ensure_pin_registerable`) |
| allocator | `cudaMallocAsync` |
| streaming | logged as `Using async weight offloading with 2 streams` |

Two of those are the direct explanation of a failure recorded above. The
all-or-nothing pin of 12.16 GiB came in just **under** their 12.65 GiB ceiling
and still failed, because they never pin a model in one call — they pin weight
by weight against a budget and evict when it is full. And the 600 MiB they
reserve on Windows *specifically* is a guard against the oversubscription that
the sixteen-gigabyte group walked straight into: they knew the cliff was there
and left a margin.

**His install also has `comfy-aimdo` 0.5.5**, which the log shows installing
six CUDA hooks (`cuda-detour.c`), enabling *NVML pressure*, and matching the
WDDM adapter (`shmem-detect.c`) before reporting `DynamicVRAM support detected
and enabled`. It is a native extension that watches how close the card is to
spilling into shared memory and moves weights out before the driver starts
paging. That is the oversubscription problem again, solved properly.

**The only honest number for the comparison** comes from the one 20-step run in
his log — `MiniMaxH3`, a different model and a different architecture, so this
is indicative and not exact:

| | model on the card | a step | per GiB of model, per step |
|---|---|---|---|
| his ComfyUI, MiniMaxH3 | 19,995 MiB staged | 26.0 s | **1.33 s** |
| here, before any of this | 12,160 MiB | 133 s | 11.0 s |
| here, now | 12,160 MiB | 27.8 s | **2.30 s** |

So "way faster" was, at the start, about eight times per byte of model. It is
now about **1.7×**, and the rest of the gap is the two rows of their table
this repository does not have: per-weight pinning against a budget, and two
streams to overlap the copy with the compute.

**What is left, in the order worth doing it:**

- **Per-weight pinning against a budget**, their way rather than all-or-nothing.
  The measured prize is 0.46 → 4.73 GiB/s on whatever gets pinned, and
  `ram * 0.40` says about 12.6 GiB is allowed. It is the largest remaining
  item and the one that failed when attempted wholesale.
- **A quantised text encoder** (~4.5 GiB instead of 16.58), which would take
  most of the 96-second cold start off and leave far more room for the above.
  Needs a download and a decision.
- **Their 2-stream overlap**, which `diffusers` offers as `use_stream=True` and
  which currently cannot be used because it insists on pinning.

**A note on the spill.** `diffusers` replaces an offloaded tensor with
`torch.empty_like(tensor, device="cpu")`, which commits the same number of
bytes it just freed. Measured: 41.9 GiB committed against a 76.66 GiB commit
limit, with 6.4 GiB of it resident. It costs nothing in speed — the pages are
never touched — but it is why Task Manager shows this process holding forty
gigabytes it is not using.
