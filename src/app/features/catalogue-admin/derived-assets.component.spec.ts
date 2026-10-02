import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtelierService, DerivedPiece } from '@features/atelier/atelier.service';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { DerivedAssetsComponent } from './derived-assets.component';

describe('DerivedAssetsComponent', () => {
  let fixture: ComponentFixture<DerivedAssetsComponent>;
  let atelier: AtelierService;

  const piece = (id: string, source: string): DerivedPiece => ({
    id,
    source,
    title: `Piece ${id}`,
    updatedAt: '2026-10-02T00:00:00.000Z',
    assets: [
      {
        kind: 'layer',
        file: '0-figure.png',
        label: 'the figure',
        url: `https://x.test/${id}/a.png`,
      },
      {
        kind: 'frame',
        file: 'variant-0.png',
        label: 'variants',
        url: `https://x.test/${id}/v.png`,
      },
    ],
  });

  function build(pieces: DerivedPiece[] | undefined, tokenId = '182'): void {
    DerivedAssetsComponent.forget();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [DerivedAssetsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AdminAuthService, useValue: { bearerToken: () => 'a-token' } },
      ],
    });
    atelier = TestBed.inject(AtelierService);
    atelier.derived = () => of(pieces);

    fixture = TestBed.createComponent(DerivedAssetsComponent);
    fixture.componentRef.setInput('tokenId', tokenId);
    fixture.detectChanges();
  }

  function text(): string {
    return (fixture.nativeElement as HTMLElement).textContent ?? '';
  }

  afterEach(() => DerivedAssetsComponent.forget());

  it('shows only what came from this painting', () => {
    build([piece('a', '182'), piece('b', '7')]);

    expect(fixture.componentInstance.pieces().map((p) => p.id)).toEqual(['a']);
    expect(text()).toContain('Piece a');
    expect(text()).not.toContain('Piece b');
  });

  /** Most paintings have never been cut up, so this is the ordinary answer. */
  it('says nothing yet rather than drawing an empty frame', () => {
    build([piece('a', '7')]);

    expect(text()).toContain('Nothing yet');
  });

  /**
   * A painting with nothing made from it and a listing that never arrived look
   * identical on a row with nothing on it, and only one of them is fine.
   */
  it('tells a listing that failed from a painting with nothing made from it', () => {
    build(undefined);

    expect(fixture.componentInstance.asking()).toBe(true);
    expect(text()).not.toContain('Nothing yet');
  });

  it('offers every file for download, named as it is stored', () => {
    build([piece('a', '182')]);

    const links = [...fixture.nativeElement.querySelectorAll('.derived-files a')];
    expect(links).toHaveLength(2);
    expect(links.map((a: HTMLAnchorElement) => a.getAttribute('download'))).toEqual([
      '0-figure.png',
      'variant-0.png',
    ]);
    expect(links[0].querySelector('img')?.getAttribute('src')).toBe('https://x.test/a/a.png');
  });

  /**
   * A bucket delete is not something to find out about afterwards, and these
   * files are the only copy — the cutting that made them was by hand.
   */
  it('asks before throwing a piece away, and does nothing when refused', () => {
    build([piece('a', '182')]);
    vi.stubGlobal('confirm', () => false);
    const asked = vi.fn();
    atelier.forget = () => {
      asked();
      return of(true);
    };

    fixture.componentInstance.remove(piece('a', '182'));

    expect(asked).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it('takes the piece off the list once it is gone', () => {
    build([piece('a', '182')]);
    vi.stubGlobal('confirm', () => true);
    atelier.forget = () => of(true);

    fixture.componentInstance.remove(fixture.componentInstance.pieces()[0]);
    fixture.detectChanges();

    expect(fixture.componentInstance.pieces()).toEqual([]);
    expect(text()).toContain('Nothing yet');
    vi.unstubAllGlobals();
  });

  /** A delete that failed must not look like one that worked. */
  it('keeps the piece and says so when it would not go', () => {
    build([piece('a', '182')]);
    vi.stubGlobal('confirm', () => true);
    atelier.forget = () => of(false);

    fixture.componentInstance.remove(fixture.componentInstance.pieces()[0]);
    fixture.detectChanges();

    expect(fixture.componentInstance.pieces()).toHaveLength(1);
    expect(text()).toContain('would not go');
    vi.unstubAllGlobals();
  });

  /**
   * Two hundred rows share one listing. A request per row opened would be a
   * request to list the same bucket again.
   */
  it('asks for the listing once however many rows are built', () => {
    DerivedAssetsComponent.forget();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [DerivedAssetsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AdminAuthService, useValue: { bearerToken: () => 'a-token' } },
      ],
    });
    const service = TestBed.inject(AtelierService);
    const asked = vi.fn(() => of([piece('a', '182')]));
    service.derived = asked as unknown as AtelierService['derived'];

    for (const token of ['182', '7', '100']) {
      const row = TestBed.createComponent(DerivedAssetsComponent);
      row.componentRef.setInput('tokenId', token);
      row.detectChanges();
    }

    expect(asked).toHaveBeenCalledTimes(1);
  });
});
