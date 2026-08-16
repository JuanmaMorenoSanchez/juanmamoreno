import { Component, computed, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { ArtCritic } from '@domain/artwork/critic.entity';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { filter, startWith, switchMap, take, timer } from 'rxjs';

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
  private translateService = inject(TranslateService);

  readonly tokenId = input.required<string>();

  private readonly currentLang = signal(
    this.toShortLang(this.translateService.getCurrentLang() ?? '')
  );

  private readonly critic = toSignal(
    toObservable(this.tokenId).pipe(
      switchMap((tokenId) =>
        timer(0, POLL_INTERVAL_MS).pipe(
          switchMap(() => this.artworkService.getArtPieceCritic(tokenId)),
          filter((critic): critic is ArtCritic => !!critic),
          // Once the essay is there it never changes under the reader's feet.
          take(1),
          // Clears the previous artwork's essay while the new one is fetched.
          startWith(null)
        )
      )
    ),
    { initialValue: null }
  );

  // The essay in the language the site is being read in, falling back to
  // whichever translation exists rather than showing nothing.
  readonly translated = computed(() => {
    const translated = this.critic()?.translated ?? [];
    const lang = this.currentLang();
    return translated.find((entry) => entry.lang === lang) ?? translated[0] ?? null;
  });

  constructor() {
    this.translateService.onLangChange.pipe(takeUntilDestroyed()).subscribe(({ lang }) => {
      this.currentLang.set(this.toShortLang(lang));
    });
  }

  private toShortLang(lang: string): string {
    return lang === 'es-ES' ? 'es' : 'en';
  }
}
