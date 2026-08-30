import { Injectable } from '@angular/core';

const GOOGLE_SCRIPT = 'https://accounts.google.com/gsi/client';

export interface GoogleCredentialResponse {
  credential: string;
}

export interface GoogleIdentityApi {
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

/**
 * Google's sign-in script, fetched once and shared.
 *
 * Two places need it now — the door, and whatever renews a session that is
 * about to run out — and loading it twice would initialise Google's library
 * twice over the same page. It is also never fetched at all unless something
 * actually asks: an ordinary reader of the catalogue has no business loading
 * Google's code, and does not.
 */
@Injectable({ providedIn: 'root' })
export class GoogleIdentityService {
  private loading: Promise<GoogleIdentityApi> | null = null;

  load(): Promise<GoogleIdentityApi> {
    if (this.loading) return this.loading;

    const existing = (window as unknown as { google?: GoogleIdentityApi }).google;
    if (existing) {
      this.loading = Promise.resolve(existing);
      return this.loading;
    }

    this.loading = new Promise<GoogleIdentityApi>((resolve, reject) => {
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

    // A failed load must not be remembered as the answer for ever.
    this.loading.catch(() => (this.loading = null));
    return this.loading;
  }
}
