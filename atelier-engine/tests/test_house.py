"""What every picture is told, and the part of it that is not in git."""

from __future__ import annotations

import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import mock

from engine import house


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
        patched = mock.patch.multiple(house, LOCAL=local, HAND=local / "style.txt")
        patched.start()
        self.addCleanup(patched.stop)

    def test_is_nothing_when_the_file_was_never_written(self) -> None:
        # Which is how the repository ships, and it must not be an error.
        self.assertEqual(house.hand(), "")

    def test_a_prompt_without_a_hand_is_the_prompt(self) -> None:
        self.assertEqual(house.asked("the dust drifts"), "the dust drifts")

    def test_a_prompt_with_a_hand_says_whose_manner_at_the_end(self) -> None:
        house.set_hand("Someone, Someone Else")
        asked = house.asked("the dust drifts")

        # At the end, and named as a manner: a prompt that opens with
        # painters' names is a prompt about painters.
        self.assertTrue(asked.startswith("the dust drifts"))
        self.assertIn("In the manner of Someone, Someone Else", asked)

    def test_a_hand_with_no_prompt_is_still_a_sentence(self) -> None:
        house.set_hand("Someone")
        self.assertEqual(house.asked("  "), "In the manner of Someone.")

    def test_is_read_again_every_time_so_an_edit_lands_on_the_next_run(self) -> None:
        house.set_hand("First")
        self.assertIn("First", house.asked("a thing"))
        house.set_hand("Second")
        self.assertIn("Second", house.asked("a thing"))
        self.assertNotIn("First", house.asked("a thing"))

    def test_emptying_it_puts_the_prompts_back_as_they_were(self) -> None:
        house.set_hand("Someone")
        house.set_hand("   ")
        self.assertEqual(house.hand(), "")
        self.assertEqual(house.asked("a thing"), "a thing")

    def test_makes_the_folder_it_needs(self) -> None:
        self.assertFalse(house.LOCAL.exists())
        house.set_hand("Someone")
        self.assertTrue(house.HAND.exists())


if __name__ == "__main__":
    unittest.main()
