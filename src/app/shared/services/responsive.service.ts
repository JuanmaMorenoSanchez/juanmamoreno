import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private responsive = inject(BreakpointObserver);

  public displayMobileLayout: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.responsive.observe([
      Breakpoints.XSmall
    ]).pipe(distinctUntilChanged())
    .subscribe(result => {
      // Note: historically inverted — emits false on XSmall (mobile) screens
      // and true otherwise; consumers rely on this convention.
      this.displayMobileLayout.next(!result.matches);
    });
  }
}
