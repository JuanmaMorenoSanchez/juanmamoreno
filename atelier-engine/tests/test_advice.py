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
from engine.nodes import NUMERIC


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
        # A slider counts: it is a number that shows its band.
        for key, param in advised():
            with self.subTest(param=f"{key}.{param.name}"):
                self.assertIn(param.kind, NUMERIC)

    def test_what_is_left_to_advise_is_what_is_left_to_get_wrong(self) -> None:
        # Advice was for the slow models' numbers: a step count and a guidance
        # set badly cost the afternoon rather than a retry. Both are gone from
        # the boxes — worked out from the Fun dial and from what the card holds
        # — and a dial whose every position is usable has nothing to warn
        # about. What remains is how long a clip is, which still costs real
        # minutes per extra second.
        advised = {p.name for p in CATALOGUE["video"].params if p.advice}

        self.assertIn("seconds", advised)

    def test_the_dials_need_no_warning_because_every_place_on_them_works(self) -> None:
        # The test that would catch a dial being given a range nobody checked.
        for key in ("edit", "video", "scenes"):
            for name in ("fun", "shape"):
                found = [p for p in CATALOGUE[key].params if p.name == name]
                with self.subTest(node=key, param=name):
                    self.assertTrue(found, f"{key} has no {name}")
                    self.assertIsNone(found[0].advice)


if __name__ == "__main__":
    unittest.main()
