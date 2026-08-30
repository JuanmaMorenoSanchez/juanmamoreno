/**
 * A description cut to the length a search result will actually show.
 *
 * Google renders around a hundred and fifty-five characters and drops the rest.
 * The written descriptions of the paintings run to four and five hundred, so
 * every artwork page — which is to say almost the whole site — was handing over
 * a snippet that got cut off mid-word by somebody else's rule rather than
 * ending where the sentence ended.
 */

/** What search results have room for. A little under, so the cut is ours. */
export const META_DESCRIPTION_LIMIT = 155;

/** How far in a sentence has to end before ending there beats running on. */
const WORTH_STOPPING_AT = 0.4;

/**
 * The opening of a description, ending somewhere a reader would end.
 *
 * Prefers to stop at the end of a sentence, because a snippet that finishes on
 * a full stop reads as writing rather than as a truncation. Failing that it
 * stops at a word and says it was cut, which is honest and still legible. Text
 * already short enough is returned exactly as it is, with nothing appended.
 */
export function metaDescription(text: string, limit = META_DESCRIPTION_LIMIT): string {
  const clean = (text ?? '').replace(/\s+/g, ' ').trim();
  if (clean.length <= limit) return clean;

  const room = clean.slice(0, limit + 1);

  // A whole sentence beats a longer fragment, so a full stop anywhere past
  // this point is taken. Below it the sentence is so short that stopping there
  // would throw away most of what there was to say, and a cut word reads
  // better than three words and an ellipsis.
  const sentence = Math.max(room.lastIndexOf('. '), room.lastIndexOf('? '), room.lastIndexOf('! '));
  if (sentence >= limit * WORTH_STOPPING_AT) return clean.slice(0, sentence + 1);

  const word = room.lastIndexOf(' ');
  const cut = word > 0 ? word : limit;
  return `${clean.slice(0, cut).replace(/[,;:.\s]+$/, '')}…`;
}
