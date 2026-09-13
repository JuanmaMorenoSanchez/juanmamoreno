import {
  ARTIST,
  FIRST_YEAR,
  IMAGE_TYPES,
  MEDIUMS,
  UNITS,
  isMeasurement,
  measurementAsTyped,
  measurementValue,
  mintableYears,
  normaliseMeasurement,
} from './mint-vocabulary';

describe('the words a new certificate may use', () => {
  it('offers the artist under the one spelling the collection uses', () => {
    // Two certificates said "Juan Manuel" and had to be corrected in the
    // migration. A certificate is permanent, so there is nothing to choose.
    expect(ARTIST).toBe('Juanma Moreno Sánchez');
  });

  it('offers only mediums the collection already contains', () => {
    expect(MEDIUMS).toContain('Oil on canvas');
    expect(MEDIUMS).toContain('Watercolor on paper');
    expect(MEDIUMS.length).toBe(8);
    expect(new Set(MEDIUMS).size).toBe(MEDIUMS.length);
  });

  it('puts the commonest medium first, so the usual case is the default', () => {
    expect(MEDIUMS[0]).toBe('Oil on canvas');
  });

  it('knows the three kinds of photograph and the one unit', () => {
    expect(IMAGE_TYPES).toEqual(['Frontal view', 'Detail', 'Work in progress']);
    expect(UNITS).toEqual(['cm']);
  });
});

describe('the years that can be picked', () => {
  it('runs from this year back to the first in the collection', () => {
    const years = mintableYears(new Date('2026-06-01T00:00:00Z'));
    expect(years[0]).toBe(2026);
    expect(years[years.length - 1]).toBe(FIRST_YEAR);
    expect(years.length).toBe(2026 - FIRST_YEAR + 1);
  });

  it('grows by itself, so next year needs no edit', () => {
    const years = mintableYears(new Date('2031-01-01T00:00:00Z'));
    expect(years[0]).toBe(2031);
  });

  it('is newest first, because that is what is being painted', () => {
    const years = mintableYears(new Date('2026-06-01T00:00:00Z'));
    expect(years[0]).toBeGreaterThan(years[1]);
  });
});

describe('measurements, in the notation the collection uses', () => {
  it('keeps a comma decimal exactly as it is', () => {
    expect(normaliseMeasurement('140,5')).toBe('140,5');
    expect(normaliseMeasurement('29,7')).toBe('29,7');
  });

  it('rewrites a dot as a comma rather than refusing it', () => {
    // Both are readable; a collection written both ways is the problem.
    expect(normaliseMeasurement('140.5')).toBe('140,5');
  });

  it('trims the whitespace that produced a title ending in a space', () => {
    expect(normaliseMeasurement('  50  ')).toBe('50');
  });

  it('accepts whole numbers and one or two decimals', () => {
    expect(isMeasurement('50')).toBe(true);
    expect(isMeasurement('140,5')).toBe(true);
    expect(isMeasurement('29.7')).toBe(true);
    expect(isMeasurement('1200')).toBe(true);
  });

  it('refuses what is not a measurement', () => {
    expect(isMeasurement('')).toBe(false);
    expect(isMeasurement('50 cm')).toBe(false);
    expect(isMeasurement('about 50')).toBe(false);
    expect(isMeasurement('-50')).toBe(false);
    expect(isMeasurement('50,5,5')).toBe(false);
  });

  it('takes a half-typed decimal as the whole number it already is', () => {
    // "50," is what a field looks like a keystroke before "50,5". It has one
    // sensible reading, so it is read rather than rejected mid-typing.
    expect(normaliseMeasurement('50,')).toBe('50');
    expect(isMeasurement('50,')).toBe(true);
  });

  describe('typing a measurement one key at a time', () => {
    /** What the box holds after each keystroke, as the handler rewrites it. */
    const typed = (keys: string): string =>
      [...keys].reduce((sofar, key) => measurementAsTyped(sofar + key), '');

    it('lets a decimal be typed at all', () => {
      // It could not be, in either form, by anybody: the comma was tidied away
      // on the keystroke that made it, so "140,5" came out as 1405.
      expect(typed('140,5')).toBe('140,5');
      expect(typed('140,55')).toBe('140,55');
    });

    it('keeps the comma where it was put, so the next digit lands after it', () => {
      expect(measurementAsTyped('140,')).toBe('140,');
    });

    it('takes a dot as the comma it was meant to be', () => {
      expect(typed('29.7')).toBe('29,7');
    });

    it('refuses what could never be a measurement', () => {
      expect(measurementAsTyped('14o')).toBe('14');
      expect(measurementAsTyped('140,5,5')).toBe('140,55');
      expect(measurementAsTyped('140,555')).toBe('140,55');
      expect(measurementAsTyped('123456')).toBe('1234');
    });

    it('is worth what it says once it is a measurement', () => {
      expect(measurementValue('140,55')).toBeCloseTo(140.55);
      expect(measurementValue('29,7')).toBeCloseTo(29.7);
      expect(measurementValue('140')).toBe(140);
    });

    it('is worth nothing while it is still half typed', () => {
      expect(measurementValue('140,')).toBe(140);
      expect(measurementValue('')).toBeNull();
      expect(measurementValue('abc')).toBeNull();
    });
  });
});
