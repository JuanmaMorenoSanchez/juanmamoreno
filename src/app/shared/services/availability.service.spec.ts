import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';
import { SOLD_AT_LAST_BUILD } from '@features/artwork/constants/artworks-fallback.constants';
import { AdminAuthService } from './admin-auth.service';
import { AvailabilityService } from './availability.service';

describe('AvailabilityService', () => {
  const ENDPOINT = `${environment.backendUrl}availability`;

  let service: AvailabilityService;
  let http: HttpTestingController;
  let bearer: string | null;

  beforeEach(() => {
    bearer = 'his-token';
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AdminAuthService, useValue: { bearerToken: () => bearer, isAdmin: () => true } },
      ],
    });
    service = TestBed.inject(AvailabilityService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  /**
   * The red dot is drawn in the first frame, before any request can have
   * returned. Painting every work as available while it waits would be a lie
   * in the direction that costs an enquiry.
   */
  it('knows what was sold when the page was built, before it asks anybody', () => {
    expect(service.isSold(SOLD_AT_LAST_BUILD[0])).toBe(true);
    expect(service.isSold('999999')).toBe(false);
  });

  it('takes the api answer over the one the build wrote down', async () => {
    const asking = service.refresh();
    http.expectOne(ENDPOINT).flush({ success: true, data: { sold: ['999999'] } });
    await asking;

    expect(service.isSold('999999')).toBe(true);
    expect(service.isSold(SOLD_AT_LAST_BUILD[0])).toBe(false);
  });

  /** A catalogue a few hours out of date beats one that offers sold work. */
  it('keeps what it knows when the api cannot be reached', async () => {
    const asking = service.refresh();
    http.expectOne(ENDPOINT).error(new ProgressEvent('network error'));
    await asking;

    expect(service.isSold(SOLD_AT_LAST_BUILD[0])).toBe(true);
  });

  /** Every tile, every page and every printed sheet asks the same question. */
  it('asks once however many times it is asked', async () => {
    const first = service.refresh();
    const second = service.refresh();
    http.expectOne(ENDPOINT).flush({ success: true, data: { sold: [] } });
    await Promise.all([first, second]);

    http.expectNone(ENDPOINT);
  });

  describe('recording a sale', () => {
    it('says which of the two it means, with the artist’s own credential', async () => {
      const saving = service.set('195', true);
      const sent = http.expectOne(`${ENDPOINT}/195`);

      expect(sent.request.method).toBe('PATCH');
      expect(sent.request.body).toEqual({ sold: true });
      expect(sent.request.headers.get('Authorization')).toBe('Bearer his-token');

      sent.flush({ success: true, data: { tokenId: '195', sold: true } });
      await saving;
    });

    /** The dot he just changed is the dot he sees, without asking again. */
    it('keeps the new answer as soon as the api has taken it', async () => {
      const saving = service.set('195', true);
      http.expectOne(`${ENDPOINT}/195`).flush({ success: true, data: {} });
      await saving;

      expect(service.isSold('195')).toBe(true);

      const undoing = service.set('195', false);
      http.expectOne(`${ENDPOINT}/195`).flush({ success: true, data: {} });
      await undoing;

      expect(service.isSold('195')).toBe(false);
    });

    it('does not ask at all when nobody is signed in', async () => {
      bearer = null;

      await expect(service.set('195', true)).rejects.toThrow();
      http.expectNone(`${ENDPOINT}/195`);
    });

    /** A refused write must not leave the page saying something untrue. */
    it('leaves the answer alone when the api refuses', async () => {
      const saving = service.set('195', true);
      http.expectOne(`${ENDPOINT}/195`).flush('no', { status: 403, statusText: 'Forbidden' });

      await expect(saving).rejects.toBeTruthy();
      expect(service.isSold('195')).toBe(false);
    });
  });
});
