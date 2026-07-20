import { Particle } from './particle';
import { ParticleSystem } from './particle-system';

describe('Particle', () => {
  it('records the growth sign at birth for the renderer', () => {
    expect(new Particle(0, 0, 0, 5).positive).toBe(true);
    expect(new Particle(0, 0, 0, 0).positive).toBe(true);
    expect(new Particle(0, 0, 0, -5).positive).toBe(false);
  });

  it('starts fully opaque and alive', () => {
    const p = new Particle(0, 0, 0, 0);
    expect(p.alpha).toBe(1);
    expect(p.dead).toBe(false);
  });

  it('sizes within the expected range', () => {
    for (let i = 0; i < 50; i++) {
      const { size } = new Particle(0, 0, 0, 0);
      expect(size).toBeGreaterThanOrEqual(30);
      expect(size).toBeLessThan(160);
    }
  });

  it('moves and fades on update, then dies', () => {
    const p = new Particle(100, 100, Math.PI / 4, 20);
    p.update();
    p.update();
    expect(p.x !== 100 || p.y !== 100).toBe(true);
    expect(p.alpha).toBeLessThan(1);

    for (let i = 0; i < 200; i++) p.update();
    expect(p.dead).toBe(true);
    expect(p.alpha).toBe(0); // clamped, never negative
  });
});

describe('ParticleSystem', () => {
  it('emits from its origin (chance = 1 always spawns)', () => {
    const system = new ParticleSystem(50, 60);
    expect(system.particles).toHaveLength(0);
    system.spawn(0, 10, 1);
    system.spawn(0, 10, 1);
    expect(system.particles).toHaveLength(2);
    expect(system.particles[0].x).toBe(50);
    expect(system.particles[0].y).toBe(60);
  });

  it('advances particles and culls the dead ones', () => {
    const system = new ParticleSystem(0, 0);
    for (let i = 0; i < 5; i++) system.spawn(0, 10, 1);
    expect(system.particles).toHaveLength(5);
    // Well beyond every particle's lifespan (255 / 1.6 ≈ 160 updates).
    for (let i = 0; i < 200; i++) system.update();
    expect(system.particles).toHaveLength(0);
  });
});
