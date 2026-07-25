import { SweepBeam } from './sweep-beam';

describe('SweepBeam', () => {
  // gap 0..0 → fires immediately; a 1s sweep.
  const makeImmediate = () => new SweepBeam(0, 0, 1);

  it('is dormant until its scheduled time, then sweeps', () => {
    const beam = new SweepBeam(5, 5, 1); // 5s gap
    expect(beam.sample(0)).toBeNull(); // schedules first sweep at t=5
    expect(beam.sample(4.9)).toBeNull();
    const s = beam.sample(5);
    expect(s).not.toBeNull();
    expect(s!.sweep).toBeCloseTo(0, 5);
  });

  it('runs sweep 0→1 and ends after the duration', () => {
    const beam = makeImmediate();
    expect(beam.sample(0)!.sweep).toBeCloseTo(0, 5);
    expect(beam.sample(0.5)!.sweep).toBeCloseTo(0.5, 5);
    expect(beam.sample(1)).toBeNull(); // finished
  });

  it('intensity fades in and out, full in the middle', () => {
    const beam = makeImmediate();
    expect(beam.sample(0)!.intensity).toBeCloseTo(0, 5);
    expect(beam.sample(0.5)!.intensity).toBeCloseTo(1, 5);
    expect(beam.sample(0.99)!.intensity).toBeLessThan(0.3);
  });

  it('increments id on each new sweep', () => {
    const beam = makeImmediate();
    const first = beam.sample(0)!.id;
    beam.sample(1); // ends the first sweep, reschedules at t=1
    const second = beam.sample(1)!.id;
    expect(second).toBe(first + 1);
  });
});
