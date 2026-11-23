import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';
import { AdminAuthService } from './admin-auth.service';
import { asBearer, sessionMessage } from './wallet-session';

/**
 * One wallet gets in. These are the cases that must never open the door.
 *
 * Google used to be the other way in and these tests were mostly about it: the
 * allowed address, the audience, the issuer, the hour it lasted and the silent
 * renewal that kept it. All of that is gone, and what is left is smaller and
 * says more — a signature is checked by the api on every request, which is the
 * one thing a browser could never do for itself.
 */
describe('AdminAuthService', () => {
  const TOKEN_KEY = 'juanmamoreno.adminToken';

  const walletSession = (options: { address?: string; issued?: string } = {}) =>
    asBearer(
      sessionMessage(
        options.address ?? environment.adminAddress,
        options.issued ?? new Date().toISOString()
      ),
      '0xsignature'
    );

  /** What a Google credential looked like, for proving it no longer is one. */
  const googleToken = (claims: Record<string, unknown> = {}): string => {
    const encode = (value: object) =>
      btoa(JSON.stringify(value)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return `${encode({ alg: 'RS256' })}.${encode({
      iss: 'https://accounts.google.com',
      aud: '164035848667-t6fv2d02rfhojassdhh3cv0q3qk44mde.apps.googleusercontent.com',
      email: 'morenosanchezjuanma@gmail.com',
      email_verified: true,
      exp: Math.floor(Date.now() / 1000) + 3600,
      ...claims,
    })}.signature`;
  };

  function setup() {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    return TestBed.inject(AdminAuthService);
  }

  beforeEach(() => window.localStorage.clear());
  afterEach(() => window.localStorage.clear());

  it('starts with nobody signed in', () => {
    const service = setup();

    expect(service.isAdmin()).toBe(false);
    expect(service.bearerToken()).toBeNull();
  });

  it('lets his wallet in, and that session is what gets sent', () => {
    const service = setup();
    const bearer = walletSession();

    expect(service.signInWithWallet(bearer)).toBe(true);
    expect(service.isAdmin()).toBe(true);
    expect(service.bearerToken()).toBe(bearer);
  });

  // The whole point of the feature.
  it('refuses any other wallet', () => {
    const service = setup();

    for (const address of [
      '0x1111111111111111111111111111111111111111',
      '0x0000000000000000000000000000000000000000',
      '0xd7d089b7ebeccaf4ff8f183f22376913ce6193b8',
    ]) {
      expect(service.signInWithWallet(walletSession({ address })), `${address}`).toBe(false);
      expect(service.isAdmin()).toBe(false);
    }
  });

  it('stops sending a session once its week is out', () => {
    const service = setup();
    const old = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString();

    expect(service.signInWithWallet(walletSession({ issued: old }))).toBe(false);
    expect(service.bearerToken()).toBeNull();
  });

  it('remembers the session so the next visit needs no signing', () => {
    window.localStorage.setItem(TOKEN_KEY, walletSession());

    expect(setup().isAdmin()).toBe(true);
  });

  it('forgets it on sign out', () => {
    const service = setup();
    service.signInWithWallet(walletSession());

    service.signOut();

    expect(service.isAdmin()).toBe(false);
    expect(window.localStorage.getItem(TOKEN_KEY)).toBeNull();
  });

  // A session planted directly in storage still has to pass every check.
  it('does not trust a stored session it would have refused', () => {
    window.localStorage.setItem(
      TOKEN_KEY,
      walletSession({ address: '0x1111111111111111111111111111111111111111' })
    );

    expect(setup().isAdmin()).toBe(false);
  });

  /**
   * The removal, asserted rather than assumed.
   *
   * A Google id token was a credential here for a year, and browsers that
   * signed in that way still have one sitting in localStorage under this exact
   * key. It must now be worth nothing at all — not a reduced session, not an
   * expired one: no session. The api agrees, having been narrowed to the Google
   * Cloud SDK's audience, which is not one a browser can be issued.
   */
  it('treats a Google token as no credential at all', () => {
    const service = setup();

    expect(service.signInWithWallet(googleToken())).toBe(false);
    expect(service.isAdmin()).toBe(false);
  });

  it('ignores a Google token left in storage by the door that used to exist', () => {
    window.localStorage.setItem(TOKEN_KEY, googleToken());

    const service = setup();

    expect(service.isAdmin()).toBe(false);
    expect(service.bearerToken()).toBeNull();
  });

  it('refuses anything that is not a session at all', () => {
    const service = setup();

    for (const junk of ['', 'not.a.token', 'aaa', '...', 'eth.', 'eth.zzzz']) {
      expect(service.signInWithWallet(junk), junk).toBe(false);
    }
  });

  /**
   * The week he spent signed in to nothing. The signature cannot be checked
   * here — only the api recovers an address — so a bearer with a wrong one
   * looks perfectly alive, `isAdmin` says yes, and the door forwards him past
   * itself on every visit while every request comes back refused. The api's
   * refusal is that missing check arriving late, so it is allowed to undo it.
   */
  it('is thrown away when the api refuses it', () => {
    const service = setup();
    service.signInWithWallet(walletSession());

    expect(service.forgetRefusedWallet()).toBe(true);
    expect(service.isAdmin()).toBe(false);
    expect(window.localStorage.getItem(TOKEN_KEY)).toBeNull();
  });

  it('has nothing to throw away when nobody is signed in', () => {
    expect(setup().forgetRefusedWallet()).toBe(false);
  });

  it('remembers the browser once he has signed in on it', () => {
    const service = setup();
    expect(service.knownHere()).toBe(false);

    service.signInWithWallet(walletSession());

    expect(service.knownHere()).toBe(true);
  });

  it('keeps remembering after he signs out, or there would be no way back', () => {
    const service = setup();
    service.signInWithWallet(walletSession());

    service.signOut();

    expect(service.isAdmin()).toBe(false);
    expect(service.knownHere()).toBe(true);
  });
});
