import { describe, expect, it } from 'vitest';
import { warpPerspective } from './perspective';
import {
  bezierAt,
  bowAmount,
  bowControls,
  bowsAreStraight,
  bowShift,
  edgeNormal,
  edgeTangent,
  fullFrame,
  straightBows,
  type EdgeBows,
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

/**
 * Pushes one side off its chord by `amount`, leaving its corners alone.
 *
 * A distance square to the side, which since the rewrite is the only thing a
 * bow can be: there is no longer any way to express a control point that has
 * slid along the side instead, which was never a bend and only ever stretched
 * the picture.
 */
function bowOut(quad: Quad, edge: keyof EdgeBows, amount: number): EdgeBows {
  const bows = straightBows();
  bows[edge] = [amount, amount];
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
  // Two full warps and a comparison of every byte of both, which runs close
  // enough to the default five seconds to fail on a loaded machine while
  // passing on a quiet one. The work is the point of the test, so it is given
  // room rather than made smaller.
  it('changes nothing at all when the sides are straight', () => {
    const withoutBows = warpPerspective(source, quad, size);
    const withStraightBows = warpPerspective(source, quad, size, straightBows());

    expect(withStraightBows.data).toEqual(withoutBows.data);
  }, 20000);

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

    // Where the four sides' control points actually sit, which is what a curve
    // is drawn through. Held as distances now, so they are worked out rather
    // than stored.
    const topControls = bowControls(photoQuad, photoBows, 'top');
    const bottomControls = bowControls(photoQuad, photoBows, 'bottom');
    const leftControls = bowControls(photoQuad, photoBows, 'left');
    const rightControls = bowControls(photoQuad, photoBows, 'right');

    const photo = createRaster(PHOTO.width, PHOTO.height);
    for (let v = 0; v < CARD.height * 3; v++) {
      const ty = v / (CARD.height * 3 - 1);
      for (let u = 0; u < CARD.width * 3; u++) {
        const tx = u / (CARD.width * 3 - 1);
        const top = bezierAt(photoQuad[0], topControls[0], topControls[1], photoQuad[1], tx);
        const bottom = bezierAt(
          photoQuad[3],
          bottomControls[0],
          bottomControls[1],
          photoQuad[2],
          tx
        );
        const left = bezierAt(photoQuad[0], leftControls[0], leftControls[1], photoQuad[3], ty);
        const right = bezierAt(photoQuad[1], rightControls[0], rightControls[1], photoQuad[2], ty);
        // Coons: the standard surface through four boundary curves.
        const x =
          (1 - ty) * top.x +
          ty * bottom.x +
          (1 - tx) * left.x +
          tx * right.x -
          ((1 - tx) * (1 - ty) * photoQuad[0].x +
            tx * (1 - ty) * photoQuad[1].x +
            (1 - tx) * ty * photoQuad[3].x +
            tx * ty * photoQuad[2].x);
        const y =
          (1 - ty) * top.y +
          ty * bottom.y +
          (1 - tx) * left.y +
          tx * right.y -
          ((1 - tx) * (1 - ty) * photoQuad[0].y +
            tx * (1 - ty) * photoQuad[1].y +
            (1 - tx) * ty * photoQuad[3].y +
            tx * ty * photoQuad[2].y);

        const px = Math.round(x);
        const py = Math.round(y);
        if (px < 0 || py < 0 || px >= PHOTO.width || py >= PHOTO.height) continue;
        const from =
          (Math.min(CARD.height - 1, Math.round(ty * (CARD.height - 1))) * CARD.width +
            Math.min(CARD.width - 1, Math.round(tx * (CARD.width - 1)))) *
          4;
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
    expect(bowsAreStraight(straightBows())).toBe(true);
  });

  it('is false once a side is pushed out', () => {
    expect(bowsAreStraight(bowOut(quad, 'top', 9))).toBe(false);
  });

  // A fraction off the line is not a bow anyone asked for and must not switch
  // the slower path on.
  it('tolerates a control point a fraction off the line', () => {
    expect(bowsAreStraight(bowOut(quad, 'top', 0.3))).toBe(true);
  });
});

/**
 * The outline on screen and the warp underneath it must be the same curve.
 *
 * The artist judges the correction by whether the drawn line follows the edge
 * of the painting. The line is a cubic Bézier through the control points; the
 * warp adds a distance along the side's normal. They are two descriptions of
 * one thing and there is nothing to make them agree except that they do.
 */
describe('what is drawn and what is warped', () => {
  const quad: Quad = [
    { x: 100, y: 80 },
    { x: 900, y: 90 },
    { x: 890, y: 700 },
    { x: 110, y: 690 },
  ];

  it('departs from the chord by exactly what the drawn curve does', () => {
    const bows: EdgeBows = { ...straightBows(), top: [26, -14] };
    const [c0, c1] = bowControls(quad, bows, 'top');
    const normal = edgeNormal(quad, 'top');

    for (const t of [0.1, 0.25, 0.5, 0.75, 0.9]) {
      const drawn = bezierAt(quad[0], c0, c1, quad[1], t);
      const onChord = {
        x: quad[0].x + (quad[1].x - quad[0].x) * t,
        y: quad[0].y + (quad[1].y - quad[0].y) * t,
      };
      const warped = bowAmount(bows, 'top', t);

      expect(drawn.x - onChord.x).toBeCloseTo(normal.x * warped, 6);
      expect(drawn.y - onChord.y).toBeCloseTo(normal.y * warped, 6);
    }
  });
});

/**
 * The claim the artist asked for, measured rather than asserted: a side's bow
 * moves pixels across that side and never along it.
 *
 * It is not "nearly none" and it is not corrected away afterwards. Each side
 * contributes a distance multiplied by its own normal, and a scalar times a
 * perpendicular vector has no component along the side to begin with — at every
 * point in the picture, for any bow, however large.
 */
describe('a bow never moves anything along the side it bends', () => {
  const quad: Quad = [
    { x: 100, y: 80 },
    { x: 900, y: 90 },
    { x: 890, y: 700 },
    { x: 110, y: 690 },
  ];
  const across = (shift: { x: number; y: number }, tangent: { x: number; y: number }) =>
    shift.x * tangent.x + shift.y * tangent.y;

  for (const edge of ['top', 'right', 'bottom', 'left'] as const) {
    it(`moves nothing along the ${edge} when the ${edge} is bent`, () => {
      // Far past anything a photograph of a painting would need, so that a
      // component along the side would be impossible to miss.
      const bows: EdgeBows = { ...straightBows(), [edge]: [140, -90] };
      const shift = bowShift(quad, bows);
      const tangent = edgeTangent(quad, edge);

      let worst = 0;
      for (let u = 0; u <= 1.0001; u += 0.05) {
        for (let v = 0; v <= 1.0001; v += 0.05) {
          worst = Math.max(worst, Math.abs(across(shift(u, v), tangent)));
        }
      }

      expect(worst).toBeCloseTo(0, 9);
    });
  }

  it('does move things across it, or it would not be doing anything', () => {
    const bows: EdgeBows = { ...straightBows(), top: [140, -90] };
    const shift = bowShift(quad, bows);
    const normal = edgeNormal(quad, 'top');

    // The middle of the top edge, where the two control points fight and the
    // first one wins: the side is pulled out, not left where it was.
    expect(across(shift(0.4, 0), normal)).toBeGreaterThan(10);
  });
});
