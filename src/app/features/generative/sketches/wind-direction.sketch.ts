import { clamp, rand } from '@domain/generative/math';
import { ParticleSystem } from '@domain/generative/particles/particle-system';
import { Frame, loadImages, Sketch } from './sketch';

const IMAGES_ROUTE = 'assets/images/canvases/';
const SOURCE_COUNT = 7;

/**
 * "Wind direction" — figures drift on a wind whose angle follows the pointer
 * (and drifts on its own when idle). A "growth" value — originally live Tesla
 * stock data, now a smooth random walk nudged by vertical pointer motion —
 * decides each figure's look (angel when positive, head when negative) and
 * washes the scene green or red. Tap to add an emitter.
 *
 * The particle simulation is pure and lives in @domain/generative/particles;
 * this sketch only renders it with Canvas 2D. No external data, no API keys.
 */
export class WindDirectionSketch implements Sketch {
  private width = 0;
  private height = 0;
  private windRad = 0;
  private grow = 0;
  private systems: ParticleSystem[] = [];

  private headGirl?: HTMLImageElement;
  private angel?: HTMLImageElement;
  private head?: HTMLImageElement;

  async setup(ctx: CanvasRenderingContext2D, width: number, height: number): Promise<void> {
    this.width = width;
    this.height = height;

    const isSmall = Math.max(width, height) <= 800;
    const images = await loadImages({
      headGirl: `${IMAGES_ROUTE}head-girl_${isSmall ? 'sm' : 'md'}.png`,
      angel: `${IMAGES_ROUTE}head-angel.png`,
      head: `${IMAGES_ROUTE}head.png`,
    });
    this.headGirl = images['headGirl'];
    this.angel = images['angel'];
    this.head = images['head'];

    this.seedSystems();
    this.paintBase(ctx);
  }

  resize(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.seedSystems();
    this.paintBase(ctx);
  }

  pointerDown(x: number, y: number): void {
    this.systems.push(new ParticleSystem(x, y));
  }

  draw(ctx: CanvasRenderingContext2D, frame: Frame): void {
    if (!this.angel || !this.head || !this.headGirl) return;
    const { width, height } = this;

    this.updateForces(frame);
    this.drawBackground(ctx, frame.t);

    for (const system of this.systems) {
      system.spawn(this.windRad, this.grow);
      system.update();
      for (const particle of system.particles) {
        const img = particle.positive ? this.angel : this.head;
        ctx.save();
        ctx.globalAlpha = particle.alpha * 0.7;
        ctx.drawImage(
          img,
          particle.x - particle.size / 2,
          particle.y - particle.size / 2,
          particle.size,
          particle.size
        );
        ctx.restore();
      }
    }

    // Green when growing, red when shrinking — intensity tracks magnitude.
    const intensity = clamp(Math.abs(this.grow) / 100, 0, 1);
    ctx.save();
    ctx.globalAlpha = 0.06 + intensity * 0.12;
    ctx.fillStyle = this.grow >= 0 ? '#4dff9e' : '#ff5a5a';
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    this.drawHeadGirls(ctx);
  }

  // Wind angle follows the pointer from screen centre; drifts when idle.
  // "Growth" is a bounded random walk nudged by vertical pointer motion.
  private updateForces(frame: Frame): void {
    const { pointer, width, height } = frame;
    if (pointer.active && (Math.abs(pointer.vx) > 0.1 || Math.abs(pointer.vy) > 0.1)) {
      this.windRad = Math.atan2(pointer.y - height / 2, pointer.x - width / 2);
    } else {
      this.windRad += Math.sin(frame.t * 0.2) * 0.01 + rand(-0.01, 0.01);
    }
    const nudge = -pointer.vy * 0.4; // dragging up grows, down shrinks
    this.grow = clamp(this.grow * 0.98 + nudge + rand(-0.6, 0.6), -100, 100);
  }

  private drawBackground(ctx: CanvasRenderingContext2D, t: number): void {
    const { width, height } = this;
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, `rgba(${180 + 50 * Math.sin(t)}, 255, 220, 0.18)`);
    gradient.addColorStop(1, `rgba(255, ${180 + 50 * Math.cos(t * 0.8)}, 180, 0.18)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  private drawHeadGirls(ctx: CanvasRenderingContext2D): void {
    if (!this.headGirl) return;
    const jitter = () => Math.round(rand(-2, 2));
    ctx.save();
    ctx.globalAlpha = 0.85;
    ctx.drawImage(this.headGirl, jitter(), jitter());
    ctx.drawImage(this.headGirl, this.width / 2 + jitter(), jitter());
    ctx.drawImage(this.headGirl, this.width / 1.3 + jitter(), jitter());
    ctx.restore();
  }

  private paintBase(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, this.width, this.height);
  }

  private seedSystems(): void {
    this.systems = Array.from(
      { length: SOURCE_COUNT },
      () => new ParticleSystem(rand(0, this.width), rand(0, this.height))
    );
  }
}
