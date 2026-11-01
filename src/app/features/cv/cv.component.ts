import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, computed, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { DOWNLOADTYPES } from '@domain/cv/cv.constants';
import { CvLine } from '@domain/cv/cv-entry.entity';
import { cvSections } from '@domain/cv/cv';
import { LanguageUrlService } from '@shared/services/language-url.service';
import { CvService } from '@shared/services/cv.service';
import { TranslatePipe } from '@ngx-translate/core';
import { PdfButtonComponent } from '../../shared/components/pdf-button/pdf-button.component';
import { CvProseButtonComponent } from './cv-prose-button.component';

/**
 * The career.
 *
 * The list was an array in this repository until a show meant an edit, a
 * commit and a deploy; it comes from the api now, and the build bundles the
 * answer so this page is whole in the html before any request is sent.
 *
 * The entries carry their own two languages. The five headings and the six
 * countries are still translation keys, which is the line: a closed set the
 * page names is a key, and content he can add to is data.
 */
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  imports: [
    MatGridList,
    MatGridTile,
    PdfButtonComponent,
    CvProseButtonComponent,
    MatDivider,
    TranslatePipe,
  ],
})
export class CvComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private readonly cv = inject(CvService);
  private readonly language = inject(LanguageUrlService);

  readonly totalCols = 14;
  readonly smallScreenYearColSpan = 2;
  readonly bigScreenYearColSpan = 1;
  readonly downloadType: DOWNLOADTYPES = DOWNLOADTYPES.CV;

  /** A heading per kind, in the language the address is in. */
  readonly sections = computed(() =>
    cvSections(this.cv.entries(), this.language.contentLanguage())
  );

  public yearColSpan = this.bigScreenYearColSpan;
  public descColSpan = this.totalCols - this.yearColSpan;

  private isSmallScreen = false;

  constructor() {
    this.listenToScreenSize();
    void this.cv.refresh();
  }

  public numberOfItemsInYear(section: CvLine[], item: CvLine): number {
    return section.filter((one) => one.year === item.year).length;
  }

  /**
   * Whether this line is the one that carries its year's label.
   *
   * By id rather than by title: two entries in one year with the same title
   * would both have claimed the label, and before the entries had ids there
   * was nothing else to ask.
   */
  public displayYearLabel(section: CvLine[], item: CvLine): boolean {
    return section.find((one) => one.year === item.year)?.id === item.id;
  }

  private listenToScreenSize(): void {
    this.breakpointObserver
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        if (result.breakpoints['(max-width: 599.98px) and (orientation: portrait)']) {
          this.isSmallScreen = true;
        } else {
          this.isSmallScreen = false;
        }
        this.yearColSpan = this.isSmallScreen
          ? this.smallScreenYearColSpan
          : this.bigScreenYearColSpan;
        this.descColSpan = this.totalCols - this.yearColSpan;
      });
  }
}
