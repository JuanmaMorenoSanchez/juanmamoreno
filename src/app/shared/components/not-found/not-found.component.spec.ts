import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { NotFoundComponent } from './not-found.component';

/**
 * The page a reader reaches by getting an address wrong, which is the worst
 * moment to move them into another language.
 *
 * Every way out of it was a button calling `router.navigate(['/artworks'])` —
 * an absolute English path, and not a link at all. A Spanish reader who
 * mistyped a url was recovered into English, and nobody could open any of the
 * four in a new tab.
 */
describe('NotFoundComponent', () => {
  let router: Router;

  const at = async (url: string) => {
    await router.navigateByUrl(url);
    TestBed.tick();
  };

  const waysOut = (element: HTMLElement) =>
    Array.from(element.querySelectorAll('a'), (link) => link.getAttribute('href'));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [
        provideTranslateService(),
        provideRouter([
          { path: '', children: [{ path: '', children: [] }] },
          { path: 'es', children: [{ path: '', children: [] }] },
        ]),
      ],
    });
    router = TestBed.inject(Router);
  });

  afterEach(() => TestBed.resetTestingModule());

  it('offers an English reader the English pages', async () => {
    await at('/');
    const fixture = TestBed.createComponent(NotFoundComponent);
    fixture.detectChanges();

    expect(waysOut(fixture.nativeElement)).toEqual(['/artworks', '/about', '/cv', '/contact']);
  });

  it('keeps a Spanish reader in Spanish', async () => {
    await at('/es');
    const fixture = TestBed.createComponent(NotFoundComponent);
    fixture.detectChanges();

    expect(waysOut(fixture.nativeElement)).toEqual([
      '/es/artworks',
      '/es/about',
      '/es/cv',
      '/es/contact',
    ]);
  });

  // Buttons cannot be middle-clicked, opened in a new tab, or followed by
  // anything reading the page rather than clicking it.
  it('offers real links rather than buttons that navigate', async () => {
    await at('/');
    const fixture = TestBed.createComponent(NotFoundComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('a')).toHaveLength(4);
    expect(fixture.nativeElement.querySelectorAll('button')).toHaveLength(0);
  });
});
