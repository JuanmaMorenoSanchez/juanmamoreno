import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { AtelierComponent, SETTLES } from './atelier.component';
import { CataloguePaintingService } from './catalogue-painting.service';
import { KeptService } from './kept.service';
import {
  AtelierEngineService,
  type FlowDef,
  type GraphRun,
  type JobState,
  type NodeTypeDef,
} from './engine.service';

const ISOLATE: NodeTypeDef = {
  key: 'isolate',
  label: 'Isolate',
  category: 'cut',
  summary: 'a box in, the exact shape out',
  help: 'Turns a rough box into the exact shape of what is inside it.',
  inputs: [
    { name: 'image', kind: 'image', optional: false },
    { name: 'box', kind: 'box', optional: false },
  ],
  outputs: [{ name: 'mask', kind: 'mask', optional: false }],
  params: [],
};

const SOURCE: NodeTypeDef = {
  key: 'painting',
  label: 'Painting',
  category: 'in',
  summary: 'where everything starts',
  help: 'The picture chosen above the canvas.',
  inputs: [],
  outputs: [{ name: 'image', kind: 'image', optional: false }],
  params: [],
};

/** A run that is already over, which is what most of these tests need. */
const done = (result: GraphRun): JobState => ({
  job: 'j1',
  state: 'done',
  node: null,
  doneNodes: 0,
  totalNodes: 0,
  step: 0,
  steps: 0,
  seconds: result.seconds,
  note: null,
  result,
  detail: null,
});

const A_NODE: NodeTypeDef = {
  key: 'find',
  label: 'Find',
  category: 'cut',
  summary: 'where something named might be',
  help: 'Asks where something is, by name.',
  inputs: [{ name: 'image', kind: 'image', optional: false }],
  outputs: [{ name: 'box', kind: 'box', optional: false }],
  params: [
    {
      name: 'phrase',
      kind: 'text',
      default: 'a girl',
      label: 'What to look for',
      choices: [],
      minimum: null,
      maximum: null,
      step: null,
      help: 'Short and concrete beats elaborate.',
    },
    {
      name: 'threshold',
      kind: 'number',
      default: 0.25,
      label: 'How sure',
      choices: [],
      minimum: 0.05,
      maximum: 0.9,
      step: 0.05,
      help: 'Lower finds more and is wrong more often.',
    },
  ],
};

/**
 * The page is a front end for a program on his own computer, and it knows the
 * name of no node.
 *
 * So the two things worth testing hardest are what it says when there is
 * nothing to talk to — the state it is in every time he opens it before
 * starting the engine — and that the palette really does come from the engine
 * rather than from a list in the template.
 */
describe('AtelierComponent', () => {
  const build = (
    options: {
      unreachable?: boolean;
      switching?: 'idle' | 'starting' | 'stopping';
      byId?: () => Promise<{
        blob: Blob;
        name: string;
        quality: 'original' | 'cached' | 'thumbnail';
        width: number;
        height: number;
      }>;
      onStart?: () => Promise<void>;
      onStop?: () => Promise<void>;
      catalogue?: NodeTypeDef[];
      flows?: FlowDef[];
      hand?: string;
      run?: () => Promise<GraphRun>;
      states?: JobState[];
      kept?: unknown[];
      onKeep?: () => Promise<unknown>;
      stored?: string;
    } = {}
  ) => {
    const unreachable = signal(options.unreachable ?? false);
    const health = signal(
      options.unreachable
        ? null
        : { device: 'cuda', resident: null, vramFreeMib: 7096, vramTotalMib: 8187 }
    );
    const sent: unknown[] = [];
    const switching = signal(options.switching ?? 'idle');
    const did: string[] = [];
    const keptCalls: Record<string, unknown>[] = [];
    const wantedByCall: string[] = [];
    const downloaded: string[] = [];
    let asked = -1;
    const queued: JobState[] = options.states ?? [
      {
        job: 'j1',
        state: 'done',
        node: null,
        doneNodes: 0,
        totalNodes: 0,
        step: 0,
        steps: 0,
        seconds: 1,
        note: null,
        result: { batch: 'a', seconds: 1, produced: {}, saved: [] },
        detail: null,
      },
    ];

    try {
      if (options.stored) localStorage.setItem('juanmamoreno.atelier.graph', options.stored);
      else localStorage.removeItem('juanmamoreno.atelier.graph');
    } catch {
      // jsdom without storage; the component copes and so does this.
    }

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [AtelierComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: KeptService,
          useValue: {
            pieces: signal(options.kept ?? []),
            // Blob urls, because the route wants a credential an `img`
            // cannot send and the tag fetches nothing itself.
            urls: signal(
              Object.fromEntries(
                ((options.kept ?? []) as { id: string }[]).map((p) => [p.id, `blob:fake/${p.id}`])
              )
            ),
            show: () => Promise.resolve(),
            saving: signal(false),
            refresh: () => Promise.resolve(),
            keep: (picture: Blob, about: Record<string, unknown>) => {
              keptCalls.push(about);
              return options.onKeep?.() ?? Promise.resolve({ id: 'k1', ...about });
            },
            forget: () => Promise.resolve(),
            imageUrl: (id: string) => `/api/atelier-pieces/${id}/image`,
            // Read off the picture's own size, as the real one does.
            qualityOf: (piece: { width: number; height: number }) =>
              Math.min(piece.width, piece.height) >= 2500 ? 'high' : 'web',
            trouble: signal<Record<string, string>>({}),
            isClip: (piece: { media?: string }) => piece.media === 'video/mp4',
            download: (piece: { id: string }) => {
              downloaded.push(piece.id);
              return Promise.resolve();
            },
          },
        },
        {
          // Reaching the real one would reach ARTWORK_PORT and the network.
          provide: CataloguePaintingService,
          useValue: {
            // Which quality each call asked for, since that is the whole of
            // what the two Run buttons do.
            asked: wantedByCall,
            byId: (_id: string, wanted = 'web') => {
              wantedByCall.push(wanted);
              return (
                options.byId?.() ??
                Promise.resolve({
                  blob: new Blob([new Uint8Array([1])]),
                  name: 'Rockets win I',
                  quality: wanted === 'high' ? ('original' as const) : ('cached' as const),
                  width: wanted === 'high' ? 3000 : 1024,
                  height: wanted === 'high' ? 3180 : 1086,
                  reduced: wanted === 'high',
                })
              );
            },
          },
        },
        {
          provide: AtelierEngineService,
          useValue: {
            health,
            unreachable,
            checking: signal(false),
            switching,
            check: () => Promise.resolve(),
            start: () => {
              did.push('start');
              return options.onStart?.() ?? Promise.resolve();
            },
            stop: () => {
              did.push('stop');
              return options.onStop?.() ?? Promise.resolve();
            },
            evict: () => Promise.resolve(),
            layerUrl: (file: string) => `http://127.0.0.1:7860/layer/${file}`,
            // Through the service, which is what annotates a request to
            // 127.0.0.1 as one the browser is allowed to make.
            layerBytes: () => Promise.resolve(new Blob([new Uint8Array([1])])),
            catalogue: () => Promise.resolve(options.catalogue ?? [A_NODE]),
            flows: () => Promise.resolve(options.flows ?? []),
            // The painters, which this repository does not have: the engine
            // keeps them in a file git ignores, so the stub has none either.
            hand: () => Promise.resolve(options.hand ?? ''),
            setHand: (saying: string) => Promise.resolve(saying.trim()),
            startGraph: (_p: Blob, graph: unknown) => {
              sent.push(graph);
              // A rejecting `run` now stands for the engine refusing the graph.
              return options.run ? options.run().then(() => queued[0]) : Promise.resolve(queued[0]);
            },
            // Each ask walks one along the states given, holding on the last.
            job: () => Promise.resolve(queued[Math.min(++asked + 1, queued.length - 1)]),
            cancelJob: () => {
              did.push('cancel');
              return Promise.resolve();
            },
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(AtelierComponent);
    fixture.detectChanges();
    return {
      fixture,
      host: fixture.nativeElement as HTMLElement,
      sent,
      did,
      unreachable,
      keptCalls,
      wantedByCall,
      downloaded,
    };
  };

  const at = (host: HTMLElement, id: string) =>
    host.querySelector(`[data-testid="${id}"]`) as HTMLElement | null;

  /** Reach past `protected`, which is a compiler nicety rather than a boundary. */
  const guts = (fixture: ReturnType<typeof build>['fixture']) =>
    fixture.componentInstance as unknown as {
      painting: { set(f: File | null): void };
      nodes: { set(v: unknown[]): void; (): unknown[] };
      edges: { set(v: unknown[]): void; (): unknown[] };
      catalogue: { (): NodeTypeDef[] };
      redraw(drawn: unknown): void;
      run(wanted?: 'web' | 'high'): Promise<void>;
      behind: { (): string | null };
      tokenId: { set(v: string): void };
      byId(wanted?: 'web' | 'high'): Promise<void>;
      at: { (): 'web' | 'high' | null };
    };

  /**
   * Let the constructor's fetches land.
   *
   * `whenStable` is no use: the catalogue and the flows are fetched from the
   * constructor and not awaited there, so Angular has no idea either is
   * outstanding. A turn of the task queue is what settles them.
   */
  const drained = () => new Promise((settle) => setTimeout(settle, 0));

  const aPainting = () => new File([new Uint8Array([1])], 'p.png', { type: 'image/png' });

  it('says the engine is not answering, and that the site is not at fault', () => {
    const { host } = build({ unreachable: true });
    const down = at(host, 'engine-down');

    expect(down).not.toBeNull();
    expect(down?.textContent).toContain('127.0.0.1:7860');
    expect(down?.textContent).toContain('There is nothing wrong with the site');
  });

  it('names all three reasons it could be unreachable, including the one Chrome causes', () => {
    const { host } = build({ unreachable: true });
    const text = at(host, 'engine-down')?.textContent ?? '';

    expect(text).toContain('not running');
    expect(text).toContain('different machine');
    expect(text).toContain('Chrome refused');
  });

  it('shows what is left of the card when it is answering', () => {
    const { host } = build();

    expect(at(host, 'engine-up')?.textContent).toContain('7096');
  });

  it('builds its palette from what the engine says it can do', async () => {
    // The whole point of the arrangement: a node added to the engine appears
    // here without this page changing. So the palette must not be a list in a
    // template, and this is what proves it is not.
    const { fixture } = build({
      catalogue: [{ ...A_NODE, key: 'invented', label: 'Invented Later' }],
    });
    // The catalogue is fetched from the constructor and not awaited there, so
    // Angular has no idea it is outstanding. Let the microtasks drain.
    await new Promise((settle) => setTimeout(settle, 0));
    fixture.detectChanges();

    expect(
      guts(fixture)
        .catalogue()
        .map((t) => t.label)
    ).toEqual(['Invented Later']);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Invented Later');
  });

  it('will not run while the engine is unreachable', () => {
    const { host } = build({ unreachable: true });

    expect((at(host, 'run') as HTMLButtonElement).disabled).toBe(true);
  });

  it('will not run with an empty canvas', () => {
    const { fixture, host } = build();
    guts(fixture).painting.set(aPainting());
    fixture.detectChanges();

    expect((at(host, 'run') as HTMLButtonElement).disabled).toBe(true);
  });

  it('will not run before a painting has been chosen', () => {
    const { fixture, host } = build();
    guts(fixture).redraw({ nodes: [{ id: 'a', type: 'find', x: 0, y: 0, params: {} }], edges: [] });
    fixture.detectChanges();

    expect((at(host, 'run') as HTMLButtonElement).disabled).toBe(true);
  });

  it('sends the graph in the shape the engine reads', async () => {
    // Nodes keyed by id, edges flattened to quadruples. Getting this wrong is
    // a 400 that names a node that does not exist.
    const { fixture, sent } = build();
    const parts = guts(fixture);
    parts.painting.set(aPainting());
    parts.redraw({
      nodes: [
        { id: 'src', type: 'painting', x: 0, y: 0, params: {} },
        { id: 'f', type: 'find', x: 0, y: 0, params: { phrase: 'a girl' } },
      ],
      edges: [{ from: ['src', 'image'], to: ['f', 'image'] }],
    });
    await parts.run();

    expect(sent[0]).toEqual({
      nodes: {
        src: { type: 'painting', params: {} },
        f: { type: 'find', params: { phrase: 'a girl' } },
      },
      edges: [['src', 'image', 'f', 'image']],
    });
  });

  it("repeats the engine's complaint, which names the node at fault", async () => {
    const { fixture, host } = build({
      run: () => Promise.reject(new Error("'shape' (Isolate) has nothing joined to: box")),
    });
    const parts = guts(fixture);
    parts.painting.set(aPainting());
    parts.redraw({ nodes: [{ id: 'a', type: 'find', x: 0, y: 0, params: {} }], edges: [] });
    await parts.run();
    fixture.detectChanges();

    expect(at(host, 'failure')?.textContent).toContain('Isolate');
  });

  it('warns that a result is not evidence the thing was there', async () => {
    const { fixture, host } = build({
      states: [done({ batch: 'a', seconds: 2, produced: {}, saved: ['a-girl.png'] })],
    });
    const parts = guts(fixture);
    parts.painting.set(aPainting());
    parts.redraw({ nodes: [{ id: 'a', type: 'find', x: 0, y: 0, params: {} }], edges: [] });
    await parts.run();
    fixture.detectChanges();

    expect(at(host, 'result')?.textContent).toContain('not evidence');
  });

  it('says so when a run kept nothing, rather than showing an empty box', async () => {
    const { fixture, host } = build({
      states: [done({ batch: 'a', seconds: 1, produced: {}, saved: [] })],
    });
    const parts = guts(fixture);
    parts.painting.set(aPainting());
    parts.redraw({ nodes: [{ id: 'a', type: 'find', x: 0, y: 0, params: {} }], edges: [] });
    await parts.run();
    fixture.detectChanges();

    expect(at(host, 'result')?.textContent).toContain('Keep');
  });

  it('offers a switch whether the engine is up or down', () => {
    // It is the one control that has to be reachable in both states: when the
    // engine is down, everything else on the page is unusable.
    expect(at(build({ unreachable: true }).host, 'engine-switch')).not.toBeNull();
    expect(at(build().host, 'engine-switch')).not.toBeNull();
  });

  it('says which way it is going while it goes', async () => {
    const starting = build({ unreachable: true, switching: 'starting' });
    expect(at(starting.host, 'engine-switch')?.textContent).toContain('Switching on');

    const stopping = build({ switching: 'stopping' });
    expect(at(stopping.host, 'engine-switch')?.textContent).toContain('Switching off');
  });

  it('cannot be pressed again while it is switching', () => {
    const { host } = build({ switching: 'starting', unreachable: true });

    expect((at(host, 'engine-switch') as HTMLButtonElement).disabled).toBe(true);
  });

  it('starts when it is off and stops when it is on', async () => {
    const off = build({ unreachable: true });
    (at(off.host, 'engine-switch') as HTMLButtonElement).click();
    await new Promise((settle) => setTimeout(settle, 0));
    expect(off.did).toEqual(['start']);

    const on = build();
    (at(on.host, 'engine-switch') as HTMLButtonElement).click();
    await new Promise((settle) => setTimeout(settle, 0));
    expect(on.did).toEqual(['stop']);
  });

  it('repeats the reason when stopping is refused mid-run', async () => {
    // An edit takes eighteen minutes. Refusing is right; saying nothing is not.
    const { fixture, host } = build({
      onStop: () => Promise.reject(new Error('something is still running')),
    });
    (at(host, 'engine-switch') as HTMLButtonElement).click();
    await new Promise((settle) => setTimeout(settle, 0));
    fixture.detectChanges();

    expect(at(host, 'failure')?.textContent).toContain('still running');
  });

  it('says so when Windows was asked and nothing answered', async () => {
    const { fixture, host } = build({
      unreachable: true,
      onStart: () => Promise.reject(new Error('Is the atelier:// handler installed?')),
    });
    (at(host, 'engine-switch') as HTMLButtonElement).click();
    await new Promise((settle) => setTimeout(settle, 0));
    fixture.detectChanges();

    expect(at(host, 'failure')?.textContent).toContain('handler installed');
  });

  it('says which box is short of a wire, before anything is sent', async () => {
    // The engine refuses accurately — "(Isolate) has nothing joined to: image"
    // — but that arrives after a round trip and reads like the model failed to
    // find something, when a wire is missing. Isolate wants the painting as
    // well as the box.
    const { fixture, host } = build({ catalogue: [ISOLATE] });
    await new Promise((settle) => setTimeout(settle, 0));
    guts(fixture).redraw({
      nodes: [{ id: 'iso', type: 'isolate', x: 0, y: 0, params: {} }],
      edges: [],
    });
    fixture.detectChanges();

    expect(at(host, 'unjoined')?.textContent).toContain('Isolate needs image and box');
  });

  it('will not run while a required port is empty', async () => {
    const { fixture, host } = build({ catalogue: [ISOLATE] });
    await new Promise((settle) => setTimeout(settle, 0));
    const parts = guts(fixture);
    parts.painting.set(aPainting());
    parts.redraw({
      nodes: [{ id: 'iso', type: 'isolate', x: 0, y: 0, params: {} }],
      edges: [],
    });
    fixture.detectChanges();

    expect((at(host, 'run') as HTMLButtonElement).disabled).toBe(true);
  });

  it('stops complaining once every required port is joined', async () => {
    // The painting feeds Find and Isolate both, which is the shape that was
    // missed: one output can and must go to more than one box.
    const { fixture, host } = build({ catalogue: [SOURCE, A_NODE, ISOLATE] });
    await new Promise((settle) => setTimeout(settle, 0));
    guts(fixture).redraw({
      nodes: [
        { id: 'src', type: 'painting', x: 0, y: 0, params: {} },
        { id: 'f', type: 'find', x: 0, y: 0, params: {} },
        { id: 'iso', type: 'isolate', x: 0, y: 0, params: {} },
      ],
      edges: [
        { from: ['src', 'image'], to: ['f', 'image'] },
        { from: ['src', 'image'], to: ['iso', 'image'] },
        { from: ['f', 'box'], to: ['iso', 'box'] },
      ],
    });
    fixture.detectChanges();

    expect(at(host, 'unjoined')).toBeNull();
  });

  it('ignores an optional port that is left alone', async () => {
    // A mask on Edit may be left empty on purpose; complaining about it would
    // train him to ignore the warning.
    const optional: NodeTypeDef = {
      ...ISOLATE,
      key: 'edit',
      label: 'Edit',
      inputs: [
        { name: 'image', kind: 'image', optional: false },
        { name: 'mask', kind: 'mask', optional: true },
      ],
    };
    const { fixture, host } = build({ catalogue: [optional] });
    await new Promise((settle) => setTimeout(settle, 0));
    guts(fixture).redraw({
      nodes: [{ id: 'e', type: 'edit', x: 0, y: 0, params: {} }],
      edges: [{ from: ['e', 'mask'], to: ['e', 'image'] }],
    });
    fixture.detectChanges();

    expect(at(host, 'unjoined')).toBeNull();
  });

  /** A run still going, as the engine would describe it. */
  const going = (over: Partial<JobState> = {}): JobState => ({
    job: 'j1',
    state: 'running',
    node: 'Edit',
    doneNodes: 1,
    totalNodes: 3,
    step: 4,
    steps: 20,
    seconds: 412,
    note: null,
    result: null,
    detail: null,
    ...over,
  });

  const start = async (fixture: ReturnType<typeof build>['fixture']) => {
    const parts = guts(fixture);
    parts.painting.set(aPainting());
    parts.redraw({ nodes: [{ id: 'a', type: 'find', x: 0, y: 0, params: {} }], edges: [] });
    const running = parts.run();
    // Let the first poll land; the page waits a second between asks.
    await new Promise((settle) => setTimeout(settle, 1100));
    return { parts, running };
  };

  it('says which box it is on and how far through, while it works', async () => {
    // Eighteen minutes of a spinner is indistinguishable from a hang, which is
    // the whole reason a run is now followed rather than awaited.
    const { fixture, host } = build({ states: [going(), going()] });
    await start(fixture);
    fixture.detectChanges();

    const said = at(host, 'progress')?.textContent ?? '';
    expect(said).toContain('Edit');
    expect(said).toContain('2 of 3');
    expect(said).toContain('step 4 of 20');
  });

  it('says what it is doing when there is nothing to count', async () => {
    // The first edit of a session spends about four minutes building its
    // pipeline before step one, and "step 0 of 0" looks like nothing at all.
    const { fixture, host } = build({
      // Both: the first is what startGraph answered, the second what the
      // first poll returns, and the note is meant to survive into polling.
      states: [
        going({ steps: 0, step: 0, note: 'preparing the model' }),
        going({ steps: 0, step: 0, note: 'preparing the model' }),
      ],
    });
    await start(fixture);
    fixture.detectChanges();

    expect(at(host, 'progress')?.textContent).toContain('preparing the model');
  });

  it('offers a way to stop, and asks the engine when pressed', async () => {
    const { fixture, host, did } = build({ states: [going(), going()] });
    await start(fixture);
    fixture.detectChanges();

    (at(host, 'stop') as HTMLButtonElement).click();
    await new Promise((settle) => setTimeout(settle, 0));

    expect(did).toContain('cancel');
  });

  it('tells stopped apart from broken', async () => {
    // One is something he did and the other is something that went wrong, and
    // a page that says "failed" for both teaches him to distrust it.
    const { fixture, host } = build({
      states: [going(), { ...going(), state: 'cancelled', detail: 'stopped' }],
    });
    const { running } = await start(fixture);
    await running;
    fixture.detectChanges();

    const said = at(host, 'failure')?.textContent ?? '';
    expect(said).toContain('Stopped');
    expect(said).not.toContain('failed');
  });

  it('shows how long the run took, which only the run knows', async () => {
    // The engine answers the moment a run starts, so the graph's own result
    // carries no elapsed time — it reads "Ran in s" if taken from there.
    const { fixture, host } = build({
      states: [
        going(),
        { ...done({ batch: 'a', seconds: 0, produced: {}, saved: [] }), seconds: 47 },
      ],
    });
    const { running } = await start(fixture);
    await running;
    fixture.detectChanges();

    expect(at(host, 'result')?.textContent).toContain('47');
  });

  it('shows nothing of a run once it is over', async () => {
    const { fixture, host } = build({
      states: [going(), done({ batch: 'a', seconds: 2, produced: {}, saved: [] })],
    });
    const { running } = await start(fixture);
    await running;
    fixture.detectChanges();

    expect(at(host, 'progress')).toBeNull();
  });

  it('offers to show the painting moving only once a Depth box has made a map', async () => {
    const withoutDepth = build({
      states: [done({ batch: 'a', seconds: 1, produced: {}, saved: [] })],
    });
    const first = await start(withoutDepth.fixture);
    await first.running;
    withoutDepth.fixture.detectChanges();
    expect(at(withoutDepth.host, 'see-it-move')).toBeNull();
  });

  it('finds the depth map through the graph, not by guessing at a filename', async () => {
    // The page knows which boxes are Depth boxes and the run says what each
    // box produced. Matching on a name would break the moment two runs are
    // kept, or a file is called something else.
    const { fixture, host } = build({
      states: [
        going(),
        done({
          batch: 'a',
          seconds: 4,
          produced: { d: { file: 'a-depth.png' } },
          saved: ['a-depth.png'],
        }),
      ],
    });
    const parts = guts(fixture);
    parts.painting.set(aPainting());
    parts.redraw({
      nodes: [
        { id: 'src', type: 'painting', x: 0, y: 0, params: {} },
        { id: 'd', type: 'depth', x: 0, y: 0, params: {} },
      ],
      edges: [{ from: ['src', 'image'], to: ['d', 'image'] }],
    });
    const running = parts.run();
    await new Promise((settle) => setTimeout(settle, 1100));
    await running;
    fixture.detectChanges();

    expect(at(host, 'see-it-move')).not.toBeNull();
  });

  it('finds the filled background the same way, for the parallax to show', async () => {
    // What a shifted slice reveals. Found through the graph, like the depth
    // map: a Fill box and what the run says it produced.
    const { fixture } = build({
      states: [
        going(),
        done({
          batch: 'a',
          seconds: 4,
          produced: { d: { file: 'a-depth.png' }, f: { file: 'a-background.png' } },
          saved: ['a-depth.png', 'a-background.png'],
        }),
      ],
    });
    const parts = guts(fixture);
    parts.painting.set(aPainting());
    parts.redraw({
      nodes: [
        { id: 'src', type: 'painting', x: 0, y: 0, params: {} },
        { id: 'd', type: 'depth', x: 0, y: 0, params: {} },
        { id: 'f', type: 'fill', x: 0, y: 0, params: {} },
      ],
      edges: [{ from: ['src', 'image'], to: ['d', 'image'] }],
    });
    const running = parts.run();
    await new Promise((settle) => setTimeout(settle, 1100));
    await running;

    expect(parts.behind()).toContain('a-background.png');
  });

  it('has no background to show when the graph has no Fill in it', async () => {
    const { fixture } = build({
      states: [
        going(),
        done({ batch: 'a', seconds: 4, produced: { d: { file: 'a-depth.png' } }, saved: [] }),
      ],
    });
    const parts = guts(fixture);
    parts.painting.set(aPainting());
    parts.redraw({
      nodes: [{ id: 'd', type: 'depth', x: 0, y: 0, params: {} }],
      edges: [],
    });
    const running = parts.run();
    await new Promise((settle) => setTimeout(settle, 1100));
    await running;

    expect(parts.behind()).toBeNull();
  });

  describe('a clip', () => {
    const filmed = (produced: Record<string, Record<string, unknown>>) => ({
      states: [going(), done({ batch: 'a', seconds: 3600, produced, saved: [] })],
    });

    /**
     * The engine handing the bytes back.
     *
     * Saving fetches the file from the engine before it posts it, and jsdom
     * can reach nothing. Stubbed here rather than skipped, because what is
     * worth testing is what gets sent on: a clip must go as a clip.
     */
    const engineServes = (type = 'video/mp4') => {
      const was = globalThis.fetch;
      globalThis.fetch = (() =>
        Promise.resolve({
          ok: true,
          blob: () => Promise.resolve(new Blob([new Uint8Array([1, 2, 3])], { type })),
        })) as unknown as typeof fetch;
      return () => {
        globalThis.fetch = was;
      };
    };

    const ran = async (fixture: ReturnType<typeof build>['fixture']) => {
      const parts = guts(fixture);
      parts.painting.set(aPainting());
      parts.redraw({
        nodes: [
          { id: 'src', type: 'painting', x: 0, y: 0, params: {} },
          { id: 'film', type: 'video', x: 0, y: 0, params: {} },
        ],
        edges: [{ from: ['src', 'image'], to: ['film', 'image'] }],
      });
      const running = parts.run();
      await new Promise((settle) => setTimeout(settle, 1100));
      await running;
      fixture.detectChanges();
    };

    it('plays it, rather than trying to show it as a picture', async () => {
      // The clip is deliberately not in `run.saved`: that list is rendered in
      // an img and offered to the bucket, and an mp4 in it drew a broken
      // image beside a Save that could not have worked.
      const { fixture, host } = build(filmed({ film: { file: 'a-clip.mp4', frames: 25 } }));
      await ran(fixture);

      const player = at(host, 'clip')?.querySelector('video');
      expect(player).not.toBeNull();
      expect(player?.getAttribute('src')).toContain('a-clip.mp4');
    });

    it('gives it controls and leaves it stopped', async () => {
      // An hour of work is looked at deliberately. Nothing autoplays.
      const { fixture, host } = build(filmed({ film: { file: 'a-clip.mp4', frames: 25 } }));
      await ran(fixture);
      const player = at(host, 'clip')?.querySelector('video');

      expect(player?.hasAttribute('controls')).toBe(true);
      expect(player?.hasAttribute('autoplay')).toBe(false);
      expect(player?.hasAttribute('loop')).toBe(false);
    });

    it('says the clip is only on this machine until it is kept', async () => {
      const { fixture, host } = build(filmed({ film: { file: 'a-clip.mp4', frames: 25 } }));
      await ran(fixture);

      expect(at(host, 'clip')?.textContent).toContain('until you keep it');
    });

    it('offers to keep it, and keeps nothing without being asked', async () => {
      const { fixture, host, keptCalls } = build(
        filmed({ film: { file: 'a-clip.mp4', frames: 25, width: 768, height: 832 } })
      );
      await ran(fixture);
      const stop = engineServes();

      expect(keptCalls).toHaveLength(0);
      at(host, 'save-clip')?.click();
      await new Promise((settle) => setTimeout(settle, 0));

      expect(keptCalls).toHaveLength(1);
      expect(keptCalls[0]['kind']).toBe('clip');
      expect(keptCalls[0]['media']).toBe('video/mp4');
      stop();
    });

    it('keeps the size the box reported, rather than guessing at it', async () => {
      // A video cannot be measured by loading it into an `Image`, and the
      // first attempt here returned a square for a clip that is not one.
      const { fixture, host, keptCalls } = build(
        filmed({ film: { file: 'a-clip.mp4', frames: 25, width: 768, height: 832 } })
      );
      await ran(fixture);
      const stop = engineServes();

      at(host, 'save-clip')?.click();
      await new Promise((settle) => setTimeout(settle, 0));

      expect(keptCalls[0]['width']).toBe(768);
      expect(keptCalls[0]['height']).toBe(832);
      stop();
    });

    it('finds it through the graph rather than by guessing at a filename', async () => {
      // Nothing produced by the Video box means nothing to play, even with
      // other files about.
      const { fixture, host } = build(filmed({ other: { file: 'a-depth.png' } }));
      await ran(fixture);

      expect(at(host, 'clip')).toBeNull();
    });
  });

  it('offers to keep each layer, and keeps nothing without being asked', async () => {
    // The engine's folder is scratch on one machine. This is the only route by
    // which anything the atelier makes leaves it, and it is never taken alone.
    const { fixture, host, keptCalls } = build({
      states: [done({ batch: 'a', seconds: 2, produced: {}, saved: ['a-girl.png'] })],
    });
    const { running } = await start(fixture);
    await running;
    fixture.detectChanges();

    expect(keptCalls).toHaveLength(0);
    expect(at(host, 'save-a-girl.png')).not.toBeNull();
  });

  it('shows what has already been kept, which outlives the engine', () => {
    const { host } = build({
      kept: [
        {
          id: 'k1',
          name: 'Rockets win I',
          tokenId: '195',
          kind: 'layer',
          width: 10,
          height: 10,
          bytes: 1,
          created: '',
        },
      ],
    });

    expect(at(host, 'shelf')?.textContent).toContain('Rockets win I');
  });

  it('offers to hand a kept piece over as a file', async () => {
    // The route is behind the guard, so a right-click on the picture saves a
    // blob url with no name and the wrong extension.
    const { host, downloaded } = build({
      kept: [
        {
          id: 'k1',
          name: 'Rockets win I',
          tokenId: '195',
          kind: 'layer',
          width: 1024,
          height: 1086,
          bytes: 1,
          created: '',
        },
      ],
    });

    at(host, 'download-k1')?.click();

    expect(downloaded).toEqual(['k1']);
  });

  describe('typing a token id', () => {
    const type = (host: HTMLElement, value: string) => {
      const field = at(host, 'token-id') as HTMLInputElement;
      field.value = value;
      field.dispatchEvent(new Event('input'));
    };

    it('fetches on its own once the typing stops', async () => {
      // The Fetch button beside it was a second thing to aim at for an
      // action the field had already described.
      vi.useFakeTimers();
      const { fixture, host, wantedByCall } = build();

      type(host, '195');
      expect(wantedByCall).toHaveLength(0);

      await vi.advanceTimersByTimeAsync(SETTLES + 10);
      await fixture.whenStable();

      expect(wantedByCall).toEqual(['web']);
      vi.useRealTimers();
    });

    it('does not fetch what was typed on the way', async () => {
      // 1 and 19 are both paintings. Neither is the one being asked for.
      vi.useFakeTimers();
      const { fixture, host, wantedByCall } = build();

      type(host, '1');
      await vi.advanceTimersByTimeAsync(SETTLES / 3);
      type(host, '19');
      await vi.advanceTimersByTimeAsync(SETTLES / 3);
      type(host, '195');
      await vi.advanceTimersByTimeAsync(SETTLES + 10);
      await fixture.whenStable();

      expect(wantedByCall).toHaveLength(1);
      vi.useRealTimers();
    });

    it('does not fetch an empty field', async () => {
      vi.useFakeTimers();
      const { fixture, host, wantedByCall } = build();

      type(host, '195');
      await vi.advanceTimersByTimeAsync(SETTLES + 10);
      await fixture.whenStable();
      type(host, '');
      await vi.advanceTimersByTimeAsync(SETTLES + 10);
      await fixture.whenStable();

      expect(wantedByCall).toHaveLength(1);
      vi.useRealTimers();
    });

    it('does not fetch the one it already has', async () => {
      vi.useFakeTimers();
      const { fixture, host, wantedByCall } = build();

      type(host, '195');
      await vi.advanceTimersByTimeAsync(SETTLES + 10);
      await fixture.whenStable();
      // Deleting a digit and putting it back is not a new request.
      type(host, '19');
      type(host, '195');
      await vi.advanceTimersByTimeAsync(SETTLES + 10);
      await fixture.whenStable();

      expect(wantedByCall).toHaveLength(1);
      vi.useRealTimers();
    });
  });

  it('works from a kept piece, and forgets the catalogue it did not come from', async () => {
    // What the atelier makes is usually the input to the next thing it makes.
    // The bytes are already here as the thumbnail's own url, so this costs
    // nothing but reading them back — and the token has to go, or Run would
    // offer to fetch a bigger copy of a painting this no longer is.
    const { fixture, host } = build({
      kept: [
        {
          id: 'k1',
          name: 'Rockets win I',
          tokenId: '195',
          kind: 'layer',
          width: 1024,
          height: 1086,
          bytes: 1,
          created: '',
        },
      ],
    });
    guts(fixture).tokenId.set('195');
    const bytes = new Blob(['a picture'], { type: 'image/png' });
    // A plain stand-in rather than a real Response: jsdom's cannot be built
    // from a Blob, and the only thing read off it here is `blob()`.
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      blob: () => Promise.resolve(bytes),
    } as unknown as Response);

    at(host, 'work-from-k1')?.click();
    await new Promise((settle) => setTimeout(settle, 0));
    fixture.detectChanges();

    expect(at(host, 'chosen')?.textContent).toContain('Rockets win I');
    vi.restoreAllMocks();
  });

  it('shows a kept piece at the size of the screen', () => {
    // The browser's own fullscreen: one call, Escape leaves it, and a clip
    // keeps its controls. A thumbnail is not enough to judge a render by.
    const { host } = build({
      kept: [
        {
          id: 'k1',
          name: 'Rockets win I',
          tokenId: '195',
          kind: 'layer',
          width: 1024,
          height: 1086,
          bytes: 1,
          created: '',
        },
      ],
    });
    const media = host.querySelector('[data-media="k1"] img') as HTMLElement;
    const asked = vi.fn().mockResolvedValue(undefined);
    media.requestFullscreen = asked;

    at(host, 'full-size-k1')?.click();

    expect(asked).toHaveBeenCalled();
  });

  it('says which copy of the painting each kept thing was made from', () => {
    // Two runs of the same graph are indistinguishable in a thumbnail and
    // only one of them is the size worth keeping.
    const piece = {
      id: 'k1',
      name: 'Rockets win I',
      tokenId: '195',
      kind: 'layer',
      bytes: 1,
      created: '',
    };
    const { host } = build({
      kept: [
        { ...piece, width: 1024, height: 1086 },
        { ...piece, id: 'k2', width: 3000, height: 3180 },
      ],
    });

    expect(at(host, 'quality-k1')?.textContent?.trim()).toBe('web');
    expect(at(host, 'quality-k2')?.textContent?.trim()).toBe('high');
  });

  it('brings a graph back after a reload, because drawing one is work', () => {
    const { fixture } = build({
      stored: JSON.stringify({
        nodes: [{ id: 'kept', type: 'find', x: 10, y: 20, params: {} }],
        edges: [],
      }),
    });

    expect(guts(fixture).nodes()).toHaveLength(1);
  });

  it('starts empty rather than throwing when what was stored is nonsense', () => {
    // A private window, blocked storage, or something an older version wrote.
    const { fixture } = build({ stored: 'not json at all' });

    expect(guts(fixture).nodes()).toEqual([]);
  });

  describe('the ready-made flows', () => {
    const A_FLOW: FlowDef = {
      key: 'change-a-part',
      label: 'Change one part',
      blurb: 'Finds a thing by name, then changes only that.',
      about: 'The whole reason to bother with a mask.\n\nTwo things to set.',
      nodes: [
        { at: 'painting', type: 'painting', params: {}, column: 0, row: 0 },
        { at: 'find', type: 'find', params: { phrase: 'a girl' }, column: 1, row: 0 },
      ],
      edges: [['painting', 'image', 'find', 'image']],
    };

    it('offers the flows the engine published, not a list of its own', async () => {
      // The same promise the palette makes: a flow added to the engine is a
      // button here, with the site untouched.
      const { fixture, host } = build({ flows: [A_FLOW] });
      await drained();
      fixture.detectChanges();

      expect(at(host, 'flow-change-a-part')?.textContent).toContain('Change one part');
    });

    it('shows no flows at all against an engine that has none', async () => {
      // An older engine on the machine he happens to be at. Not an error.
      const { fixture, host } = build({ flows: [] });
      await drained();
      fixture.detectChanges();

      expect(at(host, 'flows')).toBeNull();
    });

    it('says why the row is missing, rather than leaving the page silent', async () => {
      // The row was hidden for a week on the one machine that has an engine,
      // because the process in memory predated the flows. Quiet about an old
      // engine reads as a feature that does not exist.
      const { fixture, host } = build({ flows: [] });
      await drained();
      fixture.detectChanges();

      const said = at(host, 'no-flows');
      expect(said?.textContent).toContain('it was started before they existed');
      expect(said?.textContent).toContain('uvicorn engine.service:app');
      // With the folder to run it from, because the virtualenv and the module
      // are both relative to it and a console opens wherever it opens.
      expect(said?.textContent).toContain('cd C:');
      expect(said?.textContent).toContain('atelier-engine');
    });

    it('draws the whole graph, wired, when one is pressed', async () => {
      const { fixture, host } = build({ flows: [A_FLOW] });
      await drained();
      fixture.detectChanges();

      at(host, 'flow-change-a-part')?.click();
      fixture.detectChanges();

      const drawn = guts(fixture);
      expect(drawn.nodes()).toHaveLength(2);
      expect(drawn.edges()).toHaveLength(1);
    });

    it('fills in every setting the flow did not mention', async () => {
      // A flow sets the two or three settings it is about. The rest ran
      // correctly — the engine fills a missing one with its default — and drew
      // an empty box, so the number about to be used was the one thing not
      // written anywhere he could see it.
      const { fixture, host } = build({ flows: [A_FLOW] });
      await drained();
      fixture.detectChanges();

      at(host, 'flow-change-a-part')?.click();
      fixture.detectChanges();

      const found = guts(fixture)
        .nodes()
        .find((node) => (node as { type: string }).type === 'find') as {
        params: Record<string, unknown>;
      };
      // "a girl" is the flow's own; the threshold is the catalogue's.
      expect(found.params['phrase']).toBe('a girl');
      expect(found.params['threshold']).toBe(0.25);
    });

    it('joins the wires to the boxes it actually drew', async () => {
      // The ids in a flow are readable and made unique on the way in, so a
      // wire naming the id from the flow would join nothing — which is the
      // exact error a flow exists to prevent.
      const { fixture, host } = build({ flows: [A_FLOW] });
      await drained();
      fixture.detectChanges();

      at(host, 'flow-change-a-part')?.click();
      fixture.detectChanges();

      const drawn = guts(fixture);
      const ids = new Set(drawn.nodes().map((node) => (node as { id: string }).id));
      for (const edge of drawn.edges() as { from: [string, string]; to: [string, string] }[]) {
        expect(ids.has(edge.from[0])).toBe(true);
        expect(ids.has(edge.to[0])).toBe(true);
      }
    });

    it('gives two flows in a row ids that cannot collide', async () => {
      const { fixture, host } = build({ flows: [A_FLOW] });
      await drained();
      fixture.detectChanges();

      at(host, 'flow-change-a-part')?.click();
      fixture.detectChanges();
      const first = (guts(fixture).nodes()[0] as { id: string }).id;

      at(host, 'flow-change-a-part')?.click();
      fixture.detectChanges();
      const second = (guts(fixture).nodes()[0] as { id: string }).id;

      expect(second).not.toBe(first);
    });

    it('carries the settings the flow chose', async () => {
      const { fixture, host } = build({ flows: [A_FLOW] });
      await drained();
      fixture.detectChanges();

      at(host, 'flow-change-a-part')?.click();
      fixture.detectChanges();

      const find = guts(fixture).nodes()[1] as { params: Record<string, unknown> };
      expect(find.params['phrase']).toBe('a girl');
    });

    it('replaces the canvas rather than piling a second graph onto it', async () => {
      // Merging leaves boxes on top of each other and wires going nowhere.
      const { fixture, host } = build({
        flows: [A_FLOW],
        stored: JSON.stringify({
          nodes: [{ id: 'old', type: 'find', x: 10, y: 20, params: {} }],
          edges: [],
        }),
      });
      await drained();
      fixture.detectChanges();

      at(host, 'flow-change-a-part')?.click();
      fixture.detectChanges();

      const ids = guts(fixture)
        .nodes()
        .map((node) => (node as { id: string }).id);
      expect(ids).not.toContain('old');
    });

    it('explains a flow on asking, in paragraphs', async () => {
      const { fixture, host } = build({ flows: [A_FLOW] });
      await drained();
      fixture.detectChanges();

      at(host, 'why-change-a-part')?.click();
      fixture.detectChanges();

      const said = at(host, 'flow-about');
      expect(said?.querySelectorAll('p')).toHaveLength(2);
      expect(said?.textContent).toContain('bother with a mask');
    });

    it('survives an engine too old to send an explanation', async () => {
      // This page can be newer than the engine on the machine it is talking
      // to, and it crashed once against an engine that predated a field.
      const { fixture, host } = build({
        flows: [{ ...A_FLOW, about: undefined as unknown as string }],
      });
      await drained();
      fixture.detectChanges();

      at(host, 'why-change-a-part')?.click();
      fixture.detectChanges();

      expect(at(host, 'flow-about')).not.toBeNull();
    });
  });

  /**
   * Which copy of the painting a run uses.
   *
   * A graph takes minutes, and what goes in decides what comes out at the same
   * size: a first attempt is asking whether the instruction is right, which the
   * small copy answers in a fraction of the time. So the fetch takes the web
   * copy and Run asks before it spends the afternoon.
   */
  describe('choosing a quality', () => {
    // Built from the same harness as the rest of the file.
    const ready = async () => {
      const made = build();
      const { fixture } = made;
      guts(fixture).tokenId.set('195');
      await guts(fixture).byId();
      guts(fixture).nodes.set([{ id: 'a', type: 'painting', x: 0, y: 0, params: {} }]);
      fixture.detectChanges();
      return made;
    };

    it('fetches the web copy when a token id is typed', async () => {
      const { wantedByCall } = await ready();

      expect(wantedByCall).toEqual(['web']);
    });

    it('asks which copy instead of running, when the painting came from the catalogue', async () => {
      const { fixture, host, did } = await ready();

      at(host, 'run')?.click();
      fixture.detectChanges();

      expect(at(host, 'which-copy')).not.toBeNull();
      expect(did).not.toContain('graph');
    });

    it('runs on what is loaded when the web copy is chosen', async () => {
      const { fixture, wantedByCall } = await ready();

      await guts(fixture).run('web');

      // One fetch, the one that loaded the preview. Nothing downloaded again.
      expect(wantedByCall).toEqual(['web']);
    });

    it('fetches the big copy first when the high quality is chosen', async () => {
      const { fixture, wantedByCall } = await ready();

      await guts(fixture).run('high');

      expect(wantedByCall).toEqual(['web', 'high']);
      expect(guts(fixture).at()).toBe('high');
    });

    it('does not fetch twice for a second high-quality run', async () => {
      const { fixture, wantedByCall } = await ready();

      await guts(fixture).run('high');
      await guts(fixture).run('high');

      expect(wantedByCall).toEqual(['web', 'high']);
    });

    it('runs straight away for a file he chose himself', async () => {
      // There is no bigger copy of his own file to go and get, so asking would
      // be offering something that cannot be done.
      const { fixture, host } = build();
      guts(fixture).painting.set(aPainting());
      guts(fixture).nodes.set([{ id: 'a', type: 'painting', x: 0, y: 0, params: {} }]);
      fixture.detectChanges();

      at(host, 'run')?.click();
      fixture.detectChanges();

      expect(at(host, 'which-copy')).toBeNull();
    });
  });
});
