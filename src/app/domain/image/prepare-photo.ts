import { correctedSize, type EdgeBows, type Quad } from './quad';
import { warpPerspective } from './perspective';
import { equalizeIllumination, measureIllumination, type IlluminationReport } from './illumination';
import { findSpecular, repairSpecular } from './specular';
import { autoLevels, autoWhiteBalance, type CastReport, type LevelsReport } from './colour';
import { checkFocus, type FocusReport } from './focus';
import { evenOutBorders, type BorderReport } from './borders';
import type { Raster, Size } from './raster';

export type PhotoStage = 'straightening' | 'lighting' | 'glare' | 'borders' | 'colour' | 'focus';

export interface PreparePhotoOptions {
  /** Where the painting's corners sit in the photograph. */
  quad: Quad;
  /** How each side bows between those corners. Omitted means straight. */
  bows?: EdgeBows;
  /** The painting itself, in whatever unit — only the ratio between them is read. */
  realWidth: number;
  realHeight: number;
  /** Each of these is permission, not instruction: none acts unless it is needed. */
  equalizeLighting: boolean;
  removeGlare: boolean;
  evenBorders: boolean;
  correctCast: boolean;
  openTones: boolean;
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
  borders: BorderReport;
  cast: CastReport;
  levels: LevelsReport;
  focus: FocusReport;
}

export interface PreparedPhoto {
  image: Raster;
  report: PreparePhotoReport;
}

const NOT_ASKED_FOR_CAST: CastReport = {
  judged: false,
  applied: false,
  cast: 'neutral',
  strength: 0,
};

/**
 * Turns a photograph of a painting into a reproduction of it.
 *
 * The order is forced by what each pass needs to have settled before it can
 * judge anything. The perspective first, so every later measurement is taken
 * on the rectangle rather than the trapezoid. Then the lighting, because a
 * shading gradient shifts what counts as bright. Then the glare, which is
 * judged against the paint around it and wants that paint evenly lit. Only
 * then the colour: a white flare and a bright corner would both pass for
 * something that ought to have been neutral, and the cast would be read off
 * them. The rims come next, since a dark line along one side would otherwise
 * be read as part of the painting's tonal range. Tones last, since that maps
 * the whole range at once. Focus is measured on the finished picture and
 * changes nothing.
 */
export async function preparePhoto(
  source: Raster,
  options: PreparePhotoOptions
): Promise<PreparedPhoto> {
  const { quad, bows, realWidth, realHeight, onStage } = options;

  await onStage?.('straightening');
  const size = correctedSize(quad, realWidth, realHeight);
  const image = warpPerspective(source, quad, size, bows);

  await onStage?.('lighting');
  const illumination = measureIllumination(image);
  const equalized = options.equalizeLighting && !illumination.uniform;
  if (equalized) equalizeIllumination(image);

  await onStage?.('glare');
  const glare = options.removeGlare ? findSpecular(image) : null;
  if (glare) repairSpecular(image, glare);

  await onStage?.('borders');
  const borders = options.evenBorders ? evenOutBorders(image) : { corrected: [] };

  await onStage?.('colour');
  const cast = options.correctCast ? autoWhiteBalance(image) : NOT_ASKED_FOR_CAST;
  const levels = options.openTones ? autoLevels(image) : { applied: false, low: 0, high: 255 };

  await onStage?.('focus');
  const focus = checkFocus(image);

  return {
    image,
    report: {
      size,
      illumination,
      equalized,
      spotsRemoved: glare?.spots ?? 0,
      glareCoverage: glare?.coverage ?? 0,
      borders,
      cast,
      levels,
      focus,
    },
  };
}
