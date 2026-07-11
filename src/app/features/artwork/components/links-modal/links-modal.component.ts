import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatList, MatListItem } from '@angular/material/list';
import { MatLine } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-links-modal',
  templateUrl: './links-modal.component.html',
  styleUrl: './links-modal.component.scss',
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatList,
    MatListItem,
    MatLine,
    MatDialogActions,
    MatButton,
    TranslatePipe,
  ],
})
export class LinksModalComponent {
  public data = inject<{ links: Array<string> }>(MAT_DIALOG_DATA);
  private dialogRef = inject<MatDialogRef<LinksModalComponent>>(MatDialogRef);

  close() {
    this.dialogRef.close();
  }
}
