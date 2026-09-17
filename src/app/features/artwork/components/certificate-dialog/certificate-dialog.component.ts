import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageUrlService } from '@shared/services/language-url.service';
import {
  CERTIFICATES_CONTRACT,
  certificateUrl,
  ETHERSCAN,
} from '@domain/artwork/artwork.constants';
import { CertificateService } from './certificate.service';

export interface CertificateDialogData {
  artworkName: string;
  tokenId: string;
  /** Year, medium and size, as the caption under the painting already says it. */
  details: string;
}

/**
 * What the chain holds about this painting, and where to go and check.
 *
 * The certificate is the artist's own record rather than an authority's, which
 * is the whole of what makes it honest: he wrote down what the painting is and
 * signed it, in a place he cannot quietly rewrite. The last line says what it
 * is not, because a token beside a painting invites exactly one wrong
 * conclusion and it is better to answer it than to leave it.
 */
@Component({
  selector: 'app-certificate-dialog',
  templateUrl: './certificate-dialog.component.html',
  styleUrl: './certificate-dialog.component.scss',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    TranslatePipe,
  ],
})
export class CertificateDialogComponent {
  protected readonly data = inject<CertificateDialogData>(MAT_DIALOG_DATA);
  private readonly certificates = inject(CertificateService);
  private readonly language = inject(LanguageUrlService);

  protected readonly contract = CERTIFICATES_CONTRACT;

  /** Null until the answer arrives, and if it never does. */
  protected readonly record = toSignal(this.certificates.recordFor(this.data.tokenId), {
    initialValue: null,
  });

  /** Enough of the address to recognise, which is all a reader needs on screen. */
  protected readonly shortContract = `${CERTIFICATES_CONTRACT.slice(0, 6)}…${CERTIFICATES_CONTRACT.slice(-4)}`;

  protected readonly tokenLink = certificateUrl(this.data.tokenId);
  protected readonly contractLink = `${ETHERSCAN}/address/${CERTIFICATES_CONTRACT}`;
  protected readonly transactionLink = () => {
    const hash = this.record()?.txHash;
    return hash ? `${ETHERSCAN}/tx/${hash}` : null;
  };

  /**
   * The day it was written, in the reader's own language.
   *
   * Formatted with `Intl` rather than the date pipe, which needs Angular's
   * locale data registered for anything but en-US and would mean shipping two
   * locale bundles to write one date. Null while the record is on its way, and
   * if it never comes.
   *
   * In UTC, which is not the usual choice and is the right one here. A block
   * timestamp is UTC and Etherscan shows it as UTC, and this whole panel exists
   * to be checked against Etherscan. Token 152 landed at 22:10 UTC on the tenth
   * of September — twenty past midnight on the eleventh in Madrid — so a local
   * date would have the page and the chain naming different days to a reader
   * sitting in the country the painting was made in.
   */
  protected readonly recordedDate = computed(() => {
    const at = this.record()?.mintedAt;
    if (!at) return null;

    const locale = this.language.inSpanish() ? 'es-ES' : 'en-GB';
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(at));
  });
}
