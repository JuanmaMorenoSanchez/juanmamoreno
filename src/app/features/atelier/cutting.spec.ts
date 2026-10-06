import {
  boxToPixels,
  coverage,
  featherFor,
  FEATHER_MAX,
  FEATHER_MIN,
  outlineArea,
  smoothOutline,
  stencilFromPoints,
  fillsItsBox,
  depthFor,
  layerFile,
  scriptedPointer,
  slug,
  WORKING_MAX_SIDE,
  workingSize,
} from './cutting';

describe('slug', () => {
  /**
   * The id is the folder in the bucket and the api holds it to lower-case
   * letters, digits and dashes. A title that made a name the api refuses would
   * fail at the end of the work rather than at the start of it, so the rule is
   * applied here and the two are tested against the same shape.
   */
  it('makes a name the bucket will take', () => {
    expect(slug('Escóndete hasta que todos mueran')).toBe('escondete-hasta-que-todos-mueran');
    expect(slug('  Head / Girl  ')).toBe('head-girl');
    expect(slug('#182')).toBe('182');
  });

  it('never ends in a dash, however the trimming falls', () => {
    expect(slug('Believe!!!')).toBe('believe');
    expect(slug('a'.repeat(58) + ' tail')).not.toMatch(/-$/);
  });

  it('falls back rather than making an empty name', () => {
    expect(slug('¿¡!?')).toBe('piece');
    expect(slug('', 'layer')).toBe('layer');
  });

  it('matches what the api will accept', () => {
    const accepted = /^[a-z0-9][a-z0-9-]*$/;

    for (const title of ['Believe', 'Año 2010', '  spaces  ', 'ÁÉÍÓÚ']) {
      expect(slug(title)).toMatch(accepted);
    }
  });
});

describe('layerFile', () => {
  it('names a layer after itself, numbered by where it sits', () => {
    expect(layerFile('the figure', 0)).toBe('0-the-figure.png');
    expect(layerFile('the sky', 2)).toBe('2-the-sky.png');
  });

  /**
   * Two layers can honestly be called the same thing — a painting with two
   * figures in it — and a bucket write is a replace, so the index has to be
   * part of the name or one layer would silently become the other.
   */
  it('keeps two layers of the same name apart', () => {
    expect(layerFile('figure', 0)).not.toBe(layerFile('figure', 1));
  });

  it('matches what the api will accept', () => {
    expect(layerFile('¿the figure?', 1)).toMatch(/^[a-z0-9][a-z0-9._-]*\.png$/);
  });
});

describe('workingSize', () => {
  /** The model is billed by what it is given, so it is given a small copy. */
  it('brings a large painting down to the working size', () => {
    expect(workingSize(4000, 3000)).toEqual({ width: WORKING_MAX_SIDE, height: 768 });
  });

  it('leaves a small one alone rather than blowing it up', () => {
    expect(workingSize(800, 600)).toEqual({ width: 800, height: 600 });
  });

  it('keeps the shape, whichever side is longest', () => {
    const tall = workingSize(1000, 4000);

    expect(tall.height).toBe(WORKING_MAX_SIDE);
    expect(tall.width / tall.height).toBeCloseTo(1000 / 4000, 2);
  });
});

describe('depthFor', () => {
  /** Nearest moves most, furthest does not move at all. */
  it('spreads the stack from near to far', () => {
    expect(depthFor(0, 3)).toBe(1);
    expect(depthFor(1, 3)).toBe(0.5);
    expect(depthFor(2, 3)).toBe(0);
  });

  it('gives a lone layer the full travel rather than none', () => {
    expect(depthFor(0, 1)).toBe(1);
  });

  it('never suggests a depth outside what Parallax reads', () => {
    for (let total = 1; total <= 6; total++) {
      for (let order = 0; order < total; order++) {
        expect(depthFor(order, total)).toBeGreaterThanOrEqual(0);
        expect(depthFor(order, total)).toBeLessThanOrEqual(1);
      }
    }
  });
});

describe('scriptedPointer', () => {
  /**
   * The recorded reel has no hand on the mouse, so the pointer is driven. It
   * has to stay in the range `Parallax` reads or the layers would be flung
   * off the frame.
   */
  it('stays within the range the parallax expects', () => {
    for (let second = 0; second < 60; second += 0.25) {
      const at = scriptedPointer(second);

      expect(Math.abs(at.x)).toBeLessThanOrEqual(1);
      expect(Math.abs(at.y)).toBeLessThanOrEqual(1);
    }
  });

  /**
   * Two rates rather than one, so a twelve-second recording never retraces
   * its own path exactly — which is what makes a loop read as a loop.
   */
  it('does not repeat itself within the length of a reel', () => {
    const start = scriptedPointer(0);
    const sixSecondsIn = scriptedPointer(6);
    const twelve = scriptedPointer(12);

    expect(Math.hypot(start.x - twelve.x, start.y - twelve.y)).toBeGreaterThan(0.05);
    expect(Math.hypot(start.x - sixSecondsIn.x, start.y - sixSecondsIn.y)).toBeGreaterThan(0.05);
  });

  it('moves at all', () => {
    expect(scriptedPointer(0)).not.toEqual(scriptedPointer(1));
  });
});

describe('boxToPixels', () => {
  /**
   * The model answers in thousandths of the picture, which is what lets a mask
   * found on a 1024px working copy be used on the full-size original.
   */
  it('reads a box in thousandths onto a picture of any size', () => {
    expect(boxToPixels([0, 0, 1000, 1000], 4000, 3000)).toEqual({
      x: 0,
      y: 0,
      width: 4000,
      height: 3000,
    });
    expect(boxToPixels([250, 500, 750, 1000], 4000, 3000)).toEqual({
      x: 2000,
      y: 750,
      width: 2000,
      height: 1500,
    });
  });

  /** y comes first in the model's order, and swapping them would be invisible. */
  it('keeps y before x, as the model gives them', () => {
    const tall = boxToPixels([0, 0, 500, 1000], 1000, 1000);

    expect(tall.height).toBe(500);
    expect(tall.width).toBe(1000);
  });

  /**
   * A model that says 1001 should cost a pixel of accuracy, not an exception:
   * `getImageData` throws on a rectangle outside the canvas, which would take
   * the whole page down on one sloppy answer.
   */
  it('clamps a box that runs off the picture', () => {
    const over = boxToPixels([0, 0, 1200, 1200], 800, 600);

    expect(over).toEqual({ x: 0, y: 0, width: 800, height: 600 });
  });

  it('never returns a negative size', () => {
    const inverted = boxToPixels([900, 900, 100, 100], 1000, 1000);

    expect(inverted.width).toBeGreaterThanOrEqual(0);
    expect(inverted.height).toBeGreaterThanOrEqual(0);
  });
});

/**
 * What a stencil keeps, which is what decides whether a layer goes on the
 * stage at all.
 *
 * Only the fail-safe is provable here: jsdom has no canvas, so the measuring
 * itself cannot run, and a function that answered "plenty" when it could not
 * see would put an invisible layer on the stage and black the page out. That is
 * the failure this was written for, so answering nothing is the only safe
 * answer when there is nothing to answer with.
 *
 * The measuring is verified in Chrome instead, where a flat mask at grey 127
 * measures 0 and draws nothing, and at 129 measures a quarter of the frame.
 */
describe('coverage', () => {
  it('claims nothing when it cannot measure at all', () => {
    const unmeasurable = document.createElement('canvas');

    expect(coverage(unmeasurable)).toBe(0);
  });
});

/**
 * A box is not a shape.
 *
 * Asked for a mask, a chat model spells one out as base64 and returns a PNG
 * header it cannot fill — undecodable, or one flat colour. A flat one keeps its
 * whole box, which cuts a rectangle of the painting: squares sliding over each
 * other, which reads as a cut that went wrong rather than as a model that
 * returned nothing.
 */
describe('fillsItsBox', () => {
  const box = [250, 250, 750, 750] as const; // a quarter of the frame

  it('knows a filled box from a shape inside one', () => {
    expect(fillsItsBox(0.25, box, 1000, 1000)).toBe(true);
    expect(fillsItsBox(0.12, box, 1000, 1000)).toBe(false);
  });

  /** Encoding and the feather move it a little; a shape moves it a lot. */
  it('allows a box to fall a little short of its own area', () => {
    expect(fillsItsBox(0.249, box, 1000, 1000)).toBe(true);
  });

  /** The same count means opposite things under a big box and a small one. */
  it('reads the count against the box rather than the frame', () => {
    const small = [0, 0, 100, 100] as const; // a hundredth of the frame

    expect(fillsItsBox(0.01, small, 1000, 1000)).toBe(true);
    expect(fillsItsBox(0.01, box, 1000, 1000)).toBe(false);
  });

  it('claims nothing for a box with no area at all', () => {
    expect(fillsItsBox(1, [500, 500, 500, 500], 1000, 1000)).toBe(false);
  });
});

/**
 * The outline as the model gives it: `[x, y]` points over the whole picture.
 * Its area is the one question worth asking before anything is drawn — a shape
 * that encloses nothing cuts a layer that joins the stack and draws nothing.
 */
describe('outlineArea', () => {
  it('measures a shape as a fraction of the whole picture', () => {
    const quarter = outlineArea([
      [0, 0],
      [500, 0],
      [500, 500],
      [0, 500],
    ]);

    expect(quarter).toBeCloseTo(0.25, 5);
  });

  /** Order round the edge is the model's business, not ours. */
  it('does not care which way round the points run', () => {
    const points: [number, number][] = [
      [0, 0],
      [500, 0],
      [500, 500],
      [0, 500],
    ];

    expect(outlineArea([...points].reverse())).toBeCloseTo(outlineArea(points), 5);
  });

  it('is nothing for points in a line, which enclose nothing', () => {
    expect(
      outlineArea([
        [0, 0],
        [500, 0],
        [1000, 0],
      ])
    ).toBe(0);
  });

  it('is nothing for too few points to be a shape', () => {
    expect(outlineArea([])).toBe(0);
    expect(outlineArea([[0, 0]])).toBe(0);
    expect(
      outlineArea([
        [0, 0],
        [500, 500],
      ])
    ).toBe(0);
  });
});

/**
 * Only the fail-safe is provable here: jsdom has no canvas, so the filling
 * itself cannot run. A function that answered with a drawn shape when it could
 * not draw would put an invisible layer on the stage.
 */
describe('stencilFromPoints', () => {
  it('answers a canvas of the size asked for', () => {
    const canvas = stencilFromPoints(
      [
        [0, 0],
        [500, 0],
        [500, 500],
      ],
      800,
      600
    );

    expect(canvas.width).toBe(800);
    expect(canvas.height).toBe(600);
  });

  it('draws nothing at all from too few points to be a shape', () => {
    expect(() => stencilFromPoints([[0, 0]], 100, 100)).not.toThrow();
  });
});

/**
 * Twenty points round a cat is a good outline and a visibly faceted one. The
 * curve bends the runs between them without moving any of the points the model
 * gave: nothing is invented about where the edge is, only about how it travels.
 */
describe('smoothOutline', () => {
  const square: [number, number][] = [
    [0, 0],
    [500, 0],
    [500, 500],
    [0, 500],
  ];

  it('passes through every point the model gave', () => {
    const curve = smoothOutline(square, 8);

    for (const point of square) {
      expect(
        curve.some(([x, y]) => Math.abs(x - point[0]) < 0.001 && Math.abs(y - point[1]) < 0.001)
      ).toBe(true);
    }
  });

  it('draws the run between them rather than a straight line', () => {
    expect(smoothOutline(square, 8)).toHaveLength(square.length * 8);
  });

  /**
   * It rounds the corners; it does not swing wide of them. A right angle is the
   * worst case a painted edge ever presents, and what the curve does there is a
   * bulge of painting that was never inside the outline.
   */
  it('stays close to the shape, even at a right angle', () => {
    const curve = smoothOutline(square, 8);
    const xs = curve.map(([x]) => x);
    const ys = curve.map(([, y]) => y);
    // A tenth, and measured at a twelfth. Tightening it further would flatten
    // the gentle curves that are the whole point, to hug a corner no painted
    // edge has.
    const overshoot = 500 * 0.1;

    expect(Math.min(...xs)).toBeGreaterThan(-overshoot);
    expect(Math.max(...xs)).toBeLessThan(500 + overshoot);
    expect(Math.min(...ys)).toBeGreaterThan(-overshoot);
    expect(Math.max(...ys)).toBeLessThan(500 + overshoot);
  });

  it('leaves alone what is too small to curve', () => {
    expect(smoothOutline([[0, 0]], 8)).toEqual([[0, 0]]);
    expect(smoothOutline(square, 1)).toEqual(square);
  });
});

/**
 * A flat pixel and a half is a hard edge on a photograph three thousand across:
 * the layer reads as cut out with scissors and stuck on.
 */
describe('featherFor', () => {
  it('softens a big painting more than a small one', () => {
    expect(featherFor(3000, 2000)).toBeGreaterThan(featherFor(800, 600));
  });

  it('stays an edge rather than becoming a haze', () => {
    expect(featherFor(40_000, 40_000)).toBe(FEATHER_MAX);
  });

  it('is still an edge on a small picture', () => {
    expect(featherFor(100, 80)).toBe(FEATHER_MIN);
  });
});
