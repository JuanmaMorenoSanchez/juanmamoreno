import { environment } from '@environments/environment';
import {
  SESSION_LASTS_MS,
  asBearer,
  sessionMessage,
  walletSessionLives,
  WALLET_SCHEME,
} from './wallet-session';

/**
 * The browser's half of the wallet session. It decides what the interface
 * shows — whether to send a stored bearer or ask for a signature — and the
 * signature itself is proved by the api, which is the only place that can.
 *
 * The text matters more than it looks: the api rebuilds this message from the
 * address and time it declares and compares it whole, so these tests are also
 * what keeps the two repositories agreeing to the byte.
 */
describe('a wallet session in the browser', () => {
  const ADDRESS = environment.adminAddress;
  const now = Date.parse('2026-11-22T09:00:00.000Z');

  const session = (options: { address?: string; issued?: string } = {}) =>
    asBearer(
      sessionMessage(options.address ?? ADDRESS, options.issued ?? new Date(now).toISOString()),
      '0xsignature'
    );

  it('holds a session signed just now', () => {
    expect(walletSessionLives(session(), now)).toBe(true);
  });

  it('does not hold one for another address', () => {
    const stranger = session({ address: '0x1111111111111111111111111111111111111111' });

    expect(walletSessionLives(stranger, now)).toBe(false);
  });

  it('accepts his address in whatever case the wallet wrote it', () => {
    expect(walletSessionLives(session({ address: ADDRESS.toLowerCase() }), now)).toBe(true);
  });

  it('lets go once the week is up', () => {
    const inside = session({ issued: new Date(now - SESSION_LASTS_MS + 60_000).toISOString() });
    const outside = session({ issued: new Date(now - SESSION_LASTS_MS - 1000).toISOString() });

    expect(walletSessionLives(inside, now)).toBe(true);
    expect(walletSessionLives(outside, now)).toBe(false);
  });

  it('refuses a message that is not the one this site asks for', () => {
    const extra = asBearer(
      `${sessionMessage(ADDRESS, new Date(now).toISOString())}\nAlso: no`,
      '0x'
    );
    const elsewhere = asBearer(
      sessionMessage(ADDRESS, new Date(now).toISOString()).replace('juanmamoreno.com', 'evil.com'),
      '0x'
    );

    expect(walletSessionLives(extra, now)).toBe(false);
    expect(walletSessionLives(elsewhere, now)).toBe(false);
  });

  it('leaves a Google token alone and survives rubbish', () => {
    for (const other of [
      '',
      'header.payload.signature',
      WALLET_SCHEME,
      `${WALLET_SCHEME}not-base64!!`,
      `${WALLET_SCHEME}${btoa('{}')}`,
    ]) {
      expect(walletSessionLives(other, now)).toBe(false);
    }
  });

  // The api rebuilds this exact text. A space moved here locks him out there,
  // so the shape is pinned rather than left to be noticed on a deploy.
  it('writes the message the api expects', () => {
    const message = sessionMessage('0xabc', '2026-11-22T09:00:00.000Z');

    expect(message).toBe(
      'juanmamoreno.com wants you to sign in to the studio.\n' +
        '\n' +
        'Address: 0xabc\n' +
        'Issued: 2026-11-22T09:00:00.000Z\n' +
        'Valid for: 7 days\n' +
        '\n' +
        'Signing this proves the wallet is yours. It authorises nothing on the chain and spends nothing.'
    );
  });
});
