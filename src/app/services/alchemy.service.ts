import { Inject, Injectable } from '@angular/core';
import { ALCHEMYSETTINGS, JUANMAADRESS } from '@constants/alchemy.constants';
import { PersistState } from '@datorama/akita';
import { SessionQuery } from '@store/session.query';
import { SessionStore } from '@store/session.store';
import { Alchemy, GetMintedNftsOptions, TokenBalancesResponseErc20, TransferredNft, TransfersNftResponse } from 'alchemy-sdk';
import { Observable, from, map, merge, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlchemyService {

  private alchemy: Alchemy;
  
  private nftPaginationSize = 100;

  constructor(
    @Inject('persistStorage') persistStorage: PersistState,
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
  ) {
    this.alchemy = new Alchemy(ALCHEMYSETTINGS);
  }

  
  public fetchUserBalance(): void {
    this.alchemy.core.getTokenBalances(JUANMAADRESS).then(balances => 
      this.updateUserBalances(balances)
    )
  }

  private updateUserBalances(balances: TokenBalancesResponseErc20): Observable<TokenBalancesResponseErc20 | undefined> {
    console.log("Storing balances locally ", balances);
    this.sessionStore.update({ balances });
    return this.sessionQuery.selectBalancesObservable;
  }

  public fetchJuanmaNFTs(page?: number): void {
    const options: GetMintedNftsOptions = {
      //contractAddresses: ?
      //tokenType: ?
      pageKey: String(page)
    }
    this.alchemy.nft.getMintedNfts(JUANMAADRESS, options).then(nftResponse => {
      if (!nftResponse.pageKey) {
        this.updateJuanmaNFTs(nftResponse.nfts);
      } else {
        const nftsListLength = nftResponse.nfts.length;
        if (nftResponse.pageKey === "1") {
          this.nftPaginationSize = nftsListLength;
        }

        if (nftsListLength === this.nftPaginationSize) {
          const nextPageIndex = Number(nftResponse.pageKey)+1;
          this.fetchJuanmaNFTs(nextPageIndex)
        } 

        const oldListOfNfts: TransferredNft[] = this.sessionQuery.selectArtPieces || []
        const concatenatedListOfNfts: TransferredNft[] = oldListOfNfts.concat(nftResponse.nfts);
        this.updateJuanmaNFTs(concatenatedListOfNfts);
      }
    });
  }

  private updateJuanmaNFTs(nfts: TransferredNft[]): Observable<TransferredNft[] | undefined> {
    console.log("Storing nfts locally ", nfts);
    this.sessionStore.update({ artPieces: nfts });
    return this.sessionQuery.selectArtPiecesObservable;
  }
}
