import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  ALLOWED_LANGUAGES,
  getPreferredLanguage,
  storedLanguageChoice,
} from '@shared/constants/languages.constants';

/**
 * The language is part of the address: /artwork/5 is English, /es/artwork/5
 * Spanish. Guards rather than component code, so the language is settled before
 * anything renders — which is what lets each page prerender in its own.
 */
export const spanishRoute: CanActivateFn = () => {
  inject(TranslateService).use(ALLOWED_LANGUAGES.SPANISH);
  return true;
};

export const englishRoute: CanActivateFn = (_route, state) => {
  if (wantsSpanish()) {
    return inject(Router).parseUrl(`/es${state.url === '/' ? '' : state.url}`);
  }

  inject(TranslateService).use(ALLOWED_LANGUAGES.ENGLISH);
  return true;
};

/**
 * For the pages whose address carries no language: apply whatever the reader
 * last chose, or their browser's setting, and never redirect.
 *
 * Without this the studio opened in English however many times its owner had
 * asked for Spanish, because nothing on the way in ever told the translate
 * service which language to use — the two guards below only run inside the
 * language trees.
 */
export const readerLanguage: CanActivateFn = () => {
  inject(TranslateService).use(preferredLanguage());
  return true;
};

/**
 * Never true while prerendering: the English pages are the ones canonical and
 * x-default point at, and a build has no language of its own to prefer.
 *
 * An explicit choice beats the browser's setting. Without that, asking for
 * English on a Spanish machine bounced straight back to Spanish and made the
 * switcher useless.
 */
function wantsSpanish(): boolean {
  if (typeof window === 'undefined') return false;
  return preferredLanguage() === ALLOWED_LANGUAGES.SPANISH;
}

/** An explicit choice first, the browser's setting second, English otherwise. */
export function preferredLanguage(): ALLOWED_LANGUAGES {
  if (typeof window === 'undefined') return ALLOWED_LANGUAGES.ENGLISH;
  return storedLanguageChoice() ?? getPreferredLanguage();
}
