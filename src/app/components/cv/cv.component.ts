import { Component, inject } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { DOWNLOADTYPES, Timeline, TimelineItem } from '@models/cv.models';
import { CV_OBJECT } from '@constants/cv.constants';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { PdfButtonComponent } from '../pdf-button/pdf-button.component';
import { MatDivider } from '@angular/material/divider';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-cv',
    templateUrl: './cv.component.html',
    styleUrls: ['./cv.component.scss'],
    imports: [MatGridList, MatGridTile, PdfButtonComponent, MatDivider, TranslatePipe]
})
export class CvComponent {
  private breakpointObserver = inject(BreakpointObserver);
  
  readonly totalCols = 14;
  readonly smallScreenYearColSpan = 2;
  readonly bigScreenYearColSpan = 1;
  readonly cvTimeline: Array<Timeline> = CV_OBJECT;
  readonly downloadType: DOWNLOADTYPES = DOWNLOADTYPES.CV;

  public yearColSpan = this.bigScreenYearColSpan;
  public descColSpan = this.totalCols - this.yearColSpan;

  private isSmallScreen = false;

  constructor( ) {
    this.listenToScreenSize();
  }

  public numberOfItemsInYear(cvSection: Array<TimelineItem>, cvItem: TimelineItem): number {
    return cvSection.filter((item) => item.year === cvItem.year).length
  }

  public displayYearLabel(cvSection: Array<TimelineItem>, cvItem: TimelineItem): boolean {
    const filteredItems = cvSection.filter((item) => item.year === cvItem.year);
    return filteredItems[0].title === cvItem.title
  }

  private listenToScreenSize(): void {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.breakpoints["(max-width: 599.98px) and (orientation: portrait)"]) {
        this.isSmallScreen = true;
      } else {
        this.isSmallScreen = false;
      }
      this.yearColSpan = this.isSmallScreen ? this.smallScreenYearColSpan : this.bigScreenYearColSpan
      this.descColSpan = this.totalCols - this.yearColSpan;
    });
  }
}
