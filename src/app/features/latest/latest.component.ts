import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageUrlService } from '@shared/services/language-url.service';
import { PostedArtworksService } from '@shared/services/posted-artworks.service';

/** How many the page shows. Enough to scroll a little, not enough to be a catalogue. */
const HOW_MANY = 12;

/**
 * What has lately been on Instagram, and where each of them lives here.
 *
 * This page exists because of a limit in Instagram rather than anything about
 * the paintings: the account gets one clickable link, in the profile, and a
 * caption cannot carry another. So a follower who has just seen a painting has
 * no route to the page about it — the essay, the other views, the size, the
 * price.
 *
 * The profile link points here, and here is always current, because the order
 * is read from what was actually posted rather than from the catalogue. It is
 * the same sequence somebody has just scrolled past, which is what makes a
 * painting findable: they are looking for the one they saw a moment ago.
 *
 * Deliberately not a third-party link-in-bio page. This one is on the artist's
 * own domain, carries no tracking, and cannot start charging.
 */
@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrl: './latest.component.scss',
  imports: [RouterLink, TranslatePipe],
})
export class LatestComponent {
  private artworkService = inject(ARTWORK_PORT);
  protected lang = inject(LanguageUrlService);

  /** Undefined until it has been answered, and if it never is. */
  protected readonly posted = toSignal(inject(PostedArtworksService).getLatest(HOW_MANY));

  private readonly catalogue = toSignal(this.artworkService.getArtPiecesObservable(), {
    initialValue: [] as Nft[],
  });

  /**
   * Each posted painting paired with the catalogue's copy of it, for the
   * picture. The backend answers with a name and a token and nothing heavier;
   * every image the page needs is already in the session.
   */
  protected readonly shown = computed(() => {
    const byToken = new Map(this.catalogue().map((nft) => [nft.tokenId, nft]));
    return (this.posted() ?? []).map((entry) => {
      const nft = byToken.get(entry.tokenId);
      return {
        ...entry,
        // The catalogue's name is the one the rest of the site shows; the
        // recorded one is a copy taken on the day it was posted.
        title: nft?.name || entry.name,
        thumbnail: nft ? this.artworkService.getNftOptimalUrl(nft.image) : '',
        href: this.lang.link(`artwork/${entry.tokenId}`),
      };
    });
  });

  /**
   * Whether to say that nothing has been posted.
   *
   * Only when that is what was actually said. A request that failed is not an
   * empty account, and answering one with the other would replace a page full
   * of paintings with a claim that there are none — which is exactly what
   * happens the moment the backend is unreachable.
   */
  protected readonly nothingPosted = computed(() => this.posted()?.length === 0);
}
