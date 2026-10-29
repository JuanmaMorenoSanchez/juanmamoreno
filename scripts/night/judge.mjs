/**
 * Whether a cut is worth keeping, decided by number.
 *
 * **Nothing looks at these.** The engine says so itself: a layer coming back is
 * not evidence the thing is in the painting, and every score has to be judged
 * by eye. The night has no eye, so it judges the one thing a number can
 * actually say — not *is this the girl*, which no threshold answers, but *is
 * this a thing at all*.
 *
 * That catches the failure the night will actually produce. Because the words
 * came from a model that looked at the canvas, the subject is usually really
 * there; what goes wrong is the mask, which either swallows the whole painting
 * or collapses to a few hundred pixels. Both are visible in the coverage, and
 * neither needs an opinion.
 *
 * What survives this is not guaranteed good. It is guaranteed to be a region
 * of plausible size that SAM was confident about, which is as far as arithmetic
 * goes — and a bad one can be taken off the shelf with Forget.
 */

/**
 * Above this share of the canvas, it is the painting and not a thing in it.
 *
 * A figure filling the frame is a real painting and a real cut, so this is set
 * where it only catches a mask that has escaped: at 0.85 the layer and the
 * background it was lifted off are nearly the same picture, which makes the
 * pair useless rather than wrong.
 */
export const TOO_MUCH = 0.85;

/**
 * Below this share, there is nothing in it to use.
 *
 * Half a percent of a 2500px canvas is still some fifty thousand pixels, so
 * this is not a judgement about importance — it is the floor under which the
 * cut is a speck, a bit of edge, or the mask having failed to find anything.
 */
export const TOO_LITTLE = 0.005;

/**
 * SAM's own confidence in the mask it chose.
 *
 * Its estimate of its own overlap, picked as the best of three candidates. Low
 * here means the three disagreed, which in practice means the box held two
 * things and the mask took part of each.
 */
export const TOO_UNSURE = 0.7;

/**
 * Keep it, or why not.
 *
 * **No bar on the detector's score.** `find` is already called with a 0.25
 * threshold and returns nothing below it, so a second test against the same
 * number would refuse nothing and read as though it protected something.
 */
export function verdict(layer) {
  const coverage = Number(layer?.coverage);
  const iou = Number(layer?.iou);

  if (!Number.isFinite(coverage) || !Number.isFinite(iou)) {
    return { keep: false, why: 'the engine reported no coverage for it' };
  }
  if (coverage > TOO_MUCH) {
    return {
      keep: false,
      why: `it covers ${share(coverage)} of the canvas, so it is the painting`,
    };
  }
  if (coverage < TOO_LITTLE) {
    return { keep: false, why: `it covers only ${share(coverage)} of the canvas` };
  }
  if (iou < TOO_UNSURE) {
    return { keep: false, why: `the mask was unsure of itself (iou ${iou.toFixed(2)})` };
  }
  return { keep: true, why: '' };
}

/**
 * How alike two cuts have to be before they are one cut with two names.
 *
 * Measured rather than guessed. Asked for "a woman in green", "a man in red"
 * and "a kiss" on a canvas holding an embrace, the detector returned the same
 * box three times and the segmenter the same mask — coverage 0.482, 0.484,
 * 0.485 — each of them plausible, each of them passing every bar above, and
 * all three the same picture. A kiss is not a thing with edges, and nor is any
 * other word for what two figures are doing.
 *
 * So two cuts whose masks sit in nearly the same place, covering nearly the
 * same amount, are the same cut. The first one named wins, which is the order
 * the painting itself named them in.
 */
export const AS_GOOD_AS_THE_SAME = 0.9;

/** Within this much of each other's coverage, as a share of the larger. */
const AND_THE_SAME_SIZE = 0.1;

/**
 * Which already-kept cut this one is really a copy of, if any.
 *
 * Boxes rather than masks, because the box is what the engine reports and
 * because two masks in the same box at the same size are the same region to
 * any use this asset will be put to later.
 */
export function copyOf(layer, kept) {
  const mine = layer?.box;
  if (!Array.isArray(mine) || mine.length !== 4) return null;

  for (const other of kept) {
    if (!Array.isArray(other?.box) || other.box.length !== 4) continue;
    if (overlap(mine, other.box) < AS_GOOD_AS_THE_SAME) continue;

    const big = Math.max(layer.coverage, other.coverage);
    if (big > 0 && Math.abs(layer.coverage - other.coverage) / big > AND_THE_SAME_SIZE) continue;

    return other.label;
  }
  return null;
}

/** How much two boxes are the same box, as the usual share of their union. */
function overlap([ax0, ay0, ax1, ay1], [bx0, by0, bx1, by1]) {
  const wide = Math.max(0, Math.min(ax1, bx1) - Math.max(ax0, bx0));
  const high = Math.max(0, Math.min(ay1, by1) - Math.max(ay0, by0));
  const both = wide * high;
  const union = (ax1 - ax0) * (ay1 - ay0) + (bx1 - bx0) * (by1 - by0) - both;
  return union > 0 ? both / union : 0;
}

/** A share of the canvas, as a person reads one. */
function share(of) {
  return `${(of * 100).toFixed(1)}%`;
}

/** The reserved subject: the remainder of everything lifted off the canvas. */
export const BACKGROUND = 'the background';

/**
 * Everything one painting's cut decided, in one place.
 *
 * Here rather than in the runner's loop because this is the whole of the
 * night's judgement, and in the loop it was seventy lines of `try` that
 * nothing could reach. What the runner does with the answer — write it down,
 * press the button — is plumbing.
 *
 * `wanted` is what the ledger still has no verdict on, the background among
 * them. Every one of them comes back either kept or refused: a subject left
 * without a verdict is a painting that is never finished, which is how a
 * catalogue stops emptying.
 */
export function decide(made, wanted) {
  const keeping = [];
  const refused = [];
  const taken = [];

  for (const missed of made?.not_found ?? []) {
    refused.push({ subject: missed, why: 'the detector found nothing' });
  }

  for (const layer of made?.layers ?? []) {
    const call = verdict(layer);
    if (!call.keep) {
      refused.push({ subject: layer.label, why: call.why });
      continue;
    }
    const copy = copyOf(layer, taken);
    if (copy) {
      refused.push({ subject: layer.label, why: `it is the same cut as "${copy}"` });
      continue;
    }
    taken.push(layer);
    keeping.push({ subject: layer.label, file: layer.file });
  }

  if (wanted.includes(BACKGROUND)) {
    if (made?.background?.file) {
      keeping.push({ subject: BACKGROUND, file: made.background.file });
    } else {
      // The background is the remainder of what was lifted off the canvas, so
      // a painting that gave up nothing has no remainder either. Said now
      // rather than left pending, or this painting is offered again every
      // night for ever.
      refused.push({
        subject: BACKGROUND,
        why: 'nothing was cut out of it, so there is no remainder',
      });
    }
  }

  return { keeping, refused };
}
