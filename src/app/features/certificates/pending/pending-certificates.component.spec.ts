import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MintApiService, type PendingMint } from '@shared/services/mint-api.service';
import { PendingCertificatesComponent } from './pending-certificates.component';

/**
 * The queue at the top of the certificates page.
 *
 * It exists because there was a count and no list: the form said "3 waiting
 * to be written" and linked to `/pendingmint`, which redirects to the page it
 * was already on, so the only mention of the queue did nothing when pressed.
 */
const waiting = (tokenId: number, name = 'A painting'): PendingMint => ({
  tokenId,
  name,
  description: 'Oil on linen',
  external_url: `https://juanmamoreno.com/artwork/${tokenId}`,
  attributes: [],
  thumbnailBase64: 'AAAA',
  webUrl: '',
  originalUrl: '',
  preparedAt: new Date().toISOString(),
});

function setup(options: {
  list?: PendingMint[];
  fails?: boolean;
  onDiscard?: () => Promise<void>;
}) {
  const discarded: number[] = [];
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [PendingCertificatesComponent],
    providers: [
      provideZonelessChangeDetection(),
      {
        provide: MintApiService,
        useValue: {
          waiting: () =>
            options.fails ? Promise.reject(new Error('no')) : Promise.resolve(options.list ?? []),
          discard: (tokenId: number) => {
            discarded.push(tokenId);
            return options.onDiscard ? options.onDiscard() : Promise.resolve();
          },
        },
      },
    ],
  });
  const fixture = TestBed.createComponent(PendingCertificatesComponent);
  fixture.detectChanges();
  return { fixture, discarded, host: fixture.nativeElement as HTMLElement };
}

/** The list is fetched in an effect, so give the promise a turn to land. */
const settled = async (fixture: { detectChanges(): void }) => {
  await Promise.resolve();
  await Promise.resolve();
  fixture.detectChanges();
};

describe('the certificates waiting to be signed', () => {
  it('lists them, with the picture the token will carry', async () => {
    const { fixture, host } = setup({ list: [waiting(5, 'Las Meninas'), waiting(6)] });
    await settled(fixture);

    expect(host.querySelectorAll('.pending-one')).toHaveLength(2);
    expect(host.textContent).toContain('Las Meninas');
    expect(host.querySelector('img')?.getAttribute('src')).toBe('data:image/jpeg;base64,AAAA');
  });

  // Nothing waiting is not a section at all: an empty heading on the page he
  // works on most is a line to read and skip every time.
  it('draws nothing at all when the queue is empty', async () => {
    const { fixture, host } = setup({ list: [] });
    await settled(fixture);

    expect(host.querySelector('.pending')).toBeNull();
  });

  // An empty queue and an api that did not answer are different answers.
  it('says so when the api did not answer', async () => {
    const { fixture, host } = setup({ fails: true });
    await settled(fixture);

    expect(host.textContent).toContain('did not answer');
  });

  it('asks before throwing one away, because the photograph goes with it', async () => {
    const { fixture, host, discarded } = setup({ list: [waiting(5)] });
    await settled(fixture);

    (host.querySelectorAll('.pending-doing button')[0] as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(discarded).toEqual([]);
    expect(host.textContent).toContain('Throw it away?');
  });

  it('discards on the second press and takes it off the list', async () => {
    const { fixture, host, discarded } = setup({ list: [waiting(5), waiting(6)] });
    await settled(fixture);

    const parts = fixture.componentInstance as unknown as {
      ask(id: number): void;
      discard(id: number): Promise<void>;
    };
    parts.ask(5);
    await parts.discard(5);
    fixture.detectChanges();

    expect(discarded).toEqual([5]);
    expect(host.querySelectorAll('.pending-one')).toHaveLength(1);
  });

  it('keeps it on the list when the api refused to discard it', async () => {
    const { fixture, host } = setup({
      list: [waiting(5)],
      onDiscard: () => Promise.reject({ error: { message: 'It is already signed' } }),
    });
    await settled(fixture);

    await (fixture.componentInstance as unknown as { discard(id: number): Promise<void> }).discard(
      5
    );
    fixture.detectChanges();

    expect(host.textContent).toContain('It is already signed');
    expect(host.querySelectorAll('.pending-one')).toHaveLength(1);
  });

  // The page bumps this when the form has prepared one, which is the only
  // thing the two components know about each other.
  it('asks again when the page says something has been prepared', async () => {
    const { fixture, host } = setup({ list: [waiting(5)] });
    await settled(fixture);
    expect(host.querySelectorAll('.pending-one')).toHaveLength(1);

    fixture.componentRef.setInput('reload', 1);
    fixture.detectChanges();
    await settled(fixture);

    expect(host.querySelectorAll('.pending-one')).toHaveLength(1);
  });
});
