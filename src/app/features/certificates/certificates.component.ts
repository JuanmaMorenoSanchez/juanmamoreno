import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { VALIDTRAITS } from '@domain/artwork/artwork.constants';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import {
  IMAGE_TYPES,
  MEDIUMS,
  UNITS,
  measurementAsTyped,
  mintableYears,
  normaliseMeasurement,
} from '@domain/artwork/mint-vocabulary';
import { MintGateComponent } from '@shared/components/mint-gate/mint-gate.component';
import {
  type CertificateStanding,
  MintApiService,
  type MintFacts,
  type SignableTransaction,
} from '@shared/services/mint-api.service';
import { WalletService } from '@shared/services/wallet.service';

/** What is being asked of the chain, so the page can say so and refuse two at once. */
type Doing = null | 'correcting' | 'sealing' | 'destroying';

/**
 * The certificates that are already written.
 *
 * Deliberately not part of `/pendingmint`, whose whole framing is that
 * everything on it is a draft and throwing one away costs nothing. Nothing here
 * is a draft: every row is a public, permanent record, and two of the three
 * things this page can do cannot be undone by anybody, the artist included.
 *
 * One row per token rather than per painting. A painting photographed three
 * times has three certificates, and the one with the wrong measurements may not
 * be the one the catalogue shows — which an artwork page could never express,
 * and is half the reason this page exists.
 *
 * Nothing here is signed by the server. `amend`, `freeze` and `burn` are all
 * owner-only and the key on the server is the minter, which the contract will
 * not obey, so the api encodes a call and the wallet in this browser signs it.
 */
@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MintGateComponent],
})
export class CertificatesComponent {
  private readonly artworkService = inject(ARTWORK_PORT);
  private readonly api = inject(MintApiService);
  protected readonly wallet = inject(WalletService);

  /** The trait names, so the template can ask for them by name and not by string. */
  protected readonly validTraits = VALIDTRAITS;

  protected readonly mediums = MEDIUMS;
  protected readonly units = UNITS;
  protected readonly imageTypes = IMAGE_TYPES;
  protected readonly years = mintableYears().map(String);

  private readonly all = toSignal(this.artworkService.getArtPiecesObservable(), {
    initialValue: [] as Nft[],
  });

  protected readonly search = signal('');

  /** Every certificate, newest first, narrowed by number, title or year. */
  protected readonly certificates = computed<Nft[]>(() => {
    const term = this.search().trim().toLowerCase();
    const rows = [...this.all()].sort((a, b) => Number(b.tokenId) - Number(a.tokenId));
    if (!term) return rows;
    return rows.filter(
      (nft) =>
        String(nft.tokenId) === term ||
        (nft.name ?? '').toLowerCase().includes(term) ||
        this.trait(nft, VALIDTRAITS.YEAR).includes(term)
    );
  });

  protected readonly editing = signal<number | null>(null);
  protected readonly draft = signal<MintFacts | null>(null);
  protected readonly standing = signal<CertificateStanding | null>(null);
  protected readonly doing = signal<Doing>(null);
  protected readonly stage = signal('');
  protected readonly outcome = signal('');
  protected readonly problem = signal('');
  protected readonly sent = signal<string | null>(null);

  /** Typed back before a certificate is destroyed. A yes/no is too cheap for that. */
  protected readonly burnConfirmation = signal('');

  protected readonly busy = computed(() => this.doing() !== null);

  protected trait(nft: Nft, key: VALIDTRAITS): string {
    return this.artworkService.getTraitValue(nft, key);
  }

  protected thumbOf(nft: Nft): string {
    return nft.image?.thumbnailUrl ?? nft.image?.cachedUrl ?? '';
  }

  protected search_(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }

  protected async open(nft: Nft): Promise<void> {
    const tokenId = Number(nft.tokenId);
    this.reset();
    this.editing.set(tokenId);
    this.draft.set({
      name: nft.name ?? '',
      medium: this.trait(nft, VALIDTRAITS.MEDIUM),
      height: this.trait(nft, VALIDTRAITS.HEIGHT),
      width: this.trait(nft, VALIDTRAITS.WIDTH),
      unit: this.trait(nft, VALIDTRAITS.UNIT) || UNITS[0],
      year: this.trait(nft, VALIDTRAITS.YEAR),
      imageType: this.trait(nft, VALIDTRAITS.IMAGETYPE),
    });

    // Asked of the chain rather than of the catalogue: whether it is frozen and
    // who holds it decide what may be offered, and neither is in a snapshot.
    this.stage.set('Asking the chain about this certificate…');
    try {
      this.standing.set(await this.api.standing(tokenId));
    } catch {
      this.problem.set('The chain could not be reached, so nothing is offered for this one.');
    } finally {
      this.stage.set('');
    }
  }

  protected close(): void {
    this.editing.set(null);
    this.reset();
  }

  private reset(): void {
    this.draft.set(null);
    this.standing.set(null);
    this.doing.set(null);
    this.stage.set('');
    this.outcome.set('');
    this.problem.set('');
    this.sent.set(null);
    this.burnConfirmation.set('');
  }

  protected write(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.draft.update((draft) => (draft ? { ...draft, name: value } : draft));
  }

  protected pick(field: 'medium' | 'unit' | 'year' | 'imageType', event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.draft.update((draft) => (draft ? { ...draft, [field]: value } : draft));
  }

  /** A measurement keeps its comma while it is being written, as in the studio. */
  protected measure(field: 'height' | 'width', event: Event): void {
    const input = event.target as HTMLInputElement;
    const tidied = measurementAsTyped(input.value);
    input.value = tidied;
    this.draft.update((draft) => (draft ? { ...draft, [field]: tidied } : draft));
  }

  protected confirmBurn(event: Event): void {
    this.burnConfirmation.set((event.target as HTMLInputElement).value);
  }

  protected readonly canCorrect = computed(() => {
    const draft = this.draft();
    const standing = this.standing();
    return Boolean(
      draft?.name.trim() && draft.height && draft.width && standing && !standing.frozen
    );
  });

  protected readonly canSeal = computed(() => {
    const standing = this.standing();
    return Boolean(standing && !standing.frozen);
  });

  /**
   * Destroying is offered only for a certificate the artist still holds, and
   * only once its number has been typed back.
   *
   * The contract would allow more — `burn` checks that the token exists and
   * nothing else — so one sold to a collector could be destroyed from here. The
   * api refuses that and so does this.
   */
  protected readonly canDestroy = computed(() => {
    const standing = this.standing();
    return Boolean(
      standing &&
        !standing.frozen &&
        standing.heldByOwner &&
        this.burnConfirmation().trim() === String(this.editing())
    );
  });

  protected async correct(): Promise<void> {
    const tokenId = this.editing();
    const draft = this.draft();
    if (tokenId === null || !draft || !this.canCorrect()) return;

    await this.sign('correcting', tokenId, () =>
      this.api.amendTransaction(tokenId, {
        ...draft,
        height: normaliseMeasurement(draft.height),
        width: normaliseMeasurement(draft.width),
      })
    );
  }

  protected async seal(): Promise<void> {
    const tokenId = this.editing();
    if (tokenId === null || !this.canSeal()) return;
    if (
      !confirm(
        `Freeze certificate ${tokenId}?\n\n` +
          'This is permanent. Nobody can undo it — not you, not with the owner key, not ' +
          'ever. The certificate can never be corrected or destroyed again.'
      )
    ) {
      return;
    }

    await this.sign('sealing', tokenId, () => this.api.freezeTransaction(tokenId));
  }

  protected async destroy(): Promise<void> {
    const tokenId = this.editing();
    if (tokenId === null || !this.canDestroy()) return;
    if (
      !confirm(
        `Destroy certificate ${tokenId}?\n\n` +
          'The token is burned and the painting leaves the catalogue. Its number is never ' +
          'reissued, and any certificate already printed points at a page that will no ' +
          'longer exist.'
      )
    ) {
      return;
    }

    await this.sign('destroying', tokenId, () => this.api.burnTransaction(tokenId));
  }

  /**
   * The one signing path, for all three.
   *
   * Said at every step, because the steps are the slow part and silence during
   * them is indistinguishable from nothing happening.
   */
  private async sign(
    what: Exclude<Doing, null>,
    tokenId: number,
    build: () => Promise<SignableTransaction>
  ): Promise<void> {
    this.doing.set(what);
    this.outcome.set('');
    this.problem.set('');
    this.sent.set(null);

    try {
      this.stage.set('Asking your wallet who is signing…');
      const from = await this.wallet.connect();

      // The contract obeys one address. Signing with any other pays gas to be
      // told no, so it is caught here rather than on the chain.
      const standing = this.standing();
      if (standing && from.toLowerCase() !== standing.owner.toLowerCase()) {
        throw new Error(
          `That wallet is ${from}. The contract only obeys ${standing.owner}, so connect the ` +
            'owner wallet and try again.'
        );
      }

      this.stage.set('Preparing the transaction…');
      const transaction = await build();

      this.stage.set('Waiting for you to approve it in your wallet…');
      this.sent.set(await this.wallet.send(transaction));

      this.stage.set('Sent. Waiting for the chain…');
      await this.api.settled(tokenId);
      this.stage.set('');
      this.outcome.set(this.said(what, tokenId));

      const after = await this.api.standing(tokenId).catch(() => null);
      if (after) this.standing.set(after);
    } catch (failure: unknown) {
      const message =
        (failure as { error?: { message?: string } })?.error?.message ??
        (failure as Error)?.message;
      this.problem.set(message ?? 'The wallet refused, and nothing was sent.');
      this.stage.set('');
    } finally {
      this.doing.set(null);
    }
  }

  private said(what: Exclude<Doing, null>, tokenId: number): string {
    if (what === 'correcting') return `Certificate ${tokenId} is corrected on chain.`;
    if (what === 'sealing') return `Certificate ${tokenId} is frozen. Nothing can change it again.`;
    return `Certificate ${tokenId} is destroyed.`;
  }
}
