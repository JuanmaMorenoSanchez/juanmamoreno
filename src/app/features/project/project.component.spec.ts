import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ProjectComponent],
      providers: [
        provideRouter([]),
        provideTranslateService(),
        {
          provide: ARTWORK_PORT,
          useValue: {
            getArtPiecesObservable: () => of([]),
            getTraitValue: () => '',
            isFrontalView: () => true,
          },
        },
      ],
    });

    // A real lead, because the pictures are placed by which paragraph they sit
    // under. Without it the lead is one line — the key itself — and a test
    // about where a picture goes would pass by never drawing it.
    const translate = TestBed.inject(TranslateService);
    const lead = ['One.', 'Two.', 'Three, about managing it.', 'Four.'].join(
      String.fromCharCode(10, 10)
    );
    translate.setTranslation('en', { project: { lead } });
    translate.use('en');

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
      // How it is put together has no heading of its own any more: it is in
      // the opening, before any of this. The one section here that is not his
      // writing is the half of the application no reader sees, and it sits
      // after the machine readers rather than between them and the
      // architecture, which is an adjacency he is arguing.
      'project.agents.title',
      'project.admin.title',
      'project.links.title',
    ]);
  });

  /**
   * How it is put together opens the page rather than waiting for a section.
   *
   * This is read to find out how the thing is built, so the shape of it comes
   * before the argument about it — and the drawing says in one look what four
   * paragraphs take a screen to say.
   */
  it('shows how it is put together before it argues anything', () => {
    const diagram = fixture.nativeElement.querySelector('.project-diagram');
    const firstHeading = fixture.nativeElement.querySelector('h2');

    expect(diagram).not.toBeNull();
    // Earlier in the document than the first section heading.
    expect(diagram.compareDocumentPosition(firstHeading) & Node.DOCUMENT_POSITION_FOLLOWING).
      toBeTruthy();
  });

  /** The machine readers still come after the architecture that allows them. */
  it('puts the machine readers after it', () => {
    const diagram = fixture.nativeElement.querySelector('.project-diagram');
    const agents = [...fixture.nativeElement.querySelectorAll('h2')].find(
      (node: Element) => node.textContent?.trim() === 'project.agents.title'
    ) as Element;

    expect(diagram.compareDocumentPosition(agents) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
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

    // The ones that lead somewhere. The page a reader cannot open is shown
    // without a link, because an anchor to nowhere is a promise it cannot keep.
    expect(shots.length).toBeGreaterThanOrEqual(4);
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

  /**
   * The one page nobody else can open is shown and never linked, and its
   * address is never named — the build fails this page if it is.
   */
  it('shows the page it manages the catalogue from without linking it', () => {
    const image = fixture.nativeElement.querySelector('img[src$="catalogue-admin.jpg"]');

    expect(image).not.toBeNull();
    expect(image.closest('a')).toBeNull();
  });
});
