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
import { catchError, filter, map, Observable, of, switchMap, tap } from 'rxjs';

export class ArtworkInfraService extends Artwork implements ArtworkPort {
  private http = inject(HttpClient);
  private sessionStore = inject(SessionStore);
  private sessionQuery = inject(SessionQuery);

  getArtPiecesObservable(): Observable<Nft[]> {
    if (this.itIsNeccesaryToFetch()) {
      return this.http
        .get<ApiResponse<Nft[]>>(`${environment.backendUrl}nfts-snapshot`)
        .pipe(
          map((res: ApiResponse<Nft[]>) => {
            if (res.success && res.data) {
              return res.data;
            } else {
              return [];
            }
          }),
          tap((nfts) => this.saveNftsLocally(nfts)),
          catchError(() => this.sessionQuery.getArtPiecesObservable)
        );
    } else {
      return this.sessionQuery.getArtPiecesObservable;
    }
  }

  getArtPieceDescriptions(tokenId: string): Observable<Descriptions | null> {
    return this.http
      .get<ApiResponse<Descriptions>>(
        `${environment.backendUrl}descriptions/${tokenId}`
      )
      .pipe(
        map((res: ApiResponse<Descriptions>) => {
          if (res.success && res.data) {
            return res.data;
          } else {
            return null;
          }
        }),
        catchError(() => of(null))
      );
  }

  getNftByIdObservable(id: string): Observable<Nft | null> {
    return this.sessionQuery.getArtPiecesObservable.pipe(
      map((nfts) => this.getNftById(id, nfts))
    );
  }

  getSameArtThanObservable(tokenId: string): Observable<Array<Nft>> {
    return this.getNftByIdObservable(tokenId).pipe(
      filter((nft) => !!nft?.name),
      map((nft) =>
        this.getArtByTitle(nft!.name!, this.sessionQuery.selectArtPieces)
      )
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
                fetched || nft.image.thumbnailUrl || nft.image.originalUrl!
            )
          );
        }
      })
    );
  }

  getLinks(tokenId: string): Observable<string[]> {
    return this.http
      .get<ApiResponse<string[]>>(
        environment.backendUrl + 'vision/search/' + tokenId
      )
      .pipe(
        map((res: ApiResponse<string[]>) => {
          if (res.success && res.data) {
            return res.data;
          } else {
            return [];
          }
        }),
        catchError(() => of([]))
      );
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
        : null
    );
  }

  private fetchRemoteThumbnail(tokenId: string): Observable<string | null> {
    return this.http
      .get<ApiResponse<NftThumbnail>>(
        `${environment.backendUrl}nft-thumbnails/${tokenId}`
      )
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
          res.data ? CommonUtils.composeImgSrc(res.data?.thumbnail) : null
        )
      );
  }

  private itIsNeccesaryToFetch(): boolean {
    const daysBeforeExpireData = 7;
    return (
      !this.sessionQuery.selectArtPieces.length ||
      !this.sessionQuery.selectLastArtPiecesUpdate ||
      DateUtils.olderThanNDays(
        this.sessionQuery.selectLastArtPiecesUpdate,
        daysBeforeExpireData
      )
    );
  }

  /* Expose domain functions*/
  // no se pueden implementar en la interfaz porque son funciones estáticas
  // lo que puedo hacer es dejarlo como está
  // public getTraitValue(nft: Nft, trait: VALIDTRAITS) {
  //   return this.domain.getTraitValue(nft, trait);
  // }
}
