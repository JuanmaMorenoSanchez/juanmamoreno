import { boxOf, bringToFront, change, placeOn, topAt, withinReach } from './composition';

const CANVAS = { width: 1600, height: 1200 };

describe('composition', () => {
  describe('placeOn', () => {
    it('fits a piece into a little over half the canvas', () => {
      const placed = placeOn(CANVAS, { width: 4000, height: 4000 }, 0);
      // 1200 * 0.55 is the binding side on a landscape canvas.
      expect(placed.scale).toBeCloseTo((1200 * 0.55) / 4000, 5);
    });

    // A cut blown up past its own pixels is a soft cut, which is the one thing
    // the night's whole expense buys against.
    it('never draws a piece larger than its own pixels', () => {
      expect(placeOn(CANVAS, { width: 120, height: 90 }, 0).scale).toBe(1);
    });

    it('sets each new piece down a step from the last', () => {
      const first = placeOn(CANVAS, { width: 400, height: 400 }, 0);
      const second = placeOn(CANVAS, { width: 400, height: 400 }, 1);
      expect(second.x).toBeGreaterThan(first.x);
      expect(second.y).toBeGreaterThan(first.y);
    });
  });

  describe('topAt', () => {
    const sizes: Record<string, { width: number; height: number }> = {
      tree: { width: 200, height: 200 },
      girl: { width: 200, height: 200 },
    };
    const sizeOf = (id: string) => sizes[id];
    const order = [
      { id: 'tree', x: 100, y: 100, scale: 1 },
      { id: 'girl', x: 150, y: 100, scale: 1 },
    ];

    // Depth is the order of the list, so where two pieces overlap the answer is
    // the later one: the one a person can see is the one they are pointing at.
    it('picks the piece on top where two overlap', () => {
      expect(topAt({ x: 120, y: 100 }, order, sizeOf)).toBe('girl');
    });

    it('picks the one underneath where only it is', () => {
      expect(topAt({ x: 20, y: 100 }, order, sizeOf)).toBe('tree');
    });

    it('answers nothing for the bare canvas', () => {
      expect(topAt({ x: 900, y: 900 }, order, sizeOf)).toBeNull();
    });

    // A piece whose bytes have not arrived has no size and so no box. It must
    // not swallow the press: the alternative is a canvas that ignores clicks
    // while an image is still decoding.
    it('skips a piece whose size is not known yet', () => {
      expect(topAt({ x: 150, y: 100 }, order, () => undefined)).toBeNull();
    });
  });

  it('brings a piece to the end of the order, which is the front', () => {
    const order = [
      { id: 'a', x: 0, y: 0, scale: 1 },
      { id: 'b', x: 0, y: 0, scale: 1 },
      { id: 'c', x: 0, y: 0, scale: 1 },
    ];
    expect(bringToFront(order, 'a').map((placed) => placed.id)).toEqual(['b', 'c', 'a']);
    expect(bringToFront(order, 'nobody').map((placed) => placed.id)).toEqual(['a', 'b', 'c']);
  });

  it('changes one piece and leaves the rest alone', () => {
    const order = [
      { id: 'a', x: 0, y: 0, scale: 1 },
      { id: 'b', x: 0, y: 0, scale: 1 },
    ];
    const after = change(order, 'b', { scale: 2 });
    expect(after[0].scale).toBe(1);
    expect(after[1].scale).toBe(2);
  });

  it('measures a piece about its centre', () => {
    const box = boxOf({ id: 'a', x: 100, y: 100, scale: 0.5 }, { width: 200, height: 100 });
    expect(box).toEqual({ left: 50, top: 75, width: 100, height: 50 });
  });

  // Over the edge is allowed — a figure half off the canvas is a composition,
  // not a mistake. Off the canvas entirely is not, because it cannot be
  // dragged back from there.
  it('lets a piece hang over the edge but not leave', () => {
    expect(withinReach(CANVAS, { id: 'a', x: 10, y: 600, scale: 1 }).x).toBeCloseTo(96, 5);
    expect(withinReach(CANVAS, { id: 'a', x: 800, y: 600, scale: 1 }).x).toBe(800);
    expect(withinReach(CANVAS, { id: 'a', x: 9999, y: 600, scale: 1 }).x).toBeCloseTo(1504, 5);
  });
});
