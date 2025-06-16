import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatInput } from '@angular/material/input';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ContactService } from '@infrastructure/contact/contact.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { EMPTYSTRING, SNACKBAR_DURATION_MS } from '@shared/constants/common.constants';
import { ResponsiveService } from '@shared/services/responsive.service';
import { ApiResponse } from '@shared/types/api-response.type';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, MatGridList, MatGridTile, MatFormField, MatLabel, MatInput, MatError, MatHint, MatButton, TranslatePipe]
})
export class ContactComponent {
  private formBuilder = inject(FormBuilder);
  private translateService = inject(TranslateService);
  private contactService = inject(ContactService);
  private responsiveService = inject(ResponsiveService);
  private snackBar = inject(MatSnackBar);

  public form: FormGroup;
  public submitted = false;
  public isLoading = false;
  public horizontalView = true;

  constructor( ) {
    this.form = this.formBuilder.group({
      name: new FormControl(EMPTYSTRING, [Validators.required]),
      email: new FormControl(EMPTYSTRING, [Validators.required, Validators.email]),
      message: new FormControl(EMPTYSTRING, [Validators.required, Validators.maxLength(500)]),
      honeypot: new FormControl(EMPTYSTRING)
    })
    this.responsiveService.displayMobileLayout
      .pipe(takeUntilDestroyed(inject(DestroyRef))) //closes subscription on destroy
      .subscribe(display => this.horizontalView = display);
  }

  onSubmit() {
    if (this.checkFormValidity()) {
      const { name, email, message } = this.form.value;
      this.prepareSubmission();
      this.contactService.sendContactMessage({ name, email, message }).subscribe({
        next: (res) => this.handleResponse(res),
        error: (err) => this.handleResponse(err)
      });
    }
  }

  private prepareSubmission() {
    this.form.disable();
    this.isLoading = true;
  }

  private handleResponse(res: ApiResponse<string>) {
    if (res.success) this.resetForm();
    this.openSnackBar(res.message!);
    this.finalizeSubmission();
  }
  
  private finalizeSubmission(): void {
    this.form.enable();
    this.isLoading = false;
    this.submitted = true;
  }
  
  private resetForm(): void {
    this.form.reset();
  }

  private openSnackBar(message: string): void {
    const snackBarConfig: MatSnackBarConfig = {
      duration: SNACKBAR_DURATION_MS,
    };
    this.snackBar.open(message, "Ok!", snackBarConfig);
  }

  private checkFormValidity(): boolean {
    return this.form.valid && this.honeypot.value === EMPTYSTRING
  }

  getNameError() {
    return this.name.hasError('required') && this.translateService.instant("error.noValue")
  }

  getEmailError() {
    return this.email.hasError('required') ? this.translateService.instant("error.noValue") : this.email.hasError('email') && this.translateService.instant("error.invalidEmail")
  }

  getMessageError() {
    return this.message.hasError('required') && this.translateService.instant("error.noValue")
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get message(): FormControl {
    return this.form.get('message') as FormControl;
  }

  get honeypot(): FormControl {
    return this.form.get('honeypot') as FormControl;
  }
}
