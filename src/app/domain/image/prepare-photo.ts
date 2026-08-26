import { correctedSize, type Quad } from './quad';
import { warpPerspective } from './perspective';
import { equalizeIllumination, measureIllumination, type IlluminationReport } from './illumination';
import { findSpecular, repairSpecular } from './specular';
import type { Raster, Size } from './raster';

export type PhotoStage = 'straightening' | 'lighting' | 'glare';

export interface PreparePhotoOptions {
  /** Where the painting's corners sit in the photograph. */
  quad: Quad;
  /** The painting itself, in whatever unit — only the ratio between them is read. */
  realWidth: number;
  realHeight: number;
  /** Whether the lighting may be flattened. It only is when it needs to be. */
  equalizeLighting: boolean;
  removeGlare: boolean;
  /**
   * Awaited between stages. A forty megapixel photograph takes long enough that
   * without this the tab would sit frozen with nothing on screen to say why.
   */
  onStage?: (stage: PhotoStage) => Promise<void> | void;
}

export interface PreparePhotoReport {
  size: Size;
  illumination: IlluminationReport;
  /** The lighting was found uneven and flattened. */
  equalized: boolean;
  spotsRemoved: number;
  /** Share of the painting the glare repair touched, between 0 and 1. */
  glareCoverage: number;
}

export interface PreparedPhoto {
  image: Raster;
  report: PreparePhotoReport;
}

/**
 * Turns a photograph of a painting into a reproduction of it.
 *
 * Three passes in the order they have to happen: the perspective first, since
 * every later measurement should be taken on the rectangle rather than on the
 * trapezoid; then the lighting, because a shading gradient shifts what counts
 * as bright; then the glare, which is judged against the paint around it and
 * so wants that paint already evenly lit.
 */
export async function preparePhoto(
  source: Raster,
  options: PreparePhotoOptions
): Promise<PreparedPhoto> {
  const { quad, realWidth, realHeight, equalizeLighting, removeGlare, onStage } = options;

  await onStage?.('straightening');
  const size = correctedSize(quad, realWidth, realHeight);
  const image = warpPerspective(source, quad, size);

  await onStage?.('lighting');
  const illumination = measureIllumination(image);
  const equalized = equalizeLighting && !illumination.uniform;
  if (equalized) equalizeIllumination(image);

  await onStage?.('glare');
  const glare = removeGlare ? findSpecular(image) : null;
  if (glare) repairSpecular(image, glare);

  return {
    image,
    report: {
      size,
      illumination,
      equalized,
      spotsRemoved: glare?.spots ?? 0,
      glareCoverage: glare?.coverage ?? 0,
    },
  };
}
