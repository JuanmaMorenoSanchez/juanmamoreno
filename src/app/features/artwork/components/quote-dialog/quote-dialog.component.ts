import { Component, inject, signal } from '@angular/core';
import { disabled, email, form, FormField, FormRoot, maxLength, required } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { EMPTYSTRING, SNACKBAR_DURATION_MS } from '@shared/constants/common.constants';
import { MailService, QuoteMode } from '@shared/services/mail/mail.service';
import { ApiResponse } from '@shared/types/api-response.type';

export interface QuoteDialogData {
  artworkName: string;
  tokenId: string;
  mode: QuoteMode;
}

interface QuoteFormModel {
  email: string;
  message: string;
  honeypot: string;
}

const EMPTY_QUOTE_FORM: QuoteFormModel = {
  email: EMPTYSTRING,
  message: EMPTYSTRING,
  honeypot: EMPTYSTRING,
};

const MESSAGE_MAX_LENGTH = 500;

/**
 * Enquiry dialog for a single artwork. Only the email is required; the message
 * is optional. The same dialog serves two framings via `data.mode`: a price
 * request for an available piece, or an availability/info enquiry for a sold
 * one. Mirrors the contact form (signal forms + honeypot) and sends through the
 * shared MailService.
 */
@Component({
  selector: 'app-quote-dialog',
  templateUrl: './quote-dialog.component.html',
  styleUrl: './quote-dialog.component.scss',
  imports: [
    FormField,
    FormRoot,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatHint,
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    TranslatePipe,
  ],
})
export class QuoteDialogComponent {
  readonly data = inject<QuoteDialogData>(MAT_DIALOG_DATA);
  private dialogRef = inject<MatDialogRef<QuoteDialogComponent>>(MatDialogRef);
  private mailService = inject(MailService);
  private translateService = inject(TranslateService);
  private snackBar = inject(MatSnackBar);

  readonly messageMaxLength = MESSAGE_MAX_LENGTH;
  readonly isLoading = signal(false);

  private readonly model = signal<QuoteFormModel>({ ...EMPTY_QUOTE_FORM });

  readonly quoteForm = form(this.model, (path) => {
    required(path.email);
    email(path.email);
    maxLength(path.message, MESSAGE_MAX_LENGTH);
    disabled(path, { when: () => this.isLoading() });
  });

  onSubmit(): void {
    if (!this.checkFormValidity()) return;
    const { email, message } = this.model();
    this.isLoading.set(true);
    this.mailService
      .sendQuoteRequest({
        email,
        message,
        artworkName: this.data.artworkName,
        tokenId: this.data.tokenId,
        mode: this.data.mode,
      })
      .subscribe({
        next: (res) => this.handleResponse(res),
        error: () => this.handleSubmissionError(),
      });
  }

  close(): void {
    this.dialogRef.close();
  }

  private handleResponse(res: ApiResponse<string>): void {
    this.isLoading.set(false);
    if (res.success) {
      this.openSnackBar(this.translateService.instant('quote.success'));
      this.dialogRef.close(true);
      return;
    }
    this.openSnackBar(res.message ?? this.translateService.instant('error.submissionFailed'));
  }

  private handleSubmissionError(): void {
    this.isLoading.set(false);
    this.openSnackBar(this.translateService.instant('error.submissionFailed'));
  }

  private checkFormValidity(): boolean {
    return this.quoteForm().valid() && this.model().honeypot === EMPTYSTRING;
  }

  getEmailError() {
    return this.hasError(this.quoteForm.email, 'required')
      ? this.translateService.instant('error.noValue')
      : this.hasError(this.quoteForm.email, 'email') &&
          this.translateService.instant('error.invalidEmail');
  }

  get messageLength(): number {
    return this.quoteForm.message().value().length;
  }

  private openSnackBar(message: string): void {
    const snackBarConfig: MatSnackBarConfig = { duration: SNACKBAR_DURATION_MS };
    this.snackBar.open(message, 'Ok!', snackBarConfig);
  }

  private hasError(field: () => { errors: () => readonly { kind: string }[] }, kind: string): boolean {
    return field().errors().some((error) => error.kind === kind);
  }
}
