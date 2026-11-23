import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { sessionMessage } from '@shared/services/wallet-session';
import { WalletService } from '@shared/services/wallet.service';
import { DoorComponent } from './door.component';

describe('DoorComponent', () => {
  let fixture: ComponentFixture<DoorComponent>;
  let wentTo: string[];
  let signed: string[];

  const ADDRESS = '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9';

  function build(
    options: {
      signedIn?: boolean;
      address?: string;
      accepts?: boolean;
      refuses?: Error;
      /** What the api says the signature recovers to. Defaults to his. */
      recovers?: string | null;
      /** The same, for a wallet that signed the hex as text. */
      recoversHex?: string | null;
      /** The api cannot be reached to check at all. */
      apiDown?: boolean;
    } = {}
  ): void {
    wentTo = [];
    signed = [];
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [DoorComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            navigateByUrl: (url: string) => {
              wentTo.push(url);
              return Promise.resolve(true);
            },
          },
        },
        {
          provide: AdminAuthService,
          useValue: {
            isAdmin: () => options.signedIn ?? false,
            signInWithWallet: (bearer: string) => {
              signed.push(bearer);
              return options.accepts ?? true;
            },
          },
        },
        {
          provide: WalletService,
          useValue: {
            account: () => options.address ?? ADDRESS,
            connect: () => {
              if (options.refuses) return Promise.reject(options.refuses);
              return Promise.resolve(options.address ?? ADDRESS);
            },
            sign: () => Promise.resolve('0xsignature'),
          },
        },
        {
          provide: HttpClient,
          useValue: {
            post: () =>
              options.apiDown
                ? throwError(() => new Error('offline'))
                : of({
                    data: {
                      fromText:
                        options.recovers === undefined
                          ? (options.address ?? ADDRESS)
                          : options.recovers,
                      fromHex: options.recoversHex ?? null,
                    },
                  }),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(DoorComponent);
  }

  /** Reaches the protected members the template calls. */
  const door = () =>
    fixture.componentInstance as unknown as {
      withWallet(): Promise<void>;
      problem(): string;
      signing(): boolean;
    };

  /**
   * The first thing worth knowing on signing in is whether the machine has been
   * doing its job, and every task is one link from there. It used to open onto
   * /mint, which is one task out of six.
   */
  it('opens onto the latest activity', async () => {
    build({ signedIn: true });

    await fixture.componentInstance.ngOnInit();

    expect(wentTo).toEqual(['/activity']);
  });

  it('signs in with the wallet and goes in', async () => {
    build();

    await door().withWallet();

    expect(signed).toHaveLength(1);
    expect(wentTo).toEqual(['/activity']);
  });

  it('sends the api the sentence it will rebuild', async () => {
    build();

    await door().withWallet();

    const { message } = JSON.parse(atob(signed[0].slice('eth.'.length))) as { message: string };
    const issued = /^Issued: (.+)$/m.exec(message)?.[1] ?? '';
    expect(message).toBe(sessionMessage(ADDRESS, issued));
  });

  // Signed perfectly well, by the wrong wallet. Saying which one is the
  // difference between a refusal and a mystery.
  it('names the wallet it will not open for', async () => {
    const stranger = '0x1111111111111111111111111111111111111111';
    build({ address: stranger, accepts: false });

    await door().withWallet();

    expect(door().problem()).toContain(stranger);
    expect(wentTo).toEqual([]);
  });

  /**
   * The failure that cost him a working session. The door checked only the
   * sentence it had written itself, said he was in, and replaced a Google
   * session that worked with a wallet session the api refused on every
   * request — so he was signed in to nothing and signed out of something.
   */
  describe('when the signature is not what it looks like', () => {
    it('does not sign him in on a signature the api reads as somebody else', async () => {
      const someoneElse = '0x2222222222222222222222222222222222222222';
      build({ recovers: someoneElse });

      await door().withWallet();

      expect(signed).toEqual([]);
      expect(wentTo).toEqual([]);
      expect(door().problem()).toContain(someoneElse);
    });

    it('says plainly that nothing about the session changed', async () => {
      build({ recovers: '0x2222222222222222222222222222222222222222' });

      await door().withWallet();

      expect(door().problem()).toContain('Nothing was changed');
    });

    /**
     * Different from a wrong address, and it must not be reported as a
     * network problem: a wallet handing back something that is not a
     * signature at all is what a contract-account signature looks like from
     * here, and saying so is the difference between a clue and a wild goose.
     */
    it('says so when the wallet returns something unreadable', async () => {
      build({ recovers: null });

      await door().withWallet();

      expect(signed).toEqual([]);
      expect(door().problem()).toContain('cannot be read as a signature');
      expect(door().problem()).not.toContain('could not be reached');
    });

    it('changes nothing when the api cannot be reached to check', async () => {
      build({ apiDown: true });

      await door().withWallet();

      expect(signed).toEqual([]);
      expect(wentTo).toEqual([]);
      expect(door().problem()).toContain('could not be reached');
    });

    // Whichever of the two readings is his is the one that counts, so a wallet
    // that signs the hex as text still gets in.
    it('accepts the reading that is his', async () => {
      build({ recovers: null, recoversHex: ADDRESS });

      await door().withWallet();

      expect(wentTo).toEqual(['/activity']);
    });
  });

  it('repeats what the wallet said when it refuses', async () => {
    build({ refuses: new Error('Your wallet did not answer.') });

    await door().withWallet();

    expect(door().problem()).toBe('Your wallet did not answer.');
    expect(door().signing()).toBe(false);
  });

  /**
   * One way in, and Google is not the other.
   *
   * Google's popup rendered as a white screen inside a wallet app's browser,
   * saying nothing and dismissing nothing, which is why the wallet door was
   * built beside it — and then why it replaced it. What is checked here is that
   * nothing of it is left on the page: no element for Google to render a button
   * into, and no script of Google's fetched, which is also what lets the site's
   * content security policy name no outside host at all.
   */
  it('offers the wallet and nothing else', async () => {
    build();

    await fixture.componentInstance.ngOnInit();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.door-wallet')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.door-button')).toBeNull();
    expect(document.querySelector('script[src*="accounts.google.com"]')).toBeNull();
    expect(fixture.nativeElement.textContent).not.toContain('Google');
  });
});
