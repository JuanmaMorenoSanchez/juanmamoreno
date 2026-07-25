/**
 * A steady musical clock: turns elapsed time into a beat count, a phase within
 * the current beat, a percussive envelope, and a position within the bar. Pure
 * and dependency-free — a sketch reads it each frame to drive rhythmic motion
 * (a head bouncing to the beat, dust bursting on the downbeat, lights pulsing)
 * without needing real audio.
 */
export class BeatClock {
  private readonly beatPeriod: number;

  constructor(
    private readonly bpm: number,
    private readonly beatsPerBar = 4
  ) {
    this.beatPeriod = 60 / bpm;
  }

  /** Whole beats elapsed at time `t` (seconds). Increments once per beat. */
  beatIndex(t: number): number {
    return Math.floor(t / this.beatPeriod);
  }

  /** Progress through the current beat, in [0, 1). */
  phase(t: number): number {
    const p = (t / this.beatPeriod) % 1;
    return p < 0 ? p + 1 : p;
  }

  /**
   * Percussive envelope: 1 exactly on the beat, decaying to 0 by the next one.
   * Higher `shape` makes a snappier, more sharply peaked hit.
   */
  envelope(t: number, shape = 3): number {
    return Math.pow(1 - this.phase(t), shape);
  }

  /** Position within the bar, 0 .. beatsPerBar-1. */
  barBeat(t: number): number {
    return ((this.beatIndex(t) % this.beatsPerBar) + this.beatsPerBar) % this.beatsPerBar;
  }

  /** True on the first beat of the bar (the accented downbeat). */
  isDownbeat(t: number): boolean {
    return this.barBeat(t) === 0;
  }
}
