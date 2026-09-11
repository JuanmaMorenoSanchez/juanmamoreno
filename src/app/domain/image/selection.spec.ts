import { clearSelection, createSelection, hasSelection, paintDab } from './selection';

const photo = { width: 400, height: 300 };
const at = (s: ReturnType<typeof createSelection>, fx: number, fy: number) =>
  s.values[Math.floor(fy * s.height) * s.width + Math.floor(fx * s.width)];

describe('selecting part of a photograph', () => {
  it('starts with nothing selected, which means everywhere', () => {
    // Not an empty selection but the absence of one: the sliders then apply to
    // the whole photograph, which is the usual case and needs no brushwork.
    const selection = createSelection(photo.width, photo.height);

    expect(hasSelection(selection)).toBe(false);
    expect(hasSelection(null)).toBe(false);
  });

  it('selects where the brush was put, and not elsewhere', () => {
    const selection = createSelection(photo.width, photo.height);
    paintDab(selection, photo, { x: 40, y: 30, radius: 40, softness: 0 });

    expect(hasSelection(selection)).toBe(true);
    expect(at(selection, 0.1, 0.1)).toBeGreaterThan(0.5);
    expect(at(selection, 0.9, 0.9)).toBe(0);
  });

  it('fades out towards the rim when the edge is soft', () => {
    const selection = createSelection(photo.width, photo.height);
    paintDab(selection, photo, { x: 200, y: 150, radius: 150, softness: 1 });

    const middle = at(selection, 0.5, 0.5);
    const nearer = at(selection, 0.5, 0.32);
    const further = at(selection, 0.5, 0.18);

    expect(middle).toBeGreaterThan(nearer);
    expect(nearer).toBeGreaterThan(further);
  });

  it('keeps a hard edge hard', () => {
    const selection = createSelection(photo.width, photo.height);
    paintDab(selection, photo, { x: 200, y: 150, radius: 120, softness: 0 });

    // Everything inside is fully selected, rather than tailing off.
    expect(at(selection, 0.5, 0.5)).toBe(1);
    expect(at(selection, 0.5, 0.36)).toBe(1);
  });

  it('builds up when the same place is gone over twice, and stops at full', () => {
    const selection = createSelection(photo.width, photo.height);
    paintDab(selection, photo, { x: 200, y: 150, radius: 100, softness: 1 });
    const once = at(selection, 0.5, 0.42);
    paintDab(selection, photo, { x: 200, y: 150, radius: 100, softness: 1 });
    const twice = at(selection, 0.5, 0.42);

    expect(twice).toBeGreaterThan(once);
    for (const value of selection.values) expect(value).toBeLessThanOrEqual(1);
  });

  it('takes a selection back rather than making it start again', () => {
    const selection = createSelection(photo.width, photo.height);
    paintDab(selection, photo, { x: 200, y: 150, radius: 120, softness: 0 });
    paintDab(selection, photo, { x: 200, y: 150, radius: 120, softness: 0, erase: true });

    expect(hasSelection(selection)).toBe(false);
    for (const value of selection.values) expect(value).toBeGreaterThanOrEqual(0);
  });

  it('paints something however fine the brush is', () => {
    // The failure this guards against is the quiet one: a brush finer than a
    // mask cell falling between four centres, reaching none, and reporting
    // nothing wrong. Nothing selected and nothing said looks exactly like a
    // brush that is not working at all.
    const selection = createSelection(4000, 3000);
    paintDab(selection, { width: 4000, height: 3000 }, {
      x: 1234.5,
      y: 987.5,
      radius: 1,
      softness: 0,
    });

    expect(hasSelection(selection)).toBe(true);
  });

  it('clears everything at once', () => {
    const selection = createSelection(photo.width, photo.height);
    paintDab(selection, photo, { x: 100, y: 100, radius: 90, softness: 0.5 });
    clearSelection(selection);

    expect(hasSelection(selection)).toBe(false);
  });

  it('is proportioned like the photograph, so a round brush stays round', () => {
    const selection = createSelection(400, 200);

    expect(selection.width / selection.height).toBeCloseTo(2, 1);
  });
});
