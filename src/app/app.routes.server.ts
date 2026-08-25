import { environment } from '@environments/environment';
import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Every artwork in the catalogue, so each gets its own prerendered page rather
 * than the 404 GitHub Pages returns for a path with no file behind it.
 *
 * The essays are not written here: the critic request carries `generate=false`
 * when it comes from a build (see ArtworkInfraService), so a page ships the
 * essay only if one already exists, and picks it up at a later build otherwise.
 */
export async function artworkTokenIds(): Promise<string[]> {
  const response = await fetch(`${environment.backendUrl}nfts-snapshot`);
  const body = (await response.json()) as { data?: { tokenId?: string }[] };
  return (body.data ?? []).map((nft) => nft.tokenId).filter((id): id is string => !!id);
}

const artworkParams = async () => (await artworkTokenIds()).map((id) => ({ id }));

export const serverRoutes: ServerRoute[] = [
  // Both languages: /artwork/5 carries the English essay, /es/artwork/5 the
  // Spanish one, and each is a page in its own right.
  { path: 'artwork/:id', renderMode: RenderMode.Prerender, getPrerenderParams: artworkParams },
  { path: 'es/artwork/:id', renderMode: RenderMode.Prerender, getPrerenderParams: artworkParams },
  // Never prerendered. The studio's guard would run at build time, where there
  // is no signed-in anyone, and a prerendered file would put the admin pages in
  // the sitemap and in front of crawlers. Reached through the 404 fallback, so
  // the browser routes to them normally while the site has no page to show for
  // them at all.
  { path: 'door', renderMode: RenderMode.Client },
  { path: 'studio', renderMode: RenderMode.Client },
  // The generative pieces are p5-style canvases: nothing to prerender, and
  // they need a real browser to exist at all.
  { path: 'generative/:id', renderMode: RenderMode.Client },
  { path: 'es/generative/:id', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Prerender },
];
