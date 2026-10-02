import { Ember, emberLook, emberProgress, Embers } from './embers';

/** A frame 1000px on its smaller side, so shares read as percentages. */
const SCALE = 1000;

describe('Embers', () => {
  let embers: Embers;

  beforeEach(() => {
    embers = new Embers(SCALE);
  });

  /** Straight up, which is where a tube points. */
  const up = -Math.PI / 2;

  it('throws nothing until it is fired', () => {
    expect(embers.count).toBe(0);
  });

  it('throws the number of sparks it is asked for', () => {
    embers.burst(100, 100, up, 0.4, 40);

    expect(embers.count).toBe(40);
  });

  /**
   * Fire first, weathering into smoke. A burst that starts as a cloud reads as
   * a puff of dust rather than something igniting.
   */
  it('throws more fire than smoke', () => {
    embers.burst(100, 100, up, 0.4, 300);

    const sparks = embers.particles.filter((e) => e.kind === 'spark').length;
    expect(sparks).toBeGreaterThan(embers.count / 2);
  });

  /**
   * A rocket in a tube throws its exhaust out of the mouth, which is a cone —
   * not a sphere. Everything should leave in roughly the aimed direction.
   */
  it('throws everything within the cone it is aimed in', () => {
    embers.burst(0, 0, up, 0.5, 120);

    for (const ember of embers.particles) {
      const angle = Math.atan2(ember.vy, ember.vx);
      expect(Math.abs(angle - up)).toBeLessThanOrEqual(0.5 + 1e-9);
    }
  });

  /**
   * One emitter sliding along draws a stripe however much the particles
   * scatter afterwards. Coming out of a patch is what makes it read as burning
   * gas filling a region rather than as an effect on a line.
   */
  it('throws out of an area when given one', () => {
    embers.burst(500, 500, up, 0.4, 80, 60);

    const spread = embers.particles.map((e) => Math.hypot(e.x - 500, e.y - 500));
    expect(Math.max(...spread)).toBeGreaterThan(20);
    // Never outside the patch it was given.
    expect(Math.max(...spread)).toBeLessThanOrEqual(60 + 1e-9);
  });

  it('throws from the exact point when given no area', () => {
    embers.burst(500, 500, up, 0.4, 20);

    for (const ember of embers.particles) {
      expect(ember.x).toBe(500);
      expect(ember.y).toBe(500);
    }
  });

  /**
   * Evenly spread across a cone looks like a shape, which is the thing that
   * gives a particle effect away. Most of it should go the way the rocket
   * went, with the edges ragged.
   */
  it('sends most of it the way it was aimed, not evenly across the cone', () => {
    embers.burst(0, 0, up, 1, 400);

    const offBy = embers.particles.map((e) => Math.abs(Math.atan2(e.vy, e.vx) - up));
    const nearTheMiddle = offBy.filter((d) => d < 0.5).length;

    // An even spread would put half of them inside half the cone.
    expect(nearTheMiddle / offBy.length).toBeGreaterThan(0.6);
  });

  it('scales its speeds to the frame, so a phone is not a drizzle', () => {
    const small = new Embers(100);
    small.burst(0, 0, up, 0.1, 60);
    embers.burst(0, 0, up, 0.1, 60);

    const fastest = (field: Embers) =>
      Math.max(...field.particles.map((e) => Math.hypot(e.vx, e.vy)));

    expect(fastest(embers)).toBeGreaterThan(fastest(small) * 5);
  });

  it('clears out what has burnt away', () => {
    embers.burst(0, 0, up, 0.4, 50);

    for (let i = 0; i < 400; i++) embers.update(0.05);

    expect(embers.count).toBe(0);
  });

  /** Sparks are a blink; smoke hangs about after they have gone. */
  it('lets the smoke outlive the fire', () => {
    embers.burst(0, 0, up, 0.4, 300);

    for (let i = 0; i < 20; i++) embers.update(0.05);

    const left = embers.particles.map((e) => e.kind);
    expect(left.length).toBeGreaterThan(0);
    expect(left.every((kind) => kind === 'smoke')).toBe(true);
  });

  /** The launch impulse dies away rather than carrying everything off-screen. */
  it('slows what it threw', () => {
    embers.burst(0, 0, up, 0.05, 40);
    const atBirth = Math.hypot(embers.particles[0].vx, embers.particles[0].vy);

    embers.update(0.05);
    embers.update(0.05);

    expect(Math.hypot(embers.particles[0].vx, embers.particles[0].vy)).toBeLessThan(atBirth);
  });

  /**
   * A tab left in the background and come back to hands over one enormous step.
   * Letting it through would teleport the burst off the frame in a single
   * frame, and the piece would be empty on return.
   */
  it('refuses a step so large it would teleport everything', () => {
    embers.burst(0, 0, up, 0.05, 20);
    const watched = embers.particles[0];
    const startedAt = watched.y;
    const speed = Math.abs(watched.vy);

    // Half a minute away, handed over as one step.
    embers.update(30);

    // It moved no further than a single clamped step could carry it, and that
    // is the whole point: the piece should be where it was, not off the frame.
    // Compared against its own velocity rather than another burst's, which was
    // two different sets of random numbers pretending to be a measurement.
    expect(Math.abs(watched.y - startedAt)).toBeLessThanOrEqual(speed * 0.05 + SCALE * 0.02);
  });

  it('forgets everything when the loop starts again', () => {
    embers.burst(0, 0, up, 0.4, 50);
    embers.clear();

    expect(embers.count).toBe(0);
  });

  it('keeps measuring against the frame after a resize', () => {
    embers.rescale(200);
    embers.burst(0, 0, up, 0.1, 30);

    const fastest = Math.max(...embers.particles.map((e) => Math.hypot(e.vx, e.vy)));
    expect(fastest).toBeLessThan(SCALE * 0.5);
  });
});

describe('what an ember looks like', () => {
  const ember = (kind: 'spark' | 'smoke', age: number, life = 1, heat = 1): Ember => ({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    kind,
    radius: 1,
    age,
    life,
    heat,
  });

  it('measures how far through its life it is', () => {
    expect(emberProgress(ember('spark', 0))).toBe(0);
    expect(emberProgress(ember('spark', 0.5))).toBe(0.5);
    expect(emberProgress(ember('spark', 2))).toBe(1);
    // Nothing divides by nothing.
    expect(emberProgress(ember('spark', 0, 0))).toBe(1);
  });

  /** White-hot, then orange, then the red it dies at. */
  it('cools a spark as it burns', () => {
    const young = emberLook(ember('spark', 0));
    const old = emberLook(ember('spark', 0.9));

    const greenOf = (look: { color: string }) => Number(look.color.split(',')[1]);
    expect(greenOf(young)).toBeGreaterThan(greenOf(old));
    expect(young.alpha).toBeGreaterThan(old.alpha);
  });

  /** Smoke is never as solid as fire, or it would hide the painting. */
  it('keeps smoke faint', () => {
    expect(emberLook(ember('smoke', 0)).alpha).toBeLessThan(0.5);
    expect(emberLook(ember('smoke', 0.99)).alpha).toBeLessThan(0.05);
  });

  it('fades everything to nothing by the end', () => {
    expect(emberLook(ember('spark', 1)).alpha).toBe(0);
    expect(emberLook(ember('smoke', 1)).alpha).toBe(0);
  });

  /**
   * Every spark leaving at the same white made the burst read as a sparkler:
   * uniform and obviously added. A cool one never passes through white at all.
   */
  it('gives a cool spark a different colour from a hot one', () => {
    const hot = emberLook(ember('spark', 0, 1, 1));
    const cool = emberLook(ember('spark', 0, 1, 0.25));

    const blueOf = (look: { color: string }) => Number(look.color.split(',')[2]);
    expect(blueOf(hot)).toBeGreaterThan(blueOf(cool));
    expect(hot.alpha).toBeGreaterThan(cool.alpha);
  });
});
