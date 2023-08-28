import { Injectable } from '@angular/core';
import { ALCHEMYSETTINGS, JUANMAADRESS, JUANMAWALLETID } from '@constants/alchemy.constants';
import { Alchemy, TokenBalancesResponseErc20 } from 'alchemy-sdk';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlchemyService {

  private alchemy: Alchemy;

  constructor() {
    this.alchemy = new Alchemy(ALCHEMYSETTINGS);
  }

  public getUserBalance(): Observable<TokenBalancesResponseErc20> {
    // Access Alchemy Enhanced API requests
    return from(this.alchemy.core.getTokenBalances(JUANMAADRESS).then((res) => {
      console.log("res ", res)
      return res
    }));
  }

  public getJuanmaNFTs() {
    this.alchemy.nft.getNftsForOwner(JUANMAWALLETID).then(console.log);
  }
}
