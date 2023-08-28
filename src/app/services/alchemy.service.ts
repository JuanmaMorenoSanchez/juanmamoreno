import { Injectable } from '@angular/core';
import { ALCHEMYSETTINGS, JUANMAADRESS } from '@constants/alchemy.constants';
import { Alchemy, OwnedNftsResponse, TokenBalancesResponseErc20 } from 'alchemy-sdk';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlchemyService {

  private alchemy: Alchemy;

  constructor() {
    this.alchemy = new Alchemy(ALCHEMYSETTINGS);


    
    this.getUserBalance().subscribe(data => {
      console.log("getUserBalance ", data)
    })
    this.getJuanmaNFTs().subscribe(data => {
      console.log("getJuanmaNFTs ", data)
    })



  }

  public getUserBalance(): Observable<TokenBalancesResponseErc20> {
    return from(this.alchemy.core.getTokenBalances(JUANMAADRESS));
  }

  public getJuanmaNFTs(): Observable<OwnedNftsResponse> {
    return from(this.alchemy.nft.getNftsForOwner(JUANMAADRESS));
  }
}
