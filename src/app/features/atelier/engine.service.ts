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
  /** True while a run is in progress. Stopping is refused then. */
  working: boolean;
  /** The run in progress, so a reloaded page can pick it up again. */
  job: string | null;
}

/** What the switch is doing. */
export type Switching = 'idle' | 'starting' | 'stopping';

export interface PortDef {
  name: string;
  kind: string;
  optional: boolean;
}

export interface ParamDef {
  name: string;
  /**
   * `points` is not a field: it is edited by marking the painting itself, and
   * the canvas draws a button for it rather than an input.
   */
  kind: 'text' | 'number' | 'toggle' | 'points';
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

/**
 * A graph that arrives already wired up.
 *
 * `column` and `row` rather than pixels: where a box sits depends on how wide
 * this page draws one, which is not the engine's business.
 */
export interface FlowDef {
  key: string;
  label: string;
  /** One line, on the button. */
  blurb: string;
  /** The longer explanation, behind the ?. */
  about: string;
  nodes: {
    at: string;
    type: string;
    params: Record<string, string | number | boolean>;
    column: number;
    row: number;
  }[];
  /** `[from id, from port, to id, to port]`, as the graph endpoint takes them. */
  edges: [string, string, string, string][];
}

/** How a run is getting on. */
export interface JobState {
  job: string;
  state: 'running' | 'done' | 'failed' | 'cancelled';
  node: string | null;
  doneNodes: number;
  totalNodes: number;
  step: number;
  steps: number;
  seconds: number;
  /** What is happening when there is nothing countable to report. */
  note: string | null;
  result: GraphRun | null;
  detail: string | null;
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
  private readonly doing = signal<Switching>('idle');

  /** What the engine last said about itself, or null before it has said anything. */
  readonly health = this.state.asReadonly();
  /** True once an attempt to reach it has failed. */
  readonly unreachable = this.down.asReadonly();
  readonly checking = this.asking.asReadonly();
  /** 'starting' or 'stopping' while the switch is mid-flight. */
  readonly switching = this.doing.asReadonly();

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
        working?: boolean;
        job?: string | null;
      };
      this.state.set({
        device: body.device,
        resident: body.resident,
        vramFreeMib: body.vram_free_mib,
        vramTotalMib: body.vram_total_mib,
        working: body.working ?? false,
        job: body.job ?? null,
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

  /**
   * Asks the engine to stop, then waits until it really has.
   *
   * It refuses while a run is going: an edit takes eighteen minutes and
   * throwing one away because a switch was brushed is worse than waiting.
   */
  async stop(): Promise<void> {
    this.doing.set('stopping');
    try {
      const response = await fetch(`${ENGINE}/stop`, toLocal({ method: 'POST' }));
      if (response.status === 409) {
        const said = ((await response.json()) as { detail?: string }).detail;
        throw new Error(said ?? 'something is still running');
      }
      if (!response.ok) throw new Error(`the engine answered ${response.status}`);
      await this.until(false);
    } finally {
      this.doing.set('idle');
      await this.check();
    }
  }

  /**
   * Asks Windows to start the engine, then waits until it answers.
   *
   * A page cannot launch a program — if one could, every website could. So it
   * opens a protocol Windows has been told about once, and Windows runs the
   * launcher. Nothing comes back from that: whether it worked is learned by
   * asking the engine until it replies.
   */
  async start(): Promise<void> {
    this.doing.set('starting');
    try {
      // An iframe rather than changing location: a protocol the browser does
      // not know would otherwise navigate the page away from the atelier.
      const hidden = document.createElement('iframe');
      hidden.style.display = 'none';
      hidden.src = 'atelier://start';
      document.body.appendChild(hidden);
      setTimeout(() => hidden.remove(), 2000);

      const up = await this.until(true, 40_000);
      if (!up) {
        throw new Error(
          'Windows was asked to start it, but it never answered. Is the atelier:// handler installed?'
        );
      }
    } finally {
      this.doing.set('idle');
      await this.check();
    }
  }

  /** Polls until the engine is there, or is not, or we give up. */
  private async until(wanted: boolean, limitMs = 15_000): Promise<boolean> {
    const deadline = Date.now() + limitMs;
    while (Date.now() < deadline) {
      let answered = false;
      try {
        const response = await fetch(`${ENGINE}/health`, toLocal({ cache: 'no-store' }));
        answered = response.ok;
      } catch {
        answered = false;
      }
      if (answered === wanted) return true;
      await new Promise((again) => setTimeout(again, 600));
    }
    return false;
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

  /**
   * The graphs that arrive already wired up.
   *
   * From the engine for the same reason the catalogue is: a flow is made of
   * node names, and this page is not allowed to know one. Quiet on failure —
   * an engine too old to have flows is an engine with no buttons, not a
   * broken page.
   */
  async flows(): Promise<FlowDef[]> {
    try {
      const response = await fetch(`${ENGINE}/flows`, toLocal({ cache: 'no-store' }));
      if (!response.ok) return [];
      return ((await response.json()) as { flows: FlowDef[] }).flows ?? [];
    } catch {
      return [];
    }
  }

  /**
   * Start a graph running. Answers at once with the run's name.
   *
   * It used to wait for the whole thing, which was fine at twenty seconds and
   * stopped being fine when an edit took eighteen minutes.
   */
  async startGraph(painting: Blob, graph: unknown): Promise<JobState> {
    const form = new FormData();
    form.append('image', painting, 'painting');
    form.append('graph', JSON.stringify(graph));

    const response = await fetch(`${ENGINE}/graph`, toLocal({ method: 'POST', body: form }));
    if (!response.ok) throw new Error(await complaint(response));
    return asJob(await response.json());
  }

  /**
   * How a run is getting on.
   *
   * Asked once a second rather than streamed: `EventSource` cannot carry
   * `targetAddressSpace`, which Chrome wants before this page may reach this
   * machine at all — the same reason a WebSocket was ruled out. At about a
   * hundred seconds a step there is nothing a stream would show that this
   * does not.
   */
  async job(id: string): Promise<JobState> {
    const response = await fetch(
      `${ENGINE}/jobs/${encodeURIComponent(id)}`,
      toLocal({ cache: 'no-store' })
    );
    if (!response.ok) throw new Error(await complaint(response));
    return asJob(await response.json());
  }

  /** Ask a run to stop. It does so between steps, not within one. */
  async cancelJob(id: string): Promise<void> {
    const response = await fetch(
      `${ENGINE}/jobs/${encodeURIComponent(id)}/cancel`,
      toLocal({ method: 'POST' })
    );
    if (!response.ok) throw new Error(await complaint(response));
  }

  /** Where a cut layer can be seen. */
  layerUrl(file: string): string {
    return `${ENGINE}/layer/${encodeURIComponent(file)}`;
  }
}

/** The engine's own words, which name the node at fault. */
async function complaint(response: Response): Promise<string> {
  try {
    const said = ((await response.json()) as { detail?: string }).detail;
    if (said) return said;
  } catch {
    // An empty or unreadable body; the status is all there is.
  }
  return `the engine answered ${response.status}`;
}

function asJob(raw: unknown): JobState {
  const d = raw as Record<string, never>;
  return {
    job: d['job'],
    state: d['state'],
    node: d['node'] ?? null,
    doneNodes: d['done_nodes'] ?? 0,
    totalNodes: d['total_nodes'] ?? 0,
    step: d['step'] ?? 0,
    steps: d['steps'] ?? 0,
    seconds: d['seconds'] ?? 0,
    note: d['note'] ?? null,
    result: d['result'] ?? null,
    detail: d['detail'] ?? null,
  };
}
