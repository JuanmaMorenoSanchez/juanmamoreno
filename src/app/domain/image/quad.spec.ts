import {
  bowAmount,
  bowControls,
  bowOffset,
  edgeNormal,
  correctedSize,
  fullFrame,
  isConvex,
  orderCorners,
  quadArea,
  squaringMismatch,
  straightBows,
  turnClockwise,
  type EdgeBows,
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
describe('turnClockwise', () => {
  it('turns the whole frame into the whole frame, standing the other way', () => {
    const before = fullFrame({ width: 40, height: 10 });

    const after = turnClockwise(before, straightBows(), { width: 40, height: 10 });

    // Still the frame, still clockwise from the top left — which it can only be
    // if the four corners were renamed as well as moved.
    expect(after.quad).toEqual(fullFrame({ width: 10, height: 40 }));
    expect(after.bows).toEqual(straightBows());
  });

  it('keeps each corner on the same part of the painting', () => {
    const quad: Quad = [
      { x: 100, y: 80 },
      { x: 900, y: 90 },
      { x: 890, y: 700 },
      { x: 110, y: 690 },
    ];
    const size = { width: 1000, height: 800 };

    const after = turnClockwise(quad, straightBows(), size);

    // The old bottom left is the new top left, at the place a clockwise turn
    // puts it: x becomes the height less y, and y becomes x.
    expect(after.quad[0]).toEqual({ x: size.height - quad[3].y, y: quad[3].x });
    expect(after.quad[1]).toEqual({ x: size.height - quad[0].y, y: quad[0].x });
  });

  it('carries a bent side round with the side it bends', () => {
    const quad = fullFrame({ width: 40, height: 10 });
    const bows = straightBows();
    // The left side pulled out of true. After the turn it is the top side, and
    // it must still be the only one that is bent, by as much as it was.
    bows.left = [-6, -6];

    const after = turnClockwise(quad, bows, { width: 40, height: 10 });

    expect(after.bows.top.map(Math.abs)).toEqual([6, 6]);
    expect(after.bows.right).toEqual([0, 0]);
    expect(after.bows.bottom).toEqual([0, 0]);
    expect(after.bows.left).toEqual([0, 0]);
  });

  it('comes back to where it started after four turns', () => {
    const quad: Quad = [
      { x: 100, y: 80 },
      { x: 900, y: 90 },
      { x: 890, y: 700 },
      { x: 110, y: 690 },
    ];
    const bows: EdgeBows = { top: [3, -5], right: [0, 7], bottom: [-2, 2], left: [9, 1] };

    let turned = { quad, bows };
    let size = { width: 1000, height: 800 };
    for (let i = 0; i < 4; i += 1) {
      turned = turnClockwise(turned.quad, turned.bows, size);
      size = { width: size.height, height: size.width };
    }

    expect(turned.quad).toEqual(quad);
    expect(turned.bows).toEqual(bows);
  });
});

/**
 * A bow is a distance and nothing else.
 *
 * Every corner used to carry two control points that could be dragged anywhere.
 * Moving one square to its side bends the side, which is what they are for.
 * Moving one *along* the side bends nothing: it changes how fast the side is
 * travelled, so the warp reads faster through one stretch of the painting and
 * slower through the next — one part comes out bigger and its neighbour
 * smaller, with the outline still running neatly through the corners and still
 * looking like the edge of the canvas.
 */
describe('a bow can only leave the chord sideways', () => {
  const quad: Quad = [
    { x: 100, y: 80 },
    { x: 900, y: 90 },
    { x: 890, y: 700 },
    { x: 110, y: 690 },
  ];

  it('keeps only the part of a drag that is square to the side', () => {
    const [first] = bowControls(quad, straightBows(), 'top');

    // Dragged a long way along the side and not at all across it.
    const alongTheSide = { x: first.x + 200, y: first.y + 200 * (10 / 800) };

    expect(bowOffset(quad, 'top', alongTheSide)).toBeCloseTo(0, 6);
  });

  it('reads a drag across the side as the distance it is across it', () => {
    const [first] = bowControls(quad, straightBows(), 'left');
    // Square to the side as the side actually lies, which on a photographed
    // canvas is never quite vertical.
    const across = edgeNormal(quad, 'left');
    const pulled = { x: first.x + across.x * 30, y: first.y + across.y * 30 };

    expect(bowOffset(quad, 'left', pulled)).toBeCloseTo(30, 6);
  });

  it('puts a control point back where it was read from', () => {
    const bows: EdgeBows = { ...straightBows(), right: [12, -7] };
    const controls = bowControls(quad, bows, 'right');

    expect(bowOffset(quad, 'right', controls[0])).toBeCloseTo(12, 6);
    expect(bowOffset(quad, 'right', controls[1])).toBeCloseTo(-7, 6);
  });

  it('departs from the chord nowhere at the corners, and most in the middle', () => {
    const bows: EdgeBows = { ...straightBows(), top: [10, 10] };

    expect(bowAmount(bows, 'top', 0)).toBe(0);
    expect(bowAmount(bows, 'top', 1)).toBe(0);
    expect(bowAmount(bows, 'top', 0.5)).toBeGreaterThan(0);
    // Both control points pulled out by ten lifts the middle of the side by
    // three quarters of that, which is the cubic and not a choice.
    expect(bowAmount(bows, 'top', 0.5)).toBeCloseTo(7.5, 6);
  });

  it('moves the control points with the corner they hang from, on its own', () => {
    // They used to be absolute points that had to be dragged along by hand
    // whenever a corner moved, and a corner moved changes the chord under them.
    const bows: EdgeBows = { ...straightBows(), top: [14, 14] };
    const moved: Quad = [{ x: 300, y: 200 }, quad[1], quad[2], quad[3]];

    expect(bowOffset(moved, 'top', bowControls(moved, bows, 'top')[0])).toBeCloseTo(14, 6);
  });
});

/**
 * The fault this exists for, measured from the photograph it came from.
 *
 * A canvas 23 cm on its short side and 30,7 on its long one, photographed
 * square-on: opposite edges in the file differ by under one and a quarter per
 * cent, so what the camera saw is what the painting is. Typed in as 27,33 × 23
 * and squared up to that, the correction pulled the long axis in by an eighth
 * and the painting came out visibly wide, with nothing said about it.
 */
describe('squaringMismatch', () => {
  // The canvas face as measured in DSC_0102.NEF: 4111 × 3080 px, and standing
  // on its side in the frame, so the short side runs across the picture.
  const photographed: Quad = [
    { x: 0, y: 0 },
    { x: 3080, y: 0 },
    { x: 3080, y: 4111 },
    { x: 0, y: 4111 },
  ];

  it('says nothing when the corners and the measurements agree', () => {
    expect(squaringMismatch(photographed, 23, 30.7)).toBeNull();
  });

  it('sits out the small disagreement an angled photograph makes', () => {
    // Three per cent out, which is a painting leaning back a little rather
    // than a measurement that is wrong.
    expect(squaringMismatch(photographed, 23, 29.8)).toBeNull();
  });

  it('catches the measurements that came out an eighth too wide', () => {
    const off = squaringMismatch(photographed, 23, 27.33);

    expect(off).not.toBeNull();
    expect(off?.stretch).toBeCloseTo(0.123, 2);
  });

  it('offers both ways of putting it right', () => {
    const off = squaringMismatch(photographed, 23, 27.33);

    // Keep the width that was typed and the height has to give, or keep the
    // height and the width does. The artist knows which of the two they
    // measured properly.
    expect(off?.heightIfWidthIsRight).toBeCloseTo(30.7, 1);
    expect(off?.widthIfHeightIsRight).toBeCloseTo(20.5, 1);
  });

  it('is not fooled by the painting standing the other way up', () => {
    // The same canvas the right way up. A mismatch is about shapes, not about
    // which of the two numbers is the larger.
    const upright: Quad = [
      { x: 0, y: 0 },
      { x: 4111, y: 0 },
      { x: 4111, y: 3080 },
      { x: 0, y: 3080 },
    ];

    expect(squaringMismatch(upright, 30.7, 23)).toBeNull();
    // The same painting, the same wrong measurements, the same stretch.
    expect(squaringMismatch(upright, 27.33, 23)?.stretch).toBeCloseTo(0.123, 2);
  });

  it('says nothing when there is nothing to compare', () => {
    expect(squaringMismatch(photographed, 0, 23)).toBeNull();
    expect(squaringMismatch(photographed, 23, 0)).toBeNull();
  });
});
