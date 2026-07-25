import { rand } from './math';

export interface BeamSample {
  /** Progress across the sweep, 0..1. */
  sweep: number;
  /** Brightness envelope, 0..1 (fades in at the start, out at the end). */
  intensity: number;
  /** Increments on each new sweep, so the renderer can re-randomise its path. */
  id: number;
}

const smoothstep = (x: number): number => x * x * (3 - 2 * x);

/**
 * Schedules an occasional light beam: dormant for a long random gap, then a
 * single sweep of `durationS` seconds, then dormant again. Pure timing — the
 * renderer reads `sample()` for the sweep progress and brightness and draws the
 * actual shaft of light. `id` lets the renderer keep the same random path (side,
 * angle) for the length of one sweep and pick a fresh one for the next.
 */
export class SweepBeam {
  private nextAt = 0;
  private startT = -1;
  private id = 0;

  constructor(
    private readonly gapMinS: number,
    private readonly gapMaxS: number,
    private readonly durationS: number,
    private readonly fadeIn = 0.18,
    private readonly fadeOut = 0.3
  ) {}

  /** A sample while the beam sweeps, or null while it is dormant. */
  sample(t: number): BeamSample | null {
    if (this.nextAt === 0) this.nextAt = t + rand(this.gapMinS, this.gapMaxS);

    if (this.startT < 0) {
      if (t < this.nextAt) return null;
      this.startT = t;
      this.id++;
    }

    const p = (t - this.startT) / this.durationS;
    if (p >= 1) {
      this.startT = -1;
      this.nextAt = t + rand(this.gapMinS, this.gapMaxS);
      return null;
    }

    return { sweep: p, intensity: this.intensityAt(p), id: this.id };
  }

  private intensityAt(p: number): number {
    if (p < this.fadeIn) return smoothstep(p / this.fadeIn);
    if (p > 1 - this.fadeOut) return smoothstep((1 - p) / this.fadeOut);
    return 1;
  }
}
