import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { KeptService, type KeptPiece } from '@features/atelier/kept.service';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { PendingReelsService } from '@shared/services/pending-reels.service';
import { of } from 'rxjs';
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

  const build = (
    kept: KeptPiece[],
    tokenId = '195',
    reelWorks = true,
    listTrouble: string | null = null
  ) => {
    const held = signal(kept);
    const forgotten: string[] = [];
    const asked: string[] = [];
    const filmed: { tokenId: string; kept: string }[] = [];
    let ensured = 0;

    // The bytes arrive as blob urls, because the route wants a credential an
    // `img` cannot send. Resolved immediately here; in a browser it is a
    // fetch.
    // An id of "slow" stands for bytes that have not arrived yet, which is
    // every piece for the first frame after the panel opens.
    const shown = signal<Record<string, string>>(
      Object.fromEntries(
        kept.filter((p) => p.id !== 'slow').map((p) => [p.id, `blob:fake/${p.id}`])
      )
    );

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [AssetsPanelComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: PendingReelsService,
          useValue: {
            fromClip: (tokenId: string, keptId: string) => {
              filmed.push({ tokenId, kept: keptId });
              return of(reelWorks);
            },
          },
        },
        { provide: AdminAuthService, useValue: { bearerToken: () => 'a-token' } },
        {
          provide: KeptService,
          useValue: {
            pieces: held,
            urls: shown,
            show: (id: string) => {
              asked.push(id);
              return Promise.resolve();
            },
            // A picture is drawn from its small copy here: four cut layers is
            // forty megabytes to glance at one painting. Same store in this
            // stub, so what the tests assert about the tag is unchanged.
            smallUrls: shown,
            showSmall: (id: string) => {
              asked.push(id);
              return Promise.resolve();
            },
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
            qualityOf: (p: KeptPiece) => (Math.min(p.width, p.height) >= 2500 ? 'high' : 'web'),
            listTrouble: signal<string | null>(listTrouble ?? null),
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
      asked,
      filmed,
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

  it('fetches the bytes itself rather than letting the tag do it', () => {
    // The route is behind the admin guard, the guard reads the Authorization
    // header and nothing else, and an `img` cannot send one — so a src
    // pointing straight at it was answered 403, and the shelf this was copied
    // from showed broken images from the day it was written.
    const { host, asked } = build([piece()]);

    expect(asked).toContain('k1');
    expect(host.querySelector('img')?.getAttribute('src')).toBe('blob:fake/k1');
  });

  it('never points at a bucket', () => {
    // There is no public address for an asset, and no url is written down.
    const { host } = build([piece()]);

    expect(host.querySelector('img')?.getAttribute('src')).not.toContain('storage.googleapis');
  });

  it('says so rather than showing a broken tag while the bytes are coming', () => {
    const { host } = build([piece({ id: 'slow' })]);

    expect(host.textContent).toContain('Fetching…');
  });

  it('says plainly that none of this is public', () => {
    const { host } = build([piece()]);

    expect(host.textContent).toContain('closed');
  });

  describe('making a reel of a clip', () => {
    const clip = () =>
      piece({ id: 'c1', kind: 'clip', media: 'video/mp4', width: 768, height: 832 });

    it('offers it for a clip and not for a picture', () => {
      const { host } = build([piece(), clip()]);

      expect(host.querySelector('[data-testid="reel-c1"]')).not.toBeNull();
      expect(host.querySelector('[data-testid="reel-k1"]')).toBeNull();
    });

    it('sends the painting and the clip, and nothing else', async () => {
      const { host, filmed, fixture } = build([clip()]);

      (host.querySelector('[data-testid="reel-c1"]') as HTMLButtonElement).click();
      await fixture.whenStable();

      expect(filmed).toEqual([{ tokenId: '195', kept: 'c1' }]);
    });

    it('says where it went, rather than looking like nothing happened', async () => {
      const { host, fixture } = build([clip()]);

      (host.querySelector('[data-testid="reel-c1"]') as HTMLButtonElement).click();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(host.textContent).toContain('/publish');
    });

    it('says so when the backend refuses, rather than claiming success', async () => {
      // The usual refusal is a reel already waiting for that painting.
      const { host, fixture } = build([clip()], '195', false);

      (host.querySelector('[data-testid="reel-c1"]') as HTMLButtonElement).click();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(host.querySelector('[data-testid="assets-trouble"]')?.textContent).toContain(
        'already waiting'
      );
    });

    it('makes nothing without a press', () => {
      const { filmed } = build([clip()]);

      expect(filmed).toEqual([]);
    });
  });

  /**
   * Which copy of the painting a kept thing was made from, on the thumbnail.
   *
   * A run on the small copy and a run on the big one are the same picture at
   * two sizes, and in a grid of thumbnails they are indistinguishable. One of
   * them is the one worth keeping.
   */
  describe('the size it was made at', () => {
    it('marks a big one high and a small one web', () => {
      const { host } = build([
        piece({ id: 'k1', width: 3652, height: 4533 }),
        piece({ id: 'k2', width: 1024, height: 1086 }),
      ]);

      expect(host.querySelector('[data-testid="quality-k1"]')?.textContent?.trim()).toBe('high');
      expect(host.querySelector('[data-testid="quality-k2"]')?.textContent?.trim()).toBe('web');
    });

    it('says the pixels and the weight on hover, where the badge has no room', () => {
      const { host } = build([piece({ id: 'k1', width: 3652, height: 4533, bytes: 2_400_000 })]);

      expect(host.querySelector('[data-testid="quality-k1"]')?.getAttribute('title')).toBe(
        '3652×4533 · 2.4 MB'
      );
    });
  });
  /**
   * A painting with nothing kept for it, and a list that could not be read,
   * looked exactly the same: a panel with no assets in it.
   *
   * The usual cause is the page asking before the sign-in has been restored,
   * and the answer used to be remembered — so every painting on the page said
   * it had nothing for the rest of the visit.
   */
  describe('when the list itself could not be read', () => {
    it('says so, rather than looking like a painting with nothing kept', () => {
      const { host } = build([], '195', true, 'the sign-in has lapsed; sign in again');

      expect(host.querySelector('[data-testid="assets-no-list"]')?.textContent).toContain(
        'sign in again'
      );
    });

    it('says nothing when the painting simply has none', () => {
      const { host } = build([]);

      expect(host.querySelector('[data-testid="assets-no-list"]')).toBeNull();
    });

    it('says nothing when there are assets to show', () => {
      const { host } = build([piece()], '195', true, 'something went wrong');

      expect(host.querySelector('[data-testid="assets-no-list"]')).toBeNull();
      expect(host.querySelector('[data-testid="assets"]')).not.toBeNull();
    });
  });
});
