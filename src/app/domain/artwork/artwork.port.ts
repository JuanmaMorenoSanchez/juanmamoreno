import { Observable } from 'rxjs';
import { Artwork } from './artwork';
import { Nft } from './artwork.entity';
import { ArtCritic } from './critic.entity';
import { Descriptions } from './descriptions.entity';

export interface ArtworkPort extends Artwork {
  getArtPiecesObservable(): Observable<Nft[]>;
  getNftByIdObservable(id: string): Observable<Nft | null>;
  getSameArtThanObservable(tokenId: string): Observable<Array<Nft>>;
  getAvailableOptimalUrl(nft: Nft): Observable<string>;
  getProgressiveImageUrls(nft: Nft, thumbnailOnly?: boolean): Observable<string>;
  getFullNftLenghtByYear(year: string): number;
  getAvailableYears(): Set<number>;
  getLinks(tokenId: string): Observable<string[]>;
  saveNftsLocally(nfts: Array<Nft>): void;
  getArtPieceDescriptions(tokenId: string): Observable<Descriptions | null>;
  getArtPieceCritic(tokenId: string): Observable<ArtCritic | null>;
}
