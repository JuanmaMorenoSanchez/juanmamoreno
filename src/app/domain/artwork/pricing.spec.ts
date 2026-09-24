import {
  DEFAULT_MULTIPLIER,
  formatPrice,
  measure,
  priceBand,
  priceOf,
  usableMultiplier,
} from './pricing';

/**
 * The arithmetic behind a price, which is the artist's own: height plus width
 * in centimetres, times a number he types when he makes the dossier.
 *
 * Nothing here reads or writes anything. That is the whole design — a price is
 * said to one gallery on one afternoon and is never recorded.
 */
describe('what a painting is asked for', () => {
  const multipliers = { painting: 11, paper: 11 };

  describe('which multiplier a work is priced with', () => {
    /** Six of the eight mediums in the collection are oil; 104 of 167 works. */
    it.each([
      'Oil on canvas',
      'Oil on wood',
      'Oil on board',
      'Oil on canvas on cardboard',
      'Oil on cardboard',
      'Oil on aluminium',
    ])('prices %s as a painting', (medium) => {
      expect(priceBand(medium)).toBe('painting');
    });

    it.each(['Watercolor on paper', 'Drawing on paper'])('prices %s as work on paper', (medium) => {
      expect(priceBand(medium)).toBe('paper');
    });

    /** Neither is in the collection yet, and both are things he paints. */
    it.each(['Acrylic on canvas', 'Mixed media on wood'])('prices %s as a painting', (medium) => {
      expect(priceBand(medium)).toBe('painting');
    });

    it('reads a medium however it is capitalised', () => {
      expect(priceBand('WATERCOLOR ON PAPER')).toBe('paper');
    });

    it('spells watercolour both ways', () => {
      expect(priceBand('Watercolour on paper')).toBe('paper');
    });

    /**
     * A medium this does not know is priced as a painting rather than left
     * without a price. A gap where a figure should be is worse than a figure he
     * can look at and correct, and a new medium is far likelier to be a new way
     * of painting than a new kind of drawing.
     */
    it('prices something it has never seen as a painting', () => {
      expect(priceBand('Encaustic on panel')).toBe('painting');
      expect(priceBand('')).toBe('painting');
    });
  });

  describe('the sum', () => {
    it('is the height plus the width, times the multiplier', () => {
      expect(priceOf({ height: '100', width: '80' }, 'Oil on canvas', multipliers)).toBe(1980);
    });

    /** The collection writes decimals with a comma, and that is kept. */
    it('reads a comma decimal, which is what the certificates carry', () => {
      expect(priceOf({ height: '140,5', width: '116' }, 'Oil on canvas', multipliers)).toBe(2822);
    });

    it('uses the paper multiplier for a watercolour', () => {
      const split = { painting: 20, paper: 5 };
      expect(priceOf({ height: '30', width: '20' }, 'Watercolor on paper', split)).toBe(250);
      expect(priceOf({ height: '30', width: '20' }, 'Oil on canvas', split)).toBe(1000);
    });

    it('takes a decimal multiplier', () => {
      expect(priceOf({ height: '100', width: '80' }, 'Oil on canvas', { painting: 12.5, paper: 5 }))
        .toBe(2250);
    });

    /**
     * Null rather than zero: a dossier prints nothing where there is no price,
     * and "0 €" beside a painting would be worse than a blank.
     */
    it('answers nothing for a measurement it cannot read', () => {
      expect(priceOf({ height: 'about 100', width: '80' }, 'Oil on canvas', multipliers)).toBeNull();
      expect(priceOf({ height: '', width: '' }, 'Oil on canvas', multipliers)).toBeNull();
    });

    it('answers nothing when the multiplier is not a number to multiply by', () => {
      expect(priceOf({ height: '100', width: '80' }, 'Oil on canvas', { painting: 0, paper: 11 }))
        .toBeNull();
    });
  });

  describe('what counts as a multiplier', () => {
    it('takes a positive number, decimals included', () => {
      expect(usableMultiplier(11)).toBe(true);
      expect(usableMultiplier(0.5)).toBe(true);
      expect(usableMultiplier(DEFAULT_MULTIPLIER)).toBe(true);
    });

    it('refuses zero, a negative and something that is not a number', () => {
      expect(usableMultiplier(0)).toBe(false);
      expect(usableMultiplier(-3)).toBe(false);
      expect(usableMultiplier(Number.NaN)).toBe(false);
      expect(usableMultiplier(Number.POSITIVE_INFINITY)).toBe(false);
    });
  });

  describe('how it is printed', () => {
    /** Spaced thousands, as the rest of the document writes numbers. */
    it('spaces the thousands and ends in a euro sign', () => {
      expect(formatPrice(2822)).toBe('2 822 €');
      expect(formatPrice(950)).toBe('950 €');
      expect(formatPrice(12500)).toBe('12 500 €');
    });

    /** The same on any machine, whatever its locale is set to. */
    it('does not ask the machine how to write a number', () => {
      expect(formatPrice(1000)).toBe('1 000 €');
    });
  });

  it('reads a plain measurement and refuses a vague one', () => {
    expect(measure('140,5')).toBe(140.5);
    expect(measure('116')).toBe(116);
    expect(Number.isNaN(measure('about 20'))).toBe(true);
  });
});
