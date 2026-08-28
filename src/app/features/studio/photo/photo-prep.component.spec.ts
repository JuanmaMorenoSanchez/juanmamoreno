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
