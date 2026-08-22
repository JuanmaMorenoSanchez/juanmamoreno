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
 * Never true while prerendering: the English pages are the ones canonical and
 * x-default point at, and a build has no language of its own to prefer.
 *
 * An explicit choice beats the browser's setting. Without that, asking for
 * English on a Spanish machine bounced straight back to Spanish and made the
 * switcher useless.
 */
function wantsSpanish(): boolean {
  if (typeof window === 'undefined') return false;

  const chosen = storedLanguageChoice();
  return chosen ? chosen === ALLOWED_LANGUAGES.SPANISH : getPreferredLanguage() === ALLOWED_LANGUAGES.SPANISH;
}
