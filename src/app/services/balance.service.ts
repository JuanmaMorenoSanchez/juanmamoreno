import { Inject, Injectable } from '@angular/core';
import { JUANMAADRESS } from '@constants/alchemy.constants';
import { PersistState } from '@datorama/akita';
import { SessionQuery } from '@store/session.query';
import { SessionStore } from '@store/session.store';
import { AlchemyService } from './alchemy.service';
import { TokenBalancesResponseErc20 } from 'alchemy-sdk';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(
    @Inject('persistStorage') persistStorage: PersistState,
    private alchemyService: AlchemyService,
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
  ) {;
  }

  public fetchUserBalance(): void {
    this.alchemyService.alchemy.core.getTokenBalances(JUANMAADRESS).then(balances => 
      this.updateUserBalances(balances)
    )
  }

  private updateUserBalances(balances: TokenBalancesResponseErc20): Observable<TokenBalancesResponseErc20 | undefined> {
    console.log("Storing balances locally ", balances);
    this.sessionStore.update({ balances });
    return this.sessionQuery.selectBalancesObservable;
  }
}
