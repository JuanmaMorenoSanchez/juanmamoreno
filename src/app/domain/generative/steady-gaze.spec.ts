import { SteadyGaze } from './steady-gaze';

/**
 * Where a scene is looking, at one speed whatever it is following.
 *
 * Easing is fastest when the gap is biggest, so a pointer thrown across the
 * window throws the scene with it. This cannot be thrown.
 */
describe('SteadyGaze', () => {
  it('moves at the rate it was given, however far away the target is', () => {
    const near = new SteadyGaze(0.6);
    const far = new SteadyGaze(0.6);

    const nearStep = near.toward(0.05, 0, 1 / 60).x;
    const farStep = far.toward(1, 0, 1 / 60).x;

    expect(farStep).toBeCloseTo(0.6 / 60, 6);
    // The near one arrives instead of overshooting.
    expect(nearStep).toBeLessThanOrEqual(0.05);
  });

  it('cannot be thrown by a pointer crossing the window', () => {
    // The worst a flick can do is one frame's worth, every frame.
    const gaze = new SteadyGaze(0.6);
    let worst = 0;
    let was = { x: 0, y: 0 };
    for (let frame = 0; frame < 120; frame++) {
      const target = frame % 2 === 0 ? 1 : -1;
      const now = gaze.toward(target, target, 1 / 60);
      worst = Math.max(worst, Math.hypot(now.x - was.x, now.y - was.y));
      was = now;
    }

    expect(worst).toBeLessThanOrEqual((0.6 / 60) * Math.SQRT2 + 1e-9);
  });

  it('arrives, and stays', () => {
    const gaze = new SteadyGaze(0.6);
    for (let frame = 0; frame < 300; frame++) gaze.toward(0.5, -0.25, 1 / 60);

    const { x, y } = gaze.toward(0.5, -0.25, 1 / 60);
    expect(x).toBeCloseTo(0.5, 6);
    expect(y).toBeCloseTo(-0.25, 6);
  });

  it('keeps up with something that keeps moving', () => {
    // The drift it follows crosses the range in about eight seconds; a gaze
    // slower than that would trail it for ever instead of following it.
    const gaze = new SteadyGaze(0.6);
    let worst = 0;
    for (let t = 0; t < 40; t += 1 / 60) {
      const target = Math.cos((t / 16) * Math.PI * 2);
      const now = gaze.toward(target, 0, 1 / 60);
      if (t > 20) worst = Math.max(worst, Math.abs(now.x - target));
    }

    expect(worst).toBeLessThan(0.1);
  });

  it('does not move backwards when a frame takes no time at all', () => {
    const gaze = new SteadyGaze(0.6);
    gaze.toward(1, 0, 1);
    const held = gaze.toward(1, 0, -5);

    expect(held.x).toBeGreaterThan(0);
  });
});
