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

describe('range', () => {
  it('drives the dark darker and the light lighter above nought', () => {
    const dark = patch(60, 60, 60);
    const light = patch(200, 200, 200);
    applyAdjustments(dark, adjust({ range: 1 }));
    applyAdjustments(light, adjust({ range: 1 }));

    expect(pixel(dark, 0, 0)[0]).toBeLessThan(60);
    expect(pixel(light, 0, 0)[0]).toBeGreaterThan(200);
  });

  it('brings both towards the middle below nought', () => {
    const dark = patch(60, 60, 60);
    const light = patch(200, 200, 200);
    applyAdjustments(dark, adjust({ range: -1 }));
    applyAdjustments(light, adjust({ range: -1 }));

    expect(pixel(dark, 0, 0)[0]).toBeGreaterThan(60);
    expect(pixel(light, 0, 0)[0]).toBeLessThan(200);
  });

  it('leaves mid grey where it is, since that is what it pivots on', () => {
    const raster = patch(128, 128, 128);
    applyAdjustments(raster, adjust({ range: 1 }));

    expect(pixel(raster, 0, 0)[0]).toBeGreaterThanOrEqual(127);
    expect(pixel(raster, 0, 0)[0]).toBeLessThanOrEqual(129);
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
