import { Component, inject } from '@angular/core';
import { CANVASES } from '@constants/canvas.constants';
import { Canvas } from '@models/canvas.models';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { ResponsiveService } from '@services/responsive.service';
import { SessionQuery } from '@store/session.query';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NgTemplateOutlet } from '@angular/common';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';

@Component({
    selector: 'app-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.scss'],
    imports: [MatToolbar, MatToolbarRow, MatButton, RouterLink, MatIconButton, MatIcon, NgTemplateOutlet, MatDrawerContainer, MatDrawer, MatDrawerContent, BreadcrumbComponent, RouterOutlet, MatMenuTrigger, MatMenu, MatMenuItem, TranslatePipe]
})
export class TopMenuComponent {
  private sessionQuery = inject(SessionQuery);
  private responsiveService = inject(ResponsiveService);
  private translateService = inject(TranslateService);

  public mobileMenu = true;
  public mobileMenuOpen = true;

  constructor( ) { 
    this.responsiveService.displayMobileLayout.subscribe(display => this.mobileMenu = display);
  }

  get generativePieces(): Array<Canvas> {
    return CANVASES
  }

  get years(): Set<number> {
    return this.sessionQuery.years;
  }

  get currentLang(): string {
    return this.translateService.currentLang || this.translateService.getDefaultLang();
  }

  public toggleSidebarDisplay(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  public changeLanguage(): void {
    const nextLang = this.currentLang === "en-EN" ? "es-ES" : "en-EN";
    this.translateService.use(nextLang);
  }

}
