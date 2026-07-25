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
