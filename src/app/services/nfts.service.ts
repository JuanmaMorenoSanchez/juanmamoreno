import { Injectable } from '@angular/core';
import { SessionQuery } from '@store/session.query';
import { Observable, catchError, filter, map, of, tap } from 'rxjs';
import DateUtils from '@utils/date.utils';
import { VALIDTRAITS, VIEW_TYPES } from '@constants/nft.constants';
import { Nft, NftImage } from 'alchemy-sdk';
import { environment } from "@environments/environment";
import { HttpClient } from '@angular/common/http';
import { SessionStore } from '@store/session.store';
import { NftThumbnail } from '@models/nfts.models';

@Injectable({
  providedIn: 'root'
})
export class NftsService {

  constructor(
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
    private httpClient: HttpClient
  ) {
  }

  public getNfts(): Observable<Nft[]> {
    // entre donde entre, pasa lo mismo. Ergo creo es un problema de los datos en si
    if (this.itIsNeccesaryToFetch()) {
      return this.httpClient.get<Nft[]>(environment.backendUrl+'nfts-snapshot').pipe(
        tap(nfts => this.saveNftsLocally(nfts))
      );
    } else {
      return this.sessionQuery.selectArtPiecesObservable;
    }
  }

  public getLinks(tokenId: string): Observable<string[]> {
    return this.httpClient.get<string[]>(environment.backendUrl+'vision-search/'+tokenId);
  }

  private getLocalCacheImg(tokenId: string): Observable<string> {
    const cachedThumbnail = this.sessionQuery.getThumbnailByTokenId(tokenId);
    if (cachedThumbnail) {
      return of(this.composeImgSrc(cachedThumbnail.thumbnail));
    } else {
      return this.httpClient.get<NftThumbnail>(`${environment.backendUrl}nft-thumbnails/${tokenId}`).pipe(
        tap(thumbnail => {
          const currentCache = this.sessionQuery.getValue().imageCache;
          this.sessionStore.update({
            imageCache: [...currentCache, thumbnail],
          });
        }),
        map(thumbnail => this.composeImgSrc(thumbnail.thumbnail))
      );
    }
  }  

  public getOptimalUrl(nft: Nft): Observable<string> {
    return this.getLocalCacheImg(nft.tokenId).pipe(
      catchError(() => {
          return of(nft.image.thumbnailUrl || nft.image.originalUrl!);
      })
    );
  }

  public getQualityUrl(image: NftImage): string {
    return image?.originalUrl || image?.cachedUrl || image?.thumbnailUrl!
  }

  public getNftByIdObservable(id: string): Observable<Nft | undefined> {
    return this.sessionQuery.selectArtPiecesObservable.pipe(
      map(nfts => nfts.find(({ tokenId }) => id === tokenId))
    );
  }

  public getNftById(id: string): Nft | null {
    const foundArt = this.sessionQuery.selectArtPieces.find(({ tokenId }) => id === tokenId);
    return foundArt || null;
  }

  public getArtByYear(year:string): Array<Nft> | undefined {
    return this.sessionQuery.selectArtPieces?.filter(artPiece =>
      artPiece.raw.metadata[VALIDTRAITS.YEAR] === year
    )
  }

  public getSameArtThanObservable(tokenId: string): Observable<Array<Nft>> {
    return this.getNftByIdObservable(tokenId).pipe(
      filter(nft => !!nft?.name),
      map(nft => this.getArtByTitle(nft!.name!))
    );
  }

  public getTraitValue(nft: Nft, validTrait: VALIDTRAITS): string {
    try {
      return nft.raw.metadata['attributes']?.find((trait: any) => trait['trait_type'] === validTrait)!['value']
    } catch {
      switch (validTrait){
        case VALIDTRAITS.VERSION:
          return "";
        case VALIDTRAITS.MEDIUM:
          return "Error getting medium";
        case VALIDTRAITS.HEIGHT:
          return "XX";
        case VALIDTRAITS.WIDTH:
          return "XX";
        case VALIDTRAITS.UNIT:
          return "cm";
        case VALIDTRAITS.YEAR:
          return "XXXX";
        case VALIDTRAITS.IMAGETYPE:
          return "Frontal view";
        default:
          return "Error getting data";
      }
    }
  }

  public getSize(nft: Nft): number {
    const height = parseInt(this.getTraitValue(nft, VALIDTRAITS.HEIGHT));
    const width = parseInt(this.getTraitValue(nft, VALIDTRAITS.WIDTH));
    return height + width;
  }

  public sortByYear(nfts: Array<Nft>, order: 'asc' | 'desc' = 'asc'): Array<Nft> {
    return nfts.sort((a, b) => {
      const yearA = Number(this.getTraitValue(b, VALIDTRAITS.YEAR));
      const yearB = Number(this.getTraitValue(a, VALIDTRAITS.YEAR));
      return order === 'asc' ? (yearA - yearB) : (yearB - yearA);
    });
  }

  public sortBySize(nfts: Array<Nft>, order: 'asc' | 'desc' = 'asc'): Array<Nft> {
    return [...nfts].sort((a, b) => {
      const sizeA = this.getSize(a);
      const sizeB = this.getSize(b);
      const result = sizeA === sizeB ? 0 : sizeA < sizeB ? -1 : 1;
      return order === 'asc' ? result : -result;
    });
  }

  public sortByMedium(nfts: Array<Nft>, order: 'asc' | 'desc' = 'asc'): Array<Nft> {
    const MEDIUM_ORDER = ['oil', 'watercolor'];

    return [...nfts].sort((a, b) => {
      const mediumA = this.getTraitValue(a, VALIDTRAITS.MEDIUM).toLowerCase() || '';
      const mediumB = this.getTraitValue(b, VALIDTRAITS.MEDIUM).toLowerCase() || '';
      const indexA = MEDIUM_ORDER.findIndex(medium => mediumA.includes(medium));
      const indexB = MEDIUM_ORDER.findIndex(medium => mediumB.includes(medium));

      const result = (indexA !== -1 && indexB !== -1) ? (indexA - indexB) : (indexA !== -1) ? -1 : (indexB !== -1) ? 1 : 0;
      return order === 'asc' ? result : -result;
    });
  }

  public sortByName(nfts: Array<Nft>, order: 'asc' | 'desc' = 'asc'): Array<Nft> {
    return [...nfts].sort((a, b) => {
      const nameA = a.name?.toLowerCase() || '';
      const nameB = b.name?.toLowerCase() || '';
  
      const result = (nameA === nameB) ? 0 : (nameA < nameB) ? -1 : 1;
      return order === 'asc' ? result : -result;
    });
  }

  public isFrontalView(nft: Nft): boolean {
    const frontalViewNfts: Nft[] = this.getArtByTitle(nft!.name!).filter(sameArtworkNft => 
      this.getTraitValue(sameArtworkNft, VALIDTRAITS.IMAGETYPE) === VIEW_TYPES.FRONTAL
    );
    if (frontalViewNfts.length > 1) {
      const latestVersionNft = this.getLatestVersionNft(frontalViewNfts);
      return latestVersionNft?.tokenId === nft?.tokenId;
    } else {
      return frontalViewNfts[0]?.tokenId === nft?.tokenId;
    }
  }

  public getLatestVersionNft(nfts: Array<Nft>): Nft {
    return nfts.reduce((latest, current) => {
      const currentVersion = parseInt(this.getTraitValue(current, VALIDTRAITS.VERSION) || '0', 10);
      const latestVersion = parseInt(this.getTraitValue(latest, VALIDTRAITS.VERSION) || '0', 10);
      return currentVersion > latestVersion ? current : latest;
    }, nfts[0]);
  }

  public getLatestVersionIndex(nfts: Array<Nft>): number {
    const latestNft = this.getLatestVersionNft(nfts);
    return nfts.findIndex(nft => nft.tokenId === latestNft.tokenId);
  }

  private getArtByTitle(nameToSearch: string): Array<Nft> {
    return this.sessionQuery.selectArtPieces?.filter(({name}) => name === nameToSearch);
  }

  private itIsNeccesaryToFetch(): boolean {
    const daysBeforeExpireData = 7;
    return (
      !this.sessionQuery.selectArtPieces.length || 
      !this.sessionQuery.selectLastArtPiecesUpdate || 
      DateUtils.olderThanNDays(this.sessionQuery.selectLastArtPiecesUpdate, daysBeforeExpireData)
    )
  }

  private composeImgSrc(base64: string): string {
    return `data:image/jpeg;base64,${base64}`
  }

  public saveNftsLocally(nfts: Array<Nft>): void {
    this.sessionStore.update({ artPieces: nfts, lastArtPiecesUpdate: new Date() });
  }
}
