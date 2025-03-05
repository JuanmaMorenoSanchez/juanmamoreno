import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-links-modal',
    templateUrl: './links-modal.component.html',
    styleUrl: './links-modal.component.scss',
    standalone: false
})
export class LinksModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { links: Array<string> },
    private dialogRef: MatDialogRef<LinksModalComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }
}
