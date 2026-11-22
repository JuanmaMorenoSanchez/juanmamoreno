import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';
import { AdminAuthService } from './admin-auth.service';
import { GoogleIdentityService } from './google-identity.service';
import { asBearer, sessionMessage } from './wallet-session';

// One address gets in. These are the cases that must never open the door.
describe('AdminAuthService', () => {
  let service: AdminAuthService;
  const clientId = 'test-client-id.apps.googleusercontent.com';

  const tokenFor = (claims: Record<string, unknown>): string => {
    const encode = (value: object) =>
      btoa(JSON.stringify(value)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return `${encode({ alg: 'RS256' })}.${encode({
      iss: 'https://accounts.google.com',
      aud: clientId,
      email: 'morenosanchezjuanma@gmail.com',
      email_verified: true,
      exp: Math.floor(Date.now() / 1000) + 3600,
      ...claims,
    })}.signature`;
  };

  beforeEach(() => {
    environment.googleClientId = clientId;
    window.localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthService);
  });

  afterEach(() => window.localStorage.clear());

  it('starts with nobody signed in', () => {
    expect(service.isAdmin()).toBe(false);
    expect(service.identity()).toBeNull();
  });

  it('lets the one allowed account in', () => {
    expect(service.signIn(tokenFor({}))).toBe(true);
    expect(service.isAdmin()).toBe(true);
    expect(service.identity()?.email).toBe('morenosanchezjuanma@gmail.com');
  });

  // The whole point of the feature.
  it('refuses every other Google account', () => {
    for (const email of [
      'someone.else@gmail.com',
      'juanma@example.com',
      'morenosanchezjuanma@googlemail.com',
      'morenosanchezjuanma+admin@gmail.com',
      'notmorenosanchezjuanma@gmail.com',
      'morenosanchezjuanma@gmail.com.attacker.com',
    ]) {
      expect(service.signIn(tokenFor({ email })), `${email} must be refused`).toBe(false);
      expect(service.isAdmin()).toBe(false);
    }
  });

  it('accepts the address whatever case Google sends it in', () => {
    expect(service.signIn(tokenFor({ email: 'MorenoSanchezJuanma@Gmail.com' }))).toBe(true);
  });

  it('refuses an address Google has not verified', () => {
    expect(service.signIn(tokenFor({ email_verified: false }))).toBe(false);
  });

  it('refuses a token issued for a different app', () => {
    expect(service.signIn(tokenFor({ aud: 'someone-elses-client-id' }))).toBe(false);
  });

  it('refuses a token that did not come from Google', () => {
    expect(service.signIn(tokenFor({ iss: 'https://accounts.evil.test' }))).toBe(false);
  });

  it('refuses an expired token', () => {
    expect(service.signIn(tokenFor({ exp: Math.floor(Date.now() / 1000) - 60 }))).toBe(false);
  });

  it('refuses anything that is not a token at all', () => {
    for (const junk of ['', 'not.a.token', 'aaa', '...']) {
      expect(service.signIn(junk)).toBe(false);
    }
  });

  it('remembers the session so the next visit needs no sign-in', () => {
    service.signIn(tokenFor({}));

    const returning = TestBed.inject(AdminAuthService);
    expect(returning.isAdmin()).toBe(true);
  });

  it('forgets it on sign out', () => {
    service.signIn(tokenFor({}));
    service.signOut();

    expect(service.isAdmin()).toBe(false);
    expect(window.localStorage.getItem('juanmamoreno.adminToken')).toBeNull();
  });

  // A token planted directly in storage still has to pass every check.
  it('does not trust a stored token it would have refused', () => {
    window.localStorage.setItem(
      'juanmamoreno.adminToken',
      tokenFor({ email: 'someone@gmail.com' })
    );

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    expect(TestBed.inject(AdminAuthService).isAdmin()).toBe(false);
  });

  it('treats a stored token that has since expired as signed out', () => {
    window.localStorage.setItem(
      'juanmamoreno.adminToken',
      tokenFor({ exp: Math.floor(Date.now() / 1000) - 1 })
    );

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    expect(TestBed.inject(AdminAuthService).isAdmin()).toBe(false);
  });
});

/**
 * A session that outlives Google's hour.
 *
 * The token expires after an hour and nothing renewed it, so the studio stopped
 * recognising him wherever he stood — which looked like every release logging
 * him out, a release being roughly how long he tends to be away.
 */
describe('AdminAuthService keeping the session alive', () => {
  const clientId = 'test-client-id.apps.googleusercontent.com';

  const tokenFor = (claims: Record<string, unknown>): string => {
    const encode = (value: object) =>
      btoa(JSON.stringify(value)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return `${encode({ alg: 'RS256' })}.${encode({
      iss: 'https://accounts.google.com',
      aud: clientId,
      email: 'morenosanchezjuanma@gmail.com',
      email_verified: true,
      exp: Math.floor(Date.now() / 1000) + 3600,
      ...claims,
    })}.signature`;
  };

  /** Stands in for Google's script, and records whether it was ever asked for. */
  function setup(options: { credential?: string } = {}) {
    const google = {
      loads: 0,
      prompted: 0,
      load() {
        this.loads += 1;
        return Promise.resolve({
          accounts: {
            id: {
              initialize: (config: { callback: (r: { credential: string }) => void }) => {
                this.onCredential = config.callback;
              },
              renderButton: () => undefined,
              prompt: () => {
                this.prompted += 1;
                if (options.credential) this.onCredential?.({ credential: options.credential });
              },
            },
          },
        });
      },
      onCredential: undefined as ((r: { credential: string }) => void) | undefined,
    };

    TestBed.configureTestingModule({
      providers: [{ provide: GoogleIdentityService, useValue: google }],
    });
    return { google, service: TestBed.inject(AdminAuthService) };
  }

  beforeEach(() => {
    environment.googleClientId = clientId;
    window.localStorage.clear();
  });
  afterEach(() => window.localStorage.clear());

  it('does not so much as load Google for a browser that has never signed in', async () => {
    // Every reader of the catalogue is such a browser.
    const { google, service } = setup();

    service.keepAlive();
    await Promise.resolve();

    expect(google.loads).toBe(0);
    expect(google.prompted).toBe(0);
  });

  it('asks Google for a new token when the old one has run out', async () => {
    window.localStorage.setItem('juanmamoreno.adminKnown', 'yes');
    window.localStorage.setItem(
      'juanmamoreno.adminToken',
      tokenFor({ exp: Math.floor(Date.now() / 1000) - 60 })
    );
    const fresh = tokenFor({});
    const { google, service } = setup({ credential: fresh });
    expect(service.isAdmin()).toBe(false);

    service.keepAlive();
    await Promise.resolve();
    await Promise.resolve();

    expect(google.prompted).toBe(1);
    expect(service.isAdmin()).toBe(true);
  });

  /**
   * The other credential: a session his own wallet signed. Google stays a door
   * for him — losing the wallet must not lose the studio — so the two live side
   * by side, and the trap is that one must not summon the other.
   */
  describe('a session his wallet signed', () => {
    const walletSession = (options: { address?: string; issued?: string } = {}) =>
      asBearer(
        sessionMessage(
          options.address ?? environment.adminAddress,
          options.issued ?? new Date().toISOString()
        ),
        '0xsignature'
      );

    it('lets him in and is what gets sent', () => {
      const { service } = setup();
      const bearer = walletSession();

      expect(service.signInWithWallet(bearer)).toBe(true);
      expect(service.isAdmin()).toBe(true);
      expect(service.bearerToken()).toBe(bearer);
    });

    it('refuses any other wallet', () => {
      const { service } = setup();

      expect(
        service.signInWithWallet(
          walletSession({ address: '0x1111111111111111111111111111111111111111' })
        )
      ).toBe(false);
      expect(service.isAdmin()).toBe(false);
    });

    it('has no claims to read, and says so rather than pretending', () => {
      const { service } = setup();
      service.signInWithWallet(walletSession());

      // A signature carries an address and nothing else — no name, no picture,
      // no email — so anything reading `identity()` must see null and not a
      // half-filled object.
      expect(service.identity()).toBeNull();
      expect(service.isAdmin()).toBe(true);
    });

    it('stops sending it once the week is out', () => {
      const { service } = setup();
      const old = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString();

      expect(service.signInWithWallet(walletSession({ issued: old }))).toBe(false);
      expect(service.bearerToken()).toBeNull();
    });

    /**
     * The trap. `keepAlive` runs at every start and used to ask Google for a
     * token whenever there was no Google identity — which a wallet session has
     * none of. Signed in with the wallet, it would have summoned Google's
     * prompt on every single start: the very thing he signed in to avoid.
     */
    it('never summons Google', async () => {
      window.localStorage.setItem('juanmamoreno.adminKnown', 'yes');
      window.localStorage.setItem('juanmamoreno.adminToken', walletSession());
      const { google, service } = setup();
      expect(service.isAdmin()).toBe(true);

      service.keepAlive();
      await Promise.resolve();
      await Promise.resolve();

      expect(google.loads).toBe(0);
      expect(google.prompted).toBe(0);
      expect(service.isAdmin()).toBe(true);
    });

    it('survives the week and comes back signed in', () => {
      window.localStorage.setItem('juanmamoreno.adminToken', walletSession());

      const { service } = setup();

      expect(service.isAdmin()).toBe(true);
    });

    /**
     * The week he spent signed in to nothing. The signature cannot be checked
     * here — only the api recovers an address — so a bearer with a wrong one
     * looks perfectly alive, `isAdmin` says yes, and the door forwards him past
     * itself on every visit while every request comes back refused. The api's
     * refusal is that missing check arriving late, so it is allowed to undo it.
     */
    it('is thrown away when the api refuses it', () => {
      const { service } = setup();
      service.signInWithWallet(walletSession());

      expect(service.forgetRefusedWallet()).toBe(true);
      expect(service.isAdmin()).toBe(false);
      expect(window.localStorage.getItem('juanmamoreno.adminToken')).toBeNull();
    });

    // A Google token renews itself silently, so a refusal is not the end of it.
    it('leaves a Google session alone', () => {
      const { service } = setup();
      service.signIn(tokenFor({}));
      expect(service.isAdmin()).toBe(true);

      expect(service.forgetRefusedWallet()).toBe(false);
      expect(service.isAdmin()).toBe(true);
    });
  });

  it('leaves him signed out when Google will not answer silently', async () => {
    // He is then exactly where he was, which is what the menu control is for.
    window.localStorage.setItem('juanmamoreno.adminKnown', 'yes');
    const { service } = setup();

    service.keepAlive();
    await Promise.resolve();

    expect(service.isAdmin()).toBe(false);
  });

  it('remembers the browser once he has signed in on it', () => {
    const { service } = setup();
    expect(service.knownHere()).toBe(false);

    service.signIn(tokenFor({}));

    expect(service.knownHere()).toBe(true);
  });

  it('keeps remembering after he signs out, or there would be no way back', () => {
    const { service } = setup();
    service.signIn(tokenFor({}));

    service.signOut();

    expect(service.isAdmin()).toBe(false);
    expect(service.knownHere()).toBe(true);
  });
});
