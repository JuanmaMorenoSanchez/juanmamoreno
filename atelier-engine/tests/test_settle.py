"""
Settings checked against what the box accepts, before anything runs.

The engine used to take whatever arrived. A number field draws `min` and `max`
and a browser enforces neither, so twelve seconds reached a video node whose
maximum is five and asked the card for nineteen gigabytes, and a guidance of
fifty reached an editor built for ten — which is how a run comes back as a
black rectangle, because that is what a diffusion model does when its guidance
pushes the latents past what the numbers can hold.

Neither is a mistake a person should be able to make by typing. The thing that
knows the range is the thing that has to check it.
"""

import unittest

from engine.catalogue import CATALOGUE
from engine.nodes import GraphError, NodeType, Param, Port, run_graph, settle


def a_box(*params: Param) -> NodeType:
    return NodeType(
        key="box",
        label="Box",
        category="test",
        summary="a box with settings",
        outputs=[Port("value", "number")],
        params=list(params),
        run=lambda inputs, params, context: {"value": params},
    )


class SettleTest(unittest.TestCase):
    def test_what_is_not_given_falls_back_to_the_default(self) -> None:
        kind = a_box(Param("steps", "number", 20, minimum=4, maximum=50, step=1))

        self.assertEqual(settle(kind, {})["steps"], 20)

    def test_a_number_inside_the_range_is_kept(self) -> None:
        kind = a_box(Param("steps", "number", 20, minimum=4, maximum=50, step=1))

        self.assertEqual(settle(kind, {"steps": 30})["steps"], 30)

    def test_a_number_over_the_maximum_is_refused_with_the_range(self) -> None:
        kind = a_box(Param("seconds", "number", 3.0, label="How long", minimum=3.0, maximum=5.0))

        with self.assertRaises(GraphError) as refused:
            settle(kind, {"seconds": 12})

        self.assertIn("How long", str(refused.exception))
        self.assertIn("12", str(refused.exception))
        self.assertIn("5", str(refused.exception))

    def test_a_number_under_the_minimum_is_refused(self) -> None:
        kind = a_box(Param("steps", "number", 20, minimum=4, maximum=50, step=1))

        with self.assertRaises(GraphError):
            settle(kind, {"steps": 1})

    def test_something_that_is_not_a_number_is_refused(self) -> None:
        kind = a_box(Param("steps", "number", 20, minimum=4, maximum=50, step=1))

        for nonsense in ("lots", None, [], float("nan"), float("inf")):
            with self.subTest(given=nonsense):
                with self.assertRaises(GraphError):
                    settle(kind, {"steps": nonsense})

    def test_a_whole_number_stays_whole(self) -> None:
        # A step count of 20.0 reaching the model reads as a bug in the page.
        kind = a_box(Param("steps", "number", 20, minimum=4, maximum=50, step=1))

        self.assertIsInstance(settle(kind, {"steps": "30"})["steps"], int)

    def test_a_fractional_setting_stays_fractional(self) -> None:
        kind = a_box(Param("guidance", "number", 4.0, minimum=1, maximum=10, step=0.5))

        self.assertEqual(settle(kind, {"guidance": 4.5})["guidance"], 4.5)

    def test_a_choice_it_does_not_have_is_refused_with_the_ones_it_does(self) -> None:
        kind = a_box(Param("style", "choice", "none", choices=("none", "oil")))

        with self.assertRaises(GraphError) as refused:
            settle(kind, {"style": "acrylic"})

        self.assertIn("acrylic", str(refused.exception))
        self.assertIn("oil", str(refused.exception))

    def test_a_toggle_takes_whatever_shape_the_page_sent(self) -> None:
        kind = a_box(Param("small", "toggle", False))

        self.assertIs(settle(kind, {"small": "true"})["small"], True)
        self.assertIs(settle(kind, {"small": 0})["small"], False)

    def test_a_setting_the_box_has_never_heard_of_is_dropped(self) -> None:
        # A saved graph outlives the engine that drew it, and an old spelling
        # is not worth a dead end.
        kind = a_box(Param("steps", "number", 20, minimum=4, maximum=50, step=1))

        self.assertEqual(settle(kind, {"paces": 9}), {"steps": 20})


class RunGraphTest(unittest.TestCase):
    def test_a_bad_number_stops_the_graph_before_any_box_runs(self) -> None:
        # Four minutes of model loading happen in the first box. A number that
        # cannot work has to be caught before that, not after it.
        ran: list[str] = []
        kind = NodeType(
            key="box",
            label="Box",
            category="test",
            summary="notes that it ran",
            outputs=[Port("value", "number")],
            params=[Param("steps", "number", 20, minimum=4, maximum=50, step=1)],
            run=lambda inputs, params, context: ran.append("yes") or {"value": 1},
        )

        with self.assertRaises(GraphError):
            run_graph({"box": kind}, {"a": {"type": "box", "params": {"steps": 900}}}, [])

        self.assertEqual(ran, [])

    def test_the_real_catalogue_refuses_the_numbers_that_broke_it(self) -> None:
        # The two from the failures: twelve seconds into a five-second field,
        # and a guidance of fifty into one built for ten.
        for setting, value in (("seconds", 12), ("guidance", 50), ("longest", 2000)):
            with self.subTest(setting=setting):
                with self.assertRaises(GraphError):
                    settle(CATALOGUE["video"], {setting: value})


if __name__ == "__main__":
    unittest.main()
