import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { createRaster, type Raster } from '@domain/image/raster';
import { ImageMatchService } from './image-match.service';

/** A picture with texture, so the fingerprint has something to hold on to. */
const picture = (seed: number, width = 64, height = 48): Raster => {
  const raster = createRaster(width, height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const at = (y * width + x) * 4;
      const value = ((x * 7 + y * 13 + seed * 37) % 200) + 30;
      raster.data[at] = value;
      raster.data[at + 1] = value;
      raster.data[at + 2] = value;
      raster.data[at + 3] = 255;
    }
  }
  return raster;
};

/** The one thing a test cannot do for itself: decode an image. */
type Decoding = { rasterOf(url: string): Promise<Raster | null> };

describe('ImageMatchService', () => {
  let service: ImageMatchService;
  const collection = [
    { tokenId: '2', name: 'Cuando éramos felices', image: { thumbnailUrl: 'data:one' } },
    { tokenId: '5', name: 'Rockets win III', image: { thumbnailUrl: 'data:two' } },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ARTWORK_PORT,
          useValue: { getArtPiecesObservable: () => of(collection) },
        },
      ],
    });
    service = TestBed.inject(ImageMatchService);

    // Decoding needs a browser; what is under test is the comparing.
    vi.spyOn(service as unknown as Decoding, 'rasterOf').mockImplementation(async (url) =>
      url === 'data:one' ? picture(1) : picture(2)
    );
  });

  it('says nothing before it has read the collection', () => {
    // A warning that arrives late is better than one that is wrong.
    expect(service.like(picture(1))).toEqual([]);
    expect(service.ready()).toBe(false);
  });

  it('finds the certificate whose picture this is', async () => {
    await service.learn();

    const found = service.like(picture(1));

    expect(found).toHaveLength(1);
    expect(found[0]).toMatchObject({ tokenId: '2', distance: 0 });
  });

  it('says nothing about a photograph the collection has never seen', async () => {
    // Structurally different, not the same pattern shifted along: two pictures
    // built the same way with a different seed are still the same picture as
    // far as a fingerprint is concerned, which is the point of it.
    const unseen = createRaster(64, 48);
    for (let y = 0; y < 48; y += 1) {
      for (let x = 0; x < 64; x += 1) {
        const at = (y * 64 + x) * 4;
        const value = y < 24 ? 40 + x : 220 - x;
        unseen.data[at] = value;
        unseen.data[at + 1] = value;
        unseen.data[at + 2] = value;
        unseen.data[at + 3] = 255;
      }
    }
    await service.learn();

    expect(service.like(unseen)).toEqual([]);
  });

  it('reads the collection once, however often it is asked', async () => {
    // 186 decodes is a quarter of a second; doing it again on every keystroke
    // would not be.
    let reads = 0;
    vi.spyOn(service as unknown as Decoding, 'rasterOf').mockImplementation(async () => {
      reads += 1;
      return picture(1);
    });

    await service.learn();
    const afterFirst = reads;
    await service.learn();

    expect(afterFirst).toBeGreaterThan(0);
    expect(reads).toBe(afterFirst);
  });

  it('has nothing to say about an empty picture', async () => {
    await service.learn();

    expect(service.like({ width: 0, height: 0, data: new Uint8ClampedArray(0) })).toEqual([]);
  });
});
