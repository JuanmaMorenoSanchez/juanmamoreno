/**
 * Recognising a link that points back at one of the artist's own paintings.
 *
 * The essays cite other works in the catalogue, and they cite them by their
 * full public address because that is what the text is written to be — quotable
 * anywhere, not only inside this application. So a link to a painting arrives
 * as `https://www.juanmamoreno.com/artwork/134`, and something has to tell that
 * apart from a link to a museum.
 */

/** Every spelling of the site's own address. */
const OWN_HOSTS = ['juanmamoreno.com', 'www.juanmamoreno.com'];

/** `/artwork/134` or `/es/artwork/134`, with or without a trailing slash. */
const ARTWORK_PATH = /^\/(?:es\/)?artwork\/(\d+)\/?$/;

/**
 * The token id a link points at, or null if it points anywhere else.
 *
 * Relative links are read as our own, since only our own pages are written
 * that way. Anything on another host is somebody else's, however it is spelled.
 */
export function artworkTokenIdFrom(href: string): string | null {
  if (!href) return null;

  const path = pathOfOwnLink(href);
  if (!path) return null;

  return ARTWORK_PATH.exec(path)?.[1] ?? null;
}

function pathOfOwnLink(href: string): string | null {
  if (href.startsWith('/')) return href.split('?')[0].split('#')[0];

  try {
    const url = new URL(href);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    return OWN_HOSTS.includes(url.hostname.toLowerCase()) ? url.pathname : null;
  } catch {
    return null;
  }
}
