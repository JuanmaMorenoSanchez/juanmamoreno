import { clamp, rand } from '../math';

/**
 * A drifting figure blown by "wind", with a finite lifespan. Pure simulation —
 * it holds position/velocity/life and advances one step per `update()`. It has
 * no knowledge of canvas or images: the feature layer reads this state (`x`,
 * `y`, `size`, `alpha`, `positive`) and renders it.
 */
export class Particle {
  x: number;
  y: number;
  readonly size: number;
  /**
   * Whether "growth" was positive at birth. The renderer uses this to pick the
   * figure (e.g. angel vs. head), so a particle keeps its look for its whole
   * life instead of flipping as the global value changes.
   */
  readonly positive: boolean;

  private vx = rand(-1, 1);
  private vy = rand(-1, 0);
  private readonly ax: number;
  private readonly ay: number;
  private life = 255;

  constructor(x: number, y: number, windRad: number, grow: number) {
    this.x = x;
    this.y = y;
    this.positive = grow >= 0;
    this.size = rand(30, 160);
    // Accelerate along the wind angle, plus a vertical push from "growth".
    this.ax = Math.cos(windRad) / 50;
    this.ay = Math.sin(windRad) / 50 - grow / 100;
  }

  update(): void {
    this.vx += this.ax;
    this.vy += this.ay;
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 1.6;
  }

  /** Remaining lifespan as a 0..1 opacity. */
  get alpha(): number {
    return clamp(this.life / 255, 0, 1);
  }

  get dead(): boolean {
    return this.life < 0;
  }
}
