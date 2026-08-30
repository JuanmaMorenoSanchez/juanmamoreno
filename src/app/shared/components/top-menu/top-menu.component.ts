import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { SKETCH_LIST } from '@features/generative/sketches/registry';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ALLOWED_LANGUAGES, storeLanguageChoice } from '@shared/constants/languages.constants';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { LanguageUrlService } from '@shared/services/language-url.service';
import { HeroTitleService } from '@shared/services/hero-title.service';
import { ResponsiveService } from '@shared/services/responsive.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatButton,
    RouterLink,
    MatIconButton,
    MatIcon,
    NgTemplateOutlet,
    MatDrawerContainer,
    MatDrawerContent,
    MatDrawer,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
  ],
})
export class TopMenuComponent {
  private artworkService = inject(ARTWORK_PORT);
  private responsiveService = inject(ResponsiveService);
  private translateService = inject(TranslateService);
  private router = inject(Router);
  // Public: the template builds every link through it, so a Spanish reader
  // clicking "About" lands on /es/about rather than back in English.
  protected lang = inject(LanguageUrlService);

  /**
   * The way in and out of the studio, for the one person it belongs to.
   *
   * Shown only on a browser that has signed in here before, so a reader is
   * never offered a login to a place that is not theirs. The marker survives
   * signing out on purpose: otherwise signing out would take away the way back.
   */
  private auth = inject(AdminAuthService);
  protected readonly signedIn = computed(() => this.auth.isAdmin());
  protected readonly knownHere = computed(() => this.auth.knownHere());

  protected signOut(): void {
    this.auth.signOut();
  }

  public mobileMenu = toSignal(this.responsiveService.displayMobileLayout);

  // True while a page shows its own hero title (the landing) — the top bar hides
  // its duplicate brand copy meanwhile.
  public readonly heroTitleVisible = inject(HeroTitleService).visible;

  public readonly generativePieces = SKETCH_LIST;

  get years(): Set<number> {
    return this.artworkService.getAvailableYears();
  }

  /** Offered in the switcher, in the order they appear in the list. */
  public readonly languages = [
    { code: ALLOWED_LANGUAGES.SPANISH, label: 'Espanol' },
    { code: ALLOWED_LANGUAGES.ENGLISH, label: 'English' },
  ];

  // Read from the address rather than from the translate service: the URL is
  // what decides the language, and the two disagree for a moment on arrival.
  // Except where the address holds no language at all — the studio and the door
  // — and the only record of the reader's choice is the one they made.
  get activeLanguage(): ALLOWED_LANGUAGES {
    if (!this.lang.carriesLanguage()) {
      return this.translateService.currentLang() === ALLOWED_LANGUAGES.SPANISH
        ? ALLOWED_LANGUAGES.SPANISH
        : ALLOWED_LANGUAGES.ENGLISH;
    }
    return this.lang.inSpanish() ? ALLOWED_LANGUAGES.SPANISH : ALLOWED_LANGUAGES.ENGLISH;
  }

  // Short display code for the collapsed switcher ('es-ES' -> 'ES').
  get currentLangLabel(): string {
    return this.activeLanguage.slice(0, 2).toUpperCase();
  }

  // The language lives in the address now (/artwork/5 vs /es/artwork/5), so
  // switching it means going to the other page rather than swapping the words
  // underneath the reader: the URL, the canonical and the essay must agree.
  // The route's language guard applies the change on arrival.
  public selectLanguage(language: ALLOWED_LANGUAGES): void {
    if (language === this.activeLanguage) {
      return;
    }

    const path = this.router.url
      .split('?')[0]
      .split('#')[0]
      .replace(/^\/+|\/+$/g, '');
    const bare = path === 'es' || path.startsWith('es/') ? path.replace(/^es\/?/, '') : path;

    // Remembered so the first-visit redirect stops second-guessing them: a
    // Spanish browser asking for English must not be sent back to /es.
    storeLanguageChoice(language);

    // Nowhere to navigate to on a page that exists at one address only, so the
    // change happens where the reader is standing. Leaving early also avoids
    // the round trip through /es/studio and back, which changed nothing and
    // read as a switcher that does not work.
    if (!this.lang.carriesLanguage()) {
      this.translateService.use(language);
      return;
    }

    // Trailing slash stripped deliberately. From the home page `bare` is empty,
    // so the naive target is "/es/", which the router reads as the two segments
    // ["es", ""] and fails to match, landing the reader on the 404. Opening
    // "/es/" as a link works only because the browser normalises it away before
    // the router ever sees it, which is why this only broke on the button.
    const prefix = language === ALLOWED_LANGUAGES.SPANISH ? '/es' : '';
    this.router.navigateByUrl(`${prefix}/${bare}`.replace(/\/+$/, '') || '/');
  }
}
