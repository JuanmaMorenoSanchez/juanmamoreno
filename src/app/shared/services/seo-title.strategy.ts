import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

const SITE_NAME = 'Juanma Moreno Sánchez';
const SITE_URL = 'https://juanmamoreno.com';
// Route `title` / `data.description` hold translation keys; the fallback is one too.
const DEFAULT_DESCRIPTION_KEY = 'seo.default.description';
const ARTWORK_JSON_LD_ID = 'artwork-structured-data';
const BREADCRUMB_JSON_LD_ID = 'breadcrumb-structured-data';
const ESSAY_JSON_LD_ID = 'essay-structured-data';

export interface EssayStructuredData {
  /** The essay's own title, which is not the painting's name. */
  headline: string;
  /** The painting it is about, and where that painting lives. */
  artworkName: string;
  url: string;
  language: string;
  published?: string;
  modified?: string;
}

export interface ArtworkStructuredData {
  name: string;
  url: string;
  image?: string;
  description?: string;
  year: string;
  medium: string;
  width: string;
  height: string;
  unit: string;
}

/**
 * Keeps each route's <title>, meta description, canonical link and Open Graph /
 * Twitter tags in sync as the user navigates, so every page is distinct to
 * search engines instead of sharing the single set baked into index.html
 * (duplicate titles/descriptions are a common SPA SEO problem). Route `title`
 * and `data.description` provide the copy; dynamic pages — an artwork, a sketch
 * — refine the title from the loaded content via {@link setPageTitle}.
 */
@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly translate = inject(TranslateService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    // Route `title` and `data.description` are translation keys, resolved in the
    // active language (translations are registered at bootstrap, before the
    // first navigation, so `instant` is populated).
    const titleKey = this.buildTitle(snapshot);
    const routeTitle = titleKey ? this.translate.instant(titleKey) : '';
    const pageTitle = routeTitle ? `${routeTitle} · ${SITE_NAME}` : `${SITE_NAME} — artist`;
    const descriptionKey = this.deepestDescription(snapshot.root) ?? DEFAULT_DESCRIPTION_KEY;
    const description = this.translate.instant(descriptionKey);
    const url = this.absoluteUrl(snapshot.url);

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.setCanonical(url);
    this.setLanguageAlternates(snapshot.url);
    this.setLocale(snapshot.url);
    // Every page is one of two, and the type is only ever raised above this by
    // a page that knows it is something more particular.
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.setRobots(this.deepestData(snapshot.root, 'noindex') === true);
    // Belongs to whichever artwork page we just left, not to this one.
    this.clearArtworkStructuredData();
  }

  /**
   * Which language this page is in, and which other one it exists in.
   *
   * Facebook, WhatsApp and the rest read this rather than the hreflang tags,
   * so without it a Spanish page shared into a Spanish conversation was
   * previewed with no language attached at all.
   */
  private setLocale(routerUrl: string): void {
    const path = routerUrl
      .split('?')[0]
      .split('#')[0]
      .replace(/^\/+|\/+$/g, '');
    const spanish = path === 'es' || path.startsWith('es/');

    this.meta.updateTag({ property: 'og:locale', content: spanish ? 'es_ES' : 'en_GB' });
    this.meta.updateTag({
      property: 'og:locale:alternate',
      content: spanish ? 'en_GB' : 'es_ES',
    });
  }

  /**
   * Pairs a page with its translation.
   *
   * The same artwork exists at /artwork/5 and /es/artwork/5 with the essay in
   * either language. Left unpaired the two read as near-duplicates competing
   * with each other; hreflang says they are one work in two languages, and
   * lets a Spanish reader be sent to the Spanish one. x-default points at the
   * English page, which is the one to fall back to for any other language.
   */
  private setLanguageAlternates(routerUrl: string): void {
    const path = routerUrl
      .split('?')[0]
      .split('#')[0]
      .replace(/^\/+|\/+$/g, '');
    const bare = path === 'es' ? '' : path.replace(/^es\//, '');
    const alternates: [string, string][] = [
      ['en', this.absoluteUrl(bare)],
      ['es', this.absoluteUrl(`es/${bare}`)],
      ['x-default', this.absoluteUrl(bare)],
    ];

    this.document.head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((link) => link.remove());

    for (const [hreflang, href] of alternates) {
      const link = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', href);
      this.document.head.appendChild(link);
    }
  }

  /**
   * Describes the artwork as schema.org data in the page's head.
   *
   * The pages are prerendered, so this ends up in the served HTML: it is the
   * one part of an artwork's facts — who made it, when, in what medium, at what
   * size — that a crawler can read without interpreting prose or running any
   * JavaScript. Especially worth having on the pieces that have no essay yet.
   */
  setArtworkStructuredData(artwork: ArtworkStructuredData): void {
    const { name, url, image, description, year, medium, width, height, unit } = artwork;
    const distance = (value: string) =>
      value && unit ? { '@type': 'Distance', name: `${value} ${unit}` } : undefined;

    const data = {
      '@context': 'https://schema.org',
      '@type': 'VisualArtwork',
      name,
      url,
      image,
      description: description || undefined,
      artform: 'Painting',
      artMedium: medium || undefined,
      dateCreated: year || undefined,
      width: distance(width),
      height: distance(height),
      creator: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    };

    // undefined values drop out of JSON.stringify, so partial trait data yields
    // a smaller object rather than one full of nulls.
    this.writeJsonLd(ARTWORK_JSON_LD_ID, data);
    this.writeJsonLd(BREADCRUMB_JSON_LD_ID, this.breadcrumbTrail(name, url));
  }

  /**
   * Home > Paintings > this artwork. Says where the page sits rather than
   * leaving each of 186 artworks looking like an island, and it is what search
   * results show as a path instead of a bare url.
   */
  private breadcrumbTrail(name: string, url: string) {
    const spanish = url.includes('/es/');
    const base = spanish ? `${SITE_URL}/es` : SITE_URL;
    const trail = [
      { name: spanish ? 'Inicio' : 'Home', item: `${base}/` },
      { name: spanish ? 'Pinturas' : 'Paintings', item: `${base}/artworks/` },
      { name, item: url },
    ];

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: trail.map((entry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: entry.name,
        item: entry.item,
      })),
    };
  }

  private writeJsonLd(id: string, data: unknown): void {
    let script = this.document.head.querySelector<HTMLScriptElement>(`#${id}`);
    if (!script) {
      script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('id', id);
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }

  /**
   * The essay as a piece of writing about the painting, rather than as part of
   * the page it happens to sit on.
   *
   * The catalogue entry already says what the painting is: its medium, its
   * size, the year. None of that says the page also carries several hundred
   * words written about that one work, which is the only thing here that
   * exists nowhere else. `about` is what joins the two: this text is *about*
   * that painting, and a machine reading the page can follow it.
   *
   * The author is the artist. A model drafts, he corrects and he publishes
   * under his own name on his own site, and he is clear that the writing is
   * his — which is his to say about his own pages, and the answer search
   * engines and readers are entitled to.
   */
  setEssayStructuredData(essay: EssayStructuredData): void {
    this.writeJsonLd(ESSAY_JSON_LD_ID, {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: essay.headline,
      inLanguage: essay.language,
      url: essay.url,
      mainEntityOfPage: essay.url,
      datePublished: essay.published || undefined,
      dateModified: essay.modified || essay.published || undefined,
      about: {
        '@type': 'VisualArtwork',
        name: essay.artworkName,
        url: essay.url,
      },
      author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
      publisher: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    });

    // Read back out of the built page by the sitemap, which has no other way of
    // knowing when an essay changed and would otherwise date every page in the
    // catalogue to the last deploy.
    if (essay.modified) {
      this.meta.updateTag({ property: 'article:modified_time', content: essay.modified });
    }
    if (essay.published) {
      this.meta.updateTag({ property: 'article:published_time', content: essay.published });
    }
  }

  private clearArtworkStructuredData(): void {
    this.document.head.querySelector(`#${ARTWORK_JSON_LD_ID}`)?.remove();
    this.document.head.querySelector(`#${BREADCRUMB_JSON_LD_ID}`)?.remove();
    this.document.head.querySelector(`#${ESSAY_JSON_LD_ID}`)?.remove();
    this.meta.removeTag("property='article:modified_time'");
    this.meta.removeTag("property='article:published_time'");
  }

  /**
   * Overrides the title (and optionally description) once a dynamic page knows
   * its content — e.g. the artwork's name — so each of many such pages is
   * individually titled rather than sharing a generic route title. Callers pass
   * already-resolved text, not translation keys.
   */
  setPageTitle(title: string, description?: string, image?: string, type?: string): void {
    const pageTitle = `${title} · ${SITE_NAME}`;
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ name: 'twitter:description', content: description });
    }
    // Without this every artwork shares the one image baked into index.html,
    // so each of them previews as the same picture of somebody else's painting.
    if (image) {
      this.meta.updateTag({ property: 'og:image', content: image });
      this.meta.updateTag({ name: 'twitter:image', content: image });
    }
    // A painting with an essay about it is not the site's front door, and
    // saying "website" of all two hundred of them tells a reader's phone to
    // preview them as if they were.
    if (type) this.meta.updateTag({ property: 'og:type', content: type });
  }

  private deepestDescription(route: ActivatedRouteSnapshot): string | undefined {
    let found: string | undefined;
    let node: ActivatedRouteSnapshot | null = route;
    while (node) {
      const value = node.data['description'];
      if (typeof value === 'string') found = value;
      node = node.firstChild;
    }
    return found;
  }

  /**
   * The URL exactly as GitHub Pages serves it.
   *
   * Prerendering writes each route as `<route>/index.html`, and Pages answers
   * the bare path with a 301 to the trailing-slash form. Declaring the bare
   * path as canonical would point every page at a redirect, so the slash is
   * part of the address here and in the sitemap alike.
   */
  private absoluteUrl(routerUrl: string): string {
    const path = routerUrl.split('?')[0].split('#')[0];
    const trimmed = path.replace(/^\/+|\/+$/g, '');
    return trimmed ? `${SITE_URL}/${trimmed}/` : `${SITE_URL}/`;
  }

  /** Keeps the admin pages out of search results even when one is opened directly. */
  private setRobots(noindex: boolean): void {
    if (noindex) this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    else this.meta.removeTag("name='robots'");
  }

  private deepestData(route: ActivatedRouteSnapshot, key: string): unknown {
    let found: unknown;
    let node: ActivatedRouteSnapshot | null = route;
    while (node) {
      if (node.data[key] !== undefined) found = node.data[key];
      node = node.firstChild;
    }
    return found;
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
