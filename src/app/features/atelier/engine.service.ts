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
  /**
   * `slider` is a number with a band worth seeing, drawn as a range. Every
   * rule about numbers applies to it unchanged — the engine range-checks it
   * the same way before a run.
   */
  kind: 'text' | 'number' | 'slider' | 'toggle' | 'choice' | 'points';
  default: string | number | boolean;
  label: string;
  /** Every value a `choice` may take, in the order to offer them. Empty otherwise. */
  choices: string[];
  /**
   * What is wise, where that is narrower than what the node accepts.
   *
   * `minimum` and `maximum` are what it will take at all; this is the band it
   * is worth being in, with the sentence saying what leaving it does. Absent
   * on anything where every value is as good as another, like a seed, and on
   * an engine older than the field.
   */
  advice?: {
    below: number | null;
    above: number | null;
    low: string;
    high: string;
  } | null;
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

/** One file the engine still has in its run folder. */
export interface StillHere {
  file: string;
  bytes: number;
  /** Whole seconds since the epoch, which is enough to say which one. */
  when: number;
  media: string;
}

export interface CutResult {
  batch: string;
  seconds: number;
  layers: CutLayer[];
  background: { file: string; coverage: number; filled?: string } | null;
  notFound: string[];
}

/**
 * The painters the work leans towards, and whether the model has read about
 * any of them.
 */
export interface Hand {
  hand: string;
  /** By name: true if the model could place them, false if it could not. */
  known: Record<string, boolean>;
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
   * The short description of a painting, written on this machine.
   *
   * The `alt` attribute of the image, which is why it is short and visual:
   * a screen reader says it to somebody who cannot see the canvas. The
   * prompt is passed in rather than held here, because the backend owns both
   * languages and a second copy of either would drift from it.
   *
   * Tens of seconds, not the minutes an essay takes — it is a hundred words
   * and the model is quantised onto the card.
   */
  async describe(prompt: string, image: string): Promise<string> {
    return this.write(prompt, [image]);
  }

  /**
   * Whatever the brief asked for, written on this machine.
   *
   * The same route the short descriptions use, with room for an essay: a
   * description is a hundred words and an essay is seven hundred with a
   * caption after it, and the model stops at the ceiling it is given.
   *
   * No deadline. An essay is a minute and a half on this card and a timeout
   * here would throw away work already paid for in card time.
   */
  async write(prompt: string, images: string[], mostTokens = 2200): Promise<string> {
    const response = await fetch(
      `${ENGINE}/describe`,
      toLocal({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, images, most_tokens: mostTokens }),
      })
    );
    if (!response.ok) throw new Error(await complaint(response));
    return ((await response.json()) as { text: string }).text;
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
   * The painters the work leans towards, as the engine has them.
   *
   * Nowhere near git and nowhere near the backend: the engine keeps them in a
   * file this repository ignores, and this is the only way the page sees
   * them. An engine that has never been told answers with nothing, which is
   * also what a fresh clone does, and the prompts are then the prompts.
   */
  async hand(): Promise<Hand> {
    try {
      const response = await fetch(`${ENGINE}/hand`, toLocal({ cache: 'no-store' }));
      if (!response.ok) return { hand: '', known: {} };
      const said = (await response.json()) as Partial<Hand>;
      return { hand: said.hand ?? '', known: said.known ?? {} };
    } catch {
      return { hand: '', known: {} };
    }
  }

  /**
   * Writes them down, and answers with what the model makes of each name.
   *
   * The judging happens here rather than at the start of a run: it costs a
   * model load, and the moment to spend that is while he is typing names and
   * waiting on the answer, not half an hour into an edit.
   */
  async setHand(hand: string): Promise<Hand> {
    const response = await fetch(
      `${ENGINE}/hand`,
      toLocal({
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hand }),
      })
    );
    if (!response.ok) throw new Error(await complaint(response));
    const said = (await response.json()) as Partial<Hand>;
    return { hand: said.hand ?? '', known: said.known ?? {} };
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

  /**
   * The bytes of a layer, for keeping it.
   *
   * Here rather than in the page because every request to the engine carries
   * `targetAddressSpace: 'loopback'`, and the one in the page that fetched
   * these bytes did not: a url is enough for an `img`, which the browser
   * annotates for itself, and not enough for a `fetch`, which it refuses.
   */
  /**
   * What the engine still has in its run folder, newest first.
   *
   * The way back to a finished run's output. `out/` is scratch and is never
   * swept, so everything a run ever made is still there — and a page that has
   * been reloaded, or that looked for the wrong kind of box, has no other
   * route to it.
   */
  async stillHere(): Promise<StillHere[]> {
    const response = await fetch(`${ENGINE}/out`, toLocal({ cache: 'no-store' }));
    if (!response.ok) throw new Error(await complaint(response));
    const body = (await response.json()) as { files?: StillHere[] };
    return body.files ?? [];
  }

  /**
   * Several clips, in the order given, as one longer one.
   *
   * On the engine because ffmpeg is there and proven there — it writes every
   * clip this returns — and because the alternative was putting it in Cloud
   * Run to serve an operation only ever asked for from this machine. Nothing
   * leaves it either way: the bytes go up from the browser, which already
   * holds them for the shelf, and come straight back.
   *
   * `size` is the shape to join at, which is the first clip's. Sent rather
   * than measured, because the shelf knows every clip's size and asking
   * ffprobe for a number already in hand means finding a second binary.
   */
  async join(clips: Blob[], size: { width: number; height: number }): Promise<Blob> {
    const form = new FormData();
    clips.forEach((clip, at) => form.append('clips', clip, `${at}.mp4`));
    form.append('width', String(size.width));
    form.append('height', String(size.height));

    const response = await fetch(`${ENGINE}/join`, toLocal({ method: 'POST', body: form }));
    // The engine's own words: it is the thing that knows a clip was refused
    // for its shape rather than for being one clip.
    if (!response.ok) throw new Error(await complaint(response));
    return response.blob();
  }

  async layerBytes(file: string): Promise<Blob> {
    const response = await fetch(this.layerUrl(file), toLocal({ cache: 'no-store' }));
    if (!response.ok) throw new Error('that is no longer on this machine');
    return response.blob();
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
