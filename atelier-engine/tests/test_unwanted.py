"""What a clip is told not to be, and why that depended on nothing before.

A clip asked for "Goya, Neo Rauch" came back photographic. Nothing was broken
in the hand: the names were in the positive prompt exactly as written. They
were cancelled by the clip's own negative, which said *style, artwork,
painting, picture* in every clip whatever had been asked for — longer and more
specific than the manner sentence, so the negative won and the paint lost.

These tests read the string the model is given. The look itself needs a render
to judge; what can be settled without one is whether the two halves of the
prompt still contradict each other.
"""

from __future__ import annotations

import unittest

from engine.video import NOT_A_PAINTING, unwanted

#: The four words, one by one, as the model reads them.
FORBIDS_PAINT = tuple(word.strip() for word in NOT_A_PAINTING.split(","))


class UnwantedTest(unittest.TestCase):
    """The negative prompt, with and without a manner asked for."""

    def test_forbids_paint_when_no_manner_was_asked_for(self) -> None:
        # The default, and right for it: left alone the model imitates
        # brushwork it cannot do, and invented impasto is worse than a clip
        # that simply moves what it was given.
        said = unwanted(False)

        for word in FORBIDS_PAINT:
            self.assertIn(word, said)

    def test_stops_forbidding_paint_when_a_manner_is_asked_for(self) -> None:
        # The fix. Asking for a painter's manner and forbidding painting in
        # the same breath spends the prompt and buys nothing.
        said = unwanted(True)

        for word in FORBIDS_PAINT:
            self.assertNotIn(word, said)

    def test_keeps_everything_that_is_not_about_paint(self) -> None:
        # The quality and motion terms are about the model rather than about
        # the manner, so a style does not buy a clip full of artefacts.
        said = unwanted(True)

        for word in (
            "overexposed",
            "blurred detail",
            "subtitles",
            "worst quality",
            "JPEG artefacts",
            "motionless",
            "walking backwards",
        ):
            self.assertIn(word, said)

    def test_still_refuses_an_illustration_either_way(self) -> None:
        # The house negative, which is about the models and not about him: a
        # clip in Goya's manner is still not a cartoon.
        for styling in (True, False):
            said = unwanted(styling)
            self.assertTrue(said.startswith("Cartoonish, Illustration, Comic"))

    def test_asking_for_nothing_leaves_the_negative_exactly_as_it_was(self) -> None:
        # Every clip made before the switch existed had this negative, so a
        # clip made with the style off has to be the same clip as before.
        said = unwanted(False)

        self.assertEqual(
            said,
            "Cartoonish, Illustration, Comic, bright colours, overexposed, static, "
            "blurred detail, subtitles, style, artwork, painting, picture, still, "
            "overall grey, worst quality, low quality, JPEG artefacts, ugly, "
            "deformed, extra fingers, poorly drawn hands, poorly drawn face, "
            "malformed, disfigured, fused fingers, motionless, cluttered background, "
            "three legs, walking backwards",
        )

    def test_leaves_no_doubled_comma_where_the_words_came_out(self) -> None:
        self.assertNotIn(",,", unwanted(True))
        self.assertNotIn(", ,", unwanted(True))

    def test_a_clip_can_say_what_this_painting_must_not_become(self) -> None:
        # Written for "Stolen pic II", a nude the clip model kept putting a
        # dress on. The standing negative is about what a clip should never
        # be and is the same for every painting; this is about one canvas.
        said = unwanted(False, "a dress, clothed")

        self.assertTrue(said.endswith("a dress, clothed"))
        # And everything that was there before it is still there.
        self.assertIn("Cartoonish", said)
        self.assertIn("walking backwards", said)

    def test_saying_nothing_leaves_the_negative_as_it_was(self) -> None:
        self.assertEqual(unwanted(False), unwanted(False, ""))
        self.assertEqual(unwanted(True), unwanted(True, "   "))

    def test_a_stray_comma_does_not_double_up(self) -> None:
        # Typed as a list, and a trailing comma is what a person leaves.
        self.assertEqual(unwanted(False, "a dress,"), unwanted(False, "a dress"))
        self.assertNotIn(",,", unwanted(False, "a dress,"))


if __name__ == "__main__":
    unittest.main()
