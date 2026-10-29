"""The copy a cut is made from, when the caller has no canvas.

A run started from the page fetches the original and reduces it in the browser
before uploading, which is how "high" on the shelf came to mean 2500px on the
shorter side. A run started from a script has no browser — so the same
reduction is available on the engine, to the same number, because an asset's
quality is read off its own pixels and two meanings of "high" would be one too
many.
"""

from __future__ import annotations

import unittest

from PIL import Image

from engine.images import MEDIUM_SHORTEST, reduced


def canvas(width: int, height: int) -> Image.Image:
    return Image.new("RGB", (width, height), "white")


class ReducedTest(unittest.TestCase):
    def test_brings_the_shorter_side_down_to_the_number(self) -> None:
        said = reduced(canvas(8000, 6000), MEDIUM_SHORTEST)

        self.assertEqual(min(said.width, said.height), MEDIUM_SHORTEST)

    def test_keeps_the_shape_it_was_given(self) -> None:
        was = canvas(8000, 6000)

        said = reduced(was, MEDIUM_SHORTEST)

        self.assertAlmostEqual(said.width / said.height, was.width / was.height, places=3)

    def test_never_enlarges_a_small_copy(self) -> None:
        # The web copy is a few hundred pixels. Inventing the rest would meet
        # the number and not the reason for it.
        was = canvas(900, 600)

        said = reduced(was, MEDIUM_SHORTEST)

        self.assertEqual(said.size, was.size)

    def test_lands_above_the_bar_rather_than_on_2499(self) -> None:
        # Rounded up, because the shelf files anything under 2500 as the small
        # copy and a cut one pixel short would be labelled web for ever.
        said = reduced(canvas(2501, 9999), MEDIUM_SHORTEST)

        self.assertGreaterEqual(min(said.width, said.height), MEDIUM_SHORTEST)

    def test_zero_means_cut_what_was_sent(self) -> None:
        # What every caller before the night did: the page had already reduced
        # it, so the engine must not reduce it twice.
        was = canvas(4000, 3000)

        said = reduced(was, 0)

        self.assertEqual(said.size, was.size)


if __name__ == "__main__":
    unittest.main()
