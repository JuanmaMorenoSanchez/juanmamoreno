import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { KeptService, type KeptPiece } from '@features/atelier/kept.service';
import { PiecesComponent } from './pieces.component';

/**
 * Where a written piece can be looked at again.
 *
 * The distinction this page exists to hold is between *kept* and
 * *published*, and the test that matters most is the one asserting there is
 * no button here that publishes. An earlier version of the generative route
 * resolved any id at all, so every save put a page on the public site that
 * nobody had chosen to put there; registering by hand is what replaced that,
 * and a page listing pieces is exactly where the shortcut would creep back.
 */
describe('PiecesComponent', () => {
  const piece = (over: Partial<KeptPiece> = {}): KeptPiece => ({
    id: 'p1',
    name: 'dust that gathers towards the pointer',
    tokenId: null,
    kind: 'piece',
    media: 'text/javascript',
    width: 0,
    height: 0,
    bytes: 1240,
    created: '2026-10-11T09:00:00.000Z',
    ...over,
  });

  const build = async (kept: KeptPiece[]) => {
    const held = signal(kept);
    const forgotten: string[] = [];

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [PiecesComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: KeptService,
          useValue: {
            pieces: held,
            urls: signal(Object.fromEntries(kept.map((p) => [p.id, `blob:fake/${p.id}`]))),
            show: () => Promise.resolve(),
            ensure: () => Promise.resolve(),
            forget: (id: string) => {
              forgotten.push(id);
              held.update((all) => all.filter((p) => p.id !== id));
              return Promise.resolve();
            },
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(PiecesComponent);
    fixture.detectChanges();
    // The list is asked for in the constructor and arrives a microtask
    // later; before that the page honestly says it is looking.
    await fixture.whenStable();
    fixture.detectChanges();
    return { fixture, host: fixture.nativeElement as HTMLElement, forgotten };
  };

  it('lists a kept piece', async () => {
    const { host } = await build([piece()]);

    expect(host.querySelector('[data-testid="kept"]')?.textContent).toContain('dust that gathers');
  });

  it('shows only pieces, not layers or clips', async () => {
    // They all live in the same place; only the ones that are code belong on
    // a page about code.
    const { host } = await build([
      piece(),
      piece({ id: 'l1', kind: 'layer', media: 'image/png', name: 'a girl' }),
      piece({ id: 'c1', kind: 'clip', media: 'video/mp4', name: 'Siesta filmed' }),
    ]);

    expect(host.querySelectorAll('[data-testid="kept"] li')).toHaveLength(1);
  });

  it('lists what is actually published, from the registry', async () => {
    // Read from the registry because the registry is what decides. A kept
    // piece carries nothing that could be matched against it.
    const { host } = await build([]);

    expect(host.querySelector('.pieces-published')?.textContent).toContain('/generative/believe');
    expect(host.querySelector('.pieces-published')?.textContent).toContain('/generative/hide');
  });

  it('publishes nothing, and offers no way to', async () => {
    // The whole point of the page. Registering is a line in registry.ts,
    // added by hand, because an id that resolved by existing once put pages
    // on the public site that nobody had chosen.
    const { host } = await build([piece()]);
    const labels = [...host.querySelectorAll('button')].map((b) => b.textContent?.toLowerCase());

    for (const label of labels) {
      expect(label).not.toContain('publish');
    }
    expect(host.textContent).toContain('Keeping is not publishing');
  });

  it('says there is nothing rather than showing an empty list', async () => {
    const { host } = await build([]);

    expect(host.querySelector('[data-testid="none"]')?.textContent).toContain('Nothing kept yet');
  });

  it('forgets one when asked', async () => {
    const { host, forgotten, fixture } = await build([piece()]);

    (host.querySelector('[data-testid="forget-p1"]') as HTMLButtonElement).click();
    await fixture.whenStable();

    expect(forgotten).toEqual(['p1']);
  });

  it('offers to run one', async () => {
    const { host } = await build([piece()]);

    expect(host.querySelector('[data-testid="run-p1"]')).not.toBeNull();
  });
});
