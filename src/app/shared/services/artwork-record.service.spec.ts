import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';
import { AdminAuthService } from './admin-auth.service';
import { ArtworkRecordService } from './artwork-record.service';
import { CvService } from './cv.service';

/**
 * How the site reads and writes what happened to each painting.
 *
 * The one that matters most here is the last: nothing may be fetched while the
 * pages are being built. A build renders 402 of them, each one its own
 * application, so a request in a component's constructor is 402 requests — and
 * it measured exactly that before this was guarded.
 */
describe('what happened to the paintings', () => {
  function serviceOn(platform: string): {
    service: ArtworkRecordService;
    http: HttpTestingController;
  } {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: platform },
        { provide: AdminAuthService, useValue: { bearerToken: () => 'a-token' } },
      ],
    });

    return {
      service: TestBed.inject(ArtworkRecordService),
      http: TestBed.inject(HttpTestingController),
    };
  }

  it('asks the api once, however many times it is asked to', async () => {
    const { service, http } = serviceOn('browser');

    const first = service.refresh();
    const second = service.refresh();

    http.expectOne(`${environment.backendUrl}artwork-record`).flush({
      success: true,
      message: null,
      data: { records: [{ tokenId: '165', entries: [{ kind: 'sold', year: 2025 }] }] },
    });
    await Promise.all([first, second]);

    expect(service.of('165')).toHaveLength(1);
    http.verify();
  });

  /**
   * 384 pages each fetched this before it was guarded. The build has already
   * written every record into the bundle; asking again answers a question that
   * is answered, and a half-finished deploy answering with nothing stripped
   * the provenance off every page.
   */
  it('asks for nothing at all while the pages are being built', async () => {
    const { service, http } = serviceOn('server');

    await service.refresh();

    http.expectNone(`${environment.backendUrl}artwork-record`);
    http.verify();
  });

  it('keeps what the build wrote down when the api cannot be reached', async () => {
    const { service, http } = serviceOn('browser');

    const asking = service.refresh();
    http.expectOne(`${environment.backendUrl}artwork-record`).flush(null, {
      status: 500,
      statusText: 'Server Error',
    });

    await expect(asking).resolves.toBeUndefined();
    http.verify();
  });

  it('writes a record whole, and takes the answer as the truth', async () => {
    const { service, http } = serviceOn('browser');

    const saving = service.set('165', [{ kind: 'sold', year: 2025 }]);
    const request = http.expectOne(`${environment.backendUrl}artwork-record/165`);

    expect(request.request.method).toBe('PUT');
    expect(request.request.headers.get('Authorization')).toBe('Bearer a-token');
    expect(request.request.body.entries).toEqual([{ kind: 'sold', year: 2025 }]);

    request.flush({
      success: true,
      message: null,
      data: { tokenId: '165', entries: [{ kind: 'sold', year: 2025 }] },
    });

    expect(await saving).toHaveLength(1);
    expect(service.of('165')).toHaveLength(1);
  });

  it('forgets a painting whose last line has gone', async () => {
    const { service, http } = serviceOn('browser');

    const saving = service.set('165', []);
    http
      .expectOne(`${environment.backendUrl}artwork-record/165`)
      .flush({ success: true, message: null, data: { tokenId: '165', entries: [] } });

    await saving;

    expect(service.of('165')).toEqual([]);
  });
});

/** The cv is bundled for the same reason, and must not be fetched twice either. */
describe('the career, while the pages are being built', () => {
  it('asks for nothing', async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });

    const cv = TestBed.inject(CvService);
    const http = TestBed.inject(HttpTestingController);

    await cv.refresh();

    http.expectNone(`${environment.backendUrl}cv/entries`);
    http.verify();

    // And it still answers with the whole career, out of the bundle.
    expect(cv.entries().length).toBeGreaterThan(40);
  });
});
