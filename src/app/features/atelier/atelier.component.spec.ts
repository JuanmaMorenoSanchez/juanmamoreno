import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { AtelierComponent } from './atelier.component';
import { CataloguePaintingService } from './catalogue-painting.service';
import { AtelierEngineService, type GraphRun, type NodeTypeDef } from './engine.service';

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
      minimum: null,
      maximum: null,
      step: null,
      help: 'Short and concrete beats elaborate.',
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
      run?: () => Promise<GraphRun>;
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
          // Reaching the real one would reach ARTWORK_PORT and the network.
          provide: CataloguePaintingService,
          useValue: {
            byId: () =>
              options.byId?.() ??
              Promise.resolve({
                blob: new Blob([new Uint8Array([1])]),
                name: 'Rockets win I',
                quality: 'original' as const,
                width: 3000,
                height: 3180,
              }),
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
            catalogue: () => Promise.resolve(options.catalogue ?? [A_NODE]),
            runGraph: (_p: Blob, graph: unknown) => {
              sent.push(graph);
              return (
                options.run?.() ??
                Promise.resolve({
                  batch: 'a',
                  seconds: 1,
                  produced: {},
                  saved: [],
                } satisfies GraphRun)
              );
            },
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(AtelierComponent);
    fixture.detectChanges();
    return { fixture, host: fixture.nativeElement as HTMLElement, sent, did, unreachable };
  };

  const at = (host: HTMLElement, id: string) =>
    host.querySelector(`[data-testid="${id}"]`) as HTMLElement | null;

  /** Reach past `protected`, which is a compiler nicety rather than a boundary. */
  const guts = (fixture: ReturnType<typeof build>['fixture']) =>
    fixture.componentInstance as unknown as {
      painting: { set(f: File | null): void };
      nodes: { set(v: unknown[]): void; (): unknown[] };
      edges: { set(v: unknown[]): void };
      catalogue: { (): NodeTypeDef[] };
      redraw(drawn: unknown): void;
      run(): Promise<void>;
    };

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
      run: () => Promise.resolve({ batch: 'a', seconds: 2, produced: {}, saved: ['a-girl.png'] }),
    });
    const parts = guts(fixture);
    parts.painting.set(aPainting());
    parts.redraw({ nodes: [{ id: 'a', type: 'find', x: 0, y: 0, params: {} }], edges: [] });
    await parts.run();
    fixture.detectChanges();

    expect(at(host, 'result')?.textContent).toContain('not evidence');
  });

  it('says so when a run kept nothing, rather than showing an empty box', async () => {
    const { fixture, host } = build();
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
});
