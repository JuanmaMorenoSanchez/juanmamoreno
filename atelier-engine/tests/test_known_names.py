"""Which painters the model has actually read about, and what to do about it."""

from __future__ import annotations

import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import mock

from engine import house
from engine.nodes import GraphError


class NamesTest(unittest.TestCase):
    def test_a_hand_is_the_separate_names_in_it(self) -> None:
        self.assertEqual(house.names("Goya, Rembrandt"), ["Goya", "Rembrandt"])

    def test_spacing_and_stray_commas_are_not_names(self) -> None:
        self.assertEqual(house.names("  Goya ,, , Rembrandt  "), ["Goya", "Rembrandt"])

    def test_nothing_written_is_no_names(self) -> None:
        self.assertEqual(house.names(""), [])


class JudgingTest(unittest.TestCase):
    def setUp(self) -> None:
        room = TemporaryDirectory()
        self.addCleanup(room.cleanup)
        local = Path(room.name) / "local"
        patched = mock.patch.multiple(
            house,
            LOCAL=local,
            HAND=local / "style.txt",
            JUDGED=local / "hand-known.json",
        )
        patched.start()
        self.addCleanup(patched.stop)

    def test_a_model_that_says_yes_is_a_name_worth_keeping(self) -> None:
        self.assertIs(house.judge("Goya", lambda _: "KNOWN: yes\nLOOK: dark and expressive"), True)

    def test_a_model_that_says_no_is_not(self) -> None:
        self.assertIs(house.judge("Someone", lambda _: "KNOWN: no"), False)

    def test_the_question_tells_it_that_guessing_is_worse(self) -> None:
        # Asked plainly, a model writes a plausible paragraph about anyone,
        # because that is what it does. Asked to refuse, it refuses.
        asked: list[str] = []
        house.judge("Someone", lambda question: asked.append(question) or "KNOWN: no")
        self.assertIn("Guessing is worse than saying no", asked[0])

    def test_a_verdict_is_written_down_so_nothing_is_judged_twice(self) -> None:
        # Asking costs eighteen gigabytes of model load, and a name does not
        # change its mind.
        house.judge("Goya", lambda _: "KNOWN: yes")
        self.assertEqual(house.verdicts(), {"Goya": True})

    def test_verdicts_survive_a_file_that_is_not_there_or_not_json(self) -> None:
        self.assertEqual(house.verdicts(), {})
        house.LOCAL.mkdir(parents=True, exist_ok=True)
        house.JUDGED.write_text("not json", encoding="utf-8")
        self.assertEqual(house.verdicts(), {})


class RefusingTest(unittest.TestCase):
    """What stops a run before it starts, when the hand is switched on.

    Switched on throughout: a hand that is off is not in the prompt, so it
    refuses nothing, and that is `SwitchTest` in `test_house`.
    """

    def setUp(self) -> None:
        room = TemporaryDirectory()
        self.addCleanup(room.cleanup)
        local = Path(room.name) / "local"
        patched = mock.patch.multiple(
            house,
            LOCAL=local,
            HAND=local / "style.txt",
            USING=local / "style-on.txt",
            JUDGED=local / "hand-known.json",
        )
        patched.start()
        self.addCleanup(patched.stop)
        house.set_using(True)

    def test_a_hand_of_painters_it_knows_runs(self) -> None:
        house.set_hand("Goya, Rembrandt")
        house.remember("Goya", True)
        house.remember("Rembrandt", True)
        house.refuse_unknown()  # does not raise

    def test_a_name_it_has_never_read_about_stops_the_run(self) -> None:
        # Half an hour is too long to find out at the end.
        house.set_hand("Goya, Someone Nobody Wrote About")
        house.remember("Goya", True)
        house.remember("Someone Nobody Wrote About", False)

        with self.assertRaises(GraphError) as refused:
            house.refuse_unknown()

        said = str(refused.exception)
        self.assertIn("Someone Nobody Wrote About", said)
        # And what to do instead, which is the thing that actually works.
        self.assertIn("In my style", said)

    def test_a_name_nobody_asked_about_is_let_through(self) -> None:
        # Refusing a run over a question never put is worse than the run.
        house.set_hand("Someone Unjudged")
        house.refuse_unknown()  # does not raise

    def test_no_hand_at_all_stops_nothing(self) -> None:
        house.refuse_unknown()  # does not raise


if __name__ == "__main__":
    unittest.main()
