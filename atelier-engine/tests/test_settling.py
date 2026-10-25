"""
The opening moments every clip throws away, and why they are cut before decoding.

A **staged** clip opens with the model resolving a frame that was assembled
rather than photographed: the horizon sharpens, an easel appears under the
canvas, the ground finds its texture. So it is generated with that time on top
and handed back without it.

A **plain** clip is not trimmed, and the attempt to trim it is why these tests
say so explicitly. Measured on one of his landscapes, a plain opening looked
far worse than the staged case — brightness swinging between 40 and 131, whole
frames going near-black, no steadiness until frame 31. That painting is
1999x447, and the clip was not settling, it was being torn apart by its own
aspect ratio. Measured again on a near-square painting at thirty steps, the
opening is flat from the first frame. There is nothing there to cut.

**Cut as latents, before anything decodes them**, which is what ComfyUI's
`TrimVideoLatent` does and the reason it is a node at all: decoding is the step
that runs this card out of memory, so a frame thrown away after decoding has
been paid for twice.
"""

import unittest

import numpy as np
import torch
from PIL import Image

from engine import video


def latent_frames(frames: int) -> int:
    """How many latent frames a clip of this many frames occupies."""
    return (frames - 1) // 4 + 1


class SettlingTest(unittest.TestCase):
    def setUp(self) -> None:
        self.was = video._pipeline

        class FakePipeline:
            transformer = type("T", (), {"dtype": None})()

            def __call__(self, **kw):
                self.kw = kw
                # What the real one hands back now: latents, not pictures.
                return type(
                    "R",
                    (),
                    {
                        "frames": torch.zeros(
                            1, 16, latent_frames(kw["num_frames"]), kw["height"] // 16, kw["width"] // 16
                        )
                    },
                )()

        self.fake = FakePipeline()
        video._pipeline = lambda: self.fake
        self.embed_was = video.embed
        video.embed = lambda pipeline, said: FakeSaid()
        self.decoded_was = video.decoded
        # Stands in for the decoder, at its real ratio: n latent frames come
        # back as (n - 1) * 4 + 1 pictures.
        video.decoded = lambda pipeline, latents: np.zeros(
            ((latents.shape[2] - 1) * 4 + 1, 8, 8, 3), dtype=np.float32
        )

    def tearDown(self) -> None:
        video._pipeline = self.was
        video.embed = self.embed_was
        video.decoded = self.decoded_was

    def made(self, **kw) -> list:
        # Near square on purpose. These tests are about the settling time, and
        # a painting lopsided enough to be refused for its shape would stop
        # them before they got to it.
        return video.animate(Image.new("RGB", (480, 832)), "it moves", **kw)

    # --- a staged clip ---

    def test_a_staged_clip_is_generated_longer_and_handed_back_short(self) -> None:
        frames = self.made(seconds=4.0, in_a_scene=True)

        self.assertEqual(
            self.fake.kw["num_frames"],
            video.frames_for(4.0) + 4 * video.latents_to_drop(video.SETTLES),
        )
        self.assertEqual(len(frames), video.frames_for(4.0))

    # --- a plain one, which is the part that was missing ---

    def test_a_plain_clip_is_not_trimmed(self) -> None:
        # Measured on a near-square painting of his at thirty steps, a plain
        # clip's opening is flat from the first frame — change of 0.1 to 1.0,
        # brightness steady. There is nothing there to cut, and cutting would
        # cost twenty-eight generated-and-discarded frames.
        frames = self.made(seconds=3.5)

        self.assertEqual(self.fake.kw["num_frames"], video.frames_for(3.5))
        self.assertEqual(len(frames), video.frames_for(3.5))

    def test_the_settling_is_generated_and_so_it_is_paid_for(self) -> None:
        # The frames cut off are made before they are cut, and frames are the
        # scarce thing here — `afford` counts them. So a trimmed clip of a
        # given length costs more card than an untrimmed one did, which is
        # part of why it is paid only where it buys something.

        self.made(seconds=3.0, in_a_scene=True)
        self.assertEqual(
            self.fake.kw["num_frames"],
            video.frames_for(3.0) + 4 * video.latents_to_drop(video.SETTLES),
        )

    def test_only_the_staged_one_pays_for_settling(self) -> None:
        # A plain clip was briefly trimmed too, on a measurement taken from a
        # panorama that was being torn apart by its aspect ratio rather than
        # settling. See `DRAWABLE`.
        self.made(seconds=3.0)
        plain_at = self.fake.kw["num_frames"]
        self.made(seconds=3.0, in_a_scene=True)

        self.assertLess(plain_at, self.fake.kw["num_frames"])

    # --- what the length means ---

    def test_what_comes_back_is_the_length_that_was_asked_for(self) -> None:
        # Trimming after the fact lost a fraction of a second to rounding,
        # because time is compressed four to one and the trim has to land on a
        # latent frame. Deciding the trim first and growing the clip by exactly
        # that much gives the length back whole.
        for seconds in (3.0, 3.5):
            for staged in (False, True):
                with self.subTest(seconds=seconds, staged=staged):
                    frames = self.made(seconds=seconds, in_a_scene=staged)
                    self.assertEqual(len(frames), video.frames_for(seconds))

    def test_the_clip_still_clears_the_three_seconds_instagram_wants(self) -> None:
        # A clip under three seconds is refused at the point of publishing,
        # after the twenty minutes of making it.
        for staged in (False, True):
            with self.subTest(staged=staged):
                frames = self.made(seconds=3.0, in_a_scene=staged)

                self.assertGreaterEqual(len(frames) / video.FPS, 3.0)

    def test_asking_for_less_than_the_floor_still_clears_it(self) -> None:
        frames = self.made(seconds=1.0)

        self.assertGreaterEqual(len(frames) / video.FPS, 3.0)


class LatentsToDropTest(unittest.TestCase):
    """
    How many latent frames a stretch of seconds is.

    Coarse on purpose: time is compressed four to one, so one latent frame is
    a sixth of a second at twenty-four and nothing finer can be asked for.
    ComfyUI lives with the same granularity for the same reason.
    """

    def test_no_settling_drops_nothing(self) -> None:
        self.assertEqual(video.latents_to_drop(0), 0)

    def test_a_sixth_of_a_second_is_one_latent_frame(self) -> None:
        self.assertEqual(video.latents_to_drop(4 / video.FPS), 1)

    def test_a_twentieth_of_a_second_rounds_away_to_nothing(self) -> None:
        # Worth stating rather than discovering: a trim finer than a latent
        # frame is not a small trim, it is no trim.
        self.assertEqual(video.latents_to_drop(0.05), 0)

    def test_it_never_cuts_more_than_it_was_told_to(self) -> None:
        # Rounded down, not to nearest. A second and a quarter is seven and a
        # half latent frames; taking eight would generate four frames that are
        # thrown away, which is enough to push a staged three-second clip past
        # what the card has been measured to hold.
        for seconds in (0.3, 0.5, 1.0, 1.25, 2.0):
            with self.subTest(seconds=seconds):
                self.assertLessEqual(video.latents_to_drop(seconds) * 4 / video.FPS, seconds)

    def test_the_settling_time_is_whole_latent_frames(self) -> None:
        self.assertGreater(video.latents_to_drop(video.SETTLES), 0)

    def test_nothing_negative_comes_out_of_it(self) -> None:
        self.assertEqual(video.latents_to_drop(-1.0), 0)


class FakeSaid:
    def to(self, **kw):
        return self

    def __getitem__(self, item):
        return self


if __name__ == "__main__":
    unittest.main()
