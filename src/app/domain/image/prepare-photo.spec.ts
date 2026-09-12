import { createRaster, type Raster } from './raster';
import { correctedSize, type Point, type Quad } from './quad';
import { detectQuad } from './detect-corners';
import { solveHomography, warpPerspective } from './perspective';
import { checkFocus } from './focus';
import { preparePhoto, type PhotoStage } from './prepare-photo';

type Rgb = [number, number, number];

/** Deterministic, so a test never passes or fails on the luck of the draw. */
function noise(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function blank(width: number, height: number, [r, g, b]: Rgb): Raster {
  const raster = createRaster(width, height);
  for (let i = 0; i < raster.data.length; i += 4) {
    raster.data[i] = r;
    raster.data[i + 1] = g;
    raster.data[i + 2] = b;
    raster.data[i + 3] = 255;
  }
  return raster;
}

function put(raster: Raster, x: number, y: number, [r, g, b]: Rgb): void {
  const i = (y * raster.width + x) * 4;
  raster.data[i] = r;
  raster.data[i + 1] = g;
  raster.data[i + 2] = b;
  raster.data[i + 3] = 255;
}

function pixel(raster: Raster, x: number, y: number): Rgb {
  const i = (y * raster.width + x) * 4;
  return [raster.data[i], raster.data[i + 1], raster.data[i + 2]];
}

function inside(quad: Quad, x: number, y: number): boolean {
  let hit = false;
  for (let i = 0, j = 3; i < 4; j = i++) {
    const a = quad[i];
    const b = quad[j];
    const straddles = a.y > y !== b.y > y;
    if (straddles && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) hit = !hit;
  }
  return hit;
}

function fillQuad(raster: Raster, quad: Quad, paint: (x: number, y: number) => Rgb): void {
  for (let y = 0; y < raster.height; y++) {
    for (let x = 0; x < raster.width; x++) {
      if (inside(quad, x, y)) put(raster, x, y, paint(x, y));
    }
  }
}

/** A dark wall with a lit, lightly textured painting hanging on it, slightly askew. */
function photographedPainting(quad: Quad): Raster {
  const raster = blank(400, 300, [38, 38, 44]);
  const random = noise(7);
  fillQuad(raster, quad, () => {
    const jitter = (random() - 0.5) * 16;
    return [205 + jitter, 182 + jitter, 150 + jitter];
  });
  return raster;
}

const askew: Quad = [
  { x: 60, y: 40 },
  { x: 340, y: 55 },
  { x: 330, y: 260 },
  { x: 70, y: 245 },
];

describe('solveHomography', () => {
  it('lands each corner it was given exactly on its partner', () => {
    const from: Quad = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 8 },
      { x: 0, y: 8 },
    ];
    const to = askew;
    const h = solveHomography(from, to);

    const apply = ({ x, y }: Point): Point => {
      const w = h[6] * x + h[7] * y + 1;
      return { x: (h[0] * x + h[1] * y + h[2]) / w, y: (h[3] * x + h[4] * y + h[5]) / w };
    };

    from.forEach((corner, i) => {
      const mapped = apply(corner);
      expect(mapped.x).toBeCloseTo(to[i].x, 6);
      expect(mapped.y).toBeCloseTo(to[i].y, 6);
    });
  });
});

describe('warpPerspective', () => {
  it('lifts the painting out of the photograph the right way up', () => {
    const source = blank(240, 200, [0, 0, 0]);
    const frame: Quad = [
      { x: 40, y: 30 },
      { x: 200, y: 30 },
      { x: 200, y: 170 },
      { x: 40, y: 170 },
    ];
    const quarters: Rgb[] = [
      [220, 20, 20],
      [20, 200, 20],
      [20, 20, 220],
      [220, 210, 20],
    ];
    fillQuad(source, frame, (x, y) => {
      const top = y < 100;
      const left = x < 120;
      return quarters[top ? (left ? 0 : 1) : left ? 3 : 2];
    });

    const out = warpPerspective(source, frame, { width: 160, height: 140 });

    expect(out.width).toBe(160);
    expect(out.height).toBe(140);
    const corners: [number, number, number][] = [
      [40, 35, 0],
      [120, 35, 1],
      [120, 105, 2],
      [40, 105, 3],
    ];
    for (const [x, y, quarter] of corners) {
      const [r, g, b] = pixel(out, x, y);
      const [wr, wg, wb] = quarters[quarter];
      expect(Math.abs(r - wr) + Math.abs(g - wg) + Math.abs(b - wb)).toBeLessThan(30);
    }
  });

  it('straightens a slanted painting into a rectangle of even colour', () => {
    const source = photographedPainting(askew);
    const out = warpPerspective(source, askew, correctedSize(askew, 4, 3));

    // Every corner of the result is painting, not wall: if the mapping were
    // out by even a little, one of them would come back near black.
    for (const [x, y] of [
      [2, 2],
      [out.width - 3, 2],
      [out.width - 3, out.height - 3],
      [2, out.height - 3],
    ]) {
      expect(pixel(out, x, y)[0]).toBeGreaterThan(150);
    }
  });
});

describe('detectQuad', () => {
  it('finds a painting hanging askew on a wall', () => {
    const { quad, detected } = detectQuad(photographedPainting(askew));

    expect(detected).toBe(true);
    quad.forEach((corner, i) => {
      expect(Math.hypot(corner.x - askew[i].x, corner.y - askew[i].y)).toBeLessThan(10);
    });
  });

  it('hands back the whole frame when there is no painting to find', () => {
    const { quad, detected } = detectQuad(blank(200, 160, [90, 90, 90]));

    expect(detected).toBe(false);
    expect(quad).toEqual([
      { x: 0, y: 0 },
      { x: 200, y: 0 },
      { x: 200, y: 160 },
      { x: 0, y: 160 },
    ]);
  });
});

describe('preparePhoto', () => {
  const options = {
    quad: askew,
    realWidth: 100,
    realHeight: 80,
    adjustments: { brightness: 0, temperature: 0, range: 0 },
  };

  it('gives back the painting at its own proportions', async () => {
    const { image, report } = await preparePhoto(photographedPainting(askew), options);

    expect(image.width / image.height).toBeCloseTo(1.25, 1);
    expect(report.size).toEqual({ width: image.width, height: image.height });
  });

  it('reports each stage as it reaches it', async () => {
    const seen: PhotoStage[] = [];
    await preparePhoto(photographedPainting(askew), {
      ...options,
      onStage: (stage) => {
        seen.push(stage);
      },
    });

    expect(seen).toEqual(['straightening', 'adjusting', 'focus']);
  });

  /**
   * The five automatic passes that used to live here were removed rather than
   * fixed: each measured the photograph and decided for itself whether to act,
   * and none could tell a lamp that fell off from paint that is dark. What
   * replaced them does exactly what it is told and nothing when told nothing.
   */
  it('changes no colour at all when the sliders are at nought', async () => {
    const source = photographedPainting(askew);
    const { image: untouched } = await preparePhoto(source, options);
    const { image: again } = await preparePhoto(photographedPainting(askew), options);

    expect(again.data).toEqual(untouched.data);
  });

  it('says whether anything was asked for', async () => {
    const plain = await preparePhoto(photographedPainting(askew), options);
    expect(plain.report.adjusted).toBe(false);

    const lifted = await preparePhoto(photographedPainting(askew), {
      ...options,
      adjustments: { brightness: 0.5, temperature: 0, range: 0 },
    });
    expect(lifted.report.adjusted).toBe(true);
  });

  it('lifts the picture when the brightness is raised', async () => {
    const before = await preparePhoto(photographedPainting(askew), options);
    const after = await preparePhoto(photographedPainting(askew), {
      ...options,
      adjustments: { brightness: 0.6, temperature: 0, range: 0 },
    });

    const mean = (r: { data: Uint8ClampedArray }) => {
      let sum = 0;
      for (let i = 0; i < r.data.length; i += 4) sum += r.data[i];
      return sum / (r.data.length / 4);
    };
    expect(mean(after.image)).toBeGreaterThan(mean(before.image));
  });

  it('never enlarges the photograph it was given', async () => {
    const { image } = await preparePhoto(photographedPainting(askew), {
      ...options,
      realWidth: 30,
      realHeight: 90,
    });

    expect(image.width).toBeLessThanOrEqual(400);
    expect(image.height).toBeLessThanOrEqual(300);
  });
});

describe('focus', () => {
  /** Coarse modelling everywhere, fine grain only where the lens was sharp. */
  const photograph = (softFrom: number) => {
    const raster = blank(360, 240, [120, 120, 120]);
    const random = noise(21);
    for (let y = 0; y < 240; y++) {
      for (let x = 0; x < 360; x++) {
        const modelling = 26 * Math.sin(x / 11) * Math.cos(y / 9);
        const grain = x >= softFrom ? 0 : (random() - 0.5) * 70;
        const value = 120 + modelling + grain;
        put(raster, x, y, [value, value, value]);
      }
    }
    return raster;
  };

  it('passes a photograph that is sharp throughout', () => {
    const report = checkFocus(photograph(360));

    expect(report.judged).toBe(true);
    expect(report.soft).toEqual([]);
  });

  it('points at the side that came out soft', () => {
    const report = checkFocus(photograph(240));

    expect(report.judged).toBe(true);
    expect(report.soft.length).toBeGreaterThan(0);
    expect(report.soft.every((where) => where.includes('right'))).toBe(true);
  });

  it('does not call flat paint out of focus', () => {
    // Nothing in a flat panel was lost, so there is nothing to report.
    expect(checkFocus(blank(360, 240, [130, 96, 70])).judged).toBe(false);
  });
});

