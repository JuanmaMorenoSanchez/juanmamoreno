import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { SKETCH_LIST } from '@features/generative/sketches/registry';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ALLOWED_LANGUAGES, storeLanguageChoice } from '@shared/constants/languages.constants';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { LanguageUrlService } from '@shared/services/language-url.service';
import { HeroTitleService } from '@shared/services/hero-title.service';
import { ThemeService } from '@shared/services/theme.service';

/** `paintings/years` closes back to `paintings`, not to nothing. */
function parentOf(path: string): string | null {
  const cut = path.lastIndexOf('/');
  return cut === -1 ? null : path.slice(0, cut);
}

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  imports: [RouterLink, TranslatePipe],
  // Anywhere else on the page, and anything that moves the reader on, closes
  // whatever is open. A bar menu that survives a navigation is a bar menu
  // hanging over the page the reader asked for.
  host: {
    '(document:click)': 'closeEverything()',
    '(document:keydown.escape)': 'closeEverything()',
  },
})
export class TopMenuComponent {
  private artworkService = inject(ARTWORK_PORT);
  private translateService = inject(TranslateService);
  private router = inject(Router);
  // Public: the template builds every link through it, so a Spanish reader
  // clicking "About" lands on /es/about rather than back in English.
  protected lang = inject(LanguageUrlService);

  /**
   * The way in and out of the studio, for the one person it belongs to.
   *
   * Whether the workshop menu is drawn at all. Every private address in the
   * site hangs off it, so a reader is never shown one — they are offered the
   * door instead, which is the only way in and tells nobody anything.
   *
   * It used to be two questions. The weaker one — has this browser ever signed
   * in — decided whether to offer the way back after a session had lapsed, and
   * nothing asks it now: the door is there for everybody, so there is no longer
   * a state in which the way back is hidden.
   *
   * Neither is a security boundary. The guard on each route decides what is
   * drawn and the backend decides what happens; this decides what is offered.
   */
  private auth = inject(AdminAuthService);
  protected readonly signedIn = computed(() => this.auth.isAdmin());

  protected signOut(): void {
    this.auth.signOut();
  }

  // Public: the toolbar reads and toggles it directly.
  protected theme = inject(ThemeService);

  /**
   * Which sheet is down, as a path, and whether the phone's menu is open.
   *
   * A path rather than a name so a nested sheet can be open inside its parent:
   * `paintings/years` means both. One at a time, because two sheets down at
   * once in a bar this size cover the page they are supposed to be a way out
   * of.
   *
   * With javascript off none of this runs. The `<details>` elements fall back
   * to the browser's own disclosure, which is the whole reason they are
   * `<details>`: the years were unreachable without a script before.
   */
  private readonly drop = signal<string | null>(null);
  protected readonly menuOpen = signal(false);

  protected dropOpen(path: string): boolean {
    return (this.drop() ?? '').startsWith(path);
  }

  /**
   * `preventDefault` because the component owns `open`, not the browser: left
   * to itself the element would toggle as well and the two would disagree.
   * `stopPropagation` because the document listener that closes everything
   * would otherwise run on this very click and shut the sheet as it opened.
   */
  protected toggleDrop(path: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.drop.update((open) => (open === path ? parentOf(path) : path));
  }

  protected toggleMenu(event: Event): void {
    event.stopPropagation();
    this.menuOpen.update((open) => !open);
    this.drop.set(null);
  }

  /** Anywhere else on the page, Escape, or anything that navigates. */
  protected closeEverything(): void {
    this.drop.set(null);
    this.menuOpen.set(false);
  }

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
    // the round trip through /es/mint and back, which changed nothing and
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
