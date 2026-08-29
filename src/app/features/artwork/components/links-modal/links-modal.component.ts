import { Component, computed, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { groupLinksByDomain, pathOf } from '@domain/artwork/link-groups';

@Component({
  selector: 'app-links-modal',
  templateUrl: './links-modal.component.html',
  styleUrl: './links-modal.component.scss',
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    TranslatePipe,
  ],
})
export class LinksModalComponent {
  public data = inject<{ links: Array<string> }>(MAT_DIALOG_DATA);
  private dialogRef = inject<MatDialogRef<LinksModalComponent>>(MatDialogRef);

  /**
   * By site rather than by page.
   *
   * A reverse image search answers with pages, and one site can be a great many
   * of them — a painting used as a record sleeve appears once for every
   * listener who saved it. Flat, that reads as fifty findings and buries the
   * one new gallery among them.
   */
  protected readonly groups = computed(() => groupLinksByDomain(this.data.links ?? []));

  /** Which sites the reader has asked to see the individual pages of. */
  private readonly opened = signal<ReadonlySet<string>>(new Set());

  protected readonly pathOf = pathOf;

  protected isOpen(domain: string): boolean {
    return this.opened().has(domain);
  }

  protected toggle(domain: string): void {
    const next = new Set(this.opened());
    if (!next.delete(domain)) next.add(domain);
    this.opened.set(next);
  }

  close() {
    this.dialogRef.close();
  }
}
