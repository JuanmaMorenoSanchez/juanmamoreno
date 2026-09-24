/**
 * What a painting is asked for, worked out at the moment a dossier is made.
 *
 * **Nothing here is stored, and that is the point.** No price is written to a
 * certificate, kept in the catalogue, saved to the api or held in the browser
 * between one dossier and the next. A price is a thing said to one gallery on
 * one afternoon, and the sums that produce it are typed each time.
 *
 * The rule is the artist's own: the height plus the width, in centimetres,
 * times a number — one number for paintings and a smaller one for work on
 * paper. It is arithmetic rather than valuation, and the multipliers are asked
 * for every time rather than remembered, because the only person who knows what
 * they should be today is him.
 */

/** Which of the two multipliers a work is priced with. */
export type PriceBand = 'painting' | 'paper';

export const DEFAULT_MULTIPLIER = 11;

/**
 * What the work is made of, reduced to the two bands that are priced.
 *
 * Read from the medium the certificate carries, which comes from a fixed list
 * of eight — six of them oil, plus watercolour and drawing. Acrylic and mixed
 * media are matched too: neither is in the collection yet, and both are things
 * he paints.
 *
 * **Anything unrecognised is priced as a painting.** The alternative is a
 * dossier with a gap in it where a price should be, which is worse than a price
 * he can look at and correct: 104 of the 167 are oil, and a medium this does
 * not know is far likelier to be a new way of painting than a new kind of
 * drawing.
 */
export function priceBand(medium: string): PriceBand {
  const said = String(medium ?? '').toLowerCase();
  const onPaper = ['watercolor', 'watercolour', 'drawing', 'gouache', 'ink', 'pencil', 'charcoal'];
  return onPaper.some((word) => said.includes(word)) ? 'paper' : 'painting';
}

/**
 * A measurement as a number.
 *
 * The certificates write decimals with a comma — "140,5" — which is the
 * artist's own convention and is kept everywhere else, so it is undone here
 * rather than in the data.
 */
export function measure(value: string): number {
  const parsed = Number.parseFloat(String(value ?? '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : NaN;
}

/** The two numbers a dossier is priced with. */
export interface Multipliers {
  painting: number;
  paper: number;
}

/** Whether a number is usable as a multiplier: positive, finite, decimals fine. */
export function usableMultiplier(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}

/**
 * The price of one work, or null when it cannot be worked out.
 *
 * Null rather than zero, because a dossier prints nothing where there is no
 * price and printing "0 €" beside a painting would be worse than printing
 * nothing at all. It happens when a certificate's measurements cannot be read
 * as numbers, which none of the 167 currently do.
 *
 * Rounded to whole euros. The sum has one decimal at most — a height of 140,5
 * times 11 — and a price quoted to the cent reads like a bill rather than
 * a figure arrived at.
 */
export function priceOf(
  size: { height: string; width: string },
  medium: string,
  multipliers: Multipliers
): number | null {
  const height = measure(size.height);
  const width = measure(size.width);
  if (!Number.isFinite(height) || !Number.isFinite(width)) return null;

  const multiplier = multipliers[priceBand(medium)];
  if (!usableMultiplier(multiplier)) return null;

  return Math.round((height + width) * multiplier);
}

/**
 * A price as a dossier prints it.
 *
 * Spaced thousands and a trailing euro sign, which is how it is written in
 * Spain and reads the same to an English eye — a dot or a comma means the
 * opposite thing either side of the Channel, and a space means one thing
 * everywhere. Deliberately not `toLocaleString`: a dossier must read the same
 * whatever the machine that made it is set to.
 *
 * **The space is U+00A0 and may not be U+202F.** The narrow no-break space is
 * the typographically correct one and it is unprintable here: jsPDF's built-in
 * fonts are WinAnsi, a character outside it forces the whole string into
 * two-byte encoding, and the pair `20 2F` is then drawn as a space and a
 * slash — so "1 000 €" reached a dossier reading "1 /000 €". U+00A0 is inside
 * WinAnsi, stays one byte, and keeps the euro sign working with it.
 */
export function formatPrice(amount: number): string {
  const digits = String(Math.round(amount));
  const spaced = digits.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
  return `${spaced} €`;
}
