import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { environment } from '@environments/environment';
import { NftThumbnail } from '@domain/artwork/artwork.entity';
import { SessionQuery } from '@shared/store/session.query';
import { SessionStore } from '@shared/store/session.store';
import testProviders from '../../../test-providers';
import { ArtworkInfraService } from './artwork.service';

/**
 * The thumbnails the page keeps while it is open.
 *
 * Each is a base64 jpeg of about 14 KB, and they were appended one per painting
 * looked at and never pruned or matched — so the list only ever grew, and the
 * whole of it was serialised to localStorage on every store update. They are
 * kept in memory now (see `main.ts`), which makes one entry per painting the
 * whole of what this has to get right.
 *
 * The fetch is called directly rather than through the progressive race: the
 * race also preloads an `Image()`, which never settles under jsdom.
 */
describe('the thumbnails kept while the page is open', () => {
  let service: ArtworkInfraService;
  let http: HttpTestingController;
  let store: SessionStore;
  let query: SessionQuery;

  const entry = (tokenId: string, thumbnail: string): NftThumbnail => ({
    tokenId,
    thumbnail,
    originalUrl: '',
    createdAt: '',
    updatedAt: '',
  });

  /** Asks for one painting's thumbnail and answers it, as the api would. */
  const fetch = async (tokenId: string, thumbnail: string) => {
    const asked = new Promise<void>((done) => {
      (
        service as unknown as {
          fetchRemoteThumbnail: (id: string) => { subscribe: (o: { complete: () => void }) => void };
        }
      )
        .fetchRemoteThumbnail(tokenId)
        .subscribe({ complete: () => done() });
    });
    http
      .expectOne(`${environment.backendUrl}nft-thumbnails/${tokenId}`)
      .flush({ success: true, data: entry(tokenId, thumbnail) });
    await asked;
  };

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
    store = TestBed.inject(SessionStore);
    query = TestBed.inject(SessionQuery);
    store.update({ imageCache: [] });
  });

  afterEach(() => http.verify());

  it('keeps one entry per painting, however often it is fetched', async () => {
    // An entry that is there but carries no usable image is a miss, and used
    // to be appended beside the first rather than replacing it.
    store.update({ imageCache: [entry('2', '')] });

    await fetch('2', 'BBBB');

    const held = query.getValue().imageCache.filter((one) => one?.tokenId === '2');
    expect(held).toHaveLength(1);
    expect(held[0].thumbnail).toBe('BBBB');
  });

  it('keeps the paintings apart', async () => {
    await fetch('2', 'AAAA');
    await fetch('3', 'BBBB');

    expect(
      query
        .getValue()
        .imageCache.map((one) => one.tokenId)
        .sort(),
    ).toEqual(['2', '3']);
  });
});
