import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MintApiService, type PendingMint } from '@shared/services/mint-api.service';
import { WalletService } from '@shared/services/wallet.service';
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
  onSend?: () => Promise<string>;
  written?: boolean;
}) {
  const discarded: number[] = [];
  const asked: Array<{ tokenId: number; to: string }> = [];
  const sent: unknown[] = [];
  const confirmed: number[] = [];
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
          mintTransaction: (tokenId: number, to: string) => {
            asked.push({ tokenId, to });
            return Promise.resolve({ to: '0xcontract', data: '0xdata', chainId: 1, tokenId });
          },
          written: (tokenId: number) => {
            confirmed.push(tokenId);
            return Promise.resolve({ written: options.written ?? true });
          },
        },
      },
      {
        provide: WalletService,
        useValue: {
          connect: () => Promise.resolve('0xhis-wallet'),
          send: (transaction: unknown) => {
            sent.push(transaction);
            return options.onSend ? options.onSend() : Promise.resolve('0xhash');
          },
        },
      },
    ],
  });
  const fixture = TestBed.createComponent(PendingCertificatesComponent);
  fixture.detectChanges();
  return {
    fixture,
    discarded,
    asked,
    sent,
    confirmed,
    host: fixture.nativeElement as HTMLElement,
  };
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

    (host.querySelector('[data-testid="discard-5"]') as HTMLButtonElement).click();
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

/**
 * Writing one to the chain, from the list.
 *
 * His wallet, his confirmation, his gas. The api encodes the call — it is the
 * only thing that decides what a certificate says — and the chain is asked
 * whether it landed before anything comes off the list.
 */
describe('minting one from the list', () => {
  const mint = (fixture: { componentInstance: unknown }) =>
    (fixture.componentInstance as { mint(id: number): Promise<void> }).mint(5);

  it('asks the api for the call with the wallet that will hold it', async () => {
    const { fixture, asked, sent } = setup({ list: [waiting(5)] });
    await settled(fixture);

    await mint(fixture);

    expect(asked).toEqual([{ tokenId: 5, to: '0xhis-wallet' }]);
    expect(sent).toEqual([{ to: '0xcontract', data: '0xdata', chainId: 1, tokenId: 5 }]);
  });

  it('asks the chain whether it landed, and then takes it off the list', async () => {
    const { fixture, host, confirmed } = setup({ list: [waiting(5), waiting(6)] });
    await settled(fixture);

    await mint(fixture);
    fixture.detectChanges();

    expect(confirmed).toEqual([5]);
    expect(host.querySelectorAll('.pending-one')).toHaveLength(1);
    expect(host.textContent).toContain('on the chain');
  });

  /**
   * A wallet answers with a hash the moment it signs, which says the
   * transaction was sent and nothing about whether it was mined. One dropped
   * on the strength of a hash that later failed is one nothing would write
   * again.
   */
  it('keeps one that was sent but not yet mined', async () => {
    const { fixture, host } = setup({ list: [waiting(5)], written: false });
    await settled(fixture);

    await mint(fixture);
    fixture.detectChanges();

    expect(host.querySelectorAll('.pending-one')).toHaveLength(1);
    expect(host.textContent).toContain('not been mined yet');
  });

  it('says what went wrong when the wallet refused, and keeps it', async () => {
    const { fixture, host } = setup({
      list: [waiting(5)],
      onSend: () => Promise.reject(new Error('User rejected the request')),
    });
    await settled(fixture);

    await mint(fixture);
    fixture.detectChanges();

    expect(host.textContent).toContain('User rejected the request');
    expect(host.querySelectorAll('.pending-one')).toHaveLength(1);
  });
});
