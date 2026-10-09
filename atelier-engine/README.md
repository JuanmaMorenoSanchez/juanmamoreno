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
.venv\Scripts\python -m pip install -r requirements.txt
```

The CUDA build of torch comes from the PyTorch index, not PyPI — the plain PyPI
wheel for Windows is CPU-only and would work silently and far too slowly.

**Dependencies follow the site's rule: nothing newer than thirty days.** pip has
no setting for this, so every pin in `requirements.txt` was checked against PyPI
by hand and carries the date it was published. Keep the list short, and prefer a
model `transformers` can already load over a model's own package.

## Models

Weights are downloaded on first use into `models/`, which is not in git. Every
model here is **Apache 2.0 or MIT**, so there is no licence to re-read before
selling a painting the output appears beside.

| Job                 | Model                               | Licence    |
| ------------------- | ----------------------------------- | ---------- |
| Text → boxes        | `IDEA-Research/grounding-dino-base` | Apache 2.0 |
| Boxes/points → mask | `facebook/sam2.1-hiera-small`       | Apache 2.0 |

## The hardware this is written for

An 8 GB laptop RTX 4060, compute 8.9. Two consequences shape everything:

- **FP8 is native, NVFP4 is not.** Prefer FP8.
- **The budget is about 7.4 GB, and only with the browser and editor closed.**
  Measured with them open, 847 MiB was free. So: exactly one model resident at a
  time, loaded on demand and evicted before the next.
