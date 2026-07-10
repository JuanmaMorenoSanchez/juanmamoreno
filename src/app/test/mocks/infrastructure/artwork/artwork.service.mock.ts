import { Artwork } from '@domain/artwork/artwork';
import { Nft } from '@domain/artwork/artwork.entity';
import { ArtworkPort } from '@domain/artwork/artwork.port';
import { Descriptions } from '@domain/artwork/descriptions.entity';
import { Observable, of } from 'rxjs';

class MockArtworkInfraService extends Artwork implements ArtworkPort {
  getArtPiecesObservable(): Observable<Nft[]> {
    return of([]);
  }

  getNftByIdObservable(): Observable<Nft | null> {
    return of(null);
  }

  getSameArtThanObservable(): Observable<Array<Nft>> {
    return of([]);
  }

  getAvailableOptimalUrl(nft: Nft): Observable<string> {
    return of(nft?.image?.thumbnailUrl || '');
  }

  getProgressiveImageUrls(nft: Nft): Observable<string> {
    return of(nft?.image?.thumbnailUrl || '');
  }

  getFullNftLenghtByYear(): number {
    return 0;
  }

  getAvailableYears(): Set<number> {
    return new Set<number>();
  }

  getLinks(): Observable<string[]> {
    return of([]);
  }

  saveNftsLocally(): void {
    // no-op in tests
  }

  getArtPieceDescriptions(): Observable<Descriptions | null> {
    return of(null);
  }
}

export const mockArtworkInfraService: ArtworkPort =
  new MockArtworkInfraService();
