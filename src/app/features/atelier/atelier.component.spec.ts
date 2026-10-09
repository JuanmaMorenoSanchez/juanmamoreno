import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { AtelierComponent } from './atelier.component';
import { AtelierEngineService, type CutResult } from './engine.service';

/**
 * The page is a front end for a program on his own computer.
 *
 * So the thing worth testing hardest is not the happy path — it is what it says
 * when there is nothing to talk to, which is the state it is in every time he
 * opens it before starting the engine.
 */
describe('AtelierComponent', () => {
  const build = (
    options: {
      unreachable?: boolean;
      health?: {
        device: string;
        resident: string | null;
        vramFreeMib: number;
        vramTotalMib: number;
      } | null;
      cut?: () => Promise<CutResult>;
    } = {}
  ) => {
    const unreachable = signal(options.unreachable ?? false);
    const health = signal(
      options.health === undefined
        ? { device: 'cuda', resident: null, vramFreeMib: 7096, vramTotalMib: 8187 }
        : options.health
    );
    const checking = signal(false);
    const calls: { labels: string[]; fillBehind: boolean }[] = [];

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [AtelierComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: AtelierEngineService,
          useValue: {
            health,
            unreachable,
            checking,
            check: () => Promise.resolve(),
            evict: () => Promise.resolve(),
            layerUrl: (file: string) => `http://127.0.0.1:7860/layer/${file}`,
            cut: (_painting: Blob, labels: string[], fillBehind: boolean) => {
              calls.push({ labels, fillBehind });
              return (
                options.cut?.() ??
                Promise.resolve({
                  batch: 'abc',
                  seconds: 1.2,
                  layers: [],
                  background: null,
                  notFound: [],
                } satisfies CutResult)
              );
            },
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(AtelierComponent);
    fixture.detectChanges();
    return { fixture, host: fixture.nativeElement as HTMLElement, unreachable, health, calls };
  };

  const at = (host: HTMLElement, id: string) =>
    host.querySelector(`[data-testid="${id}"]`) as HTMLElement | null;

  it('says the engine is not answering, and that the site is not at fault', () => {
    // He will see this more often than anything else on the page: it is the
    // state every time he opens it before starting the engine.
    const { host } = build({ unreachable: true, health: null });
    const down = at(host, 'engine-down');

    expect(down).not.toBeNull();
    expect(down?.textContent).toContain('127.0.0.1:7860');
    expect(down?.textContent).toContain('There is nothing wrong with the site');
  });

  it('names all three reasons it could be unreachable, including the one Chrome causes', () => {
    // A refused connection and a refused permission arrive identically, so the
    // page cannot diagnose — it can only say what the possibilities are.
    const { host } = build({ unreachable: true, health: null });
    const text = at(host, 'engine-down')?.textContent ?? '';

    expect(text).toContain('not running');
    expect(text).toContain('different machine');
    expect(text).toContain('Chrome refused');
  });

  it('shows what is left of the card when it is answering', () => {
    const { host } = build();
    const up = at(host, 'engine-up');

    expect(up?.textContent).toContain('cuda');
    expect(up?.textContent).toContain('7096');
  });

  it('will not cut while the engine is unreachable', () => {
    const { host } = build({ unreachable: true, health: null });

    expect((at(host, 'cut') as HTMLButtonElement).disabled).toBe(true);
  });

  it('will not cut before a painting has been chosen', () => {
    // Everything else is filled in by default; the painting cannot be.
    const { host } = build();

    expect((at(host, 'cut') as HTMLButtonElement).disabled).toBe(true);
  });

  it('warns that a layer is not evidence the thing is there', async () => {
    const { fixture, host } = build({
      cut: () =>
        Promise.resolve({
          batch: 'abc',
          seconds: 2,
          layers: [
            {
              label: 'a unicorn',
              file: 'abc-a-unicorn.png',
              score: 0.395,
              iou: 0.95,
              coverage: 0.2,
            },
          ],
          background: null,
          notFound: [],
        }),
    });

    const component = fixture.componentInstance as unknown as {
      painting: { set(f: File): void };
      cut(): Promise<void>;
    };
    component.painting.set(new File([new Uint8Array([1])], 'p.png', { type: 'image/png' }));
    await component.cut();
    fixture.detectChanges();

    expect(at(host, 'result')?.textContent).toContain('not evidence');
  });

  it('shows the score beside every layer rather than a verdict', async () => {
    const { fixture, host } = build({
      cut: () =>
        Promise.resolve({
          batch: 'abc',
          seconds: 2,
          layers: [
            {
              label: 'a girl',
              file: 'abc-a-girl.png',
              score: 0.4127,
              iou: 0.9835,
              coverage: 0.192,
            },
          ],
          background: null,
          notFound: [],
        }),
    });

    const component = fixture.componentInstance as unknown as {
      painting: { set(f: File): void };
      cut(): Promise<void>;
    };
    component.painting.set(new File([new Uint8Array([1])], 'p.png', { type: 'image/png' }));
    await component.cut();
    fixture.detectChanges();

    const text = at(host, 'result')?.textContent ?? '';
    expect(text).toContain('0.413');
    expect(text).toContain('19.2%');
  });

  it('names what the model would not even guess at', async () => {
    const { fixture, host } = build({
      cut: () =>
        Promise.resolve({
          batch: 'abc',
          seconds: 2,
          layers: [],
          background: null,
          notFound: ['a cathedral'],
        }),
    });

    const component = fixture.componentInstance as unknown as {
      painting: { set(f: File): void };
      cut(): Promise<void>;
    };
    component.painting.set(new File([new Uint8Array([1])], 'p.png', { type: 'image/png' }));
    await component.cut();
    fixture.detectChanges();

    expect(at(host, 'result')?.textContent).toContain('a cathedral');
  });

  it('says why when a cut fails, rather than going quiet', async () => {
    const { fixture, host } = build({ cut: () => Promise.reject(new Error('out of memory')) });

    const component = fixture.componentInstance as unknown as {
      painting: { set(f: File): void };
      cut(): Promise<void>;
    };
    component.painting.set(new File([new Uint8Array([1])], 'p.png', { type: 'image/png' }));
    await component.cut();
    fixture.detectChanges();

    expect(at(host, 'failure')?.textContent).toContain('out of memory');
  });

  it('sends one label per line, blank lines dropped', async () => {
    const { fixture, calls } = build();
    const component = fixture.componentInstance as unknown as {
      painting: { set(f: File): void };
      labels: { set(v: string): void };
      cut(): Promise<void>;
    };
    component.painting.set(new File([new Uint8Array([1])], 'p.png', { type: 'image/png' }));
    component.labels.set('a girl\n\n  a blue shirt  \n');
    await component.cut();

    expect(calls[0].labels).toEqual(['a girl', 'a blue shirt']);
  });
});
