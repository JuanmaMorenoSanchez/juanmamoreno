"""
The node catalogue, and the thing that runs a graph of them.

**The engine owns the node list, not the page.** `GET /nodes` publishes what is
here — the ports, the parameters, the defaults — and the editor builds its
palette from the answer. So adding a capability is adding a `NodeType` below and
nothing else: no new component, no list to keep in step, no release of the site.
That is the whole point of doing it this way rather than drawing eight fixed
boxes in a template.

A node is deliberately coarse. ComfyUI has 976 of them and is a tool for
building pipelines; this has a handful and is a tool for cutting up paintings.
"Isolate" here is a model load, a prompt, a forward pass and a mask — one box,
because that is one idea.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Any, Callable

Value = Any
"""What flows along an edge: a PIL image, a numpy mask, a box, a string."""


@dataclass(frozen=True)
class Port:
    name: str
    kind: str
    """`image`, `mask`, `box` or `text`. The editor refuses to join two ports of
    different kinds, which is most of what stops a graph being nonsense before
    it is ever sent."""
    optional: bool = False
    """Whether the node can run with nothing joined here.

    One node needs this and it is the interesting one: an edit with a mask
    changes only what was masked, and an edit without one repaints the whole
    canvas. Both are wanted, so the mask cannot be required — but it also
    cannot be silently ignored, which is why it is a port rather than a
    parameter."""


@dataclass(frozen=True)
class Param:
    name: str
    kind: str
    """`text`, `number` or `toggle` — enough for everything here, and the editor
    draws a control per kind."""
    default: Value
    label: str = ""
    minimum: float | None = None
    maximum: float | None = None
    step: float | None = None
    help: str = ""
    """What moving this actually does, and which way to move it.

    A number with a range tells you what is allowed and nothing about what is
    wise. This is the sentence that says which direction is better and what
    going too far looks like."""


@dataclass(frozen=True)
class NodeType:
    key: str
    label: str
    category: str
    summary: str
    help: str = ""
    """The long explanation, for the ? beside the title on the canvas.

    Kept here rather than in the page for the same reason the ports are: a node
    added to this file has to arrive complete, explanation and all, or the
    explanations drift out of step with the nodes the moment anyone is busy."""
    inputs: list[Port] = field(default_factory=list)
    outputs: list[Port] = field(default_factory=list)
    params: list[Param] = field(default_factory=list)
    run: Callable[..., dict[str, Value]] | None = None

    def published(self) -> dict[str, Any]:
        """What the editor is told. Everything but the function."""
        return {
            "key": self.key,
            "label": self.label,
            "category": self.category,
            "summary": self.summary,
            "help": self.help,
            "inputs": [asdict(p) for p in self.inputs],
            "outputs": [asdict(p) for p in self.outputs],
            "params": [asdict(p) for p in self.params],
        }


class GraphError(ValueError):
    """A graph that cannot be run, with a reason meant for a person."""


def order(nodes: dict[str, str], edges: list[tuple[str, str, str, str]]) -> list[str]:
    """The order to run them in, or a complaint.

    `edges` are (from node, from port, to node, to port). Kahn's algorithm,
    because a cycle has to be reported rather than hung on: a node editor makes
    loops very easy to draw by accident, and "it stopped responding" is a worse
    answer than "these two feed each other".
    """
    waiting: dict[str, int] = {node: 0 for node in nodes}
    feeds: dict[str, list[str]] = {node: [] for node in nodes}

    for source, _, target, _ in edges:
        if source not in nodes:
            raise GraphError(f"an edge comes from {source!r}, which is not in the graph")
        if target not in nodes:
            raise GraphError(f"an edge goes to {target!r}, which is not in the graph")
        feeds[source].append(target)
        waiting[target] += 1

    ready = [node for node, count in waiting.items() if count == 0]
    done: list[str] = []
    while ready:
        node = ready.pop(0)
        done.append(node)
        for next_node in feeds[node]:
            waiting[next_node] -= 1
            if waiting[next_node] == 0:
                ready.append(next_node)

    if len(done) != len(nodes):
        stuck = sorted(set(nodes) - set(done))
        raise GraphError(
            "these nodes feed each other in a circle, so none of them can go first: "
            + ", ".join(stuck)
        )
    return done


def run_graph(
    catalogue: dict[str, NodeType],
    nodes: dict[str, dict[str, Any]],
    edges: list[tuple[str, str, str, str]],
    context: dict[str, Any] | None = None,
) -> dict[str, dict[str, Value]]:
    """Run every node once, in order, and keep what each produced.

    `nodes` is {id: {"type": key, "params": {...}}}. `context` is handed to any
    node that asks for it — the model registry and the uploaded painting live
    there, because a node should not be reaching for either on its own.
    """
    kinds = {}
    for node_id, node in nodes.items():
        key = node.get("type")
        if key not in catalogue:
            raise GraphError(f"{node_id!r} is a {key!r}, which this engine does not have")
        kinds[node_id] = key

    produced: dict[str, dict[str, Value]] = {}

    for node_id in order(kinds, edges):
        kind = catalogue[kinds[node_id]]
        if kind.run is None:
            raise GraphError(f"{kind.key!r} has no way to run")

        arriving: dict[str, Value] = {}
        for source, from_port, target, to_port in edges:
            if target != node_id:
                continue
            if from_port not in produced.get(source, {}):
                raise GraphError(
                    f"{node_id!r} wants {to_port!r} from {source!r}, which produced no {from_port!r}"
                )
            arriving[to_port] = produced[source][from_port]

        missing = [p.name for p in kind.inputs if p.name not in arriving and not p.optional]
        if missing:
            raise GraphError(f"{node_id!r} ({kind.label}) has nothing joined to: {', '.join(missing)}")

        settings = {p.name: p.default for p in kind.params}
        settings.update(nodes[node_id].get("params") or {})

        produced[node_id] = kind.run(inputs=arriving, params=settings, context=context or {})

    return produced
