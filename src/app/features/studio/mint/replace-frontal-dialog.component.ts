import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

/** What the artist is being asked about. */
export interface ReplaceFrontalQuestion {
  name: string;
  /** The certificate holding the frontal view now. */
  tokenId?: string;
  /** What this photograph would be written as. */
  nextVersion?: number;
}

/**
 * Whether this photograph replaces the one the painting already has.
 *
 * A painting can be photographed more than once — a better light, a straighter
 * wall, a lens that does not bend the corners — and only one of those can be
 * the frontal view the catalogue shows. Which one is written into the
 * certificate itself, as a version, and a certificate is written once.
 *
 * So the question is asked here, before anything is prepared, and it is asked
 * in words rather than as a second press: what is being decided is not whether
 * a button was meant, but which photograph of a painting is the painting's
 * photograph. That needs saying, along with the thing people assume and should
 * not have to: **the older certificate is not rewritten**. It keeps saying what
 * it said, on the chain, because it was true when it was written. Only the
 * catalogue changes its mind.
 */
@Component({
  selector: 'app-replace-frontal-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>This painting already has a frontal view</h2>

    <mat-dialog-content>
      <p>
        <i>{{ data.name }}</i>
        @if (data.tokenId) {
          is already photographed by certificate #{{ data.tokenId }}.
        } @else {
          already has a frontal view.
        }
      </p>
      <p>
        Is this photograph meant to replace it? It would be written as
        <strong>version {{ data.nextVersion }}</strong
        >, and the catalogue would show this one instead.
      </p>
      <p class="replace-note">
        Nothing is rewritten. The older certificate keeps saying exactly what it says on the
        chain — it was true when it was written — and the site lists it as work in progress
        from then on.
      </p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button type="button" (click)="answer(false)">No, cancel</button>
      <button mat-raised-button color="primary" type="button" (click)="answer(true)">
        Yes, replace it
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .replace-note {
        font-size: 0.85rem;
        opacity: 0.75;
      }
    `,
  ],
})
export class ReplaceFrontalDialogComponent {
  protected readonly data = inject<ReplaceFrontalQuestion>(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialogRef<ReplaceFrontalDialogComponent, boolean>);

  protected answer(replace: boolean): void {
    this.dialog.close(replace);
  }
}
