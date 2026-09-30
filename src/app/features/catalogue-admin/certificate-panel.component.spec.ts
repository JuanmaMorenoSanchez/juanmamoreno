import { TestBed } from '@angular/core/testing';
import { VALIDTRAITS } from '@domain/artwork/artwork.constants';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { CertificateStanding, MintApiService } from '@shared/services/mint-api.service';
import { WalletService } from '@shared/services/wallet.service';
import { vi } from 'vitest';
import { CertificatePanelComponent } from './certificate-panel.component';

const OWNER = '0x1111111111111111111111111111111111111111';
const COLLECTOR = '0x2222222222222222222222222222222222222222';

const painting: Nft = {
  tokenId: '42',
  name: 'Piso de estudiantes',
  image: { thumbnailUrl: 'data:image/jpeg;base64,x' },
  raw: {
    metadata: {
      attributes: [
        { trait_type: VALIDTRAITS.MEDIUM, value: 'Watercolor on paper' },
        { trait_type: VALIDTRAITS.HEIGHT, value: '999' },
        { trait_type: VALIDTRAITS.WIDTH, value: '116' },
        { trait_type: VALIDTRAITS.UNIT, value: 'cm' },
        { trait_type: VALIDTRAITS.YEAR, value: '2014' },
        { trait_type: VALIDTRAITS.IMAGETYPE, value: 'Frontal view' },
      ],
    },
  },
};

type Panel = {
  draft: () => Record<string, string> | null;
  standing: () => CertificateStanding | null;
  problem: () => string;
  outcome: () => string;
  burnConfirmation: { set(value: string): void };
  canCorrect: () => boolean;
  canSeal: () => boolean;
  canDestroy: () => boolean;
  correct(): Promise<void>;
  seal(): Promise<void>;
  destroy(): Promise<void>;
};

const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

async function setup({
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
    imports: [CertificatePanelComponent],
    providers: [
      {
        provide: ARTWORK_PORT,
        useValue: {
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
  TestBed.overrideComponent(CertificatePanelComponent, { set: { template: '' } });

  const fixture = TestBed.createComponent(CertificatePanelComponent);
  fixture.componentRef.setInput('painting', painting);
  fixture.detectChanges();
  await settle();

  return { panel: fixture.componentInstance as unknown as Panel, api, wallet };
}

/**
 * What can be done to a certificate that is already on the chain.
 *
 * Every refusal here is the point: two of the three things this offers cannot
 * be undone by anybody, and the third rewrites a permanent public record.
 */
describe('CertificatePanelComponent', () => {
  it('reads the certificate into the form and asks the chain about it', async () => {
    const { panel, api } = await setup();

    expect(panel.draft()?.['height']).toBe('999');
    expect(api.standing).toHaveBeenCalledWith(42);
  });

  /**
   * The chain decides what may be offered, so when it cannot be reached nothing
   * is offered at all — rather than offering everything and finding out at the
   * moment of signing.
   */
  it('offers nothing when the chain cannot be reached', async () => {
    const { panel } = await setup({ standingFails: true });

    expect(panel.standing()).toBeNull();
    expect(panel.canCorrect()).toBe(false);
    expect(panel.canSeal()).toBe(false);
    expect(panel.canDestroy()).toBe(false);
    expect(panel.problem()).toContain('could not be reached');
  });

  it('offers nothing at all for a frozen certificate', async () => {
    const { panel } = await setup({ frozen: true });

    expect(panel.canCorrect()).toBe(false);
    expect(panel.canSeal()).toBe(false);
    expect(panel.canDestroy()).toBe(false);
  });

  describe('one a collector holds', () => {
    /** The record is his; the token is not. */
    it('can still be corrected', async () => {
      const { panel } = await setup({ holder: COLLECTOR });

      expect(panel.canCorrect()).toBe(true);
    });

    it('can never be destroyed, however the number is typed', async () => {
      const { panel } = await setup({ holder: COLLECTOR });

      panel.burnConfirmation.set('42');

      expect(panel.canDestroy()).toBe(false);
    });
  });

  it('refuses to destroy until the number is typed back', async () => {
    const { panel } = await setup();

    expect(panel.canDestroy()).toBe(false);

    panel.burnConfirmation.set('41');
    expect(panel.canDestroy()).toBe(false);

    panel.burnConfirmation.set('42');
    expect(panel.canDestroy()).toBe(true);
  });

  describe('signing', () => {
    it('sends the correction and tells the api it settled', async () => {
      const { panel, api, wallet } = await setup();
      vi.spyOn(window, 'confirm').mockReturnValue(true);

      await panel.correct();

      expect(api.amendTransaction).toHaveBeenCalledWith(
        42,
        expect.objectContaining({ width: '116' })
      );
      expect(wallet.send).toHaveBeenCalled();
      expect(api.settled).toHaveBeenCalledWith(42);
      expect(panel.outcome()).toContain('corrected');
    });

    /**
     * The contract obeys one address. Signing with any other pays gas to be
     * told no, so it is caught before the transaction is even built.
     */
    it('refuses to sign with a wallet the contract will not obey', async () => {
      const { panel, api, wallet } = await setup({ connected: COLLECTOR });

      await panel.correct();

      expect(api.amendTransaction).not.toHaveBeenCalled();
      expect(wallet.send).not.toHaveBeenCalled();
      expect(panel.problem()).toContain(OWNER);
    });

    it('does nothing when the freeze confirmation is dismissed', async () => {
      const { panel, api } = await setup();
      vi.spyOn(window, 'confirm').mockReturnValue(false);

      await panel.seal();

      expect(api.freezeTransaction).not.toHaveBeenCalled();
    });

    it('does nothing when the destroy confirmation is dismissed', async () => {
      const { panel, api } = await setup();
      panel.burnConfirmation.set('42');
      vi.spyOn(window, 'confirm').mockReturnValue(false);

      await panel.destroy();

      expect(api.burnTransaction).not.toHaveBeenCalled();
    });

    it('says so and settles nothing when the wallet refuses', async () => {
      const { panel, api, wallet } = await setup();
      wallet.send.mockRejectedValue(new Error('User rejected the request'));
      vi.spyOn(window, 'confirm').mockReturnValue(true);

      await panel.correct();

      expect(panel.problem()).toContain('rejected');
      expect(api.settled).not.toHaveBeenCalled();
    });
  });

  /**
   * What the form actually shows, drawn rather than asked of the class.
   *
   * This is where a real fault hid: `[value]` on a `<select>` is applied before
   * `@for` has rendered its options, so the select falls back to its first
   * option and the form reads "Oil on canvas, 2026" over a watercolour from
   * 2010. Nothing about the component's state was wrong — only the picture of
   * it — and pressing Correct would have written the first option onto a
   * permanent record.
   */
  describe('the form as it is drawn', () => {
    const rendered = async () => {
      const standing = { tokenId: 42, frozen: false, holder: OWNER, owner: OWNER, heldByOwner: true };
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [CertificatePanelComponent],
        providers: [
          {
            provide: ARTWORK_PORT,
            useValue: {
              getTraitValue: (nft: Nft, key: string) =>
                nft.raw?.metadata?.attributes?.find(
                  (a: { trait_type: string }) => a.trait_type === key
                )?.value ?? '',
            },
          },
          {
            provide: MintApiService,
            useValue: { standing: vi.fn().mockResolvedValue(standing) },
          },
          { provide: WalletService, useValue: { available: () => true } },
        ],
      });
      const fixture = TestBed.createComponent(CertificatePanelComponent);
      fixture.componentRef.setInput('painting', painting);
      fixture.detectChanges();
      await settle();
      fixture.detectChanges();
      return fixture;
    };

    it('shows the medium the certificate carries, not the first one on the list', async () => {
      const fixture = await rendered();
      const selects = [...fixture.nativeElement.querySelectorAll('select')] as HTMLSelectElement[];

      expect(selects[0].value).toBe('Watercolor on paper');
    });

    it('shows the year the painting was made, not the current one', async () => {
      const fixture = await rendered();
      const selects = [...fixture.nativeElement.querySelectorAll('select')] as HTMLSelectElement[];

      // Medium, unit, year, image type — in the order the form lays them out.
      expect(selects[2].value).toBe('2014');
    });

    it('shows the measurements it was written with', async () => {
      const fixture = await rendered();
      const inputs = [...fixture.nativeElement.querySelectorAll('input')] as HTMLInputElement[];

      expect(inputs.map((one) => one.value)).toContain('999');
      expect(inputs.map((one) => one.value)).toContain('116');
    });
  });
});
