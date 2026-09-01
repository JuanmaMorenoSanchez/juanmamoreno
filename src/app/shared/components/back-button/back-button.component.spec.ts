import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { vi } from 'vitest';
import { BackButtonComponent } from './back-button.component';

/**
 * Most people arrive at a painting from outside — a link from Instagram, a
 * search result — and for them the history entry behind this one belongs to
 * another site. The button used to ask only whether there was an entry at all,
 * which there always is, so "back" took them off the site altogether.
 */
describe('BackButtonComponent', () => {
  let back: ReturnType<typeof vi.spyOn>;
  let router: Router;

  /**
   * The two things the component reads. `navigationId` is the number the
   * router stamps on each entry it creates; `referrer` is the page that loaded
   * this document, which is all there is to go on before any in-app
   * navigation has happened.
   */
  function arriveWith(options: { navigationId?: number; referrer?: string }) {
    window.history.replaceState(
      options.navigationId === undefined ? null : { navigationId: options.navigationId },
      ''
    );
    vi.spyOn(document, 'referrer', 'get').mockReturnValue(options.referrer ?? '');
  }

  function build() {
    const fixture = TestBed.createComponent(BackButtonComponent);
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackButtonComponent],
      providers: [
        provideTranslateService(),
        provideRouter([
          { path: '', children: [{ path: '', children: [] }] },
          { path: 'es', children: [{ path: '', children: [] }] },
        ]),
      ],
    });
    // The real Location, with only the one step stubbed. A stand-in object
    // breaks the router itself, which uses Location for every navigation.
    back = vi.spyOn(TestBed.inject(Location), 'back').mockImplementation(() => undefined);
    router = TestBed.inject(Router);
    // Watched, not replaced: the language is read from the address, so a
    // stubbed navigation would leave every test in English and pass on a
    // component that never worked.
    vi.spyOn(router, 'navigateByUrl');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    arriveWith({ navigationId: 1 });
    expect(build().componentInstance).toBeTruthy();
  });

  // The reported fault. Arriving from Instagram there is a history entry
  // behind this page, and it is Instagram's.
  it('goes home rather than back to the site that sent the reader here', () => {
    arriveWith({ navigationId: 1, referrer: 'https://www.instagram.com/p/abc/' });

    build().componentInstance.navigateBack();

    expect(back).not.toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('goes home for a reader who typed the address or opened a bookmark', () => {
    arriveWith({ navigationId: 1, referrer: '' });

    build().componentInstance.navigateBack();

    expect(back).not.toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  // Anything the router numbered above one was pushed by a navigation inside
  // the app, so the entry beneath it is ours: the catalogue, most often.
  it('goes back when the reader got here from another page of the site', () => {
    arriveWith({ navigationId: 4, referrer: 'https://www.instagram.com/p/abc/' });

    build().componentInstance.navigateBack();

    expect(back).toHaveBeenCalledTimes(1);
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  /**
   * A reader who has gone back to the page they landed on is standing on the
   * first entry again, and the one behind it is still the other site's. The
   * number travels with the entry, which is what makes this answerable.
   */
  it('goes home again once the reader has walked back to where they came in', () => {
    arriveWith({ navigationId: 1, referrer: 'https://www.google.com/' });

    build().componentInstance.navigateBack();

    expect(back).not.toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  // A search result for one of the prerendered pages, followed within the site.
  it('goes back when the document itself was loaded from one of our pages', () => {
    arriveWith({ navigationId: 1, referrer: `${window.location.origin}/artworks` });

    build().componentInstance.navigateBack();

    expect(back).toHaveBeenCalledTimes(1);
  });

  // Nothing to read at all: no state, no referrer. Home is the safe answer.
  it('goes home when there is nothing to judge by', () => {
    arriveWith({ referrer: '' });

    build().componentInstance.navigateBack();

    expect(back).not.toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  /**
   * Home has two addresses. Sending a Spanish reader to `/` would answer them
   * in English, which is the same fault the featured painting and the 404 both
   * had.
   */
  it('sends a Spanish reader to the Spanish home page', async () => {
    await router.navigateByUrl('/es');
    TestBed.tick();
    vi.mocked(router.navigateByUrl).mockClear();
    arriveWith({ navigationId: 1, referrer: 'https://www.instagram.com/p/abc/' });

    build().componentInstance.navigateBack();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/es');
  });
});
