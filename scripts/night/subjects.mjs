/**
 * What is in a painting, asked of the model that can see it.
 *
 * **Why not a word list.** Grounding DINO does not answer whether a thing is
 * in a painting; it answers where a thing would be if it were. Asked for "a
 * unicorn" on a canvas with none it returns the arms and the inverted head at
 * 0.395, against 0.418 for "a girl" who is really there — two hundredths
 * apart, so no threshold separates them and raising one loses the real labels
 * first. A fixed vocabulary run over the whole catalogue therefore produces a
 * confident layer for every word in it, present or not.
 *
 * So the words come from a model that looked at the canvas. Qwen3-VL is
 * already on this machine for the alt text, it costs nothing per painting, and
 * what it names is at worst a thing it mistook for another thing rather than a
 * thing nobody asked about. The segmenter is then confirming a description
 * instead of hunting a guess.
 */

/**
 * The most things to cut out of one painting.
 *
 * Six is where the list stops being things and starts being parts of things —
 * a hand, a sleeve, a highlight — which cut badly and are not what anybody
 * reaches for later.
 */
export const MOST_SUBJECTS = 6;

/** The longest a thing's name can be, in words. More than this is a sentence. */
const MOST_WORDS = 4;

/**
 * What the painting is asked.
 *
 * Written for the segmenter that reads the answer, not for a person: short
 * noun phrases are what Grounding DINO scores well, and an explanation around
 * them is noise that has to be stripped back off.
 *
 * The refusal is spelled out because it is the whole point. A vision model
 * asked to list things will pad the list to look thorough, and a padded list
 * is the fixed vocabulary again with extra steps.
 */
export const ASKING = [
  'List the separate things in this painting that could be cut out as their own picture.',
  '',
  'Rules:',
  '- One thing per line. Nothing else: no numbering, no commas, no explanation.',
  '- Two to four words, lower case, in English, starting with "a" or "the".',
  '- Only what you can actually see. If you are not sure something is there, leave it out.',
  '- Whole figures and whole objects, not parts of them: not a hand, not a sleeve.',
  '- Only things with edges, that could be cut out with scissors.',
  '- Not an action and not what people are doing: not a kiss, not an embrace, not a glance.',
  '- Not a shadow, not a reflection, not the light.',
  '- Not the background, not the sky as a whole, not a mood or a feeling.',
  `- At most ${MOST_SUBJECTS} lines. Fewer is better than padding the list.`,
].join('\n');

/** Bullets, numbers and dashes a model puts in front of a list however it was asked. */
const BULLET = /^\s*(?:[-*•]|\d+[.)])\s*/;

/** Anything that is not a word or a space, once the bullet is off. */
const PUNCTUATION = /[^\p{L}\p{N} ]/gu;

/**
 * A thing is named with an article, which the prompt asks for.
 *
 * Enforced rather than hoped for, because it is what separates a thing from a
 * remark. "I cannot tell", "this painting shows a woman", "oil on linen" are
 * all plausible lines of the right length, and none of them is a thing to cut.
 * A line that drops the article is lost — which costs one subject out of a
 * hundred and eighty-six paintings' worth, against a label that would spend a
 * cut on a sentence.
 */
const A_THING = /^(?:a|an|the) /;

/**
 * The things named, as phrases a segmenter can be asked for.
 *
 * Forgiving on the way in and strict on the way out: whatever shape the answer
 * arrives in, what leaves here is a short list of lower-case noun phrases with
 * no duplicates. A line that does not look like a thing is dropped rather than
 * repaired — there are a hundred and eighty-six paintings and no one is
 * watching, so a bad line is cheaper to lose than to guess at.
 */
export function subjectsIn(said) {
  const seen = new Set();
  const found = [];

  for (const line of String(said ?? '').split('\n')) {
    const phrase = line
      .replace(BULLET, '')
      .replace(PUNCTUATION, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();

    if (!phrase) continue;

    if (!A_THING.test(phrase)) continue;

    const words = phrase.split(' ');
    // A single word is usually the model answering about the painting rather
    // than listing what is in it — "figures", "composition", "oil".
    if (words.length < 2 || words.length > MOST_WORDS) continue;
    // The background is cut anyway, as the remainder of everything else, so
    // asking for it as a thing would cut it twice and name one of them wrong.
    if (/\bbackground\b/.test(phrase)) continue;
    if (seen.has(phrase)) continue;

    seen.add(phrase);
    found.push(phrase);
    if (found.length === MOST_SUBJECTS) break;
  }

  return found;
}
