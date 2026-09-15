import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { DownloadButtonComponent } from '@shared/components/download-button/download-button.component';
import { MintGateComponent } from '@shared/components/mint-gate/mint-gate.component';
import {
  MintApiService,
  type MintFacts,
  type PendingMint,
} from '@shared/services/mint-api.service';
import {
  IMAGE_TYPES,
  MEDIUMS,
  UNITS,
  measurementAsTyped,
  mintableYears,
  normaliseMeasurement,
} from '@domain/artwork/mint-vocabulary';
import { WalletService } from '@shared/services/wallet.service';

/** What an untouched edit form holds, before a certificate is read into it. */
const EMPTY_FACTS: MintFacts = {
  name: '',
  medium: MEDIUMS[0],
  height: '',
  width: '',
  unit: UNITS[0],
  year: String(mintableYears()[0]),
  imageType: IMAGE_TYPES[0],
  description: '',
};

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
  imports: [MatIcon, MintGateComponent, DownloadButtonComponent],
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

  protected readonly mediums = MEDIUMS;
  protected readonly imageTypes = IMAGE_TYPES;
  protected readonly units = UNITS;

  /**
   * The certificate being corrected, if any.
   *
   * Everything here is a draft — nothing has reached the chain — so a title
   * with a typo in it is a thing to fix. It used to be a thing to throw the
   * certificate away over, which cost a token id and a second upload to correct
   * a letter.
   */
  protected readonly editing = signal<number | null>(null);
  protected readonly draft = signal<MintFacts>(EMPTY_FACTS);
  protected readonly saving = signal(false);

  /**
   * The years on offer, with whatever this certificate says among them.
   *
   * A stored year the list does not contain would otherwise be quietly swapped
   * for the first one the moment anything else was corrected.
   */
  protected readonly years = computed(() => {
    const listed = mintableYears().map(String);
    const current = this.draft().year;
    return current && !listed.includes(current) ? [current, ...listed] : listed;
  });

  /**
   * Whether the measurements have been changed, which the photograph cannot
   * follow.
   *
   * Said rather than refused. The picture was squared up to the measurements
   * given at the time and is stored flattened; correcting a digit here corrects
   * what the certificate *says*, and the shape of the picture stays as it was.
   * For a size that is genuinely different, the painting wants straightening
   * again.
   */
  protected readonly reshaped = computed(() => {
    const token = this.editing();
    const was = this.waiting().find((one) => one.tokenId === token);
    if (!was) return false;
    const draft = this.draft();
    return (
      normaliseMeasurement(draft.height) !== this.trait(was, 'Height') ||
      normaliseMeasurement(draft.width) !== this.trait(was, 'Width')
    );
  });

  protected edit(mint: PendingMint): void {
    this.problem.set('');
    this.outcome.set('');
    this.draft.set({
      name: mint.name,
      medium: this.trait(mint, 'Medium'),
      height: this.trait(mint, 'Height'),
      width: this.trait(mint, 'Width'),
      unit: this.trait(mint, 'Unit') || UNITS[0],
      year: this.trait(mint, 'Year'),
      imageType: this.trait(mint, 'Image Type'),
      description: mint.description,
    });
    this.editing.set(mint.tokenId);
  }

  protected stopEditing(): void {
    this.editing.set(null);
    this.draft.set(EMPTY_FACTS);
  }

  protected write(field: 'name' | 'description', event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.draft.update((draft) => ({ ...draft, [field]: value }));
  }

  protected pick(field: 'medium' | 'unit' | 'year' | 'imageType', event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.draft.update((draft) => ({ ...draft, [field]: value }));
  }

  /** A measurement keeps its comma while it is being written, as in the studio. */
  protected measure(field: 'height' | 'width', event: Event): void {
    const input = event.target as HTMLInputElement;
    const tidied = measurementAsTyped(input.value);
    input.value = tidied;
    this.draft.update((draft) => ({ ...draft, [field]: tidied }));
  }

  protected readonly canSave = computed(
    () => !!this.draft().name.trim() && !!this.draft().height && !!this.draft().width
  );

  protected async save(): Promise<void> {
    const tokenId = this.editing();
    if (tokenId === null || !this.canSave()) return;

    this.saving.set(true);
    this.problem.set('');
    try {
      const draft = this.draft();
      const amended = await this.api.amend(tokenId, {
        ...draft,
        height: normaliseMeasurement(draft.height),
        width: normaliseMeasurement(draft.width),
      });
      this.outcome.set(`Certificate ${tokenId} now reads “${amended.name}”.`);
      this.stopEditing();
      this.load();
    } catch (failure: unknown) {
      const message = (failure as { error?: { message?: string } })?.error?.message;
      this.problem.set(message ?? `Certificate ${tokenId} could not be corrected.`);
    } finally {
      this.saving.set(false);
    }
  }

  /** What is happening at this moment, while it is happening. */
  protected readonly stage = signal('');

  /** The transaction, once there is one, so it can be followed. */
  protected readonly sent = signal<string | null>(null);
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
    this.sent.set(null);

    try {
      // Said at every step, because the steps are the slow part and silence
      // during them is indistinguishable from nothing happening. A mint that
      // "took forever and did not go through" was this: a wallet that never
      // answered, and a page with nothing to say about it.
      this.stage.set('Asking your wallet who is signing…');
      const from = await this.wallet.connect();

      this.stage.set('Preparing the transaction…');
      const transaction = await this.api.signable(mint.tokenId, from);

      this.stage.set('Waiting for you to approve it in your wallet…');
      const hash = await this.wallet.send(transaction);
      this.sent.set(hash);

      this.stage.set('Sent. Waiting for the chain…');
      for (let attempt = 0; attempt < 30; attempt += 1) {
        await new Promise((wait) => setTimeout(wait, 6000));
        const { written, shown } = await this.api.confirmWritten(mint.tokenId);
        if (written) {
          this.stage.set('');
          this.outcome.set(
            `Certificate ${mint.tokenId} is on chain. “${mint.name}” is recorded` +
              (shown
                ? ' and is on the site now.'
                : ' — the site will show it after tonight’s catalogue read.')
          );
          this.load();
          return;
        }
      }

      // Three minutes without it appearing. The transaction exists — its hash
      // is on screen — so this is slowness, not failure, and saying which is
      // the whole point.
      this.stage.set('');
      this.outcome.set(
        `Signed and sent, but ${mint.tokenId} has not appeared after three minutes. That is slow, ` +
          'not lost: follow the transaction below. It stays on the list until the chain has it.'
      );
    } catch (failure: unknown) {
      this.stage.set('');
      const message =
        (failure as { error?: { message?: string } })?.error?.message ??
        (failure as Error)?.message;
      this.problem.set(
        message ?? 'The wallet refused, and nothing was sent. The certificate is untouched.'
      );
    } finally {
      this.busy.set(false);
    }
  }

  /**
   * Throws a prepared certificate away.
   *
   * The failure is reported rather than swallowed. It used to be caught and
   * dropped, and when the browser refused to send the request at all — DELETE
   * was missing from what the api allows, so the preflight passed and the
   * delete never followed — the button did nothing, said nothing, and left the
   * certificate exactly where it was.
   */
  protected async discard(tokenId: number): Promise<void> {
    this.problem.set('');
    try {
      await this.api.discard(tokenId);
      this.outcome.set(`Certificate ${tokenId} thrown away. It was never on the chain.`);
    } catch (failure: unknown) {
      const message = (failure as { error?: { message?: string } })?.error?.message;
      this.problem.set(message ?? `Certificate ${tokenId} could not be thrown away.`);
    }
    this.load();
  }

  private load(): void {
    this.api
      .waiting()
      .then((list) => this.waiting.set(list))
      .catch(() => this.waiting.set([]));
  }
}
