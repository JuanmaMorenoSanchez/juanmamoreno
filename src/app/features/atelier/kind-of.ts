/**
 * What a kept file is, read from the name the engine gave it.
 *
 * **The subject used to be thrown away here.** The engine writes a cut layer
 * as `<batch>-the-girl.png`, and this answered `layer` for every one of them —
 * so a painting cut into five things arrived on the shelf as five assets all
 * called "layer", indistinguishable without opening each one. Worse, nothing
 * could then be asked: *which of this painting's things have been cut already*
 * has no answer when every answer is the same word.
 *
 * So the phrase comes through, as `layer-the-girl`. `kind` is free text at the
 * backend — the allowlist there is on the media type, which is the thing that
 * gets served to a browser — and it is what the shelf prints under each asset.
 */

/**
 * The engine's prefix on everything it writes: eight hex characters and a dash.
 *
 * Stripped rather than kept. It identifies the run, which is of no interest a
 * month later, and the same thing cut twice should be recognisably the same
 * thing rather than two unrelated names.
 */
const BATCH = /^[0-9a-f]{8}-/;

/** The extension, whatever it is. */
const SUFFIX = /\.[^.]+$/;

/** Anything that is not a plain word or a dash, which `kind` is read by people. */
const NOT_A_WORD = /[^a-z0-9]+/g;

/**
 * The phrase a file was named for, as a word.
 *
 * Lower case with dashes for the spaces, which is what the engine already did
 * to make the file name. Nothing is translated: the phrase was asked of the
 * model in English and the asset is filed under what was asked.
 */
function subjectOf(file: string): string {
  return file
    .replace(SUFFIX, '')
    .replace(BATCH, '')
    .toLowerCase()
    .replace(NOT_A_WORD, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * What to file a kept file under.
 *
 * The four named kinds first, because they are what the rest of the site reads
 * — a background is a background whatever phrase was lifted off it. Everything
 * else is a cut layer and carries its subject.
 */
export function kindOf(file: string): string {
  if (file.includes('background')) return 'background';
  if (file.includes('depth')) return 'depth';
  if (file.includes('edit')) return 'edit';

  const subject = subjectOf(file);
  // A Keep node with no name of its own already writes `<batch>-layer.png`,
  // and `layer-layer` says nothing twice.
  return subject && subject !== 'layer' ? `layer-${subject}` : 'layer';
}
