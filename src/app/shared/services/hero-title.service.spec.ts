import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeroTitleService } from './hero-title.service';

/**
 * Which pages hide the top bar's copy of the artist's name.
 *
 * The landing page carries the name itself, at size, so the bar's copy is
 * redundant there and nowhere else. This used to start false and be corrected
 * by the landing page's constructor a moment later — which put the brand on
 * screen and took it off again, wrapping the toolbar onto a second row on a
 * phone and moving the page 36 pixels. The answer is in the address, and the
 * address is known before anything is drawn.
 */
describe('HeroTitleService', () => {
  const at = (url: string): HeroTitleService => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: { url } }],
    });
    return TestBed.inject(HeroTitleService);
  };

  it('hides the bar brand on the landing page before anything is drawn', () => {
    expect(at('/').visible()).toBe(true);
  });

  // Both languages: the Spanish landing page is `/es`, and the router reports
  // it with and without its trailing slash depending on how it was reached.
  it('hides it on the Spanish landing page too, slash or no slash', () => {
    expect(at('/es').visible()).toBe(true);
    expect(at('/es/').visible()).toBe(true);
  });

  it('shows it everywhere else', () => {
    for (const url of ['/about', '/es/about', '/artworks', '/artwork/66', '/publish']) {
      expect(at(url).visible()).toBe(false);
    }
  });

  // `/esta-pagina` is not the Spanish landing page, and a prefix match would
  // say it was.
  it('is not fooled by a page whose name begins with the language', () => {
    expect(at('/estudio').visible()).toBe(false);
  });

  it('ignores a query string and a fragment', () => {
    expect(at('/?from=instagram').visible()).toBe(true);
    expect(at('/es#top').visible()).toBe(true);
    expect(at('/artworks?years=2024').visible()).toBe(false);
  });
});
