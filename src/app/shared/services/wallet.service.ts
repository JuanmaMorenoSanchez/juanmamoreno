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
 * The wallet the page can reach, of which there are two kinds.
 *
 * An injected EIP-1193 provider is used whenever the page has one: an extension
 * on the laptop, or the studio opened inside a wallet app's own browser, where
 * `window.ethereum` is simply there and nothing has to be loaded.
 *
 * When there is none — an ordinary Safari or Chrome on a phone — Coinbase
 * Wallet is reached over its own relay instead, which deep-links into the app to
 * sign and comes back. That case is not an edge: signing in needs Google, and
 * Google refuses to sign anyone in from inside an embedded wallet browser, where
 * its popup is a white screen rather than a refusal. So the browser that can
 * sign in is precisely the one with no wallet in it, and this is what bridges
 * the two.
 *
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

  /** Coinbase Wallet over its own relay, built on first use and then kept. */
  private relay: Eip1193 | null = null;

  /**
   * The injected wallet if there is one, and Coinbase Wallet if there is not.
   *
   * The relay is imported where it is used rather than at the top of the file,
   * so the catalogue — every page of which is prerendered and read without
   * signing in to anything — never downloads an Ethereum library to show a
   * painting.
   */
  private async provider(): Promise<Eip1193> {
    const injected = (globalThis as { ethereum?: Eip1193 }).ethereum;
    if (injected) return injected;

    if (!this.relay) {
      const { createCoinbaseWalletSDK } = await import('@coinbase/wallet-sdk');
      this.relay = createCoinbaseWalletSDK({
        appName: 'Juanma Moreno Sánchez',
        appChainIds: [1],
        // eoaOnly, because a Smart Wallet would be a newly created address and
        // the contract obeys exactly one — the wallet he already holds.
        preference: { options: 'eoaOnly' },
      }).getProvider() as Eip1193;
    }
    return this.relay;
  }

  /**
   * Asks the wallet who is signing, and that it be on the right chain.
   *
   * The chain is checked before anything is signed rather than after: a wallet
   * pointed at another network would sign something meaningless and report
   * success, and the certificate would look written when nothing had happened.
   */
  public async connect(): Promise<string> {
    const wallet = await this.provider();

    const accounts = (await within(
      wallet.request({ method: 'eth_requestAccounts' }) as Promise<string[]>,
      ANSWER_WITHIN,
      'Your wallet did not answer. Open it, unlock it, and press Mint again.'
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
    // Who is signing is checked before a wallet is reached for, so nothing is
    // loaded or woken up on behalf of a caller that has not connected.
    const from = this.account();
    if (!from) throw new Error('No wallet is connected.');

    const wallet = await this.provider();

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
