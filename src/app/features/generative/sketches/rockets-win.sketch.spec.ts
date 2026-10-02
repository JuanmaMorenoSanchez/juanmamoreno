import { arriving, FADE, phoneBox } from './rockets-win.sketch';

/**
 * Which frames cut and which dissolve is the difference between a launch and a
 * slideshow, and it is two numbers in an array — so it is read here rather than
 * taken on trust from a canvas nobody can assert against.
 */
describe('Rockets win — what cuts and what dissolves', () => {
  /**
   * A rocket lighting is a cut. Softening it is the single thing that would
   * make the whole sequence look like a slideshow.
   */
  it('cuts to the first bloom', () => {
    expect(FADE[1]).toBe(0);
    expect(arriving(1, 0)).toBe(1);
  });

  /**
   * And the loop does not fade back to the start. Fading in over four tenths of
   * an eighteen-hundred-millisecond step left the rocket climbing underneath
   * the empty launcher for another seven hundred — which does not read as a
   * fade, it reads as the last frame refusing to leave.
   */
  it('cuts back to the start, so the last frame does not linger', () => {
    expect(FADE[0]).toBe(0);
    expect(arriving(0, 0)).toBe(1);
    expect(arriving(0, 0.001)).toBe(1);
  });

  /** The two in the middle overlap, which reads as moving rather than replaced. */
  it('dissolves the two in the middle', () => {
    expect(FADE[2]).toBeGreaterThan(0);
    expect(FADE[3]).toBeGreaterThan(0);

    expect(arriving(2, 0)).toBe(0);
    expect(arriving(2, FADE[2] / 2)).toBeCloseTo(0.5, 5);
    expect(arriving(2, FADE[2])).toBe(1);
    // And stays arrived for the rest of the step.
    expect(arriving(2, 1)).toBe(1);
  });

  it('treats a frame nobody gave a fade as a cut', () => {
    expect(arriving(99, 0)).toBe(1);
  });
});

describe('Rockets win — the shape it is made for', () => {
  /** A phone, which is what this piece is for. */
  it('fits the tallest phone-shaped rectangle it can, centred', () => {
    const wide = phoneBox(2000, 900);

    expect(wide.height).toBe(900);
    expect(wide.width).toBeCloseTo(900 * (9 / 16), 5);
    expect(wide.x).toBeCloseTo((2000 - wide.width) / 2, 5);
    expect(wide.y).toBe(0);
  });

  /** On something already narrower than a phone, the width is what runs out. */
  it('is bounded by the width when the window is narrow', () => {
    const narrow = phoneBox(300, 2000);

    expect(narrow.width).toBe(300);
    expect(narrow.height).toBeCloseTo(300 / (9 / 16), 5);
    expect(narrow.x).toBe(0);
  });

  it('keeps the phone ratio whatever it is given', () => {
    for (const [w, h] of [
      [1920, 1080],
      [390, 844],
      [1000, 1000],
      [700, 900],
    ]) {
      const box = phoneBox(w, h);
      expect(box.width / box.height).toBeCloseTo(9 / 16, 5);
    }
  });
});
