"""What the page is told while an edit or a clip is getting ready.

Eighteen minutes with nothing to count is the longest wait in the atelier, and
the note is the only thing that explains it. It used to be cleared on the line
after the pipeline was built — but the instruction still has to be encoded and
the first pass still has to be made, and timed on a cold card that is another
eighty seconds in which the page says neither what it is doing nor how far
through it is.

The clip had the opposite fault and a worse one: the note was put up and
nothing anywhere ever took it down. A measured 24m 40s clip read "preparing
the model" beside "step 30 of 30" for its last seventeen minutes.

No weights here: the pipeline is a function that calls the step callback twice
and hands back a picture, which is all this is about.
"""

import unittest
from unittest import mock

import numpy as np
from PIL import Image

from engine import edit as editing
from engine import video as filming


class Produced:
    """What a diffusers pipeline answers with."""

    def __init__(self, image: Image.Image) -> None:
        self.images = [image]


class SayingTest(unittest.TestCase):
    def run_one(self, steps_taken: int = 2) -> list[tuple]:
        seen: list[tuple] = []

        def pipeline(**asked: object) -> Produced:
            # Everything up to here — building the pipeline — has happened;
            # everything after it is the model working.
            seen.append(("entered",))
            for index in range(steps_taken):
                asked["callback_on_step_end"](pipeline, index, 0, {})
            return Produced(Image.new("RGB", (8, 8), (10, 10, 10)))

        pipeline.transformer = object()

        with (
            mock.patch.object(editing, "_pipeline", return_value=pipeline),
            mock.patch.object(editing, "_reusing"),
        ):
            editing.edit(
                Image.new("RGB", (8, 8), (0, 0, 0)),
                "make the jumper deep red",
                steps=steps_taken,
                saying=lambda note: seen.append(("note", note)),
                watching=lambda step, total: seen.append(("step", step)),
            )
        return seen

    def test_the_note_stays_until_there_is_a_step_to_count(self) -> None:
        seen = self.run_one()

        self.assertLess(seen.index(("entered",)), seen.index(("note", None)))

    def test_and_goes_the_moment_there_is_one(self) -> None:
        seen = self.run_one()

        self.assertEqual(seen[seen.index(("note", None)) + 1], ("step", 1))

    def test_every_step_is_still_counted(self) -> None:
        seen = self.run_one(steps_taken=3)

        self.assertEqual([one for one in seen if one[0] == "step"], [("step", 1), ("step", 2), ("step", 3)])


class ClipSayingTest(unittest.TestCase):
    """The same thing for a clip, which never took its note down at all."""

    def run_one(self, steps_taken: int = 2) -> list[tuple]:
        seen: list[tuple] = []

        class Latents:
            frames = np.zeros((1, 3, 1, 8, 8), dtype=np.float32)

        def pipeline(**asked: object) -> Latents:
            seen.append(("entered",))
            for index in range(steps_taken):
                asked["callback_on_step_end"](pipeline, index, 0, {})
            return Latents()

        pipeline.transformer = mock.Mock(dtype=None)

        with (
            mock.patch.object(filming, "_pipeline", return_value=pipeline),
            mock.patch.object(filming, "afford"),
            mock.patch.object(filming, "embed", return_value=mock.MagicMock()),
            mock.patch.object(filming, "decoded", return_value=np.zeros((1, 8, 8, 3))),
        ):
            filming.animate(
                Image.new("RGB", (64, 64), (0, 0, 0)),
                "the dust drifts",
                steps=steps_taken,
                saying=lambda note: seen.append(("note", note)),
                watching=lambda step, total: seen.append(("step", step)),
            )
        return seen

    def test_the_note_is_taken_down_at_all(self) -> None:
        # It never was. Nothing in the clip path was given the note to clear.
        seen = self.run_one()

        self.assertIn(("note", None), seen)

    def test_and_not_before_there_is_a_step_to_count(self) -> None:
        seen = self.run_one()

        self.assertLess(seen.index(("entered",)), seen.index(("note", None)))
        self.assertEqual(seen[seen.index(("note", None)) + 1], ("step", 1))

    def test_every_step_is_still_counted(self) -> None:
        seen = self.run_one(steps_taken=3)

        self.assertEqual(
            [one for one in seen if one[0] == "step"], [("step", 1), ("step", 2), ("step", 3)]
        )

    def test_the_decode_after_the_last_step_says_so(self) -> None:
        # Two minutes of the measured run, after the count has stopped moving.
        seen = self.run_one()

        self.assertEqual(seen[-1], ("note", "decoding the frames"))
