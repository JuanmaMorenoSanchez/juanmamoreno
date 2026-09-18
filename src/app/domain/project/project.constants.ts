/**
 * The shape of the page about running this product, as data.
 *
 * Only the structure and the figures live here; every word is a translation
 * key, because the page is read in two languages like the rest of the site.
 *
 * The numbers are counted rather than claimed, and the commands that count them
 * are named beside each one so the page can be checked instead of believed.
 */

export interface ProjectFigure {
  /** Counted, not estimated. */
  value: string;
  /** The translation key for what it counts. */
  label: string;
}

/**
 * Counted on 17 September 2026:
 * - requirements: 101 in this repository + 46 in the service's own
 * - operator: one, which is the whole point of the second figure
 */
export const PROJECT_FIGURES: ProjectFigure[] = [
  { value: '147', label: 'project.figures.requirements' },
  { value: '1', label: 'project.figures.operator' },
];

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
