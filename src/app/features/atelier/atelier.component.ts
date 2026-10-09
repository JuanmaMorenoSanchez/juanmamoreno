import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CataloguePaintingService } from './catalogue-painting.service';
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
  private readonly catalogueImages = inject(CataloguePaintingService);

  protected readonly painting = signal<Blob | null>(null);
  protected readonly preview = signal<string | null>(null);
  /** What the chosen painting is, for the line under the preview. */
  protected readonly chosen = signal<string | null>(null);
  protected readonly tokenId = signal('');
  protected readonly fetching = signal(false);

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
