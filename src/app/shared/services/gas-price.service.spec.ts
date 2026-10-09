import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { GasPriceService } from './gas-price.service';

/**
 * The ceiling, and what it will accept being moved to.
 *
 * It exists because a run of certificates stopped fifty-eight paintings in,
 * having been told all along that gas was cheap. It can now be moved from
 * beside the button, which means it can also be moved to nonsense — and a
 * ceiling of `NaN` is one nothing ever compares true against, so every
 * certificate is refused with nothing on screen to say why.
 */
describe('GasPriceService', () => {
  let gas: GasPriceService;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
    gas = TestBed.inject(GasPriceService);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  /** Lets a base fee arrive the way a real one does, through the endpoint. */
  const arrive = async (gwei: number) => {
    const wei = BigInt(Math.round(gwei * 1e9));
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ result: { baseFeePerGas: `0x${wei.toString(16)}` } }),
      })
    );
    const stop = gas.watch();
    await vi.waitFor(() => expect(gas.price()).not.toBeNull());
    stop();
  };

  it('starts at the figure that was there before it could be moved', () => {
    expect(gas.limit()).toBe(GasPriceService.LIMIT);
    expect(gas.limit()).toBe(0.06);
  });

  it('knows nothing is affordable before a price has arrived', () => {
    expect(gas.price()).toBeNull();
    expect(gas.affordable()).toBe(false);
  });

  it('reads the base fee of the latest block, in gwei', async () => {
    await arrive(0.0601);

    expect(gas.price()).toBeCloseTo(0.0601, 6);
    expect(gas.unreachable()).toBe(false);
  });

  it('judges the price against the ceiling in force, not the one it started at', async () => {
    await arrive(1.4);
    expect(gas.affordable()).toBe(false);

    gas.setLimit(2);

    expect(gas.limit()).toBe(2);
    expect(gas.affordable()).toBe(true);
  });

  it('allows exactly the ceiling', async () => {
    await arrive(0.06);

    expect(gas.affordable()).toBe(true);
  });

  it('refuses a hair above it', async () => {
    await arrive(0.0601);

    expect(gas.affordable()).toBe(false);
  });

  it('takes zero, which is a way of saying stop', async () => {
    await arrive(0.01);
    expect(gas.affordable()).toBe(true);

    gas.setLimit(0);

    expect(gas.limit()).toBe(0);
    expect(gas.affordable()).toBe(false);
  });

  it('ignores an emptied input instead of taking NaN as the ceiling', () => {
    gas.setLimit(2);
    gas.setLimit(Number.NaN);

    expect(gas.limit()).toBe(2);
  });

  it('ignores a negative ceiling', () => {
    gas.setLimit(-1);

    expect(gas.limit()).toBe(GasPriceService.LIMIT);
  });

  it('ignores an infinite one', () => {
    // Which a long enough run of digits in a number input will give.
    gas.setLimit(Number.POSITIVE_INFINITY);

    expect(gas.limit()).toBe(GasPriceService.LIMIT);
  });
});
