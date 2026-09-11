import { DestroyRef, Injectable, inject, signal } from '@angular/core';

/**
 * What a unit of gas costs on Ethereum right now.
 *
 * Read as the base fee of the latest block rather than from `eth_gasPrice`,
 * because the two disagree and only one of them is what a transaction is
 * charged. During the migration `eth_gasPrice` quoted 0.079 gwei while the
 * transactions settled between 0.52 and 0.65, and the run stopped fifty-eight
 * paintings in with the money for ten more, having been told all along that it
 * was cheap.
 *
 * A public endpoint, asked every fifteen seconds. Blocks arrive every twelve, so
 * that is close to as often as there is anything new to hear, and it costs
 * nothing.
 */
@Injectable({ providedIn: 'root' })
export class GasPriceService {
  /** The most a certificate is worth paying for, in gwei. */
  static readonly LIMIT = 0.7;

  private static readonly ENDPOINT = 'https://ethereum-rpc.publicnode.com';
  private static readonly EVERY_MS = 15_000;

  private readonly gwei = signal<number | null>(null);
  private readonly failing = signal(false);
  private timer: ReturnType<typeof setInterval> | null = null;
  private watchers = 0;

  /** Gwei, or null before the first answer arrives. */
  readonly price = this.gwei.asReadonly();
  /** True when the last read did not come back, so the price shown is stale. */
  readonly unreachable = this.failing.asReadonly();

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  /**
   * Starts asking, and stops when the last caller goes away.
   *
   * Counted rather than a plain boolean because two components can want the
   * price at once — the studio and the pending list — and the first of them to
   * be closed should not silence the other.
   */
  watch(): () => void {
    this.watchers += 1;
    if (this.watchers === 1) {
      void this.read();
      this.timer = setInterval(() => void this.read(), GasPriceService.EVERY_MS);
    }
    return () => {
      this.watchers -= 1;
      if (this.watchers <= 0) this.stop();
    };
  }

  /** Whether a certificate is worth minting at the price last heard. */
  affordable(): boolean {
    const price = this.gwei();
    return price !== null && price <= GasPriceService.LIMIT;
  }

  private stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.watchers = 0;
  }

  private async read(): Promise<void> {
    try {
      const response = await fetch(GasPriceService.ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_getBlockByNumber',
          params: ['latest', false],
        }),
        signal: AbortSignal.timeout(10_000),
      });
      const body = (await response.json()) as { result?: { baseFeePerGas?: string } };
      const raw = body.result?.baseFeePerGas;
      if (!raw) throw new Error('no base fee in the answer');

      this.gwei.set(Number(BigInt(raw)) / 1e9);
      this.failing.set(false);
    } catch {
      // The last price stands, and is marked as stale. Clearing it would turn a
      // moment's bad network into "the price is unknown, do not mint".
      this.failing.set(true);
    }
  }
}
