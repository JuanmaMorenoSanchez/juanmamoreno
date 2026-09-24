import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { VALIDTRAITS } from '@domain/artwork/artwork.constants';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { provideTranslateService } from '@ngx-translate/core';
import { AvailabilityService } from '@shared/services/availability.service';
import { of } from 'rxjs';
import { DossierComponent } from './dossier.component';

const painting = (tokenId: string, name: string, year = '2026'): Nft => ({
  tokenId,
  name,
  image: { thumbnailUrl: `https://cdn.test/${tokenId}` },
  raw: { metadata: { attributes: [{ trait_type: VALIDTRAITS.YEAR, value: year }] } },
});

/** Only frontal views are choosable; everything else is not a painting to pick. */
const FRONTALS = ['1', '2', '3'];

function setup(catalogue: Nft[], sold: string[] = []) {
  const port = {
    getArtPiecesObservable: () => of(catalogue),
    getTraitValue: (nft: Nft) => nft.raw?.metadata?.attributes?.[0]?.value ?? '',
    isFrontalView: (nft: Nft) => FRONTALS.includes(nft.tokenId),
    sortByYear: (nfts: Nft[]) => nfts,
  };

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [DossierComponent],
    providers: [
      provideTranslateService(),
      provideRouter([]),
      { provide: ARTWORK_PORT, useValue: port },
      { provide: AvailabilityService, useValue: { isSold: (id: string) => sold.includes(id) } },
    ],
  });
  TestBed.overrideComponent(DossierComponent, { set: { template: '' } });

  return TestBed.createComponent(DossierComponent).componentInstance as unknown as {
    paintings: () => Nft[];
    chosen: () => Nft[];
    chosenCount: () => number;
    canGenerate: () => boolean;
    positionOf(nft: Nft): number | null;
    isSold(nft: Nft): boolean;
    toggle(nft: Nft): void;
    clear(): void;
    chooseAll(): void;
  };
}

/**
 * Where a dossier is made, now that it is not made from the catalogue.
 *
 * It used to be made by right-clicking paintings on the page every reader
 * sees — a gesture nothing mentioned, for a document only he has any use for.
 */
describe('DossierComponent', () => {
  const catalogue = [
    painting('1', 'One'),
    painting('2', 'Two'),
    painting('3', 'Three'),
    painting('9', 'A detail of One'),
  ];

  /** A dossier is a book of paintings; a detail shot is not one to choose. */
  it('offers only the frontal views', () => {
    const page = setup(catalogue);

    expect(page.paintings().map((one) => one.tokenId)).toEqual(['1', '2', '3']);
  });

  /**
   * Order is the point rather than a side-effect: a dossier is read in
   * sequence, and the sequence is an argument.
   */
  it('keeps the paintings in the order they were chosen, not catalogue order', () => {
    const page = setup(catalogue);
    const [one, two, three] = page.paintings();

    page.toggle(three);
    page.toggle(one);
    page.toggle(two);

    expect(page.chosen().map((p) => p.tokenId)).toEqual(['3', '1', '2']);
    expect(page.positionOf(three)).toBe(1);
    expect(page.positionOf(one)).toBe(2);
  });

  it('closes the gap when one is taken out', () => {
    const page = setup(catalogue);
    const [one, two, three] = page.paintings();
    page.toggle(one);
    page.toggle(two);
    page.toggle(three);

    page.toggle(two);

    expect(page.chosen().map((p) => p.tokenId)).toEqual(['1', '3']);
    expect(page.positionOf(three)).toBe(2);
    expect(page.positionOf(two)).toBeNull();
  });

  it('says nothing is chosen before anything is', () => {
    const page = setup(catalogue);

    expect(page.chosenCount()).toBe(0);
    expect(page.positionOf(page.paintings()[0])).toBeNull();
  });

  /** One painting is a technical sheet, which has its own button elsewhere. */
  it('will not generate from fewer than two', () => {
    const page = setup(catalogue);
    page.toggle(page.paintings()[0]);

    expect(page.canGenerate()).toBe(false);

    page.toggle(page.paintings()[1]);
    expect(page.canGenerate()).toBe(true);
  });

  it('takes everything showing, in the order it is showing', () => {
    const page = setup(catalogue);

    page.chooseAll();

    expect(page.chosen().map((p) => p.tokenId)).toEqual(['1', '2', '3']);
  });

  it('empties the choice', () => {
    const page = setup(catalogue);
    page.chooseAll();

    page.clear();

    expect(page.chosenCount()).toBe(0);
  });

  /** The same dot the catalogue draws, and the one the dossier prints. */
  it('knows which paintings have sold', () => {
    const page = setup(catalogue, ['2']);
    const [one, two] = page.paintings();

    expect(page.isSold(two)).toBe(true);
    expect(page.isSold(one)).toBe(false);
  });

  /** A sold painting can still go in a dossier; it simply carries no price. */
  it('lets a sold painting be chosen', () => {
    const page = setup(catalogue, ['2']);
    page.toggle(page.paintings()[1]);

    expect(page.chosenCount()).toBe(1);
  });
});

/**
 * The page as it actually renders.
 *
 * Everything above drives the class with the template thrown away, which is
 * where the logic lives — but a grid that chooses paintings is a thing you look
 * at, and the guard means this page cannot be opened in a browser without his
 * Google account. Rendering it here is what can be checked without one.
 */
describe('DossierComponent, drawn', () => {
  const catalogue = [painting('1', 'One'), painting('2', 'Two'), painting('3', 'Three')];

  const render = (sold: string[] = []) => {
    const port = {
      getArtPiecesObservable: () => of(catalogue),
      getTraitValue: (nft: Nft) => nft.raw?.metadata?.attributes?.[0]?.value ?? '',
      isFrontalView: (nft: Nft) => FRONTALS.includes(nft.tokenId),
      sortByYear: (nfts: Nft[]) => nfts,
    };
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [DossierComponent],
      providers: [
        provideTranslateService(),
        provideRouter([]),
        { provide: ARTWORK_PORT, useValue: port },
        { provide: AvailabilityService, useValue: { isSold: (id: string) => sold.includes(id) } },
      ],
    });
    const fixture = TestBed.createComponent(DossierComponent);
    fixture.detectChanges();
    return fixture;
  };

  it('draws one tile per painting', () => {
    const fixture = render();
    const tiles = fixture.nativeElement.querySelectorAll('.dossier-tile');

    expect(tiles.length).toBe(3);
  });

  /** A button, not a link: this grid chooses paintings, it does not navigate. */
  it('makes each tile a button that says whether it is chosen', () => {
    const fixture = render();
    const tile = fixture.nativeElement.querySelector('.dossier-tile') as HTMLButtonElement;

    expect(tile.tagName).toBe('BUTTON');
    expect(tile.getAttribute('aria-pressed')).toBe('false');

    tile.click();
    fixture.detectChanges();

    expect(tile.getAttribute('aria-pressed')).toBe('true');
  });

  it('numbers the tiles in the order they were clicked', () => {
    const fixture = render();
    const tiles = [...fixture.nativeElement.querySelectorAll('.dossier-tile')] as HTMLElement[];

    tiles[2].click();
    tiles[0].click();
    fixture.detectChanges();

    const numbered = [...fixture.nativeElement.querySelectorAll('.dossier-position')].map(
      (n) => (n as HTMLElement).textContent?.trim()
    );
    expect(numbered).toEqual(['2', '1']);
  });

  it('marks a sold painting with the dot the dossier will print', () => {
    const fixture = render(['2']);

    expect(fixture.nativeElement.querySelectorAll('.dossier-sold').length).toBe(1);
  });

  /** One painting is a technical sheet; the button only appears at two. */
  it('offers no generate button until two are chosen', () => {
    const fixture = render();
    const tiles = [...fixture.nativeElement.querySelectorAll('.dossier-tile')] as HTMLElement[];

    tiles[0].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-pdf-button')).toBeNull();

    tiles[1].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-pdf-button')).not.toBeNull();
  });
});
