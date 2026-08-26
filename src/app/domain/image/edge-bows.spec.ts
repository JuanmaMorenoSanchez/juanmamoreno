import { describe, expect, it } from 'vitest';
import { warpPerspective } from './perspective';
import {
  bezierAt,
  bowsAreStraight,
  fullFrame,
  straightBows,
  type EdgeBows,
  type Point,
  type Quad,
} from './quad';
import { createRaster, type Raster } from './raster';

/**
 * A test card of hard straight lines. Bowing is a geometric fault, and a grid
 * is where a geometric fault shows: a soft photograph could hide a bend that a
 * ruled line cannot.
 */
function testCard(width: number, height: number): Raster {
  const raster = createRaster(width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const rule = x % 40 < 3 || y % 40 < 3;
      raster.data[i] = rule ? 20 : 190;
      raster.data[i + 1] = rule ? 20 : 120;
      raster.data[i + 2] = rule ? 20 : 90;
      raster.data[i + 3] = 255;
    }
  }
  return raster;
}

/** Pushes one side out sideways by `amount`, leaving its corners alone. */
function bowOut(quad: Quad, edge: keyof EdgeBows, amount: number): EdgeBows {
  const bows = straightBows(quad);
  const vertical = edge === 'left' || edge === 'right';
  bows[edge] = bows[edge].map((point) => ({
    x: vertical ? point.x + amount : point.x,
    y: vertical ? point.y : point.y + amount,
  })) as [Point, Point];
  return bows;
}

describe('bowed sides', () => {
  const source = testCard(320, 240);
  const quad: Quad = [
    { x: 20, y: 16 },
    { x: 300, y: 16 },
    { x: 300, y: 224 },
    { x: 20, y: 224 },
  ];
  const size = { width: 280, height: 208 };

  // The property that makes this safe to add: a photograph whose sides are
  // straight has to come out exactly as it did before bows existed, or every
  // correction already made would shift the day this shipped.
  it('changes nothing at all when the sides are straight', () => {
    const withoutBows = warpPerspective(source, quad, size);
    const withStraightBows = warpPerspective(source, quad, size, straightBows(quad));

    expect(withStraightBows.data).toEqual(withoutBows.data);
  });

  it('leaves the corners where the perspective correction put them', () => {
    const plain = warpPerspective(source, quad, size);
    const bowed = warpPerspective(source, quad, size, bowOut(quad, 'left', -18));

    // The four corner pixels of the result come from the four corners of the
    // quad either way: a departure is zero at both ends of every side.
    for (const [x, y] of [
      [0, 0],
      [size.width - 1, 0],
      [size.width - 1, size.height - 1],
      [0, size.height - 1],
    ]) {
      const i = (y * size.width + x) * 4;
      expect(bowed.data[i]).toBeCloseTo(plain.data[i], -1);
      expect(bowed.data[i + 1]).toBeCloseTo(plain.data[i + 1], -1);
    }
  });

  it('reads from a different place in the middle of a bowed side', () => {
    const plain = warpPerspective(source, quad, size);
    const bowed = warpPerspective(source, quad, size, bowOut(quad, 'left', -18));

    let differing = 0;
    for (let i = 0; i < plain.data.length; i += 4) {
      if (plain.data[i] !== bowed.data[i]) differing++;
    }
    expect(differing).toBeGreaterThan(size.width * size.height * 0.1);
  });

  /**
   * The whole point, end to end: photograph a straight-sided painting through
   * something that bends its left side, describe that side as the curve it has
   * become, and the correction should give the straight side back.
   */
  it('straightens a side that the photograph bent', () => {
    const CARD = { width: 240, height: 180 };
    const flat = testCard(CARD.width, CARD.height);

    // Build a "photograph": the card with its left side bowed outwards.
    const PHOTO = { width: 360, height: 260 };
    const photoQuad: Quad = [
      { x: 50, y: 30 },
      { x: 310, y: 30 },
      { x: 310, y: 230 },
      { x: 50, y: 230 },
    ];
    const BOW = -22;
    const photoBows = bowOut(photoQuad, 'left', BOW);

    const photo = createRaster(PHOTO.width, PHOTO.height);
    for (let v = 0; v < CARD.height * 3; v++) {
      const ty = v / (CARD.height * 3 - 1);
      for (let u = 0; u < CARD.width * 3; u++) {
        const tx = u / (CARD.width * 3 - 1);
        const top = bezierAt(photoQuad[0], photoBows.top[0], photoBows.top[1], photoQuad[1], tx);
        const bottom = bezierAt(photoQuad[3], photoBows.bottom[0], photoBows.bottom[1], photoQuad[2], tx);
        const left = bezierAt(photoQuad[0], photoBows.left[0], photoBows.left[1], photoQuad[3], ty);
        const right = bezierAt(photoQuad[1], photoBows.right[0], photoBows.right[1], photoQuad[2], ty);
        // Coons: the standard surface through four boundary curves.
        const x =
          (1 - ty) * top.x + ty * bottom.x + (1 - tx) * left.x + tx * right.x -
          ((1 - tx) * (1 - ty) * photoQuad[0].x + tx * (1 - ty) * photoQuad[1].x +
            (1 - tx) * ty * photoQuad[3].x + tx * ty * photoQuad[2].x);
        const y =
          (1 - ty) * top.y + ty * bottom.y + (1 - tx) * left.y + tx * right.y -
          ((1 - tx) * (1 - ty) * photoQuad[0].y + tx * (1 - ty) * photoQuad[1].y +
            (1 - tx) * ty * photoQuad[3].y + tx * ty * photoQuad[2].y);

        const px = Math.round(x);
        const py = Math.round(y);
        if (px < 0 || py < 0 || px >= PHOTO.width || py >= PHOTO.height) continue;
        const from =
          (Math.min(CARD.height - 1, Math.round(ty * (CARD.height - 1))) * CARD.width +
            Math.min(CARD.width - 1, Math.round(tx * (CARD.width - 1)))) * 4;
        const to = (py * PHOTO.width + px) * 4;
        photo.data[to] = flat.data[from];
        photo.data[to + 1] = flat.data[from + 1];
        photo.data[to + 2] = flat.data[from + 2];
        photo.data[to + 3] = 255;
      }
    }

    const out = { width: CARD.width, height: CARD.height };
    const corrected = warpPerspective(photo, photoQuad, out, photoBows);
    const uncorrected = warpPerspective(photo, photoQuad, out);

    // Compared against the card it was made from, which is the whole claim:
    // hunting for a rule and measuring how far it wanders reads the card's own
    // border as easily as an interior line, and answers a different question.
    const meanDifference = (raster: Raster): number => {
      let total = 0;
      let counted = 0;
      const margin = 6;
      for (let y = margin; y < out.height - margin; y++) {
        for (let x = margin; x < out.width - margin; x++) {
          const i = (y * out.width + x) * 4;
          total += Math.abs(raster.data[i] - flat.data[i]);
          counted++;
        }
      }
      return total / counted;
    };

    const withBow = meanDifference(corrected);
    const withoutBow = meanDifference(uncorrected);

    // Describing the bend and undoing it has to beat ignoring it, by a margin
    // no amount of resampling noise could account for.
    expect(withBow).toBeLessThan(withoutBow / 2);
    expect(withBow).toBeLessThan(20);
  });
});

describe('bowsAreStraight', () => {
  const quad = fullFrame({ width: 100, height: 80 });

  it('is true for controls sitting on the chords', () => {
    expect(bowsAreStraight(quad, straightBows(quad))).toBe(true);
  });

  it('is false once a side is pushed out', () => {
    expect(bowsAreStraight(quad, bowOut(quad, 'top', 9))).toBe(false);
  });

  // Dragging a corner leaves the controls where they were, a fraction off the
  // new chord; that is not a bow anyone asked for and must not switch the
  // slower path on.
  it('tolerates a control point a fraction off the line', () => {
    expect(bowsAreStraight(quad, bowOut(quad, 'top', 0.3))).toBe(true);
  });
});
