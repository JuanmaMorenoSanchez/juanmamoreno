import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  public displayMobileLayout: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private responsive: BreakpointObserver
  ) {
    this.responsive.observe([
      Breakpoints.XSmall
    ]).pipe(distinctUntilChanged())
    .subscribe(result => {
      this.displayMobileLayout.next(true);
      if (result.matches) {
        this.displayMobileLayout.next(false);
      }
    });
  }
}
