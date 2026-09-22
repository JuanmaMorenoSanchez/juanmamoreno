import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  PROJECT_CHANGELOG,
  PROJECT_ENDPOINTS,
  PROJECT_FILES,
  PROJECT_GOALS,
  PROJECT_REPO,
  PROJECT_REQUIREMENTS,
  PROJECT_ROUTES,
} from '@domain/project/project.constants';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageUrlService } from '@shared/services/language-url.service';

/**
 * How this product is run, for somebody deciding whether to hire the person
 * running it.
 *
 * Deliberately not in the menu. A gallery or a collector arriving at the
 * catalogue has no use for it, and the two audiences want different things from
 * the same name; this is a page to be sent, at an address that says what it is.
 * It is still written out at build time in both languages like every other
 * page, so it can be read, shared and found.
 *
 * Nothing here names a private repository, an address behind a guard, a
 * credential, a bucket or a cloud project. This repository is public, so the
 * page is its own threat model — and the one interesting claim it makes about
 * security, that no signing key sits on the server, is safe to make precisely
 * because it is true.
 */
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  imports: [NgTemplateOutlet, RouterLink, TranslatePipe],
})
export class ProjectComponent {
  protected readonly lang = inject(LanguageUrlService);
  private readonly translate = inject(TranslateService);

  protected readonly goals = PROJECT_GOALS;
  protected readonly routes = PROJECT_ROUTES;
  protected readonly files = PROJECT_FILES;
  protected readonly endpoints = PROJECT_ENDPOINTS;

  /**
   * The four photographs, and where each one belongs.
   *
   * Spread through the page rather than gathered at the foot of it: a block of
   * four is a gallery of screenshots, and the reader has already read past the
   * thing each one illustrates by the time they reach it. The home page under
   * the opening, the certificate under the certificates, the catalogue under
   * the catalogue, and a painting's own page beside the section about the data
   * that page carries.
   *
   * Each opens the live site rather than a copy of it: the article is about
   * something that exists, and a reader deciding whether that is true should be
   * one press away from finding out. In a new tab, because they are an aside
   * and this page is the thing being read.
   */
  private readonly photographs = [
    { at: 'home', name: 'home', label: 'project.shots.home', href: 'https://juanmamoreno.com/' },
    {
      at: 'one',
      name: 'certificate',
      label: 'project.shots.certificate',
      href: 'https://juanmamoreno.com/artwork/152',
    },
    {
      at: 'two',
      name: 'catalogue',
      label: 'project.shots.catalogue',
      href: 'https://juanmamoreno.com/artworks',
    },
    {
      at: 'artwork',
      name: 'artwork',
      label: 'project.shots.artwork',
      href: 'https://juanmamoreno.com/artwork/152',
    },
  ] as const;

  /** The photograph that belongs at this point in the page, if one does. */
  protected shotOf(at: string): (typeof this.photographs)[number] | undefined {
    return this.photographs.find((photograph) => photograph.at === at);
  }
  protected readonly repo = PROJECT_REPO;
  protected readonly requirements = PROJECT_REQUIREMENTS;
  protected readonly changelog = PROJECT_CHANGELOG;

  /**
   * One block of his writing, as the paragraphs he wrote.
   *
   * The page is his text, edited in a file where a blank line is a new
   * paragraph — which is how anybody writes, and how the file he is handed says
   * he may. Rendered as one string that is what it stops being: four paragraphs
   * become a single wall with two invisible line breaks in it.
   *
   * Read through `instant` rather than the pipe because what is wanted is the
   * text itself and not a rendering of it. Every heading on the page still goes
   * through the pipe, so a language change marks this view dirty and these are
   * asked again with it.
   */
  protected paragraphs(key: string): string[] {
    const written = this.translate.instant(key) as unknown;
    return typeof written === 'string'
      ? written
          .split(/\n{2,}/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean)
      : [];
  }
}
