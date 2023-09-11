import { Inject, Injectable } from '@angular/core';
import { ALCHEMYSETTINGS } from '@constants/alchemy.constants';
import { Alchemy, Network } from 'alchemy-sdk';

@Injectable({
  providedIn: 'root'
})
export class AlchemyService {

  public alchemy: Alchemy;
  readonly alchemyPaginationSize = 100;

  constructor(
  ) {
    this.alchemy = new Alchemy(ALCHEMYSETTINGS);
  }

  public getAlchemyNetwork(): Network {
    return this.alchemy.config.network
  }
  
}
