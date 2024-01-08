import { Inject, Injectable } from '@angular/core';
import { PersistState } from '@datorama/akita';
import { SessionQuery } from '@store/session.query';
import { SessionStore } from '@store/session.store';
import { Observable, map } from 'rxjs';
import DateUtils from '@utils/date.utils';
import { VALIDTRAITS } from '@constants/nft.constants';
import { AlchemyService } from './alchemy.service';
import { Media, Nft } from 'alchemy-sdk';

@Injectable({
  providedIn: 'root'
})
export class NftsService {

  constructor(
    @Inject('persistStorage') persistStorage: PersistState,
    private alchemyService: AlchemyService,
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
  ) {
  }

  public getNfts(contract: string): Observable<Array<Nft>> {
    if (this.itIsNeccesaryToFetch()) {
      return this.alchemyService.fetchNFTsByContract(contract).pipe(map((nfts) => {
        this.updateArt(this.alchemyService.tempNFTList);
        return nfts
      }))
    } else {
      return this.sessionQuery.selectArtPiecesObservable
    }
  }

  public getOptimalUrl(media: Media): string {
    return media.thumbnail || media.gateway || this.formIpfsUrl(media.raw)
  }

  public getQualityUrl(media: Media): string {
    return media.gateway || this.formIpfsUrl(media.raw)
  }

  private formIpfsUrl(ipfs: string): string {
    return ipfs.replace("ipfs://", "https://ipfs.io/ipfs/")
  }

  public getNftById(id: string): Nft | null {
    const foundArt = this.sessionQuery.selectArtPieces.find(({ tokenId }) => id === tokenId);
    return foundArt || null;
  }

  public getArtByYear(year:string): Nft[] | undefined {
    return this.sessionQuery.selectArtPieces?.filter(artPiece =>
      year === artPiece.rawMetadata!.attributes!.find((attr)  => attr['trait_type'] === VALIDTRAITS.YEAR)!['value']
    )
  }

  private updateArt(nfts: Nft[]): Observable<Nft[] | undefined> {
    this.sessionStore.update({ artPieces: nfts, lastArtPiecesUpdate: new Date() });
    return this.sessionQuery.selectArtPiecesObservable;
  }


  private itIsNeccesaryToFetch(): boolean {
    return (
      !this.sessionQuery.selectArtPieces.length || 
      !this.sessionQuery.selectLastArtPiecesUpdate || 
      DateUtils.dataIsOld(this.sessionQuery.selectLastArtPiecesUpdate)
    )
  }

}
