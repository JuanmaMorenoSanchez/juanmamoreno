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
    const url = SITE_URL + (snapshot.url.split('?')[0] || '/');

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.setCanonical(url);
    // Belongs to whichever artwork page we just left, not to this one.
    this.clearArtworkStructuredData();
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

    let script = this.document.head.querySelector<HTMLScriptElement>(`#${ARTWORK_JSON_LD_ID}`);
    if (!script) {
      script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('id', ARTWORK_JSON_LD_ID);
      this.document.head.appendChild(script);
    }
    // undefined values drop out of JSON.stringify, so partial trait data yields
    // a smaller object rather than one full of nulls.
    script.textContent = JSON.stringify(data);
  }

  private clearArtworkStructuredData(): void {
    this.document.head.querySelector(`#${ARTWORK_JSON_LD_ID}`)?.remove();
  }

  /**
   * Overrides the title (and optionally description) once a dynamic page knows
   * its content — e.g. the artwork's name — so each of many such pages is
   * individually titled rather than sharing a generic route title. Callers pass
   * already-resolved text, not translation keys.
   */
  setPageTitle(title: string, description?: string): void {
    const pageTitle = `${title} · ${SITE_NAME}`;
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ name: 'twitter:description', content: description });
    }
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
