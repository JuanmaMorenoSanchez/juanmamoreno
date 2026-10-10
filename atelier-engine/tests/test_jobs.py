"""
One run at a time, watchable and stoppable.

Tested with work that sleeps rather than work that paints, so what is proved is
the arrangement — that a run reports where it is, that it can be told to stop,
that a second one is refused rather than queued — and not PyTorch.
"""

import threading
import time
import unittest

from engine.jobs import Runner, stopping
from engine.nodes import StoppedEarly


def waits(seconds: float = 0.05):
    def work(job):
        time.sleep(seconds)
        return {"ok": True}

    return work


class RunnerTest(unittest.TestCase):
    def setUp(self) -> None:
        self.runs = Runner()

    def settle(self, job, limit: float = 3.0) -> None:
        deadline = time.monotonic() + limit
        while job.state == "running" and time.monotonic() < deadline:
            time.sleep(0.01)

    def test_a_run_answers_before_it_has_finished(self) -> None:
        # The whole point. An edit is eighteen minutes, and a request that long
        # shows a spinner and offers no way out.
        job = self.runs.start(waits(0.3))

        self.assertEqual(job.state, "running")
        self.assertTrue(self.runs.working)
        self.settle(job)

    def test_it_keeps_what_the_run_produced(self) -> None:
        job = self.runs.start(waits())
        self.settle(job)

        self.assertEqual(job.state, "done")
        self.assertEqual(job.result, {"ok": True})

    def test_a_second_run_is_refused_rather_than_queued(self) -> None:
        # There is one graphics card. A queue would only be a list of things
        # that cannot start, and saying so is better than being silent.
        self.runs.start(waits(0.3))

        with self.assertRaises(RuntimeError):
            self.runs.start(waits())

    def test_another_run_may_start_once_the_first_is_done(self) -> None:
        first = self.runs.start(waits())
        self.settle(first)

        second = self.runs.start(waits())
        self.settle(second)

        self.assertEqual(second.state, "done")


class FailureTest(unittest.TestCase):
    def setUp(self) -> None:
        self.runs = Runner()

    def settle(self, job, limit: float = 3.0) -> None:
        deadline = time.monotonic() + limit
        while job.state == "running" and time.monotonic() < deadline:
            time.sleep(0.01)

    def test_a_failure_is_kept_as_a_sentence(self) -> None:
        def explodes(job):
            raise ValueError("nothing came back for a unicorn")

        job = self.runs.start(explodes)
        self.settle(job)

        self.assertEqual(job.state, "failed")
        self.assertIn("unicorn", job.detail)

    def test_a_failure_without_words_still_says_something(self) -> None:
        def explodes(job):
            raise RuntimeError()

        job = self.runs.start(explodes)
        self.settle(job)

        self.assertEqual(job.detail, "RuntimeError")

    def test_a_failure_lets_the_next_run_start(self) -> None:
        def explodes(job):
            raise ValueError("no")

        self.settle(self.runs.start(explodes))

        self.assertFalse(self.runs.working)


class StoppingTest(unittest.TestCase):
    def setUp(self) -> None:
        self.runs = Runner()

    def test_a_run_can_be_asked_to_stop_and_notices(self) -> None:
        started = threading.Event()

        def watches(job):
            started.set()
            for _ in range(200):
                if stopping(job):
                    raise StoppedEarly("stopped")
                time.sleep(0.01)
            return {"finished": True}

        job = self.runs.start(watches)
        started.wait(2)
        self.assertTrue(self.runs.cancel(job.id))

        deadline = time.monotonic() + 3
        while job.state == "running" and time.monotonic() < deadline:
            time.sleep(0.01)

        # Not "failed": stopping on purpose is not the same as breaking, and
        # the page says something different about each.
        self.assertEqual(job.state, "cancelled")

    def test_stopping_something_already_finished_is_refused(self) -> None:
        job = self.runs.start(waits())
        deadline = time.monotonic() + 3
        while job.state == "running" and time.monotonic() < deadline:
            time.sleep(0.01)

        self.assertFalse(self.runs.cancel(job.id))

    def test_stopping_something_that_never_existed_is_refused(self) -> None:
        self.assertFalse(self.runs.cancel("nosuchjob"))


class ProgressTest(unittest.TestCase):
    def setUp(self) -> None:
        self.runs = Runner()

    def test_a_finished_run_reads_as_finished(self) -> None:
        # The watcher is told before each box starts, so the last thing it
        # reported was the final box beginning — leaving a finished run at
        # four of five, and a progress bar stuck at eighty percent for ever.
        def work(job):
            job.total_nodes, job.done_nodes = 5, 4
            job.steps, job.step = 20, 20
            return {}

        job = self.runs.start(work)
        deadline = time.monotonic() + 3
        while job.state == "running" and time.monotonic() < deadline:
            time.sleep(0.01)

        self.assertEqual(job.done_nodes, 5)

    def test_it_publishes_what_the_page_needs(self) -> None:
        job = self.runs.start(waits())
        said = job.published()

        for key in ("job", "state", "node", "done_nodes", "total_nodes", "step", "steps", "note"):
            self.assertIn(key, said)


if __name__ == "__main__":
    unittest.main()
