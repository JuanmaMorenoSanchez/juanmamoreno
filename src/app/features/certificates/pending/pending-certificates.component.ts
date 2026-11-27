import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { MintGateComponent } from '@shared/components/mint-gate/mint-gate.component';
import { MintApiService, type PendingMint } from '@shared/services/mint-api.service';
import { WalletService } from '@shared/services/wallet.service';

/**
 * How long to wait on the chain before saying it has not been seen.
 *
 * A block is about twelve seconds, so one ask in the instant after signing can
 * only ever answer no. Eight asks eight seconds apart is a little over a
 * minute, which is several blocks even on a slow afternoon.
 */
const ASKS_THE_CHAIN = 8;
const BETWEEN_ASKS_MS = 8_000;

/**
 * The certificates written and not yet signed, at the top of the page.
 *
 * **There was a count and no list.** The form said "3 waiting to be written"
 * and linked to `/pendingmint`, which redirects here — so the one control
 * that mentioned the queue navigated to the page it was already on and
 * nothing happened. The queue had been a page of its own once; when the two
 * became one, the list was dropped and the link to it was not.
 *
 * At the top because it is the state of the work: what is half-done comes
 * before the form for starting something new.
 *
 * **Each one can be written from here, by his own wallet.** The server
 * decides what the certificate says and encodes the call; the wallet signs
 * it; no key comes near either. That path has existed in the api the whole
 * time — `pending/:tokenId/transaction` and `pending/:tokenId/written` — and
 * lost its only caller when the page that held the queue was deleted. What
 * was removed with good reason was the old "Write them now", which asked the
 * *server* to mint with a key that is set nowhere.
 *
 * **It is taken off the list by the chain, not by the wallet.** A wallet
 * answers with a hash the moment it signs, which says the transaction was
 * sent and nothing about whether it was mined — so `written` asks the chain,
 * and a certificate dropped on the strength of a hash that later failed is
 * one nothing would ever write again.
 *
 * **The price sits here too**, because this is where the decision about it is
 * made: the same certificate is a few cents on a quiet morning and several
 * pounds on a busy afternoon. It had been beside the studio's Prepare button,
 * which spends nothing.
 */
@Component({
  selector: 'app-pending-certificates',
  standalone: true,
  imports: [MintGateComponent],
  templateUrl: './pending-certificates.component.html',
  styleUrl: './pending-certificates.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PendingCertificatesComponent {
  private api = inject(MintApiService);
  private wallet = inject(WalletService);
  private artworks = inject(ARTWORK_PORT);

  /**
   * Bumped by the page when the form has prepared one, so the list is right
   * without asking the api on a timer or making the two components know each
   * other.
   */
  readonly reload = input(0);

  /** Undefined until asked, and if it never answers. */
  protected readonly waiting = signal<PendingMint[] | undefined>(undefined);
  protected readonly asking = signal(true);
  protected readonly problem = signal('');

  protected readonly confirming = signal<number | null>(null);
  protected readonly discarding = signal<number | null>(null);

  /** Which one is at the wallet, and what the wallet said about the last. */
  protected readonly minting = signal<number | null>(null);
  protected readonly said = signal<string>('');

  protected readonly count = computed(() => this.waiting()?.length ?? 0);

  constructor() {
    effect(() => {
      this.reload();
      untracked(() => void this.load());
    });
  }

  protected async load(): Promise<void> {
    this.asking.set(true);
    this.problem.set('');
    try {
      this.waiting.set(await this.api.waiting());
    } catch {
      // An empty queue and an api that did not answer are different answers,
      // and this page must not show the second as the first.
      this.problem.set('The api did not answer, so what is waiting is unknown.');
    } finally {
      this.asking.set(false);
    }
  }

  /** Asks first: a prepared certificate is a photograph and a form again. */
  protected ask(tokenId: number): void {
    this.confirming.set(this.confirming() === tokenId ? null : tokenId);
  }

  protected async discard(tokenId: number): Promise<void> {
    if (this.discarding()) return;
    this.discarding.set(tokenId);
    this.problem.set('');
    try {
      await this.api.discard(tokenId);
      this.waiting.update((all) => (all ?? []).filter((one) => one.tokenId !== tokenId));
      this.confirming.set(null);
    } catch (failure: unknown) {
      const message = (failure as { error?: { message?: string } })?.error?.message;
      this.problem.set(message ?? `Certificate ${tokenId} could not be thrown away.`);
    } finally {
      this.discarding.set(null);
    }
  }

  /**
   * Writes one to the chain: his wallet, his confirmation, his gas.
   *
   * The same three steps as every other call this site makes to the
   * contract — connect, sign, then ask the chain whether it landed. Nothing
   * here builds or reads the call; the bytes arrive from the api, which is
   * the only place that decides what a certificate says.
   */
  protected async mint(tokenId: number): Promise<void> {
    if (this.minting()) return;
    this.minting.set(tokenId);
    this.problem.set('');
    this.said.set('');
    try {
      const to = await this.wallet.connect();
      const transaction = await this.api.mintTransaction(tokenId, to);
      await this.wallet.send(transaction);
      this.said.set(`Certificate ${tokenId} is signed. Asking the chain whether it landed…`);

      const written = await this.landed(tokenId);
      if (written) {
        this.waiting.update((all) => (all ?? []).filter((one) => one.tokenId !== tokenId));
        // The backend reread the catalogue when it confirmed the mint; bring the
        // browser's copy level so the new painting shows in the lists at once.
        this.artworks.refreshCatalogue();
        this.said.set(`Certificate ${tokenId} is on the chain.`);
      } else {
        // Sent and not yet mined. It stays on the list, which is the honest
        // place for it: the next visit asks the chain again.
        this.said.set(
          `Certificate ${tokenId} was sent but has not been mined yet. It stays on the list.`
        );
      }
    } catch (failure: unknown) {
      const message =
        (failure as { error?: { message?: string } })?.error?.message ??
        (failure as Error)?.message;
      this.problem.set(message ?? `Certificate ${tokenId} could not be written.`);
    } finally {
      this.minting.set(null);
    }
  }

  /**
   * Whether it reached the chain, asked for as long as a block takes.
   *
   * It was asked exactly once, in the instant after the wallet handed back a
   * hash — before any block containing it could exist. So a mint that worked
   * perfectly answered "not yet", the certificate stayed on the list, and the
   * only way to see it had landed was to come back later and reload. A block is
   * about twelve seconds; this waits a little over a minute before giving up,
   * and giving up still leaves it on the list, which is the honest place for
   * something sent and not seen.
   */
  private async landed(tokenId: number): Promise<boolean> {
    for (let asked = 0; asked < ASKS_THE_CHAIN; asked += 1) {
      if (asked > 0) {
        this.said.set(`Certificate ${tokenId} is signed. Waiting for the chain to confirm it…`);
        await new Promise((wake) => setTimeout(wake, BETWEEN_ASKS_MS));
      }
      // A refusal is not a no: the next ask is a few seconds away, and the
      // certificate stays on the list either way.
      const answer = await this.api.written(tokenId).catch(() => ({ written: false }));
      if (answer.written) return true;
    }
    return false;
  }

  /** The on-chain thumbnail, which is stored as bytes rather than an address. */
  protected picture(one: PendingMint): string {
    return `data:image/jpeg;base64,${one.thumbnailBase64}`;
  }

  /** How long ago, in words, because a date needs counting and this does not. */
  protected ago(at?: string): string {
    if (!at) return '';

    const minutes = Math.floor((Date.now() - new Date(at).getTime()) / 60_000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 48) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }
}
