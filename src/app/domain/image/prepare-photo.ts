import { correctedSize, type EdgeBows, type Quad } from './quad';
import { warpPerspective } from './perspective';
import { applyAdjustments, isUnchanged, type Adjustments } from './adjustments';
import { checkFocus, type FocusReport } from './focus';
import type { Selection } from './selection';
import type { Raster, Size } from './raster';

export type PhotoStage = 'straightening' | 'adjusting' | 'focus';

export interface PreparePhotoOptions {
  /** Where the painting's corners sit in the photograph. */
  quad: Quad;
  /** How each side bows between those corners. Omitted means straight. */
  bows?: EdgeBows;
  /** The painting itself, in whatever unit — only the ratio between them is read. */
  realWidth: number;
  realHeight: number;
  /** How far each slider was moved. Zero everywhere leaves the picture alone. */
  adjustments: Adjustments;
  /** Where they apply. Absent means everywhere. */
  selection?: Selection | null;
  /**
   * Awaited between stages. A forty megapixel photograph takes long enough that
   * without this the tab would sit frozen with nothing on screen to say why.
   */
  onStage?: (stage: PhotoStage) => Promise<void> | void;
}

export interface PreparePhotoReport {
  size: Size;
  /** Whether any slider was moved at all. */
  adjusted: boolean;
  focus: FocusReport;
}

export interface PreparedPhoto {
  image: Raster;
  report: PreparePhotoReport;
}

/**
 * Turns a photograph of a painting into a reproduction of it.
 *
 * Two things happen here and they are in this order because the second depends
 * on the first: the perspective, so that everything after it is measured on the
 * rectangle rather than the trapezoid, and then whatever was asked for by hand.
 *
 * It used to do five more, each of which measured the photograph and decided
 * for itself whether to act — the lighting, the glare, the rims, the cast, the
 * tonal range. They were removed rather than fixed. Every one of them was
 * trying to answer a question it could not: whether a dark corner is a lamp
 * that fell off or paint that is dark. The lighting pass said as much in its
 * own comment, and was deliberately kept too weak to finish the job because of
 * it. A person looking at the painting knows the answer, so they now give it.
 *
 * Focus is measured on the finished picture and changes nothing: it is there to
 * say whether the photograph was sharp enough to be worth keeping.
 */
export async function preparePhoto(
  source: Raster,
  options: PreparePhotoOptions
): Promise<PreparedPhoto> {
  const { quad, bows, realWidth, realHeight, adjustments, selection, onStage } = options;

  await onStage?.('straightening');
  const size = correctedSize(quad, realWidth, realHeight);
  const image = warpPerspective(source, quad, size, bows);

  await onStage?.('adjusting');
  // The selection is in this rectangle's coordinates, not the photograph's.
  // A mask painted on the photograph would sit crooked on the straightened
  // picture — most visibly at the corners, which is where the brush is usually
  // wanted — so the dabs are mapped through the same homography as the pixels.
  const adjusted = !isUnchanged(adjustments);
  applyAdjustments(image, adjustments, selection);

  await onStage?.('focus');
  const focus = checkFocus(image);

  return { image, report: { size, adjusted, focus } };
}
