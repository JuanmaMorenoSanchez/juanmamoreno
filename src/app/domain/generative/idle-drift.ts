/** One circle in the path: how wide, how long it takes, where it starts. */
interface Turn {
  wide: number;
  takes: number;
  from: number;
}

/**
 * Three circles, turned at once and added together.
 *
 * The first is most of the path and the other two bend it. Their periods do
 * not divide each other, so the figure never closes and no two passes across
 * the window are the same one; and because all three go the same way round,
 * their speeds add instead of cancelling. The first is deliberately faster
 * than the other two put together, which is what stops the path ever
 * doubling back on itself and coming to a halt in the turn.
 *
 * The widths sum to one, so the path cannot leave the range a pointer gives.
 */
const TURNS: readonly Turn[] = [
  { wide: 0.68, takes: 14, from: 0 },
  { wide: 0.2, takes: 23, from: 2.1 },
  { wide: 0.12, takes: 9.4, from: 4.3 },
];

/**
 * Where the parallax looks when nobody is moving a pointer.
 *
 * A painting that only moves when touched is a still painting most of the
 * time — on a phone there is no pointer at all, and on a desk the pointer
 * leaves the window and everything stops dead. So the scene keeps drifting on
 * its own.
 *
 * **It goes round rather than back and forth.** A pair of sines, one per
 * axis, is a path that slows to a stop at each end and turns around, and a
 * painting that keeps stopping reads as a thing being nudged. A turn at a
 * steady rate never stops: the speed is the same at every moment of it.
 *
 * **And it is three turns, not one.** One is a circle, and a circle is a
 * thing you can predict after watching it once. Three of different sizes and
 * periods wander — the path is still going round, and still at a speed that
 * does not fall away, but where it goes round is never quite the same place.
 */
export class IdleDrift {
  constructor(
    /**
     * How much of the sideways range it uses up and down.
     *
     * Less than all of it: a painting drifting up and down as far as it
     * drifts sideways reads as a boat.
     */
    private readonly down = 0.72
  ) {}

  /** Where it is looking at `t` seconds: both between -1 and 1. */
  at(t: number): { x: number; y: number } {
    let x = 0;
    let y = 0;
    for (const turn of TURNS) {
      const angle = (t / turn.takes) * Math.PI * 2 + turn.from;
      x += Math.cos(angle) * turn.wide;
      y += Math.sin(angle) * turn.wide;
    }
    return { x, y: y * this.down };
  }
}
