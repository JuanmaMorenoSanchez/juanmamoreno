import { DecimalPipe } from '@angular/common';
import { Component, computed, ElementRef, signal, viewChild } from '@angular/core';
import { detectQuad } from '@domain/image/detect-corners';
import {
  preparePhoto,
  type PhotoStage,
  type PreparePhotoReport,
} from '@domain/image/prepare-photo';
import { fullFrame, type Point, type Quad } from '@domain/image/quad';
import type { Raster } from '@domain/image/raster';

/** The photograph is shown no larger than this. The corners are kept in its own pixels regardless. */
const PREVIEW_LONG_SIDE = 900;
/** Corner finding works on a copy this size, which is all the detail an outline needs. */
const DETECTION_LONG_SIDE = 720;

const STAGE_LABELS: Record<PhotoStage, string> = {
  straightening: 'Straightening the perspective',
  lighting: 'Evening out the lighting',
  glare: 'Taking out the glare',
};

const CORNER_NAMES = ['top left', 'top right', 'bottom right', 'bottom left'];

@Component({
  selector: 'app-photo-prep',
  imports: [DecimalPipe],
  templateUrl: './photo-prep.component.html',
  styleUrl: './photo-prep.component.scss',
})
export class PhotoPrepComponent {
  private readonly stage = viewChild<ElementRef<HTMLElement>>('stage');
  private readonly previewCanvas = viewChild<ElementRef<HTMLCanvasElement>>('preview');

  private photo: ImageBitmap | null = null;
  private dragging: number | null = null;

  protected readonly cornerNames = CORNER_NAMES;

  protected readonly fileName = signal('');
  protected readonly size = signal<{ width: number; height: number } | null>(null);
  protected readonly corners = signal<Quad | null>(null);
  protected readonly foundEdges = signal(true);
  /** In centimetres, though only the ratio between them is ever read. */
  protected readonly realWidth = signal<number | null>(null);
  protected readonly realHeight = signal<number | null>(null);
  protected readonly evenLighting = signal(true);
  protected readonly takeOutGlare = signal(true);
  protected readonly busy = signal<PhotoStage | null>(null);
  protected readonly report = signal<PreparePhotoReport | null>(null);
  protected readonly resultUrl = signal<string | null>(null);
  protected readonly problem = signal('');

  protected readonly busyLabel = computed(() => {
    const stage = this.busy();
    return stage ? STAGE_LABELS[stage] : '';
  });

  protected readonly measured = computed(() => {
    const width = this.realWidth();
    const height = this.realHeight();
    return !!width && !!height && width > 0 && height > 0;
  });

  protected readonly canProcess = computed(
    () => !!this.corners() && this.measured() && !this.busy()
  );

  protected readonly outline = computed(() =>
    (this.corners() ?? []).map((corner) => `${corner.x},${corner.y}`).join(' ')
  );

  /** Placed as a share of the frame, so a handle stays the same size however the photo is scaled. */
  protected readonly handles = computed(() => {
    const size = this.size();
    const corners = this.corners();
    if (!size || !corners) return [];
    return corners.map((corner) => ({
      left: `${(corner.x / size.width) * 100}%`,
      top: `${(corner.y / size.height) * 100}%`,
    }));
  });

  protected readonly downloadName = computed(() => {
    const name = this.fileName().replace(/\.[^.]+$/, '') || 'painting';
    return `${name}-flat.png`;
  });

  protected setWidth(event: Event): void {
    this.realWidth.set(numberIn(event));
  }

  protected setHeight(event: Event): void {
    this.realHeight.set(numberIn(event));
  }

  protected async onFile(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) await this.open(file);
  }

  protected async onDrop(event: DragEvent): Promise<void> {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) await this.open(file);
  }

  protected allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  private async open(file: File): Promise<void> {
    this.reset();
    this.fileName.set(file.name);

    try {
      // Phone cameras record which way up they were held rather than rotating
      // the pixels, so without this a portrait painting arrives on its side.
      this.photo = await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch {
      this.problem.set('That file could not be read as an image.');
      return;
    }

    const { width, height } = this.photo;
    this.size.set({ width, height });
    this.drawPreview();

    const small = this.rasterAt(DETECTION_LONG_SIDE);
    const found = detectQuad(small);
    const scale = width / small.width;
    this.foundEdges.set(found.detected);
    this.corners.set(
      found.detected
        ? (found.quad.map((corner) => ({ x: corner.x * scale, y: corner.y * scale })) as Quad)
        : fullFrame({ width, height })
    );
  }

  private drawPreview(): void {
    const canvas = this.previewCanvas()?.nativeElement;
    if (!canvas || !this.photo) return;

    const scale = Math.min(1, PREVIEW_LONG_SIDE / Math.max(this.photo.width, this.photo.height));
    canvas.width = Math.round(this.photo.width * scale);
    canvas.height = Math.round(this.photo.height * scale);
    canvas.getContext('2d')?.drawImage(this.photo, 0, 0, canvas.width, canvas.height);
  }

  /** Draws the photograph into a scratch canvas to read its pixels back out. */
  private rasterAt(longSide?: number): Raster {
    const photo = this.photo as ImageBitmap;
    const longest = Math.max(photo.width, photo.height);
    const scale = longSide ? Math.min(1, longSide / longest) : 1;
    const width = Math.max(1, Math.round(photo.width * scale));
    const height = Math.max(1, Math.round(photo.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d', {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D;
    context.drawImage(photo, 0, 0, width, height);
    return { width, height, data: context.getImageData(0, 0, width, height).data };
  }

  protected grab(index: number, event: PointerEvent): void {
    this.dragging = index;
    (event.target as Element).setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  protected drag(event: PointerEvent): void {
    if (this.dragging === null) return;

    const at = this.pointIn(event);
    const size = this.size();
    const corners = this.corners();
    if (!at || !size || !corners) return;

    const moved = [...corners] as Quad;
    moved[this.dragging] = {
      x: Math.min(size.width, Math.max(0, at.x)),
      y: Math.min(size.height, Math.max(0, at.y)),
    };
    this.corners.set(moved);
  }

  protected release(): void {
    this.dragging = null;
  }

  /** Turns a pointer position into a position in the photograph's own pixels. */
  private pointIn(event: PointerEvent): Point | null {
    const stage = this.stage()?.nativeElement;
    const size = this.size();
    if (!stage || !size) return null;

    const box = stage.getBoundingClientRect();
    if (!box.width || !box.height) return null;
    return {
      x: ((event.clientX - box.left) / box.width) * size.width,
      y: ((event.clientY - box.top) / box.height) * size.height,
    };
  }

  protected async process(): Promise<void> {
    const corners = this.corners();
    const realWidth = this.realWidth();
    const realHeight = this.realHeight();
    if (!corners || !realWidth || !realHeight || !this.photo) return;

    this.problem.set('');
    this.releaseResult();

    try {
      const { image, report } = await preparePhoto(this.rasterAt(), {
        quad: corners,
        realWidth,
        realHeight,
        equalizeLighting: this.evenLighting(),
        removeGlare: this.takeOutGlare(),
        onStage: async (stage) => {
          this.busy.set(stage);
          await breathe();
        },
      });

      this.report.set(report);
      this.resultUrl.set(await toPngUrl(image));
    } catch {
      this.problem.set(
        'The photograph was too large for this browser to hold. Try a smaller copy.'
      );
    } finally {
      this.busy.set(null);
    }
  }

  protected reset(): void {
    this.releaseResult();
    this.photo?.close();
    this.photo = null;
    this.fileName.set('');
    this.size.set(null);
    this.corners.set(null);
    this.problem.set('');
    this.busy.set(null);
  }

  private releaseResult(): void {
    const url = this.resultUrl();
    if (url) URL.revokeObjectURL(url);
    this.resultUrl.set(null);
    this.report.set(null);
  }
}

function numberIn(event: Event): number | null {
  const value = Number.parseFloat((event.target as HTMLInputElement).value);
  return Number.isFinite(value) && value > 0 ? value : null;
}

/** Long enough for the browser to paint the stage it has just been told about. */
function breathe(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0)));
}

/** PNG, so the file carries exactly the pixels that were computed and not a re-encoding of them. */
async function toPngUrl(image: Raster): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.putImageData(new ImageData(image.data, image.width, image.height), 0, 0);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('The corrected image could not be encoded');
  return URL.createObjectURL(blob);
}
