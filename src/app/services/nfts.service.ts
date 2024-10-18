import { Inject, Injectable } from '@angular/core';
import { PersistState } from '@datorama/akita';
import { SessionQuery } from '@store/session.query';
import { Observable, filter, map } from 'rxjs';
import DateUtils from '@utils/date.utils';
import { VALIDTRAITS } from '@constants/nft.constants';
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
    return image.thumbnailUrl || image.cachedUrl  || image.originalUrl!
  }

  public getQualityUrl(image: NftImage): string {
    return image.originalUrl || image.cachedUrl || image.thumbnailUrl!
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
