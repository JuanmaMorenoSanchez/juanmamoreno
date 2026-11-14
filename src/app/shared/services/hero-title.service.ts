import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Coordinates the redundant site title. When a page shows its own large title
 * on screen (the landing's hero name), it sets `visible` true so the top bar
 * can hide its duplicate brand copy; navigating away clears it and the brand
 * returns. Kept as a shared signal because the two components — the page and
 * the top bar — sit in different parts of the tree.
 */
@Injectable({ providedIn: 'root' })
export class HeroTitleService {
  /**
   * True while a page's own hero title is visible, making the top-bar brand
   * redundant.
   *
   * **Seeded from the address rather than starting false**, because the top
   * bar is built before the page under it is. On the landing page the
   * prerendered html correctly carries no brand — the hero name is right
   * there — but on arrival the bar rendered itself from this signal first,
   * put the brand back, and only lost it again when the landing component's
   * constructor ran. That is a brand appearing and vanishing about 160ms in,
   * and on a phone it wrapped the toolbar onto a second row and moved the
   * whole page 36 pixels: 0.35 of layout shift against a ceiling of 0.1.
   *
   * It had always flashed; it only started costing anything when the site
   * stopped being set in Arial, because Arial happened to fit on one row and
   * Archivo does not. A fault that is invisible until an unrelated change
   * makes it visible is still the fault.
   *
   * The landing page is the only page with a hero title, so the address is
   * enough to know: `/` and `/es` in either spelling, and nothing else. The
   * component still owns it from then on, through its own observer.
   */
  private readonly router = inject(Router);
  readonly visible = signal(isLandingPage(this.router.url));
}

/** The landing page, in both languages, with or without a trailing slash. */
function isLandingPage(url: string): boolean {
  const path = url.split('?')[0].split('#')[0].replace(/\/+$/, '');
  return path === '' || path === '/' || path === '/es';
}
