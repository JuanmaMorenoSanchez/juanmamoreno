import { Injectable, signal } from '@angular/core';

/** Where the engine listens. Not configurable: it runs on this machine or not at all. */
const ENGINE = 'http://127.0.0.1:7860';

/**
 * Chrome gates a page served from the internet reaching this machine, and has
 * done since Chromium 142. The annotation is what the preflight looks for; the
 * permission prompt does the rest, once per origin.
 *
 * **`loopback`, not `local`.** Chrome counts three address spaces and 127.0.0.1
 * is the narrowest of them: `local` means a LAN address like 192.168.1.5, and
 * declaring it for a loopback address is not a near-enough approximation — the
 * request is refused outright with *"had a target IP address space of `local`
 * yet the resource is in address space `loopback`"*. Which is how this was
 * found, because both values look equally plausible written down.
 *
 * Not in `RequestInit` yet, hence the cast rather than a lie about the type.
 */
type LoopbackRequestInit = RequestInit & { targetAddressSpace?: 'loopback' };

const toLocal = (init: RequestInit = {}): RequestInit =>
  ({ ...init, targetAddressSpace: 'loopback' }) as LoopbackRequestInit;

export interface EngineHealth {
  device: string;
  resident: string | null;
  vramFreeMib: number | null;
  vramTotalMib: number | null;
}

export interface PortDef {
  name: string;
  kind: string;
  optional: boolean;
}

export interface ParamDef {
  name: string;
  kind: 'text' | 'number' | 'toggle';
  default: string | number | boolean;
  label: string;
  minimum: number | null;
  maximum: number | null;
  step: number | null;
  help: string;
}

export interface NodeTypeDef {
  key: string;
  label: string;
  category: string;
  summary: string;
  help: string;
  inputs: PortDef[];
  outputs: PortDef[];
  params: ParamDef[];
}

export interface GraphRun {
  batch: string;
  seconds: number;
  produced: Record<string, Record<string, unknown>>;
  saved: string[];
}

export interface CutLayer {
  label: string;
  file: string;
  score: number;
  iou: number;
  coverage: number;
}

export interface CutResult {
  batch: string;
  seconds: number;
  layers: CutLayer[];
  background: { file: string; coverage: number; filled?: string } | null;
  notFound: string[];
}

/**
 * The browser's half of the conversation with the local engine.
 *
 * Plain `fetch` rather than `HttpClient`, for one reason: the request has to
 * carry `targetAddressSpace`, which Angular's client has no way to set.
 */
@Injectable({ providedIn: 'root' })
export class AtelierEngineService {
  private readonly state = signal<EngineHealth | null>(null);
  private readonly down = signal(false);
  private readonly asking = signal(false);

  /** What the engine last said about itself, or null before it has said anything. */
  readonly health = this.state.asReadonly();
  /** True once an attempt to reach it has failed. */
  readonly unreachable = this.down.asReadonly();
  readonly checking = this.asking.asReadonly();

  /**
   * Asks whether it is up, and how much of the card is free.
   *
   * Never throws. "Not reachable" is an ordinary state of this page, not an
   * error — the engine is a process he starts, and the page is often open
   * before he has.
   */
  async check(): Promise<void> {
    this.asking.set(true);
    try {
      const response = await fetch(`${ENGINE}/health`, toLocal({ cache: 'no-store' }));
      if (!response.ok) throw new Error(String(response.status));
      const body = (await response.json()) as {
        device: string;
        resident: string | null;
        vram_free_mib: number | null;
        vram_total_mib: number | null;
      };
      this.state.set({
        device: body.device,
        resident: body.resident,
        vramFreeMib: body.vram_free_mib,
        vramTotalMib: body.vram_total_mib,
      });
      this.down.set(false);
    } catch {
      // Why it failed is not knowable from here: a refused connection and a
      // refused permission both arrive as the same TypeError. The page says
      // both things rather than guessing at one.
      this.state.set(null);
      this.down.set(true);
    } finally {
      this.asking.set(false);
    }
  }

  /** Name things in a painting, get a layer each. Throws, so the page can say why. */
  async cut(painting: Blob, labels: string[], fillBehind: boolean): Promise<CutResult> {
    const form = new FormData();
    form.append('image', painting, 'painting');
    form.append('labels', labels.join('\n'));
    form.append('fill_behind', String(fillBehind));

    const response = await fetch(`${ENGINE}/cut`, toLocal({ method: 'POST', body: form }));
    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      throw new Error(detail || `the engine answered ${response.status}`);
    }
    const body = (await response.json()) as Omit<CutResult, 'notFound'> & {
      not_found: string[];
    };
    return { ...body, notFound: body.not_found };
  }

  /** Hands the card back without stopping the engine. */
  async evict(): Promise<void> {
    await fetch(`${ENGINE}/evict`, toLocal({ method: 'POST' })).catch(() => undefined);
    await this.check();
  }

  /**
   * What this engine can do.
   *
   * The palette is built from the answer rather than from a list in the page,
   * so a node added to the engine appears here without the site being touched.
   */
  async catalogue(): Promise<NodeTypeDef[]> {
    const response = await fetch(`${ENGINE}/nodes`, toLocal({ cache: 'no-store' }));
    if (!response.ok) throw new Error(`the engine answered ${response.status}`);
    return ((await response.json()) as { nodes: NodeTypeDef[] }).nodes;
  }

  /** Run a drawn graph. Throws with the engine's own words, which name a node. */
  async runGraph(painting: Blob, graph: unknown): Promise<GraphRun> {
    const form = new FormData();
    form.append('image', painting, 'painting');
    form.append('graph', JSON.stringify(graph));

    const response = await fetch(`${ENGINE}/graph`, toLocal({ method: 'POST', body: form }));
    if (!response.ok) {
      let said = '';
      try {
        said = ((await response.json()) as { detail?: string }).detail ?? '';
      } catch {
        said = '';
      }
      throw new Error(said || `the engine answered ${response.status}`);
    }
    return (await response.json()) as GraphRun;
  }

  /** Where a cut layer can be seen. */
  layerUrl(file: string): string {
    return `${ENGINE}/layer/${encodeURIComponent(file)}`;
  }
}
