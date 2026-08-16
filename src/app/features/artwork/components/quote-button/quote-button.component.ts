import { Component, computed, inject, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { SOLDCERTIFICATES } from '@domain/artwork/artwork.constants';
import { TranslatePipe } from '@ngx-translate/core';
import { QuoteDialogComponent, QuoteDialogData } from '../quote-dialog/quote-dialog.component';

/**
 * Call-to-action to enquire about a single artwork. On an available piece it
 * reads "Ask price" and opens the enquiry dialog in price mode; on a sold piece
 * it turns the dead end into a lead — "Ask about this piece" — opening the same
 * dialog in info mode (where it is, how to see it, who to buy it from). Only
 * the label changes: one cart icon covers both, since the question being asked
 * is the same one either way.
 * Availability is derived from the sold list, so the button is self-contained
 * wherever it's placed.
 */
@Component({
  selector: 'app-quote-button',
  templateUrl: './quote-button.component.html',
  imports: [MatIconButton, MatIcon, MatTooltip, TranslatePipe],
})
export class QuoteButtonComponent {
  private dialog = inject(MatDialog);

  readonly tokenId = input.required<string>();
  readonly artworkName = input.required<string>();

  readonly sold = computed(() => SOLDCERTIFICATES.includes(this.tokenId()));

  open(): void {
    const data: QuoteDialogData = {
      artworkName: this.artworkName(),
      tokenId: this.tokenId(),
      mode: this.sold() ? 'info' : 'price',
    };
    this.dialog.open(QuoteDialogComponent, { data, width: '32rem', maxWidth: '92vw' });
  }
}
