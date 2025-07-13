import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
// import { CANVASES } from '@domain/generative/canvas.constants';
// import { Canvas } from '@domain/generative/canvas.entity';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ALLOWED_LANGUAGES } from '@shared/constants/languages.constants';
import { ResponsiveService } from '@shared/services/responsive.service';
import { SessionQuery } from '@shared/store/session.query';

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
  private sessionQuery = inject(SessionQuery);
  private responsiveService = inject(ResponsiveService);
  private translateService = inject(TranslateService);

  public mobileMenu = toSignal(this.responsiveService.displayMobileLayout);

  // get generativePieces(): Array<Canvas> {
  //   return CANVASES
  // }

  get years(): Set<number> {
    return this.artworkService.getYears(this.sessionQuery.getValue().artPieces);
  }

  get currentLang(): string {
    return (
      this.translateService.currentLang ||
      this.translateService.getDefaultLang()
    );
  }

  public changeLanguage(): void {
    const nextLang =
      this.currentLang === ALLOWED_LANGUAGES.ENGLISH
        ? ALLOWED_LANGUAGES.SPANISH
        : ALLOWED_LANGUAGES.ENGLISH;
    this.translateService.use(nextLang);
  }
}
