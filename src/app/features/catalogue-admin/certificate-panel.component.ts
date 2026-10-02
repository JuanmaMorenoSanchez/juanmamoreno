import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  type OnInit,
  signal,
} from '@angular/core';
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

/** What is being asked of the chain, so the panel can say so and refuse two at once. */
type Doing = null | 'correcting' | 'sealing' | 'destroying';

/**
 * What can be done to one certificate that is already on the chain.
 *
 * Its own component rather than part of the list, because it is a state machine
 * — connect, build, sign, settle — and a list that also held that would be a
 * list nobody could read. It is given a painting and owns everything that
 * follows from opening it.
 *
 * **Nothing here is signed by the server.** `amend`, `freeze` and `burn` are
 * owner-only and the key on the server is the minter, which the contract will
 * not obey, so the api encodes a call and the wallet in this browser signs it.
 */
@Component({
  selector: 'app-certificate-panel',
  templateUrl: './certificate-panel.component.html',
  styleUrl: './certificate-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MintGateComponent],
})
export class CertificatePanelComponent implements OnInit {
  private readonly artworkService = inject(ARTWORK_PORT);
  private readonly api = inject(MintApiService);
  protected readonly wallet = inject(WalletService);

  readonly painting = input.required<Nft>();

  protected readonly validTraits = VALIDTRAITS;
  protected readonly mediums = MEDIUMS;
  protected readonly units = UNITS;
  protected readonly imageTypes = IMAGE_TYPES;
  protected readonly years = mintableYears().map(String);

  protected readonly tokenId = computed(() => Number(this.painting().tokenId));

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

  /**
   * Read once, when the panel is made.
   *
   * Not in the constructor: a required input has no value there, and reading
   * one throws NG0950. The panel is made by opening a row and destroyed by
   * closing it, so there is nothing to react to afterwards either.
   */
  ngOnInit(): void {
    void this.load();
  }

  private async load(): Promise<void> {
    const nft = this.painting();
    const trait = (key: VALIDTRAITS) => this.artworkService.getTraitValue(nft, key);
    this.draft.set({
      name: nft.name ?? '',
      medium: trait(VALIDTRAITS.MEDIUM),
      height: trait(VALIDTRAITS.HEIGHT),
      width: trait(VALIDTRAITS.WIDTH),
      unit: trait(VALIDTRAITS.UNIT) || UNITS[0],
      year: trait(VALIDTRAITS.YEAR),
      imageType: trait(VALIDTRAITS.IMAGETYPE),
    });

    // Asked of the chain rather than of the catalogue: whether it is frozen and
    // who holds it decide what may be offered, and neither is in a snapshot.
    this.stage.set('Asking the chain about this certificate…');
    try {
      this.standing.set(await this.api.standing(this.tokenId()));
    } catch {
      this.problem.set('The chain could not be reached, so nothing is offered for this one.');
    } finally {
      this.stage.set('');
    }
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
   * nothing else — so one sold to a collector could be destroyed from here.
   */
  protected readonly canDestroy = computed(() => {
    const standing = this.standing();
    return Boolean(
      standing &&
      !standing.frozen &&
      standing.heldByOwner &&
      this.burnConfirmation().trim() === String(this.tokenId())
    );
  });

  protected async correct(): Promise<void> {
    const draft = this.draft();
    if (!draft || !this.canCorrect()) return;

    await this.sign('correcting', () =>
      this.api.amendTransaction(this.tokenId(), {
        ...draft,
        height: normaliseMeasurement(draft.height),
        width: normaliseMeasurement(draft.width),
      })
    );
  }

  protected async seal(): Promise<void> {
    if (!this.canSeal()) return;
    if (
      !confirm(
        `Freeze certificate ${this.tokenId()}?\n\n` +
          'This is permanent. Nobody can undo it — not you, not with the owner key, not ' +
          'ever. The certificate can never be corrected or destroyed again.'
      )
    ) {
      return;
    }

    await this.sign('sealing', () => this.api.freezeTransaction(this.tokenId()));
  }

  protected async destroy(): Promise<void> {
    if (!this.canDestroy()) return;
    if (
      !confirm(
        `Destroy certificate ${this.tokenId()}?\n\n` +
          'The token is burned and the painting leaves the catalogue. Its number is never ' +
          'reissued, and any certificate already printed points at a page that will no ' +
          'longer exist.'
      )
    ) {
      return;
    }

    await this.sign('destroying', () => this.api.burnTransaction(this.tokenId()));
  }

  /**
   * The one signing path, for all three.
   *
   * Said at every step, because the steps are the slow part and silence during
   * them is indistinguishable from nothing happening.
   */
  private async sign(
    what: Exclude<Doing, null>,
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
      await this.api.settled(this.tokenId());
      this.stage.set('');
      this.outcome.set(this.said(what));

      const after = await this.api.standing(this.tokenId()).catch(() => null);
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

  private said(what: Exclude<Doing, null>): string {
    if (what === 'correcting') return `Certificate ${this.tokenId()} is corrected on chain.`;
    if (what === 'sealing') {
      return `Certificate ${this.tokenId()} is frozen. Nothing can change it again.`;
    }
    return `Certificate ${this.tokenId()} is destroyed.`;
  }
}
