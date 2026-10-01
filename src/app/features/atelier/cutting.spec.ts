import {
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
