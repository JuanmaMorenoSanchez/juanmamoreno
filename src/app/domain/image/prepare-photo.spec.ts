import { createRaster, type Raster } from './raster';
import { correctedSize, type Point, type Quad } from './quad';
import { detectQuad } from './detect-corners';
import { solveHomography, warpPerspective } from './perspective';
import { equalizeIllumination, measureIllumination } from './illumination';
import { findSpecular, repairSpecular } from './specular';
import { autoLevels, autoWhiteBalance } from './colour';
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

function disc(raster: Raster, cx: number, cy: number, radius: number, colour: Rgb): void {
  for (let y = cy - radius; y <= cy + radius; y++) {
    for (let x = cx - radius; x <= cx + radius; x++) {
      const dx = x - cx;
      const dy = y - cy;
      if (dx * dx + dy * dy <= radius * radius) put(raster, x, y, colour);
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

describe('illumination', () => {
  const evenly = () => blank(200, 150, [150, 120, 90]);

  const unevenly = () => {
    const raster = evenly();
    for (let y = 0; y < raster.height; y++) {
      for (let x = 0; x < raster.width; x++) {
        const lamp = 0.7 + (0.6 * x) / raster.width;
        put(raster, x, y, [150 * lamp, 120 * lamp, 90 * lamp]);
      }
    }
    return raster;
  };

  it('calls evenly lit paint evenly lit', () => {
    expect(measureIllumination(evenly()).uniform).toBe(true);
  });

  it('notices a lamp falling off across the canvas', () => {
    const report = measureIllumination(unevenly());
    expect(report.uniform).toBe(false);
    expect(report.variation).toBeGreaterThan(0.3);
  });

  it('flattens the gradient it found', () => {
    const raster = unevenly();
    const before = measureIllumination(raster).variation;
    equalizeIllumination(raster);

    expect(measureIllumination(raster).variation).toBeLessThan(before / 2);
  });

  it('leaves the colour of the paint alone while lifting the dim corner', () => {
    const raster = unevenly();
    const [beforeR, beforeG] = pixel(raster, 10, 75);
    equalizeIllumination(raster);
    const [afterR, afterG] = pixel(raster, 10, 75);

    expect(afterR).toBeGreaterThan(beforeR);
    expect(afterR / afterG).toBeCloseTo(beforeR / beforeG, 1);
  });
});

describe('specular highlights', () => {
  const painting = () => {
    const raster = blank(240, 180, [120, 95, 75]);
    const random = noise(11);
    for (let y = 0; y < raster.height; y++) {
      for (let x = 0; x < raster.width; x++) {
        const jitter = (random() - 0.5) * 14;
        put(raster, x, y, [120 + jitter, 95 + jitter, 75 + jitter]);
      }
    }
    return raster;
  };

  it('finds the flare thrown back by wet varnish', () => {
    const raster = painting();
    disc(raster, 100, 80, 4, [255, 255, 255]);

    expect(findSpecular(raster).spots).toBe(1);
  });

  it('leaves a passage of white paint alone', () => {
    const raster = painting();
    fillQuad(
      raster,
      [
        { x: 60, y: 50 },
        { x: 120, y: 50 },
        { x: 120, y: 110 },
        { x: 60, y: 110 },
      ],
      () => [255, 255, 255]
    );

    expect(findSpecular(raster).spots).toBe(0);
  });

  it('fills the flare back in with the paint around it', () => {
    const raster = painting();
    disc(raster, 100, 80, 4, [255, 255, 255]);
    repairSpecular(raster, findSpecular(raster));

    const [r, g, b] = pixel(raster, 100, 80);
    expect(r).toBeGreaterThan(95);
    expect(r).toBeLessThan(150);
    expect(g).toBeLessThan(r);
    expect(b).toBeLessThan(g);
  });

  it('does nothing at all when nothing is flaring', () => {
    const raster = painting();
    const before = Uint8ClampedArray.from(raster.data);
    const finding = findSpecular(raster);
    repairSpecular(raster, finding);

    expect(finding.spots).toBe(0);
    expect(raster.data).toEqual(before);
  });
});

describe('preparePhoto', () => {
  const options = {
    quad: askew,
    realWidth: 100,
    realHeight: 80,
    equalizeLighting: true,
    removeGlare: true,
    correctCast: true,
    openTones: true,
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

    expect(seen).toEqual(['straightening', 'lighting', 'glare', 'colour', 'focus']);
  });

  it('leaves evenly lit paint untouched rather than correcting it anyway', async () => {
    const { report } = await preparePhoto(photographedPainting(askew), options);

    expect(report.illumination.uniform).toBe(true);
    expect(report.equalized).toBe(false);
  });

  it('does not go near the glare when told not to', async () => {
    const source = photographedPainting(askew);
    disc(source, 200, 150, 4, [255, 255, 255]);
    const { report } = await preparePhoto(source, { ...options, removeGlare: false });

    expect(report.spotsRemoved).toBe(0);
    expect(report.glareCoverage).toBe(0);
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

describe('auto levels', () => {
  /** Nothing near black or white, as a photograph veiled by lens flare comes out. */
  const flat = () => {
    const raster = blank(120, 90, [60, 90, 120]);
    const random = noise(3);
    for (let y = 0; y < 90; y++) {
      for (let x = 0; x < 120; x++) {
        const lift = random() * 40;
        put(raster, x, y, [60 + lift, 90 + lift, 120 + lift]);
      }
    }
    return raster;
  };

  it('opens out a photograph that never reached either end', () => {
    const raster = flat();
    const report = autoLevels(raster);

    expect(report.applied).toBe(true);
    expect(report.low).toBeGreaterThan(20);
    expect(report.high).toBeLessThan(200);
  });

  it('leaves a photograph that already used the range alone', () => {
    const raster = blank(60, 40, [0, 0, 0]);
    put(raster, 10, 10, [255, 255, 255]);
    put(raster, 11, 10, [255, 255, 255]);

    expect(autoLevels(raster).applied).toBe(false);
  });

  it('does not crush a saturated colour to nothing', () => {
    // The channels run 40 to 200 while the luminance runs a much narrower band.
    // Taking the black point off the luminance would drive the 40s below zero.
    const raster = blank(80, 60, [200, 40, 40]);
    for (let x = 40; x < 80; x++) {
      for (let y = 0; y < 60; y++) put(raster, x, y, [40, 40, 200]);
    }
    autoLevels(raster);

    const [r, g, b] = pixel(raster, 5, 5);
    expect(g).toBeGreaterThan(0);
    expect(b).toBeGreaterThan(0);
    expect(r).toBeGreaterThan(g);
  });
});

describe('colour temperature', () => {
  const withPalePassage = (tint: Rgb) => {
    const raster = blank(120, 90, [110, 70, 55]);
    for (let y = 10; y < 50; y++) {
      for (let x = 10; x < 80; x++) put(raster, x, y, tint);
    }
    return raster;
  };

  it('names and lifts a blue cast', () => {
    const report = autoWhiteBalance(withPalePassage([200, 210, 235]));

    expect(report.judged).toBe(true);
    expect(report.applied).toBe(true);
    expect(report.cast).toBe('blue');
  });

  it('names a yellow cast the other way', () => {
    expect(autoWhiteBalance(withPalePassage([238, 226, 198])).cast).toBe('yellow');
  });

  it('leaves an already neutral photograph alone', () => {
    const report = autoWhiteBalance(withPalePassage([236, 236, 236]));

    expect(report.judged).toBe(true);
    expect(report.applied).toBe(false);
  });

  it('refuses to judge a painting with nothing pale in it', () => {
    // A terracotta ground is allowed to be terracotta. Assuming the picture
    // ought to average to grey would turn it to mud.
    const raster = blank(120, 90, [150, 72, 48]);
    const before = pixel(raster, 60, 45);
    const report = autoWhiteBalance(raster);

    expect(report.judged).toBe(false);
    expect(report.applied).toBe(false);
    expect(pixel(raster, 60, 45)).toEqual(before);
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
