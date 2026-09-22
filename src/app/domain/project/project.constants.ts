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
