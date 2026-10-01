import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { of } from 'rxjs';
import { AtelierComponent } from './atelier.component';
import { AtelierService, Prices } from './atelier.service';

describe('AtelierComponent', () => {
  let fixture: ComponentFixture<AtelierComponent>;
  let atelier: AtelierService;

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
