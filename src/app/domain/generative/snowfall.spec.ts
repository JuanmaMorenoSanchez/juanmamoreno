import { Snowfall } from './snowfall';

/**
 * Snow, held in fractions of the frame rather than pixels.
 *
 * A window resized mid-fall must not teleport it or leave a column of snow
 * where the frame used to end, which is the whole reason this is not in
 * pixels — and the reason it is testable at all without a canvas.
 */
describe('Snowfall', () => {
  it('starts empty and fills as time passes', () => {
    const snow = new Snowfall(10, 20);
    expect(snow.specks).toHaveLength(0);

    snow.update(0.25);

    expect(snow.specks.length).toBeGreaterThan(0);
  });

  it('counts arrivals in whole flakes, so a fast frame is not a blizzard', () => {
    // At 20 a second, forty frames of 4ms is three flakes and not forty.
    const snow = new Snowfall(100, 20);
    for (let frame = 0; frame < 40; frame++) snow.update(0.004);

    expect(snow.specks).toHaveLength(3);
  });

  it('never holds more than it was told to', () => {
    const snow = new Snowfall(12, 500);
    for (let frame = 0; frame < 60; frame++) snow.update(0.1);

    expect(snow.specks.length).toBeLessThanOrEqual(12);
  });

  it('can start mid-snowfall rather than with an empty sky', () => {
    // Otherwise the first seconds are a line of snow descending into
    // nothing, which reads as a thing starting rather than as weather.
    const snow = new Snowfall(30);
    snow.seed();

    const ys = snow.specks.map((flake) => flake.y);
    expect(snow.specks).toHaveLength(30);
    expect(Math.min(...ys)).toBeLessThan(0.3);
    expect(Math.max(...ys)).toBeGreaterThan(0.7);
  });

  it('falls downward and lets go at the bottom', () => {
    const snow = new Snowfall(5, 1000);
    snow.update(0.1);
    const was = snow.specks.map((flake) => flake.y);

    snow.update(0.5);
    const now = snow.specks.map((flake) => flake.y);
    expect(now[0]).toBeGreaterThan(was[0]);

    for (let frame = 0; frame < 200; frame++) snow.update(0.5);
    expect(snow.specks.every((flake) => flake.y <= 1.05)).toBe(true);
  });

  it('sways either side of where it fell, without leaving the frame', () => {
    const snow = new Snowfall(40);
    snow.seed();

    for (const flake of snow.specks) {
      const drift = Math.abs(snow.across(flake) - flake.x);
      expect(drift).toBeLessThanOrEqual(0.02);
    }
  });

  it('gives the near flakes the size, the weight and the speed together', () => {
    // Three numbers drawn from one, which is the whole of the depth in it:
    // a big slow faint flake would read as a smudge on the screen.
    const snow = new Snowfall(60);
    snow.seed();
    const sorted = [...snow.specks].sort((a, b) => a.size - b.size);

    expect(sorted[0].alpha).toBeLessThan(sorted[sorted.length - 1].alpha);
    expect(sorted[0].fall).toBeLessThan(sorted[sorted.length - 1].fall);
  });
});
