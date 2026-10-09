"""
Turning a mask into a layer, and the two judgements made while doing it:
the edge is softened a little, and the background is never asked for.
"""

import unittest

import numpy as np
from PIL import Image

from engine.images import bounds, coverage, remainder, to_layer


def painting(size=(40, 30), colour=(200, 60, 40)) -> Image.Image:
    return Image.new("RGB", size, colour)


def square(size=(30, 40), box=(10, 10, 20, 20)) -> np.ndarray:
    """A solid rectangle, as (height, width) like every mask here."""
    mask = np.zeros(size, dtype=bool)
    x0, y0, x1, y1 = box
    mask[y0:y1, x0:x1] = True
    return mask


class LayerTest(unittest.TestCase):
    def test_the_layer_keeps_the_size_of_the_painting(self) -> None:
        # Cropping to the mask would be smaller, but the layers are stacked back
        # over each other and have to agree about where they are.
        layer = to_layer(painting(), square(), feather=0)

        self.assertEqual(layer.size, (40, 30))
        self.assertEqual(layer.mode, "RGBA")

    def test_inside_is_opaque_and_outside_is_gone(self) -> None:
        layer = to_layer(painting(), square(), feather=0)
        alpha = layer.getchannel("A")

        self.assertEqual(alpha.getpixel((15, 15)), 255)
        self.assertEqual(alpha.getpixel((2, 2)), 0)

    def test_the_edge_is_softened_rather_than_cut(self) -> None:
        """A hard mask over brushwork reads as paper. The join should not be a line.

        Sized like a real mask rather than a token one: the blur reaches about
        three times its radius, so on a ten-pixel square it would touch the
        middle too and the test would be measuring the fixture.
        """
        big = square(size=(80, 80), box=(20, 20, 60, 60))
        canvas = painting(size=(80, 80))
        hard = to_layer(canvas, big, feather=0).getchannel("A")
        soft = to_layer(canvas, big, feather=1.8).getchannel("A")

        # Just outside the rectangle: nothing at all when cut, something when feathered.
        self.assertEqual(hard.getpixel((20, 19)), 0)
        self.assertGreater(soft.getpixel((20, 19)), 0)
        # Well inside it, the painting is still fully itself.
        self.assertEqual(soft.getpixel((40, 40)), 255)

    def test_a_mask_of_another_size_is_resized_to_the_painting(self) -> None:
        # The model is fed a smaller copy and the mask applied to the original,
        # which is the whole reason a medium-sized image is sent to it.
        small = square(size=(15, 20), box=(5, 5, 10, 10))
        layer = to_layer(painting(), small, feather=0)

        self.assertEqual(layer.size, (40, 30))


class ReadingAMaskTest(unittest.TestCase):
    def test_bounds_are_where_the_mask_is(self) -> None:
        self.assertEqual(bounds(square(box=(10, 10, 20, 20))), (10, 10, 20, 20))

    def test_an_empty_mask_has_no_bounds(self) -> None:
        # SAM always answers. Nothing found has to be told apart from something.
        self.assertIsNone(bounds(np.zeros((30, 40), dtype=bool)))

    def test_coverage_is_the_fraction_taken(self) -> None:
        mask = np.zeros((10, 10), dtype=bool)
        mask[:5, :] = True

        self.assertAlmostEqual(coverage(mask), 0.5)


class RemainderTest(unittest.TestCase):
    """The background is what the figures did not take.

    Asked for "a green field" directly, SAM returned confetti scattered over the
    foliage — it looks for an object and a field is not one. The inverse of the
    figures is both better and free.
    """

    def test_the_remainder_is_everything_else(self) -> None:
        left = square(size=(10, 10), box=(0, 0, 5, 10))
        back = remainder([left])

        self.assertFalse(back[0, 0])
        self.assertTrue(back[0, 9])

    def test_several_layers_are_all_subtracted(self) -> None:
        left = square(size=(10, 10), box=(0, 0, 3, 10))
        right = square(size=(10, 10), box=(7, 0, 10, 10))
        back = remainder([left, right])

        self.assertFalse(back[0, 0])
        self.assertFalse(back[0, 9])
        self.assertTrue(back[0, 5])

    def test_the_remainder_of_nothing_is_refused(self) -> None:
        # It would be the whole painting, which is not a layer and is almost
        # certainly a mistake upstream.
        with self.assertRaises(ValueError):
            remainder([])


if __name__ == "__main__":
    unittest.main()
