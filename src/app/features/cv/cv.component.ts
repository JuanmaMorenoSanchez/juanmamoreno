import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { DOWNLOADTYPES } from '@domain/cv/cv.constants';
import { CvKind, CvLine } from '@domain/cv/cv-entry.entity';
import { cvSections } from '@domain/cv/cv';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { LanguageUrlService } from '@shared/services/language-url.service';
import { CvService } from '@shared/services/cv.service';
import { TranslatePipe } from '@ngx-translate/core';
import { PdfButtonComponent } from '../../shared/components/pdf-button/pdf-button.component';
import { CvEntryFormComponent } from './cv-entry-form.component';
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
    MatButtonModule,
    MatGridList,
    MatGridTile,
    MatIconModule,
    PdfButtonComponent,
    CvEntryFormComponent,
    CvProseButtonComponent,
    MatDivider,
    TranslatePipe,
  ],
})
export class CvComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private readonly cv = inject(CvService);
  private readonly auth = inject(AdminAuthService);
  private readonly language = inject(LanguageUrlService);

  readonly totalCols = 14;
  readonly smallScreenYearColSpan = 2;
  readonly bigScreenYearColSpan = 1;
  readonly downloadType: DOWNLOADTYPES = DOWNLOADTYPES.CV;

  /** A heading per kind, in the language the address is in. */
  readonly sections = computed(() =>
    cvSections(this.cv.entries(), this.language.contentLanguage())
  );

  /**
   * Whether the one person who can edit the cv is reading it.
   *
   * What the interface shows, and nothing more: the api verifies the same
   * credential on every write, which is what makes it safe. Not drawing any of
   * this for everybody else is what keeps the page a cv.
   */
  readonly mine = computed(() => this.auth.isAdmin());

  /** Which section an entry is being added under, if one is. */
  private readonly adding = signal<CvKind | null>(null);

  /** Which entry is being corrected, by id, if one is. */
  private readonly editing = signal<string | null>(null);

  /** That entry in full, which is more than the drawn line carries. */
  readonly correcting = computed(
    () => this.cv.entries().find((entry) => entry.id === this.editing()) ?? null
  );

  public yearColSpan = this.bigScreenYearColSpan;
  public descColSpan = this.totalCols - this.yearColSpan;

  private isSmallScreen = false;

  constructor() {
    this.listenToScreenSize();
    void this.cv.refresh();
  }

  /**
   * Whether this section is the one holding the open form.
   *
   * A section at a time, so the form appears under the list it belongs to —
   * which is where he was looking. Correcting an entry shows it under that
   * entry's own section, whichever one that is.
   */
  public formOpenIn(kind: CvKind): boolean {
    return this.adding() === kind || this.correcting()?.kind === kind;
  }

  /** The kind an open form opens on: the entry's, or the section's. */
  public formKind(kind: CvKind): CvKind {
    return this.correcting()?.kind ?? kind;
  }

  public add(kind: CvKind): void {
    this.editing.set(null);
    this.adding.set(kind);
  }

  public correct(id: string): void {
    this.adding.set(null);
    this.editing.set(id);
  }

  public closeForm(): void {
    this.adding.set(null);
    this.editing.set(null);
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
