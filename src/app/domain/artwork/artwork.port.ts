import { Observable } from 'rxjs';
import { Artwork } from './artwork';
import { Nft } from './artwork.entity';
import { ArtCritic } from './critic.entity';
import { Descriptions } from './descriptions.entity';

export interface ArtworkPort extends Artwork {
  getArtPiecesObservable(): Observable<Nft[]>;
  getNftByIdObservable(id: string): Observable<Nft | null>;
  getArtworkViewsObservable(tokenId: string): Observable<Array<Nft>>;
  getAvailableOptimalUrl(nft: Nft): Observable<string>;
  getProgressiveImageUrls(nft: Nft, thumbnailOnly?: boolean): Observable<string>;
  countCatalogueArtworksInYear(year: string): number;
  getAvailableYears(): Set<number>;
  getLinks(tokenId: string): Observable<string[]>;
  saveNftsLocally(nfts: Array<Nft>): void;
  getArtPieceDescriptions(tokenId: string): Observable<Descriptions | null>;
  getArtPieceCritic(tokenId: string): Observable<ArtCritic | null>;
  /** Which artworks have had a hand over their essay. For the artist alone. */
  getEditedCritics(token: string): Observable<Map<string, boolean>>;
  /** The same essay plus whether it has been edited, for an authenticated artist. */
  getArtPieceCriticWithEdits(tokenId: string, token: string): Observable<ArtCritic | null>;
  /** Replaces one language's text with the artist's own. */
  editArtPieceCritic(
    tokenId: string,
    lang: string,
    body: string,
    title: string,
    token: string
  ): Observable<ArtCritic | null>;
}
