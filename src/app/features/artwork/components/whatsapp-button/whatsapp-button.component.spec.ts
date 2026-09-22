import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { environment } from '@environments/environment';
import { provideTranslateService } from '@ngx-translate/core';
import { LanguageUrlService } from '@shared/services/language-url.service';
import { vi } from 'vitest';
import { WhatsappButtonComponent } from './whatsapp-button.component';

function create(tokenId: string, language: 'en' | 'es' = 'es') {
  // Several of these build the button twice in one test — two languages, sold
  // and not — and a TestBed already instantiated refuses to be configured.
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [WhatsappButtonComponent],
    providers: [
      provideTranslateService(),
      provideRouter([]),
      {
        provide: LanguageUrlService,
        useValue: { contentLanguage: () => language },
      },
    ],
  });
  const fixture = TestBed.createComponent(WhatsappButtonComponent);
  fixture.componentRef.setInput('tokenId', tokenId);
  fixture.detectChanges();
  return fixture;
}

describe('WhatsappButtonComponent', () => {
  const asShipped = environment.whatsappEnquiries;

  beforeEach(() => {
    // On, so that what these check is the button rather than its absence. The
    // one test below that cares about the switch sets it itself.
    environment.whatsappEnquiries = true;
  });

  afterEach(() => {
    environment.whatsappEnquiries = asShipped;
    vi.clearAllMocks();
    TestBed.resetTestingModule();
  });

  /**
   * The one thing this component must never do. A telephone number written
   * here is written into every page the build produces, where anything that
   * crawls the web finds it without looking at a painting. The number lives in
   * a secret on the service, and the button links to the service.
   */
  it('carries no telephone number, only an address on the service', () => {
    const { componentInstance, nativeElement } = create('193');

    expect(componentInstance.href()).toContain('contact/whatsapp');
    expect(componentInstance.href()).not.toContain('wa.me');
    // Nothing in it is long enough to be a telephone number. (Not the whole
    // rendered output: the mark itself is a path of coordinates and would
    // trip any such rule.)
    expect(componentInstance.href()).not.toMatch(/\d{8,}/);
    expect(nativeElement.querySelector('a').getAttribute('href')).toBe(componentInstance.href());
  });

  it('says which painting, and in which language the page was read', () => {
    expect(create('193', 'es').componentInstance.href()).toContain('token=193&lang=es');
    expect(create('193', 'en').componentInstance.href()).toContain('token=193&lang=en');
  });

  it('asks after a sold piece rather than offering to buy it', () => {
    expect(create('23').componentInstance.label()).toBe('whatsapp.askInfo'); // sold
    expect(create('999999').componentInstance.label()).toBe('whatsapp.askPrice');
  });

  /**
   * A plain link. The site is read without JavaScript running, and on a
   * telephone this is what hands over to the WhatsApp app rather than opening
   * a tab that is then abandoned.
   */
  it('is an anchor carrying the mark, not a button', () => {
    const anchor = create('193').nativeElement.querySelector('a');

    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(anchor.getAttribute('rel')).toContain('noopener');
    expect(anchor.querySelector('svg')).toBeTruthy();
  });

  /**
   * Two switches, and this is the second one: the site is built hours before
   * anybody looks at it, so a button that leads to a service with no number
   * configured would be a button that leads to a 404.
   */
  it('renders nothing at all until the service has a number', () => {
    environment.whatsappEnquiries = false;

    expect(create('193').nativeElement.querySelector('a')).toBeNull();
  });
});
