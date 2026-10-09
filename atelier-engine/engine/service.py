"""
The atelier's local HTTP service.

Listens on 127.0.0.1 only. Nothing it does reaches the network: the painting is
uploaded to it by the page, the models are already on disk, and the layers come
back in the response. The only outbound traffic this process ever makes is
downloading a model the first time it is asked for.

**Synchronous on purpose, for now.** The plan sketches a job queue with progress
over SSE, and that is the right shape once something here takes minutes. Cutting
a 3000-pixel painting into three layers takes about twenty seconds, which a
request can simply wait for — and a job queue nothing is queueing is a thing to
maintain rather than a thing that helps. It goes in when the first slow
operation does.

Run:  .venv\\Scripts\\python -m uvicorn engine.service:app --host 127.0.0.1 --port 7860
"""

from __future__ import annotations

import io
import time
import uuid
from pathlib import Path

import numpy as np
from fastapi import FastAPI, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from PIL import Image

from .images import bounds, coverage, remainder, to_layer
from .inpaint import fill
from .operations import DINO, SAM, find, isolate
from .registry import ModelRegistry

HERE = Path(__file__).resolve().parent.parent
MODELS = HERE / "models"
OUT = HERE / "out"

# The deployed site and the dev server. Both are explicit: a wildcard here would
# let any page in any tab reach a service that can read this disk.
ALLOWED_ORIGINS = [
    "https://juanmamoreno.com",
    "https://www.juanmamoreno.com",
    "http://127.0.0.1:4201",
    "http://localhost:4201",
]

app = FastAPI(title="atelier-engine", docs_url=None, redoc_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.middleware("http")
async def allow_local_network(request, call_next):
    """Chrome gates a public page reaching a local address.

    Enforced since Chromium 142, and from Chrome 156 there is no opt-out left.
    The permission prompt does the real work; this header is what the preflight
    looks for, and it costs nothing to answer when the page is not asking.
    """
    response = await call_next(request)
    response.headers["Access-Control-Allow-Private-Network"] = "true"
    return response


registry = ModelRegistry(cache_dir=MODELS, device="cpu")


@app.on_event("startup")
def choose_device() -> None:
    import torch

    registry.device = "cuda" if torch.cuda.is_available() else "cpu"


def _read(upload: UploadFile) -> Image.Image:
    try:
        return Image.open(io.BytesIO(upload.file.read())).convert("RGB")
    except Exception as exc:  # noqa: BLE001 - any unreadable upload is the same answer
        raise HTTPException(status_code=400, detail="that file is not an image") from exc


@app.get("/health")
def health() -> JSONResponse:
    """Whether the engine is up, and whether there is room to run anything.

    The page shows the free figure so a run that is about to fail for want of
    memory can be seen coming, which beats an out-of-memory error ten minutes in.
    """
    vram = registry.vram()
    return JSONResponse(
        {
            "ok": True,
            "device": registry.device,
            "resident": registry.resident,
            "vram_free_mib": vram[0] if vram else None,
            "vram_total_mib": vram[1] if vram else None,
        }
    )


@app.get("/models")
def models() -> JSONResponse:
    """What the engine would use, and whether it has been downloaded yet."""
    def downloaded(repo: str) -> bool:
        slug = "models--" + repo.replace("/", "--")
        return (MODELS / slug).exists()

    return JSONResponse(
        {
            "models": [
                {
                    "key": spec.key,
                    "repo": spec.repo,
                    "licence": spec.licence,
                    "downloaded": downloaded(spec.repo),
                }
                for spec in (DINO, SAM)
            ]
        }
    )


@app.post("/find")
def find_things(image: UploadFile, phrase: str = Form(...)) -> JSONResponse:
    """Where in the painting the phrase might be, best first."""
    painting = _read(image)
    started = time.perf_counter()
    hits = find(registry, painting, phrase)
    return JSONResponse(
        {
            "phrase": phrase,
            "width": painting.width,
            "height": painting.height,
            "seconds": round(time.perf_counter() - started, 2),
            "found": [{"box": list(h.box), "score": round(h.score, 4)} for h in hits],
        }
    )


@app.post("/cut")
def cut(
    image: UploadFile, labels: str = Form(...), fill_behind: bool = Form(False)
) -> JSONResponse:
    """Name things, get layers, plus the background they were lifted off.

    `labels` is one phrase per line.

    **A layer coming back is not evidence the thing is in the painting.** Asked
    for "a unicorn" on a canvas with none, this returns the arms and the
    inverted head, scored 0.395 against 0.418 for "a girl" — so `not_found` only
    catches a label the model would not even guess at, and every score here has
    to be judged by eye. That is why the response carries the score, the iou and
    the coverage rather than a verdict: the page shows the cut, and he decides.
    """
    wanted = [line.strip() for line in labels.splitlines() if line.strip()]
    if not wanted:
        raise HTTPException(status_code=400, detail="name at least one thing to cut")

    painting = _read(image)
    batch = uuid.uuid4().hex[:8]
    OUT.mkdir(exist_ok=True)
    started = time.perf_counter()

    # Grounding DINO stays resident for every phrase, then SAM evicts it once.
    boxes = {}
    missed = []
    for phrase in wanted:
        hits = find(registry, painting, phrase)
        if hits:
            boxes[phrase] = hits[0]
        else:
            missed.append(phrase)

    cut_layers = []
    masks = []
    for phrase, hit in boxes.items():
        mask, iou = isolate(registry, painting, box=hit.box)
        if bounds(mask) is None:
            missed.append(phrase)
            continue
        name = f"{batch}-{phrase.replace(' ', '-')}.png"
        to_layer(painting, mask).save(OUT / name)
        masks.append(mask)
        cut_layers.append(
            {
                "label": phrase,
                "file": name,
                "score": round(hit.score, 4),
                "iou": round(iou, 4),
                "coverage": round(coverage(mask), 4),
            }
        )

    background = None
    if masks:
        back = remainder(masks)
        name = f"{batch}-background.png"
        to_layer(painting, back).save(OUT / name)
        background = {"file": name, "coverage": round(coverage(back), 4)}

        if fill_behind:
            # The back plate for a parallax: the whole canvas, opaque, with
            # everything that was lifted out painted over. Separate from the
            # transparent remainder above, which is the same thing with holes.
            holes = np.zeros_like(masks[0], dtype=bool)
            for mask in masks:
                holes |= mask
            filled_name = f"{batch}-background-filled.png"
            fill(painting, holes).save(OUT / filled_name)
            background["filled"] = filled_name

    return JSONResponse(
        {
            "batch": batch,
            "seconds": round(time.perf_counter() - started, 2),
            "layers": cut_layers,
            "background": background,
            # Named, not hidden. This is the thing worth knowing.
            "not_found": missed,
        }
    )


@app.get("/layer/{name}")
def layer(name: str) -> FileResponse:
    """One cut layer, by the name /cut gave it."""
    # Resolved and checked rather than joined: a name is not a path, and this
    # process can read the whole disk.
    path = (OUT / name).resolve()
    if path.parent != OUT.resolve() or not path.is_file():
        raise HTTPException(status_code=404, detail="no such layer")
    return FileResponse(path, media_type="image/png")


@app.post("/evict")
def evict() -> JSONResponse:
    """Hand the card back, without stopping the service.

    Here because the machine that runs this is also the machine he works on, and
    a model sitting in VRAM between sessions is two gigabytes he cannot use.
    """
    registry.evict()
    vram = registry.vram()
    return JSONResponse({"resident": None, "vram_free_mib": vram[0] if vram else None})
