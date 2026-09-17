import { Component, inject, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { Nft } from '@domain/artwork/artwork.entity';
import { TranslatePipe } from '@ngx-translate/core';
import {
  CertificateDialogComponent,
  CertificateDialogData,
} from '../certificate-dialog/certificate-dialog.component';

/**
 * The painting's record on Ethereum, one icon among the others.
 *
 * A seal rather than a lock or a tick. A lock would say the record is sealed,
 * and no token here is frozen; a tick would say somebody else checked it, and
 * nobody did — this is the artist's own account of his own painting, which is
 * what a certificate of authenticity has always been.
 *
 * Every artwork has one. The catalogue is read out of the contract, so a
 * painting on this site is a painting with a certificate by construction, and
 * there is no empty state to draw.
 */
@Component({
  selector: 'app-certificate-button',
  templateUrl: './certificate-button.component.html',
  imports: [MatIconButton, MatIcon, MatTooltip, TranslatePipe],
})
export class CertificateButtonComponent {
  private readonly dialog = inject(MatDialog);

  readonly tokenId = input.required<string>();
  readonly artworkName = input.required<string>();
  /** Year, medium and size, as the caption under the painting already says it. */
  readonly details = input.required<string>();
  /** The painting, for the certificate that can be printed and kept. */
  readonly nft = input.required<Nft>();

  open(): void {
    const data: CertificateDialogData = {
      artworkName: this.artworkName(),
      tokenId: this.tokenId(),
      details: this.details(),
      nft: this.nft(),
    };
    this.dialog.open(CertificateDialogComponent, { data, width: '32rem', maxWidth: '92vw' });
  }
}
