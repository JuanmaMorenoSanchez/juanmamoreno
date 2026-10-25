"""
Shapes the model can draw, and the one it cannot.

`afford` already turns away a clip too big for the card. This turns away one
that fits perfectly well and comes back as colour tearing, which is the worse
failure of the two because it looks like work.

Measured on one of his landscapes, 1999×447 — four and a half to one. `fit`
faithfully asked for 832×192, a latent twelve rows tall, and from about the
fifth frame the clip is vertical tearing that never recovers. The stock
diffusers pipeline does the same on the same painting, so it is the shape and
not anything this module does to it.

Erring towards refusing is deliberate. The way out of the refusal is a switch
he already has — **The painting in a scene** generates at a fixed shape and
stands the painting inside it — so a refusal costs him a click, while letting
one through costs fifteen minutes and a clip he cannot use.
"""

import unittest

from PIL import Image

from engine import video
from engine.nodes import GraphError


def a_painting(size: tuple[int, int]) -> Image.Image:
    return Image.new("RGB", size, (120, 110, 100))


class LopsidednessTest(unittest.TestCase):
    def test_a_square_is_one(self) -> None:
        self.assertEqual(video.lopsidedness((500, 500)), 1.0)

    def test_it_does_not_care_which_way_up(self) -> None:
        self.assertEqual(video.lopsidedness((2000, 1000)), video.lopsidedness((1000, 2000)))

    def test_a_panorama_is_what_it_looks_like(self) -> None:
        self.assertAlmostEqual(video.lopsidedness((1999, 447)), 4.47, places=1)

    def test_a_side_of_nothing_does_not_divide_by_zero(self) -> None:
        self.assertGreater(video.lopsidedness((800, 0)), 0)


class RefusingAShapeTest(unittest.TestCase):
    def test_his_panorama_is_refused(self) -> None:
        # 1999×447, the one that was watched to fail.
        with self.assertRaises(GraphError) as refused:
            video.animate(a_painting((1999, 447)), "it moves")

        said = str(refused.exception)
        self.assertIn("4.5", said)
        self.assertIn("The painting in a scene", said)

    def test_the_refusal_says_the_shape_it_would_have_asked_for(self) -> None:
        # So the number in the message can be checked against the one in the
        # error that used to come back from the card.
        with self.assertRaises(GraphError) as refused:
            video.animate(a_painting((1999, 447)), "it moves")

        self.assertIn("832x192", str(refused.exception))

    def test_a_scene_is_never_refused(self) -> None:
        # It generates at a fixed shape whatever the painting is, so the way
        # out of the message has to actually be open.
        #
        # Asserted on the shape rather than by running it. Calling `animate`
        # here builds the real pipeline, and the real pipeline clears the spill
        # directory it shares with whatever else is running — which is how this
        # test, on its first outing, destroyed a clip that was ten minutes into
        # being generated in another process.
        for size in ((1999, 447), (447, 1999), (4000, 400)):
            with self.subTest(size=size):
                width, height = video.fit(a_painting(size), 832, True)
                self.assertLessEqual(video.lopsidedness((width, height)), video.DRAWABLE)

    def test_the_shapes_he_actually_paints_are_drawn(self) -> None:
        for name, size in (
            ("near square", (1000, 1060)),
            ("tall", (3652, 4533)),
            ("wide", (1920, 1080)),
        ):
            with self.subTest(name=name):
                width, height = video.fit(a_painting(size), 832, False)
                self.assertLessEqual(video.lopsidedness((width, height)), video.DRAWABLE)

    def test_the_limit_covers_the_shapes_the_model_ships_with(self) -> None:
        # 1280×704 and 704×1280 are what Wan 2.2 TI2V-5B publishes. A limit
        # that refused its own sizes would be indefensible.
        self.assertGreaterEqual(video.DRAWABLE, 1280 / 704)


if __name__ == "__main__":
    unittest.main()
