export interface SoundPeakDetectorOptions {
  /** How far back (seconds) the rolling average looks. */
  windowSeconds?: number;
  /** A reading must exceed the rolling average by this factor to count as a peak. */
  peakMultiplier?: number;
  /** Readings below this are ignored entirely — silence never "peaks" on noise-floor jitter. */
  minAbsoluteLevel?: number;
  /** Minimum gap between two accepted peaks, so one loud moment (which spans several readings) fires once. */
  cooldownSeconds?: number;
}

const DEFAULTS: Required<SoundPeakDetectorOptions> = {
  windowSeconds: 20,
  peakMultiplier: 1.8,
  minAbsoluteLevel: 0.02,
  cooldownSeconds: 0.6,
};

/**
 * Detects loud moments relative to whatever "normal" has been over the last
 * `windowSeconds`, rather than a fixed volume — the same clap reads as a
 * clear peak whether the room is silent or as loud as a concert hall. Pure
 * and stateless besides its own rolling sample window; the feature layer
 * feeds it live volume readings (e.g. from a Web Audio AnalyserNode) and
 * reacts to a `true` return however it likes (in this app: the same
 * `pointerDown` a click already triggers).
 */
export class SoundPeakDetector {
  private readonly options: Required<SoundPeakDetectorOptions>;
  private readonly samples: { t: number; level: number }[] = [];
  private lastPeakAt = -Infinity;

  constructor(options: SoundPeakDetectorOptions = {}) {
    this.options = { ...DEFAULTS, ...options };
  }

  /**
   * Feeds one new volume reading (0..1-ish; whatever scale the caller's
   * analyser produces, as long as it's consistent) at time `t` seconds.
   * Returns true if this reading counts as a peak against the rolling
   * average of the preceding window.
   */
  addSample(t: number, level: number): boolean {
    while (this.samples.length && t - this.samples[0].t > this.options.windowSeconds) {
      this.samples.shift();
    }

    const average = this.samples.length
      ? this.samples.reduce((sum, sample) => sum + sample.level, 0) / this.samples.length
      : level;

    this.samples.push({ t, level });

    const isLoudEnough = level >= this.options.minAbsoluteLevel;
    const isAboveAverage = level >= average * this.options.peakMultiplier;
    const isPastCooldown = t - this.lastPeakAt >= this.options.cooldownSeconds;

    const isPeak = isLoudEnough && isAboveAverage && isPastCooldown;
    if (isPeak) this.lastPeakAt = t;
    return isPeak;
  }
}
