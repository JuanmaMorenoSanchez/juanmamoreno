import {
  boxToPixels,
  coverage,
  fillsItsBox,
  depthFor,
  layerFile,
  MASK_THRESHOLD,
  scriptedPointer,
  slug,
  stencil,
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

describe('stencil', () => {
  /** Four pixels: black, dark grey, light grey, white. */
  function pixels(): Uint8ClampedArray {
    return new Uint8ClampedArray([
      0, 0, 0, 255, 60, 60, 60, 255, 200, 200, 200, 255, 255, 255, 255, 255,
    ]);
  }

  function alphas(data: Uint8ClampedArray): number[] {
    return [data[3], data[7], data[11], data[15]];
  }

  /**
   * The whole reason this function exists. `cutLayer` keeps the painting where
   * the mask is *opaque*, and the model's mask is opaque everywhere — black
   * included. Used as it arrives it would keep the entire box, which looks like
   * a layer and is the whole rectangle.
   */
  it('turns brightness into transparency', () => {
    const data = pixels();

    stencil(data);

    expect(alphas(data)).toEqual([0, 0, 255, 255]);
  });

  it('keeps the threshold where the model is more sure than not', () => {
    const data = pixels();

    stencil(data, MASK_THRESHOLD);

    // 60 is below halfway and 200 above, so the dark grey goes and the light
    // grey stays — hair and shadowed edges fall on this line.
    expect(alphas(data)).toEqual([0, 0, 255, 255]);
  });

  it('takes a stricter threshold when asked', () => {
    const data = pixels();

    stencil(data, 220);

    expect(alphas(data)).toEqual([0, 0, 0, 255]);
  });

  /** What survives is white, so the stencil is a stencil and not a grey wash. */
  it('leaves what survives fully opaque white', () => {
    const data = pixels();

    stencil(data);

    expect([data[12], data[13], data[14], data[15]]).toEqual([255, 255, 255, 255]);
  });

  /**
   * A mask that arrives already transparent in places is respected: a pixel
   * nothing was drawn into is not part of the layer, however bright the colour
   * left in its channels.
   */
  it('does not resurrect a pixel that was never drawn', () => {
    const untouched = new Uint8ClampedArray([255, 255, 255, 0]);

    stencil(untouched);

    expect(untouched[3]).toBe(0);
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
