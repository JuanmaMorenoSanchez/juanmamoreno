import { Component, inject, signal } from '@angular/core';
import { disabled, email, form, FormField, FormRoot, maxLength, required } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { EMPTYSTRING, SNACKBAR_DURATION_MS } from '@shared/constants/common.constants';
import { ApiResponse } from '@shared/types/api-response.type';
import { ContactService } from './contact.service';

interface ContactFormModel {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

const EMPTY_CONTACT_FORM: ContactFormModel = {
  name: EMPTYSTRING,
  email: EMPTYSTRING,
  message: EMPTYSTRING,
  honeypot: EMPTYSTRING,
};

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [FormField, FormRoot, MatFormField, MatLabel, MatInput, MatError, MatHint, MatButton, TranslatePipe],
})
export class ContactComponent {
  private translateService = inject(TranslateService);
  private contactService = inject(ContactService);
  private snackBar = inject(MatSnackBar);

  public submitted = false;
  public isLoading = signal(false);

  private readonly model = signal<ContactFormModel>({ ...EMPTY_CONTACT_FORM });

  public readonly contactForm = form(this.model, (path) => {
    required(path.name);
    required(path.email);
    email(path.email);
    required(path.message);
    maxLength(path.message, 256);
    disabled(path, { when: () => this.isLoading() });
  });

  onSubmit() {
    if (this.checkFormValidity()) {
      const { name, email, message } = this.model();
      this.prepareSubmission();
      this.contactService.sendContactMessage({ name, email, message }).subscribe({
        next: (res) => this.handleResponse(res),
        error: () => this.handleSubmissionError(),
      });
    }
  }

  private prepareSubmission() {
    this.isLoading.set(true);
  }

  private handleResponse(res: ApiResponse<string>) {
    if (res.success) this.resetForm();
    this.openSnackBar(res.message!);
    this.finalizeSubmission();
  }

  private handleSubmissionError(): void {
    this.openSnackBar(this.translateService.instant('error.submissionFailed'));
    this.finalizeSubmission();
  }

  private finalizeSubmission(): void {
    this.isLoading.set(false);
    this.submitted = true;
  }

  private resetForm(): void {
    this.model.set({ ...EMPTY_CONTACT_FORM });
  }

  private openSnackBar(message: string): void {
    const snackBarConfig: MatSnackBarConfig = {
      duration: SNACKBAR_DURATION_MS,
    };
    this.snackBar.open(message, 'Ok!', snackBarConfig);
  }

  private checkFormValidity(): boolean {
    return this.contactForm().valid() && this.model().honeypot === EMPTYSTRING;
  }

  getNameError() {
    return this.hasError(this.contactForm.name, 'required') && this.translateService.instant('error.noValue');
  }

  getEmailError() {
    return this.hasError(this.contactForm.email, 'required')
      ? this.translateService.instant('error.noValue')
      : this.hasError(this.contactForm.email, 'email') && this.translateService.instant('error.invalidEmail');
  }

  getMessageError() {
    return this.hasError(this.contactForm.message, 'required') && this.translateService.instant('error.noValue');
  }

  get messageLength(): number {
    return this.contactForm.message().value().length;
  }

  private hasError(field: () => { errors: () => readonly { kind: string }[] }, kind: string): boolean {
    return field().errors().some((error) => error.kind === kind);
  }
}
