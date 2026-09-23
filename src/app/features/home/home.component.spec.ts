import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { VALIDTRAITS } from '@domain/artwork/artwork.constants';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { environment } from '@environments/environment';
import { provideTranslateService } from '@ngx-translate/core';
import { HeroTitleService } from '@shared/services/hero-title.service';
import { VersionService } from '@shared/services/version.service';
import { EMPTY, of } from 'rxjs';
import { vi } from 'vitest';
import { HomeComponent } from './home.component';

const painting = (tokenId: string, year: string, name = `Painting ${tokenId}`): Nft => ({
  tokenId,
  name,
  image: { thumbnailUrl: `https://cdn.test/${tokenId}` },
  raw: { metadata: { attributes: [{ trait_type: VALIDTRAITS.YEAR, value: year }] } },
});

/**
 * Which painting the landing page puts up, and nothing else about it.
 *
 * The template is left out on purpose: it renders a parallax hero, an
 * IntersectionObserver and a blur-up image ladder, none of which has anything
 * to do with the question here.
 */
function setup(catalogue: Nft[]) {
  const port = {
    getArtPiecesObservable: vi.fn().mockReturnValue(of(catalogue)),
    getNftFetchableUrls: () => [],
    getAspectRatio: () => 1,
    // The blur-up ladder the hero runs on: nothing to load, settled at once.
    getProgressiveImageUrls: () => EMPTY,
    isFrontalView: () => true,
    // Newest first, which is what the real one does and what the fallback leans on.
    sortByYear: (nfts: Nft[]) =>
      [...nfts].sort(
        (a, b) =>
          Number(b.raw?.metadata?.attributes?.[0]?.value ?? 0) -
          Number(a.raw?.metadata?.attributes?.[0]?.value ?? 0)
      ),
  };

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [HomeComponent],
    providers: [
      provideTranslateService(),
      provideRouter([]),
      { provide: ARTWORK_PORT, useValue: port },
      { provide: HeroTitleService, useValue: { visible: signal(false) } },
      { provide: VersionService, useValue: { apiVersion: () => '1.0.0' } },
    ],
  });
  TestBed.overrideComponent(HomeComponent, { set: { template: '' } });

  return TestBed.createComponent(HomeComponent).componentInstance;
}

describe('HomeComponent — the painting on the landing page', () => {
  const asShipped = environment.homeTokenId;

  afterEach(() => {
    environment.homeTokenId = asShipped;
    vi.clearAllMocks();
    TestBed.resetTestingModule();
  });

  const catalogue = [
    painting('195', '2026', 'Rockets win I'),
    painting('202', '2026', 'Electricidad estática II'),
    painting('100', '2019', 'Something older'),
  ];

  /**
   * The one he asked for, and not merely the one that sorts first.
   *
   * Six paintings share the year 2026 and nothing breaks that tie, so the
   * automatic pick can never reach the last of them however recently it was
   * painted. Naming it is the only way to put it up.
   */
  it('puts up the painting that has been named', () => {
    environment.homeTokenId = '202';

    expect(setup(catalogue).featured()?.tokenId).toBe('202');
  });

  /** Which is the behaviour it had before anything read the setting. */
  it('falls back to the newest when none is named', () => {
    environment.homeTokenId = '';

    expect(setup(catalogue).featured()?.tokenId).toBe('195');
  });

  /**
   * A named painting that is not in the catalogue is ignored, not obeyed.
   *
   * The catalogue arrives after the page does, and a token can be retired.
   * Neither is a reason for the landing page to have no painting on it.
   */
  it('falls back rather than showing nothing when the name is not in the catalogue', () => {
    environment.homeTokenId = '999999';

    expect(setup(catalogue).featured()?.tokenId).toBe('195');
  });

  it('has nothing to show before the catalogue arrives, and does not throw', () => {
    environment.homeTokenId = '202';

    expect(setup([]).featured()).toBeUndefined();
  });
});
