import { Component } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Timeline, TimelineItem } from '@models/cv.models';
import { CV_OBJECT } from '@constants/cv.constants';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent {
  
  readonly totalCols = 14;
  readonly smallScreenYearColSpan = 2;
  readonly bigScreenYearColSpan = 1;
  readonly cvTimeline: Array<Timeline> = CV_OBJECT;


  public yearColSpan = this.bigScreenYearColSpan;
  public descColSpan = this.totalCols - this.yearColSpan;

  private isSmallScreen = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
    this.listenToScreenSize();
  }

  public numberOfItemsInYear(cvSection: Array<TimelineItem>, cvItem: TimelineItem): number {
    console.log("elements in year "+cvItem.year, cvSection.filter((item) => item.year === cvItem.year).length)
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
