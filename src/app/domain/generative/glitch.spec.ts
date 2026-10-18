import { Glitch } from './glitch';

/**
 * Two states of a picture and the broken moment between them.
 *
 * A signal changing over tears; it does not dissolve. Everything is
 * arithmetic of `t`, so the same second always tears the same way.
 */
describe('Glitch', () => {
  const glitch = new Glitch();

  it('answers the same second the same way', () => {
    expect(glitch.at(37.25)).toEqual(glitch.at(37.25));
    expect(new Glitch().band(37.25, 3)).toEqual(glitch.band(37.25, 3));
  });

  it('goes back and forth between the two, and shows each about half the time', () => {
    let up = 0;
    let total = 0;
    for (let t = 0; t < 1200; t += 0.37) {
      if (glitch.at(t).shows === 1) up++;
      total++;
    }

    expect(up / total).toBeGreaterThan(0.4);
    expect(up / total).toBeLessThan(0.6);
  });

  it('holds a state for seconds, not frames', () => {
    const changes: number[] = [];
    let was = glitch.at(0).shows;
    for (let t = 0; t < 300; t += 1 / 30) {
      const now = glitch.at(t).shows;
      if (now !== was) changes.push(t);
      was = now;
    }
    const gaps = changes.slice(1).map((at, n) => at - changes[n]);

    expect(Math.min(...gaps)).toBeGreaterThan(4);
    expect(Math.max(...gaps)).toBeLessThan(14);
    // And never twice the same: a change on a count is a metronome.
    expect(gaps.every((gap, n) => n === 0 || Math.abs(gap - gaps[n - 1]) > 1e-9)).toBe(true);
  });

  it('is whole almost all of the time', () => {
    // The tearing is an event, not a texture: a page that is always broken
    // is a broken page.
    let torn = 0;
    let total = 0;
    for (let t = 0; t < 300; t += 1 / 30) {
      if (glitch.at(t).tearing > 0.01) torn++;
      total++;
    }

    expect(torn / total).toBeLessThan(0.15);
  });

  it('tears around the change and nowhere else', () => {
    let changed = 0;
    for (let t = 1 / 30; t < 150; t += 1 / 30) {
      if (glitch.at(t).shows !== glitch.at(t - 1 / 30).shows) {
        changed = t;
        expect(glitch.at(t).tearing).toBeGreaterThan(0.8);
      }
      // Four seconds clear of the last change, it is whole again.
      if (changed && t - changed > 4 && glitch.at(t + 2).shows === glitch.at(t).shows) {
        expect(glitch.at(t).tearing).toBe(0);
      }
    }
    expect(changed).toBeGreaterThan(0);
  });

  it('tears in strips that stay on the picture', () => {
    for (let t = 0; t < 300; t += 0.37) {
      for (let which = 0; which < 9; which++) {
        const band = glitch.band(t, which);
        expect(band.top).toBeGreaterThanOrEqual(0);
        expect(band.top).toBeLessThanOrEqual(1);
        expect(band.high).toBeGreaterThan(0);
        expect(band.high).toBeLessThan(0.15);
        expect(Math.abs(band.shove)).toBeLessThan(0.08);
        expect([0, 1]).toContain(band.from);
      }
    }
  });

  it('redraws the strips on its own clock, not every frame', () => {
    // Twelve times a second. A tear that moves smoothly is a wipe.
    const sameFrame = glitch.band(10.001, 2);
    const nextFrame = glitch.band(10.001 + 1 / 60, 2);
    const muchLater = glitch.band(10.001 + 1 / 6, 2);

    expect(nextFrame).toEqual(sameFrame);
    expect(muchLater).not.toEqual(sameFrame);
  });

  it('can be given a number of its own so two do not change together', () => {
    const girl = new Glitch(9, 0.55, 41);
    let apart = 0;
    for (let t = 0; t < 600; t += 0.37) {
      if (girl.at(t).shows !== glitch.at(t).shows) apart++;
    }

    expect(apart).toBeGreaterThan(200);
  });
});
