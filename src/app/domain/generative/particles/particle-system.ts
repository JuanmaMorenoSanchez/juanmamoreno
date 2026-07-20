import { randInt } from '../math';
import { Particle } from './particle';

/**
 * Emits and manages a pool of particles from a fixed origin. Pure simulation:
 * `spawn` and `update` advance the state; the feature layer renders whatever is
 * in `particles` each frame.
 */
export class ParticleSystem {
  private readonly pool: Particle[] = [];

  constructor(
    private readonly x: number,
    private readonly y: number
  ) {}

  get particles(): readonly Particle[] {
    return this.pool;
  }

  /** Emits sparsely (roughly 1 in `chance` calls) so the field stays legible. */
  spawn(windRad: number, grow: number, chance = 10): void {
    if (randInt(0, chance - 1) === 0) {
      this.pool.push(new Particle(this.x, this.y, windRad, grow));
    }
  }

  /** Advances every particle and removes the dead ones. */
  update(): void {
    for (let i = this.pool.length - 1; i >= 0; i--) {
      this.pool[i].update();
      if (this.pool[i].dead) this.pool.splice(i, 1);
    }
  }
}
