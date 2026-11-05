import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { CvEntry } from '@domain/cv/cv-entry.entity';
import { provideTranslateService } from '@ngx-translate/core';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { CvService } from '@shared/services/cv.service';
import { mockArtworkInfraService } from '../../test/mocks/infrastructure/artwork/artwork.service.mock';
import { CvComponent } from './cv.component';

const SHOW: CvEntry = {
  id: 'aaaa000000000001',
  kind: 'solo',
  year: 2024,
  title: { en: 'El valle inquietante' },
  venue: { en: 'Zunino gallery', es: 'Galería Zunino' },
  city: 'Sevilla',
  country: 'spain',
};

const PRIZE: CvEntry = {
  id: 'aaaa000000000002',
  kind: 'award',
  year: 2019,
  title: { en: 'Antonio Gala prize' },
  country: 'spain',
};

/**
 * The cv page.
 *
 * The one thing worth asserting here is who can edit it: a reader is shown a
 * cv and nothing else, which is also what the four hundred prerendered pages
 * contain, because nobody is signed in while they are being built.
 */
describe('the cv page', () => {
  let fixture: ComponentFixture<CvComponent>;
  let admin: boolean;

  function build(): void {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [CvComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTranslateService(),
        provideRouter([]),
        { provide: ARTWORK_PORT, useValue: mockArtworkInfraService },
        { provide: AdminAuthService, useValue: { isAdmin: () => admin, bearerToken: () => 't' } },
        {
          provide: CvService,
          useValue: { entries: () => [SHOW, PRIZE], refresh: async () => undefined },
        },
      ],
    });

    fixture = TestBed.createComponent(CvComponent);
    fixture.detectChanges();
  }

  const controls = (): number => fixture.nativeElement.querySelectorAll('.cv-admin-button').length;
  const openForm = (): HTMLElement | null => fixture.nativeElement.querySelector('.cv-form');

  beforeEach(() => {
    admin = false;
  });

  it('shows the career to anybody', () => {
    build();

    expect(fixture.nativeElement.textContent).toContain('El valle inquietante');
  });

  it('shows a reader nothing to press', () => {
    build();

    expect(controls()).toBe(0);
    expect(openForm()).toBeNull();
  });

  /** An add beside each of the two headings, and a pencil on each entry. */
  it('shows him a way in beside every heading and every line', () => {
    admin = true;
    build();

    expect(controls()).toBe(4);
    expect(openForm()).toBeNull();
  });

  it('opens the form under the section it was opened from, and nowhere else', () => {
    admin = true;
    build();

    fixture.componentInstance.add('award');
    fixture.detectChanges();

    expect(fixture.componentInstance.formOpenIn('award')).toBe(true);
    expect(fixture.componentInstance.formOpenIn('solo')).toBe(false);
    expect(openForm()).not.toBeNull();
  });

  /**
   * The drawn line carries a title and a year; the form needs the two
   * languages, the links and the kind, which only the entry has.
   */
  it('hands the form the whole entry, not the line the page drew', () => {
    admin = true;
    build();

    fixture.componentInstance.correct(PRIZE.id);
    fixture.detectChanges();

    expect(fixture.componentInstance.correcting()).toEqual(PRIZE);
    expect(fixture.componentInstance.formOpenIn('award')).toBe(true);
  });

  it('shuts one form when the other opens, so only one is ever being written', () => {
    admin = true;
    build();

    fixture.componentInstance.add('solo');
    fixture.componentInstance.correct(PRIZE.id);
    fixture.detectChanges();

    expect(fixture.componentInstance.formOpenIn('solo')).toBe(false);
    expect(fixture.componentInstance.formOpenIn('award')).toBe(true);
  });
});
