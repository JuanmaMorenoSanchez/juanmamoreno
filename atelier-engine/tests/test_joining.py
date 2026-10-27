"""
Several kept clips into one longer one.

The join exists because the model holds every frame of a clip in memory at
once, so a long clip is not a thing the card can make — it is made as several,
each carrying on from the last frame of the one before, and put together
afterwards. `scenes` does that inside one run; this does it to clips that were
kept, hours apart, and chosen by hand.

What is tested is the filter graph, because it is a string full of indices and
the way to discover one is wrong is otherwise to wait for ffmpeg to refuse it,
and then the join itself where ffmpeg is installed.
"""

import subprocess
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory

import numpy as np

from engine import video
from engine.nodes import GraphError


def a_clip(where: Path, frames: int = 12, size=(64, 48), shade: int = 90) -> Path:
    """A short clip of one flat colour, written the way the engine writes them."""
    wide, high = size
    made = [np.full((high, wide, 3), shade + at, dtype=np.uint8) for at in range(frames)]
    return video.write_video(made, where)


def ffmpeg_here() -> bool:
    try:
        video.ffmpeg()
        return True
    except FileNotFoundError:
        return False


class JoiningTest(unittest.TestCase):
    """The arguments, which can be checked without ffmpeg being installed."""

    def setUp(self) -> None:
        if not ffmpeg_here():
            self.skipTest("ffmpeg is not installed, so there is no binary to name")
        self.clips = [Path(f"{name}.mp4") for name in ("one", "two", "three")]
        self.out = Path("joined.mp4")

    def graph(self, clips) -> str:
        argv = video.joining(clips, self.out, (320, 240))
        return argv[argv.index("-filter_complex") + 1]

    def test_every_clip_is_an_input(self) -> None:
        argv = video.joining(self.clips, self.out, (320, 240))
        for clip in self.clips:
            self.assertIn(str(clip), argv)

    def test_the_first_clip_keeps_its_first_frame(self) -> None:
        # It is his painting, or the frame he started from. Trimming it would
        # cut the beginning of the film rather than a duplicate.
        first = self.graph(self.clips).split(";")[0]
        self.assertNotIn("trim", first)

    def test_every_clip_after_the_first_loses_its_first_frame(self) -> None:
        # Because a continued clip begins on the frame the one before it ended
        # on, and keeping both is a one-frame stutter at every join.
        for chain in self.graph(self.clips).split(";")[1:3]:
            with self.subTest(chain=chain):
                self.assertIn("trim=start_frame=1", chain)
                self.assertIn("setpts=PTS-STARTPTS", chain)

    def test_everything_is_scaled_to_the_shape_it_was_given(self) -> None:
        # The concat filter refuses inputs that disagree about their size, and
        # two clips off the shelf have no reason to agree.
        graph = self.graph(self.clips)
        self.assertEqual(graph.count("scale=320:240"), 3)

    def test_the_concat_takes_every_chain_in_order(self) -> None:
        graph = self.graph(self.clips)
        self.assertIn("[v0][v1][v2]concat=n=3:v=1:a=0[joined]", graph)

    def test_the_silence_is_the_input_after_the_clips(self) -> None:
        # Counted, not written down: an off-by-one here maps a clip's own track
        # as the audio and ffmpeg complains about a stream that has none.
        argv = video.joining(self.clips, self.out, (320, 240))
        self.assertEqual(argv[argv.index("-map", argv.index("-map") + 1) + 1], "3:a")
        self.assertIn("anullsrc=channel_layout=stereo:sample_rate=48000", argv)

    def test_the_rate_is_pinned(self) -> None:
        # The inputs carry their own timestamps through the concat filter, so a
        # clip written at another rate would make the join play at that speed.
        argv = video.joining(self.clips, self.out, (320, 240))
        self.assertEqual(argv[argv.index("-r") + 1], str(video.FPS))

    def test_one_clip_is_refused_rather_than_joined(self) -> None:
        with self.assertRaises(GraphError) as refused:
            video.joining(self.clips[:1], self.out, (320, 240))
        self.assertIn("two clips or more", str(refused.exception))

    def test_more_clips_than_it_will_take_are_refused(self) -> None:
        many = [Path(f"{at}.mp4") for at in range(video.MOST_CLIPS + 1)]
        with self.assertRaises(GraphError) as refused:
            video.joining(many, self.out, (320, 240))
        self.assertIn(str(video.MOST_CLIPS), str(refused.exception))


class JoinedTest(unittest.TestCase):
    """The join itself, which needs ffmpeg and produces a file."""

    def setUp(self) -> None:
        if not ffmpeg_here():
            self.skipTest("ffmpeg is not installed")

    def test_the_result_is_as_long_as_the_clips_it_was_made_of(self) -> None:
        with TemporaryDirectory() as folder:
            here = Path(folder)
            clips = [
                a_clip(here / "one.mp4", frames=13, shade=40),
                a_clip(here / "two.mp4", frames=13, shade=120),
            ]
            where = video.joined(clips, here / "both.mp4", (64, 48))

            self.assertTrue(where.is_file())
            self.assertGreater(where.stat().st_size, 0)

            # Thirteen and thirteen, less the second clip's first frame.
            self.assertEqual(self.frames_in(where), 25)

    def test_clips_of_different_shapes_are_joined_to_the_first_one(self) -> None:
        # The case the scale filter is there for: he cropped one clip to 9:16
        # and left the next one square, and without scaling ffmpeg refuses the
        # pair outright.
        with TemporaryDirectory() as folder:
            here = Path(folder)
            clips = [
                a_clip(here / "wide.mp4", frames=9, size=(64, 48)),
                a_clip(here / "tall.mp4", frames=9, size=(48, 64)),
            ]
            where = video.joined(clips, here / "both.mp4", (64, 48))
            self.assertEqual(self.shape_of(where), (64, 48))

    def frames_in(self, where: Path) -> int:
        """Counted by decoding, because ffprobe is a second binary to find."""
        ran = subprocess.run(
            [video.ffmpeg(), "-i", str(where), "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
            capture_output=True,
        )
        self.assertEqual(ran.returncode, 0, (ran.stderr or b"").decode("utf-8", "replace")[-400:])
        wide, high = self.shape_of(where)
        return len(ran.stdout) // (wide * high * 3)

    def shape_of(self, where: Path) -> tuple[int, int]:
        ran = subprocess.run([video.ffmpeg(), "-i", str(where)], capture_output=True)
        said = (ran.stderr or b"").decode("utf-8", "replace")
        import re

        found = re.search(r"(\d{2,5})x(\d{2,5})", said)
        self.assertIsNotNone(found, said[-400:])
        assert found is not None
        return int(found.group(1)), int(found.group(2))


class JoinEndpointTest(unittest.TestCase):
    """The http surface, which is how the page asks for a join."""

    def setUp(self) -> None:
        if not ffmpeg_here():
            self.skipTest("ffmpeg is not installed")
        from fastapi.testclient import TestClient

        from engine import service

        self.service = service
        self.client = TestClient(service.app)
        service.OUT.mkdir(exist_ok=True)

    def sending(self, clips, width=64, height=48):
        return self.client.post(
            "/join",
            files=[("clips", (f"{at}.mp4", path.read_bytes(), "video/mp4")) for at, path in enumerate(clips)],
            data={"width": str(width), "height": str(height)},
        )

    def test_two_clips_come_back_as_one_file(self) -> None:
        with TemporaryDirectory() as folder:
            here = Path(folder)
            clips = [
                a_clip(here / "one.mp4", frames=9, shade=30),
                a_clip(here / "two.mp4", frames=9, shade=150),
            ]
            answer = self.sending(clips)

            self.assertEqual(answer.status_code, 200)
            self.assertEqual(answer.headers["content-type"], "video/mp4")
            self.assertGreater(len(answer.content), sum(clip.stat().st_size for clip in clips) // 4)

    def test_nothing_is_left_behind(self) -> None:
        # A join is a file he is given, not a piece the engine holds. The
        # temporary folder used to be the only thing here that could outlive
        # the request.
        before = sorted(path.name for path in self.service.OUT.iterdir())
        with TemporaryDirectory() as folder:
            here = Path(folder)
            self.sending(
                [a_clip(here / "one.mp4", frames=9), a_clip(here / "two.mp4", frames=9)]
            )
        self.assertEqual(sorted(path.name for path in self.service.OUT.iterdir()), before)

    def test_one_clip_is_refused_with_a_reason(self) -> None:
        with TemporaryDirectory() as folder:
            answer = self.sending([a_clip(Path(folder) / "one.mp4", frames=9)])
            self.assertEqual(answer.status_code, 400)
            self.assertIn("two clips or more", answer.json()["detail"])

    def test_a_shape_that_was_not_sent_is_refused(self) -> None:
        with TemporaryDirectory() as folder:
            here = Path(folder)
            clips = [a_clip(here / "one.mp4", frames=9), a_clip(here / "two.mp4", frames=9)]
            answer = self.sending(clips, width=0, height=0)
            self.assertEqual(answer.status_code, 400)
            self.assertIn("shape", answer.json()["detail"])


if __name__ == "__main__":
    unittest.main()
