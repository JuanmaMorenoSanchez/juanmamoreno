"""
How far from the painting an edit is allowed to end up.

The editor has no denoise strength. It is told an instruction and regenerates
the whole canvas, so there is no dial that says "change it only this much" —
which is the dial somebody editing a painting most wants, because the useful
answer is usually not the model's whole idea but a third of it.

So it is done at the other end: the result mixed back over the painting it
came from. That is a pure piece of arithmetic on two images and is tested as
one, without the twenty billion parameters that produced the second image.
"""

import unittest

from PIL import Image

from engine.edit import pulled_back


def flat(shade: int) -> Image.Image:
    return Image.new("RGB", (8, 8), (shade, shade, shade))


class HowFarTest(unittest.TestCase):
    def test_all_the_way_is_the_edit_itself(self) -> None:
        produced = flat(200)

        self.assertIs(pulled_back(flat(0), produced, 1.0), produced)

    def test_half_way_is_half_way(self) -> None:
        mixed = pulled_back(flat(0), flat(200), 0.5)

        self.assertEqual(mixed.getpixel((0, 0)), (100, 100, 100))

    def test_a_tenth_is_a_suggestion_of_it(self) -> None:
        mixed = pulled_back(flat(0), flat(200), 0.1)

        self.assertEqual(mixed.getpixel((0, 0)), (20, 20, 20))

    def test_more_than_all_the_way_is_still_all_the_way(self) -> None:
        # Nothing should be able to ask for more of the edit than there is.
        produced = flat(200)

        self.assertIs(pulled_back(flat(0), produced, 4.0), produced)

    def test_less_than_nothing_is_the_painting_back(self) -> None:
        mixed = pulled_back(flat(0), flat(200), -1.0)

        self.assertEqual(mixed.getpixel((0, 0)), (0, 0, 0))

    def test_a_painting_with_an_alpha_channel_does_not_stop_it(self) -> None:
        # What he drops on the page is often a png saved with transparency,
        # and Image.blend refuses two modes that differ.
        painting = Image.new("RGBA", (8, 8), (0, 0, 0, 255))

        mixed = pulled_back(painting, flat(200), 0.5)

        self.assertEqual(mixed.mode, "RGB")
        self.assertEqual(mixed.getpixel((0, 0)), (100, 100, 100))


if __name__ == "__main__":
    unittest.main()
