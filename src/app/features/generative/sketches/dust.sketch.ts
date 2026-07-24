import { clamp } from '@domain/generative/math';
import { DustField } from '@domain/generative/particles/dust-field';
import { Frame, Sketch } from './sketch';

const TWO_PI = Math.PI * 2;
// Near-black with a faint cool cast, so warm motes read as suspended light.
const BASE_COLOR = '#070a0f';
// A wash of that same tone every frame: motes leave a soft, short-lived trail
// as they drift instead of hard points, which is what sells "floating in air".
const FADE_COLOR = 'rgba(7, 10, 15, 0.22)';
// Warm pale gold — dust catching a low, warm light.
const MOTE_COLOR = '255, 244, 214';
// Motes per pixel²: the count scales with the canvas area (clamped) so the
// field looks equally dense on a phone and a projector.
const DENSITY = 0.00012;

/**
 * "Dust" — a field of fine motes suspended in still air, drifting on faint
 * currents and twinkling as they catch a warm light. Moving the pointer stirs
 * a draft that pushes nearby motes aside; a tap sends a gust rippling out from
 * the spot.
 *
 * The simulation is pure @domain/generative DustField; this class only renders.
 */
export class DustSketch implements Sketch {
  private width = 0;
  private height = 0;
  private field!: DustField;

  setup(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.field = new DustField(width, height, this.count(width, height));
    this.paintBase(ctx);
  }

  resize(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.field.resize(width, height);
    this.paintBase(ctx);
  }

  pointerDown(x: number, y: number): void {
    this.field.gust(x, y, 260, Math.max(this.width, this.height) * 0.4);
  }

  draw(ctx: CanvasRenderingContext2D, frame: Frame): void {
    const { width, height } = this;

    // A moving pointer trails a soft, local draft through the field.
    const p = frame.pointer;
    if (p.active) {
      const speed = Math.hypot(p.vx, p.vy);
      if (speed > 0.5) this.field.gust(p.x, p.y, speed * 6, 120);
    }

    this.field.update(frame.dt, frame.t);

    ctx.fillStyle = FADE_COLOR;
    ctx.fillRect(0, 0, width, height);

    // Additive blending so overlapping motes bloom into brighter grains.
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const m of this.field.list) {
      const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(frame.t * m.twinkleFreq + m.phase));
      const alpha = twinkle * (0.25 + m.depth * 0.55);
      const glow = m.radius * (2 + m.depth * 3); // glow reaches past the core
      const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, glow);
      g.addColorStop(0, `rgba(${MOTE_COLOR}, ${alpha})`);
      g.addColorStop(1, `rgba(${MOTE_COLOR}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(m.x, m.y, glow, 0, TWO_PI);
      ctx.fill();
    }
    ctx.restore();
  }

  private count(width: number, height: number): number {
    return Math.round(clamp(width * height * DENSITY, 40, 220));
  }

  private paintBase(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = BASE_COLOR;
    ctx.fillRect(0, 0, this.width, this.height);
  }
}
