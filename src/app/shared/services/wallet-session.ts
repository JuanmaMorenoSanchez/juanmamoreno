import { environment } from '@environments/environment';

/**
 * The sentence his wallet signs to open a session, and how it is carried.
 *
 * **This has a twin.** `src/shared/guards/wallet-session.ts` in the backend
 * builds the same text and checks it, and the two must agree to the byte: the
 * backend rebuilds the message from the address and time it declares and
 * compares the whole thing, so a space moved here locks him out there. There is
 * no shared package between the two repositories, and inventing one to hold
 * nine lines of string would cost more than keeping them honest by hand — so
 * either side changing this changes both, in one push.
 *
 * Why a wallet signs anything at all: signing in needed Google, and Google
 * refuses to sign anyone in from inside a wallet app's own browser, where its
 * popup is a white screen. His wallet is already the one address the
 * certificates contract obeys.
 */

/** What marks a bearer as a wallet session rather than a Google id token. */
export const WALLET_SCHEME = 'eth.';

/** How long one signature stands. The backend enforces it; this agrees. */
export const SESSION_LASTS_MS = 7 * 24 * 60 * 60 * 1000;

const OPENING = 'juanmamoreno.com wants you to sign in to the studio.';

/** The exact words he is shown and signs. See the note above before editing. */
export function sessionMessage(address: string, issued: string): string {
  return [
    OPENING,
    '',
    `Address: ${address}`,
    `Issued: ${issued}`,
    `Valid for: ${SESSION_LASTS_MS / (24 * 60 * 60 * 1000)} days`,
    '',
    'Signing this proves the wallet is yours. It authorises nothing on the chain and spends nothing.',
  ].join('\n');
}

/** How the signed message and its signature travel as one bearer string. */
export function asBearer(message: string, signature: string): string {
  // The message is ASCII by construction — the address, an ISO date and fixed
  // English — so btoa is enough and no encoder is needed.
  return (
    WALLET_SCHEME +
    btoa(JSON.stringify({ message, signature }))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  );
}

/**
 * Whether a stored wallet session is still worth sending.
 *
 * The signature is not checked here and cannot be: this decides what the
 * interface shows, exactly as the Google check beside it does, and the backend
 * is the one that recovers the address and proves it. What this catches is the
 * ordinary case — a session that has simply run out, or one belonging to a
 * different address — so that an expired bearer is never sent anywhere and the
 * studio asks for a signature instead of showing him a wall of refusals.
 */
export function walletSessionLives(bearer: string, now: number = Date.now()): boolean {
  if (!bearer.startsWith(WALLET_SCHEME)) return false;

  let message: unknown;
  try {
    const padded = bearer.slice(WALLET_SCHEME.length).replace(/-/g, '+').replace(/_/g, '/');
    message = (JSON.parse(atob(padded)) as { message?: unknown }).message;
  } catch {
    return false;
  }
  if (typeof message !== 'string') return false;

  const claimed = /^Address: (.+)$/m.exec(message)?.[1];
  const issued = /^Issued: (.+)$/m.exec(message)?.[1];
  if (!claimed || !issued) return false;
  if (message !== sessionMessage(claimed, issued)) return false;
  if (claimed.toLowerCase() !== environment.adminAddress.toLowerCase()) return false;

  const signedAt = Date.parse(issued);
  return !Number.isNaN(signedAt) && now - signedAt <= SESSION_LASTS_MS;
}
