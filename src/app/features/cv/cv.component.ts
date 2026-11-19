import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DOWNLOADTYPES } from '@domain/cv/cv.constants';
import { CvKind, CvLine } from '@domain/cv/cv-entry.entity';
import { cvSections } from '@domain/cv/cv';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { LanguageUrlService } from '@shared/services/language-url.service';
import { CvService } from '@shared/services/cv.service';
import { TranslatePipe } from '@ngx-translate/core';
import { PdfButtonComponent } from '../../shared/components/pdf-button/pdf-button.component';
import { CvEntryDialogComponent, type CvEntryDialogData } from './cv-entry-dialog.component';

/**
 * The career.
 *
 * The list was an array in this repository until a show meant an edit, a
 * commit and a deploy; it comes from the api now, and the build bundles the
 * answer so this page is whole in the html before any request is sent.
 *
 * The entries carry their own two languages. The five headings and the seven
 * countries are still translation keys, which is the line: a closed set the
 * page names is a key, and content he can add to is data.
 */
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  imports: [MatButtonModule, MatIconModule, PdfButtonComponent, MatDivider, TranslatePipe],
})
export class CvComponent {
  private readonly dialog = inject(MatDialog);
  private readonly cv = inject(CvService);
  private readonly auth = inject(AdminAuthService);
  private readonly language = inject(LanguageUrlService);

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

  constructor() {
    void this.cv.refresh();
  }

  /** Adds an entry to a section, in a window over the page. */
  public add(kind: CvKind): void {
    this.open({ kind, entry: null });
  }

  /** Corrects one, in the same window. */
  public correct(id: string): void {
    const entry = this.cv.entries().find((one) => one.id === id);
    if (entry) this.open({ kind: entry.kind, entry });
  }

  private open(data: CvEntryDialogData): void {
    this.dialog.open(CvEntryDialogComponent, { data, width: '34rem', maxWidth: '92vw' });
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
}
