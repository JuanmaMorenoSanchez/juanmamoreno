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
