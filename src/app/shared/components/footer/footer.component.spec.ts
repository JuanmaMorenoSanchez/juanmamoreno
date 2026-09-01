import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { FooterComponent } from './footer.component';

/**
 * The way out of the site, on every page of it.
 *
 * There was none: pages simply stopped, the only link to Instagram anywhere
 * was a sentence on the contact page, and Privacy and Terms were prerendered
 * in both languages while being linked from nowhere at all.
 */
describe('FooterComponent', () => {
  let router: Router;

  const setup = async (at = '/') => {
    TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        provideTranslateService(),
        provideRouter([
          { path: '', children: [{ path: '', children: [] }] },
          { path: 'es', children: [{ path: '', children: [] }] },
        ]),
      ],
    });
    router = TestBed.inject(Router);
    await router.navigateByUrl(at);
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    return fixture;
  };

  const links = (fixture: { nativeElement: HTMLElement }) =>
    Array.from(fixture.nativeElement.querySelectorAll('a'), (link) => ({
      href: link.getAttribute('href'),
      rel: link.getAttribute('rel'),
      target: link.getAttribute('target'),
    }));

  afterEach(() => TestBed.resetTestingModule());

  it('offers Instagram from every page, not only from the contact form', async () => {
    const fixture = await setup();

    const instagram = links(fixture).find((link) => link.href?.includes('instagram.com'));
    expect(instagram).toBeDefined();
    expect(instagram!.href).toBe('https://www.instagram.com/juanmamorenosanchez/');
  });

  /**
   * `rel="me"` is how the rest of the web is told that the account and the
   * site are the same person, which is the whole reason the link is here.
   * `noopener` is the ordinary safety on anything opening in a new tab.
   */
  it('claims the account as the same person, and opens it safely', async () => {
    const fixture = await setup();

    const instagram = links(fixture).find((link) => link.href?.includes('instagram.com'))!;
    expect(instagram.rel).toContain('me');
    expect(instagram.rel).toContain('noopener');
    expect(instagram.target).toBe('_blank');
  });

  // Four prerendered pages that could be reached only by typing the address.
  it('gives Privacy and Terms somewhere to be reached from', async () => {
    const fixture = await setup();

    const hrefs = links(fixture).map((link) => link.href);
    expect(hrefs).toContain('/privacy');
    expect(hrefs).toContain('/terms');
  });

  it('keeps a Spanish reader in Spanish', async () => {
    const fixture = await setup('/es');

    const internal = links(fixture)
      .map((link) => link.href!)
      .filter((href) => href.startsWith('/'));

    expect(internal).toEqual(['/es/contact', '/es/privacy', '/es/terms']);
  });

  /**
   * The privacy page promises no third-party anything. An Instagram embed or
   * follow widget would make that untrue on all 388 pages at once, so the
   * footer is plain links and nothing else.
   */
  it('brings nothing of Instagram onto the page but a link to it', async () => {
    const fixture = await setup();
    const html = (fixture.nativeElement as HTMLElement).innerHTML;

    expect(html).not.toContain('<script');
    expect(html).not.toContain('<iframe');
  });
});
