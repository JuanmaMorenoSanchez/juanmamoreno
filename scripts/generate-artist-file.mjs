// Writes who the artist is, for the same readers as catalogue.json.
//
// The catalogue says what the paintings are and nothing about whose they are,
// which is half an answer to the only question a collector actually asks. The
// facts that answer the other half — the shows, the awards, the residency, the
// gallery — are on the cv page already; this is them in one file, in both
// languages, so an assistant can state them instead of guessing from whatever
// it happens to remember about the name.
//
// **Built from the same data the cv page renders**, not from a copy. The page
// is a list of translation keys over `CV_OBJECT`, so this reads that array and
// resolves the keys through the same dictionaries — a show added to the cv is
// in this file at the next build, and a show that is not on the cv cannot be.
//
// No price, and nothing that costs money to serve; the same two rules as the
// catalogue, checked the same way at the end.
import { readFile, writeFile } from 'node:fs/promises';

const ORIGIN = 'https://juanmamoreno.com';
const OUTPUT = 'dist/juanmamoreno/browser/artist.json';
const LANGUAGES = ['en', 'es'];

const CV_SOURCE = 'src/app/domain/cv/cv.constants.ts';
const STATEMENT_SOURCE = 'src/app/domain/statement/statement.constants.ts';

/**
 * The value of one `export const` in a source file, as data.
 *
 * The constants are plain literals with no logic in them, so the literal is cut
 * out and evaluated with the one symbol it refers to in scope. Reading the
 * source rather than keeping a second copy is the point: two lists of the same
 * career would disagree within a year, and the one nobody was looking at would
 * be this one.
 */
async function literal(file, name, scope = {}) {
  const source = await readFile(file, 'utf8');
  const opens = source.indexOf('=', source.indexOf(`export const ${name}`)) + 1;
  if (opens === 0) throw new Error(`${name} is no longer declared in ${file}`);

  const body = balanced(source, opens, file, name);
  const names = Object.keys(scope);
  return new Function(...names, `return ${body}`)(...names.map((key) => scope[key]));
}

/**
 * From the opening bracket to the one that closes it.
 *
 * Counted rather than searched for, because either constant may be an array or
 * an object and both contain the other: looking for a closing line would end
 * the cv at the first nested item. Quoted text is skipped, since the titles
 * contain apostrophes and brackets of their own.
 */
function balanced(source, from, file, name) {
  const opens = source.slice(from).search(/[[{]/) + from;
  let depth = 0;
  let quote = null;

  for (let at = opens; at < source.length; at += 1) {
    const character = source[at];

    if (quote) {
      if (character === '\\') at += 1;
      else if (character === quote) quote = null;
      continue;
    }

    if (character === "'" || character === '"' || character === '`') quote = character;
    else if (character === '[' || character === '{') depth += 1;
    else if (character === ']' || character === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(opens, at + 1);
    }
  }

  throw new Error(`could not find the end of ${name} in ${file}`);
}

/** The `COUNTRIES` enum, which the cv items refer to by member. */
async function countries(file) {
  const source = await readFile(file, 'utf8');
  const block = source.slice(source.indexOf('enum COUNTRIES'), source.indexOf('}', source.indexOf('enum COUNTRIES')));
  const members = {};
  for (const [, member, key] of block.matchAll(/(\w+)\s*=\s*'([^']+)'/g)) members[member] = key;
  if (!Object.keys(members).length) throw new Error('the COUNTRIES enum has moved');
  return members;
}

const dictionaries = Object.fromEntries(
  await Promise.all(
    LANGUAGES.map(async (lang) => [
      lang,
      JSON.parse(await readFile(`src/assets/translations/${lang}.json`, 'utf8')),
    ])
  )
);

/** A key resolved, or the text itself: half the cv titles are not keys at all. */
const say = (lang, key) => {
  if (!key) return undefined;
  let node = dictionaries[lang];
  for (const part of String(key).split('.')) {
    node = node?.[part];
    if (node === undefined) return key;
  }
  return typeof node === 'string' ? node : key;
};

/** The page renders these with innerHTML; a file is read as text. */
const asText = (html) =>
  String(html ?? '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const COUNTRIES = await countries(CV_SOURCE);
const cvObject = await literal(CV_SOURCE, 'CV_OBJECT', { COUNTRIES });
const statement = await literal(STATEMENT_SOURCE, 'STATEMENT_OBJECT');

const career = (lang) =>
  cvObject.map((section) => ({
    section: say(lang, section.title),
    items: section.items.map((item) => ({
      year: item.year,
      title: asText(say(lang, item.title)),
      venue: asText(say(lang, item.venue)) || undefined,
      city: item.city,
      country: asText(say(lang, item.country)) || undefined,
    })),
  }));

const statementIn = (lang) => [
  asText(say(lang, statement.introduction.content)),
  ...statement.sections.flatMap((section) => [
    ...(section.content ?? []).map((key) => asText(say(lang, key))),
    ...(section.items ?? []).map((item) => asText(say(lang, item.content))),
  ]),
];

/**
 * The gallery, taken out of the sentence that already names it rather than
 * written down again here. A second copy of a representation is the kind of
 * fact that stays true for years and then quietly is not.
 */
const representedBy = dictionaries.en.contact?.representedBy ?? '';
const gallery = {
  name: asText(representedBy.match(/>([^<]+)<\/a>/)?.[1]),
  url: representedBy.match(/href='([^']+)'/)?.[1],
};
if (!gallery.name || !gallery.url) {
  throw new Error('the gallery could no longer be read out of contact.representedBy');
}

/** The one number worth having as a number, read from the line that states it. */
const born = Number(dictionaries.en.cv?.shortBio?.match(/\b(19|20)\d{2}\b/)?.[0]);
if (!born) throw new Error('the year of birth could no longer be read out of cv.shortBio');

const artist = {
  name: 'Juanma Moreno Sánchez',
  url: ORIGIN,
  born,
  summary: Object.fromEntries(LANGUAGES.map((lang) => [lang, asText(say(lang, 'cv.placeLine'))])),
  representation: gallery,
  statement: Object.fromEntries(LANGUAGES.map((lang) => [lang, statementIn(lang)])),
  cv: Object.fromEntries(LANGUAGES.map((lang) => [lang, career(lang)])),
  pages: {
    cv: { en: `${ORIGIN}/cv/`, es: `${ORIGIN}/es/cv/` },
    statement: { en: `${ORIGIN}/about/`, es: `${ORIGIN}/es/about/` },
    catalogue: `${ORIGIN}/catalogue.json`,
    contact: `${ORIGIN}/contact/`,
  },
  generated: new Date().toISOString().slice(0, 10),
  pricing: `Not published. Every price is quoted by the artist for the particular work: ${ORIGIN}/contact`,
};

const written = JSON.stringify(artist, null, 2);

// The same two rules the catalogue is held to, for the same reasons.
const billed = written.match(/storage\.googleapis\.com|\.mp4\b|\.mov\b/);
if (billed) throw new Error(`artist.json names ${billed[0]}, which is served at a cost`);
const priced = written.match(/"(price|priceCurrency|lowPrice|highPrice)"\s*:|[€$£]\s?\d/);
if (priced) throw new Error(`artist.json carries ${priced[0]}; the artist quotes by hand`);

await writeFile(OUTPUT, `${written}\n`, 'utf8');
const entries = artist.cv.en.reduce((count, section) => count + section.items.length, 0);
console.log(`artist: ${artist.cv.en.length} sections, ${entries} entries -> ${OUTPUT}`);
