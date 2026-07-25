import { rand } from './math';

/**
 * A hidden onlooker: a pair of eyes that coalesces out of the dust in the
 * periphery, watches for a moment, then dissolves back into it. `openness`
 * (0..1) rises as it appears and falls as it hides; the renderer reads position,
 * size, tilt and openness to draw the eyes. Everything else is lifecycle state.
 */
export interface Watcher {
  x: number;
  y: number;
  /** Relative eye size, multiplied by a canvas-derived base by the renderer. */
  scale: number;
  /** Small head tilt, radians. */
  tilt: number;
  /** 0 = hidden/closed, 1 = fully open. Set by update(). */
  openness: number;

  // --- lifecycle ---
  /** Time (s) the current appearance began, or -1 while hidden and waiting. */
  bornAt: number;
  /** Time (s) the next appearance is scheduled to begin, while hidden. */
  nextAt: number;
  fadeInMs: number;
  holdMs: number;
  fadeOutMs: number;
  /** A quick blink partway through the hold — a flicker of life. */
  blinkAtMs: number;
}

// Seconds spent hidden between appearances (long, so the eyes stay rare).
const GAP_MIN = 6;
const GAP_MAX = 16;
// Per-appearance timing (ms).
const FADE_IN_MIN = 400;
const FADE_IN_MAX = 800;
const HOLD_MIN = 1400;
const HOLD_MAX = 3600;
const FADE_OUT_MIN = 400;
const FADE_OUT_MAX = 900;
// How long the mid-hold blink dip lasts (ms, either side of the instant).
const BLINK_HALF_MS = 70;
// Keep spawns off the very edges.
const EDGE_MARGIN = 0.06;

const smoothstep = (x: number): number => x * x * (3 - 2 * x);

/**
 * A small troupe of {@link Watcher}s. Pure simulation: `update` advances each
 * one's appear → watch → hide cycle and (re)places hidden ones at a fresh
 * peripheral spot, never within `safeRadius` of the centre so the head it
 * surrounds always stays clear. The feature layer renders whatever is in `list`.
 */
export class WatcherField {
  private watchers: Watcher[] = [];

  constructor(
    private width: number,
    private height: number,
    private readonly count = 6
  ) {
    for (let i = 0; i < count; i++) {
      this.watchers.push({
        x: 0,
        y: 0,
        scale: 1,
        tilt: 0,
        openness: 0,
        bornAt: -1,
        // Stagger the first appearances so they don't all open at once.
        nextAt: rand(0, GAP_MAX),
        fadeInMs: 0,
        holdMs: 0,
        fadeOutMs: 0,
        blinkAtMs: 0,
      });
    }
  }

  get list(): readonly Watcher[] {
    return this.watchers;
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  update(t: number, safeRadius: number): void {
    for (const w of this.watchers) {
      if (w.bornAt < 0) {
        if (t >= w.nextAt) {
          this.spawn(w, t, safeRadius);
        } else {
          w.openness = 0;
          continue;
        }
      }

      const life = w.fadeInMs + w.holdMs + w.fadeOutMs;
      const elapsed = (t - w.bornAt) * 1000;
      if (elapsed >= life) {
        w.bornAt = -1; // hidden again
        w.openness = 0;
        w.nextAt = t + rand(GAP_MIN, GAP_MAX);
        continue;
      }
      w.openness = this.opennessAt(w, elapsed);
    }
  }

  private opennessAt(w: Watcher, elapsed: number): number {
    if (elapsed < w.fadeInMs) return smoothstep(elapsed / w.fadeInMs);

    const held = elapsed - w.fadeInMs;
    if (held < w.holdMs) {
      // Dip toward closed right around the blink instant.
      const d = Math.abs(held - w.blinkAtMs);
      return d < BLINK_HALF_MS ? smoothstep(d / BLINK_HALF_MS) : 1;
    }

    const out = (held - w.holdMs) / w.fadeOutMs;
    return smoothstep(1 - out);
  }

  private spawn(w: Watcher, t: number, safeRadius: number): void {
    const cx = this.width / 2;
    const cy = this.height / 2;
    let x = cx;
    let y = cy;
    // Reject spots too close to the centre so the head stays clear.
    for (let tries = 0; tries < 12; tries++) {
      x = rand(this.width * EDGE_MARGIN, this.width * (1 - EDGE_MARGIN));
      y = rand(this.height * EDGE_MARGIN, this.height * (1 - EDGE_MARGIN));
      if (Math.hypot(x - cx, y - cy) >= safeRadius) break;
    }

    w.x = x;
    w.y = y;
    w.scale = rand(0.75, 1.5);
    w.tilt = rand(-0.35, 0.35);
    w.bornAt = t;
    w.openness = 0;
    w.fadeInMs = rand(FADE_IN_MIN, FADE_IN_MAX);
    w.holdMs = rand(HOLD_MIN, HOLD_MAX);
    w.fadeOutMs = rand(FADE_OUT_MIN, FADE_OUT_MAX);
    w.blinkAtMs = rand(w.holdMs * 0.3, w.holdMs * 0.7);
  }
}
