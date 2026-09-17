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

export interface ProjectDecision {
  /** Translation keys under `project.decisions.<name>`. */
  key: string;
}

/**
 * Counted on 17 September 2026:
 * - requirements: 101 in this repository + 46 in the service's own
 * - releases: entries in the two changelogs, 109 + 71
 * - without an automated proof: reported by the build's own requirements check
 */
export const PROJECT_FIGURES: ProjectFigure[] = [
  { value: '147', label: 'project.figures.requirements' },
  { value: '180', label: 'project.figures.releases' },
  { value: '25', label: 'project.figures.unproven' },
  { value: '1', label: 'project.figures.operator' },
];

/**
 * In the order they are worth reading, which is not the order they happened.
 * The one that went wrong is third rather than last: it is the most useful of
 * them and burying it at the end would be a way of hiding it politely.
 */
export const PROJECT_DECISIONS: ProjectDecision[] = [
  { key: 'prices' },
  { key: 'model' },
  { key: 'reel' },
  { key: 'freeze' },
  { key: 'key' },
];

/** The public half. The service is in a private repository and stays unnamed. */
export const PROJECT_REPO = 'https://github.com/JuanmaMorenoSanchez/juanmamoreno';
export const PROJECT_REQUIREMENTS = `${PROJECT_REPO}/blob/master/REQUIREMENTS.md`;
export const PROJECT_CHANGELOG = `${PROJECT_REPO}/blob/master/CHANGELOG.md`;
