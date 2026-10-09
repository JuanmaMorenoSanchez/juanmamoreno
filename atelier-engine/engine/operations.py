"""
The few things the atelier actually does.

Each one is a function, not a node type. The node editor is a way of arranging
these from a page; the engine does not know it exists, which is what lets it be
tested without one.
"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any

import numpy as np
from PIL import Image

from .registry import Built, ModelRegistry, ModelSpec


def _build_dino(repo: str, cache_dir: Path, device: str) -> Built:
    from transformers import GroundingDinoForObjectDetection, GroundingDinoProcessor

    processor = GroundingDinoProcessor.from_pretrained(repo, cache_dir=cache_dir)
    model = GroundingDinoForObjectDetection.from_pretrained(repo, cache_dir=cache_dir).to(device)
    model.eval()
    return processor, model


def _build_sam(repo: str, cache_dir: Path, device: str) -> Built:
    from transformers import Sam2Model, Sam2Processor

    processor = Sam2Processor.from_pretrained(repo, cache_dir=cache_dir)
    model = Sam2Model.from_pretrained(repo, cache_dir=cache_dir).to(device)
    model.eval()
    return processor, model


DINO = ModelSpec(
    key="grounding-dino",
    repo="IDEA-Research/grounding-dino-base",
    licence="Apache-2.0",
    build=_build_dino,
)

SAM = ModelSpec(
    key="sam2.1-small",
    repo="facebook/sam2.1-hiera-small",
    licence="Apache-2.0",
    build=_build_sam,
)


@dataclass(frozen=True)
class Found:
    """One thing the model says it has located."""

    label: str
    box: tuple[float, float, float, float]
    score: float


def find(
    registry: ModelRegistry,
    painting: Image.Image,
    phrase: str,
    threshold: float = 0.25,
    limit: int = 8,
) -> list[Found]:
    """Where in the painting the phrase might be, best first.

    One phrase per call. Grounding DINO will take several at once, but a score
    per label is what the page needs in order to say which word it understood
    and which it guessed at — and the previous attempt at this failed largely
    because several things asked for together came back tangled.
    """
    import torch

    processor, model = registry.get(DINO)
    # It wants lower case ending in a full stop; anything else quietly scores worse.
    text = phrase.strip().lower().rstrip(".") + "."

    inputs = processor(images=painting, text=text, return_tensors="pt").to(registry.device)
    with torch.no_grad():
        outputs = model(**inputs)

    results = processor.post_process_grounded_object_detection(
        outputs,
        inputs.input_ids,
        threshold=threshold,
        text_threshold=threshold,
        target_sizes=[(painting.height, painting.width)],
    )[0]

    found = [
        Found(label=phrase, box=tuple(round(v, 1) for v in box.tolist()), score=float(score))
        for box, score in zip(results["boxes"], results["scores"])
    ]
    found.sort(key=lambda f: f.score, reverse=True)
    return found[:limit]


def isolate(
    registry: ModelRegistry,
    painting: Image.Image,
    box: tuple[float, float, float, float] | None = None,
    points: list[tuple[int, int]] | None = None,
    negative: list[tuple[int, int]] | None = None,
) -> tuple[np.ndarray, float]:
    """A mask and SAM's own confidence in it.

    Takes a box, or points, or both. Points are not a fallback for when the
    words fail — they are the better input whenever a word is ambiguous, and
    they are how a stroke drawn by hand enters the pipeline.
    """
    import torch

    if box is None and not points:
        raise ValueError("isolate needs a box or at least one point")

    processor, model = registry.get(SAM)

    kwargs: dict[str, Any] = {}
    if box is not None:
        kwargs["input_boxes"] = [[list(box)]]
    if points:
        marks = list(points) + list(negative or [])
        labels = [1] * len(points) + [0] * len(negative or [])
        kwargs["input_points"] = [[[list(p) for p in marks]]]
        kwargs["input_labels"] = [[labels]]

    inputs = processor(images=painting, return_tensors="pt", **kwargs).to(registry.device)
    with torch.no_grad():
        outputs = model(**inputs, multimask_output=True)

    # Three candidates per prompt; SAM's own estimate picks which to keep.
    best = int(outputs.iou_scores[0, 0].argmax())
    masks = processor.post_process_masks(
        outputs.pred_masks.cpu(), inputs["original_sizes"].cpu()
    )
    mask = masks[0][0][best].numpy().astype(bool)
    return mask, float(outputs.iou_scores[0, 0, best])
