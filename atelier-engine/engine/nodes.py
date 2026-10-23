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
class Advice:
    """The band a number is sensible in, and what leaving it does.

    Separate from `minimum` and `maximum`, which are what the node will accept
    at all. These are what is *wise*, which is a different question and the one
    somebody setting a number actually has: twelve steps runs and comes back
    mush, fifty runs for an hour and looks like thirty-five.

    Every number here was measured on this machine or read off a run that went
    wrong, and the sentences say which. A band with no reason behind it would
    be a guess printed in red, which is worse than nothing.
    """

    below: float | None = None
    """Under this, `low` is shown."""
    above: float | None = None
    """Over this, `high` is shown."""
    low: str = ""
    high: str = ""


#: The kinds that hold a quantity, and so have a band to be inside.
#:
#: A slider is a number drawn differently, and every rule about numbers —
#: the range check before a run, the warning at an unwise value — applies to
#: it unchanged. Making it a kind of its own without saying so here let a
#: slider past the check that exists to stop a typo costing eighteen minutes.
NUMERIC = ("number", "slider")


@dataclass(frozen=True)
class Param:
    name: str
    kind: str
    """`text`, `number`, `slider`, `toggle` or `choice` — enough for everything
    here, and the editor draws a control per kind.

    A `slider` is a number with a band worth seeing. A box asks you to know
    that four is ordinary and seven and a half is a lot; a slider shows the
    range and where in it you are. Steps and seeds stay boxes: a step count
    is a budget reasoned about in whole units, and a seed is a name rather
    than a quantity."""
    default: Value
    label: str = ""
    minimum: float | None = None
    maximum: float | None = None
    step: float | None = None
    choices: tuple[str, ...] = ()
    """The whole of what a `choice` may be, in the order they are offered.

    A free text field would take a typo and fail eighteen minutes later; two
    styles spelled out are a list to pick from."""
    advice: Advice | None = None
    """What is wise, where that is narrower than what is allowed.

    Fastened on from `help.py` beside the sentence explaining it, so a number
    and the reason for it cannot drift apart."""
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

    http_status = 400


class StoppedEarly(Exception):
    """The run was asked to stop, and did, between nodes."""


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
    watching: Callable[[str, int, int], None] | None = None,
    stopped: Callable[[], bool] | None = None,
) -> dict[str, dict[str, Value]]:
    """Run every node once, in order, and keep what each produced.

    `nodes` is {id: {"type": key, "params": {...}}}. `context` is handed to any
    node that asks for it — the model registry and the uploaded painting live
    there, because a node should not be reaching for either on its own.

    `watching` is told which box is starting and how far through we are, so the
    page can say something better than "working". `stopped` is checked before
    each one: a run is abandoned between nodes rather than part way through,
    which is the only point at which stopping leaves nothing half-written.
    """
    kinds = {}
    settled: dict[str, dict[str, Value]] = {}
    for node_id, node in nodes.items():
        key = node.get("type")
        if key not in catalogue:
            raise GraphError(f"{node_id!r} is a {key!r}, which this engine does not have")
        kinds[node_id] = key
        # Every setting checked before anything runs, rather than as each box
        # is reached: a graph with a number in it that cannot work should say
        # so at once, not after the first box has spent four minutes.
        settled[node_id] = settle(catalogue[key], node.get("params") or {})

    produced: dict[str, dict[str, Value]] = {}
    running = order(kinds, edges)

    for at, node_id in enumerate(running):
        if stopped is not None and stopped():
            raise StoppedEarly(f"stopped after {at} of {len(running)}")

        kind = catalogue[kinds[node_id]]
        if watching is not None:
            watching(kind.label, at, len(running))
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

        produced[node_id] = kind.run(
            inputs=arriving, params=settled[node_id], context=context or {}
        )

    return produced


def settle(kind: NodeType, given: dict[str, Any]) -> dict[str, Value]:
    """Every setting for one box, checked against what the box accepts.

    **The engine used to take whatever arrived.** The page draws `min` and
    `max` on a number field and a browser does not enforce either — typing a
    larger number is allowed, and nothing between the keyboard and the model
    disagreed. So twelve seconds went to a video node whose maximum is five,
    and a `true_cfg_scale` of fifty went to an editor built for ten: the first
    asked the card for nineteen gigabytes it does not have, and the second is
    how a run comes back as a black rectangle, which is what a diffusion model
    does when its guidance pushes the latents to infinity.

    Neither failure is the person's mistake. A field that accepts a number it
    cannot use is the mistake, and the fix is for the thing that knows the
    range to be the thing that checks it.

    **Refused rather than clamped.** Quietly running five seconds when the
    field says twelve produces a clip that does not match what is on screen,
    and the next question would be why the number moved. A sentence naming the
    box, the setting and the range can be acted on.

    A setting the catalogue has never heard of is dropped, not refused: a
    saved graph outlives the engine that drew it, and an old spelling left in
    a stored graph is not worth a dead end.
    """
    settings: dict[str, Value] = {p.name: p.default for p in kind.params}

    for param in kind.params:
        if param.name not in given:
            continue
        value = given[param.name]

        if param.kind in NUMERIC:
            try:
                number = float(value)
            except (TypeError, ValueError):
                raise GraphError(
                    f"{kind.label}: {param.label or param.name} needs a number, not {value!r}"
                ) from None
            if number != number or number in (float("inf"), float("-inf")):
                raise GraphError(f"{kind.label}: {param.label or param.name} needs a real number")
            if param.minimum is not None and number < param.minimum:
                raise GraphError(
                    f"{kind.label}: {param.label or param.name} is {_said(number)}, and the "
                    f"lowest it can be is {_said(param.minimum)}"
                )
            if param.maximum is not None and number > param.maximum:
                raise GraphError(
                    f"{kind.label}: {param.label or param.name} is {_said(number)}, and the "
                    f"highest it can be is {_said(param.maximum)}"
                )
            # Whole numbers stay whole: a step count of 20.0 reads as a bug.
            settings[param.name] = (
                int(number) if float(param.step or 0) == 1 or float(number).is_integer() else number
            )
        elif param.kind == "choice":
            said = str(value)
            if param.choices and said not in param.choices:
                raise GraphError(
                    f"{kind.label}: {param.label or param.name} is {said!r}, and it can only be "
                    f"{', '.join(param.choices)}"
                )
            settings[param.name] = said
        elif param.kind == "toggle":
            settings[param.name] = bool(value)
        else:
            settings[param.name] = value

    return settings


def _said(number: float) -> str:
    """A number as a person writes it: 20, not 20.0; 4.5 stays 4.5."""
    return str(int(number)) if float(number).is_integer() else str(number)
