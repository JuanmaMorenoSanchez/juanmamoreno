import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { BrushOverlayComponent, readMarks, type Marks } from './brush-overlay.component';
import { CataloguePaintingService, type Wanted } from './catalogue-painting.service';
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

  /**
   * The token id the painting on the canvas came from, when it came from one.
   *
   * Null for a file he chose himself: there is no larger copy of that to go
   * and get, and Run should not offer what it cannot do.
   */
  protected readonly fromCatalogue = signal<string | null>(null);

  /** Which copy is loaded, so the page can say what a run would use. */
  protected readonly at = signal<Wanted | null>(null);

  /** Whether Run is asking which copy to use rather than running. */
  protected readonly choosing = signal(false);
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

    // The shelf shows the bytes, and the route they come from wants a
    // credential an `img` cannot send.
    effect(() => {
      for (const piece of this.kept.pieces()) void this.kept.show(piece.id);
    });
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
      // Through the engine service, which annotates every request to
      // 127.0.0.1 with `targetAddressSpace: 'loopback'`. This was the one
      // engine request in the page that did not: Chrome has gated a public
      // page reaching loopback since 142, and from 156 the gate cannot be
      // turned off, so an unannotated request is refused before it is sent.
      const got = await this.engine.layerBytes(file);

      // A clip cannot be measured with an `Image`, and asking costs a decode
      // of the whole file. The engine named it, so the node that made it is
      // what says how big it is.
      const film = this.filmed();
      const clip = film?.file === file || got.type === 'video/mp4';
      const size = clip
        ? { width: film?.width ?? 0, height: film?.height ?? 0 }
        : await this.sizeOf(got);

      await this.kept.keep(got, {
        name: this.chosen() ?? file,
        kind: clip ? 'clip' : kindOf(file),
        media: clip ? 'video/mp4' : 'image/png',
        tokenId: this.tokenId().trim() || undefined,
        width: size.width,
        height: size.height,
      });
      this.alreadyKept.update((all) => new Set(all).add(file));
    } catch (error) {
      // The real one to the console as well as a sentence on screen. A
      // minified message — "f is not iterable" — is the whole of what a
      // failure here used to leave behind, and it named neither the stage nor
      // the value.
      console.error('keeping a layer failed', error);
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

    // The graph came back from storage before the catalogue did, so anything
    // it was missing could not be filled in then. Now it can.
    this.nodes.update((nodes) =>
      nodes.map((node) => ({ ...node, params: this.filled(node.type, node.params) }))
    );

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
        params: this.filled(node.type, node.params),
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
   * Every setting a node takes, with what the engine says each one should be
   * where the graph itself does not say.
   *
   * A flow sets the two or three settings it is about and leaves the rest, and
   * a graph brought back from before a setting existed has never heard of it.
   * Both ran correctly — the engine fills a missing setting with its default —
   * and both drew an empty box on screen, so the number that was going to be
   * used was the one thing not written anywhere he could see it.
   *
   * A node the catalogue has never heard of keeps exactly what it arrived
   * with: a saved graph can outlive the engine that could run it, and
   * inventing settings for it would be inventing them from nothing.
   */
  private filled(
    type: string,
    params: Record<string, unknown> = {}
  ): Record<string, string | number | boolean> {
    const known = this.catalogue().find((entry) => entry.key === type);
    const filled: Record<string, string | number | boolean> = {};
    for (const param of known?.params ?? []) filled[param.name] = param.default;

    return { ...filled, ...(params as Record<string, string | number | boolean>) };
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
      this.nodes.set(
        (drawn.nodes ?? []).map((node) => ({
          ...node,
          params: this.filled(node.type, node.params),
        }))
      );
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
    // His own file is whatever he gave it. There is no bigger copy of it to
    // fetch, so Run does not offer one.
    this.fromCatalogue.set(null);
    this.at.set(null);
  }

  /**
   * The same painting, by its token id instead of by finding the file.
   *
   * Takes the best copy the catalogue has rather than the one a tile would
   * use: cutting a layer from a 95 KB thumbnail gives a 95 KB layer.
   */
  protected async byId(wanted: Wanted = 'web'): Promise<void> {
    const token = this.tokenId().trim();
    if (!token || this.fetching()) return;

    this.fetching.set(true);
    this.failure.set(null);
    try {
      const got = await this.catalogueImages.byId(token, wanted);
      const size = got.width ? ` · ${got.width}×${got.height}` : '';
      const note = got.reduced ? ' · reduced to the medium size' : '';
      this.take(got.blob, `${got.name}${size}${note}`);
      // Remembered so the Run button can offer to go and get the big copy,
      // and so that a file chosen by hand does not pretend it can.
      this.fromCatalogue.set(token);
      this.at.set(wanted);
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

  /**
   * Run, or first ask which copy of the painting to run on.
   *
   * A graph takes minutes and what goes in decides what comes out, at the same
   * size — so the small copy answers "is this the right instruction" in a
   * fraction of the time, and the big one is for the run he means to keep.
   * Asked rather than remembered, because the answer is different for the
   * fourth attempt and the fifth.
   *
   * Only where there is a bigger copy to fetch. A file he chose himself runs
   * as it is.
   */
  protected asked(): void {
    if (this.fromCatalogue() && !this.busy()) {
      this.choosing.set(true);
      return;
    }
    void this.run();
  }

  /**
   * Runs the graph, fetching the big copy first when that is what was chosen.
   *
   * The fetch is part of the run rather than something to do beforehand: it is
   * five megabytes over a slow host, and nobody wants it until the moment they
   * have decided to wait for the run itself.
   */
  protected async run(wanted?: Wanted): Promise<void> {
    this.choosing.set(false);

    const token = this.fromCatalogue();
    if (wanted && token && wanted !== this.at()) {
      await this.byId(wanted);
      if (this.failure()) return;
    }

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

  /**
   * The clip this run filmed, if it filmed one.
   *
   * Found through the graph like the depth map and the written piece, rather
   * than by guessing at a filename. It is deliberately not in `run.saved`:
   * that list is pictures, shown in an `img` and offered to the bucket, and an
   * mp4 in it rendered as a broken image beside a Save that would not work.
   */
  protected readonly filmed = computed(() => {
    const run = this.result();
    if (!run) return null;
    for (const node of this.nodes()) {
      if (node.type !== 'video') continue;
      const made = run.produced?.[node.id];
      const file = made?.['file'];
      if (typeof file === 'string' && file.length) {
        return {
          file,
          // Reported by the box that made it. A video cannot be measured by
          // loading it into an `Image`, and decoding one to ask would cost
          // megabytes for two numbers.
          width: Number(made?.['width']) || 0,
          height: Number(made?.['height']) || 0,
        };
      }
    }
    return null;
  });

  protected see(file: string): void {
    this.moving.set(this.engine.layerUrl(file));
  }

  /**
   * Keeps a written piece, so it can be looked at away from this machine.
   *
   * The code, not a picture. It goes to the same place a layer does and is
   * served back as text; nothing runs it but the sandboxed frame. A piece
   * kept here is not published — that is still a line added to
   * `sketches/registry.ts` by hand, deliberately.
   */
  protected async keepPiece(): Promise<void> {
    const piece = this.written();
    if (!piece || this.keeping()) return;

    const name = piece.file ?? 'piece';
    this.keeping.set(name);
    this.failure.set(null);
    try {
      await this.kept.keep(new Blob([piece.code], { type: 'text/javascript' }), {
        name: this.pieceName() || name,
        kind: 'piece',
        media: 'text/javascript',
        tokenId: this.tokenId().trim() || undefined,
        // A piece has no size: it is code, and the frame it runs in decides
        // how big it is drawn.
        width: 0,
        height: 0,
      });
      this.alreadyKept.update((all) => new Set(all).add(name));
    } catch (error) {
      this.failure.set(error instanceof Error ? error.message : 'it could not be kept');
    } finally {
      this.keeping.set(null);
    }
  }

  /** What the piece was asked for, which is the only name it has. */
  private pieceName(): string {
    const asking = this.nodes().find((node) => node.type === 'sketch')?.params?.['asking'];
    return typeof asking === 'string' ? asking.slice(0, 80) : '';
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
