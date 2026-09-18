import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dossier-options-modal',
  templateUrl: './dossier-options-modal.component.html',
  styleUrl: './dossier-options-modal.component.scss',
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatSlideToggle,
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    TranslatePipe,
  ],
})
export class DossierOptionsModalComponent {
  customTitle = '';
  customText = '';
  includeContact = false;
  includeCv = false;
  /** The biography in place of the list, when one has been written. */
  cvAsProse = false;
  includeStatement = false;
  isSubmitting = false;

  private dialogRef = inject<MatDialogRef<DossierOptionsModalComponent>>(MatDialogRef);

  /**
   * What the page that opened this already knows. One thing so far — whether a
   * biography has been written — and the switch that would use it is not
   * offered when it has not.
   */
  protected readonly data = inject<{ proseAvailable?: boolean }>(MAT_DIALOG_DATA, {
    optional: true,
  }) ?? { proseAvailable: false };

  submit() {
    this.isSubmitting = true;
    const options = {
      customTitle: this.customTitle,
      customText: this.customText,
      includeContact: this.includeContact,
      includeCv: this.includeCv,
      cvAsProse: this.cvAsProse,
      includeStatement: this.includeStatement,
    };
    this.dialogRef.close(options);
  }
}
