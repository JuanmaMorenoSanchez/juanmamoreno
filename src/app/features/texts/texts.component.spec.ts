import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PUBLISHED_TEXTS } from '@domain/texts/texts.constants';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { TextsComponent } from './texts.component';

describe('TextsComponent', () => {
  let fixture: ComponentFixture<TextsComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextsComponent],
      providers: [provideTranslateService()],
    }).compileComponents();

    // The page is almost entirely translated strings; without a dictionary the
    // assertions below would be checking raw keys.
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', {
      texts: 'Texts',
      textsPage: {
        intro: 'Writing about the work, published elsewhere.',
        kind: { essay: 'Curatorial text', press: 'Press', interview: 'Interview', review: 'Review' },
        salanova: { note: 'The curatorial text.' },
        abc: { note: 'A column.' },
        achtung: { note: 'A review.' },
        selfie: { note: 'An interview.' },
      },
    });
    translate.use('en');

    fixture = TestBed.createComponent(TextsComponent);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
  });

  it('renders one entry per published text', () => {
    expect(element.querySelectorAll('.text-entry').length).toBe(PUBLISHED_TEXTS.length);
  });

  it('shows the title, publication and year of each entry', () => {
    const text = element.textContent ?? '';
    for (const published of PUBLISHED_TEXTS) {
      expect(text).toContain(published.title);
      expect(text).toContain(published.publication);
      expect(text).toContain(String(published.year));
    }
  });

  // The whole point of the page is sending the reader to the original, so the
  // links have to survive: off-site, in a new tab, and not leaking the referrer
  // opener to a third-party site.
  it('links out to every source in a new tab', () => {
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('.text-title a'));
    expect(links.length).toBe(PUBLISHED_TEXTS.length);

    for (const link of links) {
      expect(link.getAttribute('href')).toMatch(/^https:\/\//);
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    }
  });

  it('resolves every translation key it renders', () => {
    const text = element.textContent ?? '';
    // A key that never resolved appears verbatim: "textsPage.salanova.note".
    expect(text).not.toMatch(/textsPage\.[a-zA-Z.]+/);
    expect(text).toContain('Curatorial text');
  });

  it('names an author wherever the source has a byline', () => {
    const authored = PUBLISHED_TEXTS.filter((published) => published.author);
    const rendered = element.querySelectorAll('.text-author').length;
    expect(rendered).toBe(authored.length);
  });
});
