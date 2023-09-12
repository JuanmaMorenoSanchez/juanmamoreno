import { Inject, Injectable } from '@angular/core';
import { PersistState } from '@datorama/akita';
import { SessionQuery } from '@store/session.query';
import { SessionStore } from '@store/session.store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(
    @Inject('persistStorage') persistStorage: PersistState,
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
  ) {;
  }

  public fetchUserBalance(userHash: string): void {

    // this.alchemyService.alchemy.config.network eth_getBalance(JUANMAADRESS)
// 

    // this.alchemyService.alchemy.core.getTokenBalances(JUANMAADRESS).then(balances => 
    //   this.updateUserBalances(balances)
    // )
  }

  private updateUserBalances(balances: any): Observable<any | undefined> {
    console.log("Storing balances locally ", balances);
    this.sessionStore.update({ balances });
    return this.sessionQuery.selectBalancesObservable;
  }
}
