import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CvEntry, CvKind } from '@domain/cv/cv-entry.entity';
import { TranslatePipe } from '@ngx-translate/core';
import { CvEntryFormComponent } from './cv-entry-form.component';

/** Which section is being added to, and which entry is being corrected. */
export interface CvEntryDialogData {
  kind: CvKind;
  entry: CvEntry | null;
}

/**
 * The cv form, in a window over the page.
 *
 * It used to open *underneath* the section it belonged to, which was the best
 * a page of fixed-height grid tiles could manage — a form inside one was
 * drawn with its bottom edge cut off, so it had to go below the list
 * entirely. That put eight fields between the line being corrected and the
 * next section, pushed everything after it down the page, and on a phone
 * opened a form mostly below the fold.
 *
 * A window has none of those problems and says plainly what is being done:
 * one thing, until it is finished or abandoned.
 *
 * A wrapper rather than the form itself, so the form stays a component that
 * can be put anywhere, and nothing about it knows it is in a dialog.
 */
@Component({
  selector: 'app-cv-entry-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CvEntryFormComponent, MatDialogContent, MatDialogTitle, TranslatePipe],
  template: `
    <h2 mat-dialog-title>{{ (data.entry ? 'cv.edit' : 'cv.add') | translate }}</h2>
    <mat-dialog-content>
      <app-cv-entry-form [kind]="data.kind" [entry]="data.entry" (done)="ref.close()" />
    </mat-dialog-content>
  `,
})
export class CvEntryDialogComponent {
  protected readonly data = inject<CvEntryDialogData>(MAT_DIALOG_DATA);
  protected readonly ref = inject(MatDialogRef<CvEntryDialogComponent>);
}
