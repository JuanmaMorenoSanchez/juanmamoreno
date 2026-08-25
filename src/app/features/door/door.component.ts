import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, PLATFORM_ID, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { AdminAuthService } from '@shared/services/admin-auth.service';

const GOOGLE_SCRIPT = 'https://accounts.google.com/gsi/client';

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
  private router = inject(Router);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly buttonHost = viewChild.required<ElementRef<HTMLElement>>('googleButton');

  protected readonly status = signal<'idle' | 'rejected' | 'unconfigured'>('idle');

  async ngAfterViewInit(): Promise<void> {
    if (!this.isBrowser) return;

    if (this.auth.isAdmin()) {
      await this.router.navigateByUrl('/studio');
      return;
    }

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
      });
      google.accounts.id.prompt();
    } catch {
      this.status.set('unconfigured');
    }
  }

  private async onCredential(response: GoogleCredentialResponse): Promise<void> {
    if (this.auth.signIn(response.credential)) {
      await this.router.navigateByUrl('/studio');
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
