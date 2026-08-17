import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  ALLOWED_LANGUAGES,
  getPreferredLanguage,
  storedLanguageChoice,
} from '@shared/constants/languages.constants';

/**
 * The language is part of the address: /artwork/5 is the English page and
 * /es/artwork/5 the Spanish one. Each is prerendered in its own language, which
 * is how both versions of an essay reach the served HTML instead of only the
 * one the build happened to default to.
 *
 * These are guards rather than something the components do, because a guard
 * runs before the route is activated — so the language is already settled by
 * the time anything renders, at build time as much as in a browser.
 */
export const spanishRoute: CanActivateFn = () => {
  inject(TranslateService).use(ALLOWED_LANGUAGES.SPANISH);
  return true;
};

/**
 * The unprefixed tree, which is English.
 *
 * Deliberately not the browser's language. That was the first attempt, and it
 * made the language switcher useless on a Spanish browser: leaving /es put the
 * reader on the English URL, whereupon this guard read the browser and set
 * Spanish straight back. The address says which language the page is in, and
 * the address wins — anything else can contradict what the canonical and the
 * hreflang tags promise about that URL.
 */
export const englishRoute: CanActivateFn = (_route, state) => {
  if (wantsSpanish()) {
    // Send them to the Spanish page rather than translating this one in place,
    // so what they read and the address they can share stay the same thing.
    return inject(Router).parseUrl(`/es${state.url === '/' ? '' : state.url}`);
  }

  inject(TranslateService).use(ALLOWED_LANGUAGES.ENGLISH);
  return true;
};

/**
 * Whether an unprefixed URL should hand over to its Spanish twin.
 *
 * Only ever true in a browser. Prerendering must not redirect: the English
 * pages are the ones crawlers are pointed at by canonical and x-default, and
 * they have no language of their own to prefer.
 *
 * An explicit choice from the switcher always wins over the browser's setting —
 * without that, asking for English from a Spanish machine would bounce straight
 * back to Spanish, which is precisely what made the switcher useless before.
 */
function wantsSpanish(): boolean {
  if (typeof window === 'undefined') return false;

  const chosen = storedLanguageChoice();
  if (chosen) return chosen === ALLOWED_LANGUAGES.SPANISH;

  return getPreferredLanguage() === ALLOWED_LANGUAGES.SPANISH;
}
