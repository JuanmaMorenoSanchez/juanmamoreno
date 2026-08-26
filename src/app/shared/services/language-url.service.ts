import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { carriesNoLanguage } from '@shared/constants/languages.constants';
import { filter, map } from 'rxjs';

/**
 * Links that keep the reader in the language they are reading. Every page
 * exists at both /about and /es/about, and a link written as "/about" drops a
 * Spanish reader back into English.
 */
@Injectable({ providedIn: 'root' })
export class LanguageUrlService {
  private router = inject(Router);

  // A signal, not a read of router.url at call time: the menu lives in the root
  // component and renders before the route activates, so a plain read sees "/"
  // and nothing marks the links dirty afterwards.
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url)
    ),
    { initialValue: this.router.url }
  );

  /**
   * Whether the address encodes a language. False on the studio and the door,
   * which sit outside both trees — see LANGUAGE_FREE_PATHS.
   */
  readonly carriesLanguage = computed(() => !carriesNoLanguage(this.url()));

  readonly inSpanish = computed(() => {
    const path = this.url().split('?')[0].split('#')[0];
    return path === '/es' || path.startsWith('/es/');
  });

  /** The code the backend tags its translated text with. */
  readonly contentLanguage = computed<'en' | 'es'>(() => (this.inSpanish() ? 'es' : 'en'));

  /**
   * `link('about')` gives "/about" in English and "/es/about" in Spanish.
   *
   * Returns a string, and strips the trailing slash: the router reads "/es/" as
   * the segments ["es", ""], matches no route, and shows the 404 page.
   */
  link(path = ''): string {
    const clean = path.replace(/^\/+|\/+$/g, '');
    const prefix = this.inSpanish() ? '/es' : '';
    return `${prefix}/${clean}`.replace(/\/+$/, '') || '/';
  }
}
