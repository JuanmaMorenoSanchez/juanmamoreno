import { Route } from '@angular/router';
import { RenderMode } from '@angular/ssr';
import { routes } from './app-routing.module';
import { serverRoutes } from './app.routes.server';

/**
 * The route table, read as data.
 *
 * It asserts what is declared rather than driving the router, deliberately:
 * every one of these paths lazily loads a guarded page, and standing those up
 * would mean providing the whole application to find out whether one line of
 * the table is still there. What this catches is the realistic regression — an
 * entry deleted or a path renamed — not whether Angular honours a `redirectTo`,
 * which is Angular's business.
 */
describe('the route table', () => {
  function at(path: string): Route | undefined {
    return routes.find((route) => route.path === path);
  }

  /**
   * It was `/studio` until the atelier arrived and the two names read as the
   * same room: one is where a photograph becomes a certificate, the other where
   * a painting is cut into layers.
   */
  it('prepares certificates at /mint', () => {
    const mint = at('mint');

    expect(mint).toBeDefined();
    expect(mint?.loadComponent).toBeDefined();
    expect(mint?.data?.['title']).toBe('Mint');
    // Guarded, and never offered to a reader.
    expect(mint?.canActivate).toHaveLength(2);
    expect(mint?.data?.['noindex']).toBe(true);
  });

  /**
   * He has the old address in his bookmarks, and a page that was renamed should
   * not become a 404 for the one person who uses it.
   */
  it('still answers at the old address, by sending it to the new one', () => {
    expect(at('studio')?.redirectTo).toBe('/mint');
    expect(at('es/studio')?.redirectTo).toBe('/mint');
  });

  /** The old address redirects; it does not still render anything of its own. */
  it('no longer draws a page at the old address', () => {
    expect(at('studio')?.loadComponent).toBeUndefined();
    expect(at('studio')?.component).toBeUndefined();
  });

  /**
   * The page is written in one language and exists at one address, but the
   * switcher builds `/es/<wherever you are>` from the address alone — so the
   * Spanish twin has to lead somewhere rather than 404.
   */
  it('sends the Spanish address of every one-language page back to it', () => {
    for (const [spanish, english] of [
      ['es/mint', '/mint'],
      ['es/door', '/door'],
      ['es/publish', '/publish'],
      ['es/pendingmint', '/pendingmint'],
      ['es/catalogue', '/catalogue'],
      ['es/atelier', '/atelier'],
    ]) {
      expect(at(spanish)?.redirectTo).toBe(english);
    }
  });

  /**
   * Those redirects have to be declared before the `es` parent, which would
   * otherwise claim the prefix and fail on the child — the fault that made
   * every Spanish admin address a 404.
   */
  it('declares them before the parent that would swallow them', () => {
    const parent = routes.findIndex((route) => route.path === 'es');

    expect(parent).toBeGreaterThan(-1);
    for (const spanish of ['es/mint', 'es/studio', 'es/door', 'es/atelier']) {
      expect(routes.findIndex((route) => route.path === spanish)).toBeLessThan(parent);
    }
  });

  /**
   * A redirect has nothing to render, so the prerenderer writes it out as a
   * file with no canonical, no hreflang and no text — and then `verify-render`
   * fails the build on three counts for each one.
   *
   * That is exactly what happened when `/studio` became a redirect and kept its
   * old name out of this list. The build caught it, which is the system working;
   * this catches it one step earlier.
   */
  it('keeps every redirect out of the prerender', () => {
    const clientSide = new Set(
      serverRoutes
        .filter((route) => route.renderMode === RenderMode.Client)
        .map((route) => route.path)
    );

    for (const route of routes) {
      if (!route.redirectTo || !route.path) continue;
      expect(clientSide.has(route.path)).toBe(true);
    }
  });
});
