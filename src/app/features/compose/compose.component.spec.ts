import { provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { KeptService, type KeptPiece } from '@features/atelier/kept.service';
import { ComposeComponent } from './compose.component';

/**
 * The arrangement itself is `@domain/composition`, tested there against no
 * canvas at all. What is worth testing here is the two things this page can
 * get wrong on its own: what it offers from the shelf, and what size it says
 * the picture is — jsdom draws nothing, so the pixels are not testable here
 * and pretending otherwise would be a test of the stub.
 */
// jsdom has no IntersectionObserver, and the shelf waits for one before it
// fetches a thumbnail. Reporting every tile as visible is what an eager fetch
// would do, which is what these tests want to see.
class MockIntersectionObserver {
  constructor(private readonly callback: IntersectionObserverCallback) {}

  observe(target: Element): void {
    this.callback(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    );
  }

  unobserve(): void {}
  disconnect(): void {}
}

// Put back afterwards, which matters more here than it looks: `ng test` runs
// with `isolate: false`, so all hundred and twenty spec files share one jsdom
// and a global left stubbed is inherited by whichever file runs next. Which
// file that is depends on how many workers the machine has, so a stub left
// behind passes on one machine and fails on another — this one passed here and
// failed the deploy on a four-core runner.
// Put back afterwards. `ng test` runs with `isolate: false`, so all hundred
// and twenty spec files share one jsdom and a global left stubbed is inherited
// by whichever file runs next — and home.component.ts branches on this very
// global being absent. Which file runs next depends on the machine's core
// count, so a stub left behind is a test that passes here and fails there.
beforeAll(() => vi.stubGlobal('IntersectionObserver', MockIntersectionObserver));
afterAll(() => vi.unstubAllGlobals());

const piece = (said: Partial<KeptPiece> = {}): KeptPiece => ({
  id: 'p1',
  name: 'Cuando éramos felices',
  tokenId: '2',
  kind: 'layer-a-blue-cup',
  media: 'image/png',
  width: 2500,
  height: 2500,
  bytes: 10,
  created: '',
  ...said,
});

function setup(kept: KeptPiece[]) {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [ComposeComponent],
    providers: [
      provideZonelessChangeDetection(),
      {
        provide: KeptService,
        useValue: {
          pieces: signal(kept),
          smallUrls: signal<Record<string, string>>({}),
          urls: signal<Record<string, string>>({}),
          trouble: signal<Record<string, string>>({}),
          listTrouble: signal<string | null>(null),
          saving: signal(false),
          ensure: () => Promise.resolve(),
          show: () => Promise.resolve(),
          showSmall: () => Promise.resolve(),
          keep: () => Promise.resolve(piece()),
        },
      },
    ],
  });
  const fixture = TestBed.createComponent(ComposeComponent);
  fixture.detectChanges();
  return fixture;
}

describe('composing from the shelf', () => {
  // A clip is on the same shelf and cannot be drawn into a canvas. Offered, it
  // would be a tile that does nothing when pressed.
  it('offers the cut pieces and not the clips', () => {
    const fixture = setup([
      piece({ id: 'cut' }),
      piece({ id: 'reel', media: 'video/mp4', kind: 'clip' }),
    ]);

    const tiles = fixture.nativeElement.querySelectorAll('.compose-add');
    expect(tiles).toHaveLength(1);
  });

  // Pieces kept before clips existed carry no media at all, and they are cuts.
  it('offers a piece kept before anything recorded what it was', () => {
    const fixture = setup([piece({ id: 'old', media: undefined })]);

    expect(fixture.nativeElement.querySelectorAll('.compose-add')).toHaveLength(1);
  });

  // The canvas is drawn at the size it will be saved at and shown at whatever
  // the window allows. If the element's own width followed the window the
  // saved file would be a screenshot of a preview.
  it('sizes the canvas in the pixels it will be saved at', () => {
    const fixture = setup([]);
    const canvas: HTMLCanvasElement = fixture.nativeElement.querySelector('canvas');

    expect([canvas.width, canvas.height]).toEqual([1800, 1200]);
  });

  it('keeps nothing while the ground is bare', () => {
    const fixture = setup([piece()]);
    const keep = [...fixture.nativeElement.querySelectorAll('button')].find(
      (button: HTMLButtonElement) => button.textContent?.trim() === 'Keep'
    ) as HTMLButtonElement;

    expect(keep.disabled).toBe(true);
  });
});
