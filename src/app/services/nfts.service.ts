import { Inject, Injectable } from '@angular/core';
import { PersistState } from '@datorama/akita';
import { SessionQuery } from '@store/session.query';
import { SessionStore } from '@store/session.store';
import { Observable } from 'rxjs';
import DateUtils from '@utils/date.utils';
import { CERTIFICATESCOLLECTIONADRESS, VALIDTRAITS } from '@constants/nft.constants';
import { OpenseaService } from './opensea.service';
import { ListNFTsResponse, NFT } from 'opensea-js';
import { NFTMetadata } from '@models/nfts.models';

@Injectable({
  providedIn: 'root'
})
export class NftsService {

  private tempNFTList: Array<NFT> = [];

  constructor(
    @Inject('persistStorage') persistStorage: PersistState,
    private openSeaService: OpenseaService,
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
  ) {
  }

  public getArt(): void {
    if (this.isNeccesaryFetchArt()) {
      this.fetchNFT();
    }
  }

  private fetchNFT(next?: string): Promise<ListNFTsResponse> {
    return this.openSeaService.openSea.api.getNFTsByContract(
      CERTIFICATESCOLLECTIONADRESS,
      50,
      next
    ).then((response: ListNFTsResponse) => {
      this.tempNFTList.push(...response.nfts)
      if (response.next) {
        this.fetchNFT(response.next);
      } else {
        this.updateArt(this.tempNFTList);
      }
      return response;
    })
  }

  public getArtById(id:string): Promise<NFTMetadata> {
    const foundArt = this.sessionQuery.selectArtPiecesMetadata.find(({ identifier }) => id === identifier);
    return foundArt ? Promise.resolve(foundArt) : this.fetchNFTById(id);
  }

  private fetchNFTById(identifier: string): Promise<NFTMetadata> {
    return this.openSeaService.openSea.api.getNFT(
      CERTIFICATESCOLLECTIONADRESS,
      identifier
    ).then(
      ({ nft }) => {
        this.updateArtMetadata(nft as NFTMetadata);
        return nft;
      },
      err => err)
  }

  public getArtByYear(year:string): NFTMetadata[] | undefined {
    return this.sessionQuery.selectArtPiecesMetadata?.filter(artPiece =>
      year === artPiece.traits.find((trait)  => trait.trait_type === VALIDTRAITS.YEAR)?.value
    )
  }

  private updateArt(nfts: NFT[]): Observable<NFT[] | undefined> {
    this.sessionStore.update({ artPieces: nfts, lastArtPiecesUpdate: new Date() });
    return this.sessionQuery.selectArtPiecesObservable;
  }

  private updateArtMetadata(nft: NFTMetadata): Observable<NFTMetadata[] | undefined> {
    if (!this.sessionQuery.selectArtPiecesMetadata.some(savedArt => savedArt.identifier === nft.identifier)){
      this.sessionStore.update({ artPiecesMetadata: this.sessionQuery.selectArtPiecesMetadata.concat(nft)} )
    }
    return this.sessionQuery.selectArtPiecesMetadataObservable;
  }

  private isNeccesaryFetchArt(): boolean {
    return (
      !this.sessionQuery.selectArtPieces.length || 
      !this.sessionQuery.selectLastArtPiecesUpdate || 
      DateUtils.dataIsOld(this.sessionQuery.selectLastArtPiecesUpdate)
    )
  }

}
