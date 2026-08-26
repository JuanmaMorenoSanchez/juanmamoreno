export enum ALLOWED_LANGUAGES {
  SPANISH = 'es-ES',
  ENGLISH = 'en-EN',
}

/**
 * Pages that live outside the two language trees, so their address says nothing
 * about which language the reader is in.
 *
 * They are the artist's own — a workshop and its door — rather than pages
 * anyone reads, so they have no Spanish twin, no hreflang pair and no place in
 * the sitemap. That left the switcher dead on them: it works by moving between
 * /page and /es/page, and there is no other address to move to. The reader's
 * choice still has to be honoured, so on these the switcher changes the words
 * where it stands instead of changing the address.
 */
export const LANGUAGE_FREE_PATHS = ['studio', 'door'];

/** True for an address whose first segment is one of those pages. */
export function carriesNoLanguage(url: string): boolean {
  const first = url.split('?')[0].split('#')[0].replace(/^\/+/, '').split('/')[0];
  return LANGUAGE_FREE_PATHS.includes(first);
}

// Where an explicit choice from the language switcher is remembered. Only a
// choice the visitor actually made goes in here: it is what stops the
// first-visit redirect from overriding someone who has asked for English.
const LANGUAGE_CHOICE_KEY = 'juanmamoreno.language';

export function storeLanguageChoice(language: ALLOWED_LANGUAGES): void {
  try {
    window.localStorage.setItem(LANGUAGE_CHOICE_KEY, language);
  } catch {
    // Private browsing, or storage disabled. The choice simply is not
    // remembered past this navigation, which is a fair fallback.
  }
}

export function storedLanguageChoice(): ALLOWED_LANGUAGES | null {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_CHOICE_KEY);
    return Object.values(ALLOWED_LANGUAGES).includes(stored as ALLOWED_LANGUAGES)
      ? (stored as ALLOWED_LANGUAGES)
      : null;
  } catch {
    return null;
  }
}

// Picks the browser language when it is one we ship, English otherwise.
// There is no browser at all when the pages are prerendered at build time:
// English is the fallback language, so that is the right answer there too.
export function getPreferredLanguage(): ALLOWED_LANGUAGES {
  if (typeof window === 'undefined') {
    return ALLOWED_LANGUAGES.ENGLISH;
  }

  const browserLang =
    window.navigator.language || window.navigator.languages?.[0] || ALLOWED_LANGUAGES.ENGLISH;
  return Object.values(ALLOWED_LANGUAGES).includes(browserLang as ALLOWED_LANGUAGES)
    ? (browserLang as ALLOWED_LANGUAGES)
    : ALLOWED_LANGUAGES.ENGLISH;
}
