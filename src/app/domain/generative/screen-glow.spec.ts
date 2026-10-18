import { ScreenGlow } from './screen-glow';

/**
 * The brightness of a screen under a face.
 *
 * It holds a level, jumps when something else is opened, and drifts between.
 * Pure arithmetic of `t`, so the same second always gives the same light and
 * a sketch paused and resumed does not flash.
 */
describe('ScreenGlow', () => {
  const glow = new ScreenGlow();

  it('stays between the two levels it was given', () => {
    for (let t = 0; t < 120; t += 0.17) {
      expect(glow.at(t)).toBeGreaterThanOrEqual(0.45);
      expect(glow.at(t)).toBeLessThanOrEqual(1.15);
    }
  });

  it('answers the same for the same second, every time', () => {
    expect(glow.at(11)).toBe(glow.at(11));
    expect(new ScreenGlow().at(11)).toBe(glow.at(11));
  });

  it('does not sit still', () => {
    const seen = new Set<number>();
    for (let t = 0; t < 20; t += 0.5) seen.add(Math.round(glow.at(t) * 100));

    expect(seen.size).toBeGreaterThan(5);
  });

  it('changes level rather than snapping to it', () => {
    // A hard jump reads as a dropped frame. Across the moment a new level
    // begins, no two neighbouring instants differ by much.
    let worst = 0;
    for (let t = 0; t < 40; t += 1 / 60) {
      worst = Math.max(worst, Math.abs(glow.at(t + 1 / 60) - glow.at(t)));
    }

    expect(worst).toBeLessThan(0.08);
  });

  it('goes somewhere new rather than repeating a short loop', () => {
    // The two waves are at frequencies that do not divide each other, and the
    // held level is drawn per interval, so ten seconds apart is not the same.
    expect(Math.abs(glow.at(4) - glow.at(14))).toBeGreaterThan(0.01);
  });
});
