import { anyShine, findShine, shineScale, takeOffShine } from './shine';
import { createRaster, type Raster } from './raster';

/**
 * The thing that must not happen is the artist's own brushwork being taken for
 * glare, so most of what is here is a painting with nothing wrong with it.
 */
const BASE: [number, number, number] = [96, 130, 70];

/** Paint with a weave in it, which is what a canvas photographs as. */
function canvas(width = 240, height = 180): Raster {
  const raster = createRaster(width, height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * 4;
      // A weave of about ten, which is the texture a real one measured at.
      const weave = ((x % 3) + (y % 3)) * 4 - 8;
      raster.data[i] = BASE[0] + weave;
      raster.data[i + 1] = BASE[1] + weave;
      raster.data[i + 2] = BASE[2] + weave;
      raster.data[i + 3] = 255;
    }
  }
  return raster;
}

/** A glint: small in every direction, and near enough white. */
function glint(raster: Raster, cx: number, cy: number, radius = 2): void {
  for (let y = cy - radius; y <= cy + radius; y += 1) {
    for (let x = cx - radius; x <= cx + radius; x += 1) {
      if (x < 0 || y < 0 || x >= raster.width || y >= raster.height) continue;
      const fall = Math.hypot(x - cx, y - cy) / (radius + 1);
      const lift = Math.round(120 * Math.max(0, 1 - fall));
      const i = (y * raster.width + x) * 4;
      for (let c = 0; c < 3; c += 1) {
        raster.data[i + c] = Math.min(255, raster.data[i + c] + lift);
      }
    }
  }
}

/** A stroke: as narrow as a glint, and long. */
function stroke(
  raster: Raster,
  x0: number,
  y0: number,
  dx: number,
  dy: number,
  steps: number
): void {
  for (let s = 0; s < steps; s += 1) {
    const x = Math.round(x0 + dx * s);
    const y = Math.round(y0 + dy * s);
    for (let w = -1; w <= 1; w += 1) {
      const px = dy === 0 ? x : x + w;
      const py = dy === 0 ? y + w : y;
      if (px < 0 || py < 0 || px >= raster.width || py >= raster.height) continue;
      const i = (py * raster.width + px) * 4;
      raster.data[i] = 238;
      raster.data[i + 1] = 236;
      raster.data[i + 2] = 230;
    }
  }
}

const shineAt = (shine: Float32Array, raster: Raster, x: number, y: number) =>
  shine[y * raster.width + x];

const at = (raster: Raster, x: number, y: number) => {
  const i = (y * raster.width + x) * 4;
  return [raster.data[i], raster.data[i + 1], raster.data[i + 2]];
};

describe('finding what the varnish caught', () => {
  it('finds nothing on a painting that has none', () => {
    const raster = canvas();

    expect(anyShine(findShine(raster, 4))).toBe(false);
  });

  it('finds a glint where there is one', () => {
    const raster = canvas();
    glint(raster, 120, 90);
    const shine = findShine(raster, 4);

    expect(anyShine(shine)).toBe(true);
    expect(shine[90 * raster.width + 120]).toBeGreaterThan(0.5);
  });

  it('covers the rim of a glint as well as its middle', () => {
    // Mend only the middle and the bright edge stays exactly where it was,
    // which reads worse than the glint did.
    const raster = canvas();
    glint(raster, 120, 90);
    const shine = findShine(raster, 4);

    expect(shine[90 * raster.width + 123]).toBeGreaterThan(0);
  });

  /**
   * The one that matters. A stroke is as narrow as a glint and the difference
   * is that it goes somewhere, which is why the baseline is the best of four
   * openings rather than one.
   */
  for (const [name, dx, dy] of [
    ['across', 1, 0],
    ['down', 0, 1],
    ['diagonally', 1, 1],
    ['the other way', 1, -1],
  ] as const) {
    it(`leaves a fine stroke running ${name} alone`, () => {
      const raster = canvas();
      stroke(raster, dy === -1 ? 40 : 40, dy === -1 ? 140 : 40, dx, dy, 100);
      const shine = findShine(raster, 4);

      const x = Math.round(40 + dx * 50);
      const y = Math.round((dy === -1 ? 140 : 40) + dy * 50);
      expect(shine[y * raster.width + x]).toBe(0);
    });
  }

  it('leaves a broad light passage alone', () => {
    // A painted highlight is bigger than the element, so the opening keeps it
    // and it stands out by nothing.
    const raster = canvas();
    for (let y = 60; y < 110; y += 1) {
      for (let x = 60; x < 110; x += 1) {
        const i = (y * raster.width + x) * 4;
        raster.data[i] = 240;
        raster.data[i + 1] = 238;
        raster.data[i + 2] = 232;
      }
    }

    expect(shineAt(findShine(raster, 4), raster, 85, 85)).toBe(0);
  });
});

describe('putting the paint back', () => {
  it('brings a glint back to the paint around it', () => {
    const raster = canvas();
    glint(raster, 120, 90);
    const before = at(raster, 120, 90)[1];
    expect(before).toBeGreaterThan(BASE[1] + 60);

    takeOffShine(raster, findShine(raster, 4), 4);

    // Back within the weave's own swing of the paint it sat on.
    expect(at(raster, 120, 90)[1]).toBeLessThan(BASE[1] + 20);
  });

  it('keeps the colour of the paint it puts back', () => {
    const raster = canvas();
    glint(raster, 120, 90);
    takeOffShine(raster, findShine(raster, 4), 4);
    const [r, g, b] = at(raster, 120, 90);

    // The green stays a green: a glint is white light added on top, and what is
    // underneath it is the same paint as its neighbours.
    expect(g).toBeGreaterThan(r);
    expect(r).toBeGreaterThan(b);
  });

  it('leaves the rest of the painting untouched, to the byte', () => {
    const raster = canvas();
    glint(raster, 120, 90);
    const copy = new Uint8ClampedArray(raster.data);

    takeOffShine(raster, findShine(raster, 4), 4);

    let changed = 0;
    for (let i = 0; i < raster.data.length; i += 4) {
      if (raster.data[i] !== copy[i]) changed += 1;
    }
    // One glint and its rim, and nothing else in forty thousand pixels.
    expect(changed).toBeGreaterThan(8);
    expect(changed).toBeLessThan(200);
  });

  it('does nothing at all when nothing was found', () => {
    const raster = canvas();
    const copy = new Uint8ClampedArray(raster.data);

    takeOffShine(raster, findShine(raster, 4), 4);

    expect(raster.data).toEqual(copy);
  });
});

/**
 * A glint is a fact about the varnish, not about the file: the same speck is
 * six pixels across in one photograph and thirteen in a larger one of the same
 * canvas. Fixed at what suited one picture, this found nothing in the other.
 */
describe('the size a glint is looked for at', () => {
  it('grows with the photograph', () => {
    expect(shineScale(2705).radius).toBe(4);
    expect(shineScale(6016).radius).toBeGreaterThan(shineScale(2705).radius);
  });

  it('stays inside bounds a painting can survive', () => {
    expect(shineScale(200).radius).toBeGreaterThanOrEqual(3);
    expect(shineScale(40000).radius).toBeLessThanOrEqual(16);
  });
});
