import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';
import { provideTranslateService } from '@ngx-translate/core';
import { CvProseService } from './cv-prose.service';

describe('CvProseService', () => {
  let service: CvProseService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideTranslateService()],
    });
    service = TestBed.inject(CvProseService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  /**
   * What the model is given, and the only thing that knows his career. Three
   * facts a line — when, what, where — which reads as well as the page's three
   * columns and far better than a table would.
   */
  describe('the list it sends', () => {
    it('gives every entry its year and its place', () => {
      const list = service.asList();

      // A real line from the cv, which is what a section looks like.
      expect(list).toContain('2024 — El valle inquietante');
      expect(list).toContain('Sevilla');
      expect(list.split('\n').length).toBeGreaterThan(20);
    });

    it('separates the sections, so the model can tell a show from a prize', () => {
      expect(service.asList()).toContain('\n\n');
    });
  });

  it('asks the api for the language being read', async () => {
    const reading = service.read('es');

    const request = http.expectOne(`${environment.backendUrl}cv/prose/es`);
    request.flush({ success: true, message: null, data: { lang: 'es', body: 'Nació en 1986.' } });

    expect((await reading)?.body).toBe('Nació en 1986.');
  });

  /**
   * A dossier without the biography is still a dossier, and the cv page simply
   * does not offer what it has not got.
   */
  it('answers with nothing when none has been written', async () => {
    const reading = service.read('en');

    http.expectOne(`${environment.backendUrl}cv/prose/en`).flush(null, {
      status: 404,
      statusText: 'Not Found',
    });

    await expect(reading).resolves.toBeNull();
  });

  it('sends the list along when asking for a new one', async () => {
    const writing = service.write('en');

    const request = http.expectOne(`${environment.backendUrl}cv/prose`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body.lang).toBe('en');
    expect(String(request.request.body.list)).toContain('El valle inquietante');
    request.flush({ success: true, message: null, data: { lang: 'en', body: 'Born in 1986.' } });

    expect((await writing).body).toBe('Born in 1986.');
  });
});
