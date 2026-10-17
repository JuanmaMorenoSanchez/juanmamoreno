"""
The painting as the whole frame, or as an object standing in one.

The model is image-to-video: the image it is given *is* the first frame. Asked
for a painting on an easel in a mountain, with the painting as the whole frame,
it can only read the sentence as something happening on the canvas — and it
did: the clip came back with the canvas filling the screen and the mountain
inside it.

So when the painting is meant to be an object in a scene, the first frame is
built to say so. No model here: what is tested is the frame that is handed to
it, and the shape of what comes out.
"""

import unittest

from PIL import Image

from engine import video


class ShapeTest(unittest.TestCase):
    #: Roughly the 150 x 140 canvas that caused this.
    painting = Image.new("RGB", (1500, 1400), (120, 90, 40))

    def test_filling_the_frame_keeps_the_painting_shape(self) -> None:
        wide, high = video.fit(self.painting, 832)

        self.assertAlmostEqual(wide / high, 1500 / 1400, places=1)

    def test_standing_in_a_scene_asks_for_a_scene_shaped_frame(self) -> None:
        # A square painting in a square frame leaves nowhere to put a
        # mountain, which is the whole of what the switch is for.
        wide, high = video.fit(self.painting, 832, in_a_scene=True)

        self.assertAlmostEqual(wide / high, 16 / 9, places=1)

    def test_both_sides_are_still_multiples_of_the_stride(self) -> None:
        # Or the pipeline adjusts them itself and says so in a log nobody
        # reads, which is how a clip ends up a different shape from the one
        # computed for it.
        for in_a_scene in (False, True):
            with self.subTest(in_a_scene=in_a_scene):
                wide, high = video.fit(self.painting, 832, in_a_scene)
                self.assertEqual((wide % video.STRIDE, high % video.STRIDE), (0, 0))

    def test_the_clip_is_written_at_the_scene_shape_not_the_painting(self) -> None:
        generated = video.fit(self.painting, 832, in_a_scene=True)

        self.assertEqual(video.shown(self.painting, generated, in_a_scene=True), generated)

    def test_a_typed_size_still_wins_in_a_scene(self) -> None:
        generated = video.fit(self.painting, 832, in_a_scene=True)

        self.assertEqual(
            video.shown(self.painting, generated, width=1920, height=1080, in_a_scene=True),
            (1920, 1080),
        )


class StagedTest(unittest.TestCase):
    painting = Image.new("RGB", (1500, 1400), (200, 30, 30))

    def test_the_frame_is_the_size_it_was_asked_for(self) -> None:
        staged = video.staged(self.painting, (832, 464))

        self.assertEqual(staged.size, (832, 464))

    def test_the_painting_is_only_part_of_it(self) -> None:
        # The red is the painting; the rest is the blurred, darkened backdrop.
        # If the painting filled the frame, the switch would have done nothing.
        staged = video.staged(self.painting, (832, 464), room=45)
        pixels = list(staged.getdata())
        exact = sum(1 for pixel in pixels if pixel == (200, 30, 30))

        self.assertGreater(exact, 0)
        self.assertLess(exact / len(pixels), 0.5)

    def test_more_room_means_more_painting(self) -> None:
        small = video.staged(self.painting, (832, 464), room=25)
        large = video.staged(self.painting, (832, 464), room=70)
        red = lambda frame: sum(1 for pixel in frame.getdata() if pixel == (200, 30, 30))

        self.assertGreater(red(large), red(small))

    def test_the_painting_keeps_its_own_shape_inside_the_frame(self) -> None:
        # The one thing that must not happen: a square canvas stretched to
        # sixteen by nine because the frame is.
        tall = Image.new("RGB", (400, 832), (0, 0, 255))
        staged = video.staged(tall, (832, 464), room=60)

        blue = [
            (x, y)
            for y in range(staged.height)
            for x in range(staged.width)
            if staged.getpixel((x, y)) == (0, 0, 255)
        ]
        held_wide = max(x for x, _ in blue) - min(x for x, _ in blue) + 1
        held_high = max(y for _, y in blue) - min(y for _, y in blue) + 1

        self.assertAlmostEqual(held_wide / held_high, 400 / 832, places=1)

    def test_the_surround_is_a_place_rather_than_a_picture(self) -> None:
        """Light above a horizon, dark below it, and nothing to peel.

        The first version put a blurred copy of the painting behind it, and
        the model did what a diffusion model does with an image it is given:
        it kept it and transformed it. The blur hung in front of the mountain
        for most of a second and then slid away like a blanket.
        """
        staged = video.staged(self.painting, (832, 480))
        sky = staged.getpixel((20, 20))
        ground = staged.getpixel((20, 460))

        # Two bands, and the one underneath is the darker: that is the whole
        # of what makes it read as a place rather than as a wall.
        self.assertLess(sum(ground), sum(sky))
        # Neither is the painting, and neither is black.
        self.assertNotEqual(sky, (200, 30, 30))
        self.assertNotEqual(ground, (0, 0, 0))

    def test_the_painting_stands_on_the_horizon(self) -> None:
        # Centred, the model invented an easel where the canvas was and a
        # landscape behind it, and the two did not agree: the easel floated.
        # The ground has to be there before the easel is.
        staged = video.staged(self.painting, (832, 480), room=45)
        red = [
            y
            for y in range(staged.height)
            if staged.getpixel((staged.width // 2, y)) == (200, 30, 30)
        ]
        horizon = round(480 * 0.62)

        self.assertTrue(red)
        self.assertLessEqual(abs(max(red) - horizon), 4)

    def test_an_absurd_share_is_brought_back_to_something_possible(self) -> None:
        for room in (0, -10, 500):
            with self.subTest(room=room):
                self.assertEqual(video.staged(self.painting, (832, 464), room).size, (832, 464))


if __name__ == "__main__":
    unittest.main()
