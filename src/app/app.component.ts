import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ShareButtonComponent } from '@shared/components/share-button/share-button.component';
import { TopMenuComponent } from '@shared/components/top-menu/top-menu.component';
import { ALLOWED_LANGUAGES, getPreferredLanguage } from '@shared/constants/languages.constants';
import translationsEN from '@translations/en.json';
import translationsES from '@translations/es.json';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [TopMenuComponent, ShareButtonComponent, BreadcrumbComponent, RouterOutlet],
})
export class AppComponent {
  private translateService = inject(TranslateService);
  private router = inject(Router);

  // Routes like the generative sketches opt out of the breadcrumb (and its
  // bottom spacing) via `data.hideBreadcrumb` — they're immersive, full-bleed
  // views where the chrome would just get in the way.
  readonly hideBreadcrumb = signal(this.deepestHideBreadcrumb(this.router.routerState.snapshot.root));

  constructor() {
    this.translateService.setTranslation(ALLOWED_LANGUAGES.ENGLISH, translationsEN);
    this.translateService.setTranslation(ALLOWED_LANGUAGES.SPANISH, translationsES);
    this.translateService.use(getPreferredLanguage());

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.hideBreadcrumb.set(this.deepestHideBreadcrumb(this.router.routerState.snapshot.root));
      });
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
