import { environment } from '@environments/environment';
import { Parallax } from '@domain/generative/parallax';
import { Frame, loadImages, Sketch } from './sketch';

/**
 * A generative piece made out of a painting cut into layers in the atelier.
 *
 * Every sketch before this one had its layers cut by hand in an image editor
 * and committed to `assets/` — which is why there were two of them in ten
 * months. This one reads a manifest instead, so a piece is a thing made in an
 * afternoon rather than a thing built.
 *
 * It does no new drawing: the depth-to-shift mapping is the same `Parallax`
 * the hand-cut pieces use. What is new is only where the pictures come from.
 */

/** One layer, as the manifest hands it over: with an address, not a name. */
export interface PieceLayer {
  label: string;
  /** 0 is far and still, 1 is near and moves most. */
  depth: number;
  /** Paint order, 0 nearest the viewer. */
  order: number;
  url: string;
}

export interface PieceManifest {
  id: string;
  title: string;
  layers: PieceLayer[];
}

/** How far the nearest layer travels, as a share of the smaller side. */
const REACH = 0.045;

/** Smoothing per frame. Low, so the stack glides rather than snapping. */
const EASE = 0.06;

export class PieceSketch implements Sketch {
  private layers: { image: HTMLImageElement; depth: number; parallax: Parallax }[] = [];
  private failed = false;

  /** `manifestUrl` answers with the layers and where each picture lives. */
  constructor(private readonly manifestUrl: string) {}

  async setup(ctx: CanvasRenderingContext2D, width: number, height: number): Promise<void> {
    let manifest: PieceManifest;
    try {
      const response = await fetch(this.manifestUrl);
      if (!response.ok) throw new Error(String(response.status));
      manifest = readManifest(await response.json());
    } catch {
      this.failed = true;
      return;
    }

    const ordered = orderedLayers(manifest);
    if (!ordered.length) {
      this.failed = true;
      return;
    }

    const images = await loadImages(
      Object.fromEntries(ordered.map((layer, index) => [String(index), layer.url]))
    );

    const reach = Math.min(width, height) * REACH;
    this.layers = ordered.map((layer, index) => ({
      image: images[String(index)],
      depth: layer.depth,
      parallax: new Parallax(layer.depth, reach, EASE),
    }));
  }

  draw(ctx: CanvasRenderingContext2D, frame: Frame): void {
    ctx.clearRect(0, 0, frame.width, frame.height);

    if (this.failed) return;

    // The pointer arrives in CSS pixels; `Parallax` wants roughly [-1, 1]
    // measured from the middle. A piece nobody has touched sits still, which
    // the host's idle wander then takes over.
    const refX = frame.pointer.active ? (frame.pointer.x / frame.width - 0.5) * 2 : 0;
    const refY = frame.pointer.active ? (frame.pointer.y / frame.height - 0.5) * 2 : 0;

    // Back to front, so the nearest layer is painted last and sits on top.
    for (let index = this.layers.length - 1; index >= 0; index--) {
      const layer = this.layers[index];
      if (!layer?.image) continue;

      layer.parallax.update(refX, refY);
      const fit = contain(layer.image, frame.width, frame.height);
      ctx.drawImage(
        layer.image,
        fit.x + layer.parallax.x,
        fit.y + layer.parallax.y,
        fit.width,
        fit.height
      );
    }
  }

  resize(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    // The travel is a share of the frame, so a resized piece must be restacked
    // or a wide window would move the layers by a phone's worth of pixels.
    const reach = Math.min(width, height) * REACH;
    this.layers = this.layers.map((layer) => ({
      ...layer,
      parallax: new Parallax(layer.depth, reach, EASE),
    }));
  }

  dispose(): void {
    this.layers = [];
  }
}

/**
 * Every layer is drawn at the same fitted size, so the stack stays registered
 * — each layer is the whole painting with everything but itself cut away, and
 * two different fits would pull them apart.
 */
function contain(
  image: HTMLImageElement,
  width: number,
  height: number
): { x: number; y: number; width: number; height: number } {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawn = { width: image.naturalWidth * scale, height: image.naturalHeight * scale };

  return { x: (width - drawn.width) / 2, y: (height - drawn.height) / 2, ...drawn };
}

/**
 * The api wraps every answer in `{ success, data }`; the same manifest read
 * straight out of the bucket is not wrapped. Both are accepted, because which
 * one a piece is loaded through is a deployment detail and not something a
 * drawing should know about.
 */
export function readManifest(body: unknown): PieceManifest {
  const wrapper = (body ?? {}) as PieceManifest & { data?: PieceManifest };
  const manifest = wrapper.data ?? wrapper;

  return { id: manifest.id, title: manifest.title, layers: manifest.layers ?? [] };
}

/**
 * Back to front, and never trusting the order they arrived in.
 *
 * The stacking order is the one thing in a piece that no model worked out and
 * he set by hand, so losing it loses the only human judgement in the file.
 */
export function orderedLayers(manifest: PieceManifest): PieceLayer[] {
  return [...(manifest.layers ?? [])].sort((a, b) => a.order - b.order);
}

/**
 * A registration for one saved piece, by its id.
 *
 * Here rather than in the registry so that registering a piece is one line and
 * knows nothing about where a manifest lives.
 */
export function pieceSketch(id: string): () => PieceSketch {
  return () => new PieceSketch(`${environment.backendUrl}atelier/public/${id}`);
}
