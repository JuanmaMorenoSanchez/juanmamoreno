import { Component, inject, signal } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/core';
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
import { filter } from 'rxjs';

/** The build's answer to "does this page hide the trail", handed to the browser. */
const HIDE_BREADCRUMB = makeStateKey<boolean>('hideBreadcrumb');

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

  /**
   * Whether this page is one of the ones that hides the trail, decided by the
   * build and carried in the page.
   *
   * It used to be read from the router's snapshot here, and in the browser this
   * component is built before the first navigation has resolved — so the
   * snapshot was empty, every page answered "no", and the browser's first frame
   * drew a breadcrumb over prerendered html that has none. Angular then took it
   * away again 30ms later. On an artwork page that was a 56px jump, measured,
   * on every visit.
   *
   * The build has the same empty snapshot at this point — so it writes the
   * answer down when its own navigation ends, which is before the html is
   * serialized, and the browser reads it here. The same way the catalogue
   * itself crosses from one to the other.
   */
  private readonly carried = inject(TransferState);
  readonly hideBreadcrumb = signal(
    this.carried.get(
      HIDE_BREADCRUMB,
      this.deepestHideBreadcrumb(this.router.routerState.snapshot.root)
    )
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

    // A starting point only, and only if nothing has chosen yet: the route's
    // language guard settles which language this page is actually in, before
    // anything renders. Guarded rather than unconditional because the ordering
    // between this and the guard is Angular's to decide, not ours — set
    // unconditionally, it undoes a guard that happened to run first.
    if (!this.translateService.currentLang()) {
      this.translateService.use(ALLOWED_LANGUAGES.ENGLISH);
    }

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.hideBreadcrumb.set(this.deepestHideBreadcrumb(this.router.routerState.snapshot.root));
        // Written on every navigation, which during a build means the last one
        // written is the one this page ends up serialized with.
        this.carried.set(HIDE_BREADCRUMB, this.hideBreadcrumb());
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
