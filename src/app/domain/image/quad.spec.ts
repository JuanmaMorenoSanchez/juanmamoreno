import { correctedSize, fullFrame, isConvex, orderCorners, quadArea, type Quad } from './quad';

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
});
