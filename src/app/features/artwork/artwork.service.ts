import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Artwork } from '@domain/artwork/artwork';
import { Nft, NftThumbnail } from '@domain/artwork/artwork.entity';
import { ArtworkPort } from '@domain/artwork/artwork.port';
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

export class ArtworkInfraService extends Artwork implements ArtworkPort {
  private http = inject(HttpClient);
  private sessionStore = inject(SessionStore);
  private sessionQuery = inject(SessionQuery);

  getArtPiecesObservable(): Observable<Nft[]> {
    if (!this.itIsNeccesaryToFetch()) {
      return this.sessionQuery.getArtPiecesObservable;
    }

    const apiCall$ = this.http
      .get<ApiResponse<Nft[]>>(`${environment.backendUrl}nfts-snapshot`)
      .pipe(
        this.extractData<Nft[]>([]),
        tap((nfts) => this.saveNftsLocally(nfts)),
        catchError(() => this.sessionQuery.getArtPiecesObservable),
      );

    if (this.sessionQuery.selectArtPieces.length) {
      // Stale-but-real persisted data beats the bundled fallback:
      // show it immediately while the API call refreshes it.
      return apiCall$.pipe(startWith(this.sessionQuery.selectArtPieces));
    }

    return this.getFallbackArtworks().pipe(
      // Put the fallback in the store (WITHOUT lastArtPiecesUpdate, so it
      // never counts as fresh) because menus and lookups read from the store.
      tap((fallbackNfts) =>
        this.sessionStore.update({ artPieces: fallbackNfts }),
      ),
      switchMap((fallbackNfts) => apiCall$.pipe(startWith(fallbackNfts))),
    );
  }

  private getFallbackArtworks(): Observable<Nft[]> {
    return from(import('./constants/artworks-fallback.constants')).pipe(
      map((m) => m.FALLBACK_ARTWORKS_API_CALL.data ?? []),
    );
  }

  getArtPieceDescriptions(tokenId: string): Observable<Descriptions | null> {
    return this.http
      .get<
        ApiResponse<Descriptions>
      >(`${environment.backendUrl}descriptions/${tokenId}`)
      .pipe(
        this.extractData<Descriptions | null>(null),
        catchError(() => of(null)),
      );
  }

  // Unwraps an ApiResponse, falling back when the call was not successful
  private extractData<T>(fallback: T): OperatorFunction<ApiResponse<T>, T> {
    return map((res) => (res.success && res.data ? res.data : fallback));
  }

  getNftByIdObservable(id: string): Observable<Nft | null> {
    return this.sessionQuery.getArtPiecesObservable.pipe(
      map((nfts) => this.getNftById(id, nfts)),
    );
  }

  getSameArtThanObservable(tokenId: string): Observable<Array<Nft>> {
    return this.getNftByIdObservable(tokenId).pipe(
      switchMap((nft) => {
        if (!nft) {
          return this.getArtPiecesObservable().pipe(
            switchMap((nfts) => {
              const foundNft = this.getNftById(tokenId, nfts);
              if (!foundNft?.name) return of([]);
              return of(this.getArtByTitle(foundNft.name, nfts));
            }),
          );
        }
        return of(
          this.getArtByTitle(nft.name!, this.sessionQuery.selectArtPieces),
        );
      }),
    );
  }

  getFullNftLenghtByYear(year: string): number {
    return this.getNftLenghtByYear(year, this.sessionQuery.selectArtPieces);
  }

  getAvailableOptimalUrl(nft: Nft): Observable<string> {
    return this.getLocalCachedThumbnail(nft.tokenId).pipe(
      switchMap((cachedUrl) => {
        if (cachedUrl) {
          return of(cachedUrl);
        } else {
          return this.fetchRemoteThumbnail(nft.tokenId).pipe(
            map(
              (fetched) =>
                fetched || nft.image.thumbnailUrl || nft.image.originalUrl!,
            ),
          );
        }
      }),
    );
  }

  // Races every available source for an artwork image and emits the urls as
  // they arrive, in strictly increasing quality: backend thumbnail (or its
  // session cache), then the NFT's own thumbnailUrl and cachedUrl. Sources
  // that resolve late with a lower quality than what is already displayed
  // are discarded. The multi-MB originalUrl is intentionally not part of the
  // race: the viewer's <img> downloads it in parallel as the final step.
  getProgressiveImageUrls(nft: Nft): Observable<string> {
    const backendThumbnail$ = this.getLocalCachedThumbnail(nft.tokenId).pipe(
      switchMap((cachedUrl) =>
        cachedUrl ? of(cachedUrl) : this.fetchRemoteThumbnail(nft.tokenId),
      ),
      catchError(() => of(null)),
      map((url) => ({ url, quality: PreviewQuality.BACKEND_THUMBNAIL })),
    );
    const nftThumbnail$ = this.preloadImage(nft.image?.thumbnailUrl).pipe(
      map((url) => ({ url, quality: PreviewQuality.NFT_THUMBNAIL })),
    );
    const nftCached$ = this.preloadImage(nft.image?.cachedUrl).pipe(
      map((url) => ({ url, quality: PreviewQuality.NFT_CACHED })),
    );

    return merge(backendThumbnail$, nftThumbnail$, nftCached$).pipe(
      scan(
        (best: PreviewCandidate, candidate: PreviewCandidate) =>
          candidate.url && candidate.quality > best.quality ? candidate : best,
        { url: null, quality: 0 },
      ),
      map(({ url }) => url),
      filter((url): url is string => !!url),
      distinctUntilChanged(),
    );
  }

  // Downloads an image off-screen and emits its url once it is ready to be
  // displayed. Unsubscribing aborts the in-flight download.
  private preloadImage(url: string | undefined): Observable<string> {
    if (!url) return EMPTY;
    return new Observable<string>((subscriber) => {
      const img = new Image();
      img.onload = () => {
        subscriber.next(url);
        subscriber.complete();
      };
      img.onerror = () => subscriber.complete();
      img.src = url;
      return () => {
        img.onload = null;
        img.onerror = null;
        if (!img.complete) img.src = '';
      };
    });
  }

  getLinks(tokenId: string): Observable<string[]> {
    return this.http
      .get<
        ApiResponse<string[]>
      >(environment.backendUrl + 'vision/search/' + tokenId)
      .pipe(
        this.extractData<string[]>([]),
        catchError(() => of([])),
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
    return of(
      cachedThumbnail
        ? CommonUtils.composeImgSrc(cachedThumbnail.thumbnail)
        : null,
    );
  }

  private fetchRemoteThumbnail(tokenId: string): Observable<string | null> {
    return this.http
      .get<
        ApiResponse<NftThumbnail>
      >(`${environment.backendUrl}nft-thumbnails/${tokenId}`)
      .pipe(
        tap((res) => {
          if (res.success && res.data) {
            const currentCache = this.sessionQuery.getValue().imageCache;
            this.sessionStore.update({
              imageCache: [...currentCache, res.data],
            });
          }
        }),
        map((res) =>
          res.data ? CommonUtils.composeImgSrc(res.data?.thumbnail) : null,
        ),
      );
  }

  private itIsNeccesaryToFetch(): boolean {
    const daysBeforeExpireData = 7;
    return (
      !this.sessionQuery.selectArtPieces.length ||
      !this.sessionQuery.selectLastArtPiecesUpdate ||
      DateUtils.olderThanNDays(
        this.sessionQuery.selectLastArtPiecesUpdate,
        daysBeforeExpireData,
      )
    );
  }
}
