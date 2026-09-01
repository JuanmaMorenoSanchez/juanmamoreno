import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { provideTranslateService } from '@ngx-translate/core';
import {
  PostedArtwork,
  PostedArtworksService,
} from '@shared/services/posted-artworks.service';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { LatestComponent } from './latest.component';

/**
 * Where the link in the Instagram profile lands.
 *
 * The account gets one clickable link and a caption cannot carry another, so
 * this page is the whole of the route from a painting somebody has just
 * scrolled past to the page about it.
 */
const posted = (tokenId: string, name: string, permalink: string | null = null): PostedArtwork => ({
  tokenId,
  name,
  postedAt: '2026-03-03T18:00:00.000Z',
  permalink,
});

const catalogueEntry = (tokenId: string, name: string) => ({
  tokenId,
  name,
  image: { thumbnailUrl: `https://cdn.test/${tokenId}` },
});

async function setup(latest: PostedArtwork[] | undefined, at = '/latest') {
  TestBed.configureTestingModule({
    imports: [LatestComponent],
    providers: [
      provideTranslateService(),
      provideRouter([
        { path: 'latest', children: [] },
        { path: 'es/latest', children: [] },
      ]),
      {
        provide: ARTWORK_PORT,
        useValue: {
          getArtPiecesObservable: () =>
            of([catalogueEntry('20', 'Iris'), catalogueEntry('21', 'Another')]),
          getNftOptimalUrl: (image: { thumbnailUrl?: string }) => image?.thumbnailUrl ?? '',
        },
      },
      { provide: PostedArtworksService, useValue: { getLatest: vi.fn().mockReturnValue(of(latest)) } },
    ],
  });

  await TestBed.inject(Router).navigateByUrl(at);
  const fixture = TestBed.createComponent(LatestComponent);
  fixture.detectChanges();
  return fixture;
}

const entries = (fixture: { nativeElement: HTMLElement }) =>
  Array.from(fixture.nativeElement.querySelectorAll('.latest-entry'));

describe('LatestComponent', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('shows what the account has lately shown, in the order it showed it', async () => {
    const fixture = await setup([posted('21', 'Another'), posted('20', 'Iris')]);

    const names = entries(fixture).map((entry) =>
      entry.querySelector('.latest-name')!.textContent!.trim()
    );
    expect(names).toEqual(['Another', 'Iris']);
  });

  it('sends each one to its own page', async () => {
    const fixture = await setup([posted('20', 'Iris')]);

    expect(entries(fixture)[0].querySelector('a')!.getAttribute('href')).toBe('/artwork/20');
  });

  it('keeps a Spanish reader in Spanish', async () => {
    const fixture = await setup([posted('20', 'Iris')], '/es/latest');

    expect(entries(fixture)[0].querySelector('a')!.getAttribute('href')).toBe('/es/artwork/20');
  });

  // The backend answers with a name and a token and nothing heavier; every
  // picture the page needs is already in the session.
  it('takes the picture from the catalogue it already has', async () => {
    const fixture = await setup([posted('20', 'Iris')]);

    expect(entries(fixture)[0].querySelector('img')!.getAttribute('src')).toBe(
      'https://cdn.test/20'
    );
  });

  it('offers the post itself when there is one to offer', async () => {
    const fixture = await setup([
      posted('20', 'Iris', 'https://www.instagram.com/p/abc/'),
      posted('21', 'Another'),
    ]);

    const sources = entries(fixture).map((entry) =>
      entry.querySelector('.latest-source')?.getAttribute('href') ?? null
    );
    expect(sources).toEqual(['https://www.instagram.com/p/abc/', null]);
  });

  it('says so when nothing has been posted', async () => {
    const fixture = await setup([]);

    expect(fixture.nativeElement.querySelector('.latest-empty')).not.toBeNull();
  });

  /**
   * The one that matters. A request that failed is not an empty account, and
   * saying "nothing has been posted yet" over a backend that simply could not
   * be reached is a page telling the reader something untrue.
   */
  it('does not claim the account is empty when it could not ask', async () => {
    const fixture = await setup(undefined);

    expect(fixture.nativeElement.querySelector('.latest-empty')).toBeNull();
    expect(entries(fixture)).toHaveLength(0);
  });

  // A painting posted and later taken out of the catalogue still has a name.
  it('falls back to the name recorded when it was posted', async () => {
    const fixture = await setup([posted('999', 'Gone from the catalogue')]);

    expect(entries(fixture)[0].querySelector('.latest-name')!.textContent!.trim()).toBe(
      'Gone from the catalogue'
    );
  });
});
