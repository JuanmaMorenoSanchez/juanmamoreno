import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { WalletService } from './wallet.service';

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
    TestBed.configureTestingModule({});
    wallet = TestBed.inject(WalletService);
  });

  afterEach(() => delete (globalThis as { ethereum?: unknown }).ethereum);

  it('says there is no wallet when the page has none', () => {
    expect(wallet.available()).toBe(false);
  });

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

  it('will not send before anybody has connected', async () => {
    inject({ eth_chainId: '0x1' });

    await expect(wallet.send({ to: '0xa', data: '0xb' })).rejects.toThrow(/connected/);
  });

  it('says where to find a wallet rather than failing silently', async () => {
    await expect(wallet.connect()).rejects.toThrow(/wallet app/);
  });
});
