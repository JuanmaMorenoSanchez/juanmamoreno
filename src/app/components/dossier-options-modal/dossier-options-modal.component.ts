import { Component } from '@angular/core';
import { MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';


@Component({
    selector: 'app-dossier-options-modal',
    templateUrl: './dossier-options-modal.component.html',
    styleUrl: './dossier-options-modal.component.scss',
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatSlideToggle, FormsModule, MatFormField, MatLabel, MatInput, MatDialogActions, MatButton, MatDialogClose]
})
export class DossierOptionsModalComponent {
  customTitle: string = '';
  customText: string = '';
  includeContact: boolean = false;
  includeCv: boolean = false;
  includeStatement: boolean = false;
  isSubmitting: boolean = false;

  constructor(private dialogRef: MatDialogRef<DossierOptionsModalComponent>) {}

  submit() {
    this.isSubmitting = true;
    const options = {
      customTitle: this.customTitle,
      customText: this.customText,
      includeContact: this.includeContact,
      includeCv: this.includeCv,
      includeStatement: this.includeStatement
    };
    this.dialogRef.close(options);
  }
}
