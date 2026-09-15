import { TestBed, type ComponentFixture } from '@angular/core/testing';
import {
  bowControls,
  edgeNormal,
  EDGE_CORNERS,
  straightBows,
  type EdgeBows,
  type Quad,
} from '@domain/image/quad';
import { describe, expect, it } from 'vitest';
import { PhotoPrepComponent } from './photo-prep.component';
import { StudioHandoffService } from '../studio-handoff.service';

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
  handleSize: number;
  straightenSides(): void;
  zoom: { (): number; set(v: number): void };
  setZoom(event: Event): void;
  brightness: { (): number; set(v: number): void };
  whites: () => number;
  saturation: () => number;
  setBrightness(event: Event): void;
  setWhites(event: Event): void;
  resetAdjustments(): void;
  reset(): void;
  panning: () => boolean;
  takeSpace(event: KeyboardEvent): void;
  releaseSpace(event: KeyboardEvent): void;
  stopPanning(): void;
  pan(event: PointerEvent): void;
  startBrush(event: PointerEvent): void;
  fileName: { set(v: string): void };
  grab(index: number, event: PointerEvent): void;
  grabBow(edge: keyof EdgeBows, index: 0 | 1, event: PointerEvent): void;
  drag(event: PointerEvent): void;
  artist: () => string;
  notice: () => string;
  webStatement: () => string;
  noticePreview: () => string;
  rights: () => { artist: string; notice?: string; webStatement?: string } | null;
  // Held as text now, because the boxes take the collection's own notation —
  // "140,5" — which a number input refused outright.
  widthText: { set(v: string): void };
  heightText: { set(v: string): void };
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
  component.bows.set(straightBows());
  return { fixture, component };
}

/**
 * Stands in for a pointer at a place on the photograph.
 *
 * The stage is given a thousand by eight hundred box below, which is the size
 * of the photograph itself, so these coordinates are the photograph's own.
 */
function pointerAt(x = 0, y = 0): PointerEvent {
  return {
    clientX: x,
    clientY: y,
    pointerId: 1,
    target: { setPointerCapture: () => undefined },
    preventDefault: () => undefined,
  } as unknown as PointerEvent;
}

/** A stage that knows how big it is, which no test browser gives it. */
function stageOf(fixture: ComponentFixture<PhotoPrepComponent>): void {
  fixture.detectChanges();
  const stage = fixture.nativeElement.querySelector('.prep-stage') as HTMLElement;
  stage.getBoundingClientRect = () => ({ left: 0, top: 0, width: 1000, height: 800 }) as DOMRect;
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

    component.bows.set({ ...straightBows(), left: [-40, -40] });

    // Four curve segments, one per side — never a straight-sided polygon, which
    // would draw a bent edge as the line it is not.
    expect(component.outline().match(/C /g)).toHaveLength(4);
  });

  it('moves only the control that was grabbed', () => {
    const { fixture, component } = setup();
    stageOf(fixture);
    const controls = bowControls(QUAD, straightBows(), 'top');

    // Square to the side, which on a side that is not quite level is not the
    // same as straight up the screen.
    const across = edgeNormal(QUAD, 'top');
    component.grabBow('top', 1, pointerAt(controls[1].x, controls[1].y));
    component.drag(pointerAt(controls[1].x + across.x * 30, controls[1].y + across.y * 30));

    expect(component.bows()?.top[1]).toBeCloseTo(30, 6);
    expect(component.bows()?.top[0]).toBe(0);
    expect(component.bows()?.left).toEqual([0, 0]);
  });

  it('puts every control back on its chord when the sides are straightened', () => {
    const { component } = setup();
    component.bows.set({ ...straightBows(), top: [-60, -60] });

    component.straightenSides();

    expect(component.bows()).toEqual(straightBows());
  });
});

describe('PhotoPrepComponent — aiming', () => {
  it('draws a ring wide enough to grab away from the corner it marks', () => {
    // The complaint this answers: a small ring puts the cursor on the very
    // point being placed. It was a slider for a while and never moved —
    // magnifying the picture is what the width was standing in for.
    const { component } = setup();

    expect(component.handleSize).toBeGreaterThanOrEqual(40);
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
    component.widthText.set('100');
    component.heightText.set('80');
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
    component.widthText.set('100');
    component.heightText.set('80');
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

/**
 * Placing a corner is only as precise as the picture is large, and the picture
 * is a photograph shown whole. Zooming the browser was the way round that, and
 * it takes the page with it.
 */
describe('PhotoPrepComponent — going in closer', () => {
  it('starts at the whole photograph', () => {
    const { component } = setup();
    expect(component.zoom()).toBe(1);
  });

  it('refuses to go below the whole photograph or past what the preview holds', () => {
    const { component } = setup();

    component.setZoom({ target: { value: '0.2' } } as unknown as Event);
    expect(component.zoom()).toBe(1);

    component.setZoom({ target: { value: '40' } } as unknown as Event);
    expect(component.zoom()).toBe(4);
  });

  it('magnifies the stage and keeps the handles the size they were', () => {
    const { fixture, component } = setup();
    component.setZoom({ target: { value: '2' } } as unknown as Event);
    fixture.detectChanges();

    const stage = fixture.nativeElement.querySelector('.prep-stage') as HTMLElement;
    expect(stage.style.transform).toBe('scale(2)');

    // Halved in the stage's own pixels, which the stage then doubles: the ring
    // covers a quarter as much of the painting and the same amount of screen.
    const handle = fixture.nativeElement.querySelector('.prep-handle') as HTMLElement;
    expect(Number.parseFloat(handle.style.width)).toBeCloseTo(component.handleSize / 2, 3);

    // Read by the stylesheet, to thin the outline and the rings in step.
    const viewport = fixture.nativeElement.querySelector('.prep-viewport') as HTMLElement;
    expect(viewport.style.getPropertyValue('--prep-zoom')).toBe('2');
  });

  it('leaves the stage untransformed when it is showing the whole photograph', () => {
    const { fixture } = setup();
    fixture.detectChanges();

    const stage = fixture.nativeElement.querySelector('.prep-stage') as HTMLElement;
    expect(stage.style.transform).toBe('');
  });
});

/**
 * A certificate that has been stored is finished with, and the studio should
 * look the way it looks on opening — which is what pressing F5 gives, and what
 * the form below has no way of doing on its own.
 */
describe('PhotoPrepComponent — starting again', () => {
  it('clears the photograph when the form says the certificate is stored', () => {
    const { fixture, component } = setup();
    const handoff = TestBed.inject(StudioHandoffService);
    component.fileName.set('DSC_0101.NEF');
    component.widthText.set('116');
    component.heightText.set('140,5');
    component.setZoom({ target: { value: '3' } } as unknown as Event);

    handoff.startAgain();
    TestBed.tick();
    fixture.detectChanges();

    expect(component.corners()).toBe(null);
    expect(component.zoom()).toBe(1);
    // With no photograph, the file chooser is on the page again — empty,
    // because it is a new one.
    expect(fixture.nativeElement.querySelector('input[type="file"]')).not.toBe(null);
  });
});

/** A space bar pressed with the focus on whatever is given. */
function spaceOn(target: unknown): KeyboardEvent {
  let prevented = false;
  return {
    code: 'Space',
    target,
    preventDefault: () => {
      prevented = true;
    },
    get defaultPrevented() {
      return prevented;
    },
  } as unknown as KeyboardEvent;
}

/** A pointer at a place on the screen, with capture that goes nowhere. */
function pointerAtScreen(x: number, y: number): PointerEvent {
  return {
    clientX: x,
    clientY: y,
    pointerId: 1,
    button: 0,
    shiftKey: false,
    target: { setPointerCapture: () => undefined },
    preventDefault: () => undefined,
  } as unknown as PointerEvent;
}

/**
 * The hand tool. Magnified, the picture is larger than the box it is shown in,
 * and reaching the rest of it through the scrollbars means letting go of what
 * you were doing to find them.
 */
describe('PhotoPrepComponent — moving the view', () => {
  function zoomedIn() {
    const made = setup();
    made.component.setZoom({ target: { value: '3' } } as unknown as Event);
    made.fixture.detectChanges();
    return made;
  }

  it('takes the space bar only once there is somewhere to pan to', () => {
    const { component } = setup();

    // Whole photograph on screen: nothing to move, so the key stays the
    // page's own and every button on it goes on answering to it.
    const atRest = spaceOn(document.body);
    component.takeSpace(atRest);
    expect(component.panning()).toBe(false);
    expect(atRest.defaultPrevented).toBe(false);

    component.setZoom({ target: { value: '3' } } as unknown as Event);
    const magnified = spaceOn(document.body);
    component.takeSpace(magnified);

    expect(component.panning()).toBe(true);
    // Otherwise the page jumps a screenful down under the picture.
    expect(magnified.defaultPrevented).toBe(true);
  });

  it('leaves the space bar alone while something is being typed into', () => {
    const { component, fixture } = zoomedIn();
    const box = fixture.nativeElement.querySelector(
      'input[inputmode="decimal"]'
    ) as HTMLInputElement;

    const typed = spaceOn(box);
    component.takeSpace(typed);

    expect(component.panning()).toBe(false);
    expect(typed.defaultPrevented).toBe(false);
  });

  it('still takes it from a slider or a button, which have Enter to fall back on', () => {
    const { component, fixture } = zoomedIn();
    const slider = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;

    component.takeSpace(spaceOn(slider));

    expect(component.panning()).toBe(true);
  });

  it('lets go when the key comes up, and when the window goes away', () => {
    const { component } = zoomedIn();

    component.takeSpace(spaceOn(document.body));
    component.releaseSpace({ code: 'Space' } as KeyboardEvent);
    expect(component.panning()).toBe(false);

    component.takeSpace(spaceOn(document.body));
    // No keyup is ever coming for a window that has lost the focus.
    component.stopPanning();
    expect(component.panning()).toBe(false);
  });

  it('moves the view the way the hand went, and by as much', () => {
    const { component, fixture } = zoomedIn();
    const viewport = fixture.nativeElement.querySelector('.prep-viewport') as HTMLElement;
    viewport.scrollLeft = 200;
    viewport.scrollTop = 100;

    component.takeSpace(spaceOn(document.body));
    component.startBrush(pointerAtScreen(500, 400));
    component.pan(pointerAtScreen(460, 370));

    // Dragged 40 left and 30 up, so the view moves 40 and 30 the other way —
    // which is the picture following the hand exactly.
    expect(viewport.scrollLeft).toBe(240);
    expect(viewport.scrollTop).toBe(130);
  });

  it('does not paint with the brush that is in hand', () => {
    // The brush and the hand share the same press. Panning across a painting
    // with the brush switched on must move the view and leave no mark.
    const { component, fixture } = zoomedIn();
    component.widthText.set('116');
    component.heightText.set('140,5');
    component.useBrush('add');
    // The brush reads the pointer through the stage's box, which in a test
    // browser has no size at all — and a dab that lands nowhere would let this
    // pass whether the hand stopped it or not.
    const stage = fixture.nativeElement.querySelector('.prep-stage') as HTMLElement;
    stage.getBoundingClientRect = () => ({ left: 0, top: 0, width: 1000, height: 800 }) as DOMRect;

    component.takeSpace(spaceOn(document.body));
    component.startBrush(pointerAtScreen(500, 400));

    expect(component.hasArea()).toBe(false);
  });

  it('gives the key back when the picture is no longer magnified', () => {
    const { component } = zoomedIn();
    component.takeSpace(spaceOn(document.body));

    component.setZoom({ target: { value: '1' } } as unknown as Event);

    expect(component.panning()).toBe(false);
  });
});

/** A slider dragged to a position, as a percentage of its travel. */
function slid(percent: number): Event {
  return { target: { value: String(percent) } } as unknown as Event;
}

/**
 * A studio is one room with one set of lights, so the correction one photograph
 * needs is very nearly the correction the next one needs. Starting every
 * picture at nought meant finding the same numbers again each time.
 */
describe('PhotoPrepComponent — the sliders stay where they were left', () => {
  beforeEach(() => localStorage.removeItem('juanmamoreno.studio.adjustments'));

  it('writes down where a slider was put', () => {
    const { component } = setup();

    component.setBrightness(slid(30));
    component.setWhites(slid(-40));

    const stored = JSON.parse(
      localStorage.getItem('juanmamoreno.studio.adjustments') ?? 'null'
    ) as Record<string, number>;
    expect(stored['brightness']).toBeCloseTo(0.3, 3);
    expect(stored['whites']).toBeCloseTo(-0.4, 3);
  });

  it('opens the next photograph with them already there', () => {
    const { component } = setup();
    component.setBrightness(slid(30));

    // What choosing another photograph does, which is also what a finished
    // certificate does from below.
    component.reset();

    expect(component.brightness()).toBeCloseTo(0.3, 3);
  });

  it('starts a second studio where the first one was left', () => {
    const first = setup();
    first.component.setWhites(slid(50));

    // The next visit to the page, which is the whole point of writing it down:
    // a fresh component reading the same storage.
    const next = TestBed.createComponent(PhotoPrepComponent)
      .componentInstance as unknown as Internals;

    expect(next.whites()).toBeCloseTo(0.5, 3);
  });

  it('remembers being told the photograph needed nothing', () => {
    const { component } = setup();
    component.setBrightness(slid(30));

    component.resetAdjustments();

    expect(component.brightness()).toBe(0);
    const stored = JSON.parse(
      localStorage.getItem('juanmamoreno.studio.adjustments') ?? 'null'
    ) as Record<string, number>;
    expect(stored['brightness']).toBe(0);
  });

  it('does not write down the zeroing that keeping a change does', () => {
    // A change is kept where it was made and the sliders start again, so that
    // the next selection gets its own. That is bookkeeping, not an opinion
    // about where the sliders belong — saving it would throw the settings away
    // the moment a brush was picked up.
    const { component } = setup();
    component.widthText.set('116');
    component.heightText.set('140,5');
    component.setBrightness(slid(30));

    // Picking up the brush is what commits the pending change and starts the
    // sliders again.
    component.useBrush('add');
    component.startBrush(pointerAtScreen(500, 400));
    expect(component.brightness()).toBe(0);

    const stored = JSON.parse(
      localStorage.getItem('juanmamoreno.studio.adjustments') ?? 'null'
    ) as Record<string, number>;
    expect(stored['brightness']).toBeCloseTo(0.3, 3);
  });

  it('starts at nought when nothing has ever been stored', () => {
    const { component } = setup();

    expect(component.brightness()).toBe(0);
    expect(component.whites()).toBe(0);
    expect(component.saturation()).toBe(0);
  });
});

/**
 * The fault this answers, in the artist's words: "the result is distorted".
 *
 * Each side's two handles could be dragged anywhere. Pulled square to the side
 * they bend it, which is what they are for. Pushed *along* it they bend nothing
 * — they change how fast the side is travelled, so the correction reads faster
 * through one stretch of the painting and slower through the next, and one part
 * comes out bigger than it is with its neighbour smaller. Nothing showed it:
 * the outline still ran through the corners and still looked like the edge of
 * the canvas.
 */
describe('PhotoPrepComponent — a handle cannot stretch the painting along a side', () => {
  it('ignores the part of a drag that runs along the side', () => {
    const { fixture, component } = setup();
    stageOf(fixture);
    const [first] = bowControls(QUAD, straightBows(), 'top');

    // The top side runs from (100, 80) to (900, 90), so this is a long drag
    // straight down it and not at all across it.
    component.grabBow('top', 0, pointerAt(first.x, first.y));
    component.drag(pointerAt(first.x + 240, first.y + 240 * (10 / 800)));

    expect(component.bows()?.top[0]).toBeCloseTo(0, 6);
  });

  it('still bends the side by exactly the part that is across it', () => {
    const { fixture, component } = setup();
    stageOf(fixture);
    const [first] = bowControls(QUAD, straightBows(), 'top');

    // The same drag with a push square to the side added to it. Only the push
    // survives, and all of it does — the handles still move the cut line.
    const across = edgeNormal(QUAD, 'top');
    component.grabBow('top', 0, pointerAt(first.x, first.y));
    component.drag(
      pointerAt(first.x + 240 + across.x * 25, first.y + 240 * (10 / 800) + across.y * 25)
    );

    expect(component.bows()?.top[0]).toBeCloseTo(25, 6);
  });

  it('keeps a bend through a corner being moved, without touching it', () => {
    // A bow is a distance from its own chord, so the corner that moves takes
    // the chord and the control points with it. They used to be absolute
    // points shifted by hand here, and a corner nudged after a side was bent
    // left the control points a little off the new chord — which is the same
    // stretch along the side, arriving by a different door.
    const { fixture, component } = setup();
    stageOf(fixture);
    component.bows.set({ ...straightBows(), top: [18, 18] });

    component.grab(0, pointerAt(QUAD[0].x, QUAD[0].y));
    component.drag(pointerAt(QUAD[0].x + 60, QUAD[0].y + 40));

    expect(component.corners()?.[0]).toEqual({ x: QUAD[0].x + 60, y: QUAD[0].y + 40 });
    expect(component.bows()?.top).toEqual([18, 18]);
  });
});
