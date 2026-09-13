/**
 * The words a new certificate may use.
 *
 * Every one of these is taken from the 186 certificates already written, not
 * invented: the collection has exactly eight mediums, one unit, three kinds of
 * view and one spelling of the artist's name. Offering them as choices rather
 * than as empty boxes is the point — the audit of the old collection found two
 * certificates spelling the artist "Juan Manuel Moreno Sánchez", one missing its
 * unit entirely, a title with a trailing space and another reading "spash".
 * Every one of those was a typed field, and every one is now permanent.
 *
 * A medium that is genuinely new can still be typed; the list is what is
 * offered, not what is allowed. But it has to be typed deliberately.
 */

/** Mediums in the collection, commonest first. */
export const MEDIUMS: ReadonlyArray<string> = [
  'Oil on canvas',
  'Watercolor on paper',
  'Oil on wood',
  'Oil on board',
  'Oil on canvas on cardboard',
  'Oil on cardboard',
  'Drawing on paper',
  'Oil on aluminium',
];

/** What a photograph of the work is of. */
export const IMAGE_TYPES: ReadonlyArray<string> = ['Frontal view', 'Detail', 'Work in progress'];

/** Centimetres, on all 186. Kept as a list so a change is a change, not a typo. */
export const UNITS: ReadonlyArray<string> = ['cm'];

/**
 * One spelling, and it is not the passport one.
 *
 * Tokens 122 and 123 said "Juan Manuel Moreno Sánchez" and had to be corrected
 * during the migration. There is nothing to choose here, which is why it is not
 * a field the studio offers.
 */
export const ARTIST = 'Juanma Moreno Sánchez';

/** The earliest year in the collection; the latest is always the current one. */
export const FIRST_YEAR = 2007;

/** Every year that can be picked, newest first — this year back to the first. */
export function mintableYears(now = new Date()): number[] {
  const latest = now.getFullYear();
  return Array.from({ length: latest - FIRST_YEAR + 1 }, (_, i) => latest - i);
}

/**
 * A measurement, in the notation the collection already uses.
 *
 * Decimals are written with a comma — "140,5", "29,7" — on all eleven of the
 * measurements that have one. A dot would not be wrong so much as *different*,
 * and a collection that writes it both ways can never be sorted or matched on
 * cleanly. So a dot is quietly accepted and rewritten.
 */
export function normaliseMeasurement(input: string): string {
  return input.trim().replace('.', ',').replace(/,+$/, '');
}

/**
 * A measurement as it is being typed, which is not the same thing.
 *
 * `normaliseMeasurement` drops a trailing comma, which is right for a
 * measurement being stored and wrong for one being written: pressing the comma
 * key in "140,5" produced "140," which was tidied back to "140" before the 5
 * could be typed, so the next keystroke gave 1405. A decimal could not be
 * entered at all, in either form, by anybody.
 *
 * So while typing the comma is left where it is put, and only the things that
 * could never become a measurement are refused: letters, a second comma, more
 * than two decimal places.
 */
export function measurementAsTyped(input: string): string {
  const [whole, ...rest] = input.trim().replace('.', ',').split(',');
  const digits = whole.replace(/\D/g, '').slice(0, 4);
  if (!rest.length) return digits;
  return `${digits},${rest.join('').replace(/\D/g, '').slice(0, 2)}`;
}

/** What a typed measurement is worth as a number, or null when it is not one yet. */
export function measurementValue(input: string): number | null {
  if (!isMeasurement(input)) return null;
  const value = Number(normaliseMeasurement(input).replace(',', '.'));
  return Number.isFinite(value) && value > 0 ? value : null;
}

/** Whether a measurement is a number the collection would recognise. */
export function isMeasurement(input: string): boolean {
  return /^\d{1,4}(,\d{1,2})?$/.test(normaliseMeasurement(input));
}
