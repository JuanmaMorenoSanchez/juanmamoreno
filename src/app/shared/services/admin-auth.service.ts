import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GoogleIdentityService } from './google-identity.service';

const TOKEN_KEY = 'juanmamoreno.adminToken';
/**
 * That this browser has signed in before.
 *
 * Kept when signing out, on purpose: it is what puts the way back in front of
 * the one person who needs it, and keeps it away from everybody else. A reader
 * of the catalogue is never shown a sign-in control and never loads Google's
 * script, because as far as this browser knows there is nobody here to sign in.
 */
const KNOWN_KEY = 'juanmamoreno.adminKnown';

/**
 * How long before a token runs out to go and get another.
 *
 * Google's tokens last an hour. Renewing a few minutes early means the session
 * is replaced while it still works, rather than after it has already failed and
 * dropped him out of the studio mid-sentence.
 */
const RENEW_BEFORE_MS = 5 * 60 * 1000;

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
  private google = inject(GoogleIdentityService);

  private readonly token = signal<string | null>(this.readStoredToken());

  /** Whether anyone has ever signed in on this browser. */
  readonly knownHere = signal(this.readKnown());

  private renewing: Promise<boolean> | null = null;
  private renewalTimer: ReturnType<typeof setTimeout> | null = null;

  readonly identity = computed(() => {
    const token = this.token();
    return token ? this.verify(token) : null;
  });

  readonly isAdmin = computed(() => this.identity() !== null);

  /**
   * The raw credential, for putting in an Authorization header.
   *
   * Only ever sent to this site's own backend, which verifies it — signature
   * included — before doing anything with it. Null unless it currently passes
   * the checks here too, so an expired token is never sent anywhere.
   */
  readonly bearerToken = computed(() => (this.identity() ? this.token() : null));

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
    this.rememberKnown();
    this.scheduleRenewal();
    return true;
  }

  signOut(): void {
    this.token.set(null);
    this.store(null);
    if (this.renewalTimer) clearTimeout(this.renewalTimer);
    this.renewalTimer = null;
  }

  /**
   * Keeps the session alive across the hour Google gives it.
   *
   * A Google identity token expires after an hour, and nothing was renewing it:
   * the studio simply stopped recognising him wherever he happened to be, and
   * the only way back was to remember that /door exists. It looked like every
   * release logged him out, because a release is roughly how long he tends to
   * be away.
   *
   * Renewal is silent when Google is willing — he is already signed in there,
   * and has already said yes to this site — and simply fails when it is not, at
   * which point he is where he was before rather than anywhere worse.
   *
   * Called once when the application starts. It does nothing at all, and loads
   * nothing at all, for a browser that has never signed in.
   */
  keepAlive(): void {
    if (!this.isBrowser || !this.knownHere()) return;

    if (this.identity()) {
      this.scheduleRenewal();
      return;
    }
    void this.renew();
  }

  /**
   * Asks Google for a fresh token without asking him for anything.
   *
   * `auto_select` is what makes it silent: with one Google account signed in
   * and this site already allowed, the credential arrives with no prompt shown
   * at all. With several accounts, or none, Google shows its own chooser, and
   * that is the point at which he has to do something — which is why the way
   * back in also lives in the menu.
   */
  private renew(): Promise<boolean> {
    if (this.renewing) return this.renewing;
    if (!environment.googleClientId) return Promise.resolve(false);

    this.renewing = this.google
      .load()
      .then(
        (google) =>
          new Promise<boolean>((resolve) => {
            google.accounts.id.initialize({
              client_id: environment.googleClientId,
              callback: (response) => resolve(this.signIn(response.credential)),
              auto_select: true,
              cancel_on_tap_outside: false,
            });
            google.accounts.id.prompt();
          })
      )
      .catch(() => false)
      .finally(() => (this.renewing = null));

    return this.renewing;
  }

  /** Comes back for another token shortly before this one stops working. */
  private scheduleRenewal(): void {
    if (!this.isBrowser) return;
    if (this.renewalTimer) clearTimeout(this.renewalTimer);

    const claims = this.identity();
    if (!claims) return;

    const due = claims.exp * 1000 - Date.now() - RENEW_BEFORE_MS;
    // setTimeout counts in a 32-bit signed integer, so anything beyond about
    // twenty-four days fires immediately. An hour is nowhere near that, but a
    // token with an absurd expiry should not turn this into a loop.
    if (due <= 0 || due > 2 ** 31 - 1) return;
    this.renewalTimer = setTimeout(() => void this.renew(), due);
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
