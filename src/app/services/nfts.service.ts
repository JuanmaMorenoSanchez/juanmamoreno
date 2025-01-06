import { Inject, Injectable } from '@angular/core';
import { PersistState } from '@datorama/akita';
import { SessionQuery } from '@store/session.query';
import { Observable, filter, map } from 'rxjs';
import DateUtils from '@utils/date.utils';
import { VALIDTRAITS, VIEW_TYPES } from '@constants/nft.constants';
import { AlchemyService } from './alchemy.service';
import { Nft, NftImage } from 'alchemy-sdk';
import { environment } from "@environments/environment";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NftsService {

  constructor(
    @Inject('persistStorage') persistStorage: PersistState,
    private alchemyService: AlchemyService,
    private sessionQuery: SessionQuery,
    private httpClient: HttpClient,    
  ) {
  }

  public getNfts(contract: string): Observable<Array<Nft>> {
    if (this.itIsNeccesaryToFetch()) {
      return this.alchemyService.fetchNFTsByContract(contract);
    } else {
      return this.sessionQuery.selectArtPiecesObservable;
    }
  }

  public getOptimalUrl(nft: Nft): string {
    return nft.image?.thumbnailUrl || nft.image?.cachedUrl  || nft.image?.originalUrl! // CREATE A FALLBACK IMG ASSET URL
  }

  public getQualityUrl(image: NftImage): string {
    return image?.originalUrl || image?.cachedUrl || image?.thumbnailUrl! // CREATE A FALLBACK IMG ASSET URL
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

  public getSameArtThan(tokenId: string): Observable<Array<Nft>> {
    return this.getNftByIdObservable(tokenId).pipe(
      filter(nft => !!nft?.name),
      map(nft => this.getArtByTitle(nft!.name!))
    );
  }

  public getTraitValue(nft: Nft, validTrait: VALIDTRAITS): string {
    try {
      return nft.raw.metadata['attributes'].find((trait: any) => trait['trait_type'] === validTrait)!['value']
    } catch {
      switch (validTrait){
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
    const imagetype = nft.raw.metadata['attributes'].find((attr: any)  => attr['trait_type'] === VALIDTRAITS.IMAGETYPE);
    const imagetypeIsSet = !!imagetype;
    return (imagetype!['value'] === VIEW_TYPES.FRONTAL || !imagetypeIsSet);  
  }

  private getArtByTitle(nameToSearch: string): Array<Nft> {
    return this.sessionQuery.selectArtPieces?.filter(({name}) => name === nameToSearch);
  }

  private itIsNeccesaryToFetch(): boolean {
    return (
      !this.sessionQuery.selectArtPieces.length || 
      !this.sessionQuery.selectLastArtPiecesUpdate || 
      DateUtils.dataIsOld(this.sessionQuery.selectLastArtPiecesUpdate)
    )
  }

}
