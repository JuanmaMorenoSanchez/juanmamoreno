import { Parallax } from './parallax';

describe('Parallax', () => {
  it('shifts proportionally to depth and maxShift (ease = 1 snaps)', () => {
    const layer = new Parallax(1, 100, 1);
    layer.update(1, -0.5);
    expect(layer.x).toBe(100);
    expect(layer.y).toBe(-50);
  });

  it('a shallower layer shifts less than a deeper one for the same reference', () => {
    const far = new Parallax(0.2, 100, 1);
    const near = new Parallax(1, 100, 1);
    far.update(1, 1);
    near.update(1, 1);
    expect(far.x).toBe(20);
    expect(Math.abs(far.x)).toBeLessThan(Math.abs(near.x));
  });

  it('a zero-depth layer never moves', () => {
    const bg = new Parallax(0, 100, 1);
    bg.update(1, 1);
    expect(bg.x).toBe(0);
    expect(bg.y).toBe(0);
  });

  it('eases toward the target over successive updates', () => {
    const layer = new Parallax(1, 100, 0.5);
    layer.update(1, 0);
    expect(layer.x).toBe(50); // halfway
    layer.update(1, 0);
    expect(layer.x).toBe(75); // half of the remainder
    for (let i = 0; i < 40; i++) layer.update(1, 0);
    expect(layer.x).toBeGreaterThan(99.9);
  });

  it('reset returns to the origin', () => {
    const layer = new Parallax(1, 100, 1);
    layer.update(1, 1);
    layer.reset();
    expect(layer.x).toBe(0);
    expect(layer.y).toBe(0);
  });
});
