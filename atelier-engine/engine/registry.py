"""
One model in VRAM at a time.

This is the whole trick that makes an 8 GB card enough. The models are small —
Grounding DINO is 700 MB, SAM 2.1 is 184 MB — but the budget is about 7 GB and
less with a browser open, so nothing is held that is not being used. A model is
loaded when asked for, and the one before it is dropped first.

The alternative, keeping everything resident, works right up until the day a
fourth model is added and then fails on the machine it was written for.
"""

from __future__ import annotations

import gc
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable

Built = tuple[Any, Any]
"""Whatever a model needs to be used: its processor and the model itself."""


@dataclass(frozen=True)
class ModelSpec:
    """How to get one model, named so it can be asked for again.

    `build` is passed in rather than hard-coded so the registry can be tested
    without a GPU or a gigabyte of weights: a test gives it a function that
    returns two sentinels and asserts on when they are dropped.
    """

    key: str
    repo: str
    licence: str
    build: Callable[[str, Path, str], Built]


class ModelRegistry:
    """Loads on demand, evicts before loading anything else.

    Not thread-safe on purpose. One GPU, one thing happening at a time; a lock
    here would hide a queue that belongs a level up, where it can be told to the
    person waiting.
    """

    def __init__(self, cache_dir: Path, device: str = "cpu") -> None:
        self.cache_dir = Path(cache_dir)
        self.device = device
        self._resident: str | None = None
        self._built: Built | None = None

    @property
    def resident(self) -> str | None:
        """The key of the model currently in memory, or None."""
        return self._resident

    def get(self, spec: ModelSpec) -> Built:
        """The model, loading it and dropping any other one first."""
        if self._resident == spec.key and self._built is not None:
            return self._built

        self.evict()
        self._built = spec.build(spec.repo, self.cache_dir, self.device)
        self._resident = spec.key
        return self._built

    def evict(self) -> None:
        """Drop whatever is resident. Safe to call when nothing is."""
        if self._built is None:
            self._resident = None
            return

        self._built = None
        self._resident = None
        gc.collect()
        self._release()

    def _release(self) -> None:
        """Hand the memory back to the driver.

        Split out so a test can run the whole registry without torch having to
        be importable, and so the one CUDA-specific line lives in one place.
        """
        try:
            import torch

            if torch.cuda.is_available():
                torch.cuda.empty_cache()
        except ImportError:  # pragma: no cover - torch is always present in use
            pass

    def vram(self) -> tuple[int, int] | None:
        """Free and total VRAM in MiB, or None when there is no CUDA device.

        Reported rather than enforced: the page shows it so a run that is about
        to fail for want of memory can be seen coming, which is better than an
        out-of-memory error ten minutes in.
        """
        try:
            import torch

            if not torch.cuda.is_available():
                return None
            free, total = torch.cuda.mem_get_info()
            return free // 2**20, total // 2**20
        except ImportError:  # pragma: no cover
            return None
