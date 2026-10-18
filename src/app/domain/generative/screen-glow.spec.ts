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

  it('takes a cast when it changes level, and mostly does not', () => {
    // A screen is not one colour, but it is mostly its own: the cold white
    // has to come up far more often than any of the five casts, or the face
    // is being lit by a disco.
    const seen = new Map<string, number>();
    for (let t = 0; t < 600; t += 2) {
      const { red, green, blue } = glow.tint(t + 1.5); // settled, not easing
      seen.set(
        `${Math.round(red)},${Math.round(green)},${Math.round(blue)}`,
        (seen.get(`${Math.round(red)},${Math.round(green)},${Math.round(blue)}`) ?? 0) + 1
      );
    }
    const counts = [...seen.values()].sort((a, b) => b - a);

    expect(seen.size).toBeGreaterThan(3);
    expect(counts[0]).toBeGreaterThan(counts[1] * 2);
  });

  it('keeps every cast in the same gamut as the light itself', () => {
    // A third of the way towards a hue, never the hue: a screen that went
    // properly red would be a different lamp.
    for (let t = 0; t < 300; t += 0.37) {
      const { red, green, blue } = glow.tint(t);
      const away = Math.hypot(red - 0xcf, green - 0xe4, blue - 0xff);
      expect(away).toBeLessThan(60);
    }
  });

  it('changes colour when it changes level, and eases across it', () => {
    let worst = 0;
    for (let t = 0; t < 60; t += 1 / 60) {
      const now = glow.tint(t);
      const next = glow.tint(t + 1 / 60);
      worst = Math.max(worst, Math.hypot(next.red - now.red, next.green - now.green));
    }

    expect(worst).toBeLessThan(6);
  });

  it('goes somewhere new rather than repeating a short loop', () => {
    // The two waves are at frequencies that do not divide each other, and the
    // held level is drawn per interval, so ten seconds apart is not the same.
    expect(Math.abs(glow.at(4) - glow.at(14))).toBeGreaterThan(0.01);
  });
});
