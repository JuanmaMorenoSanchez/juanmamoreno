import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatList, MatListItem } from '@angular/material/list';
import { NgFor } from '@angular/common';
import { MatLine } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-links-modal',
    templateUrl: './links-modal.component.html',
    styleUrl: './links-modal.component.scss',
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatList, NgFor, MatListItem, MatLine, MatDialogActions, MatButton, TranslatePipe]
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
