import { Injectable } from '@angular/core';
import { OPENSEAAPIKEY, OPENSEAPROVIDER } from '@constants/opensea.constants';
import { ethers } from "ethers";
import { OpenSeaSDK, Chain } from "opensea-js";

@Injectable({
  providedIn: 'root'
})
export class OpenseaService {

  public openSea: OpenSeaSDK;

  constructor() {
    // This example provider won't let you make transactions, only read-only calls:
    const provider = new ethers.JsonRpcProvider(OPENSEAPROVIDER);

    this.openSea = new OpenSeaSDK(provider, {
      chain: Chain.Polygon,
      apiKey: OPENSEAAPIKEY,
    });
  }

}
