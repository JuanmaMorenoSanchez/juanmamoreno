import { IdleDrift } from './idle-drift';

/**
 * Where the parallax looks when nobody is pointing at it.
 *
 * On a phone there is no pointer at all, and on a desk it leaves the window;
 * a painting that only moves when touched is a still painting most of the
 * time.
 */
describe('IdleDrift', () => {
  const drift = new IdleDrift();

  it('stays inside the range a pointer would give', () => {
    for (let t = 0; t < 200; t += 0.31) {
      const { x, y } = drift.at(t);
      expect(Math.abs(x)).toBeLessThanOrEqual(1);
      expect(Math.abs(y)).toBeLessThanOrEqual(1);
    }
  });

  it('drifts up and down less than it drifts sideways', () => {
    // Equal amounts reads as a boat.
    let across = 0;
    let down = 0;
    for (let t = 0; t < 60; t += 0.25) {
      across = Math.max(across, Math.abs(drift.at(t).x));
      down = Math.max(down, Math.abs(drift.at(t).y));
    }

    expect(down).toBeLessThan(across);
  });

  it('does not come back to where it started inside a viewing', () => {
    // Two periods that do not divide each other: the path never repeats in
    // the time anybody watches it.
    const start = drift.at(0);
    let closest = 9;
    for (let t = 20; t < 120; t += 0.5) {
      const now = drift.at(t);
      closest = Math.min(closest, Math.abs(now.x - start.x) + Math.abs(now.y - start.y));
    }

    expect(closest).toBeGreaterThan(0.001);
  });

  it('never stops to turn around', () => {
    // A pair of sines slows to nothing at each end and reverses, which reads
    // as a thing being nudged rather than as a thing drifting. Going round at
    // a steady rate, the slowest moment is still most of the fastest.
    let slowest = 9;
    let fastest = 0;
    for (let t = 0; t < 120; t += 1 / 30) {
      const now = drift.at(t);
      const next = drift.at(t + 1 / 30);
      const speed = Math.hypot(next.x - now.x, next.y - now.y);
      slowest = Math.min(slowest, speed);
      fastest = Math.max(fastest, speed);
    }

    // A pair of sines comes to a dead stop: measured the same way, its
    // slowest moment is a thousandth of its fastest.
    expect(slowest).toBeGreaterThan(fastest * 0.25);
  });

  it('moves slowly enough to read as breathing', () => {
    const step = Math.abs(drift.at(1 / 60).x - drift.at(0).x);

    expect(step).toBeLessThan(0.01);
  });
});
