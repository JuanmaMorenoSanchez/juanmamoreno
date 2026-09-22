/**
 * The shape of the page about running this product, as data.
 *
 * Only the structure lives here; every word is a translation key, because the
 * page is read in two languages like the rest of the site — and because the
 * text is the artist's own, edited in a file and put back where it came from.
 *
 * It used to hold two counted figures as well. He took them off the page.
 */

/**
 * What the product is for, in the order the three were built: the certificates
 * first, the catalogue that shows them second, and the tooling that keeps both
 * fed third. Each needed the one before it to exist.
 */
export const PROJECT_GOALS = ['one', 'two', 'three'] as const;

/** The public half. The service is in a private repository and stays unnamed. */
export const PROJECT_REPO = 'https://github.com/JuanmaMorenoSanchez/juanmamoreno';
export const PROJECT_REQUIREMENTS = `${PROJECT_REPO}/blob/master/REQUIREMENTS.md`;
export const PROJECT_CHANGELOG = `${PROJECT_REPO}/blob/master/CHANGELOG.md`;

/** One line of a map: an address, and what is at it. */
export interface MapEntry {
  at: string;
  label: string;
}

/**
 * The addresses of the site, as a reader can reach them.
 *
 * Only the public ones. Every address behind the admin credential is left off
 * on purpose — a map is a useful thing to publish and a list of the doors is
 * not — and the map says so rather than leaving a gap nobody can see.
 *
 * Each of these exists twice, once under `/es`, which the map states once
 * instead of drawing twenty boxes.
 */
export const PROJECT_ROUTES: MapEntry[] = [
  { at: '/', label: 'project.map.home' },
  { at: '/artworks', label: 'project.map.catalogue' },
  { at: '/artwork/:id', label: 'project.map.artwork' },
  { at: '/generative/:id', label: 'project.map.generative' },
  { at: '/texts', label: 'project.map.texts' },
  { at: '/cv', label: 'project.map.cv' },
  { at: '/about', label: 'project.map.statement' },
  { at: '/contact', label: 'project.map.contact' },
  { at: '/about-certificates-project', label: 'project.map.thisPage' },
  { at: '/terms · /privacy', label: 'project.map.legal' },
];

/**
 * What the site publishes as files, for readers that are not people. Served by
 * the same static host as the pages, so they cost nothing to answer.
 */
export const PROJECT_FILES: MapEntry[] = [
  { at: '/catalogue.json', label: 'project.map.catalogueFile' },
  { at: '/artist.json', label: 'project.map.artistFile' },
  { at: '/llms.txt', label: 'project.map.llms' },
  { at: '/sitemap.xml · /robots.txt', label: 'project.map.sitemap' },
];

/**
 * The addresses of the service anybody may call.
 *
 * The rest of it — everything that writes, and everything the nightly job runs
 * — answers only with a credential, and is one line at the foot of the map
 * rather than a list. Which routes exist is not a secret; enumerating them for
 * somebody looking for a way in is a favour nobody needs to do.
 */
export const PROJECT_ENDPOINTS: MapEntry[] = [
  { at: 'GET /nfts-snapshot', label: 'project.map.snapshot' },
  { at: 'GET /critics/:id', label: 'project.map.critics' },
  { at: 'GET /descriptions/:id', label: 'project.map.descriptions' },
  { at: 'GET /availability', label: 'project.map.availability' },
  { at: 'GET /certificates/mints', label: 'project.map.mints' },
  { at: 'GET /vision/search/:id', label: 'project.map.vision' },
  { at: 'GET /posts/latest', label: 'project.map.posts' },
  { at: 'POST /contact', label: 'project.map.contactApi' },
  { at: 'POST /mcp', label: 'project.map.mcp' },
];
