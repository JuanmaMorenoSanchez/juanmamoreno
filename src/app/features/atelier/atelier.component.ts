import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { BrushOverlayComponent, readMarks, type Marks } from './brush-overlay.component';
import { CataloguePaintingService } from './catalogue-painting.service';
import { FlowRowComponent } from './flow-row.component';
import { KeptService } from './kept.service';
import { ParallaxPreviewComponent } from './parallax-preview.component';
import { SketchPreviewComponent } from './sketch-preview.component';
import {
  AtelierEngineService,
  type FlowDef,
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
 * How far apart a flow's boxes are placed, in the canvas's own pixels.
 *
 * The same spacing the palette uses when a box is added by hand: wider than a
 * box, because the first attempt stepped them 60px apart and each one buried
 * the last.
 */
const NODE_WIDTH = 210;

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
  imports: [
    BrushOverlayComponent,
    FlowRowComponent,
    NodeCanvasComponent,
    ParallaxPreviewComponent,
    SketchPreviewComponent,
  ],
  templateUrl: './atelier.component.html',
  styleUrl: './atelier.component.scss',
})
export class AtelierComponent {
  protected readonly engine = inject(AtelierEngineService);
  private readonly catalogueImages = inject(CataloguePaintingService);
  protected readonly kept = inject(KeptService);

  protected readonly painting = signal<Blob | null>(null);
  protected readonly preview = signal<string | null>(null);
  /** What the chosen painting is, for the line under the preview. */
  protected readonly chosen = signal<string | null>(null);
  protected readonly tokenId = signal('');
  protected readonly fetching = signal(false);
  /** The Brush node whose marks are being drawn, if any. */
  protected readonly marking = signal<GraphNode | null>(null);
  /** The depth map being looked at, as a url, while the painting moves. */
  protected readonly moving = signal<string | null>(null);

  protected readonly catalogue = signal<NodeTypeDef[]>([]);
  /** The ready-made graphs the engine offers. */
  protected readonly flows = signal<FlowDef[]>([]);
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

  /** Which layer is on its way to the bucket, by filename. */
  protected readonly keeping = signal<string | null>(null);
  /** What has been kept out of this run, so the button can say so. */
  protected readonly alreadyKept = signal<Set<string>>(new Set());

  constructor() {
    void this.wake();
    this.recall();
    void this.kept.refresh();
  }

  /**
   * Sends one layer to the bucket. Only ever from a press.
   *
   * The engine's folder is scratch — it is cleared whenever he likes and lives
   * on one machine. This is the only route by which anything the atelier makes
   * leaves that machine, and it is never taken on its own.
   */
  protected async save(file: string): Promise<void> {
    if (this.keeping()) return;
    this.keeping.set(file);
    this.failure.set(null);
    try {
      const picture = await fetch(this.engine.layerUrl(file)).then((r) => {
        if (!r.ok) throw new Error('that layer is no longer on this machine');
        return r.blob();
      });
      const size = await this.sizeOf(picture);
      await this.kept.keep(picture, {
        name: this.chosen() ?? file,
        kind: kindOf(file),
        tokenId: this.tokenId().trim() || undefined,
        width: size.width,
        height: size.height,
      });
      this.alreadyKept.update((all) => new Set(all).add(file));
    } catch (error) {
      this.failure.set(error instanceof Error ? error.message : 'it could not be kept');
    } finally {
      this.keeping.set(null);
    }
  }

  /** The size of a picture, so the shelf can say how big each one is. */
  private sizeOf(picture: Blob): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(picture);
      const image = new Image();
      const done = (size: { width: number; height: number }) => {
        URL.revokeObjectURL(url);
        resolve(size);
      };
      // Bounded, like everywhere else here: an image that neither loads nor
      // fails would otherwise hold the save open for ever.
      const timer = setTimeout(() => done({ width: 0, height: 0 }), 5000);
      image.onload = () => {
        clearTimeout(timer);
        done({ width: image.naturalWidth, height: image.naturalHeight });
      };
      image.onerror = () => {
        clearTimeout(timer);
        done({ width: 0, height: 0 });
      };
      image.src = url;
    });
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

    // Already quiet on failure, because an engine too old to have flows is an
    // engine with no buttons rather than a broken page.
    this.flows.set(await this.engine.flows());
  }

  /**
   * Drops a ready-made graph on the canvas, in place of whatever was there.
   *
   * **It replaces rather than adds.** Merging two graphs leaves boxes on top
   * of each other and wires going nowhere, and the one thing a flow is for is
   * arriving correct.
   */
  protected start(flow: FlowDef): void {
    // The ids in a flow are readable — `painting`, `grow`, `keep` — and are
    // made unique here, because two flows in a row would otherwise collide
    // with each other in localStorage.
    const run = Math.random().toString(36).slice(2, 7);
    const named = (at: string) => `${at}-${run}`;

    this.redraw({
      nodes: flow.nodes.map((node) => ({
        id: named(node.at),
        type: node.type,
        // The engine says what follows what; this page decides how wide a box
        // is, so it is this page that turns a column into a position.
        x: 30 + node.column * (NODE_WIDTH + 70),
        y: 30 + node.row * 190,
        params: { ...node.params },
      })),
      edges: flow.edges.map(([source, from, target, to]) => ({
        from: [named(source), from] as [string, string],
        to: [named(target), to] as [string, string],
      })),
    });

    this.result.set(null);
    this.failure.set(null);
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

  /**
   * The depth map this run produced, if it made one.
   *
   * Found through the graph rather than by guessing at filenames: the page
   * knows which boxes are Depth boxes, and the run says what each box
   * produced.
   */
  protected readonly depthMap = computed(() => {
    const run = this.result();
    if (!run) return null;
    for (const node of this.nodes()) {
      if (node.type !== 'depth') continue;
      const made = run.produced?.[node.id]?.['file'];
      if (typeof made === 'string') return made;
    }
    return null;
  });

  /**
   * The piece this run wrote, if it wrote one.
   *
   * The code itself, not a url. It never goes to a server — it came off this
   * machine's own engine and is handed straight to a frame with no network.
   */
  protected readonly written = computed(() => {
    const run = this.result();
    if (!run) return null;
    for (const node of this.nodes()) {
      if (node.type !== 'sketch') continue;
      const made = run.produced?.[node.id];
      const code = made?.['code'];
      if (typeof code === 'string' && code.length) {
        const file = made?.['file'];
        return { code, file: typeof file === 'string' ? file : null };
      }
    }
    return null;
  });

  protected see(file: string): void {
    this.moving.set(this.engine.layerUrl(file));
  }

  /** Whether the written piece is on screen, running. */
  protected readonly playing = signal(false);

  protected layerUrl(file: string): string {
    return this.engine.layerUrl(file);
  }
}

/** What a layer is, read from the name the engine gave it. */
function kindOf(file: string): string {
  if (file.includes('background-filled')) return 'background';
  if (file.includes('background')) return 'background';
  if (file.includes('depth')) return 'depth';
  if (file.includes('edit')) return 'edit';
  return 'layer';
}
