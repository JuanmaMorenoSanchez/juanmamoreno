import { clamp, rand } from '../math';

/**
 * A single dust mote drifting in the air. Position and velocities are in CSS
 * pixels; `depth` (0..1, near = 1) drives both its size and how strongly air
 * currents and gusts move it, giving a parallax sense of depth. Fields expose
 * these as plain mutable state for the renderer to read each frame.
 */
export interface Mote {
  x: number;
  y: number;
  depth: number;
  radius: number;
  /** Slow constant air current (px/s). */
  baseVx: number;
  baseVy: number;
  /** Lazy meander applied as a small oscillating velocity. */
  wanderAmp: number;
  wanderFreqX: number;
  wanderFreqY: number;
  phase: number;
  twinkleFreq: number;
  /** Transient impulse velocity from gusts (px/s); decays back to the drift. */
  vx: number;
  vy: number;
}

// How far past an edge a mote travels before wrapping to the far side, so it
// slides fully off (glow included) rather than popping at the boundary.
const MARGIN = 24;

/**
 * A field of dust motes suspended in air. Pure simulation: `update` advances
 * the drift/meander/impulse of every mote and wraps them around the canvas so
 * the field never empties; `gust` injects a localized puff (from a pointer
 * draft or a detected sound). The feature layer renders whatever is in `list`.
 */
export class DustField {
  private motes: Mote[] = [];

  constructor(
    private width: number,
    private height: number,
    private readonly count = 90
  ) {
    this.seed();
  }

  get list(): readonly Mote[] {
    return this.motes;
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  private seed(): void {
    this.motes = [];
    for (let i = 0; i < this.count; i++) {
      const depth = rand(0.12, 1);
      this.motes.push({
        x: rand(0, this.width),
        y: rand(0, this.height),
        depth,
        radius: 0.6 + depth * 2.2,
        baseVx: rand(-4, 9) * depth, // faint sideways air current, nearer = faster
        baseVy: rand(-7, 2) * depth, // gentle upward bias
        wanderAmp: rand(3, 12),
        wanderFreqX: rand(0.05, 0.25),
        wanderFreqY: rand(0.05, 0.25),
        phase: rand(0, Math.PI * 2),
        twinkleFreq: rand(0.3, 1.2),
        vx: 0,
        vy: 0,
      });
    }
  }

  update(dt: number, t: number): void {
    const w = this.width;
    const h = this.height;
    const decay = Math.pow(0.12, dt); // gust impulse fades back to the drift
    for (const m of this.motes) {
      const wanderX = Math.cos(t * m.wanderFreqX + m.phase) * m.wanderAmp;
      const wanderY = Math.sin(t * m.wanderFreqY + m.phase) * m.wanderAmp;
      m.x += (m.baseVx + wanderX + m.vx) * dt;
      m.y += (m.baseVy + wanderY + m.vy) * dt;
      m.vx *= decay;
      m.vy *= decay;

      if (m.x < -MARGIN) m.x = w + MARGIN;
      else if (m.x > w + MARGIN) m.x = -MARGIN;
      if (m.y < -MARGIN) m.y = h + MARGIN;
      else if (m.y > h + MARGIN) m.y = -MARGIN;
    }
  }

  /**
   * A localized puff centred at (x, y): motes within `radius` are pushed
   * radially outward, strongest at the centre and scaled by their depth, so a
   * pointer draft or a sound peak visibly disturbs the field.
   */
  gust(x: number, y: number, strength: number, radius: number): void {
    const r2 = radius * radius;
    for (const m of this.motes) {
      const dx = m.x - x;
      const dy = m.y - y;
      const d2 = dx * dx + dy * dy;
      if (d2 > r2 || d2 === 0) continue;
      const falloff = clamp(1 - d2 / r2, 0, 1); // 1 at centre → 0 at edge
      const d = Math.sqrt(d2);
      m.vx += (dx / d) * strength * falloff * m.depth;
      m.vy += (dy / d) * strength * falloff * m.depth;
    }
  }
}
