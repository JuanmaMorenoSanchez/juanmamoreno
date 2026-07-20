import { clamp, rand } from '@domain/generative/math';
import { Parallax } from '@domain/generative/parallax';
import { ParticleSystem } from '@domain/generative/particles/particle-system';
import { Frame, loadImages, Sketch } from './sketch';

const IMAGES_ROUTE = 'assets/images/canvases/';
const SOURCE_COUNT = 7;
// Higher = sparser emission (~1 in N frames per source). Keeps the field calm.
const SPAWN_RARITY = 16;
// Same tone as the top bar (Material blue-grey 900 — see theme.scss), so both
// generative pieces read as the same dark surface rather than a black void.
const BASE_COLOR = '#263238';

/**
 * "Wind direction" — figures drift on a slow wind whose angle follows the
 * pointer (and wanders on its own when idle). A "growth" value — originally
 * live Tesla stock data, now a gentle random walk nudged by vertical pointer
 * motion — decides each figure's look (angel when positive, head when
 * negative) and washes the scene a muted green or rose. Tap to add an emitter.
 *
 * Three depth layers share one pointer reference at different parallax
 * strengths: the background gradient barely answers (farthest), the drifting
 * particle field answers a little more (middle distance), and the foreground
 * faces answer the most (nearest). That gap in responsiveness is what reads
 * as depth rather than one flat image panning.
 *
 * The particle simulation is pure (@domain/generative/particles); this sketch
 * only renders it with Canvas 2D. No external data, no API keys.
 */
export class WindDirectionSketch implements Sketch {
  private width = 0;
  private height = 0;
  private windRad = 0;
  private grow = 0;
  private systems: ParticleSystem[] = [];

  private readonly backgroundParallax = new Parallax(0.15, 40, 0.015);
  private readonly particlesParallax = new Parallax(0.5, 30, 0.02);
  private readonly headGirlParallax = new Parallax(1, 22, 0.03);

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

    // Shared depth reference: pointer offset from centre, normalized to
    // roughly [-1, 1] (resting at 0 when the pointer hasn't moved yet).
    const { pointer } = frame;
    const refX = pointer.active ? clamp((pointer.x - width / 2) / (width / 2), -1, 1) : 0;
    const refY = pointer.active ? clamp((pointer.y - height / 2) / (height / 2), -1, 1) : 0;
    this.backgroundParallax.update(refX, refY);
    this.particlesParallax.update(refX, refY);
    this.headGirlParallax.update(refX, refY);

    this.drawBackground(ctx, frame.t);

    ctx.save();
    ctx.translate(this.particlesParallax.x, this.particlesParallax.y);
    for (const system of this.systems) {
      system.spawn(this.windRad, this.grow, SPAWN_RARITY);
      system.update();
      for (const particle of system.particles) {
        const img = particle.positive ? this.angel : this.head;
        ctx.save();
        ctx.globalAlpha = particle.alpha * 0.55; // soft, veiled figures
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
    ctx.restore();

    // Muted green when growing, muted rose when shrinking — a slow mood wash.
    const intensity = clamp(Math.abs(this.grow) / 100, 0, 1);
    ctx.save();
    ctx.globalAlpha = 0.035 + intensity * 0.07;
    ctx.fillStyle = this.grow >= 0 ? '#6fae8e' : '#b06a7c';
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    this.drawHeadGirls(ctx, frame.t);
  }

  // Wind angle eases toward the pointer's bearing from centre; wanders slowly
  // when idle. "Growth" is a gentle, smoothed random walk nudged by vertical
  // pointer motion.
  private updateForces(frame: Frame): void {
    const { pointer, width, height } = frame;
    if (pointer.active && (Math.abs(pointer.vx) > 0.1 || Math.abs(pointer.vy) > 0.1)) {
      const target = Math.atan2(pointer.y - height / 2, pointer.x - width / 2);
      this.windRad += (target - this.windRad) * 0.05; // ease, don't snap
    } else {
      this.windRad += Math.sin(frame.t * 0.1) * 0.006 + rand(-0.005, 0.005);
    }
    const nudge = -pointer.vy * 0.25; // dragging up grows, down shrinks
    this.grow = clamp(this.grow * 0.99 + nudge + rand(-0.3, 0.3), -100, 100);
  }

  // Farthest layer: the gradient's own anchor points drift with the parallax
  // offset, so the wash itself subtly shifts instead of standing dead still.
  private drawBackground(ctx: CanvasRenderingContext2D, t: number): void {
    const { width, height } = this;
    const slow = t * 0.35;
    const { x: dx, y: dy } = this.backgroundParallax;
    const gradient = ctx.createLinearGradient(dx, dy, width + dx, height + dy);
    gradient.addColorStop(0, `rgba(${140 + 30 * Math.sin(slow)}, 200, 180, 0.1)`);
    gradient.addColorStop(1, `rgba(200, ${140 + 30 * Math.cos(slow * 0.8)}, 160, 0.1)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  // Nearest layer: large, near-still faces along the top — a slow vertical
  // breathing plus the foreground parallax shift.
  private drawHeadGirls(ctx: CanvasRenderingContext2D, t: number): void {
    if (!this.headGirl) return;
    const positions = [0, this.width / 2, this.width / 1.3];
    const { x: px, y: py } = this.headGirlParallax;
    ctx.save();
    ctx.globalAlpha = 0.7;
    positions.forEach((x, i) => {
      const bob = Math.sin(t * 0.25 + i) * 4;
      ctx.drawImage(this.headGirl!, x + px, bob + py);
    });
    ctx.restore();
  }

  private paintBase(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = BASE_COLOR;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  private seedSystems(): void {
    this.systems = Array.from(
      { length: SOURCE_COUNT },
      () => new ParticleSystem(rand(0, this.width), rand(0, this.height))
    );
  }
}
