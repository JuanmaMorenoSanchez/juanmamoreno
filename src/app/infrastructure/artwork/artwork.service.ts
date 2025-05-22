import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Nft, NftThumbnail } from "@domain/artwork/artwork.entity";
import { ArtworkService } from "@domain/artwork/artwork.service";
import { environment } from "@environments/environment";
import { SessionQuery } from "@shared/store/session.query";
import { SessionStore } from "@shared/store/session.store";
import CommonUtils from "@shared/utils/common.utils";
import DateUtils from "@shared/utils/date.utils";
import { catchError, filter, map, Observable, of, switchMap, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ArtworkInfraService {
  private artworkDomainService = inject(ArtworkService);
  private http = inject(HttpClient);
  private sessionStore = inject(SessionStore);
  private sessionQuery = inject(SessionQuery);

  getArtPiecesObservable(): Observable<Nft[]> {
    if (this.itIsNeccesaryToFetch()) {
      return this.http.get<Nft[]>(`${environment.backendUrl}nfts-snapshot`).pipe(
        tap(nfts => this.saveNftsLocally(nfts))
      );
    } else {
      return this.getLocalArtPiecesObservable();
    }
  }

  getLocalArtPiecesObservable(): Observable<Nft[]> {
    return this.sessionQuery.getArtPiecesObservable;
  }

  // Here and not in domain service because of rxjs
  getNftByIdObservable(id: string): Observable<Nft | null> {
    return this.sessionQuery.getArtPiecesObservable.pipe(
      map(nfts => this.artworkDomainService.getNftById(id, nfts))
    );
  }

  getSameArtThanObservable(tokenId: string): Observable<Array<Nft>> {
    return this.getNftByIdObservable(tokenId).pipe(
      filter(nft => !!nft?.name),
      map(nft => this.artworkDomainService.getArtByTitle(nft!.name!, this.sessionQuery.selectArtPieces))
    );
  }

  getNftLenghtByYear(year: string): number {
    return this.artworkDomainService.getNftLenghtByYear(year, this.sessionQuery.selectArtPieces);
  }

  private getLocalCachedThumbnail(tokenId: string): Observable<string | null> {
    const cachedThumbnail = this.sessionQuery.getThumbnailByTokenId(tokenId);
    return of(cachedThumbnail ? CommonUtils.composeImgSrc(cachedThumbnail.thumbnail) : null);
  }

  private fetchRemoteThumbnail(tokenId: string): Observable<string | null> {
    return this.http.get<NftThumbnail>(`${environment.backendUrl}nft-thumbnails/${tokenId}`).pipe(
      tap(thumbnail => {
        const currentCache = this.sessionQuery.getValue().imageCache;
        this.sessionStore.update({
          imageCache: [...currentCache, thumbnail],
        });
      }),
      map(thumbnail => 
        (thumbnail ? CommonUtils.composeImgSrc(thumbnail?.thumbnail) : null)
      ),
    );
  }


  getAvailableOptimalUrl(nft: Nft): Observable<string> {
    return this.getLocalCachedThumbnail(nft.tokenId).pipe(
      switchMap(cachedUrl => {
        if (cachedUrl) {
          return of(cachedUrl);
        } else {
          return this.fetchRemoteThumbnail(nft.tokenId).pipe(
            map(fetched => fetched || nft.image.thumbnailUrl || nft.image.originalUrl!)
          );
        }
      })
    );
  }

  public getLinks(tokenId: string): Observable<string[]> {
    return this.http.get<string[]>(environment.backendUrl+'vision-search/'+tokenId).pipe(
      catchError(() => of([]))
    );
  }

  private itIsNeccesaryToFetch(): boolean {
    const daysBeforeExpireData = 7;
    return (
      !this.sessionQuery.selectArtPieces.length || 
      !this.sessionQuery.selectLastArtPiecesUpdate || 
      DateUtils.olderThanNDays(this.sessionQuery.selectLastArtPiecesUpdate, daysBeforeExpireData)
    )
  }

  public saveNftsLocally(nfts: Array<Nft>): void {
    this.sessionStore.update({ artPieces: nfts, lastArtPiecesUpdate: new Date() });
  }
}
