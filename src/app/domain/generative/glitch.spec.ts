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

  /**
   * More than two, which is what the atelier gave it.
   *
   * The canvas at dusk, the canvas in daylight, the big figure corrupted and
   * two more of her: a signal that cannot decide what it is carrying rather
   * than a thing flickering between itself and one other.
   */
  describe('with more than two states', () => {
    const four = new Glitch(9, 0.55, 0, 4);

    it('shows every one of them', () => {
      const seen = new Set<number>();
      for (let t = 0; t < 2000; t += 0.37) seen.add(four.at(t).shows);

      expect([...seen].sort()).toEqual([0, 1, 2, 3]);
    });

    it('almost never lands where it already was', () => {
      // A change that changes nothing is a tear for no reason, and drawing a
      // state at random would waste one in four of them. It walks instead,
      // and only a block boundary can repeat — which is a thing signals do,
      // and is the price of an answer that needs no memory.
      //
      // Measured as how long each state stays up, because a repeat is
      // invisible from outside: it looks like one interval that lasted two.
      const runs: number[] = [];
      let was = four.at(0).shows;
      let since = 0;
      for (let t = 1 / 30; t < 3000; t += 1 / 30) {
        if (four.at(t).shows === was) continue;
        runs.push(t - since);
        was = four.at(t).shows;
        since = t;
      }
      const doubled = runs.filter((run) => run > 14).length;

      expect(runs.length).toBeGreaterThan(200);
      expect(doubled / runs.length).toBeLessThan(0.12);
    });

    it('tears in strips drawn from all of them', () => {
      const seen = new Set<number>();
      for (let t = 0; t < 400; t += 0.37) {
        for (let which = 0; which < 9; which++) seen.add(four.band(t, which).from);
      }

      expect([...seen].sort()).toEqual([0, 1, 2, 3]);
    });
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
    // Two intervals, because now and then a change lands back on the state
    // it came from and the picture does not visibly change at all.
    expect(Math.max(...gaps)).toBeLessThan(26);
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
    let changes = 0;
    for (let t = 1 / 30; t < 150; t += 1 / 30) {
      if (glitch.at(t).shows === glitch.at(t - 1 / 30).shows) continue;
      changes++;
      expect(glitch.at(t).tearing).toBeGreaterThan(0.8);
      // And two and a half seconds later it is whole: the tear lasts half a
      // second, the shortest gap between changes is five, so this is clear
      // of both the one behind and the one ahead.
      expect(glitch.at(t + 2.5).tearing).toBe(0);
    }

    expect(changes).toBeGreaterThan(10);
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
