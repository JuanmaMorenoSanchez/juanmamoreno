"""What every picture is told, and the part of it that is not in git."""

from __future__ import annotations

import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import mock

from engine import house
from engine.nodes import GraphError


class NeverTest(unittest.TestCase):
    """The negative, which is committed because it is about the models."""

    def test_says_the_three_things_no_picture_here_should_be(self) -> None:
        self.assertEqual(house.never(), "Cartoonish, Illustration, Comic")

    def test_carries_what_a_particular_model_needs_as_well(self) -> None:
        said = house.never("static, subtitles")
        self.assertTrue(said.startswith("Cartoonish, Illustration, Comic"))
        self.assertIn("static, subtitles", said)

    def test_does_not_leave_a_dangling_comma_when_there_is_nothing_more(self) -> None:
        for nothing in ("", "   ", ","):
            self.assertEqual(house.never(nothing), "Cartoonish, Illustration, Comic")


class HandTest(unittest.TestCase):
    """The painters, which are not committed and may not be there at all."""

    def setUp(self) -> None:
        self.room = TemporaryDirectory()
        self.addCleanup(self.room.cleanup)
        local = Path(self.room.name) / "local"
        patched = mock.patch.multiple(
            house,
            LOCAL=local,
            HAND=local / "style.txt",
            USING=local / "style-on.txt",
        )
        patched.start()
        self.addCleanup(patched.stop)

    def wanting(self, saying: str) -> None:
        """The ordinary case for these tests: names written and switched on."""
        house.set_hand(saying)
        house.set_using(True)

    def test_is_nothing_when_the_file_was_never_written(self) -> None:
        # Which is how the repository ships, and it must not be an error.
        self.assertEqual(house.hand(), "")

    def test_a_prompt_without_a_hand_is_the_prompt(self) -> None:
        self.assertEqual(house.asked("the dust drifts"), "the dust drifts")

    def test_a_prompt_with_a_hand_says_whose_manner_at_the_end(self) -> None:
        self.wanting("Someone, Someone Else")
        asked = house.asked("the dust drifts")

        # At the end, and named as a manner: a prompt that opens with
        # painters' names is a prompt about painters.
        self.assertTrue(asked.startswith("the dust drifts"))
        self.assertIn("In the manner of Someone, Someone Else", asked)

    def test_a_hand_with_no_prompt_is_still_a_sentence(self) -> None:
        self.wanting("Someone")
        self.assertEqual(house.asked("  "), house.MANNER.format(who="Someone"))

    def test_is_read_again_every_time_so_an_edit_lands_on_the_next_run(self) -> None:
        self.wanting("First")
        self.assertIn("First", house.asked("a thing"))
        house.set_hand("Second")
        self.assertIn("Second", house.asked("a thing"))
        self.assertNotIn("First", house.asked("a thing"))

    def test_emptying_it_puts_the_prompts_back_as_they_were(self) -> None:
        self.wanting("Someone")
        house.set_hand("   ")
        self.assertEqual(house.hand(), "")
        self.assertEqual(house.asked("a thing"), "a thing")

    def test_makes_the_folder_it_needs(self) -> None:
        self.assertFalse(house.LOCAL.exists())
        house.set_hand("Someone")
        self.assertTrue(house.HAND.exists())


class SwitchTest(unittest.TestCase):
    """The switch, which is a different question from what is written down."""

    def setUp(self) -> None:
        self.room = TemporaryDirectory()
        self.addCleanup(self.room.cleanup)
        local = Path(self.room.name) / "local"
        patched = mock.patch.multiple(
            house,
            LOCAL=local,
            HAND=local / "style.txt",
            USING=local / "style-on.txt",
            JUDGED=local / "hand-known.json",
        )
        patched.start()
        self.addCleanup(patched.stop)

    def test_is_off_on_an_engine_that_has_never_been_told(self) -> None:
        # Which is how the repository ships, and is the behaviour every engine
        # before the switch actually had: the names were in the prompt and the
        # clip's own negative cancelled them.
        self.assertFalse(house.using())

    def test_names_written_but_not_switched_on_reach_no_prompt(self) -> None:
        house.set_hand("Goya, Neo Rauch")

        self.assertEqual(house.applied(), "")
        self.assertEqual(house.asked("the dust drifts"), "the dust drifts")

    def test_switched_on_the_names_reach_the_prompt(self) -> None:
        house.set_hand("Goya, Neo Rauch")
        house.set_using(True)

        self.assertEqual(house.applied(), "Goya, Neo Rauch")
        self.assertIn("Goya, Neo Rauch", house.asked("the dust drifts"))

    def test_switching_off_keeps_the_names(self) -> None:
        # The point of a switch rather than an empty field: a photographic clip
        # does not cost him the names.
        house.set_hand("Goya, Neo Rauch")
        house.set_using(True)
        house.set_using(False)

        self.assertEqual(house.hand(), "Goya, Neo Rauch")
        self.assertEqual(house.applied(), "")

    def test_switched_on_with_nothing_written_is_the_prompt(self) -> None:
        house.set_using(True)
        self.assertEqual(house.asked("the dust drifts"), "the dust drifts")

    def test_answers_with_where_it_now_stands(self) -> None:
        self.assertTrue(house.set_using(True))
        self.assertFalse(house.set_using(False))

    def test_the_manner_names_what_a_style_is_and_not_a_subject(self) -> None:
        # His own account of it: a style decides the colour, the brushwork, the
        # composition and the mood, never what is in the picture.
        house.set_hand("Goya")
        house.set_using(True)
        said = house.asked("she turns her head")

        self.assertTrue(said.startswith("she turns her head"))
        for what in ("colour", "brushwork", "composition", "mood"):
            self.assertIn(what, said)

    def test_a_hand_switched_off_refuses_nothing(self) -> None:
        # A name the model cannot place stops a run, because it would spend
        # half an hour on a prompt that bought nothing. Switched off it is not
        # in the prompt, so there is nothing to refuse over.
        house.set_hand("Nobody At All")
        house.remember("Nobody At All", False)

        house.refuse_unknown()  # off: no complaint

        house.set_using(True)
        with self.assertRaises(GraphError):
            house.refuse_unknown()


if __name__ == "__main__":
    unittest.main()
