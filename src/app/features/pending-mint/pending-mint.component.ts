import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MintGateComponent } from '@shared/components/mint-gate/mint-gate.component';
import { MintApiService, type PendingMint } from '@shared/services/mint-api.service';

/**
 * The certificates that are ready and not yet written.
 *
 * Writing one costs about three quarters of a million gas, and nothing about it
 * is urgent: a painting finished today is no less finished tomorrow. So they
 * wait here until gas is cheap, and the night's work writes whatever is waiting
 * whenever it is — this page is the same thing done by hand, for when waiting
 * is not wanted.
 */
@Component({
  selector: 'app-pending-mint',
  imports: [MatIcon, MintGateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pending-mint.component.html',
  styleUrl: './pending-mint.component.scss',
})
export class PendingMintComponent {
  private readonly api = inject(MintApiService);

  protected readonly waiting = signal<PendingMint[]>([]);
  protected readonly busy = signal(false);
  protected readonly outcome = signal('');
  protected readonly problem = signal('');

  constructor() {
    this.load();
  }

  protected trait(mint: PendingMint, key: string): string {
    return mint.attributes.find((trait) => trait.trait_type === key)?.value ?? '';
  }

  protected async mintAll(): Promise<void> {
    this.busy.set(true);
    this.outcome.set('');
    this.problem.set('');
    try {
      const result = await this.api.mintWaiting();

      const minted = result.minted;
      // Said separately, because "none written" and "none waiting" look the
      // same from here and mean very different things.
      this.outcome.set(
        minted.length
          ? `Written: ${minted.join(', ')}.${result.skipped ? ` Then stopped — ${result.skipped}.` : ''}`
          : `Nothing was written${result.skipped ? ` — ${result.skipped}` : ''}.`
      );
      this.load();
    } catch {
      this.problem.set('The api could not be reached. Nothing was written.');
    } finally {
      this.busy.set(false);
    }
  }

  protected async discard(tokenId: number): Promise<void> {
    await this.api.discard(tokenId).catch(() => undefined);
    this.load();
  }

  private load(): void {
    this.api
      .waiting()
      .then((list) => this.waiting.set(list))
      .catch(() => this.waiting.set([]));
  }
}
