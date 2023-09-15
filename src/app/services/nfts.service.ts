import { Inject, Injectable } from '@angular/core';
import { JUANMAADRESS } from '@constants/alchemy.constants';
import { PersistState } from '@datorama/akita';
import { SessionQuery } from '@store/session.query';
import { SessionStore } from '@store/session.store';
import { GetNftsForOwnerOptions, NftFilters, OwnedNft, TransferredNft } from 'alchemy-sdk';
import { Observable } from 'rxjs';
import { AlchemyService } from './alchemy.service';
import { VALIDTRAITS } from '@constants/nft.constants';
import DateUtils from '@utils/date.utils';
import NftUtils from '@utils/nft.utils';

@Injectable({
  providedIn: 'root'
})
export class NftsService {

  private nftListCache: OwnedNft[] = [];

  constructor(
    @Inject('persistStorage') persistStorage: PersistState,
    private alchemyService: AlchemyService,
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
  ) {
  }

  public getArtById(tokenId:string): OwnedNft | undefined {
    return this.sessionQuery.selectArtPieces!.find(artPiece => artPiece.tokenId === tokenId)
  }

  public years(): Set<string> {
    const yearsList = this.sessionQuery.getValue().artPieces.map(artPiece => {
      return NftUtils.getAttrValue('year', artPiece)
    }).filter(year => year) as Array<string>;
    return new Set(yearsList)
  }

  public getArtByYear(year:string): OwnedNft[] | undefined {
    return this.sessionQuery.selectArtPieces!.filter(artPiece => 
      year === NftUtils.getAttrValue('year', artPiece)
    )
  }

  public fetchArt(pageKey?: string): void {
    if (this.isNeccesaryFetch()) {
      let options: GetNftsForOwnerOptions = { excludeFilters: [NftFilters.SPAM, NftFilters.AIRDROPS]}
      if (pageKey) {
        options = { ...options, ...{ pageKey }}
      }
      this.alchemyService.alchemy.nft.getNftsForOwner(
        JUANMAADRESS, 
        options
      ).then(nftResponse => {
        console.log("nftResponse ", nftResponse);
        if (nftResponse.pageKey) {
          this.fetchArt(nftResponse.pageKey)
        }
        this.nftListCache = this.nftListCache.concat(nftResponse.ownedNfts.filter(nft => NftUtils.checkValidty(nft)))
        if (nftResponse.ownedNfts.length !== this.alchemyService.alchemyPaginationSize) {
          this.updateArt(this.nftListCache);
        }
      });
    } else {
      console.log("Wont fetch new date since it was fetched on", this.sessionQuery.selectLastArtPiecesUpdate)
    }
  }

  private updateArt(nfts: OwnedNft[]): Observable<OwnedNft[] | undefined> {
    console.log("Storing nfts locally ", nfts);
    this.sessionStore.update({ artPieces: nfts, lastArtPiecesUpdate: new Date() });
    return this.sessionQuery.selectArtPiecesObservable;
  }

  private isNeccesaryFetch(): boolean {
    return (
      !this.sessionQuery.selectArtPieces.length || 
      !this.sessionQuery.selectLastArtPiecesUpdate || 
      DateUtils.dataIsOld(this.sessionQuery.selectLastArtPiecesUpdate)
    )
  }

}
