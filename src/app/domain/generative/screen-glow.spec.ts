import { changesAt, ScreenGlow } from './screen-glow';

/**
 * The brightness and the colour of a screen under a face.
 *
 * It holds a level, jumps when something else is opened, and drifts between.
 * Pure arithmetic of `t`, so the same second always gives the same light and
 * a sketch paused and resumed does not flash.
 */
describe('ScreenGlow', () => {
  const glow = new ScreenGlow();
  const COLD_WHITE = { red: 0xc4, green: 0xd4, blue: 0xec };
  const brightness = (c: { red: number; green: number; blue: number }) =>
    0.2126 * c.red + 0.7152 * c.green + 0.0722 * c.blue;

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

  it('does not change on a metronome', () => {
    // A screen that stepped every two seconds exactly would be a clock.
    const when: number[] = [];
    for (let index = 0; index < 400; index++) when.push(changesAt(index, 2));
    const gaps = when.slice(1).map((at, n) => at - when[n]);

    // In order, so an interval never runs backwards or swallows its
    // neighbour, and no two in a row the same length.
    expect(Math.min(...gaps)).toBeGreaterThan(0);
    expect(Math.min(...gaps)).toBeLessThan(1.6);
    expect(Math.max(...gaps)).toBeGreaterThan(2.4);
    expect(gaps.every((gap, n) => n === 0 || Math.abs(gap - gaps[n - 1]) > 1e-9)).toBe(true);
  });

  it('takes a cast when it changes level, and mostly does not', () => {
    // A screen is not one colour, but it is mostly its own: the cold white
    // has to come up far more often than any of the five casts, or the face
    // is being lit by a disco.
    const seen = new Map<string, number>();
    for (let t = 0; t < 1200; t += 2) {
      const { red, green, blue } = glow.tint(t + 1.2); // settled, not arriving
      const key = `${Math.round(red)},${Math.round(green)},${Math.round(blue)}`;
      seen.set(key, (seen.get(key) ?? 0) + 1);
    }
    const counts = [...seen.values()].sort((a, b) => b - a);

    expect(seen.size).toBeGreaterThan(3);
    expect(counts[0]).toBeGreaterThan(counts[1] * 2);
  });

  it('is never dimmer when it is coloured', () => {
    // The whole complaint about the first colours: a redder white is a
    // darker one unless it is levelled, and the eye reads darker before it
    // reads redder. Every cast carries exactly as much light as the white.
    for (let t = 0; t < 400; t += 0.37) {
      expect(brightness(glow.tint(t))).toBeCloseTo(brightness(COLD_WHITE), 6);
    }
  });

  it('keeps every cast inside what a canvas can draw, and near the white', () => {
    for (let t = 0; t < 400; t += 0.37) {
      const tint = glow.tint(t);
      for (const value of [tint.red, tint.green, tint.blue]) {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(255);
      }
      const away = Math.hypot(
        tint.red - COLD_WHITE.red,
        tint.green - COLD_WHITE.green,
        tint.blue - COLD_WHITE.blue
      );
      // The furthest is the yellow, 64 from the white and almost all of it
      // in blue: the difference between a warm screen and a cold one, which
      // is the whole of what is wanted.
      expect(away).toBeLessThan(70);
    }
  });

  it('changes colour the way it changes level: arriving, not snapping', () => {
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
