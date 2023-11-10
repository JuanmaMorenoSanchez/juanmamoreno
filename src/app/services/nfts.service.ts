import { Inject, Injectable } from '@angular/core';
import { PersistState } from '@datorama/akita';
import { SessionQuery } from '@store/session.query';
import { SessionStore } from '@store/session.store';
import { Nft, NftMetadataBatchToken, NftTokenType } from 'alchemy-sdk';
import { Observable } from 'rxjs';
import { AlchemyService } from './alchemy.service';
import DateUtils from '@utils/date.utils';
import NftUtils from '@utils/nft.utils';
import { LISTOFTOKENIDS, OPENSEACONTRACTID } from '@constants/nft.constants';

@Injectable({
  providedIn: 'root'
})
export class NftsService {

  constructor(
    @Inject('persistStorage') persistStorage: PersistState,
    private alchemyService: AlchemyService,
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
  ) {
  }

  public getArtById(tokenId:string): Nft | undefined {
    return this.sessionQuery.selectArtPieces!.find(artPiece => artPiece.tokenId === tokenId)
  }

  public years(): Set<string> {
    const yearsList = this.sessionQuery.getValue().artPieces.map(artPiece => {
      return NftUtils.getAttrValue('year', artPiece)
    }).filter(year => year) as Array<string>;
    return new Set(yearsList)
  }

  public getArtByYear(year:string): Nft[] | undefined {
    return this.sessionQuery.selectArtPieces!.filter(artPiece => 
      year === NftUtils.getAttrValue('year', artPiece)
    )
  }

  public fetchArt(pageKey?: string): void {
    if (this.isNeccesaryFetch()) {
      this.alchemyService.alchemy.nft.getNftMetadataBatch(
        this.formMetadataBatchTokenList(LISTOFTOKENIDS),
        {
          tokenUriTimeoutInMs: 10000,
          refreshCache: true
        }
      ).then((nfts: Nft[]) => {
        this.updateArt(nfts);
      })
    } else {
      console.log("Wont fetch new date since it was fetched on", this.sessionQuery.selectLastArtPiecesUpdate)
    }
  }

  private updateArt(nfts: Nft[]): Observable<Nft[] | undefined> {
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

  private formMetadataBatchTokenList(tokenIds: Array<String>): Array<NftMetadataBatchToken>{
    return tokenIds.map((tokenId: String) => {
      return {
        contractAddress: OPENSEACONTRACTID,
        tokenId,
        tokenType: NftTokenType.ERC1155
      } as NftMetadataBatchToken
    })
  }

}
