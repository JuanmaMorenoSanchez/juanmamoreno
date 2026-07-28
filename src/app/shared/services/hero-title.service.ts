import { Injectable, signal } from '@angular/core';

/**
 * Coordinates the redundant site title. When a page shows its own large title
 * on screen (the landing's hero name), it sets `visible` true so the top bar
 * can hide its duplicate brand copy; navigating away clears it and the brand
 * returns. Kept as a shared signal because the two components — the page and
 * the top bar — sit in different parts of the tree.
 */
@Injectable({ providedIn: 'root' })
export class HeroTitleService {
  /** True while a page's own hero title is visible, making the top-bar brand redundant. */
  readonly visible = signal(false);
}
