import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { of } from 'rxjs';
import { AtelierComponent } from './atelier.component';
import { AtelierService, Prices } from './atelier.service';

describe('AtelierComponent', () => {
  let fixture: ComponentFixture<AtelierComponent>;
  let atelier: AtelierService;

  const catalogue = [
    {
      tokenId: '182',
      name: 'Escóndete',
      image: { originalUrl: 'https://storage.googleapis.com/juanmamoreno-originals/182.jpg' },
    },
    { tokenId: '7', name: 'No picture', image: {} },
  ];

  const priced: Prices = {
    prices: {
      segment: { operation: 'segment', usd: 0.005, what: 'one pass' },
      inpaint: { operation: 'inpaint', usd: 0.04, what: 'one fill' },
      edit: { operation: 'edit', usd: 0.04, what: 'one variant' },
    },
    ceiling: 5,
    spent: 1.25,
    left: 3.75,
    configured: true,
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AtelierComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AdminAuthService, useValue: { bearerToken: () => 'a-token' } },
        {
          provide: ARTWORK_PORT,
          useValue: {
            getArtPiecesObservable: () => of(catalogue),
            getNftById: (id: string, nfts: { tokenId: string }[]) =>
              nfts.find((nft) => nft.tokenId === id) ?? null,
            getNftQualityUrl: (image: { originalUrl?: string }) => image.originalUrl ?? '',
          },
        },
      ],
    });

    atelier = TestBed.inject(AtelierService);
    atelier.loadPrices = () => of(priced);
    atelier.pieces = () => of([]);

    fixture = TestBed.createComponent(AtelierComponent);
    await fixture.whenStable();
    atelier.prices.set(priced);
    fixture.detectChanges();
  });

  function text(): string {
    return (fixture.nativeElement as HTMLElement).textContent ?? '';
  }

  /**
   * Everything past choosing a painting is behind one, so a test about those
   * controls has to put one there first. A real `Image` rather than a stub:
   * the template only asks whether there is one.
   */
  function withPainting(): void {
    fixture.componentInstance.painting.set(new Image());
    fixture.detectChanges();
  }

  function buttonSaying(words: string): HTMLButtonElement | undefined {
    return [...fixture.nativeElement.querySelectorAll('button')].find((button: HTMLElement) =>
      button.textContent?.includes(words)
    ) as HTMLButtonElement | undefined;
  }

  /**
   * The running total at the top and the price on each button are the same
   * requirement from two distances: he should never have to remember what this
   * page costs.
   */
  it('shows what today has cost so far', () => {
    expect(text()).toContain('$1.25');
    expect(text()).toContain('$5.00');
  });

  it('puts a price on the button that spends money', () => {
    withPainting();
    const find = buttonSaying('Find layers');

    expect(find).toBeTruthy();
    expect(find?.querySelector('app-cost')).not.toBeNull();
  });

  /**
   * He asked for no bulk operations, and the reason holds on its own: the
   * value of the tool is the thirty seconds of correction after the model's
   * two, and a queue of two hundred is two hundred corrections nobody makes.
   */
  it('offers no way to run the whole catalogue through it', () => {
    withPainting();
    const everything = [...fixture.nativeElement.querySelectorAll('button')].filter(
      (button: HTMLElement) => /\ball\b|every|batch|bulk/i.test(button.textContent ?? '')
    );

    expect(everything).toHaveLength(0);
  });

  /**
   * The fuse is enforced on the server, where it cannot be got round. This is
   * the same answer given a press earlier, so a button that would be refused
   * does not have to be pressed to find out.
   */
  it('will not let a press be made that the day cannot pay for', () => {
    withPainting();
    atelier.prices.set({ ...priced, spent: 5, left: 0 });
    fixture.detectChanges();

    expect(buttonSaying('Find layers')?.disabled).toBe(true);
    expect(text()).toContain('the ceiling for today is reached');
  });

  it('says so when no model is configured at all', () => {
    atelier.prices.set({ ...priced, configured: false });
    fixture.detectChanges();

    expect(text()).toContain('no model is configured');
  });

  /**
   * The painting is the thing the page is about, and everything past choosing
   * one is hidden until there is one — an empty stage with a brush on it
   * invites brushing nothing.
   */
  it('asks for a painting before it offers to do anything to one', () => {
    expect(text()).toContain('The painting');
    expect(buttonSaying('Find layers')).toBeUndefined();
  });

  /** It never sends the original anywhere, and it says so where he can read it. */
  it('says the painting stays in the browser', () => {
    expect(text()).toContain('stays in this browser');
  });

  /**
   * The manifest may only name files that were written.
   *
   * It did not, briefly: the kept variants were listed as frames and never
   * uploaded, so a saved piece looked complete while a sketch reading it got
   * a list of filenames that were not in the bucket. Nothing in the save path
   * would have reported that — the piece saved perfectly well.
   */
  it('uploads every file the manifest goes on to name', async () => {
    // jsdom declares `toBlob` and never calls the callback, so without this the
    // save waits for a blob that is never coming. Nothing here is about pixels.
    HTMLCanvasElement.prototype.toBlob = function (callback: BlobCallback): void {
      callback(new Blob(['a layer']));
    };

    const uploaded: string[] = [];
    atelier.saveFile = (_id, file) => {
      uploaded.push(file);
      return of({ url: `https://example.test/${file}` });
    };

    let named: string[] = [];
    atelier.save = (piece) => {
      named = [
        ...piece.layers.map((layer) => layer.file),
        ...(piece.frames ?? []).flatMap((frame) => frame.files),
      ];
      return of({ ...piece, updatedAt: '2026-10-01T00:00:00.000Z' });
    };

    const component = fixture.componentInstance;
    component.painting.set(new Image());
    component.title.set('Believe');
    component.layers.set([
      { label: 'head', depth: 1, mask: stubCanvas(), cut: stubCanvas(), saved: false },
    ]);
    component.variants.set([
      { instruction: 'close her eyes', image: new Image(), kept: true },
      { instruction: 'and smile', image: new Image(), kept: false },
    ]);
    fixture.detectChanges();

    await component.savePiece();

    expect(named.length).toBeGreaterThan(0);
    for (const file of named) {
      expect(uploaded).toContain(file);
    }
    // The one he did not keep is neither uploaded nor named.
    expect(uploaded).toHaveLength(2);
  });
});

/** jsdom has no 2d context, and this test is about filenames, not pixels. */
function stubCanvas(): HTMLCanvasElement {
  return document.createElement('canvas');
}

describe('AtelierComponent, naming a painting by its number', () => {
  let fixture: ComponentFixture<AtelierComponent>;

  const catalogue = [
    {
      tokenId: '182',
      name: 'Escóndete',
      image: { originalUrl: 'https://storage.googleapis.com/juanmamoreno-originals/182.jpg' },
    },
    { tokenId: '7', name: 'No picture', image: {} },
  ];

  function build(pieces: unknown[]): void {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [AtelierComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AdminAuthService, useValue: { bearerToken: () => 'a-token' } },
        {
          provide: ARTWORK_PORT,
          useValue: {
            getArtPiecesObservable: () => of(pieces),
            getNftById: (id: string, nfts: { tokenId: string }[]) =>
              nfts.find((nft) => nft.tokenId === id) ?? null,
            getNftQualityUrl: (image: { originalUrl?: string }) => image.originalUrl ?? '',
          },
        },
      ],
    });
    fixture = TestBed.createComponent(AtelierComponent);
    fixture.detectChanges();
  }

  function problem(): string {
    return fixture.componentInstance.problem();
  }

  /**
   * jsdom fetches nothing, so it fires neither `onload` nor `onerror` and a
   * real `Image` simply never settles. Standing one in lets these tests assert
   * what actually happens on a load rather than that one was attempted.
   */
  function imagesThat(outcome: 'load' | 'fail'): void {
    class Stub {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      crossOrigin = '';
      naturalWidth = 1200;
      naturalHeight = 800;
      set src(_value: string) {
        setTimeout(() => (outcome === 'load' ? this.onload?.() : this.onerror?.()), 0);
      }
    }
    globalThis.Image = Stub as unknown as typeof Image;
  }

  /**
   * He types a number, not an address. The catalogue already knows where every
   * painting's picture is and which copy is the best one, so asking him to
   * copy that out would be asking him to repeat what the page is holding.
   */
  it('finds the painting without being told where it lives', async () => {
    imagesThat('load');
    build(catalogue);

    await fixture.componentInstance.fetchByToken('182');

    expect(problem()).toBe('');
    expect(fixture.componentInstance.painting()).toBeTruthy();
    // Named from the catalogue, so the piece is called what the painting is.
    expect(fixture.componentInstance.title()).toBe('Escóndete');
    expect(fixture.componentInstance.source()).toBe('182');
  });

  it('takes a number written the way he says it out loud', async () => {
    imagesThat('load');
    build(catalogue);

    await fixture.componentInstance.fetchByToken('  #182 ');

    expect(fixture.componentInstance.source()).toBe('182');
  });

  /**
   * The catalogue can know where a picture is and the picture still not come:
   * the bucket allows this origin, but a file can be missing or a network can
   * drop. Choosing the file by hand works in every one of those cases, so the
   * message says so rather than leaving a dead end.
   */
  it('offers the way round when the picture will not load', async () => {
    imagesThat('fail');
    build(catalogue);

    await fixture.componentInstance.fetchByToken('182');

    expect(problem()).toContain('would not load');
    expect(problem()).toContain('choosing the file');
    expect(fixture.componentInstance.painting()).toBeUndefined();
  });

  it('says so plainly when there is no such painting', async () => {
    build(catalogue);

    await fixture.componentInstance.fetchByToken('999');

    expect(problem()).toBe('There is no painting 999 in the catalogue.');
  });

  /**
   * An empty catalogue and a wrong number are different problems with the same
   * symptom, and only one of them is worth retyping the number for.
   */
  it('tells a catalogue that has not arrived from a number that is wrong', async () => {
    build([]);

    await fixture.componentInstance.fetchByToken('182');

    expect(problem()).toContain('not arrived yet');
  });

  it('says when the painting is known but has no picture on file', async () => {
    build(catalogue);

    await fixture.componentInstance.fetchByToken('7');

    expect(problem()).toBe('Painting 7 has no picture on file.');
  });

  it('does nothing at all for an empty box', async () => {
    build(catalogue);

    await fixture.componentInstance.fetchByToken('   ');

    expect(problem()).toBe('');
  });
});

describe('AtelierComponent, the stage', () => {
  let fixture: ComponentFixture<AtelierComponent>;
  let atelier: AtelierService;

  const priced: Prices = {
    prices: {
      segment: { operation: 'segment', usd: 0.003, what: 'one pass' },
      inpaint: { operation: 'inpaint', usd: 0.04, what: 'one fill' },
      edit: { operation: 'edit', usd: 0.04, what: 'one variant' },
    },
    ceiling: 5,
    spent: 0,
    left: 5,
    configured: true,
  };

  /** jsdom has no 2d context, and this is about what is asked of one. */
  function stubContext(): CanvasRenderingContext2D & { drawn: unknown[] } {
    const drawn: unknown[] = [];
    return {
      drawn,
      clearRect: () => undefined,
      drawImage: (source: unknown) => drawn.push(source),
      globalAlpha: 1,
    } as unknown as CanvasRenderingContext2D & { drawn: unknown[] };
  }

  /** A picture with a size, which `contain` needs to place anything. */
  function picture(): HTMLImageElement {
    return { naturalWidth: 1200, naturalHeight: 800 } as HTMLImageElement;
  }

  beforeEach(async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [AtelierComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AdminAuthService, useValue: { bearerToken: () => 'a-token' } },
        {
          provide: ARTWORK_PORT,
          useValue: {
            getArtPiecesObservable: () => of([]),
            getNftById: () => null,
            getNftQualityUrl: () => '',
          },
        },
      ],
    });
    atelier = TestBed.inject(AtelierService);
    atelier.loadPrices = () => of(priced);
    atelier.pieces = () => of([]);

    fixture = TestBed.createComponent(AtelierComponent);
    await fixture.whenStable();
    atelier.prices.set(priced);
    fixture.detectChanges();
  });

  /**
   * The stage drew the layers and nothing else, so every moment between
   * choosing a painting and cutting it up showed a dark rectangle — which is
   * the first thing anybody does here, and so the first thing anybody saw.
   */
  it('shows the painting as soon as one is chosen', () => {
    const component = fixture.componentInstance;
    const painting = picture();
    component.painting.set(painting);

    const context = stubContext();
    component['drawParallax'](context, { width: 900, height: 600 } as HTMLCanvasElement, painting);

    expect(context.drawn).toEqual([painting]);
  });

  /**
   * A pass can cost its money and find nothing — a painting with no sky in it,
   * or words the model could not place. The stage going back to the whole
   * painting looks exactly like a button that did nothing, so it is said.
   */
  it('says so when a pass finds nothing', async () => {
    const component = fixture.componentInstance;
    component.painting.set(picture());
    component.labels.set('a dog');
    atelier.segment = () => of([]);

    await component.findLayers();
    await fixture.whenStable();

    expect(component.problem()).toContain('Nothing was found for a dog');
    expect(component.problem()).toContain('paid for either way');
    // Segmentation runs on the cheap tier, where returning a mask is a
    // capability that can simply be absent. Every pass coming back empty means
    // the model, not the paintings, and nothing on screen would say so.
    expect(component.problem()).toContain('ATELIER_SEGMENT_MODEL');
    expect(component.layers()).toEqual([]);
  });

  /**
   * A variant can go straight to disk without being kept in the piece. The two
   * are different intentions, and one worth using elsewhere is not always one
   * worth saving here.
   */
  it('offers every variant for download, kept or not', () => {
    const component = fixture.componentInstance;
    component.painting.set(picture());
    component.source.set('182');
    component.variants.set([
      { instruction: 'close her eyes', image: picture(), kept: false },
      { instruction: 'and smile', image: picture(), kept: true },
    ]);
    fixture.detectChanges();

    const links = [...fixture.nativeElement.querySelectorAll('.atelier-variants a')];

    expect(links).toHaveLength(2);
    expect(links.map((a: HTMLAnchorElement) => a.getAttribute('download'))).toEqual([
      '182-close-her-eyes.png',
      '182-and-smile.png',
    ]);
  });

  /**
   * Named after the painting and the sentence that made it: a folder of
   * `variant-0.png` is a folder nobody can read a week later, and the filename
   * is all the description a downloaded file has.
   */
  it('names a downloaded variant after the painting and the instruction', () => {
    const component = fixture.componentInstance;
    component.source.set('182');

    expect(
      component.variantName({ instruction: '¡Close her EYES!', image: picture(), kept: false })
    ).toBe('182-close-her-eyes.png');

    // Nothing to go on either side still produces a name a browser will take.
    component.source.set('');
    expect(component.variantName({ instruction: '¿¡!?', image: picture(), kept: false })).toBe(
      'painting-variant.png'
    );
  });

  /** Nothing to keep is nothing to name, and variants alone are something. */
  it('offers to keep a piece of variants with no layers at all', () => {
    const component = fixture.componentInstance;
    component.painting.set(picture());
    component.title.set('Believe');

    expect(component.hasSomething()).toBe(false);

    component.variants.set([{ instruction: 'close her eyes', image: picture(), kept: true }]);

    expect(component.hasSomething()).toBe(true);
    expect(component.canSave()).toBe(true);
  });
});
