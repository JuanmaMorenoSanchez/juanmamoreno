import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CvEntry, CvWrite } from '@domain/cv/cv-entry.entity';
import { environment } from '@environments/environment';
import { AdminAuthService } from './admin-auth.service';
import { CvService } from './cv.service';

const ENTRIES = `${environment.backendUrl}cv/entries`;

const SHOW: CvWrite = {
  kind: 'solo',
  year: 2026,
  title: { en: 'Something new' },
  country: 'spain',
};

const ANSWERED: CvEntry[] = [{ ...SHOW, id: 'bbbb000000000002' }];

describe('the cv, read and written', () => {
  let service: CvService;
  let http: HttpTestingController;

  // Configured inside each test rather than in a `beforeEach`, because one of
  // them needs the service to think it is the prerender.
  function build(platform: 'browser' | 'server' = 'browser'): void {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: platform },
        { provide: AdminAuthService, useValue: { bearerToken: () => 'his-token' } },
      ],
    });
    service = TestBed.inject(CvService);
    http = TestBed.inject(HttpTestingController);
  }

  afterEach(() => http.verify());

  /**
   * Lets the microtasks run.
   *
   * A write sends its own request synchronously, but the read that follows it
   * is behind an `await`, so it has not been sent yet when the write's answer
   * is flushed.
   */
  const settle = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0));

  describe('reading it', () => {
    it('knows the career before anything is asked, from what the build wrote down', () => {
      build();

      expect(service.entries().length).toBeGreaterThan(20);
    });

    /**
     * The build has already written the api's answer into the bundle, and a
     * request per prerendered page is four hundred answers to a question that
     * is answered — which also let a half-finished deploy replace a complete
     * cv with whatever it had at that moment.
     */
    it('asks nothing at all while the pages are being built', async () => {
      build('server');

      await service.refresh();

      http.expectNone(ENTRIES);
    });

    it('asks once a visit, however many pages want it', async () => {
      build();

      const first = service.refresh();
      const second = service.refresh();
      http.expectOne(ENTRIES).flush({ success: true, data: { entries: ANSWERED } });
      await Promise.all([first, second]);

      expect(service.entries()).toEqual(ANSWERED);
    });

    it('keeps what it knows when the api cannot be reached', async () => {
      build();
      const known = service.entries().length;

      const asked = service.refresh();
      http.expectOne(ENTRIES).error(new ProgressEvent('offline'));
      await asked;

      expect(service.entries().length).toBe(known);
    });
  });

  describe('writing it', () => {
    it('adds an entry behind his own credential', async () => {
      build();

      const adding = service.create(SHOW);
      const post = http.expectOne({ method: 'POST', url: ENTRIES });
      expect(post.request.body).toEqual(SHOW);
      expect(post.request.headers.get('Authorization')).toBe('Bearer his-token');
      post.flush({ success: true, data: ANSWERED[0] });

      await settle();
      http.expectOne(ENTRIES).flush({ success: true, data: { entries: ANSWERED } });
      await adding;
    });

    it('corrects one by its id, which does not move', async () => {
      build();

      const correcting = service.update('aaaa000000000001', SHOW);
      const put = http.expectOne({ method: 'PUT', url: `${ENTRIES}/aaaa000000000001` });
      expect(put.request.body).toEqual(SHOW);
      put.flush({ success: true, data: ANSWERED[0] });

      await settle();
      http.expectOne(ENTRIES).flush({ success: true, data: { entries: ANSWERED } });
      await correcting;
    });

    it('takes one off the cv', async () => {
      build();

      const removing = service.remove('aaaa000000000001');
      const deleted = http.expectOne({ method: 'DELETE', url: `${ENTRIES}/aaaa000000000001` });
      expect(deleted.request.headers.get('Authorization')).toBe('Bearer his-token');
      deleted.flush({ success: true, data: { id: 'aaaa000000000001' } });

      await settle();
      http.expectOne(ENTRIES).flush({ success: true, data: { entries: ANSWERED } });
      await removing;
    });

    /**
     * The order is the api's — by kind, newest first, and within a year the
     * order the seed was in, which is his. An entry spliced in here would land
     * wherever this code guessed and be somewhere else after the next reload.
     */
    it('asks the api again afterwards, rather than guessing where the entry goes', async () => {
      build();
      const asked = service.refresh();
      http.expectOne(ENTRIES).flush({ success: true, data: { entries: ANSWERED } });
      await asked;

      const adding = service.create(SHOW);
      http.expectOne({ method: 'POST', url: ENTRIES }).flush({ success: true, data: ANSWERED[0] });

      // The once-a-visit hold does not apply to a read that follows a write.
      await settle();
      const again = [...ANSWERED, { ...SHOW, id: 'cccc000000000003' }];
      http.expectOne(ENTRIES).flush({ success: true, data: { entries: again } });
      await adding;

      expect(service.entries()).toEqual(again);
    });

    /**
     * The refusal that matters names the paintings citing the entry, so it has
     * to reach the form rather than being swallowed the way a read is.
     */
    it('lets the api refusal through to whoever asked', async () => {
      build();

      const removing = service.remove('aaaa000000000001');
      const refused = expect(removing).rejects.toBeDefined();
      http
        .expectOne({ method: 'DELETE', url: `${ENTRIES}/aaaa000000000001` })
        .flush(
          { success: false, message: '2 painting(s) still cite this: 40, 55' },
          { status: 409, statusText: 'Conflict' }
        );
      await refused;
    });
  });
});
