import { Inject, Injectable } from '@angular/core';
import { JUANMAADRESS } from '@constants/alchemy.constants';
import { PersistState } from '@datorama/akita';
import { SessionQuery } from '@store/session.query';
import { SessionStore } from '@store/session.store';
import { GetMintedNftsOptions, TransferredNft } from 'alchemy-sdk';
import { Observable } from 'rxjs';
import { AlchemyService } from './alchemy.service';

@Injectable({
  providedIn: 'root'
})
export class NftsService {


  private nftListCache: TransferredNft[] = [];

  constructor(
    @Inject('persistStorage') persistStorage: PersistState,
    private alchemyService: AlchemyService,
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
  ) {
  }

  public getArtById(tokenId:string): TransferredNft | undefined {
    return this.sessionQuery.selectArtPieces!.find(artPiece => artPiece.tokenId === tokenId)
  }

  public fetchArt(pageKey?: string): void {
    let options: GetMintedNftsOptions = {};
    if (pageKey) {
      options = { ...options, ...{ pageKey }}
    }
    this.alchemyService.alchemy.nft.getMintedNfts(
      JUANMAADRESS, 
      options
    ).then(nftResponse => {
        if (nftResponse.pageKey) {
          this.fetchArt(nftResponse.pageKey)
        }

        this.nftListCache = this.nftListCache.concat(nftResponse.nfts)

        if (nftResponse.nfts.length !== this.alchemyService.alchemyPaginationSize) {
          this.updateArt(this.nftListCache);
        }
    });
  }

  private updateArt(nfts: TransferredNft[]): Observable<TransferredNft[] | undefined> {
    console.log("Storing nfts locally ", nfts);
    this.sessionStore.update({ artPieces: nfts });
    return this.sessionQuery.selectArtPiecesObservable;
  }
}
