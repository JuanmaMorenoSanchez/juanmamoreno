import { SlicePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { PendingReel, PendingReelsService } from '@shared/services/pending-reels.service';
import { of, switchMap } from 'rxjs';

/**
 * The reels that have been made and are waiting to go out.
 *
 * Instagram has no draft an API can write to: a container created and left
 * unpublished is invisible in the app, cannot be edited, and expires in a day.
 * So the nightly run stops at the video and this is where it is dealt with —
 * watch it, publish it as it is, or throw it away and let the painting come
 * round again for a new one. Downloading it and posting it from the phone is
 * the third option and needs nothing from this page: the video is at a public
 * url, which is how Instagram fetches it in the first place.
 */
@Component({
  selector: 'app-publish',
  imports: [SlicePipe],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.scss',
})
export class PublishComponent {
  private readonly auth = inject(AdminAuthService);
  private readonly reels = inject(PendingReelsService);

  /** Bumped to ask again after publishing or discarding one. */
  private readonly reload = signal(0);

  private readonly loaded = toSignal(
    toObservable(computed(() => ({ token: this.auth.bearerToken(), nonce: this.reload() }))).pipe(
      switchMap(({ token }) => (token ? this.reels.pending(token) : of(undefined)))
    ),
    { initialValue: undefined }
  );

  /** The reels waiting, or an empty list. */
  protected readonly waiting = computed<PendingReel[]>(() => this.loaded() ?? []);

  /**
   * True only once an answer has come back and it was that nothing is waiting.
   *
   * Told apart from a failed request on purpose: both leave the page empty, and
   * only one of them means everything is working.
   */
  protected readonly nothingWaiting = computed(() => this.loaded()?.length === 0);
  protected readonly couldNotAsk = computed(() => this.loaded() === undefined);

  /** The reel currently being published or discarded, so its buttons can wait. */
  protected readonly busy = signal<string | null>(null);
  protected readonly problem = signal<string | null>(null);

  /**
   * Each half as it now reads, keyed by artwork and then by half.
   *
   * Held here rather than read off the textareas at the moment of publishing,
   * so that what is sent is what the page has, and an edit survives the other
   * reels on the page being dealt with.
   */
  private readonly edits = signal<Record<string, { sheet?: string; essay?: string }>>({});

  protected sheetOf(reel: PendingReel): string {
    return this.edits()[reel.tokenId]?.sheet ?? reel.sheet ?? '';
  }

  protected essayOf(reel: PendingReel): string {
    return this.edits()[reel.tokenId]?.essay ?? reel.essay ?? '';
  }

  protected edit(reel: PendingReel, half: 'sheet' | 'essay', event: Event): void {
    const text = (event.target as HTMLTextAreaElement).value;
    this.edits.update((all) => ({
      ...all,
      [reel.tokenId]: { ...all[reel.tokenId], [half]: text },
    }));
  }

  /**
   * Instagram's own ceiling, and roughly what the caption will come to.
   *
   * Roughly, because the markdown in the essay is flattened on its way out and
   * a link is shorter once its address is gone. It is a warning rather than a
   * gate: past the limit the backend trims the essay at a sentence, which is
   * what it has always done, so nothing is lost by pressing publish.
   */
  protected readonly captionLimit = 2200;

  protected captionLength(reel: PendingReel): number {
    return `${this.sheetOf(reel)}\n\n${this.essayOf(reel)}`.trim().length;
  }

  protected willBeTrimmed(reel: PendingReel): boolean {
    return this.captionLength(reel) > this.captionLimit;
  }

  /** Which reel's essay has just been saved over the critic, so the page can say so. */
  protected readonly saved = signal<string | null>(null);

  /**
   * The reel whose discard button has been pressed once.
   *
   * Discarding deletes a video that took minutes of ffmpeg to make, and it sits
   * one button away from the one that publishes. A second press is cheap and a
   * misclick is not; a dialog would be heavier than the decision deserves.
   */
  protected readonly confirming = signal<string | null>(null);

  /**
   * Sends both halves and publishes. Independent of saving: what is on screen
   * goes out whether or not it has been saved over the critic.
   */
  protected publish(reel: PendingReel): void {
    this.confirming.set(null);
    const parts = { sheet: this.sheetOf(reel), essay: this.essayOf(reel) };
    this.act(reel, (token) => this.reels.publish(reel.tokenId, parts, token), 'publish');
  }

  /**
   * Saves the essay over the critic, everywhere it is read — the artwork's own
   * page included. Publishes nothing.
   */
  protected updateCritic(reel: PendingReel): void {
    const token = this.auth.bearerToken();
    const body = this.essayOf(reel).trim();
    if (!token || !body || this.busy()) return;

    this.busy.set(reel.tokenId);
    this.problem.set(null);
    this.saved.set(null);
    this.reels.updateCritic(reel.tokenId, reel.lang, body, token).subscribe({
      next: (done) => {
        this.busy.set(null);
        if (done) this.saved.set(reel.tokenId);
        else this.problem.set(`Could not update the critic for \u201c${reel.name}\u201d.`);
      },
      error: () => {
        this.busy.set(null);
        this.problem.set(`Could not update the critic for \u201c${reel.name}\u201d.`);
      },
    });
  }

  protected discard(reel: PendingReel): void {
    if (this.confirming() !== reel.tokenId) {
      this.confirming.set(reel.tokenId);
      return;
    }
    this.confirming.set(null);
    this.act(reel, (token) => this.reels.discard(reel.tokenId, token), 'discard');
  }

  private act(
    reel: PendingReel,
    request: (token: string) => ReturnType<PendingReelsService['publish']>,
    what: string
  ): void {
    const token = this.auth.bearerToken();
    if (!token || this.busy()) return;

    this.busy.set(reel.tokenId);
    this.problem.set(null);
    request(token).subscribe({
      next: (done) => {
        this.busy.set(null);
        if (done) this.reload.update((n) => n + 1);
        else this.problem.set(`Could not ${what} the reel for “${reel.name}”.`);
      },
      error: () => {
        this.busy.set(null);
        this.problem.set(`Could not ${what} the reel for “${reel.name}”.`);
      },
    });
  }
}
