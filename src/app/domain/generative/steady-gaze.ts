/**
 * Where a scene is looking, moved towards where it was told to look at a
 * rate it cannot exceed.
 *
 * Easing — stepping a fraction of the way there every frame — is smooth in
 * the sense that it has no corners, but it is fastest exactly when the gap is
 * biggest, so a pointer thrown across the window throws the scene with it.
 * That is the violent part: not how far it goes, but how quickly it starts.
 *
 * This goes at one speed. A flick and a drift move it at the same rate, and
 * the only difference between them is how long it keeps going. The rate has
 * to be faster than whatever is being followed, or it lags behind its own
 * target for ever; past that, lower is calmer.
 */
export class SteadyGaze {
  private atX = 0;
  private atY = 0;

  constructor(
    /** How much of the range it crosses in a second. */
    private readonly rate = 0.6
  ) {}

  /** Where it is now, having moved `dt` seconds towards `x`, `y`. */
  toward(x: number, y: number, dt: number): { x: number; y: number } {
    const acrossTo = x - this.atX;
    const downTo = y - this.atY;
    const away = Math.hypot(acrossTo, downTo);

    if (away > 0) {
      const step = Math.min(away, this.rate * Math.max(0, dt));
      this.atX += (acrossTo / away) * step;
      this.atY += (downTo / away) * step;
    }

    return { x: this.atX, y: this.atY };
  }
}
