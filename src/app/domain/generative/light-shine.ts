import { rand } from './math';

export interface LightShineOptions {
  /** Shortest gap between shines, in seconds. */
  minIntervalSeconds?: number;
  /** Longest gap between shines, in seconds. */
  maxIntervalSeconds?: number;
  /** How long one shine takes to bloom and fade, in seconds. */
  durationSeconds?: number;
  /** Opacity at the shine's brightest instant. */
  peakAlpha?: number;
  /** Glow colour as an "r,g,b" triplet. */
  colorRgb?: string;
  /** Glow radius, as a fraction of the canvas's shorter side. */
  radiusFraction?: number;
}

const DEFAULTS: Required<LightShineOptions> = {
  minIntervalSeconds: 6,
  maxIntervalSeconds: 14,
  durationSeconds: 3,
  peakAlpha: 0.4,
  colorRgb: '255,235,205',
  radiusFraction: 0.6,
};

/**
 * An occasional soft bloom of light: mostly dormant, then a warm glow flares
 * up at a point on the canvas and fades, like a stray beam catching the scene
 * rather than a constant highlight. Pure Canvas 2D and stateless besides its
 * own timers, so any sketch can own one and call update()/draw() once a
 * frame — the same domain-layer pattern as Parallax.
 */
export class LightShine {
  private readonly options: Required<LightShineOptions>;
  private nextShineAt: number;
  private shineStartedAt: number | null = null;
  private originX = 0.5;
  private originY = 0.5;

  constructor(options: LightShineOptions = {}) {
    this.options = { ...DEFAULTS, ...options };
    this.nextShineAt = rand(this.options.minIntervalSeconds, this.options.maxIntervalSeconds);
  }

  /** Call once per frame with the sketch's elapsed time in seconds. */
  update(t: number): void {
    if (this.shineStartedAt === null) {
      if (t >= this.nextShineAt) {
        this.shineStartedAt = t;
        // A fresh spot each time so the flare doesn't always land in the same place.
        this.originX = rand(0.25, 0.75);
        this.originY = rand(0.25, 0.75);
      }
      return;
    }
    if (t - this.shineStartedAt >= this.options.durationSeconds) {
      this.shineStartedAt = null;
      this.nextShineAt = t + rand(this.options.minIntervalSeconds, this.options.maxIntervalSeconds);
    }
  }

  /** Renders the current bloom, if one is active; a no-op the rest of the time. */
  draw(ctx: CanvasRenderingContext2D, width: number, height: number, t: number): void {
    if (this.shineStartedAt === null) return;

    const progress = (t - this.shineStartedAt) / this.options.durationSeconds;
    // A single smooth bump (0 -> 1 -> 0) reads as one soft flare rather than
    // a hard fade-in/fade-out edge.
    const envelope = Math.sin(Math.PI * progress);
    if (envelope <= 0) return;

    const radius = Math.min(width, height) * this.options.radiusFraction;
    const cx = width * this.originX;
    const cy = height * this.originY;

    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    gradient.addColorStop(0, `rgba(${this.options.colorRgb}, ${this.options.peakAlpha * envelope})`);
    gradient.addColorStop(1, `rgba(${this.options.colorRgb}, 0)`);

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }
}
