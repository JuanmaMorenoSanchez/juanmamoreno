import { TestBed } from '@angular/core/testing';
import { VALIDTRAITS } from '@domain/artwork/artwork.constants';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { CertificateStanding, MintApiService } from '@shared/services/mint-api.service';
import { WalletService } from '@shared/services/wallet.service';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { CertificatesComponent } from './certificates.component';

const OWNER = '0x1111111111111111111111111111111111111111';
const COLLECTOR = '0x2222222222222222222222222222222222222222';

const certificate = (tokenId: string, name: string, height = '999'): Nft => ({
  tokenId,
  name,
  image: { thumbnailUrl: `https://cdn.test/${tokenId}` },
  raw: {
    metadata: {
      attributes: [
        { trait_type: VALIDTRAITS.MEDIUM, value: 'Oil on canvas' },
        { trait_type: VALIDTRAITS.HEIGHT, value: height },
        { trait_type: VALIDTRAITS.WIDTH, value: '116' },
        { trait_type: VALIDTRAITS.UNIT, value: 'cm' },
        { trait_type: VALIDTRAITS.YEAR, value: '2014' },
        { trait_type: VALIDTRAITS.IMAGETYPE, value: 'Frontal view' },
      ],
    },
  },
});

const catalogue = [
  certificate('42', 'Piso de estudiantes'),
  certificate('7', 'Something older'),
  certificate('101', 'A third'),
];

type Page = {
  certificates: () => Nft[];
  search: { set(value: string): void };
  editing: () => number | null;
  draft: () => Record<string, string> | null;
  standing: () => CertificateStanding | null;
  problem: () => string;
  outcome: () => string;
  burnConfirmation: { set(value: string): void };
  canCorrect: () => boolean;
  canSeal: () => boolean;
  canDestroy: () => boolean;
  open(nft: Nft): Promise<void>;
  close(): void;
  correct(): Promise<void>;
  seal(): Promise<void>;
  destroy(): Promise<void>;
};

function setup({
  frozen = false,
  holder = OWNER,
  connected = OWNER,
  standingFails = false,
} = {}) {
  const standing: CertificateStanding = {
    tokenId: 42,
    frozen,
    holder,
    owner: OWNER,
    heldByOwner: holder.toLowerCase() === OWNER.toLowerCase(),
  };

  const api = {
    standing: vi.fn(() =>
      standingFails ? Promise.reject(new Error('no chain')) : Promise.resolve(standing)
    ),
    amendTransaction: vi.fn().mockResolvedValue({ to: '0xabc', data: '0x1', chainId: 1 }),
    freezeTransaction: vi.fn().mockResolvedValue({ to: '0xabc', data: '0x2', chainId: 1 }),
    burnTransaction: vi.fn().mockResolvedValue({ to: '0xabc', data: '0x3', chainId: 1 }),
    settled: vi.fn().mockResolvedValue({ shown: true }),
  };
  const wallet = {
    available: () => true,
    connect: vi.fn().mockResolvedValue(connected),
    send: vi.fn().mockResolvedValue('0xhash'),
  };

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [CertificatesComponent],
    providers: [
      {
        provide: ARTWORK_PORT,
        useValue: {
          getArtPiecesObservable: () => of(catalogue),
          getTraitValue: (nft: Nft, key: string) =>
            nft.raw?.metadata?.attributes?.find(
              (a: { trait_type: string }) => a.trait_type === key
            )?.value ?? '',
        },
      },
      { provide: MintApiService, useValue: api },
      { provide: WalletService, useValue: wallet },
    ],
  });
  TestBed.overrideComponent(CertificatesComponent, { set: { template: '' } });

  const page = TestBed.createComponent(CertificatesComponent)
    .componentInstance as unknown as Page;
  return { page, api, wallet };
}

/**
 * Correcting a certificate that is already on the chain.
 *
 * Every refusal here is the point. Two of the three things this page offers
 * cannot be undone by anybody, and the third rewrites a permanent public record.
 */
describe('CertificatesComponent', () => {
  it('lists every certificate newest first, one row per token', () => {
    const { page } = setup();

    expect(page.certificates().map((one) => one.tokenId)).toEqual(['101', '42', '7']);
  });

  it('finds one by its number, its title or its year', () => {
    const { page } = setup();

    page.search.set('42');
    expect(page.certificates().map((one) => one.tokenId)).toEqual(['42']);

    page.search.set('estudiantes');
    expect(page.certificates().map((one) => one.tokenId)).toEqual(['42']);

    page.search.set('2014');
    expect(page.certificates()).toHaveLength(3);
  });

  it('reads the certificate into the form and asks the chain about it', async () => {
    const { page, api } = setup();

    await page.open(catalogue[0]);

    expect(page.editing()).toBe(42);
    expect(page.draft()?.['height']).toBe('999');
    expect(api.standing).toHaveBeenCalledWith(42);
  });

  /**
   * The chain decides what may be offered, so when it cannot be reached
   * nothing is offered at all — rather than offering everything and finding out
   * at the moment of signing.
   */
  it('offers nothing when the chain cannot be reached', async () => {
    const { page } = setup({ standingFails: true });

    await page.open(catalogue[0]);

    expect(page.standing()).toBeNull();
    expect(page.canCorrect()).toBe(false);
    expect(page.canSeal()).toBe(false);
    expect(page.canDestroy()).toBe(false);
    expect(page.problem()).toContain('could not be reached');
  });

  describe('a frozen certificate', () => {
    it('can be neither corrected, sealed nor destroyed', async () => {
      const { page } = setup({ frozen: true });

      await page.open(catalogue[0]);

      expect(page.canCorrect()).toBe(false);
      expect(page.canSeal()).toBe(false);
      expect(page.canDestroy()).toBe(false);
    });
  });

  describe('one a collector holds', () => {
    /** The record is his; the token is not. */
    it('can still be corrected', async () => {
      const { page } = setup({ holder: COLLECTOR });

      await page.open(catalogue[0]);

      expect(page.canCorrect()).toBe(true);
    });

    it('can never be destroyed, however the number is typed', async () => {
      const { page } = setup({ holder: COLLECTOR });

      await page.open(catalogue[0]);
      page.burnConfirmation.set('42');

      expect(page.canDestroy()).toBe(false);
    });
  });

  describe('destroying one', () => {
    it('stays refused until the number is typed back', async () => {
      const { page } = setup();
      await page.open(catalogue[0]);

      expect(page.canDestroy()).toBe(false);

      page.burnConfirmation.set('41');
      expect(page.canDestroy()).toBe(false);

      page.burnConfirmation.set('42');
      expect(page.canDestroy()).toBe(true);
    });
  });

  describe('signing', () => {
    it('sends the correction and tells the api it settled', async () => {
      const { page, api, wallet } = setup();
      await page.open(catalogue[0]);
      vi.spyOn(window, 'confirm').mockReturnValue(true);

      await page.correct();

      expect(api.amendTransaction).toHaveBeenCalledWith(42, expect.objectContaining({ width: '116' }));
      expect(wallet.send).toHaveBeenCalled();
      expect(api.settled).toHaveBeenCalledWith(42);
      expect(page.outcome()).toContain('corrected');
    });

    /**
     * The contract obeys one address. Signing with any other pays gas to be
     * told no, so it is caught before the transaction is even built.
     */
    it('refuses to sign with a wallet the contract will not obey', async () => {
      const { page, api, wallet } = setup({ connected: COLLECTOR });
      await page.open(catalogue[0]);

      await page.correct();

      expect(api.amendTransaction).not.toHaveBeenCalled();
      expect(wallet.send).not.toHaveBeenCalled();
      expect(page.problem()).toContain(OWNER);
    });

    it('does nothing when the freeze confirmation is dismissed', async () => {
      const { page, api } = setup();
      await page.open(catalogue[0]);
      vi.spyOn(window, 'confirm').mockReturnValue(false);

      await page.seal();

      expect(api.freezeTransaction).not.toHaveBeenCalled();
    });

    it('does nothing when the destroy confirmation is dismissed', async () => {
      const { page, api } = setup();
      await page.open(catalogue[0]);
      page.burnConfirmation.set('42');
      vi.spyOn(window, 'confirm').mockReturnValue(false);

      await page.destroy();

      expect(api.burnTransaction).not.toHaveBeenCalled();
    });

    it('says so and sends nothing when the wallet refuses', async () => {
      const { page, api, wallet } = setup();
      await page.open(catalogue[0]);
      wallet.send.mockRejectedValue(new Error('User rejected the request'));
      vi.spyOn(window, 'confirm').mockReturnValue(true);

      await page.correct();

      expect(page.problem()).toContain('rejected');
      expect(api.settled).not.toHaveBeenCalled();
    });
  });

  it('forgets everything when the row is closed', async () => {
    const { page } = setup();
    await page.open(catalogue[0]);

    page.close();

    expect(page.editing()).toBeNull();
    expect(page.draft()).toBeNull();
    expect(page.standing()).toBeNull();
  });
});
