import { Component, computed, input, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';

/** How long the button says "copied" before going back to offering to share. */
const COPIED_FOR_MS = 2000;

/**
 * Passes on the painting the reader is looking at.
 *
 * It used to float over every page, bottom left, and hand the operating system
 * the same three lines wherever it was pressed: the artist's name, the words
 * "Contemporary Art", and whatever address happened to be showing. Sharing a
 * particular painting produced a message that did not name it — while the page
 * around the button knew its title, its year, its medium and its size.
 *
 * So it lives in the artwork's own toolbar now, beside the other things that
 * can be done with that painting, and it says what it is passing on.
 *
 * `navigator.share` is not everywhere — Firefox has never had it — and where
 * it is missing the button used to hide itself, which is a control that exists
 * for some readers and not others. Copying the address is the same errand by
 * other means, so it falls back to that rather than disappearing.
 */
@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss'],
  imports: [MatIconButton, MatIcon, MatTooltip, TranslatePipe],
})
export class ShareButtonComponent {
  /** What is being passed on. Empty until the artwork has loaded. */
  readonly artworkName = input<string>('');
  /** The line under the title on the page: year, medium, size. */
  readonly details = input<string>('');

  protected readonly copied = signal(false);

  protected readonly label = computed(() =>
    this.copied() ? 'share.copied' : this.canShare() ? 'share.share' : 'share.copyLink'
  );

  protected readonly icon = computed(() => (this.copied() ? 'check' : 'share'));

  private canShare(): boolean {
    return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
  }

  protected async handleClick(): Promise<void> {
    const url = window.location.href;
    const name = this.artworkName().trim();
    const title = name || 'Juanma Moreno Sánchez';
    // The technical sheet, which is what the page says about the painting
    // under its title — and what somebody receiving the link needs to know.
    const text = [name, this.details().trim()].filter(Boolean).join(' — ');

    if (this.canShare()) {
      try {
        await navigator.share({ title, text: text || title, url });
        return;
      } catch {
        // Dismissed, or refused by the browser. Falling through to the
        // clipboard would be answering a cancelled action with an action.
        return;
      }
    }

    await this.copyToClipboard(url);
  }

  private async copyToClipboard(url: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(url);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), COPIED_FOR_MS);
    } catch {
      // No clipboard permission, or an insecure context. Saying nothing is
      // better than claiming to have copied something that was not copied.
    }
  }
}
