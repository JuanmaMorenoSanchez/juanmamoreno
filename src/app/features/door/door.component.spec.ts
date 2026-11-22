import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
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
      inWalletBrowser?: boolean;
      address?: string;
      accepts?: boolean;
      refuses?: Error;
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
            insideWalletBrowser: () => options.inWalletBrowser ?? false,
            connect: () => {
              if (options.refuses) return Promise.reject(options.refuses);
              return Promise.resolve(options.address ?? ADDRESS);
            },
            sign: () => Promise.resolve('0xsignature'),
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
      walletOnly(): boolean;
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

    await fixture.componentInstance.ngAfterViewInit();

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

  it('repeats what the wallet said when it refuses', async () => {
    build({ refuses: new Error('Your wallet did not answer.') });

    await door().withWallet();

    expect(door().problem()).toBe('Your wallet did not answer.');
    expect(door().signing()).toBe(false);
  });

  /**
   * Google's popup renders as a white screen inside a wallet app's browser,
   * saying nothing and dismissing nothing — so it is not offered there. This is
   * the whole reason the wallet door exists, and the reason it is the only one
   * on that page.
   */
  it('offers only the wallet inside a wallet app’s browser', async () => {
    build({ inWalletBrowser: true });

    await fixture.componentInstance.ngAfterViewInit();
    fixture.detectChanges();

    expect(door().walletOnly()).toBe(true);
    const google = fixture.nativeElement.querySelector('.door-button') as HTMLElement;
    expect(google.hidden).toBe(true);
    expect(fixture.nativeElement.querySelector('.door-wallet')).not.toBeNull();
  });

  it('offers both ways in anywhere else', async () => {
    // With no client id the door stops before fetching Google's script, which
    // jsdom cannot load anyway. What is being checked is that the Google way in
    // is left on the page, not what Google then does with it.
    const configured = environment.googleClientId;
    environment.googleClientId = '';
    build();

    try {
      await fixture.componentInstance.ngAfterViewInit();
    } finally {
      environment.googleClientId = configured;
    }
    fixture.detectChanges();

    expect(door().walletOnly()).toBe(false);
    const google = fixture.nativeElement.querySelector('.door-button') as HTMLElement;
    expect(google.hidden).toBe(false);
    expect(fixture.nativeElement.querySelector('.door-wallet')).not.toBeNull();
  });
});
