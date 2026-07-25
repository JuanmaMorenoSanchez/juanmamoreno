import { BeatClock } from './beat-clock';

describe('BeatClock', () => {
  // 120 BPM → one beat every 0.5s, 4 beats per bar.
  const clock = new BeatClock(120, 4);

  it('counts a beat every beat period', () => {
    expect(clock.beatIndex(0)).toBe(0);
    expect(clock.beatIndex(0.49)).toBe(0);
    expect(clock.beatIndex(0.5)).toBe(1);
    expect(clock.beatIndex(2.0)).toBe(4);
  });

  it('reports phase within the beat', () => {
    expect(clock.phase(0)).toBeCloseTo(0, 5);
    expect(clock.phase(0.25)).toBeCloseTo(0.5, 5); // halfway through beat 0
    expect(clock.phase(0.5)).toBeCloseTo(0, 5); // next beat resets phase
  });

  it('envelope peaks at the beat and decays toward the next', () => {
    expect(clock.envelope(0)).toBeCloseTo(1, 5); // on the beat
    expect(clock.envelope(0.499)).toBeLessThan(0.01); // just before the next
    expect(clock.envelope(0.25)).toBeGreaterThan(0);
    expect(clock.envelope(0.25)).toBeLessThan(1);
  });

  it('tracks bar position and downbeats', () => {
    expect(clock.barBeat(0)).toBe(0);
    expect(clock.isDownbeat(0)).toBe(true);
    expect(clock.barBeat(0.5)).toBe(1); // beat 1
    expect(clock.isDownbeat(0.5)).toBe(false);
    expect(clock.barBeat(2.0)).toBe(0); // beat 4 → back to the downbeat
    expect(clock.isDownbeat(2.0)).toBe(true);
  });
});
