"""
A clip in several scenes, each carrying on from the last frame of the one before.

The model holds every frame of a clip in memory at once, so a single pass stops
at five seconds on an eight-gigabyte card. Each scene here is its own pass at
the cost of one clip, and the frames are joined — which makes length a question
of patience rather than of memory, and costs faithfulness instead: every hop
starts from a frame the model drew rather than from the painting.

The model is replaced here. What is tested is the chaining: where each scene
starts, how the frames are joined, how the seed walks, and what it refuses.
"""

import unittest

import numpy as np
from PIL import Image

from engine import video
from engine.nodes import GraphError


class ScenesTest(unittest.TestCase):
    def setUp(self) -> None:
        self.calls: list[dict] = []
        self.was = video.animate

        def fake_animate(painting, prompt, **kw):
            self.calls.append({"from": painting, "prompt": prompt, **kw})
            # Five frames, each a different flat colour, so a join can be seen.
            at = len(self.calls)
            return [np.full((4, 4, 3), at * 10 + n, dtype=np.uint8) for n in range(5)]

        video.animate = fake_animate

    def tearDown(self) -> None:
        video.animate = self.was

    def painting(self) -> Image.Image:
        return Image.new("RGB", (64, 80), (7, 7, 7))

    def test_one_pass_per_scene(self) -> None:
        video.scenes(self.painting(), ["she turns", "the light fails", "it goes dark"])

        self.assertEqual(len(self.calls), 3)
        self.assertEqual([call["prompt"] for call in self.calls],
                         ["she turns", "the light fails", "it goes dark"])

    def test_the_first_scene_starts_from_the_painting(self) -> None:
        painting = self.painting()

        video.scenes(painting, ["she turns"])

        self.assertIs(self.calls[0]["from"], painting)

    def test_every_other_scene_starts_from_the_last_frame_before_it(self) -> None:
        # The whole mechanism. The second pass is handed the final frame of the
        # first, which is what makes the join continuous rather than a cut.
        video.scenes(self.painting(), ["one", "two"])

        started = np.asarray(self.calls[1]["from"])
        self.assertEqual(int(started[0, 0, 0]), 14)

    def test_the_join_does_not_repeat_a_frame(self) -> None:
        # The first frame of a scene is the last frame of the one before, which
        # it was told to start from. Kept twice, the film stutters on every
        # join.
        frames = video.scenes(self.painting(), ["one", "two"])

        self.assertEqual(len(frames), 5 + 4)
        self.assertNotEqual(int(frames[4][0, 0, 0]), int(frames[5][0, 0, 0]))

    def test_the_seed_walks_with_the_scenes(self) -> None:
        # One seed for all of them makes every scene the same motion; and
        # walking means changing a later sentence does not reroll the ones
        # before it.
        video.scenes(self.painting(), ["one", "two", "three"], seed=7)

        self.assertEqual([call["seed"] for call in self.calls], [7, 8, 9])

    def test_every_other_setting_is_the_same_in_every_scene(self) -> None:
        video.scenes(self.painting(), ["one", "two"], seconds=4.0, steps=25, guidance=6.0, longest=960)

        for call in self.calls:
            with self.subTest(prompt=call["prompt"]):
                self.assertEqual(call["seconds"], 4.0)
                self.assertEqual(call["steps"], 25)
                self.assertEqual(call["guidance"], 6.0)
                self.assertEqual(call["longest"], 960)

    def test_blank_lines_are_not_scenes(self) -> None:
        # What a textarea gives back when somebody presses return twice.
        video.scenes(self.painting(), ["one", "   ", "", "two"])

        self.assertEqual([call["prompt"] for call in self.calls], ["one", "two"])

    def test_no_scenes_at_all_is_refused_with_how_to_write_them(self) -> None:
        with self.assertRaises(GraphError) as refused:
            video.scenes(self.painting(), ["  ", ""])

        self.assertIn("one sentence per scene", str(refused.exception))
        self.assertEqual(self.calls, [])

    def test_more_scenes_than_it_will_chain_is_refused_before_any_run(self) -> None:
        # Not memory: each scene costs what one clip costs. It is the drift —
        # by the fourth hop the paint is a copy of a copy.
        with self.assertRaises(GraphError) as refused:
            video.scenes(self.painting(), [f"scene {n}" for n in range(video.MOST_SCENES + 1)])

        self.assertIn("copy of a copy", str(refused.exception))
        self.assertEqual(self.calls, [])

    def test_it_says_which_scene_it_is_on(self) -> None:
        # Minutes per scene: six scenes is an afternoon, and a progress note
        # that says nothing is indistinguishable from a hang.
        said: list[str | None] = []
        video.scenes(self.painting(), ["she turns", "the light fails"], saying=said.append)

        self.assertIn("scene 1 of 2", said[0] or "")
        self.assertIn("she turns", said[0] or "")
        self.assertIn("scene 2 of 2", said[1] or "")


if __name__ == "__main__":
    unittest.main()
