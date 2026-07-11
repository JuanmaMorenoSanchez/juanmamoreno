export enum ALLOWED_LANGUAGES {
  SPANISH = 'es-ES',
  ENGLISH = 'en-EN',
}

// Picks the browser language when it is one we ship, English otherwise.
export function getPreferredLanguage(): ALLOWED_LANGUAGES {
  const browserLang =
    window.navigator.language || window.navigator.languages?.[0] || ALLOWED_LANGUAGES.ENGLISH;
  return Object.values(ALLOWED_LANGUAGES).includes(browserLang as ALLOWED_LANGUAGES)
    ? (browserLang as ALLOWED_LANGUAGES)
    : ALLOWED_LANGUAGES.ENGLISH;
}
