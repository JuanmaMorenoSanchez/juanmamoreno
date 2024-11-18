import { Inject, Injectable } from '@angular/core';
import { PersistState } from '@datorama/akita';
import { SessionQuery } from '@store/session.query';
import { Observable, filter, map } from 'rxjs';
import DateUtils from '@utils/date.utils';
import { VALIDTRAITS, VIEW_TYPES } from '@constants/nft.constants';
import { AlchemyService } from './alchemy.service';
import { Nft, NftImage } from 'alchemy-sdk';

@Injectable({
  providedIn: 'root'
})
export class NftsService {

  constructor(
    @Inject('persistStorage') persistStorage: PersistState,
    private alchemyService: AlchemyService,
    private sessionQuery: SessionQuery,
  ) {
  }

  public getNfts(contract: string): Observable<Array<Nft>> {
    if (this.itIsNeccesaryToFetch()) {
      return this.alchemyService.fetchNFTsByContract(contract)
    } else {
      return this.sessionQuery.selectArtPiecesObservable
    }
  }

  public getOptimalUrl(image: NftImage): string {
    return image?.thumbnailUrl || image?.cachedUrl  || image?.originalUrl! // CREATE A FALLBACK IMG ASSET URL
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

  public getArtByYear(year:string): Nft[] | undefined {
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

  public sortNFTsByYear(nfts: Array<Nft>): Array<Nft> {
    return nfts.sort((a, b) => Number(this.getTraitValue(b, VALIDTRAITS.YEAR)) - Number(this.getTraitValue(a, VALIDTRAITS.YEAR)));
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
