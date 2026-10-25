"""
The dials he turns, against the numbers they stand for.

The boxes used to show the model's settings. Each was a real number with a real
effect and not one of them was a question a painter has, so one dial now moves
several of them, in different directions, under a name he would say.

What is checked here is the arithmetic and the ends. The ends are the part
worth checking: a dial is a promise that every position on it is usable, and
three wrong numbers reached this repository in one day by being reasoned about
instead of generated and looked at.
"""

import unittest

from PIL import Image

from engine import dials


class FunTest(unittest.TestCase):
    def test_the_boring_end_lands_on_his_painting(self) -> None:
        # Shown five results he called the untouched painting the boring one.
        # So the bottom of the dial has to be near enough to no edit at all.
        far, _ = dials.fun(dials.FUN_LEAST)

        self.assertLessEqual(far, 0.3)

    def test_the_fun_end_takes_all_of_the_model(self) -> None:
        far, _ = dials.fun(dials.FUN_MOST)

        self.assertEqual(far, 1.0)

    def test_going_up_never_goes_back(self) -> None:
        # Both numbers move one way only. A dial that doubled back would be
        # untellable from a broken one.
        befores = [dials.fun(at) for at in range(0, 11)]
        for (far, push), (next_far, next_push) in zip(befores, befores[1:]):
            self.assertGreaterEqual(next_far, far)
            self.assertGreaterEqual(next_push, push)

    def test_forced_is_the_fun_end_and_not_the_boring_one(self) -> None:
        # The direction that was got backwards. High guidance is not obedient
        # and dull, it is burnt: hard edges, flat colour, speckle. That is the
        # lossy look he asked for.
        _, gentle = dials.fun(dials.FUN_LEAST)
        _, forced = dials.fun(dials.FUN_MOST)

        self.assertLess(gentle, forced)

    def test_it_stops_where_the_looking_stopped(self) -> None:
        # Seven is the highest that has been generated and looked at. The model
        # takes ten.
        _, forced = dials.fun(dials.FUN_MOST)

        self.assertLessEqual(forced, 7.0)

    def test_where_it_opens_is_where_he_said_he_likes_it(self) -> None:
        far, push = dials.fun(dials.FUN_USUALLY)

        self.assertEqual(far, 1.0)
        self.assertGreaterEqual(push, 4.0)
        self.assertGreater(dials.FUN_USUALLY, (dials.FUN_LEAST + dials.FUN_MOST) / 2)

    def test_past_either_end_is_the_end(self) -> None:
        self.assertEqual(dials.fun(-5), dials.fun(dials.FUN_LEAST))
        self.assertEqual(dials.fun(99), dials.fun(dials.FUN_MOST))

    def test_the_numbers_stay_inside_what_the_boxes_accept(self) -> None:
        # far is 0.1 to 1 and guidance 1 to 10 on the model itself.
        for at in range(0, 11):
            far, push = dials.fun(at)
            with self.subTest(at=at):
                self.assertTrue(0.1 <= far <= 1.0)
                self.assertTrue(1.0 <= push <= 10.0)


class ShapeTest(unittest.TestCase):
    def a_painting(self, size):
        return Image.new("RGB", size, (120, 110, 100))

    def test_keeping_it_changes_nothing(self) -> None:
        painting = self.a_painting((1000, 1060))

        self.assertIs(dials.cropped(painting, dials.KEEP), painting)

    def test_horizontal_is_the_widest_the_feed_shows_whole(self) -> None:
        cut = dials.cropped(self.a_painting((1000, 1060)), "horizontal")
        wide, high = cut.size

        self.assertAlmostEqual(wide / high, dials.WIDE, places=1)

    def test_a_still_goes_tall_for_the_feed_and_a_clip_for_reels(self) -> None:
        # Four to five is the tallest a feed picture may be; a reel is nine to
        # sixteen. They are different shapes and both are "vertical".
        still = dials.cropped(self.a_painting((1000, 1060)), "vertical", moving=False)
        clip = dials.cropped(self.a_painting((1000, 1060)), "vertical", moving=True)

        self.assertAlmostEqual(still.size[0] / still.size[1], dials.TALL_STILL, places=1)
        self.assertAlmostEqual(clip.size[0] / clip.size[1], dials.TALL_CLIP, places=1)
        self.assertNotEqual(still.size, clip.size)


    def test_nothing_is_ever_added(self) -> None:
        # Cropping, not framing. Neither side may grow.
        painting = self.a_painting((1000, 1060))
        for want in dials.SHAPES:
            for moving in (False, True):
                with self.subTest(want=want, moving=moving):
                    cut = dials.cropped(painting, want, moving)
                    self.assertLessEqual(cut.size[0], painting.size[0])
                    self.assertLessEqual(cut.size[1], painting.size[1])

    def test_a_panorama_keeps_a_strip_of_itself(self) -> None:
        # His 1999x447 landscape, to a reel. About an eighth of the width, and
        # it is worth a test because it is the surprising one.
        cut = dials.cropped(self.a_painting((1999, 447)), "vertical", moving=True)

        self.assertEqual(cut.size[1], 447)
        self.assertAlmostEqual(cut.size[0], 447 * dials.TALL_CLIP, delta=2)

    def test_every_shape_it_offers_can_be_asked_for(self) -> None:
        painting = self.a_painting((1000, 1060))
        for want in dials.SHAPES:
            with self.subTest(want=want):
                self.assertIsNotNone(dials.cropped(painting, want))

    def test_a_cropped_painting_is_one_the_model_will_draw(self) -> None:
        # Choosing a shape is the way past the refusal as well as a way to
        # frame, so every shape on offer has to land inside what it can draw.
        from engine.video import DRAWABLE, lopsidedness

        for size in ((1999, 447), (447, 1999), (1000, 1060)):
            for want in ("horizontal", "vertical"):
                for moving in (False, True):
                    with self.subTest(size=size, want=want, moving=moving):
                        cut = dials.cropped(self.a_painting(size), want, moving)
                        self.assertLessEqual(lopsidedness(cut.size), DRAWABLE)


if __name__ == "__main__":
    unittest.main()
