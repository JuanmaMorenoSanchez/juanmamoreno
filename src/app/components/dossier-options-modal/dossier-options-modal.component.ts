import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dossier-options-modal',
  templateUrl: './dossier-options-modal.component.html',
  styleUrl: './dossier-options-modal.component.scss'
})
export class DossierOptionsModalComponent {
  customTitle: string = '';
  customText: string = '';
  includeCv: boolean = false;
  includeStatement: boolean = false;
  isSubmitting: boolean = false;

  constructor(private dialogRef: MatDialogRef<DossierOptionsModalComponent>) {}

  submit() {
    this.isSubmitting = true;
    const options = {
      customTitle: this.customTitle,
      customText: this.customText,
      includeCv: this.includeCv,
      includeStatement: this.includeStatement
    };
    this.dialogRef.close(options);
  }
}
