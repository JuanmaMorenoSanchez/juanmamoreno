import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { CANVASES } from '@constants/canvas.constants';
import { Canvas } from '@models/canvas.models';
import { SessionQuery } from '@store/session.query';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  public mobileMenu = true;
  public mobileMenuOpen = true;

  constructor(
    private sessionQuery: SessionQuery,
    private responsive: BreakpointObserver
  ) { 
  }

  ngOnInit() {
    this.responsive.observe([
      Breakpoints.XSmall
    ]).pipe(distinctUntilChanged())
    .subscribe(result => {
      this.mobileMenu = true;
      this.mobileMenuOpen = true;
      if (result.matches) {
        this.mobileMenu = false;
      }
    });
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
