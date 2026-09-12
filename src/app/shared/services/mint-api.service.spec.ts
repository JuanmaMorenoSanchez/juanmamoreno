import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';
import { MintApiService, type PendingMint } from './mint-api.service';

/**
 * The one place that knows the mint endpoints, which is why it is worth a test:
 * two pages used to hold their own copy of these calls and had to agree.
 */
describe('MintApiService', () => {
  let api: MintApiService;
  let http: HttpTestingController;
  const base = `${environment.backendUrl}/mint`;

  const waiting = (tokenId: number): PendingMint => ({
    tokenId,
    name: `Painting ${tokenId}`,
    description: 'Oil on canvas.',
    external_url: `https://www.juanmamoreno.com/artwork/${tokenId}`,
    attributes: [],
    thumbnailBase64: 'AAAA',
    webUrl: 'https://arweave.net/abc',
    originalUrl: 'https://storage.googleapis.com/x.jpg',
    preparedAt: '2026-09-12T00:00:00.000Z',
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(MintApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('puts the waiting certificates in token order, whatever order they arrive in', async () => {
    const promise = api.waiting();
    http.expectOne(`${base}/pending`).flush([waiting(199), waiting(197), waiting(198)]);

    expect((await promise).map((one) => one.tokenId)).toEqual([197, 198, 199]);
  });

  it('asks for the waiting ones to be written, and passes back what came of it', async () => {
    const promise = api.mintWaiting();
    const request = http.expectOne(`${base}/pending/mint`);
    expect(request.request.method).toBe('POST');
    request.flush({ minted: [197], skipped: 'gas is 0.9 gwei, above the 0.7 limit' });

    await expect(promise).resolves.toEqual({
      minted: [197],
      skipped: 'gas is 0.9 gwei, above the 0.7 limit',
    });
  });

  it('sends the studio form as it stands, so the photograph survives the trip', async () => {
    const form = new FormData();
    form.append('name', 'Rockets win III');
    const promise = api.prepare(form);

    const request = http.expectOne(`${base}/prepare`);
    expect(request.request.method).toBe('POST');
    // Not serialised to json anywhere: that would lose the file.
    expect(request.request.body).toBeInstanceOf(FormData);
    request.flush(waiting(197));

    await expect(promise).resolves.toMatchObject({ tokenId: 197 });
  });

  it('discards one by its own id', async () => {
    const promise = api.discard(197);
    const request = http.expectOne(`${base}/pending/197`);
    expect(request.request.method).toBe('DELETE');
    request.flush({});

    await promise;
  });
});
