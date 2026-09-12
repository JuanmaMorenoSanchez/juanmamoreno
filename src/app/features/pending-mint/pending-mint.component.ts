import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MintGateComponent } from '@shared/components/mint-gate/mint-gate.component';
import { MintApiService, type PendingMint } from '@shared/services/mint-api.service';
import { WalletService } from '@shared/services/wallet.service';

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
  protected readonly wallet = inject(WalletService);

  /**
   * Opens this page inside the Base app's own browser, where the wallet is.
   *
   * A plain link rather than a connector library: the app registers this
   * address and hands whatever follows to its browser, which puts the wallet on
   * the page. Nothing is installed and nobody's relay is involved.
   */
  protected readonly inBaseApp =
    'https://go.cb-w.com/dapp?cb_url=' + encodeURIComponent('https://juanmamoreno.com/pendingmint');

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

  /**
   * Signs one certificate with whatever wallet this browser has.
   *
   * The whole of the sign-it-yourself path, and the reason no key lives on the
   * server: the api assembles the certificate and encodes the call, the wallet
   * signs it as the artist, and the list is only updated once the chain agrees
   * the certificate is there. A signature is not the same as a certificate —
   * a transaction can be signed and still not land — so it is asked rather than
   * assumed.
   */
  protected async signHere(mint: PendingMint): Promise<void> {
    this.busy.set(true);
    this.outcome.set('');
    this.problem.set('');
    try {
      const from = await this.wallet.connect();
      const transaction = await this.api.signable(mint.tokenId, from);
      const hash = await this.wallet.send(transaction);
      this.outcome.set(`Signed as ${from}. Waiting for ${hash.slice(0, 10)}… to land.`);

      // A block at a time, for a couple of minutes. It stays on the list until
      // the chain says otherwise, so nothing is lost if this is closed early.
      for (let attempt = 0; attempt < 20; attempt += 1) {
        await new Promise((wait) => setTimeout(wait, 6000));
        const { written } = await this.api.confirmWritten(mint.tokenId);
        if (written) {
          this.outcome.set(`Certificate ${mint.tokenId} is on chain. "${mint.name}" is recorded.`);
          this.load();
          return;
        }
      }
      this.outcome.set(
        `Signed, but ${mint.tokenId} has not appeared yet. It stays on the list; open this page ` +
          'again in a few minutes and it will clear itself.'
      );
    } catch (failure: unknown) {
      const message =
        (failure as { error?: { message?: string } })?.error?.message ??
        (failure as Error)?.message;
      this.problem.set(message ?? 'The wallet refused, and nothing was written.');
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
