import { Observable } from 'rxjs';
import { Artwork } from './artwork';
import { Nft } from './artwork.entity';
import { Descriptions } from './descriptions.entity';

export interface ArtworkPort extends Artwork {
  getArtPiecesObservable(): Observable<Nft[]>;
  getNftByIdObservable(id: string): Observable<Nft | null>;
  getSameArtThanObservable(tokenId: string): Observable<Array<Nft>>;
  getAvailableOptimalUrl(nft: Nft): Observable<string>;
  getFullNftLenghtByYear(year: string): number;
  getLinks(tokenId: string): Observable<string[]>;
  saveNftsLocally(nfts: Array<Nft>): void;
  getArtPieceDescriptions(tokenId: string): Observable<Descriptions | null>;
}
