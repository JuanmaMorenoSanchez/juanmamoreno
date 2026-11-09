import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { environment } from '@environments/environment';
import testProviders from '../../../../test-providers';
import { MailService } from './mail.service';

/**
 * What goes to the api with a message, beyond what the visitor typed.
 *
 * Both forms exist twice, prerendered, in both languages — and the courtesy
 * reply came back in English whichever one a reader wrote from, because nothing
 * ever told the api which it had been. The language travels with every message
 * from here rather than from each caller, so a third form cannot forget it.
 */
describe('MailService', () => {
  let service: MailService;
  let http: HttpTestingController;

  const setup = async (url: string) => {
    TestBed.configureTestingModule({
      providers: [
        ...testProviders,
        provideHttpClient(),
        provideHttpClientTesting(),
        // Anything matches: this spec is about the language in the address, and
        // the language comes from the address itself, not from a route's data.
        provideRouter([{ path: '**', children: [] }]),
      ],
    });
    // The language is read off the address, which is where it lives.
    await TestBed.inject(Router).navigateByUrl(url);
    service = TestBed.inject(MailService);
    http = TestBed.inject(HttpTestingController);
  };

  afterEach(() => http?.verify());

  const posted = () => {
    const request = http.expectOne(`${environment.backendUrl}contact`);
    request.flush({ success: true, data: '', message: '', error: null });
    return request.request.body;
  };

  it('tells the api the message was written in English', async () => {
    await setup('/contact');

    service
      .sendContactMessage({ name: 'María José', email: 'someone@example.com', message: 'Hola.' })
      .subscribe();

    expect(posted().lang).toBe('en');
  });

  it('tells the api the message was written in Spanish', async () => {
    await setup('/es/contact');

    service
      .sendContactMessage({ name: 'María José', email: 'someone@example.com', message: 'Hola.' })
      .subscribe();

    expect(posted().lang).toBe('es');
  });

  it('carries what the visitor typed, unchanged', async () => {
    await setup('/contact');

    service
      .sendContactMessage({
        name: 'María José',
        email: 'someone@example.com',
        message: 'Hola.',
        honeypot: '',
      })
      .subscribe();

    const body = posted();
    expect(body.name).toBe('María José');
    expect(body.email).toBe('someone@example.com');
    expect(body.message).toBe('Hola.');
    expect(body.honeypot).toBe('');
  });

  /**
   * The enquiry about a painting asks for an email and a message, never a name.
   * It composes `name` out of the question, because that is what the artist
   * wants in his subject line — and the reply used to take the first three
   * words of it for a name and answer "Thank you Price request Las".
   */
  describe('an enquiry about one painting', () => {
    it('says there is no name to be greeted by', async () => {
      await setup('/artwork/5');

      service
        .sendQuoteRequest({
          email: 'someone@example.com',
          message: '',
          artworkName: 'Las Meninas',
          tokenId: '5',
          mode: 'price',
        })
        .subscribe();

      const body = posted();
      expect(body.greeting).toBe('');
      // Still the question in the artist's subject line.
      expect(body.name).toBe('Price request: Las Meninas (#5)');
      expect(body.lang).toBe('en');
    });

    it('is Spanish from the Spanish half of the catalogue', async () => {
      await setup('/es/artwork/5');

      service
        .sendQuoteRequest({
          email: 'someone@example.com',
          message: 'Me interesa.',
          artworkName: 'Las Meninas',
          tokenId: '5',
          mode: 'info',
        })
        .subscribe();

      const body = posted();
      expect(body.lang).toBe('es');
      expect(body.greeting).toBe('');
      expect(body.message).toContain('Me interesa.');
    });
  });
});
