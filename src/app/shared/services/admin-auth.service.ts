import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '@environments/environment';

const TOKEN_KEY = 'juanmamoreno.adminToken';

/** What Google puts in the id token, of which only these fields are read. */
interface GoogleIdentity {
  iss: string;
  aud: string;
  email: string;
  email_verified: boolean;
  name?: string;
  picture?: string;
  exp: number;
}

const GOOGLE_ISSUERS = ['accounts.google.com', 'https://accounts.google.com'];

/**
 * Who is allowed into the studio, and how the browser remembers them.
 *
 * This decides what the interface shows. It is not a security boundary: the
 * site is static, the bundle is public and localStorage belongs to the reader,
 * so anyone can reach whatever /studio renders by editing their own browser.
 * When the studio holds something worth protecting, the backend has to verify
 * this same token on every request — signature included, which a browser
 * cannot do for itself.
 */
@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly token = signal<string | null>(this.readStoredToken());

  readonly identity = computed(() => {
    const token = this.token();
    return token ? this.verify(token) : null;
  });

  readonly isAdmin = computed(() => this.identity() !== null);

  /**
   * Accepts a credential from Google, or refuses it.
   *
   * Returns whether it was accepted so the caller can say why nothing happened
   * — a wrong account is the expected failure here, not an exceptional one.
   */
  signIn(credential: string): boolean {
    if (!this.verify(credential)) return false;

    this.token.set(credential);
    this.store(credential);
    return true;
  }

  signOut(): void {
    this.token.set(null);
    this.store(null);
  }

  /**
   * The claims, if this token is currently good for the one allowed account.
   *
   * Checks the issuer, the audience, that Google says the address is verified,
   * that it is the allowed address, and that it has not expired. The signature
   * is not checked, and cannot be here — see the note on the class.
   */
  private verify(credential: string): GoogleIdentity | null {
    const claims = this.decode(credential);
    if (!claims) return null;

    const stillValid = claims.exp * 1000 > Date.now();
    const fromGoogle = GOOGLE_ISSUERS.includes(claims.iss);
    const forThisApp = claims.aud === environment.googleClientId;
    const theOwner =
      claims.email_verified === true &&
      claims.email?.toLowerCase() === environment.adminEmail.toLowerCase();

    return stillValid && fromGoogle && forThisApp && theOwner ? claims : null;
  }

  private decode(credential: string): GoogleIdentity | null {
    try {
      const payload = credential.split('.')[1];
      const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodeURIComponent(escape(json))) as GoogleIdentity;
    } catch {
      return null;
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
