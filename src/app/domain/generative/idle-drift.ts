/**
 * Where the parallax looks when nobody is moving a pointer.
 *
 * A painting that only moves when touched is a still painting most of the
 * time — on a phone there is no pointer at all, and on a desk the pointer
 * leaves the window and everything stops dead. So the scene keeps drifting on
 * its own, slowly, and the pointer takes over when there is one.
 *
 * Two sines whose periods do not divide each other, so the path never repeats
 * inside a viewing and never reads as a loop. Slow enough that it is noticed
 * as the painting breathing rather than as something sliding about.
 */
export class IdleDrift {
  constructor(
    /** Seconds for the horizontal sweep. */
    private readonly across = 23,
    /** Seconds for the vertical one. Deliberately not a multiple. */
    private readonly down = 17.3
  ) {}

  /** Where it is looking at `t` seconds: both between -1 and 1. */
  at(t: number): { x: number; y: number } {
    return {
      x: Math.sin((t / this.across) * Math.PI * 2),
      // Smaller: a painting drifting up and down as far as it drifts sideways
      // reads as a boat.
      y: Math.sin((t / this.down) * Math.PI * 2 + 0.7) * 0.55,
    };
  }
}
