"""
The ready-made graphs, checked against the catalogue they are made of.

This is the only test file here that exists to protect a *user* from the
author rather than the other way round. A flow is a hand-written graph, and
every mistake available when wiring one by hand is available when writing one
down: a port renamed, a parameter that no longer exists, a required input left
unjoined. Each of those surfaces as "'isolate-x' (Isolate) has nothing joined
to: image" — which reads like a model failing to find something, and sent him
looking at the wrong thing once already.

So every flow is run through the same ordering and joining rules the real
graph endpoint uses, with the nodes replaced by stubs. No models, no painting,
milliseconds.
"""

import unittest
from dataclasses import replace
from typing import Any

from engine.catalogue import CATALOGUE
from engine.flows import FLOWS, as_json
from engine.nodes import NodeType, order, run_graph


class EveryFlowTest(unittest.TestCase):
    """Run once per flow, so a failure names the flow that is wrong."""

    def test_there_are_some(self) -> None:
        self.assertTrue(FLOWS)

    def test_every_node_is_one_the_engine_has(self) -> None:
        for key, flow in FLOWS.items():
            for node in flow.nodes:
                with self.subTest(flow=key, node=node.at):
                    self.assertIn(node.type, CATALOGUE)

    def test_every_setting_is_one_that_node_takes(self) -> None:
        # A parameter renamed in the catalogue leaves a flow silently setting
        # nothing, and the box runs on its default instead of what was meant.
        for key, flow in FLOWS.items():
            for node in flow.nodes:
                allowed = {p.name for p in CATALOGUE[node.type].params}
                for name in node.params:
                    with self.subTest(flow=key, node=node.at, param=name):
                        self.assertIn(name, allowed)

    def test_every_setting_is_the_right_sort_of_thing(self) -> None:
        for key, flow in FLOWS.items():
            for node in flow.nodes:
                defaults = {p.name: p.default for p in CATALOGUE[node.type].params}
                for name, value in node.params.items():
                    with self.subTest(flow=key, node=node.at, param=name):
                        self.assertIsInstance(value, type(defaults[name]))

    def test_every_wire_joins_ports_that_exist(self) -> None:
        for key, flow in FLOWS.items():
            named = {node.at: node.type for node in flow.nodes}
            for source, from_port, target, to_port in flow.edges:
                with self.subTest(flow=key, wire=(source, from_port, target, to_port)):
                    self.assertIn(source, named)
                    self.assertIn(target, named)
                    self.assertIn(
                        from_port, {p.name for p in CATALOGUE[named[source]].outputs}
                    )
                    self.assertIn(to_port, {p.name for p in CATALOGUE[named[target]].inputs})

    def test_every_required_input_is_joined(self) -> None:
        # The error this prevents is the one that reads like a model failing.
        for key, flow in FLOWS.items():
            joined = {(target, to_port) for _s, _f, target, to_port in flow.edges}
            for node in flow.nodes:
                for port in CATALOGUE[node.type].inputs:
                    if port.optional:
                        continue
                    with self.subTest(flow=key, node=node.at, port=port.name):
                        self.assertIn((node.at, port.name), joined)

    def test_every_flow_can_be_put_in_an_order(self) -> None:
        for key, flow in FLOWS.items():
            kinds = {node.at: node.type for node in flow.nodes}
            with self.subTest(flow=key):
                running = order(kinds, [tuple(edge) for edge in flow.edges])
                self.assertEqual(len(running), len(flow.nodes))

    def test_every_flow_runs_from_end_to_end(self) -> None:
        """The real thing, with stubs where the models were.

        Ordering and joining are checked above one rule at a time; this checks
        them together, through the same function the page's Run button reaches.
        """
        for key, flow in FLOWS.items():
            with self.subTest(flow=key):
                produced = run_graph(
                    catalogue=stubbed(),
                    nodes={
                        node.at: {"type": node.type, "params": dict(node.params)}
                        for node in flow.nodes
                    },
                    edges=[tuple(edge) for edge in flow.edges],
                    context={},
                )
                self.assertEqual(set(produced), {node.at for node in flow.nodes})

    def test_two_boxes_never_land_on_the_same_square(self) -> None:
        # They are placed by column and row, and two in one place means one is
        # hidden under the other — which is how the first grid layout went.
        for key, flow in FLOWS.items():
            squares = [(node.column, node.row) for node in flow.nodes]
            with self.subTest(flow=key):
                self.assertEqual(len(squares), len(set(squares)))

    def test_a_wire_always_goes_rightwards(self) -> None:
        # Not cosmetic: a wire running right to left crosses back over the boxes
        # it came from, and a flow is meant to be readable at a glance.
        for key, flow in FLOWS.items():
            columns = {node.at: node.column for node in flow.nodes}
            for source, _from, target, _to in flow.edges:
                with self.subTest(flow=key, wire=(source, target)):
                    self.assertLess(columns[source], columns[target])

    def test_each_flow_says_what_it_is_for(self) -> None:
        for key, flow in FLOWS.items():
            with self.subTest(flow=key):
                self.assertTrue(flow.label)
                self.assertTrue(flow.blurb)
                # Long enough to be worth opening: the blurb is the short form.
                self.assertGreater(len(flow.about), 200)


class AsJsonTest(unittest.TestCase):
    def test_gives_the_page_what_it_needs_and_in_order(self) -> None:
        served = as_json()

        self.assertEqual([flow["key"] for flow in served], list(FLOWS))
        for flow in served:
            self.assertEqual(
                set(flow), {"key", "label", "blurb", "about", "nodes", "edges"}
            )

    def test_edges_arrive_as_four_part_lists(self) -> None:
        # The graph endpoint takes them in this shape, so the page can hand
        # them straight back without rearranging anything.
        for flow in as_json():
            for edge in flow["edges"]:
                self.assertEqual(len(edge), 4)


def stubbed() -> dict[str, NodeType]:
    """The catalogue with every model replaced by something that returns.

    `replace` rather than a constructor call, so a node type gaining a field
    does not break this file — which it did on the first run, when `category`
    and `summary` were not in the list.
    """

    def produce(kind: NodeType):
        def run(inputs: dict[str, Any], params: dict[str, Any], context: dict[str, Any]):
            return {port.name: f"a {port.kind}" for port in kind.outputs}

        return run

    return {key: replace(kind, run=produce(kind)) for key, kind in CATALOGUE.items()}


if __name__ == "__main__":
    unittest.main()
