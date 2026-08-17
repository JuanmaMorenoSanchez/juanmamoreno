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

export const serverRoutes: ServerRoute[] = [
  {
    path: 'artwork/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => (await artworkTokenIds()).map((id) => ({ id })),
  },
  // The generative pieces are p5-style canvases: nothing to prerender, and
  // they need a real browser to exist at all.
  { path: 'generative/:id', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Prerender },
];
