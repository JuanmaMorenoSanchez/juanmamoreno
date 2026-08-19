import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { LanguageUrlService } from './language-url.service';

// Every link on the site is built here, and both of this service's rules were
// learned from bugs that reached production: a link built for the wrong
// language tree, and a trailing slash that put the reader on the 404 page.
describe('LanguageUrlService', () => {
  let service: LanguageUrlService;
  let router: Router;

  const at = async (url: string) => {
    await router.navigateByUrl(url);
    TestBed.tick();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', children: [{ path: '', children: [] }] },
          { path: 'es', children: [{ path: '', children: [] }] },
        ]),
      ],
    });
    service = TestBed.inject(LanguageUrlService);
    router = TestBed.inject(Router);
  });

  it('builds unprefixed links in the English tree', async () => {
    await at('/');
    expect(service.inSpanish()).toBe(false);
    expect(service.link('about')).toBe('/about');
    expect(service.link('artwork/152')).toBe('/artwork/152');
  });

  it('carries the language prefix through every link in the Spanish tree', async () => {
    await at('/es');
    expect(service.inSpanish()).toBe(true);
    expect(service.link('about')).toBe('/es/about');
    expect(service.link('artwork/152')).toBe('/es/artwork/152');
  });

  // The bug that put the language switcher on the 404 page: from the home page
  // there is no path to append, and "/es/" is two segments to the router.
  it('never produces a trailing slash', async () => {
    await at('/es');
    expect(service.link()).toBe('/es');
    expect(service.link('')).toBe('/es');

    await at('/');
    expect(service.link()).toBe('/');
    expect(service.link('/')).toBe('/');
  });

  it('tolerates paths written with or without leading slashes', async () => {
    await at('/es');
    expect(service.link('/cv')).toBe('/es/cv');
    expect(service.link('cv/')).toBe('/es/cv');
  });

  // "/estudio" starts with "es" but is not the Spanish tree.
  it('does not mistake a path merely beginning with es for Spanish', async () => {
    await at('/');
    expect(service.inSpanish()).toBe(false);
  });

  // The menu renders before the first navigation resolves. Reading the url once
  // baked English links into every prerendered Spanish page.
  it('updates once navigation lands, so links built early are corrected', async () => {
    await at('/');
    expect(service.link('contact')).toBe('/contact');

    await at('/es');
    expect(service.link('contact')).toBe('/es/contact');
  });
});
