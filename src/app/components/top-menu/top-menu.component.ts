import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { SessionQuery } from '@store/session.query';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  public mobileMenu = false;
  public mobileMenuOpen = false;

  constructor(
    private sessionQuery: SessionQuery,
    private responsive: BreakpointObserver
  ) { 
  }

  ngOnInit() {
    this.responsive.observe([
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large
    ]).pipe(distinctUntilChanged())
    .subscribe(result => {
      this.mobileMenu = false;
      this.mobileMenuOpen = false;
      if (result.matches) {
        this.mobileMenu = true;
      }
    });
  }

  get years(): Set<string> {
    return this.sessionQuery.years;
  }

  public toggleSidebarDisplay(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

}
