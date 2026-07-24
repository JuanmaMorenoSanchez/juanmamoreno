import { DustField } from './dust-field';

describe('DustField', () => {
  it('seeds the requested number of motes', () => {
    const field = new DustField(800, 600, 42);
    expect(field.list.length).toBe(42);
  });

  it('advances a mote along its impulse velocity', () => {
    const field = new DustField(800, 600, 1);
    const mote = field.list[0];
    mote.baseVx = 0;
    mote.wanderAmp = 0;
    mote.vx = 100;
    const x0 = mote.x;
    field.update(0.1, 0);
    expect(mote.x).toBeCloseTo(x0 + 10, 1); // 100 px/s over 0.1s
  });

  it('decays a gust impulse over time', () => {
    const field = new DustField(800, 600, 1);
    const mote = field.list[0];
    mote.vx = 100;
    field.update(0.1, 0);
    expect(Math.abs(mote.vx)).toBeLessThan(100);
  });

  it('wraps a mote that drifts past the right edge back to the left', () => {
    const field = new DustField(800, 600, 1);
    const mote = field.list[0];
    mote.x = 900; // well past width + margin
    field.update(0.016, 0);
    expect(mote.x).toBeLessThanOrEqual(0);
  });

  it('imparts velocity to an otherwise still field on a gust', () => {
    const field = new DustField(800, 600, 60);
    const totalSpeed = () =>
      field.list.reduce((s, m) => s + Math.abs(m.vx) + Math.abs(m.vy), 0);
    expect(totalSpeed()).toBe(0);
    field.gust(400, 300, 50, 10000); // covers the whole canvas
    expect(totalSpeed()).toBeGreaterThan(0);
  });
});
