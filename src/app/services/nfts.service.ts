import { Inject, Injectable } from '@angular/core';
import { PersistState } from '@datorama/akita';
import { SessionQuery } from '@store/session.query';
import { SessionStore } from '@store/session.store';
import { Observable, from, map } from 'rxjs';
import DateUtils from '@utils/date.utils';
import { HIDDENCERTIFICATES, CERTIFICATESCOLLECTIONADRESS, VALIDTRAITS } from '@constants/nft.constants';
import { OpenseaService } from './opensea.service';
import { ListNFTsResponse } from 'opensea-js';
import { NFTMetadata } from '@models/nfts.models';

@Injectable({
  providedIn: 'root'
})
export class NftsService {

  private tempNFTList: Array<NFTMetadata> = [];

  constructor(
    @Inject('persistStorage') persistStorage: PersistState,
    private openSeaService: OpenseaService,
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
  ) {
  }

  public getArt(): Observable<Array<NFTMetadata>> {
    return this.isNeccesaryFetchArt() ?  from(this.fetchNFT()).pipe(map(res => res.nfts as Array<NFTMetadata>)) : this.sessionQuery.selectArtPiecesObservable
  }

  private fetchNFT(next?: string): Promise<ListNFTsResponse> {
    return this.openSeaService.openSea.api.getNFTsByContract(
      CERTIFICATESCOLLECTIONADRESS,
      50,
      next
    ).then((response: ListNFTsResponse) => {
      const nfts = response.nfts as Array<NFTMetadata>;
      this.tempNFTList.push(...nfts.filter(nft => !HIDDENCERTIFICATES.includes(nft.identifier)))
      if (response.next) {
        this.fetchNFT(response.next);
      } else {
        this.updateArt(this.tempNFTList);
      }
      return response;
    })
  }

  public getArtById(id: string): NFTMetadata | null {
    const foundArt = this.sessionQuery.selectArtPieces.find(({ identifier }) => id === identifier);
    return foundArt || null;
  }

  // private fetchNFTById(identifier: string): Promise<NFTMetadata> {
  //   return this.openSeaService.openSea.api.getNFT(
  //     CERTIFICATESCOLLECTIONADRESS,
  //     identifier
  //   ).then(
  //     ({ nft }) => {
  //       console.log("nft fetched individually ", nft)
  //       this.updateArtMetadata(nft as NFTMetadata);
  //       return nft;
  //     },
  //     err => err)
  // }

  public getArtByYear(year:string): NFTMetadata[] | undefined {
    return this.sessionQuery.selectArtPieces?.filter(artPiece =>
      year === artPiece.traits.find((trait)  => trait.trait_type === VALIDTRAITS.YEAR)?.value
    )
  }

  private updateArt(nfts: NFTMetadata[]): Observable<NFTMetadata[] | undefined> {
    this.sessionStore.update({ artPieces: nfts, lastArtPiecesUpdate: new Date() });
    return this.sessionQuery.selectArtPiecesObservable;
  }


  private isNeccesaryFetchArt(): boolean {
    return (
      !this.sessionQuery.selectArtPieces.length || 
      !this.sessionQuery.selectLastArtPiecesUpdate || 
      DateUtils.dataIsOld(this.sessionQuery.selectLastArtPiecesUpdate)
    )
  }

}
