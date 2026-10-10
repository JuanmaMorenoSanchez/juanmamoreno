"""
One run at a time, watchable and stoppable.

The service answered synchronously while a graph took twenty seconds, which was
the right shape then and stopped being right when **Edit** arrived at eighteen
minutes. A request that long shows a spinner and offers no way out, and if the
browser gives up on it the work carries on unwatched.

So a run goes in a thread and the page asks after it.

**Asked after, not pushed.** The obvious choice is server-sent events, and it
does not work here: `EventSource` cannot carry `targetAddressSpace`, the
annotation Chrome needs before a page may reach this machine at all — the same
reason a WebSocket was ruled out. Streaming through `fetch` would work, but a
step takes about a hundred seconds, so polling once a second is already far
finer than anything worth watching.

**Cancellation is between steps, not within them.** The flag is checked between
nodes, and between the denoising steps of an edit. A single step of a 20B model
is not interruptible, so stopping takes effect within about a step — a hundred
seconds in the worst case, and immediately in every cheaper node.
"""

from __future__ import annotations

import threading
import time
import traceback
import uuid
from dataclasses import dataclass, field
from typing import Any, Callable


from .nodes import StoppedEarly

@dataclass
class Job:
    """What a run is doing, as the page needs to see it."""

    id: str
    state: str = "running"
    """`running`, `done`, `failed` or `cancelled`."""

    node: str | None = None
    """Which box is being worked on."""
    done_nodes: int = 0
    total_nodes: int = 0

    step: int = 0
    """Where a long node has got to — the denoising step of an edit."""
    steps: int = 0

    note: str | None = None
    """What is going on when there is nothing countable to report.

    An edit spends about four minutes building its pipeline before the first
    step: twelve gigabytes of weights written out to disk so they can be
    streamed back a block at a time. Four minutes of "step 0 of 0" is
    indistinguishable from a hang, which is the thing this whole arrangement
    exists to prevent."""

    started: float = field(default_factory=time.monotonic)
    finished: float | None = None
    result: dict[str, Any] | None = None
    detail: str | None = None
    """Why it failed, in words meant for a person."""
    status: int = 500
    """What the failure should have been, had it been answered directly."""

    _stop: threading.Event = field(default_factory=threading.Event)

    @property
    def seconds(self) -> float:
        return round((self.finished or time.monotonic()) - self.started, 1)

    def published(self) -> dict[str, Any]:
        return {
            "job": self.id,
            "state": self.state,
            "node": self.node,
            "done_nodes": self.done_nodes,
            "total_nodes": self.total_nodes,
            "step": self.step,
            "steps": self.steps,
            "note": self.note,
            "seconds": self.seconds,
            "result": self.result,
            "detail": self.detail,
        }


class Runner:
    """Holds the one job there can be, and the last one for its result.

    Deliberately not a queue. There is one graphics card, a run has it
    entirely, and a queue would only be a list of things that cannot start —
    better to refuse a second run and say why than to accept it and be silent.
    """

    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._current: Job | None = None
        self._last: Job | None = None

    @property
    def working(self) -> bool:
        with self._lock:
            return self._current is not None and self._current.state == "running"

    @property
    def current(self) -> str | None:
        """The run in progress, so a reloaded page can pick it up again.

        Without this a refresh — or a second tab — loses sight of a run that
        is still going, and the only way to get the card back is to kill the
        engine. The work is on this machine; forgetting about it is the page's
        failing, not the engine's.
        """
        with self._lock:
            if self._current is not None and self._current.state == "running":
                return self._current.id
        return None

    def find(self, job_id: str) -> Job | None:
        with self._lock:
            for job in (self._current, self._last):
                if job is not None and job.id == job_id:
                    return job
        return None

    def start(self, work: Callable[[Job], dict[str, Any]]) -> Job:
        """Begins a run, or refuses because one is already going."""
        with self._lock:
            if self._current is not None and self._current.state == "running":
                raise RuntimeError("something is already running")
            job = Job(id=uuid.uuid4().hex[:8])
            self._current = job

        def carry_on() -> None:
            try:
                job.result = work(job)
                job.state = "done"
                # The watcher is told before each box starts, so the last thing
                # it reported was the final box beginning — leaving a finished
                # run reading 4 of 5, and a progress bar stuck at eighty
                # percent for ever.
                job.done_nodes = job.total_nodes
                job.step = job.steps
            except StoppedEarly:
                job.state = "cancelled"
                job.detail = "stopped"
            except Exception as exc:  # noqa: BLE001 — every failure is the page's to read
                job.state = "failed"
                job.detail = str(exc) or exc.__class__.__name__
                job.status = getattr(exc, "http_status", 500)
                # The page gets a sentence; the window keeps the whole thing,
                # because a traceback is the only way to fix the engine.
                traceback.print_exc()
            finally:
                job.finished = time.monotonic()
                with self._lock:
                    self._last = job
                    if self._current is job:
                        self._current = None

        threading.Thread(target=carry_on, daemon=True, name=f"atelier-{job.id}").start()
        return job

    def cancel(self, job_id: str) -> bool:
        job = self.find(job_id)
        if job is None or job.state != "running":
            return False
        job._stop.set()
        return True


def stopping(job: Job) -> bool:
    """Whether this run has been asked to stop."""
    return job._stop.is_set()


def give_up_if_stopped(job: Job) -> None:
    if stopping(job):
        raise StoppedEarly("stopped")
