import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

/**
 * Builds links that keep the reader in the language they are reading.
 *
 * Every page exists twice, at /about and /es/about, and a link written as
 * "/about" quietly throws a Spanish reader back into English halfway through
 * the site. Routes are read from the address, so the prefix comes from there.
 *
 * The language is a signal rather than a read of `router.url` at call time.
 * The menu lives in the root component and renders before the route activates,
 * so a plain read sees "/" and the links are built English — and nothing marks
 * them dirty afterwards, which baked the wrong prefix into every prerendered
 * Spanish page. A signal makes the change detection happen.
 */
@Injectable({ providedIn: 'root' })
export class LanguageUrlService {
  private router = inject(Router);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url)
    ),
    { initialValue: this.router.url }
  );

  readonly inSpanish = computed(() => {
    const path = this.url().split('?')[0].split('#')[0];
    return path === '/es' || path.startsWith('/es/');
  });

  /**
   * `link('about')` gives "/about" in English and "/es/about" in Spanish.
   *
   * A string rather than the usual segment array because the trailing slash
   * matters: the router reads "/es/" as the two segments ["es", ""], matches
   * no route, and shows the 404 page.
   */
  link(path = ''): string {
    const clean = path.replace(/^\/+|\/+$/g, '');
    const prefix = this.inSpanish() ? '/es' : '';
    return `${prefix}/${clean}`.replace(/\/+$/, '') || '/';
  }
}
