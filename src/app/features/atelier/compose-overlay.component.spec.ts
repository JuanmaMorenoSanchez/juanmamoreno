import { provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { KeptService, type KeptPiece } from '@features/atelier/kept.service';
import {
  ComposeOverlayComponent,
  countArranged,
  readArrangement,
} from './compose-overlay.component';

/**
 * The arrangement itself is `@domain/composition`, tested there against no
 * canvas at all. What is worth testing here is what this box can get wrong on
 * its own: what it offers from the shelf, what size it says the picture is,
 * and what it hands back to the node — jsdom draws nothing, so the pixels are
 * not testable here and pretending otherwise would be a test of the stub.
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

function setup(kept: KeptPiece[], arrangement = '') {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [ComposeOverlayComponent],
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
  const fixture = TestBed.createComponent(ComposeOverlayComponent);
  fixture.componentRef.setInput('arrangement', arrangement);
  fixture.detectChanges();
  return fixture;
}

describe('arranging pieces from the shelf', () => {
  // A clip is on the same shelf and cannot be drawn into a canvas. Offered, it
  // would be a tile that does nothing when pressed.
  it('offers the cut pieces and not the clips', () => {
    const fixture = setup([
      piece({ id: 'cut' }),
      piece({ id: 'reel', media: 'video/mp4', kind: 'clip' }),
    ]);

    expect(fixture.nativeElement.querySelectorAll('.compose-add')).toHaveLength(1);
  });

  // Pieces kept before clips existed carry no media at all, and they are cuts.
  it('offers a piece kept before anything recorded what it was', () => {
    const fixture = setup([piece({ id: 'old', media: undefined })]);

    expect(fixture.nativeElement.querySelectorAll('.compose-add')).toHaveLength(1);
  });

  // The canvas is drawn at the size the picture is handed over at, and shown
  // at whatever the panel allows. If the element's own width followed the
  // panel the engine would be given a screenshot of a preview.
  it('sizes the canvas in the pixels it will be handed over at', () => {
    const fixture = setup([]);
    const canvas: HTMLCanvasElement = fixture.nativeElement.querySelector('canvas');

    expect([canvas.width, canvas.height]).toEqual([1800, 1200]);
  });

  it('hands nothing to the node while the ground is bare', () => {
    const fixture = setup([piece()]);
    const done: HTMLButtonElement = fixture.nativeElement.querySelector(
      '[data-testid="compose-done"]'
    );

    expect(done.disabled).toBe(true);
  });
});

/**
 * The arrangement rides back on the node as json, so a graph is still one
 * thing that can be saved and reloaded — and a graph outlives the engine that
 * drew it, so anything unreadable has to be an empty ground rather than a
 * page that will not open.
 */
describe('what the node carries', () => {
  it('reads an arrangement back off a node', () => {
    const held = readArrangement(
      '{"ground":"square","paper":"ink","pieces":[{"id":"a","x":1,"y":2,"scale":0.5}]}'
    );

    expect(held.ground).toBe('square');
    expect(held.paper).toBe('ink');
    expect(held.pieces).toEqual([{ id: 'a', x: 1, y: 2, scale: 0.5 }]);
  });

  it('treats a node that has never been opened as an empty ground', () => {
    expect(readArrangement('').pieces).toEqual([]);
    expect(countArranged(undefined)).toBe(0);
  });

  it('survives json that is not an arrangement at all', () => {
    expect(readArrangement('{{{').pieces).toEqual([]);
    expect(readArrangement('{"pieces":"three"}').pieces).toEqual([]);
    expect(readArrangement('{"pieces":[{"nope":1}]}').pieces).toEqual([]);
  });

  it('counts the pieces for the label on the box', () => {
    expect(countArranged('{"pieces":[{"id":"a"},{"id":"b"}]}')).toBe(2);
  });

  // The ground it was left on comes back, or the picture is made at a
  // different shape from the one it was arranged at.
  it('opens on the ground it was closed on', () => {
    const fixture = setup([], '{"ground":"portrait","paper":"paper","pieces":[]}');
    const canvas: HTMLCanvasElement = fixture.nativeElement.querySelector('canvas');

    expect([canvas.width, canvas.height]).toEqual([1200, 1500]);
  });
});
