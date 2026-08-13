import { DOCUMENT, inject, Service } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const ORIGIN = 'https://juanmamoreno.com';

@Service()
export class CanonicalService {
  readonly #doc = inject(DOCUMENT);
  readonly #router = inject(Router);

  init(): void {
    this.#router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.#set(e.urlAfterRedirects));
  }

  #set(url: string): void {
    const path = url.split(/[?#]/)[0];
    const href = `${ORIGIN}${path === '/' ? '' : path.replace(/\/$/, '')}` || ORIGIN;

    let link = this.#doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.#doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.#doc.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}
