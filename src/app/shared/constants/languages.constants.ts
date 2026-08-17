export enum ALLOWED_LANGUAGES {
  SPANISH = 'es-ES',
  ENGLISH = 'en-EN',
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
