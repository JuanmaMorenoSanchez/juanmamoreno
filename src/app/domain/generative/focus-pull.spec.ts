import { FocusPull } from './focus-pull';

/**
 * How deep the field is, over time.
 *
 * Never which depth is in focus: that stays on her, because a focus pull put
 * the subject of the painting out of focus for seven seconds at a time. A
 * lens rests, moves, and rests again, and the resting is most of it.
 */
describe('FocusPull', () => {
  const focus = new FocusPull();

  it('stays between the two depths of field it was given', () => {
    for (let t = 0; t < 200; t += 0.13) {
      expect(focus.at(t)).toBeGreaterThanOrEqual(0.12 - 1e-9);
      expect(focus.at(t)).toBeLessThanOrEqual(0.85);
    }
  });

  it('spends most of its time resting, not travelling', () => {
    // Seven seconds of travel in a twenty-four second cycle. Anything more
    // and the page is a camera being operated rather than a painting.
    let moving = 0;
    const step = 1 / 60;
    for (let t = 0; t < focus.cycle; t += step) {
      if (Math.abs(focus.at(t + step) - focus.at(t)) > 1e-6) moving += step;
    }

    expect(moving / focus.cycle).toBeLessThan(0.35);
  });

  it('rests shallow longer than it rests open', () => {
    // Shallow is the look; open is where it goes to come back from.
    let shallow = 0;
    let open = 0;
    const step = 1 / 60;
    for (let t = 0; t < focus.cycle; t += step) {
      if (focus.at(t) > 0.849) shallow += step;
      if (focus.at(t) < 0.121) open += step;
    }

    expect(shallow).toBeGreaterThan(open * 1.5);
  });

  it('arrives rather than snapping', () => {
    let worst = 0;
    for (let t = 0; t < 100; t += 1 / 60) {
      worst = Math.max(worst, Math.abs(focus.at(t + 1 / 60) - focus.at(t)));
    }

    expect(worst).toBeLessThan(0.02);
  });

  it('answers the same second the same way, and goes back as well as forward', () => {
    expect(focus.at(13)).toBe(focus.at(13 + focus.cycle));
    expect(focus.at(-3)).toBeCloseTo(focus.at(focus.cycle - 3), 10);
  });
});
