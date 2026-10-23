"""A rough version of the same picture, in a fraction of the time."""

from __future__ import annotations

import unittest

from engine import draft
from engine.catalogue import CATALOGUE


class StepsTest(unittest.TestCase):
    def test_a_draft_takes_four_steps_however_many_were_asked_for(self) -> None:
        for asked in (20, 30, 50):
            self.assertEqual(draft.steps(asked, True), draft.STEPS)

    def test_not_drafting_takes_what_was_asked_for(self) -> None:
        for asked in (4, 20, 50):
            self.assertEqual(draft.steps(asked, False), asked)

    def test_a_draft_never_takes_longer_than_the_run_it_drafts(self) -> None:
        # A graph set to three steps is already quicker than a draft, and
        # making it slower in order to call it a draft would be absurd.
        self.assertEqual(draft.steps(3, True), 3)
        self.assertEqual(draft.steps(1, True), 1)

    def test_nonsense_is_still_a_step(self) -> None:
        self.assertEqual(draft.steps(0, True), 1)
        self.assertEqual(draft.steps(-5, False), 1)


class NodeTest(unittest.TestCase):
    """The switch is on the two nodes that take minutes, and on no others."""

    def slow(self) -> list[str]:
        return ["edit", "video"]

    def test_the_slow_nodes_offer_it(self) -> None:
        for key in self.slow():
            names = [param.name for param in CATALOGUE[key].params]
            self.assertIn("draft", names, f"{key} cannot be drafted")

    def test_it_is_off_until_it_is_asked_for(self) -> None:
        # A draft is a decision to look before committing, not the default
        # way of working: a run nobody asked to be rough should not be.
        for key in self.slow():
            drafting = next(p for p in CATALOGUE[key].params if p.name == "draft")
            self.assertIs(drafting.default, False)

    def test_it_says_what_it_does_and_why_it_is_steps(self) -> None:
        for key in self.slow():
            drafting = next(p for p in CATALOGUE[key].params if p.name == "draft")
            self.assertIn("same seed", drafting.help)
            # The part worth knowing, and the reason the obvious idea is wrong.
            self.assertIn("pixels", drafting.help)


if __name__ == "__main__":
    unittest.main()


class SizeTest(unittest.TestCase):
    """How big a draft is drawn.

    `draft.py` said for a while that fewer pixels saves nothing here, on the
    reasoning that a step is fifty-four seconds of which fifty is the model
    arriving from disk. Measured properly a step is a hundred and thirty-three
    seconds and the arrival is fifty-three of them, so there are eighty
    seconds a step that the pixels might well decide — which is what this
    makes it possible to find out.
    """

    def test_a_full_run_lets_the_pipeline_choose(self) -> None:
        self.assertIsNone(draft.size((768, 768), False))

    def test_a_draft_of_a_square_is_half_the_side(self) -> None:
        # A quarter of the pixels, which for a square is half of each side.
        self.assertEqual(draft.size((768, 768), True), (512, 512))

    def test_the_size_he_uploaded_does_not_change_the_answer(self) -> None:
        # The pipeline resizes to its own megapixel before it starts, so the
        # file's own dimensions have never decided anything.
        self.assertEqual(draft.size((768, 768), True), draft.size((4096, 4096), True))

    def test_the_painting_keeps_its_shape(self) -> None:
        # A draft at another aspect is a different composition, and then it is
        # not a draft of anything.
        across, down = draft.size((1600, 900), True)

        self.assertGreater(across, down)
        self.assertAlmostEqual(across / down, 1600 / 900, delta=0.1)

    def test_both_sides_are_a_multiple_of_sixteen(self) -> None:
        # Otherwise the pipeline rounds them itself and warns about it.
        for shape in ((768, 768), (1600, 900), (900, 1600), (1023, 769)):
            with self.subTest(shape=shape):
                across, down = draft.size(shape, True)
                self.assertEqual(across % draft.STEP, 0)
                self.assertEqual(down % draft.STEP, 0)

    def test_a_shape_with_no_pixels_in_it_is_left_to_the_pipeline(self) -> None:
        self.assertIsNone(draft.size((0, 768), True))
