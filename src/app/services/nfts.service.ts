import { Inject, Injectable } from '@angular/core';
import { PersistState } from '@datorama/akita';
import { SessionQuery } from '@store/session.query';
import { SessionStore } from '@store/session.store';
// import { GetMintedNftsOptions, TransferredNft } from 'alchemy-sdk';
import { Observable, from } from 'rxjs';
import { environment } from '@environments/environment';
import { EvmChain, EvmNft, GetWalletNFTsRequest, GetWalletNFTsResponseAdapter } from '@moralisweb3/common-evm-utils';
import { MoralisConfigValues } from 'moralis';
import Moralis from "moralis"

@Injectable({
  providedIn: 'root'
})
export class NftsService {

  private address = environment.adminAdress;
  private chain = EvmChain.POLYGON;

  private nftListCache: EvmNft[] = [];

  constructor(
    @Inject('persistStorage') persistStorage: PersistState,
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
  ) {
  }

  public getArtById(tokenId:string): EvmNft | undefined {
    return this.sessionQuery.selectArtPieces!.find(artPiece => artPiece.tokenId === tokenId)
  }

  public fetchArt(cursor?: string): void {//Observable<GetWalletNFTsResponseAdapter> {
    let requestOptions: GetWalletNFTsRequest = {
      address: this.address,
      chain: this.chain,
      "normalizeMetadata": true,
      "mediaItems": true //increase the cost of that API request by an additional 2 CUs
    };
    if (cursor) {
      requestOptions = { ...requestOptions, ...{ cursor }};
    }

    Moralis.EvmApi.nft.getWalletNFTs(requestOptions).then((res: GetWalletNFTsResponseAdapter) => {
      const filteredNfts = res.result.filter(nft => !nft.possibleSpam)

      if (res.pagination.cursor) {
        this.fetchArt(res.pagination.cursor)
        this.nftListCache = this.nftListCache.concat(filteredNfts);
      } else {
        this.nftListCache = this.nftListCache.concat(filteredNfts);
        this.updateArt(this.nftListCache);
      }
    })

  }

  private updateArt(nfts: any): Observable<EvmNft[]> {
    console.log("Storing nfts locally ", nfts);
    this.sessionStore.update({ artPieces: nfts });
    return this.sessionQuery.selectArtPiecesObservable;
  }
}
