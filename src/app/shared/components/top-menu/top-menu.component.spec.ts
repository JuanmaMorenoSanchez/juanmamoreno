import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTranslateService } from '@ngx-translate/core';
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
        provideRouter([]),
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

  it('does nothing when the language chosen is the one already showing', () => {
    const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    component.selectLanguage(ALLOWED_LANGUAGES.ENGLISH);

    expect(navigate).not.toHaveBeenCalled();
  });
});
