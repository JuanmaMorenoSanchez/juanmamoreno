import { clamp, map, randInt } from '@domain/generative/math';
import { Parallax } from '@domain/generative/parallax';
import { Frame, loadImages, Sketch } from './sketch';

const IMAGES_ROUTE = 'assets/images/canvases/';
const TWO_PI = Math.PI * 2;
// Slow, meditative rotation — museum video-art pace, not a screensaver.
const ROTATION_SPEED = 0.0015;
// Same tone as the top bar (Material blue-grey 900 — see theme.scss) so the
// canvas reads as the same dark surface as the rest of the page, not a
// separate black void.
const BASE_COLOR = '#263238';
// A wash of that SAME tone, painted every frame: figures dissolve into an
// identical backdrop instead of visibly shifting hue as they fade (the old
// green-tinted fade against a near-black base read as an ugly seam).
const FADE_COLOR = 'rgba(38, 50, 56, 0.035)';
// Golden-ratio conjugate: a simple, deterministic way to scatter per-cell
// phases across a full turn so neighbouring copies never pulse in lockstep.
const GOLDEN_ANGLE = 0.6180339887 * TWO_PI;

/**
 * "Believe" — a slow kaleidoscope of prayer figures woven into three
 * overlapping rings around a glowing central head. Every copy breathes its
 * own small, continuous drift in size and transparency, so the pattern never
 * holds still even at rest — an imbricated, shimmering weave rather than a
 * rigid repeat. The head and the kaleidoscope body sit at different parallax
 * depths, so they answer the pointer at different rates. Tap/click reseeds.
 *
 * Canvas 2D port of the original p5 sketch, re-scored for a slow, mystic feel.
 */
export class BelieveSketch implements Sketch {
  private width = 0;
  private height = 0;
  private angle = 0;
  private prayerNumber = 1;
  private prayerCount = 4;

  // Depth layers sharing one pointer reference: the head sits nearest (moves
  // most), the kaleidoscope body sits further back (moves least). That gap in
  // responsiveness is what reads as depth rather than everything panning as
  // one flat image.
  private readonly headParallax = new Parallax(1, 16, 0.03);
  private readonly bodyParallax = new Parallax(0.4, 26, 0.02);

  private head?: HTMLImageElement;
  private prayers: HTMLImageElement[] = [];

  async setup(ctx: CanvasRenderingContext2D, width: number, height: number): Promise<void> {
    this.width = width;
    this.height = height;

    const images = await loadImages({
      head: `${IMAGES_ROUTE}cabeza.png`,
      p1: `${IMAGES_ROUTE}pryer1.png`,
      p2: `${IMAGES_ROUTE}pryer2.png`,
      p3: `${IMAGES_ROUTE}pryer3.png`,
      p4: `${IMAGES_ROUTE}pryer4.png`,
    });
    this.head = images['head'];
    this.prayers = [images['p1'], images['p2'], images['p3'], images['p4']];

    this.paintBase(ctx);
    this.reseed();
  }

  resize(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.paintBase(ctx);
  }

  pointerDown(): void {
    this.reseed();
  }

  draw(ctx: CanvasRenderingContext2D, frame: Frame): void {
    const { width, height } = this;
    if (!this.head) return;

    ctx.fillStyle = FADE_COLOR;
    ctx.fillRect(0, 0, width, height);

    // Pointer steers the two orbit radii; a still pointer sits mid-range.
    const px = frame.pointer.active ? frame.pointer.x : width / 2;
    const py = frame.pointer.active ? frame.pointer.y : height / 2;
    const radius1 = map(px, 0, width, 20, 260);
    const radius2 = map(py, 0, height, 20, 260);

    // Shared depth reference: pointer offset from centre, normalized to
    // roughly [-1, 1] (resting at 0 when the pointer hasn't moved yet).
    const refX = frame.pointer.active ? clamp((px - width / 2) / (width / 2), -1, 1) : 0;
    const refY = frame.pointer.active ? clamp((py - height / 2) / (height / 2), -1, 1) : 0;
    this.headParallax.update(refX, refY);
    this.bodyParallax.update(refX, refY);

    ctx.save();
    ctx.shadowColor = 'rgba(150, 180, 190, 0.35)'; // soft, cool glow — no green cast
    ctx.shadowBlur = 40;
    ctx.drawImage(
      this.head,
      width / 2 - this.head.width / 2 + this.headParallax.x,
      height / 2 - this.head.height / 2 + this.headParallax.y
    );
    ctx.restore();

    ctx.save();
    ctx.translate(width / 2 + this.bodyParallax.x, height / 2 + this.bodyParallax.y);
    ctx.rotate(this.angle);
    for (let i = 0; i < this.prayerCount; i++) {
      ctx.save();
      ctx.rotate((i * TWO_PI) / this.prayerCount);
      ctx.translate(0, radius1 * 1.5);
      for (let j = 0; j < this.prayerCount; j++) {
        ctx.save();
        ctx.rotate((j * TWO_PI) / this.prayerCount);
        ctx.translate(0, radius2);
        // A third ring at the same radius but its own rotational offset: the
        // overlap between it and the j-ring is what weaves the pattern into
        // something imbricated rather than a clean, single repeat.
        for (let k = 0; k < this.prayerCount; k++) {
          ctx.save();
          ctx.rotate((k * TWO_PI) / this.prayerCount);
          ctx.translate(0, radius2);
          this.drawPrayer(ctx, frame.t, i, j, k);
          ctx.restore();
        }
        ctx.restore();
      }
      ctx.restore();
    }
    ctx.restore();

    this.angle += ROTATION_SPEED;
  }

  // Draws one copy with a small, continuous, per-cell drift in scale and
  // opacity — every instance breathes on its own cycle instead of all copies
  // looking frozen-identical.
  private drawPrayer(
    ctx: CanvasRenderingContext2D,
    t: number,
    i: number,
    j: number,
    k: number
  ): void {
    const prayer = this.prayers[this.prayerNumber - 1] ?? this.prayers[0];
    const cellIndex = (i * this.prayerCount + j) * this.prayerCount + k;
    const phase = (cellIndex * GOLDEN_ANGLE) % TWO_PI;

    const scale = 1 + 0.14 * Math.sin(t * 0.5 + phase);
    const alpha = 0.5 + 0.35 * (0.5 + 0.5 * Math.sin(t * 0.35 + phase * 1.7));

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.scale(scale, scale);
    ctx.drawImage(prayer, -30, -45, 60, 90); // centered on its own middle
    ctx.restore();
  }

  private paintBase(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = BASE_COLOR;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  private reseed(): void {
    this.prayerNumber = randInt(1, 4);
    this.prayerCount = randInt(3, 5);
  }
}
