import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
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

  public mobileMenu = toSignal(this.responsiveService.displayMobileLayout);

  // True while a page shows its own hero title (the landing) — the top bar hides
  // its duplicate brand copy meanwhile.
  public readonly heroTitleVisible = inject(HeroTitleService).visible;

  public readonly generativePieces = SKETCH_LIST;

  get years(): Set<number> {
    return this.artworkService.getAvailableYears();
  }

  get currentLang(): string {
    return (
      this.translateService.getCurrentLang() ||
      this.translateService.getFallbackLang() ||
      ALLOWED_LANGUAGES.ENGLISH
    );
  }

  // Short display code for the switcher button ('en-EN' -> 'EN').
  get currentLangLabel(): string {
    return this.currentLang.slice(0, 2).toUpperCase();
  }

  // The language lives in the address now (/artwork/5 vs /es/artwork/5), so
  // switching it means going to the other page rather than swapping the words
  // underneath the reader: the URL, the canonical and the essay must agree.
  // The route's language guard applies the change on arrival.
  public changeLanguage(): void {
    const path = this.router.url.split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '');
    const isSpanishUrl = path === 'es' || path.startsWith('es/');
    const bare = isSpanishUrl ? path.replace(/^es\/?/, '') : path;

    // Remembered so the first-visit redirect stops second-guessing them: a
    // Spanish browser asking for English must not be sent back to /es.
    storeLanguageChoice(isSpanishUrl ? ALLOWED_LANGUAGES.ENGLISH : ALLOWED_LANGUAGES.SPANISH);
    this.router.navigateByUrl(isSpanishUrl ? `/${bare}` : `/es/${bare}`);
  }
}
