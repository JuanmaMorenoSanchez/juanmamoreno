import { applyAdjustments, isUnchanged, NO_ADJUSTMENTS, type Adjustments } from './adjustments';
import { createSelection, paintDab } from './selection';
import type { Raster } from './raster';

/** A flat patch of one colour, which makes every change readable as a number. */
const patch = (r: number, g: number, b: number, width = 16, height = 16): Raster => {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < width * height; i += 1) {
    data[i * 4] = r;
    data[i * 4 + 1] = g;
    data[i * 4 + 2] = b;
    data[i * 4 + 3] = 255;
  }
  return { width, height, data };
};

const pixel = (raster: Raster, x: number, y: number) => {
  const i = (y * raster.width + x) * 4;
  return [raster.data[i], raster.data[i + 1], raster.data[i + 2]];
};

const adjust = (over: Partial<Adjustments>): Adjustments => ({ ...NO_ADJUSTMENTS, ...over });

describe('the photograph as it arrived is the middle of every slider', () => {
  it('changes nothing at nought', () => {
    const raster = patch(90, 100, 110);
    applyAdjustments(raster, NO_ADJUSTMENTS);

    expect(pixel(raster, 0, 0)).toEqual([90, 100, 110]);
    expect(isUnchanged(NO_ADJUSTMENTS)).toBe(true);
  });
});

describe('brightness', () => {
  it('lifts a dark patch, which is the fault the sliders exist for', () => {
    // The corner that started this measured about 80 where the middle was 113.
    const raster = patch(80, 80, 80);
    applyAdjustments(raster, adjust({ brightness: 0.5 }));

    const [r] = pixel(raster, 0, 0);
    expect(r).toBeGreaterThan(100);
  });

  it('darkens below nought', () => {
    const raster = patch(160, 160, 160);
    applyAdjustments(raster, adjust({ brightness: -0.5 }));

    expect(pixel(raster, 0, 0)[0]).toBeLessThan(160);
  });

  it('keeps the colour while changing the light', () => {
    // A lifted corner that goes pink is worse than one left dark.
    const raster = patch(60, 90, 120);
    applyAdjustments(raster, adjust({ brightness: 0.4 }));
    const [r, g, b] = pixel(raster, 0, 0);

    expect(g / r).toBeCloseTo(90 / 60, 1);
    expect(b / g).toBeCloseTo(120 / 90, 1);
  });
});

describe('temperature', () => {
  it('goes yellow above nought: red up, blue down', () => {
    const raster = patch(120, 120, 120);
    applyAdjustments(raster, adjust({ temperature: 1 }));
    const [r, g, b] = pixel(raster, 0, 0);

    expect(r).toBeGreaterThan(120);
    expect(b).toBeLessThan(120);
    expect(g).toBe(120);
  });

  it('goes blue below nought', () => {
    const raster = patch(120, 120, 120);
    applyAdjustments(raster, adjust({ temperature: -1 }));
    const [r, , b] = pixel(raster, 0, 0);

    expect(r).toBeLessThan(120);
    expect(b).toBeGreaterThan(120);
  });

  it('leaves green alone, so a warm shift does not become a tint', () => {
    const raster = patch(100, 140, 180);
    applyAdjustments(raster, adjust({ temperature: 0.6 }));

    expect(pixel(raster, 0, 0)[1]).toBe(140);
  });
});

/**
 * One slider stretched both ends of the scale at once, which is only ever half
 * right: a canvas photographed against a lit wall has whites that have gone
 * grey and blacks that are already black. These are that slider split in two,
 * and the thing to prove is that each one stays on its own half.
 */
describe('the whites', () => {
  it('drives the light half lighter above nought', () => {
    const light = patch(200, 200, 200);
    applyAdjustments(light, adjust({ whites: 1 }));

    expect(pixel(light, 0, 0)[0]).toBeGreaterThan(200);
  });

  it('brings the light half back towards the middle below nought', () => {
    const light = patch(200, 200, 200);
    applyAdjustments(light, adjust({ whites: -1 }));

    expect(pixel(light, 0, 0)[0]).toBeLessThan(200);
  });

  it('leaves the dark half alone, which is the whole reason it is its own slider', () => {
    const dark = patch(60, 60, 60);
    applyAdjustments(dark, adjust({ whites: 1 }));

    expect(pixel(dark, 0, 0)[0]).toBe(60);
  });
});

describe('the darks', () => {
  it('drives the dark half darker above nought', () => {
    const dark = patch(60, 60, 60);
    applyAdjustments(dark, adjust({ darks: 1 }));

    expect(pixel(dark, 0, 0)[0]).toBeLessThan(60);
  });

  it('lifts the dark half below nought', () => {
    const dark = patch(60, 60, 60);
    applyAdjustments(dark, adjust({ darks: -1 }));

    expect(pixel(dark, 0, 0)[0]).toBeGreaterThan(60);
  });

  it('leaves the light half alone', () => {
    const light = patch(200, 200, 200);
    applyAdjustments(light, adjust({ darks: 1 }));

    expect(pixel(light, 0, 0)[0]).toBe(200);
  });

  it('leaves mid grey where it is, since that is the hinge both turn on', () => {
    const raster = patch(128, 128, 128);
    applyAdjustments(raster, adjust({ whites: 1, darks: 1 }));

    expect(pixel(raster, 0, 0)[0]).toBeGreaterThanOrEqual(127);
    expect(pixel(raster, 0, 0)[0]).toBeLessThanOrEqual(129);
  });

  it('reaches further into the shadow than into the half light', () => {
    // Named for the end it acts on: a near-black moves more than a tone only
    // just below the middle, which is what keeps it from being a contrast
    // slider wearing another name.
    const deep = patch(20, 20, 20);
    const nearlyMid = patch(110, 110, 110);
    applyAdjustments(deep, adjust({ darks: 1 }));
    applyAdjustments(nearlyMid, adjust({ darks: 1 }));

    expect(20 - pixel(deep, 0, 0)[0]).toBeGreaterThan(110 - pixel(nearlyMid, 0, 0)[0]);
  });
});

/**
 * A photograph of a painting can come back with the colour flattened out of it
 * or laid on too thick, and neither is something the other sliders can answer.
 */
describe('the strength of the colour', () => {
  it('pushes a colour away from its own grey above nought', () => {
    const raster = patch(160, 110, 90);
    const before = pixel(raster, 0, 0);
    applyAdjustments(raster, adjust({ saturation: 1 }));
    const after = pixel(raster, 0, 0);

    expect(after[0]).toBeGreaterThan(before[0]);
    expect(after[2]).toBeLessThan(before[2]);
  });

  it('arrives at grey at the bottom of the slider', () => {
    const raster = patch(160, 110, 90);
    applyAdjustments(raster, adjust({ saturation: -1 }));
    const [r, g, b] = pixel(raster, 0, 0);

    expect(Math.abs(r - g)).toBeLessThanOrEqual(1);
    expect(Math.abs(g - b)).toBeLessThanOrEqual(1);
  });

  it('leaves something already grey exactly where it was', () => {
    // Nothing to strengthen, so nothing should move — a grey wall behind a
    // canvas must not pick up a cast from a slider about colour.
    const raster = patch(140, 140, 140);
    applyAdjustments(raster, adjust({ saturation: 1 }));

    expect(pixel(raster, 0, 0)).toEqual([140, 140, 140]);
  });

  it('keeps the brightness of what it strengthens', () => {
    const raster = patch(160, 110, 90);
    applyAdjustments(raster, adjust({ saturation: 0.5 }));
    const [r, g, b] = pixel(raster, 0, 0);
    const before = 0.2126 * 160 + 0.7152 * 110 + 0.0722 * 90;

    expect(0.2126 * r + 0.7152 * g + 0.0722 * b).toBeCloseTo(before, 0);
  });
});

describe('where the adjustment lands', () => {
  it('applies everywhere when nothing is selected', () => {
    const raster = patch(80, 80, 80, 40, 40);
    applyAdjustments(raster, adjust({ brightness: 0.5 }), null);

    expect(pixel(raster, 0, 0)[0]).toBeGreaterThan(80);
    expect(pixel(raster, 39, 39)[0]).toBeGreaterThan(80);
  });

  it('applies only inside a selection when there is one', () => {
    const raster = patch(80, 80, 80, 40, 40);
    const selection = createSelection(40, 40);
    // A hard dab in one corner, so the far corner is plainly outside it.
    paintDab(selection, { width: 40, height: 40 }, { x: 4, y: 4, radius: 8, softness: 0 });

    applyAdjustments(raster, adjust({ brightness: 0.6 }), selection);

    expect(pixel(raster, 3, 3)[0]).toBeGreaterThan(80);
    expect(pixel(raster, 39, 39)).toEqual([80, 80, 80]);
  });

  it('fades the adjustment out with the brush, rather than ending it at a line', () => {
    // The whole reason coverage is a fraction: a hard edge on an area of even
    // colour is exactly the artefact being corrected.
    const raster = patch(100, 100, 100, 60, 60);
    const selection = createSelection(60, 60);
    paintDab(selection, { width: 60, height: 60 }, { x: 30, y: 30, radius: 28, softness: 1 });

    applyAdjustments(raster, adjust({ brightness: 1 }), selection);

    const middle = pixel(raster, 30, 30)[0];
    const halfway = pixel(raster, 30, 16)[0];
    const outside = pixel(raster, 30, 1)[0];

    expect(middle).toBeGreaterThan(halfway);
    expect(halfway).toBeGreaterThan(outside);
  });
});
