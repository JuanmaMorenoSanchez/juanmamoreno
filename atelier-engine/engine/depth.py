"""
How far away each part of a painting is.

Depth Anything V2 Small: 24.8M parameters, about 100 MB, and the **only**
variant of the four that is Apache 2.0 — Base, Large and Giant are CC BY-NC
4.0 and cannot be used beside paintings that are for sale. The smallest being
the only usable one is lucky rather than clever.

This is what moves a painting without a video model. A depth map plus the
`Parallax` logic already in `@domain/generative` gives motion that is faithful
by construction: it can only move pixels that were painted, so it cannot
resolve a brushstroke into a photograph the way an image-to-video model does.
A 100 MB model and a second of work, against 12 GB and eighteen minutes.
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

import numpy as np
from PIL import Image

from .registry import Built, ModelSpec

REPO = "depth-anything/Depth-Anything-V2-Small-hf"
MODELS = Path(__file__).resolve().parent.parent / "models"


def _build(repo: str, cache_dir: Path, device: str) -> Built:
    from transformers import AutoImageProcessor, AutoModelForDepthEstimation

    processor = AutoImageProcessor.from_pretrained(repo, cache_dir=cache_dir)
    model = AutoModelForDepthEstimation.from_pretrained(repo, cache_dir=cache_dir).to(device)
    model.eval()
    return processor, model


DEPTH = ModelSpec(key="depth-anything-small", repo=REPO, licence="Apache-2.0", build=_build)


def measure(registry: Any, painting: Image.Image) -> np.ndarray:
    """A depth map the size of the painting, 0 far to 1 near.

    Normalised per painting rather than against any absolute scale. The model
    gives relative depth and nothing else, and a canvas has no true distances
    in it to be relative to — what matters is that the near things move more
    than the far ones.
    """
    import torch

    processor, model = registry.get(DEPTH)
    inputs = processor(images=painting, return_tensors="pt").to(registry.device)
    with torch.no_grad():
        predicted = model(**inputs).predicted_depth

    # Back to the painting's own size: the model works at its own resolution
    # and a map that does not line up with the canvas is worse than none.
    depth = torch.nn.functional.interpolate(
        predicted.unsqueeze(1),
        size=(painting.height, painting.width),
        mode="bicubic",
        align_corners=False,
    )[0, 0]

    depth = depth.detach().cpu().numpy().astype(np.float32)
    low, high = float(depth.min()), float(depth.max())
    if high - low < 1e-6:
        # A flat answer. Rare, and better returned as flat than as noise
        # amplified to fill the range.
        return np.zeros_like(depth)
    return (depth - low) / (high - low)


def as_image(depth: np.ndarray) -> Image.Image:
    """The map as a greyscale picture: white is near, black is far."""
    return Image.fromarray((np.clip(depth, 0, 1) * 255).astype(np.uint8), mode="L")
