import { FrameTimeline } from './frame-timeline';

describe('FrameTimeline', () => {
  const timeline = new FrameTimeline([
    { index: 0, ms: 1000 },
    { index: 1, ms: 500 },
    { index: 2, ms: 500 },
  ]);

  it('returns the frame active at a given time', () => {
    expect(timeline.indexAt(0)).toBe(0);
    expect(timeline.indexAt(0.999)).toBe(0);
    expect(timeline.indexAt(1.0)).toBe(1); // first step ended at 1000ms
    expect(timeline.indexAt(1.4)).toBe(1);
    expect(timeline.indexAt(1.5)).toBe(2);
  });

  it('loops after the total duration', () => {
    // Total is 2000ms, so t=2.0s wraps back to the start.
    expect(timeline.indexAt(2.0)).toBe(0);
    expect(timeline.indexAt(3.0)).toBe(1);
  });

  it('handles negative times by wrapping', () => {
    expect(timeline.indexAt(-0.5)).toBe(2); // -500ms → 1500ms into the loop
  });

  it('is safe on an empty timeline', () => {
    expect(new FrameTimeline([]).indexAt(1.23)).toBe(0);
  });

  it('reports the total loop duration', () => {
    expect(timeline.durationMs).toBe(2000);
  });
});

describe('FrameTimeline.at', () => {
  /** A launch: a long wait, two fast frames, then a held one. */
  const launch = new FrameTimeline([
    { index: 0, ms: 1000 },
    { index: 1, ms: 100 },
    { index: 2, ms: 200 },
    { index: 3, ms: 700 },
  ]);

  it('says which frame, and how far into it', () => {
    expect(launch.at(0)).toEqual({ index: 0, previous: 3, through: 0 });
    expect(launch.at(0.5).index).toBe(0);
    expect(launch.at(0.5).through).toBeCloseTo(0.5, 5);
  });

  /**
   * The frame before is what a cross-fade fades out of, so it has to be the
   * one that was actually on screen — including at the loop's seam, where the
   * frame before the first is the last.
   */
  it('names the frame being left, and wraps at the seam', () => {
    expect(launch.at(0).previous).toBe(3);
    expect(launch.at(1.05).previous).toBe(0);
    expect(launch.at(1.2).previous).toBe(1);
  });

  it('loops, so a second time round reads the same as the first', () => {
    const total = launch.durationMs / 1000;

    expect(launch.at(0.4)).toEqual(launch.at(total + 0.4));
    expect(launch.at(1.15)).toEqual(launch.at(total * 3 + 1.15));
  });

  /** Time before the start is a real reading, not a crash. */
  it('reads backwards as well as forwards', () => {
    const total = launch.durationMs / 1000;

    expect(launch.at(-0.1).index).toBe(launch.at(total - 0.1).index);
  });

  it('answers for a timeline with nothing in it', () => {
    expect(new FrameTimeline([]).at(2)).toEqual({ index: 0, previous: 0, through: 1 });
  });

  /** A step of no length cannot be part-way through; it is simply arrived at. */
  it('calls a frame of no duration arrived', () => {
    const instant = new FrameTimeline([{ index: 7, ms: 0 }]);

    expect(instant.at(1)).toEqual({ index: 7, previous: 7, through: 1 });
  });

  it('agrees with indexAt, which it does not replace', () => {
    for (const t of [0, 0.5, 1.05, 1.2, 1.9]) {
      expect(launch.at(t).index).toBe(launch.indexAt(t));
    }
  });
});
