import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  Question,
} from '@shared/components/confirm-dialog/confirm-dialog.component';
import { firstValueFrom } from 'rxjs';

/**
 * Asks him a yes-or-no question, without a dialog the browser might not have.
 *
 * One line at the call site, because it replaces one line — `window.confirm` —
 * in the five places the studio asked before doing something expensive or
 * irreversible. See the component for why none of those five worked in the
 * browser he now signs in from.
 *
 * Only ever `true` for a press on the yes button: a dismissed dialog, a closed
 * one, and an Escape all mean no, which is the right way round for a question
 * about spending money.
 */
@Injectable({ providedIn: 'root' })
export class AskService {
  private readonly dialog = inject(MatDialog);

  async confirm(question: Question): Promise<boolean> {
    const answer = await firstValueFrom(
      this.dialog.open(ConfirmDialogComponent, { data: question }).afterClosed()
    );
    return answer === true;
  }
}
