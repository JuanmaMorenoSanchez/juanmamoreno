import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { englishRoute, readerLanguage, spanishRoute } from './language.guard';

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

/**
 * The page says which language it is written in.
 *
 * `index.html` carries `lang="en"` and nothing ever said otherwise, so all 402
 * prerendered pages declared English — the Spanish half included. The words
 * were right and the hreflang pair was right, so nothing on the page looked
 * wrong: only a screen reader, which took its pronunciation from the
 * attribute and read his Spanish with English phonemes, a search engine, and
 * the hyphenation rules the headings now depend on.
 *
 * Settled in the guard because the site is readable without javascript: it has
 * to be in the html that is served, which means it has to happen while the
 * page is being prerendered, before anything renders.
 */
describe('the language the page declares', () => {
  const run = (guard: () => unknown, stored?: string) => {
    TestBed.resetTestingModule();
    try {
      if (stored) window.localStorage.setItem('juanmamoreno.language', stored);
      else window.localStorage.removeItem('juanmamoreno.language');
    } catch {
      // Storage disabled; only the reader's-choice case depends on it.
    }
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: TranslateService, useValue: { use: () => {} } }],
    });
    // Neither answer, so a guard that writes nothing fails rather than
    // inheriting whatever the last test left behind — which is `en`, and is
    // the right answer half the time by accident.
    document.documentElement.lang = 'xx';
    TestBed.runInInjectionContext(guard);
    return document.documentElement.lang;
  };

  afterEach(() => {
    document.documentElement.lang = 'en';
  });

  it('says es on a Spanish page', () => {
    expect(run(spanishRoute as () => unknown)).toBe('es');
  });

  it('says en on an English page', () => {
    expect(
      run(() => englishRoute({} as ActivatedRouteSnapshot, { url: '/artworks' } as RouterStateSnapshot))
    ).toBe('en');
  });

  /** The studio and the door carry no language in the address; the reader's
      choice decides, and the attribute has to follow it there too. */
  it('follows the reader on a page whose address says nothing', () => {
    expect(run(readerLanguage as () => unknown, 'es-ES')).toBe('es');
  });

  /**
   * Not the enum's own value. `en-EN` is this app's key for the English
   * dictionary and names no region anybody has registered; `lang` is read as a
   * real BCP-47 tag, and the hreflang pair already uses the bare subtag.
   */
  it('uses the bare subtag, not the dictionary key', () => {
    expect(['en', 'es']).toContain(run(spanishRoute as () => unknown));
  });
});
