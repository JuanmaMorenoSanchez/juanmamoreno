import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { environment } from '@environments/environment';
import { ResponsiveService } from '@services/responsive.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {

  readonly EMPTYSTRING = "";

  public form: FormGroup;
  public name: FormControl = new FormControl(this.EMPTYSTRING, [Validators.required]);
  public email: FormControl = new FormControl(this.EMPTYSTRING, [Validators.required, Validators.email]);
  public message: FormControl = new FormControl(this.EMPTYSTRING, [Validators.required, Validators.maxLength(500)]);
  public honeypot: FormControl = new FormControl(this.EMPTYSTRING);

  public submitted = false;
  public isLoading = false;
  public horizontalView = true;

  constructor(
    private httpClient: HttpClient,    
    private formBuilder: FormBuilder,
    private responsiveService: ResponsiveService,
    private translateService: TranslateService,
    public snackBar: MatSnackBar
  ) {
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
