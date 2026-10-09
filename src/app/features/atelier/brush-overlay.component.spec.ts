import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { BrushOverlayComponent, readMarks, type Marks } from './brush-overlay.component';

/**
 * Putting marks on the painting by hand.
 *
 * The thing worth testing hardest is the coordinate conversion. A mark records
 * where on the *painting* it was put, not where on the screen — so the same
 * graph means the same thing whatever size the window was, and still means it
 * when run against the full-resolution original rather than the preview.
 */
describe('BrushOverlayComponent', () => {
  const build = (marks: Marks = { keep: [], drop: [] }) => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [BrushOverlayComponent],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(BrushOverlayComponent);
    fixture.componentRef.setInput('source', 'blob:painting');
    fixture.componentRef.setInput('marks', marks);
    fixture.detectChanges();
    return { fixture, host: fixture.nativeElement as HTMLElement };
  };

  /** Reach past `protected`, which is a compiler nicety rather than a boundary. */
  const guts = (fixture: ReturnType<typeof build>['fixture']) =>
    fixture.componentInstance as unknown as {
      working: { (): Marks; set(m: Marks): void };
      natural: { set(s: { width: number; height: number }): void };
      mark(event: MouseEvent): void;
      at(m: { x: number; y: number }): { left: string; top: string };
      undo(): void;
      clear(): void;
    };

  /** A click at a place on a stage of a known size. */
  const clickAt = (
    fixture: ReturnType<typeof build>['fixture'],
    x: number,
    y: number,
    shown = { width: 400, height: 500, left: 100, top: 50 },
    shift = false
  ) => {
    const stage = {
      getBoundingClientRect: () => shown,
    } as unknown as HTMLElement;
    guts(fixture).mark({
      preventDefault: () => undefined,
      currentTarget: stage,
      clientX: x,
      clientY: y,
      shiftKey: shift,
      button: 0,
    } as unknown as MouseEvent);
  };

  it('starts from the marks it was given, copied rather than shared', async () => {
    const original: Marks = { keep: [{ x: 1, y: 2 }], drop: [] };
    const { fixture } = build(original);
    await new Promise((settle) => setTimeout(settle, 0));

    guts(fixture).clear();

    // Cancelling has to mean something, so the caller's object is untouched.
    expect(original.keep).toHaveLength(1);
  });

  it('records a mark in the pixels of the painting, not of the screen', async () => {
    const { fixture } = build();
    await new Promise((settle) => setTimeout(settle, 0));
    // Shown at 400×500; the painting itself is 3652×4533.
    guts(fixture).natural.set({ width: 3652, height: 4533 });

    // Dead centre of the shown image.
    clickAt(fixture, 100 + 200, 50 + 250);

    expect(guts(fixture).working().keep[0]).toEqual({ x: 1826, y: 2267 });
  });

  it('shift-click leaves something out instead of keeping it', async () => {
    const { fixture } = build();
    await new Promise((settle) => setTimeout(settle, 0));
    guts(fixture).natural.set({ width: 400, height: 500 });

    clickAt(fixture, 100 + 40, 50 + 50, undefined, true);

    expect(guts(fixture).working().keep).toHaveLength(0);
    expect(guts(fixture).working().drop).toHaveLength(1);
  });

  it('ignores a click before the painting has said how big it is', async () => {
    // Converting to painting pixels needs the painting's size, and a mark
    // recorded against a guess would land somewhere else entirely.
    const { fixture } = build();
    await new Promise((settle) => setTimeout(settle, 0));

    clickAt(fixture, 200, 200);

    expect(guts(fixture).working().keep).toHaveLength(0);
  });

  it('places marks by percentage, so resizing the window does not move them', async () => {
    const { fixture } = build();
    await new Promise((settle) => setTimeout(settle, 0));
    guts(fixture).natural.set({ width: 1000, height: 2000 });

    expect(guts(fixture).at({ x: 250, y: 500 })).toEqual({ left: '25%', top: '25%' });
  });

  it('undoes the last mark, and clears them all', async () => {
    const { fixture } = build();
    await new Promise((settle) => setTimeout(settle, 0));
    guts(fixture).natural.set({ width: 100, height: 100 });

    clickAt(fixture, 110, 60);
    clickAt(fixture, 120, 70);
    guts(fixture).undo();
    expect(guts(fixture).working().keep).toHaveLength(1);

    guts(fixture).clear();
    expect(guts(fixture).working().keep).toHaveLength(0);
  });

  it('hands the marks back only when Done is pressed', async () => {
    const { fixture, host } = build();
    await new Promise((settle) => setTimeout(settle, 0));
    guts(fixture).natural.set({ width: 100, height: 100 });
    clickAt(fixture, 110, 60);

    let handed: Marks | null = null;
    fixture.componentInstance.saved.subscribe((m) => (handed = m));
    (host.querySelector('[data-testid="brush-save"]') as HTMLButtonElement).click();

    expect(handed).not.toBeNull();
    expect(handed!.keep).toHaveLength(1);
  });
});

describe('readMarks', () => {
  it('reads what a Brush node is carrying', () => {
    expect(readMarks('{"keep":[{"x":1,"y":2}],"drop":[]}')).toEqual({
      keep: [{ x: 1, y: 2 }],
      drop: [],
    });
  });

  it('survives a node written by an older version, or by nothing at all', () => {
    // The graph is kept in localStorage and outlives the code that wrote it.
    expect(readMarks(undefined)).toEqual({ keep: [], drop: [] });
    expect(readMarks('not json')).toEqual({ keep: [], drop: [] });
    expect(readMarks('{"keep":"nonsense"}')).toEqual({ keep: [], drop: [] });
  });

  it('throws away entries that are not marks', () => {
    expect(readMarks('{"keep":[{"x":1,"y":2},null,7],"drop":[]}').keep).toHaveLength(1);
  });
});
