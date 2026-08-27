import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { ArtCritic } from '@domain/artwork/critic.entity';
import { TranslatePipe } from '@ngx-translate/core';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { LanguageUrlService } from '@shared/services/language-url.service';
import { combineLatest, filter, of, startWith, switchMap, take, timer } from 'rxjs';

// The essay is not written on demand: the backend writes it when the artwork is
// published to social, so a piece can be on the page before its text exists.
// Rather than give up on the first 404, keep asking until there is something to
// print — the spinner stands in for the text meanwhile.
const POLL_INTERVAL_MS = 30_000;

@Component({
  selector: 'app-artwork-critic',
  templateUrl: './artwork-critic.component.html',
  styleUrl: './artwork-critic.component.scss',
  imports: [MatProgressSpinner, TranslatePipe],
})
export class ArtworkCriticComponent {
  private artworkService = inject(ARTWORK_PORT);
  private language = inject(LanguageUrlService);
  private auth = inject(AdminAuthService);
  protected isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly tokenId = input.required<string>();

  /** Only ever true for the artist, and only in a browser he has signed in on. */
  protected readonly isArtist = computed(() => this.auth.isAdmin());

  private readonly critic = toSignal(
    toObservable(this.tokenId).pipe(
      switchMap((tokenId) => {
        const fetch$ = this.artworkService.getArtPieceCritic(tokenId);
        // A build cannot sit in a polling loop waiting for an essay to be
        // written: it asks once, and the page it emits carries the essay only
        // if there already is one. In the browser it keeps asking as before.
        const source$ = this.isBrowser
          ? timer(0, POLL_INTERVAL_MS).pipe(switchMap(() => fetch$))
          : fetch$;

        return source$.pipe(
          filter((critic): critic is ArtCritic => !!critic),
          // Once the essay is there it never changes under the reader's feet.
          take(1),
          // Clears the previous artwork's essay while the new one is fetched.
          startWith(null)
        );
      })
    ),
    { initialValue: null }
  );

  /**
   * The same essay fetched again as the artist, which is the only way to learn
   * whether it has been rewritten by hand.
   *
   * A second request rather than a flag on the first: the backend strips that
   * flag from the public route, so there is nowhere else it could come from,
   * and a reader watching the network sees exactly what a reader should.
   */
  private readonly asArtist = toSignal(
    combineLatest([
      toObservable(this.tokenId),
      toObservable(computed(() => this.auth.bearerToken())),
    ]).pipe(
      switchMap(([tokenId, token]) =>
        token && this.isBrowser
          ? this.artworkService.getArtPieceCriticWithEdits(tokenId, token)
          : of(null)
      )
    ),
    { initialValue: null }
  );

  /** Set once an edit has been saved, so the page shows it without refetching. */
  private readonly justSaved = signal<ArtCritic | null>(null);

  private readonly shown = computed(() => this.justSaved() ?? this.asArtist() ?? this.critic());

  // Falls back to whichever translation exists rather than showing nothing.
  readonly translated = computed(() => {
    const translations = this.shown()?.translated ?? [];
    const language = this.language.contentLanguage();
    return translations.find((entry) => entry.lang === language) ?? translations[0] ?? null;
  });

  /**
   * Whether a hand has been over this one — for the artist alone, and only when
   * the answer actually came from the authenticated route. Null means the
   * question was never asked, which is not the same as "no".
   */
  protected readonly hasBeenEdited = computed(() => {
    if (!this.isArtist()) return null;
    const critic = this.shown();
    return critic && critic.edited !== undefined ? critic.edited : null;
  });

  protected readonly editing = signal(false);
  protected readonly draft = signal('');
  protected readonly saving = signal(false);
  protected readonly problem = signal('');

  protected readonly canSave = computed(() => this.draft().trim().length > 0 && !this.saving());

  protected startEditing(): void {
    const current = this.translated();
    if (!current) return;
    // The markdown, not the html: the markdown is the original and the html is
    // made from it, so editing the html would be editing the copy.
    this.draft.set(current.body ?? '');
    this.problem.set('');
    this.editing.set(true);
  }

  protected cancelEditing(): void {
    this.editing.set(false);
    this.problem.set('');
  }

  protected setDraft(event: Event): void {
    this.draft.set((event.target as HTMLTextAreaElement).value);
  }

  protected save(): void {
    const current = this.translated();
    const token = this.auth.bearerToken();
    if (!current || !token || !this.canSave()) return;

    this.saving.set(true);
    this.problem.set('');
    this.artworkService
      .editArtPieceCritic(this.tokenId(), current.lang, this.draft().trim(), token)
      .subscribe({
        next: (updated) => {
          this.saving.set(false);
          if (!updated) {
            this.problem.set('critic.saveFailed');
            return;
          }
          this.justSaved.set(updated);
          this.editing.set(false);
        },
        error: () => {
          this.saving.set(false);
          this.problem.set('critic.saveFailed');
        },
      });
  }
}
