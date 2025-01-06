import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ALCHEMYSETTINGS } from '@constants/alchemy.constants';
import { HIDDENCERTIFICATES } from '@constants/nft.constants';
import { SessionStore } from '@store/session.store';
import { Alchemy, GetNftsForContractOptions, Network, Nft, NftContractNftsResponse } from 'alchemy-sdk';
import { Observable, from } from 'rxjs';
import { environment } from '@environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AlchemyService {

  public alchemy: Alchemy;

  readonly alchemyPaginationSize = 200;

  public tempNFTList: Array<Nft> = [];

  constructor(
    private sessionStore: SessionStore,
    // private httpClient: HttpClient
  ) {
    this.alchemy = new Alchemy(ALCHEMYSETTINGS);
  }

  public getAlchemyNetwork(): Network {
    return this.alchemy.config.network
  }

  public fetchNFTsByContract(contractAddress: string, next?: string): Observable<Nft[]> {
    let options: GetNftsForContractOptions  = {
      pageSize: this.alchemyPaginationSize,
      pageKey: next
    }
    return from(this.alchemy.nft.getNftsForContract(
      contractAddress,
      options
    ).then((res: NftContractNftsResponse) => {
      this.tempNFTList.push(...res.nfts.filter(nft => !HIDDENCERTIFICATES.includes(nft.tokenId)));
      if (res.pageKey) {
        this.fetchNFTsByContract(contractAddress, res.pageKey);
      } else {
        this.saveNftsLocally(this.tempNFTList);
        // this.saveNftsBackupOnServer(this.tempNFTList);
      }
      return this.tempNFTList
      
    }).catch(err => err))
  }

  private saveNftsLocally(nfts: Array<Nft>): void {
    this.sessionStore.update({ artPieces: nfts, lastArtPiecesUpdate: new Date() });
  }

}