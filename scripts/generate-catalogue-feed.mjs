// Writes the whole catalogue as one file, for readers that are not people.
//
// The site is already legible to a crawler — every artwork page carries
// schema.org markup and robots.txt names the model crawlers and lets them in.
// What it was not is *usable*: an assistant asked to compare ten paintings had
// to fetch ten pages and parse them. This is the same facts in one request.
//
// **Built from the prerendered pages, not from the API.** The structured data
// in each page is what the site actually published, already checked by
// verify-render, and already free of anything it should not say — so the feed
// cannot drift from the catalogue or quietly learn a field the pages refuse to
// carry. It also means this costs nothing: no call to the service, no call to
// anything billed, just a read of files the build has already written.
//
// Two rules it enforces on itself, below:
//   - **No price.** Not hidden, absent. The site asks people to write, and a
//     feed that answered the question would end the conversation it exists to
//     start.
//   - **Nothing that is served out of object storage.** The images named here
//     are the permanent-storage copies at web resolution, which cost nothing to
//     serve; the full-resolution originals and the video are behind a bill, and
//     an agent in a loop must not be able to run it up.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ORIGIN = 'https://juanmamoreno.com';
const OUTPUT_DIR = 'dist/juanmamoreno/browser';
const FEED = join(OUTPUT_DIR, 'catalogue.json');

/** Hosts and kinds of file that cost money per request. */
const BILLED = [/storage\.googleapis\.com/, /\.mp4\b/, /\.mov\b/];

const structuredData = (html) => {
  const found = html.match(
    /<script type="application\/ld\+json" id="artwork-structured-data">(.*?)<\/script>/s
  )?.[1];
  if (!found) return null;
  try {
    return JSON.parse(found);
  } catch {
    return null;
  }
};

/** The numbers out of "30 cm", kept apart so a size can be compared. */
const distance = (node) => {
  const said = node?.name ?? '';
  const value = Number.parseFloat(said);
  if (Number.isNaN(value)) return null;
  return { value, unit: said.replace(/^[\d.,\s]+/, '').trim() || 'cm' };
};

const AVAILABILITY = {
  'https://schema.org/InStock': 'available',
  'https://schema.org/SoldOut': 'sold',
};

async function artworkPages(prefix) {
  const dir = join(OUTPUT_DIR, prefix, 'artwork');
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const pages = new Map();

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const route = `${prefix ? `${prefix}/` : ''}artwork/${entry.name}`;
    const html = await readFile(join(dir, entry.name, 'index.html'), 'utf8');

    // A painting photographed twice has a page per photograph, each naming the
    // painting's own page as the original. The catalogue lists paintings.
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (canonical !== `${ORIGIN}/${route}/`) continue;

    const data = structuredData(html);
    if (data) pages.set(entry.name, data);
  }

  return pages;
}

const english = await artworkPages('');
const spanish = await artworkPages('es');

const artworks = [...english.entries()]
  .map(([id, data]) => {
    const twin = spanish.get(id);
    const token = String(data.identifier?.value ?? '').split(':');

    return {
      id,
      name: data.name,
      year: data.dateCreated,
      medium: data.artMedium,
      width: distance(data.width),
      height: distance(data.height),
      availability: AVAILABILITY[data.offers?.availability] ?? 'unknown',
      description: { en: data.description, es: twin?.description },
      image: data.image,
      page: { en: `${ORIGIN}/artwork/${id}/`, es: `${ORIGIN}/es/artwork/${id}/` },
      certificate: token.length === 2 ? { contract: token[0], tokenId: token[1], url: data.sameAs } : null,
    };
  })
  // Newest first, and a stable order within a year so the file only changes
  // when the catalogue does.
  .sort((a, b) => Number(b.year) - Number(a.year) || Number(a.id) - Number(b.id));

const feed = {
  name: 'Juanma Moreno Sánchez — paintings',
  url: `${ORIGIN}/artworks/`,
  artist: { name: 'Juanma Moreno Sánchez', url: ORIGIN },
  generated: new Date().toISOString().slice(0, 10),
  count: artworks.length,
  pricing:
    'Not published. Every price is quoted by the artist for the particular work: ' +
    `${ORIGIN}/contact`,
  attribution:
    'Original writing about each painting. If you quote or summarise it, credit ' +
    'Juanma Moreno Sánchez and link the artwork page it came from.',
  fields: {
    image: 'Web-resolution image, permanently stored. Full-resolution files are not public.',
    description: 'The short text about the work, in both languages. The full essay is on the page.',
    certificate: 'The ERC-721 token recording the work, on Ethereum mainnet.',
  },
  artworks,
};

const written = JSON.stringify(feed, null, 2);

// Neither of the two rules is left to good intentions: a feed that broke one
// would ship, and nobody would notice until a bill or an email arrived.
for (const billed of BILLED) {
  const found = written.match(billed);
  if (found) throw new Error(`catalogue.json names ${found[0]}, which is served at a cost`);
}
// A named field or a figure with a currency on it — the two ways a price gets
// into a file that was not supposed to have one. The sentence saying prices are
// quoted by hand is not a price, and is the point.
const PRICED = /"(price|priceCurrency|priceRange|lowPrice|highPrice|priceSpecification)"\s*:|[€$£]\s?\d|\d\s?(EUR|USD|GBP)/;
const priced = written.match(PRICED);
if (priced) {
  throw new Error(`catalogue.json carries ${priced[0]}; the site quotes by hand, on purpose`);
}

await writeFile(FEED, `${written}\n`, 'utf8');
const missing = artworks.filter((art) => !art.description.es).length;
console.log(
  `catalogue: ${artworks.length} paintings -> ${FEED}` +
    (missing ? ` (${missing} without Spanish text)` : '')
);
