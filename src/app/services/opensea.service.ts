import { Injectable } from '@angular/core';
import { HIDDENCERTIFICATES } from '@constants/nft.constants';
import { OPENSEAAPIKEY, OPENSEAPROVIDER } from '@constants/opensea.constants';
import { ethers } from "ethers";
import { OpenSeaSDK, Chain, ListNFTsResponse, NFT } from "opensea-js";
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenseaService {

  public openSea: OpenSeaSDK;

  readonly openseaPaginationSize = 50;

  private tempNFTList: Array<NFT> = [];

  constructor() {
    const provider = new ethers.JsonRpcProvider(OPENSEAPROVIDER);

    this.openSea = new OpenSeaSDK(provider, {
      chain: Chain.Polygon,
      apiKey: OPENSEAAPIKEY,
    });
  }

  public fetchNFTsByContract(contractAddress: string, next?: string): Observable<NFT[]> {
    return from(this.openSea.api.getNFTsByContract(
      contractAddress,
      this.openseaPaginationSize,
      next
    ).then((res: ListNFTsResponse) => {
      this.tempNFTList.push(...res.nfts.filter(nft => !HIDDENCERTIFICATES.includes(nft.identifier)));
      if (res.next) {
        this.fetchNFTsByContract(contractAddress, res.next);
      } 
      return this.tempNFTList
    }).catch(err => err))
  }

}