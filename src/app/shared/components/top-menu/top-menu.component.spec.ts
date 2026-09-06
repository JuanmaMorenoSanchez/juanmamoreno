import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { ALLOWED_LANGUAGES } from '@shared/constants/languages.constants';
import { vi } from 'vitest';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { TopMenuComponent } from './top-menu.component';

describe('TopMenuComponent language switcher', () => {
  let component: TopMenuComponent;
  let router: Router;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [TopMenuComponent],
      providers: [
        provideTranslateService(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        // Enough of the real shape to navigate: a page inside the language
        // trees and one outside them.
        provideRouter([
          { path: 'studio', children: [] },
          { path: 'about', children: [] },
          { path: 'es/about', children: [] },
        ]),
        // The menu asks it for the years it lists; nothing here exercises that.
        { provide: ARTWORK_PORT, useValue: { getAvailableYears: () => new Set<number>() } },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(TopMenuComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    await fixture.whenStable();
  });

  it('offers both languages', () => {
    expect(component.languages.map((language) => language.code)).toEqual([
      ALLOWED_LANGUAGES.SPANISH,
      ALLOWED_LANGUAGES.ENGLISH,
    ]);
  });

  it('shows the language of the address it is on', () => {
    expect(component.activeLanguage).toBe(ALLOWED_LANGUAGES.ENGLISH);
    expect(component.currentLangLabel).toBe('EN');
  });

  it('goes to the Spanish address and remembers the choice', () => {
    const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    component.selectLanguage(ALLOWED_LANGUAGES.SPANISH);

    expect(navigate).toHaveBeenCalledWith('/es');
    expect(localStorage.getItem('juanmamoreno.language')).toBe(ALLOWED_LANGUAGES.SPANISH);
  });

  // The studio and the door exist at one address only, so there is no /es twin
  // to move to. The switcher used to send the reader to /es/studio, be bounced
  // straight back, and change nothing at all — which read as a switcher that
  // works everywhere except where its owner actually works.
  describe('on a page whose address carries no language', () => {
    beforeEach(async () => {
      await router.navigateByUrl('/studio');
    });

    it('changes the language where it stands instead of navigating', () => {
      const translate = TestBed.inject(TranslateService);
      const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

      component.selectLanguage(ALLOWED_LANGUAGES.SPANISH);

      expect(navigate).not.toHaveBeenCalled();
      expect(translate.currentLang()).toBe(ALLOWED_LANGUAGES.SPANISH);
      expect(localStorage.getItem('juanmamoreno.language')).toBe(ALLOWED_LANGUAGES.SPANISH);
    });

    it('reports the language it is actually showing', () => {
      component.selectLanguage(ALLOWED_LANGUAGES.SPANISH);

      expect(component.activeLanguage).toBe(ALLOWED_LANGUAGES.SPANISH);
      expect(component.currentLangLabel).toBe('ES');
    });
  });

  it('does nothing when the language chosen is the one already showing', () => {
    const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    component.selectLanguage(ALLOWED_LANGUAGES.ENGLISH);

    expect(navigate).not.toHaveBeenCalled();
  });
});

/**
 * The one menu item that is not for the reader.
 *
 * Every address behind the guard hangs off it — the studio, the reels waiting
 * to be published, and the way out — so there is one place to add the next one
 * and one place a reader can be certain does not appear for them.
 */
describe('TopMenuComponent workshop menu', () => {
  /** Opens the menu if it is there, and returns what it offers. */
  async function setup(session: { signedIn: boolean; knownHere: boolean }) {
    localStorage.clear();
    TestBed.resetTestingModule();
    const signOut = vi.fn();

    await TestBed.configureTestingModule({
      imports: [TopMenuComponent],
      providers: [
        provideTranslateService(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        provideRouter([
          { path: 'studio', children: [] },
          { path: 'publish', children: [] },
          { path: 'door', children: [] },
        ]),
        { provide: ARTWORK_PORT, useValue: { getAvailableYears: () => new Set<number>() } },
        {
          provide: AdminAuthService,
          useValue: {
            isAdmin: () => session.signedIn,
            knownHere: () => session.knownHere,
            bearerToken: () => (session.signedIn ? 'a-real-looking-token' : null),
            identity: () => (session.signedIn ? { email: 'him@example.test' } : null),
            signOut,
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(TopMenuComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const trigger = host.querySelector<HTMLElement>('.studio-session');
    return { fixture, host, trigger, signOut };
  }

  /** What the opened menu offers, by visible text. */
  const itemsOf = (trigger: HTMLElement | null) => {
    trigger?.click();
    return [...document.querySelectorAll('.mat-mdc-menu-item')].map((item) =>
      (item.textContent ?? '').trim(),
    );
  };

  afterEach(() => TestBed.resetTestingModule());

  /**
   * The whole point. A reader has never signed in here, so as far as this
   * browser is concerned there is nobody — and none of these addresses is
   * offered to them.
   */
  it('is not there for a reader', async () => {
    const { trigger, host } = await setup({ signedIn: false, knownHere: false });

    expect(trigger).toBeNull();
    expect(host.textContent).not.toContain('Workshop');
    expect(host.textContent).not.toContain('Studio');
    expect(host.textContent).not.toContain('Reels');
  });

  // Signed in: one item, holding everything that is his.
  it('gathers the private pages and the way out', async () => {
    const { trigger } = await setup({ signedIn: true, knownHere: true });

    expect(trigger?.textContent).toContain('Workshop');
    expect(itemsOf(trigger)).toEqual(['Studio', 'Reels waiting', 'Sign out']);
  });

  it('links each of them to its own address', async () => {
    const { trigger } = await setup({ signedIn: true, knownHere: true });
    trigger?.click();

    const links = [...document.querySelectorAll('a.mat-mdc-menu-item')].map((a) =>
      a.getAttribute('href'),
    );
    expect(links).toEqual(['/studio', '/publish']);
  });

  it('signs out from inside it', async () => {
    const { trigger, signOut } = await setup({ signedIn: true, knownHere: true });
    trigger?.click();

    const out = [...document.querySelectorAll('.mat-mdc-menu-item')].find((item) =>
      (item.textContent ?? '').includes('Sign out'),
    );
    (out as HTMLElement)?.click();

    expect(signOut).toHaveBeenCalled();
  });

  /**
   * A lapsed session on his own browser. The menu goes with the session — the
   * pages behind it would refuse him anyway — but the way back in stays, or
   * signing out would take away the way back.
   */
  it('offers the way back in, and nothing else, once the session has lapsed', async () => {
    const { trigger, host } = await setup({ signedIn: false, knownHere: true });

    expect(trigger?.textContent).toContain('Sign in');
    expect(trigger?.getAttribute('href')).toBe('/door');
    expect(host.textContent).not.toContain('Workshop');
  });
});
