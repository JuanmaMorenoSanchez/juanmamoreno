"""
The moments where the staging becomes a place, and why they are dropped.

The first frames of a staged clip are the model resolving a frame that was
assembled rather than photographed: the horizon sharpens, an easel appears
under the canvas, the ground finds its texture. It is not motion anybody asked
for. So the clip is generated with that time on top and handed back without it.
"""

import unittest

import numpy as np
from PIL import Image

from engine import video


class SettlingTest(unittest.TestCase):
    def setUp(self) -> None:
        self.asked: dict = {}
        self.was = video._pipeline

        class FakePipeline:
            transformer = type("T", (), {"dtype": None})()

            def __call__(self, **kw):
                self.kw = kw
                frames = np.zeros((kw["num_frames"], kw["height"], kw["width"], 3), dtype=np.float32)
                return type("R", (), {"frames": [frames]})()

        self.fake = FakePipeline()
        video._pipeline = lambda: self.fake
        self.embed_was = video.embed
        video.embed = lambda pipeline, said: FakeSaid()

    def tearDown(self) -> None:
        video._pipeline = self.was
        video.embed = self.embed_was

    def test_a_staged_clip_is_generated_longer_and_handed_back_short(self) -> None:
        frames = video.animate(Image.new("RGB", (400, 832)), "it moves", seconds=4.0, in_a_scene=True)

        # Generated with the settling time, delivered without it.
        self.assertEqual(self.fake.kw["num_frames"], video.frames_for(4.0 + video.SETTLES))
        self.assertEqual(
            len(frames),
            video.frames_for(4.0 + video.SETTLES) - round(video.SETTLES * video.FPS),
        )

    def test_it_never_trims_below_the_three_seconds_instagram_wants(self) -> None:
        # Asked for the floor itself, the settling can only be trimmed as far
        # as the floor — a clip under three seconds is refused at the point of
        # publishing, after the twenty minutes of making it.
        frames = video.animate(Image.new("RGB", (400, 832)), "it moves", seconds=3.0, in_a_scene=True)

        self.assertEqual(len(frames), video.frames_for(3.0))

    def test_the_clip_still_clears_the_three_seconds_instagram_wants(self) -> None:
        frames = video.animate(Image.new("RGB", (400, 832)), "it moves", seconds=3.0, in_a_scene=True)

        self.assertGreaterEqual(len(frames) / video.FPS, 3.0)

    def test_an_unstaged_clip_is_untouched(self) -> None:
        frames = video.animate(Image.new("RGB", (400, 832)), "it moves", seconds=3.0)

        self.assertEqual(self.fake.kw["num_frames"], video.frames_for(3.0))
        self.assertEqual(len(frames), video.frames_for(3.0))


class FakeSaid:
    def to(self, **kw):
        return self

    def __getitem__(self, at):
        return self


if __name__ == "__main__":
    unittest.main()
