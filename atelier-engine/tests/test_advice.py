"""
What is wise about a number, as against what is merely allowed.

`minimum` and `maximum` are what a node will take at all. The advice is the
band it is worth being in, which is the question somebody setting a number
actually has: twelve steps runs and comes back mush, fifty runs for an hour
and looks like thirty-five.

The page draws these in red under the field, so what is tested here is that
they are coherent — inside the hard range, the right way round, with the
default inside them, and with a sentence attached. A band with no reason
printed beside it is a guess in red, which is worse than nothing.
"""

import unittest

from engine.catalogue import CATALOGUE


def advised():
    for key, node in CATALOGUE.items():
        for param in node.params:
            if param.advice is not None:
                yield key, param


class AdviceTest(unittest.TestCase):
    def test_there_is_some(self) -> None:
        self.assertTrue(list(advised()))

    def test_every_band_is_inside_what_the_node_accepts(self) -> None:
        # A warning at a number the field cannot hold could never be read.
        for key, param in advised():
            with self.subTest(param=f"{key}.{param.name}"):
                if param.advice.below is not None and param.minimum is not None:
                    self.assertGreater(param.advice.below, param.minimum)
                if param.advice.above is not None and param.maximum is not None:
                    self.assertLess(param.advice.above, param.maximum)

    def test_the_band_is_the_right_way_round(self) -> None:
        for key, param in advised():
            with self.subTest(param=f"{key}.{param.name}"):
                if param.advice.below is not None and param.advice.above is not None:
                    self.assertLess(param.advice.below, param.advice.above)

    def test_the_default_is_inside_its_own_band(self) -> None:
        # Otherwise every node arrives already complaining about itself.
        for key, param in advised():
            with self.subTest(param=f"{key}.{param.name}"):
                value = float(param.default)
                if param.advice.below is not None:
                    self.assertGreaterEqual(value, param.advice.below)
                if param.advice.above is not None:
                    self.assertLessEqual(value, param.advice.above)

    def test_every_edge_of_a_band_says_what_crossing_it_does(self) -> None:
        for key, param in advised():
            with self.subTest(param=f"{key}.{param.name}"):
                if param.advice.below is not None:
                    self.assertTrue(param.advice.low, "a low edge with nothing to say")
                if param.advice.above is not None:
                    self.assertTrue(param.advice.high, "a high edge with nothing to say")

    def test_nothing_is_advised_about_a_seed(self) -> None:
        # Every seed is as good as every other, and a number in red beside one
        # would be the page inventing a preference.
        for key, node in CATALOGUE.items():
            for param in node.params:
                if param.name == "seed":
                    with self.subTest(node=key):
                        self.assertIsNone(param.advice)

    def test_only_numbers_are_advised(self) -> None:
        for key, param in advised():
            with self.subTest(param=f"{key}.{param.name}"):
                self.assertEqual(param.kind, "number")

    def test_the_two_slow_models_are_both_advised(self) -> None:
        # The ones worth a warning at all: an edit is a hundred seconds a pass
        # and a clip is twenty minutes, so a number set badly here costs the
        # afternoon rather than a retry. There were three until Edit absorbed
        # My style, which was the same model with two reference images.
        for key in ("edit", "video"):
            with self.subTest(node=key):
                advice = {p.name for p in CATALOGUE[key].params if p.advice}
                self.assertIn("steps", advice)
                self.assertIn("guidance", advice)


if __name__ == "__main__":
    unittest.main()
