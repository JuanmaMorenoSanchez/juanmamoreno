import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { environment } from '@environments/environment';
import { ResponsiveService } from '@services/responsive.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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

      this.httpClient.post(environment.backendUrl+'contact', formData).subscribe((res: any) => {
        console.log("res ", res);
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
    return this.name.hasError('required') && 'You must enter a value'
  }

  getEmailError() {
    return this.email.hasError('required') ? 'You must enter a value' : this.email.hasError('email') && 'Not a valid email'
  }

  getMessageError() {
    return this.message.hasError('required') && 'You must enter a value'
  }
}
