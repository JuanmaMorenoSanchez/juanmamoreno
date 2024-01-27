import { Component } from '@angular/core';
import { CANVASES } from '@constants/canvas.constants';
import { Canvas } from '@models/canvas.models';
import { ResponsiveService } from '@services/responsive.service';
import { SessionQuery } from '@store/session.query';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {

  public mobileMenu = true;
  public mobileMenuOpen = true;

  constructor(
    private sessionQuery: SessionQuery,
    private responsiveService: ResponsiveService
  ) { 
    this.responsiveService.displayMobileLayout.subscribe(display => this.mobileMenu = display)
  }

  get generativePieces(): Array<Canvas> {
    return CANVASES
  }

  get years(): Set<number> {
    return this.sessionQuery.years;
  }

  public toggleSidebarDisplay(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

}
