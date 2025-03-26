import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Nft, NftThumbnail } from "@domain/artwork/artwork.entity";
import { environment } from "@environments/environment";
import { SessionQuery } from "@shared/store/session.query";
import { SessionStore } from "@shared/store/session.store";
import CommonUtils from "@shared/utils/common.utils";
import DateUtils from "@shared/utils/date.utils";
import { catchError, filter, map, Observable, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ArtworkInfraService {
  constructor(
    private http: HttpClient,
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery
  ) {}

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

  getNftById(id: string): Nft | null {
    const foundArt = this.sessionQuery.selectArtPieces.find(({ tokenId }) => id === tokenId);
    return foundArt || null;
  }

  getNftByIdObservable(id: string): Observable<Nft | undefined> {
    return this.sessionQuery.getArtPiecesObservable.pipe(
      map(nfts => nfts.find(({ tokenId }) => id === tokenId))
    );
  }

  getArtByTitle(nameToSearch: string): Array<Nft> {
    return this.sessionQuery.selectArtPieces?.filter(({ name }) => name === nameToSearch);
  }


  getSameArtThanObservable(tokenId: string): Observable<Array<Nft>> {
    return this.getNftByIdObservable(tokenId).pipe(
      filter(nft => !!nft?.name),
      map(nft => this.getArtByTitle(nft!.name!))
    );
  }

  private getLocalCacheImg(tokenId: string): Observable<string> {
    const cachedThumbnail = this.sessionQuery.getThumbnailByTokenId(tokenId);
    if (cachedThumbnail) {
      return of(CommonUtils.composeImgSrc(cachedThumbnail.thumbnail));
    } else {
      return this.http.get<NftThumbnail>(`${environment.backendUrl}nft-thumbnails/${tokenId}`).pipe(
        tap(thumbnail => {
          const currentCache = this.sessionQuery.getValue().imageCache;
          this.sessionStore.update({
            imageCache: [...currentCache, thumbnail],
          });
        }),
        map(thumbnail => CommonUtils.composeImgSrc(thumbnail.thumbnail))
      );
    }
  }  

  getAvailableOptimalUrl(nft: Nft): Observable<string> {
    return this.getLocalCacheImg(nft.tokenId).pipe(
      catchError(() => {
          return of(nft.image.thumbnailUrl || nft.image.originalUrl!);
      })
    );
  }

  public getLinks(tokenId: string): Observable<string[]> {
    return this.http.get<string[]>(environment.backendUrl+'vision-search/'+tokenId);
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
