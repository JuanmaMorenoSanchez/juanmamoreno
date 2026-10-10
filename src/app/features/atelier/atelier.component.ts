import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { BrushOverlayComponent, readMarks, type Marks } from './brush-overlay.component';
import { CataloguePaintingService } from './catalogue-painting.service';
import {
  AtelierEngineService,
  type GraphRun,
  type JobState,
  type NodeTypeDef,
} from './engine.service';
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
  imports: [BrushOverlayComponent, NodeCanvasComponent],
  templateUrl: './atelier.component.html',
  styleUrl: './atelier.component.scss',
})
export class AtelierComponent {
  protected readonly engine = inject(AtelierEngineService);
  private readonly catalogueImages = inject(CataloguePaintingService);

  protected readonly painting = signal<Blob | null>(null);
  protected readonly preview = signal<string | null>(null);
  /** What the chosen painting is, for the line under the preview. */
  protected readonly chosen = signal<string | null>(null);
  protected readonly tokenId = signal('');
  protected readonly fetching = signal(false);
  /** The Brush node whose marks are being drawn, if any. */
  protected readonly marking = signal<GraphNode | null>(null);

  protected readonly catalogue = signal<NodeTypeDef[]>([]);
  protected readonly nodes = signal<GraphNode[]>([]);
  protected readonly edges = signal<GraphEdge[]>([]);

  protected readonly busy = signal(false);
  /** The run in flight, as the engine last described it. */
  protected readonly job = signal<JobState | null>(null);
  protected readonly failure = signal<string | null>(null);
  protected readonly result = signal<GraphRun | null>(null);

  /**
   * Boxes with a required port and nothing joined to it.
   *
   * Checked here rather than left to the engine. It does refuse, accurately —
   * "'isolate-wvpp5' (Isolate) has nothing joined to: image" — but that
   * arrives after a round trip and reads like the model failed to find
   * something, when in fact a wire is missing. Isolate wants the painting as
   * well as the box, and joining only the box is the easy mistake.
   */
  protected readonly unjoined = computed(() => {
    const kinds = new Map(this.catalogue().map((type) => [type.key, type]));
    const wires = this.edges();
    const wanted: string[] = [];

    for (const node of this.nodes()) {
      const type = kinds.get(node.type);
      if (!type) continue;
      const missing = type.inputs
        .filter(
          (port) =>
            !port.optional &&
            !wires.some((edge) => edge.to[0] === node.id && edge.to[1] === port.name)
        )
        .map((port) => port.name);
      if (missing.length) wanted.push(`${type.label} needs ${missing.join(' and ')}`);
    }
    return wanted;
  });

  protected readonly ready = computed(
    () =>
      !this.busy() &&
      !this.engine.unreachable() &&
      this.painting() !== null &&
      this.nodes().length > 0 &&
      this.unjoined().length === 0
  );

  constructor() {
    void this.wake();
    this.recall();
  }

  private async wake(): Promise<void> {
    await this.engine.check();
    if (this.engine.unreachable()) return;

    // A run started before this page was loaded — or before it was reloaded —
    // is still going on this machine, and the engine knows its name. Picking
    // it up again beats showing an idle page beside a card that is busy.
    const already = this.engine.health()?.job;
    if (already) {
      this.busy.set(true);
      void this.watch(already).finally(() => {
        this.busy.set(false);
        void this.engine.check();
      });
    }

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
    this.take(file, file ? file.name : null);
  }

  /**
   * The same painting, by its token id instead of by finding the file.
   *
   * Takes the best copy the catalogue has rather than the one a tile would
   * use: cutting a layer from a 95 KB thumbnail gives a 95 KB layer.
   */
  protected async byId(): Promise<void> {
    const token = this.tokenId().trim();
    if (!token || this.fetching()) return;

    this.fetching.set(true);
    this.failure.set(null);
    try {
      const got = await this.catalogueImages.byId(token);
      const size = got.width ? ` · ${got.width}×${got.height}` : '';
      const note = got.quality === 'original' ? '' : ` · ${got.quality} copy, not the original`;
      this.take(got.blob, `${got.name}${size}${note}`);
    } catch (error) {
      this.failure.set(error instanceof Error ? error.message : 'that id could not be read');
    } finally {
      this.fetching.set(false);
    }
  }

  private take(painting: Blob | null, called: string | null): void {
    const old = this.preview();
    if (old) URL.revokeObjectURL(old);

    this.painting.set(painting);
    this.chosen.set(called);
    this.preview.set(painting ? URL.createObjectURL(painting) : null);
    this.result.set(null);
    this.failure.set(null);
  }

  /**
   * The switch beside the status.
   *
   * Stopping is a request to the engine. Starting is not — a page cannot
   * launch a program, so it asks Windows through the `atelier://` handler and
   * then waits to see whether anything answers.
   */
  protected async toggleEngine(): Promise<void> {
    this.failure.set(null);
    try {
      if (this.engine.unreachable()) {
        await this.engine.start();
        // The palette comes from the engine, so it arrives with the engine.
        this.catalogue.set(await this.engine.catalogue());
      } else {
        await this.engine.stop();
        this.catalogue.set([]);
      }
    } catch (error) {
      this.failure.set(error instanceof Error ? error.message : 'the switch did not work');
    }
  }

  /** Opens the painting for marking. Needs a painting, which is the catch. */
  protected draw(node: GraphNode): void {
    if (!this.preview()) {
      this.failure.set('Choose a painting first — there is nothing to mark.');
      return;
    }
    this.failure.set(null);
    this.marking.set(node);
  }

  protected marksOf(node: GraphNode): Marks {
    return readMarks(node.params['points']);
  }

  /** Marks come back as json on the node, so a graph stays one saveable thing. */
  protected marked(marks: Marks): void {
    const node = this.marking();
    this.marking.set(null);
    if (!node) return;

    this.redraw({
      nodes: this.nodes().map((n) =>
        n.id === node.id ? { ...n, params: { ...n.params, points: JSON.stringify(marks) } } : n
      ),
      edges: this.edges(),
    });
  }

  protected async run(): Promise<void> {
    const painting = this.painting();
    if (!painting) return;

    this.busy.set(true);
    this.failure.set(null);
    this.result.set(null);
    this.job.set(null);
    try {
      // The engine wants nodes keyed by id and edges as flat quadruples.
      const nodes: Record<string, { type: string; params: Record<string, unknown> }> = {};
      for (const node of this.nodes()) nodes[node.id] = { type: node.type, params: node.params };
      const edges = this.edges().map((e) => [e.from[0], e.from[1], e.to[0], e.to[1]]);

      const started = await this.engine.startGraph(painting, { nodes, edges });
      this.job.set(started);
      await this.watch(started.job);
    } catch (error) {
      // The engine's own words, which name the node at fault — the person
      // reading this is looking at a picture of boxes and needs to know which.
      this.failure.set(error instanceof Error ? error.message : 'the engine did not answer');
    } finally {
      this.busy.set(false);
      void this.engine.check();
    }
  }

  /**
   * Follows a run to its end, once a second.
   *
   * Nothing here times out. An edit is eighteen minutes and the first one of a
   * session spends four of those building its pipeline before the first step,
   * so any deadline worth having would be longer than anyone would wait for.
   * The run ends when the engine says it has.
   */
  private async watch(id: string): Promise<void> {
    for (;;) {
      await new Promise((again) => setTimeout(again, 1000));
      const state = await this.engine.job(id);
      this.job.set(state);

      if (state.state === 'done') {
        // How long it took is the run's to know, not the graph's: the engine
        // answers the moment it starts and the clock belongs to the job.
        this.result.set(state.result ? { ...state.result, seconds: state.seconds } : null);
        return;
      }
      if (state.state === 'failed') {
        this.failure.set(state.detail ?? 'the run failed');
        return;
      }
      if (state.state === 'cancelled') {
        this.failure.set('Stopped. Nothing was kept from this run.');
        return;
      }
    }
  }

  protected async stopRun(): Promise<void> {
    const running = this.job();
    if (!running) return;
    try {
      await this.engine.cancelJob(running.job);
    } catch (error) {
      this.failure.set(error instanceof Error ? error.message : 'it would not stop');
    }
  }

  /** What to show while it works: a count if there is one, else what it is doing. */
  protected readonly progress = computed(() => {
    const now = this.job();
    if (!now || now.state !== 'running') return null;
    const where = now.node ? `${now.node} · ${now.doneNodes + 1} of ${now.totalNodes}` : 'starting';
    const steps = now.steps ? ` · step ${now.step} of ${now.steps}` : '';
    return { where, steps, note: now.note, seconds: Math.round(now.seconds) };
  });

  protected layerUrl(file: string): string {
    return this.engine.layerUrl(file);
  }
}
