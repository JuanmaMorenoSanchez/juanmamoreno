import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { WalletService } from './wallet.service';

/**
 * Coinbase Wallet, stood in for.
 *
 * The real one opens the app, so what is checked here is that a page with no
 * wallet of its own reaches for it at all rather than giving up — which is the
 * whole phone case.
 */
const relay = vi.hoisted(() => ({
  request: vi.fn(async ({ method }: { method: string }) => {
    if (method === 'eth_requestAccounts') return ['0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9'];
    if (method === 'eth_chainId') return '0x1';
    return '0xhash';
  }),
}));

vi.mock('@coinbase/wallet-sdk', () => ({
  createCoinbaseWalletSDK: () => ({ getProvider: () => relay }),
}));

/**
 * The wallet in the browser, which is what makes signing on a phone possible
 * without a key on the server.
 */
describe('WalletService', () => {
  let wallet: WalletService;
  const ACCOUNT = '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9';

  const inject = (answers: Record<string, unknown>, onSwitch?: () => void) => {
    const request = vi.fn(async ({ method }: { method: string }) => {
      if (method === 'wallet_switchEthereumChain') {
        if (onSwitch) return onSwitch();
        return null;
      }
      return answers[method];
    });
    (globalThis as { ethereum?: unknown }).ethereum = { request };
    return request;
  };

  beforeEach(() => {
    delete (globalThis as { ethereum?: unknown }).ethereum;
    relay.request.mockClear();
    TestBed.configureTestingModule({});
    wallet = TestBed.inject(WalletService);
  });

  afterEach(() => delete (globalThis as { ethereum?: unknown }).ethereum);

  it('asks who is signing and remembers them', async () => {
    inject({ eth_requestAccounts: [ACCOUNT], eth_chainId: '0x1' });

    await expect(wallet.connect()).resolves.toBe(ACCOUNT);
    expect(wallet.account()).toBe(ACCOUNT);
  });

  it('refuses to go on when the wallet will not leave the wrong chain', async () => {
    // The failure this prevents is the quiet one: a wallet on another network
    // signs something meaningless and reports success, and the certificate
    // looks written when nothing happened.
    inject({ eth_requestAccounts: [ACCOUNT], eth_chainId: '0x2105' }, () => {
      throw new Error('user rejected');
    });

    await expect(wallet.connect()).rejects.toThrow(/mainnet/);
    expect(wallet.account()).toBeNull();
  });

  it('asks the wallet to switch when it is on another chain, and carries on', async () => {
    const request = inject({ eth_requestAccounts: [ACCOUNT], eth_chainId: '0x2105' });

    await expect(wallet.connect()).resolves.toBe(ACCOUNT);
    expect(request).toHaveBeenCalledWith({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1' }],
    });
  });

  it('sends exactly what it was given, and builds nothing itself', async () => {
    const request = inject({
      eth_requestAccounts: [ACCOUNT],
      eth_chainId: '0x1',
      eth_sendTransaction: '0xhash',
    });
    await wallet.connect();

    const hash = await wallet.send({ to: '0xcontract', data: '0xdeadbeef' });

    expect(hash).toBe('0xhash');
    expect(request).toHaveBeenCalledWith({
      method: 'eth_sendTransaction',
      params: [{ from: ACCOUNT, to: '0xcontract', data: '0xdeadbeef' }],
    });
  });

  it('passes the fees on when the api worked them out', async () => {
    // Left to itself the wallet added a tip twice what the chain was charging,
    // which was two thirds of the cost of a certificate.
    const request = inject({
      eth_requestAccounts: [ACCOUNT],
      eth_chainId: '0x1',
      eth_sendTransaction: '0xhash',
    });
    await wallet.connect();

    await wallet.send({
      to: '0xcontract',
      data: '0xdeadbeef',
      maxFeePerGas: '0x6553f100',
      maxPriorityFeePerGas: '0x989680',
    });

    expect(request).toHaveBeenCalledWith({
      method: 'eth_sendTransaction',
      params: [
        {
          from: ACCOUNT,
          to: '0xcontract',
          data: '0xdeadbeef',
          maxFeePerGas: '0x6553f100',
          maxPriorityFeePerGas: '0x989680',
        },
      ],
    });
  });

  it('leaves the wallet to choose when the api could not', async () => {
    // Half a fee is worse than none: a ceiling without a tip, or a tip without
    // a ceiling, is a transaction the wallet may refuse outright.
    const request = inject({
      eth_requestAccounts: [ACCOUNT],
      eth_chainId: '0x1',
      eth_sendTransaction: '0xhash',
    });
    await wallet.connect();

    await wallet.send({ to: '0xcontract', data: '0xdeadbeef' });

    expect(request).toHaveBeenCalledWith({
      method: 'eth_sendTransaction',
      params: [{ from: ACCOUNT, to: '0xcontract', data: '0xdeadbeef' }],
    });
  });

  /**
   * How he signs in. This went out untested, and the shape of the payload was
   * exactly what broke: it sent hex, and while most wallets decode hex before
   * signing, the Coinbase app's own in-app browser signs the hex as literal
   * text — so the signature recovered to the wrong address and every request
   * came back 403 while the door said he was in. A sentence that is not hex has
   * no such fork in it.
   */
  describe('signing in', () => {
    const SENTENCE = 'juanmamoreno.com wants you to sign in to the studio.';

    it('hands the wallet the sentence itself, never hex', async () => {
      const request = inject({
        eth_requestAccounts: [ACCOUNT],
        eth_chainId: '0x1',
        personal_sign: '0xsignature',
      });
      await wallet.connect();

      await expect(wallet.sign(SENTENCE)).resolves.toBe('0xsignature');

      expect(request).toHaveBeenCalledWith({
        method: 'personal_sign',
        params: [SENTENCE, ACCOUNT],
      });
    });

    it('will not sign before anybody has connected', async () => {
      inject({ eth_chainId: '0x1' });

      await expect(wallet.sign(SENTENCE)).rejects.toThrow(/connected/);
    });
  });

  it('will not send before anybody has connected', async () => {
    inject({ eth_chainId: '0x1' });

    await expect(wallet.send({ to: '0xa', data: '0xb' })).rejects.toThrow(/connected/);
  });

  it('goes to Coinbase Wallet when the page has no wallet of its own', async () => {
    // Not an edge case but the phone case: the browser Google will sign him in
    // from is exactly the one with no wallet injected into it, so having none
    // has to lead somewhere rather than stop.
    await expect(wallet.connect()).resolves.toBe(ACCOUNT);

    expect(relay.request).toHaveBeenCalledWith({ method: 'eth_requestAccounts' });
    await expect(wallet.send({ to: '0xa', data: '0xb' })).resolves.toBe('0xhash');
  });

  it('prefers the wallet already on the page to opening an app', async () => {
    // An extension on the laptop, or the studio opened inside a wallet's own
    // browser. Reaching past it would send him to his phone to sign something
    // the machine in front of him can already sign.
    const request = inject({ eth_requestAccounts: [ACCOUNT], eth_chainId: '0x1' });

    await expect(wallet.connect()).resolves.toBe(ACCOUNT);

    expect(request).toHaveBeenCalled();
    expect(relay.request).not.toHaveBeenCalled();
  });

  describe('a wallet that never answers', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('gives up on connecting rather than waiting for ever', async () => {
      // How the page came to sit doing nothing: the provider hands back a
      // promise and simply never settles it, so there is nothing to catch and
      // nothing to show. A mint "took forever" and never reached the chain.
      (globalThis as { ethereum?: unknown }).ethereum = { request: () => new Promise(() => {}) };

      const asking = wallet.connect();
      const caught = asking.catch((failure: Error) => failure.message);
      await vi.advanceTimersByTimeAsync(61_000);

      await expect(caught).resolves.toMatch(/did not answer/);
    });

    it('gives up on a signature too, and says nothing was sent', async () => {
      const request = vi.fn(async ({ method }: { method: string }) => {
        if (method === 'eth_requestAccounts') return [ACCOUNT];
        if (method === 'eth_chainId') return '0x1';
        return new Promise(() => {});
      });
      (globalThis as { ethereum?: unknown }).ethereum = { request };
      await wallet.connect();

      const sending = wallet.send({ to: '0xa', data: '0xb' });
      const caught = sending.catch((failure: Error) => failure.message);
      await vi.advanceTimersByTimeAsync(301_000);

      await expect(caught).resolves.toMatch(/nothing was sent/);
    });

    it('does not give up on one that answers', async () => {
      const request = vi.fn(async ({ method }: { method: string }) => {
        if (method === 'eth_requestAccounts') return [ACCOUNT];
        if (method === 'eth_chainId') return '0x1';
        return '0xhash';
      });
      (globalThis as { ethereum?: unknown }).ethereum = { request };

      await expect(wallet.connect()).resolves.toBe(ACCOUNT);
      await expect(wallet.send({ to: '0xa', data: '0xb' })).resolves.toBe('0xhash');
    });
  });
});
