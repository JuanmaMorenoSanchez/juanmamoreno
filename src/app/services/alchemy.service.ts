import { Inject, Injectable } from '@angular/core';
import { ALCHEMYSETTINGS, JUANMAADRESS } from '@constants/alchemy.constants';
import { PersistState } from '@datorama/akita';
import { SessionQuery } from '@store/session.query';
import { SessionStore } from '@store/session.store';
import { Alchemy, GetMintedNftsOptions, TokenBalancesResponseErc20, TransferredNft } from 'alchemy-sdk';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlchemyService {

  readonly alchemyPaginationSize = 100;

  private alchemy: Alchemy;
  private nftListCache: TransferredNft[] = [];

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

  public fetchJuanmaNFTs(pageKey?: string): void {
    let options: GetMintedNftsOptions = {};
    if (pageKey) {
      options = { ...options, ...{ pageKey }}
    }
    this.alchemy.nft.getMintedNfts(
      JUANMAADRESS, 
      options
    ).then(nftResponse => {
        if (nftResponse.pageKey) {
          this.fetchJuanmaNFTs(nftResponse.pageKey)
        }

        this.nftListCache = this.nftListCache.concat(nftResponse.nfts)

        if (nftResponse.nfts.length !== this.alchemyPaginationSize) {
          this.updateJuanmaNFTs(this.nftListCache);
        }
    });
  }

  private updateJuanmaNFTs(nfts: TransferredNft[]): Observable<TransferredNft[] | undefined> {
    console.log("Storing nfts locally ", nfts);
    this.sessionStore.update({ artPieces: nfts });
    return this.sessionQuery.selectArtPiecesObservable;
  }
}
