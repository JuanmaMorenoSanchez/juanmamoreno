import { map, randInt } from '@domain/generative/math';
import { Frame, loadImages, Sketch } from './sketch';

const IMAGES_ROUTE = 'assets/images/canvases/';
const TWO_PI = Math.PI * 2;
const ROTATION_SPEED = 0.005;
// Frames between each translucent green wash that leaves the kaleidoscope trail.
const FADE_INTERVAL = 10;

/**
 * "Believe" — a kaleidoscope of prayer figures rotating around a central head,
 * their radius driven by the pointer. A translucent green wash every few frames
 * leaves the characteristic trailing echo. Tap/click reseeds the pattern.
 *
 * Canvas 2D port of the original p5 sketch (no rendering library).
 */
export class BelieveSketch implements Sketch {
  private width = 0;
  private height = 0;
  private angle = 0;
  private frame = 0;
  private prayerNumber = 1;
  private prayerCount = 4;

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

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
    this.reseed();
  }

  resize(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    this.width = width;
    this.height = height;
    // The backing store was cleared on resize; repaint the white base so it
    // covers the full (newly sized) canvas.
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
    this.frame = 0;
  }

  pointerDown(): void {
    this.reseed();
  }

  draw(ctx: CanvasRenderingContext2D, frame: Frame): void {
    const { width, height } = this;
    if (!this.head) return;

    // Periodic translucent green wash → trailing echo of previous frames.
    if (this.frame > FADE_INTERVAL) {
      ctx.fillStyle = 'rgba(0, 255, 0, 0.04)';
      ctx.fillRect(0, 0, width, height);
      this.frame = 0;
    }
    this.frame++;

    // Pointer maps to the two orbit radii; a still pointer sits mid-range.
    const px = frame.pointer.active ? frame.pointer.x : width / 2;
    const py = frame.pointer.active ? frame.pointer.y : height / 2;
    const radius1 = map(px, 0, width, 10, 300);
    const radius2 = map(py, 0, height, 10, 300);

    ctx.drawImage(
      this.head,
      width / 2 - this.head.width / 2,
      height / 2 - this.head.height / 2
    );

    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(this.angle);
    for (let i = 0; i < this.prayerCount; i++) {
      ctx.save();
      ctx.rotate((i * TWO_PI) / this.prayerCount);
      ctx.translate(0, radius1 * 1.5);
      for (let j = 0; j < this.prayerCount; j++) {
        ctx.save();
        ctx.rotate((j * TWO_PI) / this.prayerCount);
        ctx.translate(0, radius2);
        this.drawPrayer(ctx);
        ctx.restore();
      }
      ctx.restore();
    }
    ctx.restore();

    this.angle += ROTATION_SPEED;
  }

  private drawPrayer(ctx: CanvasRenderingContext2D): void {
    const prayer = this.prayers[this.prayerNumber - 1] ?? this.prayers[0];
    // Centered so it rotates around its own middle.
    ctx.drawImage(prayer, -30, -45, 60, 90);
  }

  private reseed(): void {
    this.prayerNumber = randInt(1, 4);
    this.prayerCount = randInt(3, 6);
  }
}
