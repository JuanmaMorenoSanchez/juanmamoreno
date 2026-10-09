"""
Running a graph, and refusing one that cannot be run.

A node editor makes it very easy to draw something impossible — a loop, a port
with nothing joined to it, a node whose upstream produced something else. Every
one of those has to come back as a sentence rather than as a hang or a
traceback, because the person reading it is looking at a picture of boxes and
needs to know which box to move.
"""

import unittest

from engine.nodes import GraphError, NodeType, Param, Port, order, run_graph


def doubling() -> NodeType:
    return NodeType(
        key="double",
        label="Double",
        category="test",
        summary="twice what came in",
        inputs=[Port("value", "number")],
        outputs=[Port("value", "number")],
        run=lambda inputs, params, context: {"value": inputs["value"] * 2},
    )


def source(value: int = 1) -> NodeType:
    return NodeType(
        key="source",
        label="Source",
        category="test",
        summary="a number from nowhere",
        outputs=[Port("value", "number")],
        params=[Param("value", "number", value)],
        run=lambda inputs, params, context: {"value": params["value"]},
    )


CATALOGUE = {"double": doubling(), "source": source()}


class OrderTest(unittest.TestCase):
    def test_a_chain_runs_from_its_start(self) -> None:
        got = order({"a": "source", "b": "double"}, [("a", "value", "b", "value")])

        self.assertEqual(got, ["a", "b"])

    def test_nodes_joined_to_nothing_still_run(self) -> None:
        got = order({"a": "source", "b": "source"}, [])

        self.assertEqual(sorted(got), ["a", "b"])


class CircleTest(unittest.TestCase):
    def test_a_circle_is_reported_rather_than_hung_on(self) -> None:
        with self.assertRaises(GraphError) as caught:
            order(
                {"a": "double", "b": "double"},
                [("a", "value", "b", "value"), ("b", "value", "a", "value")],
            )

        self.assertIn("circle", str(caught.exception))
        self.assertIn("a", str(caught.exception))
        self.assertIn("b", str(caught.exception))

    def test_an_edge_from_nowhere_is_named(self) -> None:
        with self.assertRaises(GraphError) as caught:
            order({"a": "double"}, [("ghost", "value", "a", "value")])

        self.assertIn("ghost", str(caught.exception))


class RunTest(unittest.TestCase):
    def test_values_flow_along_the_edges(self) -> None:
        produced = run_graph(
            CATALOGUE,
            {"a": {"type": "source", "params": {"value": 5}}, "b": {"type": "double"}},
            [("a", "value", "b", "value")],
        )

        self.assertEqual(produced["b"]["value"], 10)

    def test_a_parameter_left_out_falls_back_to_its_default(self) -> None:
        produced = run_graph(CATALOGUE, {"a": {"type": "source"}}, [])

        self.assertEqual(produced["a"]["value"], 1)

    def test_a_node_type_the_engine_does_not_have_is_named(self) -> None:
        # The editor builds its palette from this engine, but a saved graph can
        # outlive the engine that could run it.
        with self.assertRaises(GraphError) as caught:
            run_graph(CATALOGUE, {"a": {"type": "summon"}}, [])

        self.assertIn("summon", str(caught.exception))

    def test_an_input_with_nothing_joined_to_it_is_named(self) -> None:
        with self.assertRaises(GraphError) as caught:
            run_graph(CATALOGUE, {"b": {"type": "double"}}, [])

        self.assertIn("value", str(caught.exception))
        self.assertIn("Double", str(caught.exception))


class OptionalPortTest(unittest.TestCase):
    """One node needs this and it is the interesting one.

    An edit with a mask changes only what was masked; an edit without one
    repaints the whole canvas. Both are wanted, so the mask cannot be required
    — and it cannot be a parameter either, because it arrives along an edge.
    """

    def setUp(self) -> None:
        self.catalogue = {
            "source": source(),
            "maybe": NodeType(
                key="maybe",
                label="Maybe",
                category="test",
                summary="runs with or without the second one",
                inputs=[Port("value", "number"), Port("extra", "number", optional=True)],
                outputs=[Port("value", "number")],
                run=lambda inputs, params, context: {
                    "value": inputs["value"] + inputs.get("extra", 0)
                },
            ),
        }

    def test_it_runs_with_the_optional_port_empty(self) -> None:
        produced = run_graph(
            self.catalogue,
            {"a": {"type": "source", "params": {"value": 3}}, "b": {"type": "maybe"}},
            [("a", "value", "b", "value")],
        )

        self.assertEqual(produced["b"]["value"], 3)

    def test_it_uses_the_optional_port_when_something_is_joined(self) -> None:
        produced = run_graph(
            self.catalogue,
            {
                "a": {"type": "source", "params": {"value": 3}},
                "c": {"type": "source", "params": {"value": 4}},
                "b": {"type": "maybe"},
            },
            [("a", "value", "b", "value"), ("c", "value", "b", "extra")],
        )

        self.assertEqual(produced["b"]["value"], 7)

    def test_a_required_port_is_still_required(self) -> None:
        with self.assertRaises(GraphError) as caught:
            run_graph(self.catalogue, {"b": {"type": "maybe"}}, [])

        self.assertIn("value", str(caught.exception))
        self.assertNotIn("extra", str(caught.exception))

    def test_the_catalogue_says_which_ports_are_optional(self) -> None:
        # The editor draws an optional port differently, so it has to be told.
        published = self.catalogue["maybe"].published()

        self.assertEqual(published["inputs"][0]["optional"], False)
        self.assertEqual(published["inputs"][1]["optional"], True)


class PublishingTest(unittest.TestCase):
    def test_the_catalogue_describes_itself_without_its_code(self) -> None:
        # This is what the editor reads to draw the palette, so it has to carry
        # the ports and the defaults and must not carry the function.
        published = doubling().published()

        self.assertEqual(published["key"], "double")
        self.assertEqual(
            published["inputs"], [{"name": "value", "kind": "number", "optional": False}]
        )
        self.assertNotIn("run", published)

    def test_a_parameter_publishes_its_default(self) -> None:
        published = source(7).published()

        self.assertEqual(published["params"][0]["default"], 7)


if __name__ == "__main__":
    unittest.main()
