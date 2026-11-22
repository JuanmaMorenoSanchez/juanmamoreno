import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { forgetRefusedWallet } from './refused-wallet.interceptor';

describe('forgetRefusedWallet', () => {
  let http: HttpClient;
  let served: HttpTestingController;
  let dropped: number;
  let wentTo: string[];

  /** @param hadWallet whether a wallet session was there to be dropped. */
  function build(hadWallet: boolean): void {
    dropped = 0;
    wentTo = [];
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([forgetRefusedWallet])),
        provideHttpClientTesting(),
        {
          provide: AdminAuthService,
          useValue: {
            forgetRefusedWallet: () => {
              dropped += 1;
              return hadWallet;
            },
          },
        },
        {
          provide: Router,
          useValue: {
            navigateByUrl: (url: string) => {
              wentTo.push(url);
              return Promise.resolve(true);
            },
          },
        },
      ],
    });
    http = TestBed.inject(HttpClient);
    served = TestBed.inject(HttpTestingController);
  }

  /** Sends one request and answers it with the given status. */
  function refuse(url: string, status: number): void {
    http.get(url).subscribe({ next: () => undefined, error: () => undefined });
    served.expectOne(url).flush('no', { status, statusText: 'Forbidden' });
  }

  /**
   * The failure this exists for. A wallet session is alive as far as the
   * browser can tell — right address, this week — while the api refuses the
   * signature in it on every request. He was told he was in, forwarded past
   * the door on every visit, and shown empty pages for two days.
   */
  it('drops a refused wallet session and shows him the door', () => {
    build(true);

    refuse(`${environment.backendUrl}mint/pending`, 403);

    expect(dropped).toBe(1);
    expect(wentTo).toEqual(['/door']);
  });

  // A Google session renews itself, and a reader has nothing to drop. Neither
  // should be thrown at the door by a refusal that was not about them.
  it('leaves anyone without a wallet session where they are', () => {
    build(false);

    refuse(`${environment.backendUrl}mint/pending`, 403);

    expect(wentTo).toEqual([]);
  });

  // Only this api's refusals say anything about his session here.
  it('ignores a refusal from somewhere else', () => {
    build(true);

    refuse('https://example.com/elsewhere', 403);

    expect(dropped).toBe(0);
    expect(wentTo).toEqual([]);
  });

  it('ignores a failure that is not a refusal', () => {
    build(true);

    refuse(`${environment.backendUrl}mint/pending`, 500);

    expect(dropped).toBe(0);
    expect(wentTo).toEqual([]);
  });

  afterEach(() => served.verify());
});
