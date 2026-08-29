/**
 * Where a painting has been found on the internet, gathered by the site it was
 * found on.
 *
 * A reverse image search answers with pages, not with places, and one place can
 * be a great many pages: a painting used as a record sleeve turns up once for
 * every listener who saved it. Listed flat, fifty pages from one site read as
 * fifty discoveries, and the one genuinely new site is lost among them.
 */

export interface LinkGroup {
  /** The site, without the www: what a reader would call the place. */
  domain: string;
  links: string[];
}

/**
 * Groups the pages by site, the busiest site first.
 *
 * Ties are broken alphabetically so the order does not shuffle between two
 * visits that found the same things — a list that reorders itself for no reason
 * looks like it changed when it did not.
 */
export function groupLinksByDomain(links: readonly string[]): LinkGroup[] {
  const groups = new Map<string, string[]>();

  for (const link of links) {
    const domain = domainOf(link);
    if (!domain) continue;

    const found = groups.get(domain);
    if (found) found.push(link);
    else groups.set(domain, [link]);
  }

  return [...groups.entries()]
    .map(([domain, grouped]) => ({ domain, links: grouped }))
    .sort((a, b) => b.links.length - a.links.length || a.domain.localeCompare(b.domain));
}

/**
 * The site a page belongs to.
 *
 * `www` is dropped because nobody reads it as part of the name, and a site that
 * answers on both spellings would otherwise be counted as two places.
 */
export function domainOf(link: string): string {
  try {
    return new URL(link).hostname.replace(/^www\./i, '');
  } catch {
    return '';
  }
}

/** How a single page reads once its site is already named above it. */
export function pathOf(link: string): string {
  try {
    const { pathname, search } = new URL(link);
    const path = `${pathname}${search}`.replace(/\/$/, '');
    return path || '/';
  } catch {
    return link;
  }
}
