import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  PROJECT_CHANGELOG,
  PROJECT_GOALS,
  PROJECT_REPO,
  PROJECT_REQUIREMENTS,
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
  imports: [RouterLink, TranslatePipe],
})
export class ProjectComponent {
  protected readonly lang = inject(LanguageUrlService);
  private readonly translate = inject(TranslateService);

  protected readonly goals = PROJECT_GOALS;
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
