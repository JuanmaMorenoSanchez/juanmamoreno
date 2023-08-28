import { Injectable } from '@angular/core';
import { ALCHEMYSETTINGS } from '@constants/alchemy.constants';
import { Alchemy } from 'alchemy-sdk';

@Injectable({
  providedIn: 'root'
})
export class AlchemyService {

  private alchemy: Alchemy;

  constructor() {
    this.alchemy = new Alchemy(ALCHEMYSETTINGS);
  }
}
