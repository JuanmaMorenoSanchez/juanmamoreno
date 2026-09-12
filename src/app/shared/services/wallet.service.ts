import { Injectable, signal } from '@angular/core';

/** Ethereum mainnet, where the certificates are. */
const MAINNET = '0x1';

/**
 * The wallet the browser has, if it has one.
 *
 * EIP-1193, which every wallet's in-app browser provides: opening the studio
 * inside the wallet app puts `window.ethereum` on the page and a transaction can
 * be handed to it. No library, no connector service, no project id — the site
 * already talks to a node over plain fetch and this is the same idea.
 *
 * This is what makes signing on a phone possible without a key on the server.
 * The artist's own wallet is the contract's minter, so he signs as himself; the
 * server assembles the certificate and never holds anything that could write it.
 */
interface Eip1193 {
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
  on?(event: string, handler: (...args: unknown[]) => void): void;
}

@Injectable({ providedIn: 'root' })
export class WalletService {
  /** The connected address, or null while nobody has connected. */
  readonly account = signal<string | null>(null);

  private get provider(): Eip1193 | null {
    const injected = (globalThis as { ethereum?: Eip1193 }).ethereum;
    return injected ?? null;
  }

  /** Whether there is a wallet here at all, which on a desktop there usually is not. */
  public available(): boolean {
    return this.provider !== null;
  }

  /**
   * Asks the wallet who is signing, and that it be on the right chain.
   *
   * The chain is checked before anything is signed rather than after: a wallet
   * pointed at another network would sign something meaningless and report
   * success, and the certificate would look written when nothing had happened.
   */
  public async connect(): Promise<string> {
    const wallet = this.provider;
    if (!wallet) {
      throw new Error(
        'No wallet on this page. Open the studio inside your wallet app’s browser and try again.'
      );
    }

    const accounts = (await wallet.request({ method: 'eth_requestAccounts' })) as string[];
    const account = accounts?.[0];
    if (!account) throw new Error('The wallet did not say which account to use.');

    const chain = (await wallet.request({ method: 'eth_chainId' })) as string;
    if (chain !== MAINNET) {
      try {
        await wallet.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: MAINNET }],
        });
      } catch {
        throw new Error(
          'This wallet is not on Ethereum mainnet, which is where the certificates are.'
        );
      }
    }

    this.account.set(account);
    return account;
  }

  /**
   * Hands a prepared transaction to the wallet and gives back its hash.
   *
   * Nothing here builds or interprets the call: the bytes arrive from the
   * server, which is the only place that decides what a certificate says.
   */
  public async send(transaction: { to: string; data: string }): Promise<string> {
    const wallet = this.provider;
    const from = this.account();
    if (!wallet || !from) throw new Error('No wallet is connected.');

    return (await wallet.request({
      method: 'eth_sendTransaction',
      params: [{ from, to: transaction.to, data: transaction.data }],
    })) as string;
  }
}
