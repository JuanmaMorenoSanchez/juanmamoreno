"""
A painting and a sentence into a few seconds of video.

The model itself is not exercised here — it is 5.4 GB of weights streamed off
the disk and takes the better part of an hour. What is tested is everything
around it that can be wrong silently: the frame arithmetic the scheduler
refuses, the size a 3652-pixel painting has to become, the mp4 that comes out,
and above all the prompt embedding, which is the one place in this engine that
copies a library's internals instead of calling them.
"""

import subprocess
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory

import numpy as np
from PIL import Image

from engine import video
from engine.nodes import GraphError


class FramesForTest(unittest.TestCase):
    """Wan's VAE compresses time four to one, so a count must be 4n+1."""

    def test_every_answer_is_one_the_latent_can_divide(self) -> None:
        for seconds in (0.5, 1, 1.5, 2, 2.5, 3, 4, 5):
            with self.subTest(seconds=seconds):
                self.assertEqual((video.frames_for(seconds) - 1) % 4, 0)

    def test_lands_near_what_was_asked_for(self) -> None:
        # Flooring turned every "2 seconds" into 1.88, which is a worse answer
        # than 2.04 and harder to explain. Only above the floor, since below it
        # the answer is deliberately not what was asked for.
        for seconds in (3, 3.5, 4, 5):
            with self.subTest(seconds=seconds):
                got = video.frames_for(seconds) / video.FPS
                self.assertLess(abs(got - seconds), 1 / video.FPS * 2.5)

    def test_never_goes_below_the_three_seconds_instagram_wants(self) -> None:
        # A hard floor in every case. A shorter clip is refused at the point of
        # publishing, which is after twenty-odd minutes of making it.
        for seconds in (0.01, 0.5, 1, 2, 2.9):
            with self.subTest(seconds=seconds):
                self.assertGreaterEqual(
                    video.frames_for(seconds) / video.FPS, video.LEAST_SECONDS
                )


class FitTest(unittest.TestCase):
    def test_brings_a_painting_down_to_something_the_card_can_hold(self) -> None:
        # The real thing: painting 6 is 3652 x 4533.
        wide, high = video.fit(Image.new("RGB", (3652, 4533)), longest=832)

        self.assertEqual(max(wide, high), 832)

    def test_every_side_is_a_multiple_of_the_stride(self) -> None:
        # Not cosmetic, and not sixteen: the VAE compresses by eight and the
        # transformer patchifies in pairs on top of that, so anything else is
        # quietly adjusted — "Adjusting (464, 832) -> (448, 832)" — and the
        # clip comes out a different shape from the one computed for it.
        for size in [(3652, 4533), (1000, 1000), (1920, 1080), (37, 913)]:
            with self.subTest(size=size):
                wide, high = video.fit(Image.new("RGB", size))
                self.assertEqual((wide % video.STRIDE, high % video.STRIDE), (0, 0))

    def test_keeps_the_shape_of_the_painting(self) -> None:
        wide, high = video.fit(Image.new("RGB", (4000, 3000)), longest=832)

        self.assertAlmostEqual(wide / high, 4000 / 3000, places=1)

    def test_it_is_not_the_size_the_clip_comes_out_at(self) -> None:
        # Both sides rounded to sixteens is a different rectangle from the one
        # he painted. `shown` is where that is put right.
        painting = Image.new("RGB", (3652, 4533))
        wide, high = video.fit(painting, longest=832)

        self.assertNotAlmostEqual(wide / high, 3652 / 4533, places=3)

    def test_never_returns_nothing(self) -> None:
        wide, high = video.fit(Image.new("RGB", (4000, 4)), longest=832)

        self.assertGreaterEqual(min(wide, high), 16)


class TidyTest(unittest.TestCase):
    """What `ftfy` would have done, minus the part that needed it."""

    def test_collapses_whitespace_the_way_the_library_does(self) -> None:
        self.assertEqual(video.tidy("  the light   shifts\n\n dust drifts "), "the light shifts dust drifts")

    def test_unescapes_twice(self) -> None:
        # diffusers unescapes twice, because a prompt pasted out of a web page
        # can carry double-encoded entities.
        self.assertEqual(video.tidy("dust &amp;amp; light"), "dust & light")

    def test_leaves_ordinary_prose_alone(self) -> None:
        said = "the light shifts slowly across her face"

        self.assertEqual(video.tidy(said), said)


class FfmpegTest(unittest.TestCase):
    def test_finds_it(self) -> None:
        # Installed once with winget rather than vendored as a Python package,
        # which is the whole reason this engine can write an mp4 at all.
        self.assertTrue(Path(video.ffmpeg()).exists())

    def test_writes_a_clip_that_a_player_will_open(self) -> None:
        frames = []
        for i in range(9):
            frame = np.zeros((64, 96, 3), dtype=np.uint8)
            frame[:, :, 0] = 20 * i
            frame[20:40, i * 4 : i * 4 + 20] = 255
            frames.append(frame)

        with TemporaryDirectory() as folder:
            where = video.write_video(frames, Path(folder) / "clip.mp4", fps=8)

            self.assertTrue(where.exists())
            self.assertGreater(where.stat().st_size, 0)

            # Asked of ffprobe rather than assumed: a file with an mp4 name
            # that no player will open is the failure worth catching.
            # Its neighbour, not a string substitution: the installed path is
            # ...\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe, and replacing the
            # name replaces the folder's too.
            binary = Path(video.ffmpeg())
            probe = subprocess.run(
                [
                    str(binary.with_name("ffprobe" + binary.suffix)),
                    "-v", "error",
                    "-select_streams", "v:0",
                    "-show_entries", "stream=codec_name,width,height,nb_read_frames",
                    "-count_frames",
                    "-of", "csv=p=0",
                    str(where),
                ],
                capture_output=True,
                text=True,
            )
            self.assertEqual(probe.returncode, 0, probe.stderr)
            said = probe.stdout.strip().split(",")
            self.assertEqual(said[0], "h264")
            self.assertEqual((said[1], said[2]), ("96", "64"))
            self.assertEqual(said[3], "9", "not every frame reached the file")

    def test_refuses_an_empty_clip_rather_than_writing_one(self) -> None:
        with TemporaryDirectory() as folder:
            with self.assertRaises(ValueError):
                video.write_video([], Path(folder) / "clip.mp4")


class EmbedTest(unittest.TestCase):
    """The one place here that copies a library instead of calling it.

    `embed` exists so the engine needs no `ftfy`, which diffusers wants only to
    repair mojibake in a prompt — and these prompts are typed into a form and
    arrive as UTF-8. The risk of hand-rolling it is not a crash; it is masking
    done slightly differently, which would degrade every clip and say nothing.

    So it is compared against diffusers' own `_get_t5_prompt_embeds`, with the
    cleaner it cannot run stubbed out. A release that changes the masking fails
    here instead.
    """

    def setUp(self) -> None:
        try:
            import torch  # noqa: F401
            from diffusers.pipelines.wan import pipeline_wan_i2v  # noqa: F401
        except Exception as why:  # pragma: no cover - environment, not behaviour
            self.skipTest(f"diffusers is not importable here: {why}")

    def test_matches_what_the_pipeline_would_have_produced(self) -> None:
        import torch
        from diffusers.pipelines.wan import pipeline_wan_i2v

        said = ["the light shifts slowly", "static, blurred detail, worst quality"]
        length = 32
        hidden = 8

        class Tokeniser:
            def __call__(self, prompts, **kw):
                ids = torch.zeros((len(prompts), kw["max_length"]), dtype=torch.long)
                mask = torch.zeros((len(prompts), kw["max_length"]), dtype=torch.long)
                for row, text in enumerate(prompts):
                    # A token per word, which is enough to give the two prompts
                    # different real lengths — which is what masking is about.
                    count = min(len(text.split()), kw["max_length"])
                    ids[row, :count] = torch.arange(1, count + 1)
                    mask[row, :count] = 1
                return type("Batch", (), {"input_ids": ids, "attention_mask": mask})()

        class Encoder:
            dtype = torch.float32

            def parameters(self):
                # `embed` reads the device off the weights rather than off the
                # pipeline, because in this engine the encoder is the one part
                # that stays on the processor.
                yield torch.zeros(1)

            def __call__(self, ids, mask):
                # Deterministic and position-dependent, so a wrong trim shows.
                rows = ids.unsqueeze(-1).float() * torch.arange(1, hidden + 1).float()
                return type("Out", (), {"last_hidden_state": rows + 0.5})()

        class Pipe:
            tokenizer = Tokeniser()
            text_encoder = Encoder()
            _execution_device = torch.device("cpu")

            # The real method, bound to this stand-in.
            _get_t5_prompt_embeds = pipeline_wan_i2v.WanImageToVideoPipeline._get_t5_prompt_embeds

        pipe = Pipe()
        mine = video.embed(pipe, said, length=length)

        # The library's path, with only the ftfy-dependent cleaner replaced.
        was = pipeline_wan_i2v.prompt_clean
        pipeline_wan_i2v.prompt_clean = video.tidy
        try:
            theirs = pipe._get_t5_prompt_embeds(said, max_sequence_length=length)
        finally:
            pipeline_wan_i2v.prompt_clean = was

        self.assertEqual(mine.shape, theirs.shape)
        self.assertTrue(torch.equal(mine, theirs), "the embeddings differ from diffusers' own")

    def test_pads_every_prompt_to_the_same_length(self) -> None:
        import torch

        class Tokeniser:
            def __call__(self, prompts, **kw):
                ids = torch.zeros((len(prompts), kw["max_length"]), dtype=torch.long)
                mask = torch.zeros((len(prompts), kw["max_length"]), dtype=torch.long)
                ids[0, :3] = torch.tensor([1, 2, 3])
                mask[0, :3] = 1
                ids[1, :7] = torch.arange(1, 8)
                mask[1, :7] = 1
                return type("Batch", (), {"input_ids": ids, "attention_mask": mask})()

        class Encoder:
            dtype = torch.float32

            def parameters(self):
                yield torch.zeros(1)

            def __call__(self, ids, mask):
                return type("Out", (), {"last_hidden_state": ids.unsqueeze(-1).float() + 1})()

        class Pipe:
            tokenizer = Tokeniser()
            text_encoder = Encoder()
            _execution_device = torch.device("cpu")

        got = video.embed(Pipe(), ["three words here", "a prompt of rather more words"], length=16)

        self.assertEqual(got.shape[:2], (2, 16))
        # Everything past each prompt's own length is zero, not the encoder's
        # opinion of the padding tokens.
        self.assertTrue(torch.all(got[0, 3:] == 0))
        self.assertTrue(torch.all(got[1, 7:] == 0))
        self.assertFalse(torch.all(got[1, :7] == 0))


if __name__ == "__main__":
    unittest.main()


class ShownTest(unittest.TestCase):
    """The size a clip is written at, which is the painting's and not the model's.

    Nothing in the atelier changes the shape of a painting unless he asks it
    to. The model's size has to be a multiple of sixteen and a painting's
    shape almost never is, so the two are separated: generated at the size the
    model takes, written at the shape it was painted.
    """

    painting = Image.new("RGB", (3652, 4533))
    generated = (672, 832)

    def test_it_keeps_the_shape_of_the_painting(self) -> None:
        wide, high = video.shown(self.painting, self.generated)

        self.assertAlmostEqual(wide / high, 3652 / 4533, places=3)

    def test_it_stays_near_the_size_that_was_generated(self) -> None:
        # Neither upscaled to the painting's three and a half thousand pixels
        # nor shrunk below what the model made.
        wide, high = video.shown(self.painting, self.generated)

        self.assertEqual(max(wide, high), max(self.generated))

    def test_a_typed_width_brings_the_height_with_it(self) -> None:
        wide, high = video.shown(self.painting, self.generated, width=1080)

        self.assertEqual(wide, 1080)
        self.assertAlmostEqual(wide / high, 3652 / 4533, places=2)

    def test_a_typed_height_brings_the_width_with_it(self) -> None:
        wide, high = video.shown(self.painting, self.generated, height=1920)

        self.assertEqual(high, 1920)
        self.assertAlmostEqual(wide / high, 3652 / 4533, places=2)

    def test_both_typed_are_both_obeyed(self) -> None:
        # Including a shape he never painted, because that is what typing both
        # means.
        self.assertEqual(video.shown(self.painting, self.generated, 1080, 1920), (1080, 1920))

    def test_every_side_is_even_because_h264_requires_it(self) -> None:
        for painting, want in [((999, 1777), None), ((1001, 1003), None), ((3652, 4533), None)]:
            with self.subTest(painting=painting):
                wide, high = video.shown(Image.new("RGB", painting), self.generated)
                self.assertEqual((wide % 2, high % 2), (0, 0), want)

    def test_an_odd_typed_size_is_brought_down_to_even(self) -> None:
        self.assertEqual(video.shown(self.painting, self.generated, 1081, 1921), (1080, 1920))

    def test_never_returns_nothing(self) -> None:
        wide, high = video.shown(Image.new("RGB", (0, 0)), self.generated)

        self.assertGreaterEqual(min(wide, high), 2)


class AffordTest(unittest.TestCase):
    """What the card can hold, decided before the model is loaded.

    Twelve seconds at 1200 asked for 2.53 GiB it did not have and the card's
    own words were four lines of allocator arithmetic and a link to the
    PyTorch docs. What is needed instead is which two numbers to lower.

    The line comes from one measured point — three seconds at 832, which every
    default here points at — and twice it, which is a judgement. `animate`
    catches the card running out anyway, because a line drawn from one point
    will be wrong somewhere.
    """

    painting = Image.new("RGB", (3652, 4533))

    def allowed(self, seconds: float, longest: int) -> bool:
        wide, high = video.fit(self.painting, longest)
        try:
            video.afford(video.frames_for(seconds), wide, high)
            return True
        except GraphError:
            return False

    def test_the_measured_combination_is_allowed(self) -> None:
        self.assertTrue(self.allowed(3, 832))

    def test_the_longest_clip_at_the_default_size_is_allowed(self) -> None:
        self.assertTrue(self.allowed(5, 832))

    def test_the_biggest_size_is_refused_even_at_three_seconds(self) -> None:
        self.assertFalse(self.allowed(3, 1280))

    def test_it_says_which_numbers_to_lower(self) -> None:
        wide, high = video.fit(self.painting, 1280)
        with self.assertRaises(GraphError) as refused:
            video.afford(video.frames_for(5), wide, high)

        said = str(refused.exception)
        self.assertIn("frames", said)
        self.assertIn("Three seconds at 832", said)
        self.assertIn("Lower the seconds first", said)

    def test_it_refuses_before_anything_is_loaded(self) -> None:
        # The point of the check. `afford` touches no model and no card: it is
        # arithmetic on three numbers, callable without a GPU, which is why
        # this test can run at all.
        video.afford(73, 672, 832)
