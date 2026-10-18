import { rand, randInt } from './math';

/** One falling speck. Position in 0..1 of the frame, so it survives a resize. */
export interface Flake {
  /** Across, 0 at the left edge and 1 at the right. */
  x: number;
  /** Down, 0 at the top and 1 at the bottom. */
  y: number;
  /** Radius in pixels at a thousand-pixel frame, scaled by the renderer. */
  size: number;
  /** How solid it is, which also reads as how near. */
  alpha: number;
  /** Downward speed, in fractions of the frame per second. */
  fall: number;
  /** How far it swings either side, and where in that swing it is. */
  sway: number;
  phase: number;
}

/**
 * Snow: specks that cross the frame from the top and are gone at the bottom.
 *
 * Held in fractions of the frame rather than pixels, so a window resized
 * mid-fall does not teleport the snow or leave a column of it where the frame
 * used to end. The renderer multiplies by the size it is drawing at.
 *
 * **Not the dust field.** That one is blown figures with a wind angle and a
 * life that runs out; this falls, sways and leaves, and the only thing it is
 * for is weather.
 */
export class Snowfall {
  private readonly flakes: Flake[] = [];
  private pending = 0;

  constructor(
    /** How many are in the air once it has settled into a rhythm. */
    private readonly most = 90,
    /** How many arrive per second, which decides how long filling takes. */
    private readonly rate = 14
  ) {}

  get specks(): readonly Flake[] {
    return this.flakes;
  }

  /**
   * Fills the frame as if it had been snowing for a while.
   *
   * Without this the first seconds are an empty sky with a line of snow
   * descending into it, which reads as a thing starting rather than as
   * weather that was already happening.
   */
  seed(): void {
    for (let at = 0; at < this.most; at++) {
      this.flakes.push({ ...this.born(), y: rand(0, 1) });
    }
  }

  update(dt: number): void {
    // Arrivals are counted in whole flakes, so a frame that takes 4ms does
    // not round a tenth of a flake up to one and triple the snowfall.
    this.pending += dt * this.rate;
    while (this.pending >= 1 && this.flakes.length < this.most) {
      this.pending -= 1;
      this.flakes.push(this.born());
    }

    for (let at = this.flakes.length - 1; at >= 0; at--) {
      const flake = this.flakes[at];
      flake.y += flake.fall * dt;
      flake.phase += dt;
      if (flake.y > 1.05) this.flakes.splice(at, 1);
    }
  }

  /** Where a speck is now, across, with its sway. Still in 0..1. */
  across(flake: Flake): number {
    return flake.x + Math.sin(flake.phase * 0.6) * flake.sway;
  }

  private born(): Flake {
    // Near flakes are bigger, more solid and faster, which is the whole of
    // the depth in this: three numbers drawn from one.
    const near = rand(0, 1);
    return {
      x: rand(-0.05, 1.05),
      y: -0.02,
      size: 1.1 + near * 3.3,
      alpha: 0.34 + near * 0.56,
      fall: 0.014 + near * 0.05,
      sway: rand(0.004, 0.02),
      phase: randInt(0, 600) / 100,
    };
  }
}
