import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { TopMenuComponent } from '@shared/components/top-menu/top-menu.component';
import { ALLOWED_LANGUAGES } from '@shared/constants/languages.constants';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { AvailabilityService } from '@shared/services/availability.service';
import { CanonicalService } from '@shared/services/canonical.service';
import { LanguageUrlService } from '@shared/services/language-url.service';
import translationsEN from '@translations/en.json';
import translationsES from '@translations/es.json';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [TopMenuComponent, FooterComponent, BreadcrumbComponent, RouterOutlet, TranslatePipe],
})
export class AppComponent {
  private translateService = inject(TranslateService);
  private canonicalService = inject(CanonicalService);
  private router = inject(Router);
  private auth = inject(AdminAuthService);
  private availability = inject(AvailabilityService);
  // Public: the shell asks it whether this page belongs to a language tree,
  // which is what decides the footer.
  protected lang = inject(LanguageUrlService);

  readonly hideBreadcrumb = signal(
    this.deepestHideBreadcrumb(this.router.routerState.snapshot.root)
  );

  constructor() {
    this.canonicalService.init();
    // Which paintings are sold, once per visit rather than once per page: the
    // catalogue, every artwork page and every printed sheet ask the same
    // question, and the answer is the same few hundred bytes for all of them.
    // Asked here so a page prerendered at build time is written with what was
    // true at build time, rather than with nothing.
    void this.availability.refresh();
    // Google's token lasts an hour. Without this the studio quietly stopped
    // recognising him wherever he was standing, and the only way back was to
    // remember that /door exists. Does nothing for anyone who has never signed
    // in here, and loads nothing either.
    this.auth.keepAlive();

    this.translateService.setTranslation(ALLOWED_LANGUAGES.ENGLISH, translationsEN);
    this.translateService.setTranslation(ALLOWED_LANGUAGES.SPANISH, translationsES);
    // A starting point only: the route's language guard settles which language
    // this page is actually in, before anything renders. Picking the browser's
    // language here instead would show one language for a frame and then swap.
    this.translateService.use(ALLOWED_LANGUAGES.ENGLISH);

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.hideBreadcrumb.set(this.deepestHideBreadcrumb(this.router.routerState.snapshot.root));
      });
  }

  /**
   * Past the toolbar and into the page, for a reader using a keyboard.
   *
   * The default is followed rather than allowed: an unhandled `#main-content`
   * is a router navigation to a route that does not exist. Moving focus by
   * hand also puts the caret where the reader expects it, which a fragment
   * jump on its own does not do.
   */
  protected skipToContent(event: Event): void {
    event.preventDefault();
    document.getElementById('main-content')?.focus();
  }

  private deepestHideBreadcrumb(route: ActivatedRouteSnapshot): boolean {
    let node: ActivatedRouteSnapshot | null = route;
    let found = false;
    while (node) {
      if (node.data['hideBreadcrumb']) found = true;
      node = node.firstChild;
    }
    return found;
  }
}
