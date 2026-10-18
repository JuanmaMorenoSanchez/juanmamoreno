/**
 * Where the parallax looks when nobody is moving a pointer.
 *
 * A painting that only moves when touched is a still painting most of the
 * time — on a phone there is no pointer at all, and on a desk the pointer
 * leaves the window and everything stops dead. So the scene keeps drifting on
 * its own, slowly, and the pointer takes over when there is one.
 *
 * **It goes round rather than back and forth.** A pair of sines, one per
 * axis, is a path that slows to a stop at each end and turns around, and a
 * painting that keeps stopping reads as a thing being nudged. A turn at a
 * steady rate never stops: the speed is the same at every moment of it. A
 * second, smaller turn at a rate that does not divide the first keeps it off
 * a circle and off a loop anybody would notice.
 */
export class IdleDrift {
  constructor(
    /** Seconds for one turn of the path. */
    private readonly around = 16,
    /** Seconds for the smaller turn laid over it. Deliberately not a divisor. */
    private readonly wobbles = 9.7
  ) {}

  /** Where it is looking at `t` seconds: both between -1 and 1. */
  at(t: number): { x: number; y: number } {
    const turn = (t / this.around) * Math.PI * 2;
    const over = (t / this.wobbles) * Math.PI * 2;
    return {
      x: Math.cos(turn) * 0.85 + Math.cos(over * 1.3) * 0.15,
      // Smaller: a painting drifting up and down as far as it drifts sideways
      // reads as a boat.
      y: (Math.sin(turn) * 0.85 + Math.sin(over) * 0.15) * 0.72,
    };
  }
}
