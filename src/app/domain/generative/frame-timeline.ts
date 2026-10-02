/**
 * A looping keyframe timeline for sprite-style frame animation: a list of
 * `{ index, ms }` steps that maps elapsed time to the frame index to show,
 * wrapping back to the start once the total duration elapses.
 *
 * Pure and dependency-free — the renderer owns the actual images and just asks
 * this which one to draw at the current time. Uneven step durations let a
 * sequence hold a resting frame and flick quickly through others (e.g. a slow
 * blink: a long open frame, then a fast dip through half/closed and back).
 */
export interface Keyframe {
  /** Index into the caller's frame list. */
  index: number;
  /** How long this frame is held, in milliseconds. */
  ms: number;
}

export class FrameTimeline {
  private readonly totalMs: number;

  constructor(private readonly frames: readonly Keyframe[]) {
    this.totalMs = frames.reduce((sum, f) => sum + Math.max(0, f.ms), 0);
  }

  /** Total length of one loop, in milliseconds. */
  get durationMs(): number {
    return this.totalMs;
  }

  /**
   * Which frame, and how far into it, at `elapsedSeconds`.
   *
   * The index alone says what to draw; a renderer that wants to cross-fade
   * between two frames, or flash on the instant one arrives, needs to know how
   * far through the step it is as well. Computing that outside would mean
   * walking the same list twice with two chances to disagree about it.
   */
  at(elapsedSeconds: number): { index: number; previous: number; through: number } {
    if (this.frames.length === 0) return { index: 0, previous: 0, through: 1 };
    if (this.totalMs <= 0) {
      return { index: this.frames[0].index, previous: this.frames[0].index, through: 1 };
    }

    let ms = (((elapsedSeconds * 1000) % this.totalMs) + this.totalMs) % this.totalMs;
    for (let step = 0; step < this.frames.length; step++) {
      const frame = this.frames[step];
      if (ms < frame.ms) {
        const before = this.frames[(step - 1 + this.frames.length) % this.frames.length];
        return {
          index: frame.index,
          previous: before.index,
          through: frame.ms > 0 ? ms / frame.ms : 1,
        };
      }
      ms -= frame.ms;
    }

    const last = this.frames[this.frames.length - 1];
    return { index: last.index, previous: last.index, through: 1 };
  }

  /** The frame index to show at `elapsedSeconds`, looping over the timeline. */
  indexAt(elapsedSeconds: number): number {
    if (this.frames.length === 0) return 0;
    if (this.totalMs <= 0) return this.frames[0].index;

    let ms = (((elapsedSeconds * 1000) % this.totalMs) + this.totalMs) % this.totalMs;
    for (const frame of this.frames) {
      if (ms < frame.ms) return frame.index;
      ms -= frame.ms;
    }
    return this.frames[this.frames.length - 1].index;
  }
}
