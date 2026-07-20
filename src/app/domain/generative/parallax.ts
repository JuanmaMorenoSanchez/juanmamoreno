/**
 * Parallax layer. Maps a normalized reference — e.g. the pointer's offset from
 * the centre, each axis roughly in [-1, 1] — to a positional shift, easing
 * toward the target so the motion feels smooth. Nearer layers (higher `depth`)
 * shift more than far ones, so when several layers with different depths track
 * the same reference they read as separated in space.
 *
 * reference, then translates by `x` / `y`.
 */
export class Parallax {
  private currentX = 0;
  private currentY = 0;

  /**
   * @param depth    Relative motion — 0 (far, still) to 1 (near, full).
   * @param maxShift Shift in pixels at the reference extremes (|ref| = 1).
   * @param ease     Smoothing per update — 1 snaps instantly, < 1 eases in.
   */
  constructor(
    private readonly depth: number,
    private readonly maxShift: number,
    private readonly ease = 1
  ) {}

  /** Eases toward the shift implied by the reference position. */
  update(refX: number, refY: number): void {
    const targetX = refX * this.depth * this.maxShift;
    const targetY = refY * this.depth * this.maxShift;
    this.currentX += (targetX - this.currentX) * this.ease;
    this.currentY += (targetY - this.currentY) * this.ease;
  }

  get x(): number {
    return this.currentX;
  }

  get y(): number {
    return this.currentY;
  }

  reset(): void {
    this.currentX = 0;
    this.currentY = 0;
  }
}
