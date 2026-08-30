import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PLATFORM_ID, TransferState, inject, makeStateKey } from '@angular/core';
import { Router } from '@angular/router';
import { Artwork } from '@domain/artwork/artwork';
import { Nft, NftThumbnail } from '@domain/artwork/artwork.entity';
import { ArtworkPort } from '@domain/artwork/artwork.port';
import { ArtCritic } from '@domain/artwork/critic.entity';
import { Descriptions } from '@domain/artwork/descriptions.entity';
import { environment } from '@environments/environment';
import { SessionQuery } from '@shared/store/session.query';
import { SessionStore } from '@shared/store/session.store';
import { ApiResponse } from '@shared/types/api-response.type';
import CommonUtils from '@shared/utils/common.utils';
import DateUtils from '@shared/utils/date.utils';
import {
  catchError,
  distinctUntilChanged,
  EMPTY,
  filter,
  from,
  map,
  merge,
  Observable,
  of,
  OperatorFunction,
  scan,
  startWith,
  switchMap,
  tap,
  timeout,
} from 'rxjs';

// Relative quality of each preview source, used to only ever upgrade the
// displayed image while the sources race each other.
enum PreviewQuality {
  BACKEND_THUMBNAIL = 1,
  NFT_THUMBNAIL = 2,
  NFT_CACHED = 3,
}

interface PreviewCandidate {
  url: string | null;
  quality: number;
}

// The catalogue, handed from the build to the browser through the page itself.
const ART_PIECES_KEY = makeStateKey<Nft[]>('artPieces');

/**
 * How long a build waits on the backend for one artwork's extras.
 *
 * Angular gives each prerendered route a fixed budget and fails the route when
 * it runs out, which fails the build. Three hundred and eighty-eight pages ask
 * for a description and an essay each, so a slow spell was taking whole deploys
 * down. A page without its essay is worth having; a failed deploy is not.
 */
const PRERENDER_FETCH_TIMEOUT_MS = 8000;

export class ArtworkInfraService extends Artwork implements ArtworkPort {
  private http = inject(HttpClient);
  private sessionStore = inject(SessionStore);
  private sessionQuery = inject(SessionQuery);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private transferState = inject(TransferState);
  private router = inject(Router);

  getArtPiecesObservable(): Observable<Nft[]> {
    const transferred = this.takeTransferredArtPieces();
    if (transferred) {
      // Exactly what the build rendered this page's grid from. Using it makes
      // the browser's first render identical to the served markup, so
      // hydration keeps the tiles instead of tearing them down and building
      // them again — which is what emptied every square for a moment.
      this.saveNftsLocally(transferred);
      return of(transferred);
    }

    if (!this.shouldRefetchCatalogue()) {
      return this.sessionQuery.getArtPiecesObservable;
    }

    const apiCall$ = this.http
      .get<ApiResponse<Nft[]>>(`${environment.backendUrl}nfts-snapshot`)
      .pipe(
        this.extractData<Nft[]>([]),
        tap((nfts) => {
          this.saveNftsLocally(nfts);
          this.transferArtPieces(nfts);
        }),
        catchError(() => this.sessionQuery.getArtPiecesObservable)
      );

    // Prerendering waits on HTTP but not on an arbitrary promise, so the
    // dynamic import below can still be in flight when the page is written out
    // — which is how the built /artworks came to contain a spinner and no
    // artworks at all. The build has the network and wants the real catalogue
    // anyway; the bundled fallback exists to give a browser something instant.
    if (!this.isBrowser) {
      return apiCall$;
    }

    if (this.sessionQuery.selectArtPieces.length) {
      // Stale-but-real persisted data beats the bundled fallback:
      // show it immediately while the API call refreshes it.
      return apiCall$.pipe(startWith(this.sessionQuery.selectArtPieces));
    }

    return this.getFallbackArtworks().pipe(
      // Put the fallback in the store (WITHOUT lastArtPiecesUpdate, so it
      // never counts as fresh) because menus and lookups read from the store.
      tap((fallbackNfts) => this.sessionStore.update({ artPieces: fallbackNfts })),
      switchMap((fallbackNfts) => apiCall$.pipe(startWith(fallbackNfts)))
    );
  }

  /**
   * Hands the catalogue to the browser through the page, but only on the pages
   * built around the whole grid.
   *
   * It is ~430kB. Carrying it on all 386 prerendered pages to spare a request
   * would be a bad trade; carrying it on the two that render every artwork is
   * how those pages avoid rebuilding their grid the moment they load.
   */
  private transferArtPieces(nfts: Nft[]): void {
    if (this.isBrowser || !nfts.length) return;
    const path = this.router.url.split('?')[0].replace(/\/+$/, '');
    if (path !== '/artworks' && path !== '/es/artworks') return;
    this.transferState.set(ART_PIECES_KEY, nfts);
  }

  private takeTransferredArtPieces(): Nft[] | null {
    if (!this.isBrowser || !this.transferState.hasKey(ART_PIECES_KEY)) return null;
    const nfts = this.transferState.get(ART_PIECES_KEY, []);
    // Read once: a later navigation should ask the API rather than replay a
    // catalogue that was current when the page was built.
    this.transferState.remove(ART_PIECES_KEY);
    return nfts.length ? nfts : null;
  }

  private getFallbackArtworks(): Observable<Nft[]> {
    return from(import('./constants/artworks-fallback.constants')).pipe(
      map((m) => m.FALLBACK_ARTWORKS_API_CALL.data ?? [])
    );
  }

  getArtPieceDescriptions(tokenId: string): Observable<Descriptions | null> {
    return this.http
      .get<ApiResponse<Descriptions>>(`${environment.backendUrl}descriptions/${tokenId}`)
      .pipe(
        this.extractData<Descriptions | null>(null),
        this.giveUpDuringBuild(),
        catchError(() => of(null))
      );
  }

  // Null until the essay has been written: the backend answers 404 for an
  // artwork it has not written about yet.
  //
  // A visitor asking for a missing one has the backend write it. A build must
  // not: it prerenders a page for every artwork in the catalogue, so it asks
  // read-only and ships whatever essay already exists.
  getArtPieceCritic(tokenId: string): Observable<ArtCritic | null> {
    const options = this.isBrowser ? {} : { params: { generate: 'false' } };
    return this.http
      .get<ApiResponse<ArtCritic>>(`${environment.backendUrl}critics/${tokenId}`, options)
      .pipe(
        this.extractData<ArtCritic | null>(null),
        this.giveUpDuringBuild(),
        catchError(() => of(null))
      );
  }

  /**
   * The same essay, with whether it has been edited, for the artist alone.
   *
   * A separate route rather than a flag on the public one: the backend can only
   * answer this for a request it has authenticated, and asking somewhere else
   * makes that impossible to forget.
   */
  getArtPieceCriticWithEdits(tokenId: string, token: string): Observable<ArtCritic | null> {
    return this.http
      .get<ApiResponse<ArtCritic>>(`${environment.backendUrl}critics/${tokenId}/edits`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        this.extractData<ArtCritic | null>(null),
        catchError(() => of(null))
      );
  }

  /** Replaces one language's text with the artist's own. */
  editArtPieceCritic(
    tokenId: string,
    lang: string,
    body: string,
    token: string
  ): Observable<ArtCritic | null> {
    return this.http
      .patch<ApiResponse<ArtCritic>>(
        `${environment.backendUrl}critics/${tokenId}`,
        { lang, body },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .pipe(this.extractData<ArtCritic | null>(null));
  }

  /** Bounds a build's wait on the backend. Does nothing in a browser. */
  private giveUpDuringBuild<T>(): OperatorFunction<T, T> {
    return (source) => (this.isBrowser ? source : source.pipe(timeout(PRERENDER_FETCH_TIMEOUT_MS)));
  }

  // Unwraps an ApiResponse, falling back when the call was not successful
  private extractData<T>(fallback: T): OperatorFunction<ApiResponse<T>, T> {
    return map((res) => (res.success && res.data ? res.data : fallback));
  }

  getNftByIdObservable(id: string): Observable<Nft | null> {
    return this.sessionQuery.getArtPiecesObservable.pipe(map((nfts) => this.getNftById(id, nfts)));
  }

  getArtworkViewsObservable(tokenId: string): Observable<Array<Nft>> {
    return this.getNftByIdObservable(tokenId).pipe(
      switchMap((nft) => {
        if (!nft) {
          return this.getArtPiecesObservable().pipe(
            switchMap((nfts) => {
              const foundNft = this.getNftById(tokenId, nfts);
              if (!foundNft?.name) return of([]);
              return of(this.getArtByTitle(foundNft.name, nfts));
            })
          );
        }
        return of(this.getArtByTitle(nft.name!, this.sessionQuery.selectArtPieces));
      })
    );
  }

  countCatalogueArtworksInYear(year: string): number {
    return this.countArtworksInYear(year, this.sessionQuery.selectArtPieces);
  }

  getAvailableOptimalUrl(nft: Nft): Observable<string> {
    return this.getLocalCachedThumbnail(nft.tokenId).pipe(
      switchMap((cachedUrl) => {
        if (cachedUrl) {
          return of(cachedUrl);
        } else {
          return this.fetchRemoteThumbnail(nft.tokenId).pipe(
            // Without this, a failed request (e.g. a CORS rejection) errors
            // the whole observable instead of reaching the fallback below,
            // leaving the tile's thumbnail permanently unset.
            catchError(() => of(null)),
            map((fetched) => fetched || nft.image.thumbnailUrl || nft.image.originalUrl!)
          );
        }
      })
    );
  }

  // Races every available source for an artwork image and emits the urls as
  // they arrive, in strictly increasing quality: backend thumbnail (or its
  // session cache), then the NFT's own thumbnailUrl and cachedUrl. Sources
  // that resolve late with a lower quality than what is already displayed
  // are discarded. The multi-MB originalUrl is intentionally not part of the
  // race: the viewer's <img> downloads it in parallel as the final step.
  getProgressiveImageUrls(nft: Nft, thumbnailOnly = false): Observable<string> {
    const backendThumbnail$ = this.getLocalCachedThumbnail(nft.tokenId).pipe(
      switchMap((cachedUrl) =>
        cachedUrl ? of(cachedUrl) : this.fetchRemoteThumbnail(nft.tokenId)
      ),
      catchError(() => of(null)),
      map((url) => ({ url, quality: PreviewQuality.BACKEND_THUMBNAIL }))
    );
    const nftThumbnail$ = this.preloadImage(nft.image?.thumbnailUrl).pipe(
      map((url) => ({ url, quality: PreviewQuality.NFT_THUMBNAIL }))
    );
    const sources = [backendThumbnail$, nftThumbnail$];
    if (!thumbnailOnly) {
      // cachedUrl is Alchemy's full-resolution image (several MB); callers that
      // only need a quick preview (thumbnailOnly) skip it and add it themselves.
      const nftCached$ = this.preloadImage(nft.image?.cachedUrl).pipe(
        map((url) => ({ url, quality: PreviewQuality.NFT_CACHED }))
      );
      sources.push(nftCached$);
    }

    return merge(...sources).pipe(
      scan(
        (best: PreviewCandidate, candidate: PreviewCandidate) =>
          candidate.url && candidate.quality > best.quality ? candidate : best,
        { url: null, quality: 0 }
      ),
      map(({ url }) => url),
      filter((url): url is string => !!url),
      distinctUntilChanged()
    );
  }

  // Downloads an image off-screen and emits its url once it is ready to be
  // displayed. Unsubscribing aborts the in-flight download.
  // No-op when the pages are prerendered: there is no Image to decode into,
  // and a build has no screen to show a preview on.
  private preloadImage(url: string | undefined): Observable<string> {
    if (!url || typeof Image === 'undefined') return EMPTY;
    return new Observable<string>((subscriber) => {
      const img = new Image();
      let cancelled = false;
      img.src = url;
      // decode(), not onload: onload only means the bytes arrived. Handing a
      // url that has not been rasterised to the visible <img> clears whatever
      // it was showing while the browser decodes the new one — the blank
      // between one image and the next. Waiting for the bitmap makes the swap
      // a single frame.
      img
        .decode()
        .then(() => {
          if (cancelled) return;
          subscriber.next(url);
          subscriber.complete();
        })
        .catch(() => {
          // Failed, or aborted by the teardown below.
          if (!cancelled) subscriber.complete();
        });
      return () => {
        cancelled = true;
        if (!img.complete) img.src = '';
      };
    });
  }

  getLinks(tokenId: string): Observable<string[]> {
    return this.http
      .get<ApiResponse<string[]>>(environment.backendUrl + 'vision/search/' + tokenId)
      .pipe(
        this.extractData<string[]>([]),
        catchError(() => of([]))
      );
  }

  /**
   * Which artworks have been gone over by hand, as one answer for the lot.
   *
   * A map rather than a list, because the catalogue asks the question of every
   * tile it draws. An artwork with no essay at all is simply absent, which
   * reads the same as not edited and is the truth.
   */
  getEditedCritics(token: string): Observable<Map<string, boolean>> {
    return this.http
      .get<ApiResponse<Array<{ tokenId: string; edited: boolean }>>>(
        `${environment.backendUrl}critics/edits`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .pipe(
        this.extractData<Array<{ tokenId: string; edited: boolean }>>([]),
        map((entries) => new Map(entries.map((entry) => [entry.tokenId, entry.edited]))),
        catchError(() => of(new Map<string, boolean>()))
      );
  }

  getAvailableYears(): Set<number> {
    return this.getYears(this.sessionQuery.selectArtPieces);
  }

  saveNftsLocally(nfts: Array<Nft>): void {
    this.sessionStore.update({
      artPieces: nfts,
      lastArtPiecesUpdate: new Date(),
    });
  }

  private getLocalCachedThumbnail(tokenId: string): Observable<string | null> {
    const cachedThumbnail = this.sessionQuery.getThumbnailByTokenId(tokenId);
    return of(cachedThumbnail ? CommonUtils.composeImgSrc(cachedThumbnail.thumbnail) : null);
  }

  private fetchRemoteThumbnail(tokenId: string): Observable<string | null> {
    return this.http
      .get<ApiResponse<NftThumbnail>>(`${environment.backendUrl}nft-thumbnails/${tokenId}`)
      .pipe(
        tap((res) => {
          if (res.success && res.data) {
            const currentCache = this.sessionQuery.getValue().imageCache;
            this.sessionStore.update({
              imageCache: [...currentCache, res.data],
            });
          }
        }),
        map((res) => (res.data ? CommonUtils.composeImgSrc(res.data?.thumbnail) : null))
      );
  }

  private shouldRefetchCatalogue(): boolean {
    const daysBeforeExpireData = 7;
    return (
      !this.sessionQuery.selectArtPieces.length ||
      !this.sessionQuery.selectLastArtPiecesUpdate ||
      DateUtils.olderThanNDays(this.sessionQuery.selectLastArtPiecesUpdate, daysBeforeExpireData)
    );
  }
}
