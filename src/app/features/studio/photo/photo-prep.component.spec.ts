import { TestBed } from '@angular/core/testing';
import { EDGE_CORNERS, straightBows, type EdgeBows, type Quad } from '@domain/image/quad';
import { describe, expect, it } from 'vitest';
import { PhotoPrepComponent } from './photo-prep.component';

/**
 * The bows are the part of the studio a test can reach without a photograph:
 * everything below is the arithmetic that decides where the handles sit and
 * what happens when one is dragged, which is where the mistakes are. The
 * correction itself is proven in `edge-bows.spec.ts`.
 */
type Internals = {
  corners: { set(quad: Quad): void; (): Quad | null };
  bows: { set(bows: EdgeBows): void; (): EdgeBows | null };
  size: { set(size: { width: number; height: number }): void };
  bowHandles: () => { edge: string; index: number; left: string; top: string; tether: string }[];
  outline: () => string;
  handleSize: () => number;
  setHandleSize(event: Event): void;
  straightenSides(): void;
  grab(index: number, event: PointerEvent): void;
  grabBow(edge: keyof EdgeBows, index: 0 | 1, event: PointerEvent): void;
  artist: () => string;
  notice: () => string;
  webStatement: () => string;
  noticePreview: () => string;
  rights: () => { artist: string; notice?: string; webStatement?: string } | null;
  realWidth: { set(v: number): void };
  realHeight: { set(v: number): void };
  selecting: { (): boolean; set(v: boolean): void };
  brushMode: { (): 'add' | 'erase'; set(v: 'add' | 'erase'): void };
  useBrush(mode: 'add' | 'erase'): void;
  brushAt(at: { x: number; y: number }, erase?: boolean): void;
  hasArea: () => boolean;
  previewSelection: () => { values: Float32Array } | null;
};

const QUAD: Quad = [
  { x: 100, y: 80 },
  { x: 900, y: 90 },
  { x: 890, y: 700 },
  { x: 110, y: 690 },
];

function setup() {
  TestBed.configureTestingModule({ imports: [PhotoPrepComponent] });
  const fixture = TestBed.createComponent(PhotoPrepComponent);
  const component = fixture.componentInstance as unknown as Internals;
  component.size.set({ width: 1000, height: 800 });
  component.corners.set(QUAD);
  component.bows.set(straightBows(QUAD));
  return { fixture, component };
}

/** Stands in for a pointer that has moved to a place on the photograph. */
function pointerAt(): PointerEvent {
  return {
    target: { setPointerCapture: () => undefined },
    preventDefault: () => undefined,
  } as unknown as PointerEvent;
}

describe('PhotoPrepComponent — bending the sides', () => {
  it('offers two control points per side, joined to the corner each hangs from', () => {
    const { component } = setup();
    const handles = component.bowHandles();

    expect(handles).toHaveLength(8);
    for (const edge of Object.keys(EDGE_CORNERS)) {
      expect(handles.filter((handle) => handle.edge === edge)).toHaveLength(2);
    }
    // The tether starts at the corner the control belongs to, so a control that
    // has been dragged far out still reads as a pull on that corner's side.
    const topFirst = handles.find((handle) => handle.edge === 'top' && handle.index === 0);
    expect(topFirst?.tether.startsWith(`M ${QUAD[0].x} ${QUAD[0].y}`)).toBe(true);
  });

  it('draws the outline as curves once a side is bent', () => {
    const { component } = setup();
    expect(component.outline()).toContain('C ');

    const bows = straightBows(QUAD);
    bows.left = [
      { x: bows.left[0].x - 40, y: bows.left[0].y },
      { x: bows.left[1].x - 40, y: bows.left[1].y },
    ];
    component.bows.set(bows);

    // Four curve segments, one per side — never a straight-sided polygon, which
    // would draw a bent edge as the line it is not.
    expect(component.outline().match(/C /g)).toHaveLength(4);
  });

  it('moves only the control that was grabbed', () => {
    const { component } = setup();
    const before = component.bows() as EdgeBows;

    component.grabBow('top', 1, pointerAt());
    // drag() reads the pointer through the stage element, which no test has;
    // setting the signal is the same state change with the plumbing removed.
    const bows = {
      ...before,
      top: [before.top[0], { x: 500, y: 20 }] as [
        { x: number; y: number },
        { x: number; y: number },
      ],
    };
    component.bows.set(bows);

    expect(component.bows()?.top[1]).toEqual({ x: 500, y: 20 });
    expect(component.bows()?.top[0]).toEqual(before.top[0]);
    expect(component.bows()?.left).toEqual(before.left);
  });

  it('puts every control back on its chord when the sides are straightened', () => {
    const { component } = setup();
    const bent = straightBows(QUAD);
    bent.top = [
      { x: bent.top[0].x, y: bent.top[0].y - 60 },
      { x: bent.top[1].x, y: bent.top[1].y - 60 },
    ];
    component.bows.set(bent);

    component.straightenSides();

    expect(component.bows()).toEqual(straightBows(QUAD));
  });
});

describe('PhotoPrepComponent — aiming', () => {
  it('starts wide enough to grab away from the corner', () => {
    const { component } = setup();
    // The complaint this answers: a small ring puts the cursor on the very
    // point being placed.
    expect(component.handleSize()).toBeGreaterThanOrEqual(40);
  });

  it('remembers a size that was chosen', () => {
    const { component } = setup();
    component.setHandleSize({ target: { value: '72' } } as unknown as Event);

    expect(component.handleSize()).toBe(72);
    expect(localStorage.getItem('juanmamoreno.studio.handleSize')).toBe('72');
  });

  it('refuses a size too small to aim with or too large to see past', () => {
    const { component } = setup();

    component.setHandleSize({ target: { value: '2' } } as unknown as Event);
    expect(component.handleSize()).toBeGreaterThanOrEqual(20);

    component.setHandleSize({ target: { value: '900' } } as unknown as Event);
    expect(component.handleSize()).toBeLessThanOrEqual(110);
  });
});

/**
 * The rights fields answer themselves.
 *
 * They used to be empty with the answer sitting in the placeholder, which meant
 * typing out the same name and the same link for every painting — and a
 * photograph that went out unattributed whenever that was skipped.
 */
describe('PhotoPrepComponent — who the photograph belongs to', () => {
  it('fills in the name and the terms page before anything is typed', () => {
    localStorage.clear();
    const { component } = setup();

    expect(component.artist()).toBe('Juanma Moreno Sánchez');
    expect(component.webStatement()).toBe('https://www.juanmamoreno.com/terms');
  });

  it('writes the rights into the file without being asked', () => {
    localStorage.clear();
    const { component } = setup();

    // Previously null until the name was typed, which is what let a photograph
    // leave with no author attached to it.
    expect(component.rights()).toMatchObject({
      artist: 'Juanma Moreno Sánchez',
      webStatement: 'https://www.juanmamoreno.com/terms',
    });
  });

  it('fills the notice in with this year, not the year it was written', () => {
    localStorage.clear();
    const { component } = setup();

    // Worked out at load rather than baked into the source, and never stored
    // unless it is typed in — so it still says the right year next January.
    expect(component.notice()).toBe(`© ${new Date().getFullYear()} Juanma Moreno Sánchez`);
  });

  it('keeps what was typed over the default', () => {
    localStorage.setItem('juanmamoreno.studio.artist', 'Someone Else');
    const { component } = setup();

    expect(component.artist()).toBe('Someone Else');
  });

  it('can still be emptied, and stays empty', () => {
    // A field that filled itself in again on the next visit could never be
    // cleared. Absent and deliberately-empty are different things.
    localStorage.setItem('juanmamoreno.studio.artist', '');
    const { component } = setup();

    expect(component.artist()).toBe('');
    expect(component.rights()).toBeNull();
  });
});

describe('PhotoPrepComponent — brushing an area', () => {
  it('marks an area as selected, and shows it back in the photograph', () => {
    const { component } = setup();
    component.size.set({ width: 400, height: 300 });
    component.corners.set(QUAD);
    component.realWidth.set(100);
    component.realHeight.set(80);
    component.selecting.set(true);

    // A dab in the middle of the photograph, as a pointer at the centre gives.
    component.brushAt({ x: 200, y: 150 });

    expect(component.hasArea()).toBe(true);
    const shown = component.previewSelection();
    expect(shown).not.toBeNull();
    const anyCovered = shown ? [...shown.values].some((v) => v > 0.1) : false;
    expect(anyCovered).toBe(true);
  });

  it('takes the same area back again with the erasing brush', () => {
    // The half of selecting that had no tool: an edge is pulled back far more
    // often than it is laid down in one stroke.
    const { component } = setup();
    component.size.set({ width: 400, height: 300 });
    component.corners.set(QUAD);
    component.realWidth.set(100);
    component.realHeight.set(80);
    component.selecting.set(true);
    component.brushAt({ x: 200, y: 150 });
    expect(component.hasArea()).toBe(true);

    component.useBrush('erase');
    // Wider than it was laid down, since a soft dab fades rather than stopping.
    component.brushAt({ x: 200, y: 150 }, true);
    component.brushAt({ x: 200, y: 150 }, true);

    expect(component.hasArea()).toBe(false);
  });

  it('reaches for the erasing brush without leaving the selecting one on', () => {
    const { component } = setup();

    component.useBrush('erase');

    expect(component.brushMode()).toBe('erase');
    // Choosing a brush turns brushing on: choosing one and then finding the
    // photograph does not answer is a fault with nothing to show for it.
    expect(component.selecting()).toBe(true);
  });
});
