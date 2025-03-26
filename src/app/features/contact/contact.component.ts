import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { environment } from '@environments/environment';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatFormField, MatLabel, MatError, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ResponsiveService } from '@shared/services/responsive.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, MatGridList, MatGridTile, MatFormField, MatLabel, MatInput, MatError, MatHint, MatButton, TranslatePipe]
})
export class ContactComponent {
  private formBuilder = inject(FormBuilder);
  private translateService = inject(TranslateService);
  private httpClient = inject(HttpClient);
  private responsiveService = inject(ResponsiveService);
  private snackBar = inject(MatSnackBar);

  readonly EMPTYSTRING = "";

  public form: FormGroup;
  public name: FormControl = new FormControl(this.EMPTYSTRING, [Validators.required]);
  public email: FormControl = new FormControl(this.EMPTYSTRING, [Validators.required, Validators.email]);
  public message: FormControl = new FormControl(this.EMPTYSTRING, [Validators.required, Validators.maxLength(500)]);
  public honeypot: FormControl = new FormControl(this.EMPTYSTRING);

  public submitted = false;
  public isLoading = false;
  public horizontalView = true;

  constructor( ) {
    this.form = this.formBuilder.group({
      name: this.name,
      email: this.email,
      message: this.message,
      honeypot: this.honeypot
    })
    this.responsiveService.displayMobileLayout.subscribe(display => this.horizontalView = display)
  }

  onSubmit() {
    if (this.checkFormValidity()) {
      this.form.disable();
      const formData = {
        name: this.form.get("name")?.value,
        email: this.form.get("email")?.value,
        message: this.form.get("message")?.value
      }

      this.isLoading = true;

      // TODO: move to new contact service
      this.httpClient.post(environment.backendUrl+'contact', formData).subscribe((res: any) => {
        this.form.enable();
        this.form.reset();
        this.openSnackBar(res.message)
        this.submitted = true;
        this.isLoading = false;
      }, error => {
        console.error("error ", error);
        this.form.enable();
        this.openSnackBar(error.message)
        this.submitted = true;
        this.isLoading = false;
      })
    }
  }

  private openSnackBar(message: string): void {
    const snackBarConfig: MatSnackBarConfig = {
      duration: 3000,
    };
    this.snackBar.open(message, "Ok!", snackBarConfig);
  }

  private checkFormValidity() {
    return this.form.valid && this.honeypot.value === this.EMPTYSTRING
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
}
