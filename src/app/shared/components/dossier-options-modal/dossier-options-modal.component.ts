import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-dossier-options-modal',
    templateUrl: './dossier-options-modal.component.html',
    styleUrl: './dossier-options-modal.component.scss',
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatSlideToggle, FormsModule, MatFormField, MatLabel, MatInput, MatDialogActions, MatButton, MatDialogClose, TranslatePipe]
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
