import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { readMarks } from './brush-overlay.component';
import type { NodeTypeDef, ParamDef } from './engine.service';

/** A node as it sits on the canvas. */
export interface GraphNode {
  id: string;
  type: string;
  x: number;
  y: number;
  params: Record<string, string | number | boolean>;
}

/** A wire. `[node id, port name]` at each end. */
export interface GraphEdge {
  from: [string, string];
  to: [string, string];
}

export interface Drawn {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const NODE_WIDTH = 210;
const HEADER = 30;
const ROW = 20;

/**
 * The canvas: boxes, ports, wires.
 *
 * Hand-drawn in SVG rather than with a graph library. The whole of what a node
 * editor does is draw rectangles, draw curves between them, and move things
 * with a pointer — and a library for that is a dependency, a bundle, and
 * somebody else's idea of what a node looks like.
 *
 * **It knows the name of no node.** Everything it draws comes from the
 * catalogue the engine publishes, so a node added to `catalogue.py` appears
 * here with its ports and its controls and nothing in this file changes.
 */
@Component({
  selector: 'app-node-canvas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './node-canvas.component.html',
  styleUrl: './node-canvas.component.scss',
})
export class NodeCanvasComponent {
  readonly catalogue = input.required<NodeTypeDef[]>();
  readonly nodes = input.required<GraphNode[]>();
  readonly edges = input.required<GraphEdge[]>();
  readonly changed = output<Drawn>();
  /** A Brush node wanting its marks drawn. The page owns the painting. */
  readonly drawing = output<GraphNode>();

  /** Where the canvas is looking. */
  protected readonly panX = signal(0);
  protected readonly panY = signal(0);
  protected readonly zoom = signal(1);

  /** The wire being pulled, before it has been let go of. */
  protected readonly pulling = signal<{
    from: [string, string];
    kind: string;
    x: number;
    y: number;
  } | null>(null);
  /**
   * Which box has its explanation open.
   *
   * Hovering the ? opens it and leaving closes it; pressing it pins it open so
   * the text can be read without holding the pointer still, which a long
   * explanation makes impossible.
   */
  protected readonly helping = signal<string | null>(null);
  protected readonly pinned = signal<string | null>(null);

  private dragging: { id: string; dx: number; dy: number } | null = null;
  private panning: { x: number; y: number } | null = null;

  protected readonly byKey = computed(() => {
    const map = new Map<string, NodeTypeDef>();
    for (const type of this.catalogue()) map.set(type.key, type);
    return map;
  });

  protected typeOf(node: GraphNode): NodeTypeDef | undefined {
    return this.byKey().get(node.type);
  }

  protected height(node: GraphNode): number {
    const type = this.typeOf(node);
    if (!type) return HEADER + ROW;
    const rows = Math.max(type.inputs.length, type.outputs.length) + type.params.length;
    return HEADER + rows * ROW + 12;
  }

  protected inY(node: GraphNode, at: number): number {
    return node.y + HEADER + at * ROW + ROW / 2;
  }

  protected outY(node: GraphNode, at: number): number {
    return node.y + HEADER + at * ROW + ROW / 2;
  }

  protected readonly width = NODE_WIDTH;

  /** A port's position, for drawing a wire to or from it. */
  private portAt(id: string, port: string, side: 'in' | 'out'): { x: number; y: number } | null {
    const node = this.nodes().find((n) => n.id === id);
    const type = node ? this.typeOf(node) : undefined;
    if (!node || !type) return null;
    const list = side === 'in' ? type.inputs : type.outputs;
    const at = list.findIndex((p) => p.name === port);
    if (at < 0) return null;
    return {
      x: side === 'in' ? node.x : node.x + NODE_WIDTH,
      y: node.y + HEADER + at * ROW + ROW / 2,
    };
  }

  /** A wire, as a curve. Straight lines cross each other illegibly. */
  protected wire(edge: GraphEdge): string {
    const from = this.portAt(edge.from[0], edge.from[1], 'out');
    const to = this.portAt(edge.to[0], edge.to[1], 'in');
    if (!from || !to) return '';
    const bend = Math.max(40, Math.abs(to.x - from.x) / 2);
    return `M ${from.x} ${from.y} C ${from.x + bend} ${from.y}, ${to.x - bend} ${to.y}, ${to.x} ${to.y}`;
  }

  protected pullingWire(): string {
    const pull = this.pulling();
    if (!pull) return '';
    const from = this.portAt(pull.from[0], pull.from[1], 'out');
    if (!from) return '';
    const bend = Math.max(40, Math.abs(pull.x - from.x) / 2);
    return `M ${from.x} ${from.y} C ${from.x + bend} ${from.y}, ${pull.x - bend} ${pull.y}, ${pull.x} ${pull.y}`;
  }

  // ---- adding and removing ----

  add(type: NodeTypeDef): void {
    const params: Record<string, string | number | boolean> = {};
    for (const param of type.params) params[param.name] = param.default;

    const nodes = [
      ...this.nodes(),
      {
        id: `${type.key}-${Math.random().toString(36).slice(2, 7)}`,
        type: type.key,
        // Laid out in a grid wider than a node is, because the first attempt
        // stepped by sixty pixels — less than a node's own size — and five
        // nodes buried each other so thoroughly their ports could not be
        // reached at all.
        x: 30 + (this.nodes().length % 3) * (NODE_WIDTH + 70),
        y: 30 + Math.floor(this.nodes().length / 3) * 190,
        params,
      },
    ];
    this.changed.emit({ nodes, edges: this.edges() });
  }

  protected remove(id: string): void {
    this.changed.emit({
      nodes: this.nodes().filter((n) => n.id !== id),
      // A wire to a node that is gone is not a wire.
      edges: this.edges().filter((e) => e.from[0] !== id && e.to[0] !== id),
    });
  }

  protected cut(edge: GraphEdge): void {
    this.changed.emit({
      nodes: this.nodes(),
      edges: this.edges().filter((e) => e !== edge),
    });
  }

  /** How many marks a Brush is carrying, for the label on its button. */
  protected markCount(node: GraphNode): number {
    const marks = readMarks(node.params['points']);
    return marks.keep.length + marks.drop.length;
  }

  protected setParam(node: GraphNode, param: ParamDef, raw: string | boolean): void {
    const value = param.kind === 'number' ? Number(raw) : raw;
    this.changed.emit({
      nodes: this.nodes().map((n) =>
        n.id === node.id ? { ...n, params: { ...n.params, [param.name]: value } } : n
      ),
      edges: this.edges(),
    });
  }

  // ---- pointer ----

  private where(event: PointerEvent): { x: number; y: number } {
    const svg = (event.currentTarget as Element).closest('svg') as SVGSVGElement | null;
    const box = svg?.getBoundingClientRect();
    if (!box) return { x: 0, y: 0 };
    return {
      x: (event.clientX - box.left - this.panX()) / this.zoom(),
      y: (event.clientY - box.top - this.panY()) / this.zoom(),
    };
  }

  protected grab(event: PointerEvent, node: GraphNode): void {
    event.stopPropagation();
    const at = this.where(event);
    this.dragging = { id: node.id, dx: at.x - node.x, dy: at.y - node.y };
    (event.target as Element).setPointerCapture?.(event.pointerId);
  }

  protected startPan(event: PointerEvent): void {
    this.panning = { x: event.clientX - this.panX(), y: event.clientY - this.panY() };
  }

  protected startWire(event: PointerEvent, node: GraphNode, port: string, kind: string): void {
    event.stopPropagation();
    const at = this.where(event);
    this.pulling.set({ from: [node.id, port], kind, x: at.x, y: at.y });
  }

  protected move(event: PointerEvent): void {
    if (this.dragging) {
      const at = this.where(event);
      const { id, dx, dy } = this.dragging;
      this.changed.emit({
        nodes: this.nodes().map((n) => (n.id === id ? { ...n, x: at.x - dx, y: at.y - dy } : n)),
        edges: this.edges(),
      });
      return;
    }
    const pull = this.pulling();
    if (pull) {
      const at = this.where(event);
      this.pulling.set({ ...pull, x: at.x, y: at.y });
      return;
    }
    if (this.panning) {
      this.panX.set(event.clientX - this.panning.x);
      this.panY.set(event.clientY - this.panning.y);
    }
  }

  protected release(): void {
    this.dragging = null;
    this.panning = null;
    // A wire let go over nothing is not a wire. Dropping it here rather than
    // leaving it attached to the pointer is what makes that feel deliberate.
    this.pulling.set(null);
  }

  protected finishWire(event: PointerEvent, node: GraphNode, port: string, kind: string): void {
    event.stopPropagation();
    const pull = this.pulling();
    this.pulling.set(null);
    if (!pull) return;
    // Kinds have to agree. Most of what stops a graph being nonsense happens
    // here, before anything is sent to the engine.
    if (pull.kind !== kind) return;
    if (pull.from[0] === node.id) return;

    const edges = this.edges().filter((e) => !(e.to[0] === node.id && e.to[1] === port));
    this.changed.emit({
      nodes: this.nodes(),
      edges: [...edges, { from: pull.from, to: [node.id, port] }],
    });
  }

  protected wheel(event: WheelEvent): void {
    event.preventDefault();
    const next = Math.min(2, Math.max(0.35, this.zoom() * (event.deltaY < 0 ? 1.1 : 0.9)));
    this.zoom.set(Math.round(next * 100) / 100);
  }

  protected showHelp(id: string): void {
    if (!this.pinned()) this.helping.set(id);
  }

  protected hideHelp(): void {
    if (!this.pinned()) this.helping.set(null);
  }

  protected pinHelp(event: Event, id: string): void {
    event.stopPropagation();
    const already = this.pinned() === id;
    this.pinned.set(already ? null : id);
    this.helping.set(already ? null : id);
  }

  /** Where the explanation hangs: beside the box, or left of it near the edge. */
  protected helpAt(node: GraphNode): { x: number; y: number } {
    return { x: node.x + NODE_WIDTH + 14, y: node.y };
  }

  /**
   * The explanation, in paragraphs.
   *
   * Tolerates an engine that does not send one. The page reads its whole
   * vocabulary from `GET /nodes`, which means it can meet an engine older than
   * itself — and it did, the first time this was tried, against a process
   * started before the help text existed. A missing field has to be an empty
   * panel, not a crash that takes the canvas with it.
   */
  protected helpParagraphs(type: NodeTypeDef): string[] {
    return (type.help ?? '')
      .split(/\n{2,}/)
      .map((para) => para.trim())
      .filter(Boolean);
  }

  /** Port names as prose, with the optional ones marked. Templates cannot map. */
  protected inputNames(type: NodeTypeDef): string {
    return type.inputs.map((p) => (p.optional ? `${p.name} (optional)` : p.name)).join(', ');
  }

  protected outputNames(type: NodeTypeDef): string {
    return type.outputs.map((p) => p.name).join(', ');
  }

  protected joined(node: GraphNode, port: string): boolean {
    return this.edges().some((e) => e.to[0] === node.id && e.to[1] === port);
  }

  /**
   * A port that must be joined and is not.
   *
   * Drawn as a warning rather than left to look like any other empty port.
   * Isolate takes a box *and* the painting, and joining only the box is the
   * easy mistake — the engine then refuses with "has nothing joined to: image",
   * which is accurate and reads like the model failed to find anything.
   */
  protected wanting(node: GraphNode, port: { name: string; optional: boolean }): boolean {
    return !port.optional && !this.joined(node, port.name);
  }
}
