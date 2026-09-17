import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { englishRoute } from './language.guard';

/**
 * The reader who has asked for Spanish, arriving at an address with no
 * language in it. The guard sends them to the Spanish twin of wherever they
 * were going.
 */
describe('englishRoute', () => {
  const at = (url: string, spanish = true) => {
    TestBed.resetTestingModule();
    try {
      if (spanish) window.localStorage.setItem('juanmamoreno.language', 'es-ES');
      else window.localStorage.removeItem('juanmamoreno.language');
    } catch {
      // Storage disabled: the browser-language fallback decides instead, and
      // these tests would be meaningless, so let them fail loudly rather than
      // pass for the wrong reason.
    }
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: TranslateService, useValue: { use: () => {} } }],
    });
    return TestBed.runInInjectionContext(() =>
      englishRoute({} as ActivatedRouteSnapshot, { url } as RouterStateSnapshot)
    );
  };

  it('sends a page to the same page under /es', () => {
    expect(String(at('/artworks'))).toBe('/es/artworks');
  });

  it('sends the root to /es, with no slash after it', () => {
    expect(String(at('/'))).toBe('/es');
  });

  /**
   * The one that mattered. `/es/` is read by the router as the segments
   * ["es", ""], which matches no route and draws the 404 page — so a root
   * address carrying anything at all became `/es/?…` and every Spanish reader
   * following the link in the Instagram profile was shown a 404. Instagram and
   * Facebook append tracking parameters to every link they hand out, so the
   * address that worked when typed by hand never reached anybody that way.
   */
  it('keeps the root slashless when the link carries tracking parameters', () => {
    const tree = at('/?utm_source=ig&utm_medium=social&fbclid=PAb21j');

    expect(String(tree)).toBe('/es?utm_source=ig&utm_medium=social&fbclid=PAb21j');
    expect(String(tree)).not.toContain('/es/');
    // The segments the router will actually match on: "es" and nothing else.
    expect((tree as UrlTree).root.children['primary'].segments.map((s) => s.path)).toEqual(['es']);
  });

  it('does the same for a fragment', () => {
    expect(String(at('/#work'))).toBe('/es#work');
  });

  it('leaves an English reader where they are', () => {
    expect(at('/artworks', false)).toBe(true);
  });
});
