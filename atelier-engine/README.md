# atelier-engine

The local inference service behind `/atelier`. Python, runs on this machine
only, and nothing it does reaches a paid API.

It lives beside the site rather than in its own repository so that one clone
gets you both halves. It is not built, bundled or deployed with the site: the
site is static files on GitHub Pages, and this is a process you start when you
want to use the atelier.

## Why not ComfyUI

ComfyUI is installed on this machine and is a fine tool, but the atelier is not
built on it. The reasons, decided 2026-10-09:

- **Control.** We need perhaps eight operations. ComfyUI has 976 node types, of
  which **286 are billed cloud nodes** sitting in the same menus as the local
  ones, with near-identical names. Here there is no such node to emit by
  accident.
- **Licensing.** ComfyUI is GPL-3.0. Driving it over HTTP is almost certainly
  arm's-length and fine, but "almost certainly fine" is a thing to explain to a
  buyer one day. This has nothing to explain.
- **Simplicity.** A small thing that does the few jobs we need, that we can read
  end to end.

See `../docs/atelier-plan.md` for the feasibility assessment, the models and
why each was chosen.

## Setup

Python 3.11. From this folder:

```
py -3.11 -m venv .venv
.venv\Scripts\python -m pip install -r requirements.txt -c constraints.txt
```

**Both files, always.** `requirements.txt` pins what the engine imports;
`constraints.txt` pins what those drag in. Installing without the second gets
you a tree with packages published yesterday — see below.

LaMa is the one model not fetched automatically, because it is not a
`transformers` model:

```
curl -L -o models/lama/lama_fp32.onnx   https://huggingface.co/Carve/LaMa-ONNX/resolve/main/lama_fp32.onnx
```

## Running it

```
.venv\Scripts\python -m uvicorn engine.service:app --host 127.0.0.1 --port 7860
```

127.0.0.1 only. `GET /health` says whether there is room to run anything,
`POST /cut` takes an uploaded painting and one phrase per line, and `POST /evict`
hands the card back without stopping the service — this is also the machine he
works on.

## Tests

```
.venv\Scripts\python -m unittest discover -s tests -t .
```

Stdlib `unittest`, no test framework added. They run without a GPU or any
weights: the models are replaced with functions returning a fixed box and a
fixed rectangle, so what is tested is the policy and the service rather than
PyTorch.

`spike/isolate.py` and `spike/cut.py` are the manual checks that it really runs,
against a real painting.

The CUDA build of torch comes from the PyTorch index, not PyPI — the plain PyPI
wheel for Windows is CPU-only and would work silently and far too slowly.

## The thirty-day rule, and why there are two files

The site's pnpm refuses any version less than thirty days old
(`minimumReleaseAge: 43200`) **across the whole tree**. pip has no equivalent at
all, and pinning only what you import constrains none of what it drags in.

This is not theoretical. Asking for `fastapi` alone resolved `pydantic` and
`pydantic-core` published **the previous day**, and `starlette` at fifteen days;
`transformers` brought in a `tokenizers` published the same morning;
`onnxruntime` brought a `protobuf` three weeks old. Eleven packages in total,
none of them named anywhere.

So `constraints.txt` holds the rest of the tree back by hand, and:

```
.venv\Scripts\python tools\check_ages.py
```

looks up every installed package on PyPI and exits 1 if any is too young. Run it
after touching either file. Keep the list short, and prefer a model
`transformers` can already load over a model's own package — that is one supply
chain instead of two.

## Models

Weights are downloaded on first use into `models/`, which is not in git. Every
model here is **Apache 2.0 or MIT**, so there is no licence to re-read before
selling a painting the output appears beside.

| Job                 | Model                               | Licence    |
| ------------------- | ----------------------------------- | ---------- |
| Text → boxes        | `IDEA-Research/grounding-dino-base` | Apache 2.0 |
| Boxes/points → mask | `facebook/sam2.1-hiera-small`       | Apache 2.0 |
| Fill behind         | `Carve/LaMa-ONNX` (`lama_fp32`)     | Apache 2.0 |

LaMa is ONNX rather than TorchScript on purpose: an ONNX graph is data and
cannot run code when it is loaded. It also runs on the CPU, so filling in
competes for none of the 8 GB the segmenter needs.

## The hardware this is written for

An 8 GB laptop RTX 4060, compute 8.9. Two consequences shape everything:

- **FP8 is native, NVFP4 is not.** Prefer FP8.
- **The budget is about 7.4 GB, and only with the browser and editor closed.**
  Measured with them open, 847 MiB was free. So: exactly one model resident at a
  time, loaded on demand and evicted before the next.
