/**
 * Small choices a reader has made, remembered on their own device.
 *
 * Preferences, not data: how they like the catalogue arranged, which theme
 * they read in. Nothing here identifies anybody and none of it ever leaves the
 * browser — the privacy page says as much, and this is the second thing it
 * describes after the offline copy of the gallery.
 *
 * Every read is validated against the values the caller accepts, so a key
 * edited by hand, or left behind by an older version of the site, falls back to
 * the default rather than putting the page into a state it has no control for.
 *
 * The whole of it is wrapped in try/catch on purpose. There is no `window` at
 * all while the 388 pages are being prerendered, and no storage in a browser
 * with it disabled; both should mean "no preference", not a broken page.
 */
const PREFIX = 'juanmamoreno.';

export const PREFERENCE_KEYS = {
  THEME: 'theme',
  SORT_METHOD: 'catalogue.sort',
  SORT_ORDER: 'catalogue.order',
  MEDIUM: 'catalogue.medium',
  AVAILABILITY: 'catalogue.availability',
} as const;

export function readPreference<T extends string>(key: string, allowed: readonly T[]): T | null {
  try {
    const stored = window.localStorage.getItem(PREFIX + key);
    return allowed.includes(stored as T) ? (stored as T) : null;
  } catch {
    // Prerendering, or private browsing. No preference is the right answer.
    return null;
  }
}

/**
 * A preference whose valid values are not known until the catalogue has
 * loaded — the mediums, which come from the paintings themselves.
 *
 * Unvalidated here, so the caller must decide what an unrecognised value
 * means. For the medium chips it means "no such medium on offer", which falls
 * back to showing everything rather than to an empty grid.
 */
export function readStoredText(key: string): string | null {
  try {
    return window.localStorage.getItem(PREFIX + key);
  } catch {
    return null;
  }
}

export function writePreference(key: string, value: string): void {
  try {
    window.localStorage.setItem(PREFIX + key, value);
  } catch {
    // The choice simply is not remembered past this visit, which is a fair
    // fallback for a preference.
  }
}
