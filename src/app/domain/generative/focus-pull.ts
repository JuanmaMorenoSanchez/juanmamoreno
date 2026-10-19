/**
 * How deep the field is, over time.
 *
 * **The focus itself never leaves her.** It was a focus pull at first, off
 * her and out to the landscape and back, and it put the subject of the
 * painting out of focus for seven seconds at a time — his paint, softened,
 * which is the one thing he has said is never acceptable. What travels is
 * the depth of field instead: the distance behind her opens up and closes
 * again, so sometimes the whole scene is there and sometimes only she is,
 * and she is sharp throughout.
 *
 * And it travels the way a lens does, which is not at a constant rate and
 * not for equal times at each end: it rests, moves, and rests again, and the
 * resting is most of it.
 *
 * Pure arithmetic of `t`, like everything else that moves here, so the same
 * second always gives the same field and a page reopened does not jump.
 */
export class FocusPull {
  constructor(
    /** How much of the far blur is showing when the field is shallow. */
    private readonly near = 0.85,
    /** And when it has opened up, which is nearly everything in focus. */
    private readonly far = 0.12,
    /** Seconds resting shallow, with only her in focus. */
    private readonly rests = 11,
    /** Seconds resting open. Shorter: it is the away. */
    private readonly waits = 6,
    /** Seconds spent travelling, each way. */
    private readonly travels = 3.5
  ) {}

  /** How long one there-and-back takes. */
  get cycle(): number {
    return this.rests + this.waits + this.travels * 2;
  }

  /** How much of the distance is soft at `t` seconds, between the two. */
  at(t: number): number {
    const cycle = this.cycle;
    const into = ((t % cycle) + cycle) % cycle;

    if (into < this.rests) return this.near;

    const going = into - this.rests;
    if (going < this.travels) {
      return this.near + (this.far - this.near) * smooth(going / this.travels);
    }

    const waiting = going - this.travels;
    if (waiting < this.waits) return this.far;

    return this.far + (this.near - this.far) * smooth((waiting - this.waits) / this.travels);
  }
}

/** Smoothstep, so focus arrives rather than snaps. */
function smooth(at: number): number {
  return at * at * (3 - 2 * at);
}
