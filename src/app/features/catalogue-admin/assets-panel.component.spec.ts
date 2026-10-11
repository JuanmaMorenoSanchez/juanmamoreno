import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { KeptService, type KeptPiece } from '@features/atelier/kept.service';
import { AssetsPanelComponent } from './assets-panel.component';

/**
 * What the atelier kept of one painting, on the page he manages them from.
 *
 * Under the artwork rather than on a page of its own, because an asset
 * belongs to a painting and `tokenId` already says which — and because this
 * page exists precisely to stop lists of the same thing multiplying.
 *
 * None of it is public: the route is admin-only and `noindex`, the backend is
 * guarded, and the bucket is closed. The test that matters most here is the
 * one asserting a clip gets a player, because a clip rendered as an `img` is
 * the failure that looks like a missing file.
 */
describe('AssetsPanelComponent', () => {
  const piece = (over: Partial<KeptPiece> = {}): KeptPiece => ({
    id: 'k1',
    name: 'Rockets win I',
    tokenId: '195',
    kind: 'layer',
    media: 'image/png',
    width: 3652,
    height: 4533,
    bytes: 240_000,
    created: '2026-10-11T09:00:00.000Z',
    ...over,
  });

  const build = (kept: KeptPiece[], tokenId = '195') => {
    const held = signal(kept);
    const forgotten: string[] = [];
    let ensured = 0;

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [AssetsPanelComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: KeptService,
          useValue: {
            pieces: held,
            ensure: () => {
              ensured += 1;
              return Promise.resolve();
            },
            refresh: () => Promise.resolve(),
            forget: (id: string) => {
              forgotten.push(id);
              held.update((all) => all.filter((p) => p.id !== id));
              return Promise.resolve();
            },
            imageUrl: (id: string) => `/api/atelier-pieces/${id}/image`,
            isClip: (p: KeptPiece) => p.media === 'video/mp4',
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(AssetsPanelComponent);
    fixture.componentRef.setInput('painting', { tokenId } as never);
    fixture.detectChanges();
    return {
      fixture,
      host: fixture.nativeElement as HTMLElement,
      forgotten,
      ensured: () => ensured,
    };
  };

  it('shows only what belongs to this painting', () => {
    const { host } = build([piece(), piece({ id: 'k2', tokenId: '42' })]);

    expect(host.querySelectorAll('.assets-list li')).toHaveLength(1);
  });

  it('says nothing at all when the painting has none', () => {
    // Most paintings have none, and an empty heading on every row is noise.
    const { host } = build([piece({ tokenId: '42' })]);

    expect(host.querySelector('[data-testid="assets"]')).toBeNull();
  });

  it('gives a clip a player and a picture an img', () => {
    // A clip rendered as an img is a broken image and looks like a lost file.
    const { host } = build([
      piece(),
      piece({ id: 'k2', kind: 'clip', media: 'video/mp4', width: 768, height: 832 }),
    ]);

    expect(host.querySelector('[data-testid="asset-clip-k2"]')?.tagName).toBe('VIDEO');
    expect(host.querySelectorAll('img')).toHaveLength(1);
  });

  it('asks the list for itself, once', () => {
    // The atelier refreshes because it just changed the list; this page only
    // reads it, and a panel per opened row would be a request per row.
    const { ensured } = build([piece()]);

    expect(ensured()).toBe(1);
  });

  it('asks twice before forgetting, because it cannot be undone', () => {
    const { host, forgotten, fixture } = build([piece()]);
    const button = host.querySelector('[data-testid="forget-k1"]') as HTMLButtonElement;

    button.click();
    fixture.detectChanges();

    expect(forgotten).toEqual([]);
    expect(host.querySelector('[data-testid="forget-k1"]')?.textContent).toContain('Really');
  });

  it('forgets it on the second press', async () => {
    const { host, forgotten, fixture } = build([piece()]);

    (host.querySelector('[data-testid="forget-k1"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    (host.querySelector('[data-testid="forget-k1"]') as HTMLButtonElement).click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(forgotten).toEqual(['k1']);
  });

  it('reaches an asset through the backend, never through a bucket url', () => {
    // The bucket is closed to everyone but the backend, so this is the only
    // address an asset has — and no url is written down anywhere.
    const { host } = build([piece()]);
    const src = host.querySelector('img')?.getAttribute('src') ?? '';

    expect(src).toContain('/atelier-pieces/k1/image');
    expect(src).not.toContain('storage.googleapis');
  });

  it('says plainly that none of this is public', () => {
    const { host } = build([piece()]);

    expect(host.textContent).toContain('closed');
  });
});
