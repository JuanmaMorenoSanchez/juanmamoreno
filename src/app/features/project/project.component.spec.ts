import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ProjectComponent],
      providers: [provideRouter([]), provideTranslateService()],
    });
    fixture = TestBed.createComponent(ProjectComponent);
    await fixture.whenStable();
  });

  /**
   * His order, which is not the obvious one: how the work is kept honest comes
   * before where he is coming from and before what was built. He moved it
   * there, and it is the part a person deciding whether to hire him is
   * actually reading for.
   */
  it('reads in the order he put the sections in', () => {
    const headings = [...fixture.nativeElement.querySelectorAll('h2')].map((node: Element) =>
      node.textContent?.trim()
    );

    expect(headings).toEqual([
      'project.rot.title',
      'project.about.title',
      'project.product.title',
      'project.architecture.title',
      'project.agents.title',
      'project.links.title',
    ]);
  });

  it('puts the machine readers after the architecture that allows them', () => {
    const headings = [...fixture.nativeElement.querySelectorAll('h2')].map((node: Element) =>
      node.textContent?.trim()
    );

    expect(headings.indexOf('project.agents.title')).toBe(
      headings.indexOf('project.architecture.title') + 1
    );
  });

  it('gives each of the three aims its own case', () => {
    expect(fixture.nativeElement.querySelectorAll('.project-goals li')).toHaveLength(3);
  });

  /**
   * The picture is bilingual like everything else, so none of its words may be
   * baked into it: a label drawn rather than written cannot be read aloud,
   * searched, or translated.
   */
  it('draws the architecture with words the page can translate', () => {
    const svg = fixture.nativeElement.querySelector('.project-diagram svg');

    expect(svg?.getAttribute('aria-label')).toBe('project.diagram.caption');
    const labels = [...svg.querySelectorAll('text')].map((node: Element) =>
      node.textContent?.trim()
    );
    expect(labels).toContain('project.diagram.service');
    expect(labels).toContain('project.diagram.chain');
    // The two zones, which are the point of drawing it at all: what is inside
    // the cloud, and what is deliberately outside it.
    expect(labels).toContain('project.diagram.cloud');
    expect(labels).toContain('project.diagram.outside');
  });

  /**
   * He writes in a file where a blank line is a new paragraph, and several of
   * these blocks have four. Rendered as one string that is a wall of text with
   * two invisible line breaks in it.
   */
  it('renders a block he wrote as several paragraphs as several paragraphs', () => {
    TestBed.inject(TranslateService).setTranslation('en', {
      project: { lead: ['First thing.', 'Second thing.', 'Third thing.'].join('\n\n') },
    });
    TestBed.inject(TranslateService).use('en');
    fixture.detectChanges();

    const paragraphs = [...fixture.nativeElement.querySelectorAll('.project-lead')].map(
      (node: Element) => node.textContent?.trim()
    );

    expect(paragraphs).toEqual(['First thing.', 'Second thing.', 'Third thing.']);
  });

  /**
   * A map is a useful thing to publish and a list of the doors is not. The
   * addresses behind the credential are left off, and the map says so rather
   * than leaving a gap nobody can see.
   */
  it('maps only the addresses anybody may walk to', () => {
    const drawn = fixture.nativeElement.textContent as string;

    expect(drawn).toContain('/artworks');
    expect(drawn).toContain('GET /availability');
    expect(drawn).toContain('project.map.guarded');
    expect(drawn).not.toContain('/studio');
    expect(drawn).not.toContain('/pendingmint');
    expect(drawn).not.toContain('/publish');
  });

  /**
   * The article is about a thing that exists, so a reader deciding whether
   * that is true should be one press from finding out — in a new tab, because
   * the photographs are an aside and this page is what is being read.
   */
  it('shows the real pages through the article, and opens them where they are', () => {
    const shots = [...fixture.nativeElement.querySelectorAll('.project-shot a')];

    expect(shots).toHaveLength(4);
    for (const shot of shots as HTMLAnchorElement[]) {
      expect(shot.getAttribute('href')).toContain('https://juanmamoreno.com/');
      expect(shot.getAttribute('target')).toBe('_blank');
      expect(shot.getAttribute('rel')).toContain('noopener');
      expect(shot.querySelector('img')?.getAttribute('alt')).toBeTruthy();
    }
  });

  /**
   * The repository this page ships in is public and the service's is not.
   * Linking the private one would offer a recruiter a 404 and tell everybody
   * else where to knock.
   */
  it('links only the repository that is public', () => {
    const links = [...fixture.nativeElement.querySelectorAll('a')].map((a: HTMLAnchorElement) =>
      a.getAttribute('href')
    );

    expect(links.some((href) => href?.endsWith('/juanmamoreno'))).toBe(true);
    expect(links.some((href) => href?.includes('juanmamoreno-backend'))).toBe(false);
    expect(links.some((href) => href?.includes('juanmamoreno-contracts'))).toBe(false);
  });
});
