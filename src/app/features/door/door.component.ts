import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  PLATFORM_ID,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { asBearer, sessionMessage } from '@shared/services/wallet-session';
import { WalletService } from '@shared/services/wallet.service';

const GOOGLE_SCRIPT = 'https://accounts.google.com/gsi/client';

/**
 * Where the door opens onto.
 *
 * Activity rather than any one task, because the first thing worth
 * knowing on signing in is whether the machine has been doing its job — and
 * every task is one link from there.
 */
const AFTER_SIGN_IN = '/activity';

interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleIdentityApi {
  accounts: {
    id: {
      initialize(options: {
        client_id: string;
        callback: (response: GoogleCredentialResponse) => void;
        auto_select?: boolean;
        cancel_on_tap_outside?: boolean;
      }): void;
      renderButton(parent: HTMLElement, options: Record<string, unknown>): void;
      prompt(): void;
    };
  };
}

@Component({
  selector: 'app-door',
  templateUrl: './door.component.html',
  styleUrl: './door.component.scss',
})
export class DoorComponent implements AfterViewInit {
  private auth = inject(AdminAuthService);
  private wallet = inject(WalletService);
  private router = inject(Router);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly buttonHost = viewChild.required<ElementRef<HTMLElement>>('googleButton');

  protected readonly status = signal<'idle' | 'rejected' | 'unconfigured'>('idle');

  /**
   * Whether to offer Google at all.
   *
   * Inside a wallet app's own browser it is not offered, because it cannot
   * work: Google refuses to sign anyone in from an embedded browser and its
   * popup opens there as a white screen that says nothing and cannot be
   * dismissed. A door that cannot open does not belong on the page.
   */
  protected readonly walletOnly = signal(false);

  /** While the wallet is being asked, so the button cannot be pressed twice. */
  protected readonly signing = signal(false);

  /** What the wallet or this door said went wrong, in his own words. */
  protected readonly problem = signal('');

  async ngAfterViewInit(): Promise<void> {
    if (!this.isBrowser) return;

    if (this.auth.isAdmin()) {
      await this.router.navigateByUrl(AFTER_SIGN_IN);
      return;
    }

    this.walletOnly.set(this.wallet.insideWalletBrowser());
    if (this.walletOnly()) return;

    if (!environment.googleClientId) {
      this.status.set('unconfigured');
      return;
    }

    try {
      const google = await this.loadGoogleIdentity();
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: (response) => void this.onCredential(response),
        // Signs a returning visitor back in without a prompt, which is what
        // keeps the stored token from being a once-an-hour interruption.
        auto_select: true,
        cancel_on_tap_outside: false,
      });
      google.accounts.id.renderButton(this.buttonHost().nativeElement, {
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        // The same width as the wallet button beside it; left to itself Google
        // fills its container, which on a wide screen is the whole column.
        width: 320,
      });
      google.accounts.id.prompt();
    } catch {
      this.status.set('unconfigured');
    }
  }

  /**
   * Signs in with the wallet: connect, sign one sentence, come in.
   *
   * The sentence names this site and the moment, and is the same text the api
   * rebuilds and checks — so what he reads in the wallet is exactly what is
   * verified. It authorises nothing on the chain and spends nothing, which it
   * says of itself.
   */
  protected async withWallet(): Promise<void> {
    if (this.signing()) return;
    this.signing.set(true);
    this.problem.set('');

    try {
      const address = await this.wallet.connect();
      const message = sessionMessage(address, new Date().toISOString());
      const signature = await this.wallet.sign(message);

      if (this.auth.signInWithWallet(asBearer(message, signature))) {
        await this.router.navigateByUrl(AFTER_SIGN_IN);
        return;
      }
      // Signed perfectly well, by the wrong wallet. There is exactly one
      // address this door opens for, and saying which one it was is the
      // difference between a refusal and a mystery.
      this.problem.set(`That wallet is ${address}, which this door does not open for.`);
    } catch (failure: unknown) {
      this.problem.set(
        failure instanceof Error ? failure.message : 'The wallet did not sign anything.'
      );
    } finally {
      this.signing.set(false);
    }
  }

  private async onCredential(response: GoogleCredentialResponse): Promise<void> {
    if (this.auth.signIn(response.credential)) {
      await this.router.navigateByUrl(AFTER_SIGN_IN);
      return;
    }
    // Any other Google account lands here, including one that is signed in and
    // perfectly valid. There is exactly one address this door opens for.
    this.status.set('rejected');
  }

  private loadGoogleIdentity(): Promise<GoogleIdentityApi> {
    const existing = (window as unknown as { google?: GoogleIdentityApi }).google;
    if (existing) return Promise.resolve(existing);

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = GOOGLE_SCRIPT;
      script.async = true;
      script.onload = () => {
        const google = (window as unknown as { google?: GoogleIdentityApi }).google;
        if (google) resolve(google);
        else reject(new Error('Google identity did not load'));
      };
      script.onerror = () => reject(new Error('Google identity did not load'));
      document.head.appendChild(script);
    });
  }
}
