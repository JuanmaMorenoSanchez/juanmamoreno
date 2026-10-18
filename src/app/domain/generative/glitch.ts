/** One torn strip of the picture, while it is changing over. */
export interface Band {
  /** Where it starts, as a share of the frame. */
  top: number;
  /** How tall it is, as a share of the frame. */
  high: number;
  /** Which of the two states this strip is showing. */
  from: 0 | 1;
  /** How far sideways it is shoved, as a share of the width. */
  shove: number;
}

/**
 * Two states of a picture, and the broken moment between them.
 *
 * The painting exists twice — at dusk and in daylight — and this says which
 * of the two is up, when it changes, and what the change looks like while it
 * is happening. It does not look like a dissolve. A signal changing over does
 * it in torn horizontal strips, some of them still showing the old picture,
 * some shoved sideways, all of them re-drawn several times a second, and then
 * it is simply the other picture.
 *
 * **The strips are redrawn on their own clock**, twelve times a second rather
 * than per frame, because a tear that moves smoothly is a wipe. Everything is
 * arithmetic of `t`, so the same second always tears the same way and a page
 * reopened does not jump.
 */
export class Glitch {
  constructor(
    /** About how long a state is held, in seconds. */
    private readonly holds = 9,
    /** How long the tearing lasts around a change, in seconds. */
    private readonly tears = 0.55,
    /** A number of its own, so two of these do not change together. */
    private readonly seed = 0
  ) {}

  /** Which state is up at `t`, and how broken the picture is. */
  at(t: number): { shows: 0 | 1; tearing: number } {
    const index = this.indexAt(t);
    const since = t - this.changesAt(index);
    const until = this.changesAt(index + 1) - t;

    // A hard attack as the new state arrives and a shorter rattle before the
    // next one, so it reads as a thing breaking rather than as a fade.
    const after = since < this.tears ? 1 - since / this.tears : 0;
    const before = until < this.tears * 0.5 ? 1 - until / (this.tears * 0.5) : 0;

    return {
      shows: (((index % 2) + 2) % 2) as 0 | 1,
      tearing: Math.max(after, before) ** 1.6,
    };
  }

  /**
   * The nth torn strip at `t`.
   *
   * Asked for by number rather than handed back as a list, so a frame that
   * wants eight of them allocates nothing.
   */
  band(t: number, which: number): Band {
    const index = this.indexAt(t);
    // Twelve times a second: the strips jump rather than slide.
    const step = Math.floor(t * 12);
    const draw = (salt: number) => level(index * 977 + which * 131 + step * 17 + salt + this.seed);

    const top = draw(1) * 0.96;
    return {
      top,
      high: 0.015 + draw(2) ** 2 * 0.13,
      from: (draw(3) < 0.5 ? 0 : 1) as 0 | 1,
      shove: (draw(4) - 0.5) * 0.14,
    };
  }

  /** Which interval `t` falls in. */
  private indexAt(t: number): number {
    let index = Math.floor(t / this.holds);
    while (this.changesAt(index) > t) index--;
    while (this.changesAt(index + 1) <= t) index++;
    return index;
  }

  /**
   * When the nth change happens, in seconds.
   *
   * Near the nth beat and pushed either side of it, so it is never on a
   * count. Under half a beat of wander, which is what keeps one change from
   * overtaking the next.
   */
  private changesAt(index: number): number {
    return (index + (level(index * 53 + 7 + this.seed) - 0.5) * 0.5) * this.holds;
  }
}

/** A repeatable pseudo-random number in 0..1. */
function level(index: number): number {
  const mixed = Math.sin(index * 12.9898) * 43758.5453;
  return mixed - Math.floor(mixed);
}
