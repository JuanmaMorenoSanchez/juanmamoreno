import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';
import { AdminAuthService } from './admin-auth.service';
import { MintApiService, type PendingMint } from './mint-api.service';

/**
 * The one place that knows the mint endpoints, which is why it is worth a test:
 * two pages used to hold their own copy of these calls and had to agree.
 */
describe('MintApiService', () => {
  let api: MintApiService;
  let http: HttpTestingController;
  const base = `${environment.backendUrl}/mint`;

  /**
   * The envelope every controller's answer arrives in.
   *
   * A single interceptor on the backend wraps everything as
   * `{ success, message, data }`. Tests that flushed the bare value passed while
   * the real api was misread — a stored certificate showed as "Token —
   * undefined" and the waiting list as empty — so they send what the server
   * sends.
   */
  const envelope = <T>(data: T) => ({ success: true, message: null, data });

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
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AdminAuthService, useValue: { bearerToken: () => 'his-token' } },
      ],
    });
    api = TestBed.inject(MintApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('puts the waiting certificates in token order, whatever order they arrive in', async () => {
    const promise = api.waiting();
    http.expectOne(`${base}/pending`).flush(envelope([waiting(199), waiting(197), waiting(198)]));

    expect((await promise).map((one) => one.tokenId)).toEqual([197, 198, 199]);
  });

  it('asks for the waiting ones to be written, and passes back what came of it', async () => {
    const promise = api.mintWaiting();
    const request = http.expectOne(`${base}/pending/mint`);
    expect(request.request.method).toBe('POST');
    request.flush(envelope({ minted: [197], skipped: 'gas is 0.9 gwei, above the 0.7 limit' }));

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
    request.flush(envelope(waiting(197)));

    await expect(promise).resolves.toMatchObject({ tokenId: 197 });
  });

  /**
   * The note for a painting's essay, asked for on its own rather than arriving
   * with the certificate — a private note is not a field on a certificate, not
   * even on one that has not been written yet.
   */
  describe('the note for the essay', () => {
    it('asks for it under the certificate it belongs to', async () => {
      const promise = api.clues(198);
      http.expectOne(`${base}/pending/198/clues`).flush(envelope({ clues: 'Una canción.' }));

      expect(await promise).toBe('Una canción.');
    });

    it('answers with nothing for a painting he left no note on', async () => {
      const promise = api.clues(198);
      http.expectOne(`${base}/pending/198/clues`).flush(envelope({ clues: '' }));

      expect(await promise).toBe('');
    });

    /** The correction carries it, and an empty one is how a note is taken back. */
    it('sends it with a correction', async () => {
      const promise = api.amend(198, {
        name: 'A title',
        medium: 'Oil on canvas',
        height: '25',
        width: '20',
        unit: 'cm',
        year: '2026',
        imageType: 'Frontal view',
        clues: '',
      });
      const sent = http.expectOne(`${base}/pending/198`);
      sent.flush(envelope(waiting(198)));

      await promise;
      expect(sent.request.body.clues).toBe('');
    });
  });

  it('discards one by its own id', async () => {
    const promise = api.discard(197);
    const request = http.expectOne(`${base}/pending/197`);
    expect(request.request.method).toBe('DELETE');
    request.flush(envelope({}));

    await promise;
  });

  /**
   * Every one of these asks something only the artist may ask, and this
   * application has no interceptor — each service attaches its own token. These
   * did not, so all six were refused with "Forbidden resource": nothing was
   * stored when a certificate was prepared, and minting stopped before a wallet
   * was ever opened.
   */
  describe('the artist’s token', () => {
    it('goes with every request', async () => {
      const calls: Array<[() => void, string, string]> = [
        [() => void api.waiting(), 'GET', `${base}/pending`],
        [() => void api.prepare(new FormData()), 'POST', `${base}/prepare`],
        [() => void api.mintWaiting(), 'POST', `${base}/pending/mint`],
        [() => void api.confirmWritten(197), 'POST', `${base}/pending/197/written`],
        [() => void api.discard(197), 'DELETE', `${base}/pending/197`],
      ];

      for (const [call, method, url] of calls) {
        call();
        const request = http.expectOne((candidate) => candidate.url === url);
        expect(request.request.method).toBe(method);
        expect(request.request.headers.get('Authorization')).toBe('Bearer his-token');
        request.flush(envelope([]));
      }
    });

    it('goes with the one that carries a query as well', async () => {
      // The easiest to get wrong: the options object already had something in
      // it, so the headers had to join it rather than replace it.
      void api.signable(197, '0xD7D0');
      const request = http.expectOne((candidate) =>
        candidate.url.endsWith('/pending/197/transaction')
      );

      expect(request.request.params.get('to')).toBe('0xD7D0');
      expect(request.request.headers.get('Authorization')).toBe('Bearer his-token');
      request.flush(envelope({}));
    });
  });
});
