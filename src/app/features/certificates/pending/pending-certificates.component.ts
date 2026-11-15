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
import { MintApiService, type PendingMint } from '@shared/services/mint-api.service';

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
 * before the form for starting something new. Signing happens in OpenSea, by
 * hand — this contract has no mint function at all — so what this offers is
 * the two things the page can honestly do: look at what is waiting, and throw
 * one away.
 */
@Component({
  selector: 'app-pending-certificates',
  standalone: true,
  templateUrl: './pending-certificates.component.html',
  styleUrl: './pending-certificates.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PendingCertificatesComponent {
  private api = inject(MintApiService);

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
