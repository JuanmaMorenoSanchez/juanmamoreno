import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { ALLOWED_LANGUAGES } from '@shared/constants/languages.constants';
import { vi } from 'vitest';
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
