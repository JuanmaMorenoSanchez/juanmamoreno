import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

/** What is being asked, and what the yes button should say. */
export interface Question {
  title: string;
  /** One paragraph per line. */
  body: string[];
  /** The yes button's words. Say the deed, not "OK". */
  yes: string;
  /** Whether the deed spends money or cannot be undone. */
  grave?: boolean;
}

/**
 * Asks before something irreversible or expensive, in the page.
 *
 * It replaces `window.confirm`, which the studio used in five places and which
 * **does not exist in a wallet app's own browser**. A WebView only has the JS
 * dialogs its host app chose to implement; where they are missing the call
 * returns false at once, so every one of those five questions was answered no
 * before he could read it. The press did nothing, said nothing, and left no
 * trace — which is exactly how the Mint button came to look broken, and it was
 * not broken.
 *
 * That browser is now where the studio is used, because the wallet door lives
 * there, so a dialog the host might not implement cannot be part of any path he
 * takes. This is the house pattern besides: every other question on the site is
 * already a `MatDialog`.
 */
@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>

    <mat-dialog-content>
      @for (line of data.body; track line) {
        <p>{{ line }}</p>
      }
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button type="button" (click)="answer(false)">No, leave it</button>
      <button
        mat-raised-button
        type="button"
        [color]="data.grave ? 'warn' : 'primary'"
        (click)="answer(true)"
      >
        {{ data.yes }}
      </button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDialogComponent {
  protected readonly data = inject<Question>(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialogRef<ConfirmDialogComponent, boolean>);

  protected answer(yes: boolean): void {
    this.dialog.close(yes);
  }
}
