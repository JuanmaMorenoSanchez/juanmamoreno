import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { WALLET_SCHEME, walletSessionLives } from './wallet-session';

const TOKEN_KEY = 'juanmamoreno.adminToken';
/**
 * That this browser has signed in before.
 *
 * Kept when signing out, on purpose: it is what puts the way back in front of
 * the one person who needs it, and keeps it away from everybody else. A reader
 * of the catalogue is never shown a sign-in control, because as far as this
 * browser knows there is nobody here to sign in.
 */
const KNOWN_KEY = 'juanmamoreno.adminKnown';

/**
 * Who is allowed into the studio, and how the browser remembers them.
 *
 * This decides what the interface shows. It is not a security boundary: the
 * site is static, the bundle is public and localStorage belongs to the reader,
 * so anyone can reach whatever /mint renders by editing their own browser. The
 * boundary is the api, which recovers the signature on every request — which a
 * browser cannot do for itself.
 *
 * **One way in, and it is his wallet.** Google used to be the other, and was
 * removed: it was a second set of credentials to keep, it loaded Google's
 * script into the page and put three of Google's hosts in the site's content
 * security policy, and it never worked inside a wallet app's own browser,
 * which is where he actually is. The wallet is also already the one thing the
 * certificates contract obeys, so the studio and the chain now ask for the
 * same proof. The api still accepts a Google token from the Google Cloud SDK,
 * which is how the nightly run signs in — a machine has no wallet — and that
 * audience is not one a browser can be issued.
 */
@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly token = signal<string | null>(this.readStoredToken());

  /** Whether anyone has ever signed in on this browser. */
  readonly knownHere = signal(this.readKnown());

  /** Whether a session his wallet opened is stored and still inside its week. */
  private readonly walletLives = computed(() => {
    const token = this.token();
    return token !== null && token.startsWith(WALLET_SCHEME) && walletSessionLives(token);
  });

  readonly isAdmin = computed(() => this.walletLives());

  /**
   * The raw credential, for putting in an Authorization header.
   *
   * Only ever sent to this site's own backend, which verifies the signature
   * before doing anything with it. Null unless it currently passes the checks
   * here too, so a lapsed session is never sent anywhere.
   */
  readonly bearerToken = computed(() => (this.walletLives() ? this.token() : null));

  /**
   * Accepts a session his wallet signed, or refuses it.
   *
   * Nothing is scheduled afterwards: a wallet cannot renew silently because a
   * signature needs a person, so the week it lasts ends with him pressing the
   * button again.
   */
  signInWithWallet(bearer: string): boolean {
    if (!walletSessionLives(bearer)) return false;

    this.token.set(bearer);
    this.store(bearer);
    this.rememberKnown();
    return true;
  }

  signOut(): void {
    this.token.set(null);
    this.store(null);
  }

  /**
   * Throws away a session the api refuses.
   *
   * This exists because of the week he spent signed in to nothing. A wallet
   * session is checked here by its address and its age, and cannot be checked
   * by its signature — only the api can recover that — so a bearer whose
   * signature is wrong looks perfectly alive from in here. It sat in his
   * browser for a week, `isAdmin` said yes, the door forwarded him past itself
   * on every visit, and every request came back refused. He had no way in and
   * no way to ask again.
   *
   * So the api's refusal is the signature check, arriving late.
   *
   * Returns whether anything was dropped, so the caller can show him the door.
   */
  forgetRefusedWallet(): boolean {
    if (!this.walletLives()) return false;
    this.signOut();
    return true;
  }

  private readKnown(): boolean {
    if (!this.isBrowser) return false;
    try {
      return window.localStorage.getItem(KNOWN_KEY) === 'yes';
    } catch {
      return false;
    }
  }

  private rememberKnown(): void {
    this.knownHere.set(true);
    try {
      window.localStorage.setItem(KNOWN_KEY, 'yes');
    } catch {
      // Private browsing. The menu keeps the way back for this tab only.
    }
  }

  private readStoredToken(): string | null {
    if (!this.isBrowser) return null;
    try {
      return window.localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  private store(credential: string | null): void {
    if (!this.isBrowser) return;
    try {
      if (credential) window.localStorage.setItem(TOKEN_KEY, credential);
      else window.localStorage.removeItem(TOKEN_KEY);
    } catch {
      // Private browsing. The session lasts until the tab closes, which is a
      // fair outcome for a browser that refuses to remember anything.
    }
  }
}
