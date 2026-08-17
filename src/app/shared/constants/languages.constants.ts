export enum ALLOWED_LANGUAGES {
  SPANISH = 'es-ES',
  ENGLISH = 'en-EN',
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
