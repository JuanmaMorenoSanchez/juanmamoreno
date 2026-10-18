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

  it('is mostly not cast at all', () => {
    // A screen is not one colour, but it is mostly its own. More than half
    // the intervals carry no cast, or the face is being lit by a disco.
    let plain = 0;
    let total = 0;
    for (let t = 0; t < 1200; t += 2) {
      // Mid-interval, where the arrival is over and it is one thing or the
      // other rather than on its way between them.
      const how = glow.colouring(t + 1.2);
      if (how === 0) plain++;
      total++;
    }

    expect(plain / total).toBeGreaterThan(0.4);
    expect(plain / total).toBeLessThan(0.75);
  });

  it('casts in colours that can be told apart', () => {
    // Pale casts were the first attempt and could not be seen at all: a
    // coloured light that is pale enough to be a screen is white by the time
    // it has been screened onto a lit face. These are hues, and the blend
    // takes the brightness from the paint.
    const hues = new Set<string>();
    for (let t = 0; t < 1200; t += 2) {
      const { red, green, blue } = glow.tint(t + 1.2);
      hues.add(`${Math.round(red)},${Math.round(green)},${Math.round(blue)}`);
    }

    expect(hues.size).toBe(5);
    for (const hue of hues) {
      const [red, green, blue] = hue.split(',').map(Number);
      // Saturated: something has to be well clear of something else.
      expect(Math.max(red, green, blue) - Math.min(red, green, blue)).toBeGreaterThan(80);
    }
  });

  it('arrives at a colour rather than snapping to it', () => {
    let worstHue = 0;
    let worstHow = 0;
    for (let t = 0; t < 60; t += 1 / 60) {
      const now = glow.tint(t);
      const next = glow.tint(t + 1 / 60);
      worstHue = Math.max(worstHue, Math.hypot(next.red - now.red, next.green - now.green));
      worstHow = Math.max(worstHow, Math.abs(glow.colouring(t + 1 / 60) - glow.colouring(t)));
    }

    expect(worstHue).toBeLessThan(20);
    expect(worstHow).toBeLessThan(0.1);
  });

  it('goes somewhere new rather than repeating a short loop', () => {
    // The two waves are at frequencies that do not divide each other, and the
    // held level is drawn per interval, so ten seconds apart is not the same.
    expect(Math.abs(glow.at(4) - glow.at(14))).toBeGreaterThan(0.01);
  });
});
