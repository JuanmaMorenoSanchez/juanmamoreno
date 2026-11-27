import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { environment } from '@environments/environment';
import { Nft } from '@domain/artwork/artwork.entity';
import { SessionQuery } from '@shared/store/session.query';
import { SessionStore } from '@shared/store/session.store';
import testProviders from '../../../test-providers';
import { ArtworkInfraService } from './artwork.service';

/**
 * Bringing the browser's catalogue level after a mint or a correction.
 *
 * The store serves its copy for a week before it would refetch on its own, so a
 * painting written a minute ago was invisible in the lists until then. The mint
 * and correct flows now ask for this, and it must write the fresh snapshot to
 * the store the lists read from.
 */
describe('refreshing the catalogue on demand', () => {
  let service: ArtworkInfraService;
  let http: HttpTestingController;
  let query: SessionQuery;

  const piece = (tokenId: string): Nft => ({ tokenId, name: `#${tokenId}` }) as Nft;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        ...testProviders,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        ArtworkInfraService,
        SessionStore,
        SessionQuery,
      ],
    });
    service = TestBed.inject(ArtworkInfraService);
    http = TestBed.inject(HttpTestingController);
    query = TestBed.inject(SessionQuery);
  });

  afterEach(() => http.verify());

  it('writes the fresh snapshot into the store the lists read', () => {
    service.refreshCatalogue();

    http
      .expectOne(`${environment.backendUrl}nfts-snapshot`)
      .flush({ success: true, data: [piece('1'), piece('2')] });

    expect(query.selectArtPieces.map((nft) => nft.tokenId)).toEqual(['1', '2']);
    // Marked fresh, so the next read serves it rather than fetching again.
    expect(query.selectLastArtPiecesUpdate).toBeTruthy();
  });

  it('leaves the stored catalogue alone when the refetch comes back empty', () => {
    service.saveNftsLocally([piece('9')]);

    service.refreshCatalogue();
    http.expectOne(`${environment.backendUrl}nfts-snapshot`).flush({ success: false, data: [] });

    expect(query.selectArtPieces.map((nft) => nft.tokenId)).toEqual(['9']);
  });
});
