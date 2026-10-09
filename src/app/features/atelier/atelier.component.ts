import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AtelierEngineService, type GraphRun, type NodeTypeDef } from './engine.service';
import {
  NodeCanvasComponent,
  type Drawn,
  type GraphEdge,
  type GraphNode,
} from './node-canvas.component';

/** Where a graph is kept between visits. The browser's, not the engine's. */
const SAVED = 'juanmamoreno.atelier.graph';

/**
 * Cutting and changing a painting, with the models running on this machine.
 *
 * **This page does nothing without the local engine**, a Python service started
 * by hand in `atelier-engine/`. It is not a web page that happens to be slow
 * when a backend is down — it is a front end for a process on this computer,
 * and opened from anywhere else it can only say so. That is why the first thing
 * it draws is whether the engine answered.
 *
 * **It knows the name of no node.** The palette and every control on every box
 * come from `GET /nodes`, so a capability added to the engine appears here
 * without this file changing or the site being released.
 *
 * Nothing it makes is saved anywhere but the engine's own folder until he does
 * something else with it.
 */
@Component({
  selector: 'app-atelier',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NodeCanvasComponent],
  templateUrl: './atelier.component.html',
  styleUrl: './atelier.component.scss',
})
export class AtelierComponent {
  protected readonly engine = inject(AtelierEngineService);

  protected readonly painting = signal<File | null>(null);
  protected readonly preview = signal<string | null>(null);

  protected readonly catalogue = signal<NodeTypeDef[]>([]);
  protected readonly nodes = signal<GraphNode[]>([]);
  protected readonly edges = signal<GraphEdge[]>([]);

  protected readonly busy = signal(false);
  protected readonly failure = signal<string | null>(null);
  protected readonly result = signal<GraphRun | null>(null);

  protected readonly ready = computed(
    () =>
      !this.busy() &&
      !this.engine.unreachable() &&
      this.painting() !== null &&
      this.nodes().length > 0
  );

  constructor() {
    void this.wake();
    this.recall();
  }

  private async wake(): Promise<void> {
    await this.engine.check();
    if (this.engine.unreachable()) return;
    try {
      this.catalogue.set(await this.engine.catalogue());
    } catch {
      // Not fatal: the status strip already says the engine is unwell, and an
      // empty palette says the same thing in the place you would look for it.
      this.catalogue.set([]);
    }
  }

  /**
   * A graph survives a reload, because drawing one is work.
   *
   * In the browser only. The engine keeps nothing, which is the same promise
   * the rest of this page makes.
   */
  private recall(): void {
    try {
      const kept = localStorage.getItem(SAVED);
      if (!kept) return;
      const drawn = JSON.parse(kept) as Drawn;
      this.nodes.set(drawn.nodes ?? []);
      this.edges.set(drawn.edges ?? []);
    } catch {
      // A private window, blocked storage, or something written by an older
      // version of this page. An empty canvas is a fine thing to fall back to.
    }
  }

  protected redraw(drawn: Drawn): void {
    this.nodes.set(drawn.nodes);
    this.edges.set(drawn.edges);
    try {
      localStorage.setItem(SAVED, JSON.stringify(drawn));
    } catch {
      // Not worth telling anyone about: the graph is on screen either way.
    }
  }

  protected clear(): void {
    this.redraw({ nodes: [], edges: [] });
    this.result.set(null);
    this.failure.set(null);
  }

  protected chose(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    const old = this.preview();
    if (old) URL.revokeObjectURL(old);

    this.painting.set(file);
    this.preview.set(file ? URL.createObjectURL(file) : null);
    this.result.set(null);
    this.failure.set(null);
  }

  protected async run(): Promise<void> {
    const painting = this.painting();
    if (!painting) return;

    this.busy.set(true);
    this.failure.set(null);
    this.result.set(null);
    try {
      // The engine wants nodes keyed by id and edges as flat quadruples.
      const nodes: Record<string, { type: string; params: Record<string, unknown> }> = {};
      for (const node of this.nodes()) nodes[node.id] = { type: node.type, params: node.params };
      const edges = this.edges().map((e) => [e.from[0], e.from[1], e.to[0], e.to[1]]);

      this.result.set(await this.engine.runGraph(painting, { nodes, edges }));
    } catch (error) {
      // The engine's own words, which name the node at fault — the person
      // reading this is looking at a picture of boxes and needs to know which.
      this.failure.set(error instanceof Error ? error.message : 'the engine did not answer');
    } finally {
      this.busy.set(false);
      void this.engine.check();
    }
  }

  protected layerUrl(file: string): string {
    return this.engine.layerUrl(file);
  }
}
