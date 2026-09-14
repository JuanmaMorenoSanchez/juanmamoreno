import {
  correctedSize,
  EDGE_CORNERS,
  fullFrame,
  isConvex,
  orderCorners,
  quadArea,
  straightBows,
  turnClockwise,
  type EdgeBows,
  type EdgeName,
  type Quad,
} from './quad';

describe('orderCorners', () => {
  it('starts at the top left and turns clockwise, whatever order it is given', () => {
    const corners = [
      { x: 10, y: 90 },
      { x: 80, y: 10 },
      { x: 10, y: 10 },
      { x: 80, y: 90 },
    ];

    expect(orderCorners(corners)).toEqual([
      { x: 10, y: 10 },
      { x: 80, y: 10 },
      { x: 80, y: 90 },
      { x: 10, y: 90 },
    ]);
  });

  it('orders a tilted quad by where its corners lie, not by how it was listed', () => {
    const tilted = [
      { x: 50, y: 0 },
      { x: 0, y: 50 },
      { x: 100, y: 50 },
      { x: 50, y: 100 },
    ];

    const [first, , third] = orderCorners(tilted);
    expect(first.y).toBeLessThan(third.y);
  });
});

describe('isConvex', () => {
  it('accepts a rectangle', () => {
    expect(isConvex(fullFrame({ width: 100, height: 80 }))).toBe(true);
  });

  it('rejects a bow tie, which no photograph of a rectangle can produce', () => {
    const crossed: Quad = [
      { x: 0, y: 0 },
      { x: 100, y: 100 },
      { x: 100, y: 0 },
      { x: 0, y: 100 },
    ];
    expect(isConvex(crossed)).toBe(false);
  });
});

describe('quadArea', () => {
  it('measures a rectangle', () => {
    expect(quadArea(fullFrame({ width: 40, height: 25 }))).toBe(1000);
  });
});

describe('correctedSize', () => {
  const photographed = (width: number, height: number): Quad => [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
  ];

  it('gives the result the proportions of the painting, not of the photograph', () => {
    const size = correctedSize(photographed(400, 300), 100, 50);
    expect(size.width / size.height).toBeCloseTo(2, 5);
  });

  it('fills the widest axis when the painting is wider than it was photographed', () => {
    // 400 across is all the detail there is, so the result stops there rather
    // than stretching to the 600 the ratio would otherwise allow.
    expect(correctedSize(photographed(400, 300), 100, 50)).toEqual({ width: 400, height: 200 });
  });

  it('fills the tallest axis when the painting is taller than it was photographed', () => {
    expect(correctedSize(photographed(400, 300), 50, 100)).toEqual({ width: 150, height: 300 });
  });

  it('never enlarges either axis beyond what was photographed', () => {
    const quad = photographed(400, 300);
    for (const [w, h] of [
      [100, 50],
      [50, 100],
      [1, 1],
      [16, 9],
      [3, 7],
    ]) {
      const size = correctedSize(quad, w, h);
      expect(size.width).toBeLessThanOrEqual(400);
      expect(size.height).toBeLessThanOrEqual(300);
    }
  });

  it('measures the longest of each pair of opposite edges, so perspective loses nothing', () => {
    // The near edge of a tilted painting is the longer one and holds more
    // detail; taking the average of the two would throw that away.
    const tilted: Quad = [
      { x: 0, y: 20 },
      { x: 400, y: 0 },
      { x: 400, y: 300 },
      { x: 0, y: 260 },
    ];
    expect(correctedSize(tilted, 1, 1).width).toBe(300);
  });

  it('keeps a square square', () => {
    const size = correctedSize(photographed(200, 200), 30, 30);
    expect(size).toEqual({ width: 200, height: 200 });
  });

  describe('when the photograph is not of the whole painting', () => {
    // A canvas photographed at a slight angle, squarish on the sensor.
    const shot: Quad = [
      { x: 10, y: 10 },
      { x: 210, y: 20 },
      { x: 208, y: 170 },
      { x: 12, y: 160 },
    ];

    it('takes the proportions of the painting when asked to', () => {
      const size = correctedSize(shot, 100, 50);

      expect(size.width / size.height).toBeCloseTo(2, 1);
    });

    it('keeps the shape the corners describe when not', () => {
      // A detail, or a painting caught half-finished: the measurements are of
      // the work and the photograph is of part of it, so squaring one to the
      // other would stretch what is there.
      const size = correctedSize(shot, 100, 50, false);

      expect(size.width / size.height).toBeCloseTo(200 / 152, 1);
      // Nothing like the 2:1 the measurements would have forced.
      expect(size.width / size.height).toBeLessThan(1.6);
    });

    it('squares up by default, since most photographs are of a whole canvas', () => {
      expect(correctedSize(shot, 100, 50)).toEqual(correctedSize(shot, 100, 50, true));
    });

    it('still straightens when it is not reshaping', () => {
      // The corners are the crop either way; only the proportions differ.
      const size = correctedSize(shot, 100, 50, false);

      expect(size.width).toBeGreaterThan(150);
      expect(size.height).toBeGreaterThan(100);
    });
  });
});

/**
 * A quarter turn is the answer to a photograph that arrived on its side, and it
 * has to move the corners with the pixels: the corner that was at the bottom
 * left of the frame is at the top left afterwards, and is the corner the
 * straightening will square to the top left of the certificate.
 */
/**
 * Bows compared to the nearest thousandth of a pixel.
 *
 * A turn is a subtraction and a straight chord is two divisions, so the same
 * point reached both ways differs in the last bit — 3.333333333333333 against
 * 3.3333333333333335. That is not a difference in where a control point sits.
 */
function expectBowsClose(actual: EdgeBows, expected: EdgeBows): void {
  for (const edge of Object.keys(EDGE_CORNERS) as EdgeName[]) {
    for (const index of [0, 1] as const) {
      expect(actual[edge][index].x).toBeCloseTo(expected[edge][index].x, 3);
      expect(actual[edge][index].y).toBeCloseTo(expected[edge][index].y, 3);
    }
  }
}

describe('turnClockwise', () => {
  it('turns the whole frame into the whole frame, standing the other way', () => {
    const before = fullFrame({ width: 40, height: 10 });

    const after = turnClockwise(before, straightBows(before), { width: 40, height: 10 });

    // Still the frame, still clockwise from the top left — which it can only be
    // if the four corners were renamed as well as moved.
    expect(after.quad).toEqual(fullFrame({ width: 10, height: 40 }));
    expectBowsClose(after.bows, straightBows(after.quad));
  });

  it('keeps each corner on the same part of the painting', () => {
    const quad: Quad = [
      { x: 100, y: 80 },
      { x: 900, y: 90 },
      { x: 890, y: 700 },
      { x: 110, y: 690 },
    ];
    const size = { width: 1000, height: 800 };

    const after = turnClockwise(quad, straightBows(quad), size);

    // The old bottom left is the new top left, at the place a clockwise turn
    // puts it: x becomes the height less y, and y becomes x.
    expect(after.quad[0]).toEqual({ x: size.height - quad[3].y, y: quad[3].x });
    expect(after.quad[1]).toEqual({ x: size.height - quad[0].y, y: quad[0].x });
  });

  it('carries a bent side round with the side it bends', () => {
    const quad = fullFrame({ width: 40, height: 10 });
    const bows = straightBows(quad);
    // The left side pulled out of true. After the turn it is the top side, and
    // it must still be the only one that is bent.
    bows.left = [
      { x: -6, y: bows.left[0].y },
      { x: -6, y: bows.left[1].y },
    ];

    const after = turnClockwise(quad, bows, { width: 40, height: 10 });
    const straight = straightBows(after.quad);

    // The bend is on the top now, and nowhere else.
    expect(after.bows.top[0].y).toBeLessThan(straight.top[0].y - 1);
    expectBowsClose({ ...after.bows, top: straight.top }, straight);
  });

  it('comes back to where it started after four turns', () => {
    const quad: Quad = [
      { x: 100, y: 80 },
      { x: 900, y: 90 },
      { x: 890, y: 700 },
      { x: 110, y: 690 },
    ];
    const bows = straightBows(quad);

    let turned = { quad, bows };
    let size = { width: 1000, height: 800 };
    for (let i = 0; i < 4; i += 1) {
      turned = turnClockwise(turned.quad, turned.bows, size);
      size = { width: size.height, height: size.width };
    }

    expect(turned.quad).toEqual(quad);
    expectBowsClose(turned.bows, bows);
  });
});
