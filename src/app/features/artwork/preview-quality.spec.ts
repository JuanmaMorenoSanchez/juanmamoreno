import { PreviewQuality } from './artwork.service';

/**
 * The order the progressive race replaces one image with another.
 *
 * The race only ever swaps what is on screen for something better, so this
 * ranking is the whole of its correctness. It is asserted here because it was
 * wrong once and nothing noticed: `thumbnailUrl` used to be Alchemy's cached
 * copy — a middling size — and outranked the api's 360px thumbnail. When the
 * certificates moved on chain that field became the two kilobytes carried
 * inside the token, about 112px and the smallest image there is, while the
 * ranking stayed where it was. The page showed the good thumbnail and then
 * visibly got worse.
 */
describe('the order images are allowed to replace one another', () => {
  it('goes smallest to largest', () => {
    expect(PreviewQuality.NFT_THUMBNAIL).toBeLessThan(PreviewQuality.BACKEND_THUMBNAIL);
    expect(PreviewQuality.BACKEND_THUMBNAIL).toBeLessThan(PreviewQuality.NFT_CACHED);
  });

  it('ranks the token own thumbnail lowest, because it is now the smallest', () => {
    const all = [
      PreviewQuality.NFT_THUMBNAIL,
      PreviewQuality.BACKEND_THUMBNAIL,
      PreviewQuality.NFT_CACHED,
    ];

    expect(Math.min(...all)).toBe(PreviewQuality.NFT_THUMBNAIL);
  });

  it('leaves the full-resolution original out of the race entirely', () => {
    // The original is several megabytes and is fetched by the viewer's own
    // <img> in parallel, arriving last. A quality above NFT_CACHED here would
    // mean the race was waiting on it before showing anything.
    const highest = Math.max(
      PreviewQuality.NFT_THUMBNAIL,
      PreviewQuality.BACKEND_THUMBNAIL,
      PreviewQuality.NFT_CACHED,
    );

    expect(highest).toBe(PreviewQuality.NFT_CACHED);
  });
});
