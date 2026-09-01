import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageUrlService } from '@shared/services/language-url.service';

@Component({
  selector: 'app-back-button',
  imports: [MatIconButton, MatIcon, MatTooltip, TranslatePipe],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
})
export class BackButtonComponent {
  private router = inject(Router);
  private location = inject(Location);
  private lang = inject(LanguageUrlService);

  /**
   * Back to where the reader came from, but only if that was somewhere here.
   *
   * Most people arrive at a painting from outside — a link from Instagram, a
   * search result — and for them the entry behind this one is not a page of
   * this site at all. `window.history.length > 1` was true for every one of
   * them, because a cross-site navigation is a history entry like any other,
   * so the button read "back" and quietly threw them off the site. Home is the
   * honest answer there: it is the only page we know they have not seen.
   */
  navigateBack(): void {
    if (this.previousPageIsOurs()) {
      this.location.back();
      return;
    }
    // In the language being read. `/` would answer a Spanish reader in English.
    this.router.navigateByUrl(this.lang.link());
  }

  /**
   * Whether the entry behind this one was made by this site.
   *
   * The router numbers every entry it creates, starting at one, and that number
   * travels with the entry through back and forward. So anything above one was
   * pushed by a navigation within the app, which means the entry beneath it is
   * ours as well.
   *
   * The number is read defensively and the referrer answers when it is absent:
   * on the entry the document was loaded into — the landing page, or any page
   * after a reload — there has been no in-app navigation to count, and the only
   * evidence left is which site sent the reader here.
   *
   * It errs towards home. A reader sent home when they could have gone back has
   * lost a step; a reader sent off the site has lost the site.
   */
  private previousPageIsOurs(): boolean {
    if (typeof window === 'undefined') return false;

    const state = window.history.state as { navigationId?: number } | null;
    if (typeof state?.navigationId === 'number' && state.navigationId > 1) return true;

    return this.referrerIsOurs();
  }

  private referrerIsOurs(): boolean {
    const referrer = document.referrer;
    if (!referrer) return false; // typed in, or opened from a bookmark
    try {
      return new URL(referrer).origin === window.location.origin;
    } catch {
      return false;
    }
  }
}
