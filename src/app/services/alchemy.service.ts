import { Inject, Injectable } from '@angular/core';
import { ALCHEMYSETTINGS, JUANMAADRESS } from '@constants/alchemy.constants';
import { PersistState } from '@datorama/akita';
import { SessionQuery } from '@store/session.query';
import { SessionStore } from '@store/session.store';
import { Alchemy, TokenBalancesResponseErc20, TransferredNft, TransfersNftResponse } from 'alchemy-sdk';
import { Observable, from, map, merge, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlchemyService {

  private alchemy: Alchemy;

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

  public fetchJuanmaNFTs(): void {
    this.alchemy.nft.getMintedNfts(JUANMAADRESS).then(nftResponse => {
      this.updateJuanmaNFTs(nftResponse);
    });
  }

  private updateJuanmaNFTs(transfersNftResponse: TransfersNftResponse): Observable<TransferredNft[] | undefined> {
    // TODO: handle pagination
    console.log("Storing nfts locally ", transfersNftResponse);
    this.sessionStore.update({ artPieces: transfersNftResponse.nfts });
    return this.sessionQuery.selectArtPiecesObservable;
  }
}
