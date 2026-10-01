import { orderedLayers, PieceManifest, PieceSketch, readManifest } from './piece.sketch';
import { Frame } from './sketch';

describe('readManifest', () => {
  const manifest: PieceManifest = {
    id: 'believe',
    title: 'Believe',
    layers: [{ label: 'head', depth: 1, order: 0, url: 'https://example.test/head.png' }],
  };

  /**
   * Which of these a piece arrives as is a deployment detail — through the api
   * it is wrapped, straight out of the bucket it is not — and a drawing should
   * not have to know which.
   */
  it('reads a manifest the api wrapped', () => {
    expect(readManifest({ success: true, data: manifest })).toEqual(manifest);
  });

  it('reads one that is not wrapped', () => {
    expect(readManifest(manifest)).toEqual(manifest);
  });

  it('answers with no layers rather than throwing on nonsense', () => {
    expect(readManifest(null).layers).toEqual([]);
    expect(readManifest({}).layers).toEqual([]);
  });
});

describe('orderedLayers', () => {
  /**
   * The stacking order is the only judgement in the file that no model made —
   * he dragged the layers into it — so a manifest that came back shuffled is
   * sorted rather than drawn as it arrived.
   */
  it('puts the stack back in the order he set, whatever order it arrives in', () => {
    const shuffled: PieceManifest = {
      id: 'p',
      title: 'P',
      layers: [
        { label: 'sky', depth: 0, order: 2, url: 'c' },
        { label: 'figure', depth: 1, order: 0, url: 'a' },
        { label: 'wall', depth: 0.5, order: 1, url: 'b' },
      ],
    };

    expect(orderedLayers(shuffled).map((layer) => layer.label)).toEqual(['figure', 'wall', 'sky']);
  });

  it('copes with a piece that has none', () => {
    expect(orderedLayers({ id: 'p', title: 'P', layers: [] })).toEqual([]);
  });
});

describe('PieceSketch', () => {
  const frame: Frame = {
    t: 0,
    dt: 0.016,
    width: 800,
    height: 600,
    pointer: { x: 400, y: 300, vx: 0, vy: 0, down: false, active: true },
  };

  /**
   * A piece that is not there is a blank canvas, not a broken page. The host
   * draws every sketch every frame, so one that threw on a missing manifest
   * would throw sixty times a second.
   */
  it('draws nothing, quietly, when there is no such piece', async () => {
    global.fetch = (async () => ({ ok: false, status: 404 })) as unknown as typeof fetch;
    const sketch = new PieceSketch('https://example.test/missing');

    await sketch.setup(stubContext(), 800, 600);

    expect(() => sketch.draw(stubContext(), frame)).not.toThrow();
  });

  it('survives a manifest that is not json at all', async () => {
    global.fetch = (async () => ({
      ok: true,
      json: async () => {
        throw new Error('not json');
      },
    })) as unknown as typeof fetch;
    const sketch = new PieceSketch('https://example.test/broken');

    await expect(sketch.setup(stubContext(), 800, 600)).resolves.toBeUndefined();
    expect(() => sketch.draw(stubContext(), frame)).not.toThrow();
  });

  it('forgets its layers when it is disposed of', async () => {
    const sketch = new PieceSketch('https://example.test/p');
    sketch.dispose();

    expect(() => sketch.draw(stubContext(), frame)).not.toThrow();
  });
});

/**
 * jsdom has no 2d context, and none of these tests is about pixels — they are
 * about a sketch surviving what it is handed. The calls have to go somewhere.
 */
function stubContext(): CanvasRenderingContext2D {
  return {
    clearRect: () => undefined,
    drawImage: () => undefined,
  } as unknown as CanvasRenderingContext2D;
}
