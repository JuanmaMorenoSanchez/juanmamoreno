import { SlicePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { PendingReel, PendingReelsService } from '@shared/services/pending-reels.service';
import { of, switchMap } from 'rxjs';

/**
 * How often the page asks whether a reel being made again has arrived.
 *
 * A render is minutes, so this is not a race — it is a slow check on something
 * slow, and asking oftener would only be asking oftener.
 */
const REMAKE_POLL_MS = 15_000;

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
  protected readonly waiting = computed<PendingReel[]>(() => {
    const reels = this.loaded() ?? [];
    // A reel being made again, whose date has moved, is one that has arrived.
    // Its edits are dropped with it: they belonged to a video that no longer
    // exists, and the caption has been rebuilt from the essay as it now reads.
    for (const [tokenId, asked] of Object.entries(this.remaking())) {
      const arrived = reels.find((reel) => reel.tokenId === tokenId);
      if (arrived && arrived.renderedAt !== asked) {
        queueMicrotask(() => {
          this.stopRemaking(tokenId);
          this.edits.update((all) => {
            const rest = { ...all };
            delete rest[tokenId];
            return rest;
          });
        });
      }
    }
    return reels;
  });

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
    return this.edits()[reel.tokenId]?.sheet ?? reel.sheet ?? this.halvesOfCaption(reel).sheet;
  }

  protected essayOf(reel: PendingReel): string {
    return this.edits()[reel.tokenId]?.essay ?? reel.essay ?? this.halvesOfCaption(reel).essay;
  }

  /**
   * The caption split back into halves, for a reel that has none.
   *
   * Reels made before the caption was kept in two parts have only the composed
   * text, and this page drew two empty boxes for them — which is exactly what
   * happened. The backend fills them in now; this is the same answer arrived at
   * independently, so an old reel, an old backend or a document written oddly
   * still gives him something to edit rather than nothing.
   *
   * The caption joins its parts with a blank line, so the first block is the
   * sheet and the rest is the essay.
   */
  private halvesOfCaption(reel: PendingReel): { sheet: string; essay: string } {
    const [sheet, ...rest] = (reel.caption ?? '').split('\n\n');
    return { sheet: (sheet ?? '').trim(), essay: rest.join('\n\n').trim() };
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
   * The reels being made again, and the date each had when it was asked for.
   *
   * A render takes minutes, and the request that starts it is not what tells us
   * it finished — the page watches the list instead, and a reel whose date has
   * moved is a reel that has been made again. That survives a reload, a dropped
   * connection and a closed tab, none of which stop the render.
   */
  private readonly remaking = signal<Record<string, string>>({});

  protected isRemaking(reel: PendingReel): boolean {
    return reel.tokenId in this.remaking();
  }

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
   * Asks for the video to be made again and watches for it to arrive.
   *
   * The request is deliberately not awaited for the sake of the interface: it
   * takes minutes, and what marks the reel as done is its date changing in the
   * list, not the response coming back. So the page polls, and the answer to
   * the request only matters if it says outright that it failed.
   */
  protected regenerate(reel: PendingReel): void {
    const token = this.auth.bearerToken();
    if (!token || this.isRemaking(reel)) return;

    this.problem.set(null);
    this.remaking.update((all) => ({ ...all, [reel.tokenId]: reel.renderedAt }));
    this.watchForNewVideo();

    this.reels.regenerate(reel.tokenId, token).subscribe({
      next: (started) => {
        if (!started) this.stopRemaking(reel.tokenId, `Could not make “${reel.name}” again.`);
      },
      // A render outlives the request that asked for it, so a dropped
      // connection is not a failure. The polling is what decides.
      error: () => undefined,
    });
  }

  /** Asks the list for the reels every so often while any is being made again. */
  private watchForNewVideo(): void {
    if (this.watching) return;
    this.watching = window.setInterval(() => {
      if (!Object.keys(this.remaking()).length) {
        window.clearInterval(this.watching);
        this.watching = 0;
        return;
      }
      this.reload.update((n) => n + 1);
    }, REMAKE_POLL_MS);
  }

  private watching = 0;

  private stopRemaking(tokenId: string, why?: string): void {
    this.remaking.update((all) => {
      const rest = { ...all };
      delete rest[tokenId];
      return rest;
    });
    if (why) this.problem.set(why);
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
