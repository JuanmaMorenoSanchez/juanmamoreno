import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { ArtCritic } from '@domain/artwork/critic.entity';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageUrlService } from '@shared/services/language-url.service';
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
  private language = inject(LanguageUrlService);
  protected isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly tokenId = input.required<string>();

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

  // Falls back to whichever translation exists rather than showing nothing.
  readonly translated = computed(() => {
    const translations = this.critic()?.translated ?? [];
    const language = this.language.contentLanguage();
    return translations.find((entry) => entry.lang === language) ?? translations[0] ?? null;
  });
}
