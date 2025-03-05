import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'app-dossier-options-modal',
    templateUrl: './dossier-options-modal.component.html',
    styleUrl: './dossier-options-modal.component.scss',
    standalone: false
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
