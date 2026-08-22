import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterStateSnapshot } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { SeoTitleStrategy } from './seo-title.strategy';

// This produces the canonical, the hreflang pair and the structured data on
// every one of the site's prerendered pages. The build checks the output, but
// only after prerendering all of them; these catch the same faults in a second.
describe('SeoTitleStrategy', () => {
  let strategy: SeoTitleStrategy;
  let router: Router;
  let document: Document;

  const navigateTo = async (url: string) => {
    await router.navigateByUrl(url);
    strategy.updateTitle(router.routerState.snapshot as RouterStateSnapshot);
    TestBed.tick();
  };

  const linkHref = (selector: string) =>
    document.head.querySelector<HTMLLinkElement>(selector)?.getAttribute('href');

  const jsonLd = (id: string) => {
    const script = document.head.querySelector(`#${id}`);
    return script ? JSON.parse(script.textContent ?? '{}') : null;
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideTranslateService(),
        provideRouter([
          { path: '', children: [{ path: 'about', children: [], title: 'seo.about.title' }] },
          { path: 'es', children: [{ path: 'about', children: [], title: 'seo.about.title' }] },
        ]),
      ],
    });

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', { seo: { about: { title: 'Statement' }, default: { description: 'Contemporary art.' } } });
    translate.use('en');

    strategy = TestBed.inject(SeoTitleStrategy);
    router = TestBed.inject(Router);
    document = TestBed.inject(DOCUMENT);
    document.head.querySelectorAll('link[rel="canonical"], link[rel="alternate"], script[type="application/ld+json"]').forEach((n) => n.remove());
  });

  it('gives the page a title of its own rather than the site name alone', async () => {
    await navigateTo('/about');
    expect(document.title).toContain('Statement');
    expect(document.title).toContain('Juanma Moreno Sánchez');
  });

  // GitHub Pages serves /about/ and redirects the bare path to it, so a
  // canonical without the slash points every page at a redirect.
  it('declares a canonical that matches the address, with its trailing slash', async () => {
    await navigateTo('/about');
    expect(linkHref('link[rel="canonical"]')).toBe('https://juanmamoreno.com/about/');
  });

  it('canonicalises the Spanish page to itself, not to the English one', async () => {
    await navigateTo('/es/about');
    expect(linkHref('link[rel="canonical"]')).toBe('https://juanmamoreno.com/es/about/');
  });

  it('pairs each page with its translation in both directions', async () => {
    await navigateTo('/about');
    expect(linkHref('link[hreflang="en"]')).toBe('https://juanmamoreno.com/about/');
    expect(linkHref('link[hreflang="es"]')).toBe('https://juanmamoreno.com/es/about/');
    expect(linkHref('link[hreflang="x-default"]')).toBe('https://juanmamoreno.com/about/');

    // The Spanish page must point at the same pair, not at itself twice.
    await navigateTo('/es/about');
    expect(linkHref('link[hreflang="en"]')).toBe('https://juanmamoreno.com/about/');
    expect(linkHref('link[hreflang="es"]')).toBe('https://juanmamoreno.com/es/about/');
  });

  it('leaves exactly one canonical and one set of alternates behind', async () => {
    await navigateTo('/about');
    await navigateTo('/es/about');

    expect(document.head.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(document.head.querySelectorAll('link[rel="alternate"][hreflang]').length).toBe(3);
  });

  describe('artwork structured data', () => {
    const artwork = {
      name: 'Secuestro en la rave',
      url: 'https://juanmamoreno.com/artwork/152/',
      image: 'https://example.test/152.jpg',
      description: 'A gathering in a forest clearing.',
      year: '2024',
      medium: 'Oil on canvas',
      width: '130',
      height: '130',
      unit: 'cm',
    };

    it('describes the artwork and who made it', async () => {
      await navigateTo('/about');
      strategy.setArtworkStructuredData(artwork);

      const data = jsonLd('artwork-structured-data');
      expect(data['@type']).toBe('VisualArtwork');
      expect(data.name).toBe(artwork.name);
      expect(data.dateCreated).toBe('2024');
      expect(data.artMedium).toBe('Oil on canvas');
      expect(data.width).toEqual({ '@type': 'Distance', name: '130 cm' });
      expect(data.creator.name).toBe('Juanma Moreno Sánchez');
    });

    it('places the artwork in a trail from the home page', async () => {
      await navigateTo('/about');
      strategy.setArtworkStructuredData(artwork);

      const trail = jsonLd('breadcrumb-structured-data');
      expect(trail['@type']).toBe('BreadcrumbList');
      expect(trail.itemListElement).toHaveLength(3);
      expect(trail.itemListElement[2].name).toBe(artwork.name);
      expect(trail.itemListElement.map((item: { position: number }) => item.position)).toEqual([1, 2, 3]);
    });

    it('localises the trail for a Spanish artwork', async () => {
      await navigateTo('/es/about');
      strategy.setArtworkStructuredData({ ...artwork, url: 'https://juanmamoreno.com/es/artwork/152/' });

      const trail = jsonLd('breadcrumb-structured-data');
      expect(trail.itemListElement[0].name).toBe('Inicio');
      expect(trail.itemListElement[1].item).toContain('/es/artworks/');
    });

    // Otherwise an artwork's markup would follow the reader onto the next page.
    it('clears the artwork markup when navigating away', async () => {
      await navigateTo('/about');
      strategy.setArtworkStructuredData(artwork);
      expect(jsonLd('artwork-structured-data')).not.toBeNull();

      await navigateTo('/es/about');
      expect(document.head.querySelector('#artwork-structured-data')).toBeNull();
      expect(document.head.querySelector('#breadcrumb-structured-data')).toBeNull();
    });

    it('omits measurements it does not have rather than emitting empty ones', async () => {
      await navigateTo('/about');
      strategy.setArtworkStructuredData({ ...artwork, width: '', height: '', medium: '' });

      const data = jsonLd('artwork-structured-data');
      expect(data.width).toBeUndefined();
      expect(data.artMedium).toBeUndefined();
      expect(data.name).toBe(artwork.name);
    });
  });
});
