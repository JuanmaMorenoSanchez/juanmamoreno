import { Inject, Injectable } from '@angular/core';
import { PersistState } from '@datorama/akita';
import { SessionQuery } from '@store/session.query';
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
    private sessionQuery: SessionQuery,
  ) {
  }

  public getNfts(contract: string): Observable<Array<Nft>> {
    if (this.itIsNeccesaryToFetch()) {
      return this.alchemyService.fetchNFTsByContract(contract)
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

  public getNftByIdObservable(id: string): Observable<Nft | undefined> {
    return this.sessionQuery.selectArtPiecesObservable.pipe(
      map(nfts => nfts.find(({ tokenId }) => id === tokenId))
    );
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

  private itIsNeccesaryToFetch(): boolean {
    return (
      !this.sessionQuery.selectArtPieces.length || 
      !this.sessionQuery.selectLastArtPiecesUpdate || 
      DateUtils.dataIsOld(this.sessionQuery.selectLastArtPiecesUpdate)
    )
  }

}
