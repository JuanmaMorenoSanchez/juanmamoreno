import { DOCUMENT, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  ALLOWED_LANGUAGES,
  getPreferredLanguage,
  languageTag,
  storedLanguageChoice,
} from '@shared/constants/languages.constants';

/**
 * The language is part of the address: /artwork/5 is English, /es/artwork/5
 * Spanish. Guards rather than component code, so the language is settled before
 * anything renders — which is what lets each page prerender in its own.
 */
export const spanishRoute: CanActivateFn = () => {
  speak(ALLOWED_LANGUAGES.SPANISH);
  return true;
};

export const englishRoute: CanActivateFn = (_route, state) => {
  if (wantsSpanish()) {
    return inject(Router).parseUrl(`/es${spanishAddressFor(state.url)}`);
  }

  speak(ALLOWED_LANGUAGES.ENGLISH);
  return true;
};

/**
 * Says the language twice: once to the dictionary, once to the page itself.
 *
 * `index.html` says `lang="en"` and nothing ever said otherwise, so all 402
 * prerendered pages declared English — the Spanish half of the site included.
 * A screen reader took its pronunciation from that and read Juanma's Spanish
 * aloud with English phonemes; a search engine took the site's own word for
 * what language half its pages were in; and `hyphens: auto` would break
 * Spanish words by English rules. The site is readable without javascript, so
 * the attribute has to be right in the html that is served, not corrected
 * after hydration — which is exactly what makes a guard the place for it, the
 * same reason the dictionary is chosen here.
 *
 * Through `DOCUMENT` rather than the global, because a build has no `document`
 * and the prerender is where this has to land.
 */
function speak(language: ALLOWED_LANGUAGES): void {
  inject(TranslateService).use(language);
  inject(DOCUMENT).documentElement.lang = languageTag(language);
}

/**
 * What to hang off `/es`, given the address the reader asked for.
 *
 * The slash goes when there is nothing after it but a query or a fragment,
 * because the router reads `/es/` as the segments ["es", ""], which matches no
 * route and draws the 404 page.
 *
 * A bare `/` was already handled. `/?utm_source=ig` was not, and became
 * `/es/?utm_source=ig` — so every Spanish reader who followed the link in the
 * Instagram profile was shown a 404, while the same link with nothing appended
 * worked perfectly. Every link Instagram and Facebook hand out carries tracking
 * parameters, which is what made this invisible from the inside and universal
 * from the outside.
 */
function spanishAddressFor(url: string): string {
  return url.replace(/^\/(?=$|[?#])/, '');
}

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
  speak(preferredLanguage());
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
