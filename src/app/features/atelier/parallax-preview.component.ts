import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { Parallax } from '@domain/generative/parallax';

/**
 * How many slices the painting is cut into by depth.
 *
 * Six reads as depth and still composites in a frame. Three and the painting
 * moves in visible slabs; a dozen and each slice is too thin to carry anything,
 * while the seams between them multiply.
 */
const BANDS = 6;

/** How far the nearest slice travels, in pixels, at the pointer's extreme. */
const REACH = 26;

/**
 * The painting, moving.
 *
 * No video model. The depth map is cut into slices, each slice is drawn on its
 * own, and each is shifted by how near it is — which is exactly what
 * {@link Parallax} was written for and what the generative pieces already do.
 *
 * The motion is **faithful by construction**: every pixel on screen is a pixel
 * he painted, moved. An image-to-video model would resolve his brushwork into
 * something photographic; this cannot, because it has nothing to invent with.
 *
 * A hundred megabytes and four seconds, against twelve gigabytes and eighteen
 * minutes.
 */
@Component({
  selector: 'app-parallax-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './parallax-preview.component.html',
  styleUrl: './parallax-preview.component.scss',
  host: { '(document:keydown.escape)': 'dismissed.emit()' },
})
export class ParallaxPreviewComponent {
  readonly painting = input.required<string>();
  readonly depth = input.required<string>();
  readonly dismissed = output<void>();

  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('stage');

  protected readonly ready = signal(false);
  protected readonly trouble = signal<string | null>(null);

  /** One slice per depth band, nearest last so it is drawn on top. */
  private slices: { layer: HTMLCanvasElement; parallax: Parallax }[] = [];
  private pointerX = 0;
  private pointerY = 0;
  private frame = 0;

  constructor() {
    effect(() => {
      const paintingUrl = this.painting();
      const depthUrl = this.depth();
      const stage = this.canvas()?.nativeElement;
      if (!stage) return;
      void this.prepare(paintingUrl, depthUrl, stage);
    });

    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.frame));
  }

  private async prepare(
    paintingUrl: string,
    depthUrl: string,
    stage: HTMLCanvasElement
  ): Promise<void> {
    try {
      const [painting, depth] = await Promise.all([load(paintingUrl), load(depthUrl)]);

      // Everything is done at the size the painting is shown at, not its own.
      // A 3652-pixel canvas sliced six ways is forty megabytes of pixel data
      // to composite every frame, for a picture shown at a third of a screen.
      const wide = Math.min(painting.naturalWidth, 760);
      const scale = wide / painting.naturalWidth;
      const high = Math.round(painting.naturalHeight * scale);
      stage.width = wide;
      stage.height = high;

      this.slices = band(painting, depth, wide, high);
      this.ready.set(true);
      this.trouble.set(null);
      this.draw(stage);
    } catch {
      // Almost always the depth map not being fetchable — the engine serves it
      // from the same place as every other layer, so if it is gone, so is it.
      this.trouble.set('The depth map could not be read.');
    }
  }

  protected move(event: PointerEvent): void {
    const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
    if (!box.width || !box.height) return;
    // Roughly -1 to 1 either way, which is what Parallax expects.
    this.pointerX = ((event.clientX - box.left) / box.width) * 2 - 1;
    this.pointerY = ((event.clientY - box.top) / box.height) * 2 - 1;
  }

  protected leave(): void {
    this.pointerX = 0;
    this.pointerY = 0;
  }

  private draw(stage: HTMLCanvasElement): void {
    const ctx = stage.getContext('2d');
    if (!ctx) return;

    const tick = (): void => {
      ctx.clearRect(0, 0, stage.width, stage.height);
      for (const slice of this.slices) {
        slice.parallax.update(this.pointerX, this.pointerY);
        ctx.drawImage(slice.layer, slice.parallax.x, slice.parallax.y);
      }
      this.frame = requestAnimationFrame(tick);
    };
    cancelAnimationFrame(this.frame);
    tick();
  }
}

/**
 * Loads a picture, or gives up.
 *
 * The deadline is not decoration. An `<img>` that neither loads nor fails
 * leaves both handlers unfired for ever, and the panel would sit on "slicing
 * it by depth" with nothing to say — which is exactly what happened the first
 * time this was tested.
 */
function load(src: string, patience = 10_000): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    let settled = false;
    const give = (go: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      go();
    };

    const timer = setTimeout(() => give(() => reject(new Error(`gave up on ${src}`))), patience);
    image.crossOrigin = 'anonymous';
    image.onload = () => give(() => resolve(image));
    image.onerror = () => give(() => reject(new Error(`could not load ${src}`)));
    image.src = src;
  });
}

/**
 * Cuts the painting into slices by depth, far to near.
 *
 * **Cumulative, not exclusive.** The first slice is the whole painting; each
 * one after it keeps only what is that near or nearer. So every slice is a
 * subset of the one beneath, and when a near slice slides away it uncovers
 * more painting rather than a hole.
 *
 * Exclusive bands were tried first and left white seams tearing through the
 * canvas wherever two slices parted — around the arm, down the right edge.
 * No amount of overlap fixes that, because the gap is real: those pixels
 * exist in exactly one slice and it has moved. The only honest answers are to
 * paint what is behind every slice, which costs a Fill each, or to never let a
 * gap show anything but more painting. This is the second.
 */
function band(
  painting: HTMLImageElement,
  depth: HTMLImageElement,
  wide: number,
  high: number
): { layer: HTMLCanvasElement; parallax: Parallax }[] {
  const source = document.createElement('canvas');
  source.width = wide;
  source.height = high;
  const from = source.getContext('2d', { willReadFrequently: true });
  if (!from) return [];

  from.drawImage(painting, 0, 0, wide, high);
  const pixels = from.getImageData(0, 0, wide, high);

  from.clearRect(0, 0, wide, high);
  from.drawImage(depth, 0, 0, wide, high);
  const distances = from.getImageData(0, 0, wide, high).data;

  const slices: { layer: HTMLCanvasElement; parallax: Parallax }[] = [];

  for (let b = 0; b < BANDS; b += 1) {
    const layer = document.createElement('canvas');
    layer.width = wide;
    layer.height = high;
    const onto = layer.getContext('2d');
    if (!onto) continue;

    const nearerThan = b / BANDS;
    const slice = new ImageData(new Uint8ClampedArray(pixels.data), wide, high);
    if (b > 0) {
      for (let i = 0; i < distances.length; i += 4) {
        if (distances[i] / 255 < nearerThan) slice.data[i + 3] = 0;
      }
    }
    onto.putImageData(slice, 0, 0);

    // Furthest still, nearest moving most, eased so it settles rather than
    // snapping to the pointer.
    slices.push({ layer, parallax: new Parallax(b / (BANDS - 1), REACH, 0.08) });
  }

  return slices;
}
