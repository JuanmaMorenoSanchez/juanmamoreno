import { Injectable, signal } from '@angular/core';

/** Ethereum mainnet, where the certificates are. */
const MAINNET = '0x1';

/**
 * How long to wait on a wallet before saying so.
 *
 * A wallet that is never going to answer answers by never answering: the
 * promise it hands back simply does not settle. Left alone that is a page that
 * sits doing nothing for as long as anyone is willing to watch it, which is
 * what happened — a mint that "took forever" and never went through, with no
 * transaction on the chain and nothing said.
 *
 * Signing is the long one, because it waits on a person finding their phone.
 */
const ANSWER_WITHIN = 60_000;
const SIGNATURE_WITHIN = 300_000;

/** The same promise, with an end to it. */
function within<T>(work: Promise<T>, ms: number, complaint: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const bell = setTimeout(() => reject(new Error(complaint)), ms);
    work.then(
      (value) => {
        clearTimeout(bell);
        resolve(value);
      },
      (failure) => {
        clearTimeout(bell);
        reject(failure);
      }
    );
  });
}

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

    const accounts = (await within(
      wallet.request({ method: 'eth_requestAccounts' }) as Promise<string[]>,
      ANSWER_WITHIN,
      'Your wallet did not answer. Open it, unlock it, and press Sign again.'
    )) as string[];
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
  public async send(transaction: {
    to: string;
    data: string;
    maxFeePerGas?: string;
    maxPriorityFeePerGas?: string;
  }): Promise<string> {
    const wallet = this.provider;
    const from = this.account();
    if (!wallet || !from) throw new Error('No wallet is connected.');

    // The fees are passed on exactly as they arrive, and left out when they did
    // not: a wallet choosing for itself added a tip twice the size of what the
    // chain was charging. Some wallets override this and some honour it; being
    // overridden costs nothing that was not already being paid.
    const fees =
      transaction.maxFeePerGas && transaction.maxPriorityFeePerGas
        ? {
            maxFeePerGas: transaction.maxFeePerGas,
            maxPriorityFeePerGas: transaction.maxPriorityFeePerGas,
          }
        : {};

    return (await within(
      wallet.request({
        method: 'eth_sendTransaction',
        params: [{ from, to: transaction.to, data: transaction.data, ...fees }],
      }) as Promise<string>,
      SIGNATURE_WITHIN,
      'Your wallet never came back with a signature, so nothing was sent. ' +
        'The certificate is untouched and still on the list.'
    )) as string;
  }
}
