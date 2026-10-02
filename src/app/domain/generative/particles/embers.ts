import { rand, randInt } from '../math';

/**
 * What a rocket throws out when it leaves the tube: sparks, and the smoke they
 * become.
 *
 * Pure simulation, like everything else here — it holds positions and
 * lifespans and advances them, and knows nothing about a canvas. The renderer
 * reads `particles` each frame and decides what a spark looks like.
 *
 * One class rather than two because they are one event. A launch throws
 * burning propellant outward from the tube mouth; the light bits burn out in a
 * few tenths of a second, the heavy ones cool, slow and hang as smoke. Same
 * origin, same impulse, different mass — which is the only thing that really
 * differs between a spark and the dust it leaves.
 */

export type EmberKind = 'spark' | 'smoke';

export interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  kind: EmberKind;
  /** Pixels. Smoke starts small and swells; a spark does not. */
  radius: number;
  /** Seconds lived, and the total it gets. */
  age: number;
  life: number;
  /**
   * How hot this one started, 0 to 1.
   *
   * Every spark leaving at the same white made the burst read as a sparkler:
   * uniform, decorative, obviously added. Real exhaust throws a few white-hot
   * ones and a lot of duller orange, and the spread is most of what makes it
   * look like burning rather than like sparkling.
   */
  heat: number;
}

/** How fast a spark leaves the mouth, as a share of the frame's smaller side. */
const SPARK_SPEED = [0.35, 1.15] as const;
/** Smoke leaves slowly: it is what is left when the fast part has gone. */
const SMOKE_SPEED = [0.05, 0.3] as const;

/** Seconds. A spark is a blink; smoke hangs about. */
const SPARK_LIFE = [0.25, 0.7] as const;
const SMOKE_LIFE = [1.4, 3.2] as const;

/** Downward pull and air drag, per second, as shares of the frame. */
const GRAVITY = 0.22;
const SPARK_DRAG = 2.4;
const SMOKE_DRAG = 1.1;
/** Smoke rises once it has slowed: hot gas, and it reads as lift. */
const SMOKE_LIFT = 0.16;

/** Nothing is gained by simulating more than this, and a phone notices. */
const CEILING = 420;

export class Embers {
  private readonly pool: Ember[] = [];

  /**
   * @param scale The frame's smaller side in pixels, which every speed and
   *   size here is expressed as a share of — so the burst looks the same on a
   *   phone as on a projector rather than becoming a drizzle on one of them.
   */
  constructor(private scale: number) {}

  get particles(): readonly Ember[] {
    return this.pool;
  }

  get count(): number {
    return this.pool.length;
  }

  /** The frame changed size; everything is measured against it. */
  rescale(scale: number): void {
    this.scale = scale;
  }

  /**
   * Throws a burst out from one point, in a cone.
   *
   * `aim` is the direction the exhaust goes, in radians, and `spread` how wide
   * a cone around it. A rocket in a tube throws its exhaust back down the tube
   * and out of the mouth, which is a narrow cone, not a sphere.
   */
  burst(x: number, y: number, aim: number, spread: number, sparks: number): void {
    for (let i = 0; i < sparks; i++) {
      if (this.pool.length >= CEILING) return;

      // Two in three are sparks: the burst should read as fire first and
      // weather into smoke, not start as a cloud.
      const kind: EmberKind = randInt(0, 2) === 0 ? 'smoke' : 'spark';
      const angle = aim + rand(-spread, spread);
      const [low, high] = kind === 'spark' ? SPARK_SPEED : SMOKE_SPEED;
      const speed = rand(low, high) * this.scale;
      const [shortest, longest] = kind === 'spark' ? SPARK_LIFE : SMOKE_LIFE;

      this.pool.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        kind,
        radius: (kind === 'spark' ? rand(0.0015, 0.004) : rand(0.02, 0.05)) * this.scale,
        age: 0,
        life: rand(shortest, longest),
        heat: rand(0.25, 1),
      });
    }
  }

  /** Advances everything by `dt` seconds and clears out what has burnt away. */
  update(dt: number): void {
    const step = Math.min(dt, 0.05); // a tab left in the background, returned to

    for (let i = this.pool.length - 1; i >= 0; i--) {
      const ember = this.pool[i];
      const drag = ember.kind === 'spark' ? SPARK_DRAG : SMOKE_DRAG;

      // Drag first, so the launch impulse dies away rather than carrying on.
      const slowing = Math.max(0, 1 - drag * step);
      ember.vx *= slowing;
      ember.vy *= slowing;
      ember.vy +=
        (ember.kind === 'spark' ? GRAVITY : GRAVITY * 0.25 - SMOKE_LIFT) * this.scale * step;

      ember.x += ember.vx * step;
      ember.y += ember.vy * step;
      ember.age += step;

      // Smoke swells as it cools and spreads.
      if (ember.kind === 'smoke') ember.radius += this.scale * 0.012 * step;

      if (ember.age >= ember.life) this.pool.splice(i, 1);
    }
  }

  /** Nothing left burning. Used when the loop restarts. */
  clear(): void {
    this.pool.length = 0;
  }
}

/** How far through its life an ember is, 0 at birth and 1 at the end. */
export function emberProgress(ember: Ember): number {
  return ember.life > 0 ? Math.min(1, ember.age / ember.life) : 1;
}

/**
 * What an ember looks like now: white-hot, then orange, then the grey it
 * leaves behind. Returned as a colour and an opacity so the renderer only has
 * to draw a circle.
 */
export function emberLook(ember: Ember): { color: string; alpha: number } {
  const through = emberProgress(ember);

  if (ember.kind === 'smoke') {
    // Warm, and faint enough to be weather rather than a lid.
    //
    // It was a neutral grey at nearly four tenths opacity, and it sat on the
    // painted plume as a flat blob — a colour from nowhere in the painting,
    // hiding the best part of it. The paint is pink and ochre, so the smoke is
    // too, and it thins almost to nothing: this is meant to extend what he
    // painted, not to cover it.
    const warm = Math.round(170 + through * 40);
    return {
      color: `${warm}, ${Math.round(warm * 0.82)}, ${Math.round(warm * 0.76)}`,
      alpha: (1 - through) * 0.12,
    };
  }

  // A spark cools: its own heat, to yellow, to the red it dies at. A cool one
  // never passes through white at all, which is what keeps the burst from
  // reading as uniform.
  const red = 255;
  const green = Math.round(150 + ember.heat * 95 - through * 150);
  const blue = Math.round(70 + ember.heat * 135 - through * 195);
  return {
    color: `${red}, ${Math.max(60, green)}, ${Math.max(20, blue)}`,
    alpha: (1 - through * through) * (0.5 + ember.heat * 0.5),
  };
}
