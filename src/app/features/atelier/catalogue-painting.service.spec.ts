import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { of, throwError } from 'rxjs';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { CataloguePaintingService } from './catalogue-painting.service';

/**
 * Fetching a painting by its number.
 *
 * Two things here are deliberate and worth pinning. It asks for the **original**
 * rather than the copy a tile would use — cutting a layer from a 95 KB
 * thumbnail gives a 95 KB layer. And it walks down to a worse copy rather than
 * failing, because the best one lives on a host that may refuse a cross-origin
 * read and a smaller painting beats an error.
 */
describe('CataloguePaintingService', () => {
  const nft = (image: Record<string, string>) => ({
    tokenId: '195',
    name: 'Rockets win I',
    image,
    raw: { metadata: { attributes: [] } },
  });

  const build = (found: unknown) => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: ARTWORK_PORT,
          useValue: {
            getNftByIdObservable: () =>
              found === 'boom' ? throwError(() => new Error('no')) : of(found),
          },
        },
      ],
    });
    return TestBed.inject(CataloguePaintingService);
  };

  /** Answers for the urls named, refuses the rest. */
  const serving = (...ok: string[]) => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) =>
        ok.includes(url)
          ? Promise.resolve({ ok: true, blob: () => Promise.resolve(new Blob(['x'])) })
          : Promise.reject(new TypeError('Failed to fetch'))
      )
    );
  };

  beforeEach(() => {
    // jsdom decodes nothing, so an <img> never fires either handler. The real
    // code gives up after three seconds; these tests should not wait for it.
    vi.stubGlobal('URL', {
      ...URL,
      createObjectURL: () => {
        throw new Error('no blobs here');
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('refuses an empty id before asking anything', async () => {
    await expect(build(null).byId('   ')).rejects.toThrow('type a token id');
  });

  it('says plainly when there is no such painting', async () => {
    await expect(build(null).byId('999')).rejects.toThrow('no painting 999');
  });

  it('survives the catalogue itself failing', async () => {
    await expect(build('boom').byId('195')).rejects.toThrow('no painting 195');
  });

  it('takes the original, not the copy a tile would use', async () => {
    serving('https://host/original.jpg');
    const got = await build(
      nft({
        originalUrl: 'https://host/original.jpg',
        thumbnailUrl: 'https://host/thumb.jpg',
      })
    ).byId('195');

    expect(got.quality).toBe('original');
    expect(got.name).toBe('Rockets win I');
  });

  it('steps down to a worse copy when the best one is refused', async () => {
    // Almost always a host declining a cross-origin read. A smaller painting
    // with a note saying so beats an error.
    serving('https://host/thumb.jpg');
    const got = await build(
      nft({
        originalUrl: 'https://host/original.jpg',
        cachedUrl: 'https://host/cached.jpg',
        thumbnailUrl: 'https://host/thumb.jpg',
      })
    ).byId('195');

    expect(got.quality).toBe('thumbnail');
  });

  it('names what it tried when every copy is refused', async () => {
    serving();
    await expect(
      build(nft({ originalUrl: 'https://host/a.jpg', thumbnailUrl: 'https://host/b.jpg' })).byId(
        '195'
      )
    ).rejects.toThrow('original, thumbnail');
  });

  it('says so when the painting exists but has no image at all', async () => {
    serving();
    await expect(build(nft({})).byId('195')).rejects.toThrow('no image stored');
  });

  it('takes the title from where the rest of the site takes it', async () => {
    // The raw metadata's name is not always filled in, and "Painting 195"
    // tells you nothing about whether you fetched the one you meant.
    serving('https://host/a.jpg');
    const got = await build(nft({ originalUrl: 'https://host/a.jpg' })).byId('195');

    expect(got.name).toBe('Rockets win I');
  });

  it('trims what was typed, because an id is pasted as often as typed', async () => {
    serving('https://host/original.jpg');
    const got = await build(nft({ originalUrl: 'https://host/original.jpg' })).byId('  195 ');

    expect(got.quality).toBe('original');
  });
});
