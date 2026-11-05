import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvEntry, CvWrite } from '@domain/cv/cv-entry.entity';
import { provideTranslateService } from '@ngx-translate/core';
import { CvService } from '@shared/services/cv.service';
import { CvEntryFormComponent } from './cv-entry-form.component';

const SHOW: CvEntry = {
  id: 'aaaa000000000001',
  kind: 'solo',
  year: 2024,
  title: { en: 'El valle inquietante' },
  venue: { en: 'Zunino gallery', es: 'Galería Zunino' },
  city: 'Sevilla',
  country: 'spain',
  venueUrl: 'https://galeriazunino.com/',
};

/**
 * The cv, written from the cv page.
 *
 * What is worth asserting here is what reaches the api: a field left blank is
 * left out, a Spanish that repeats its English is not stored twice, and the
 * refusal that names the paintings reaches him intact.
 */
describe('the cv entry form', () => {
  let fixture: ComponentFixture<CvEntryFormComponent>;
  let created: CvWrite[];
  let updated: Array<{ id: string; entry: CvWrite }>;
  let removed: string[];
  let refuse: unknown = null;

  function build(entry: CvEntry | null = null): void {
    created = [];
    updated = [];
    removed = [];

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [CvEntryFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTranslateService(),
        {
          provide: CvService,
          useValue: {
            entries: () => [SHOW],
            refresh: async () => undefined,
            create: async (written: CvWrite) => {
              if (refuse) throw refuse;
              created.push(written);
            },
            update: async (id: string, written: CvWrite) => {
              if (refuse) throw refuse;
              updated.push({ id, entry: written });
            },
            remove: async (id: string) => {
              if (refuse) throw refuse;
              removed.push(id);
            },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(CvEntryFormComponent);
    fixture.componentRef.setInput('kind', 'collective');
    fixture.componentRef.setInput('entry', entry);
    fixture.detectChanges();
  }

  const form = (): Record<string, unknown> =>
    (fixture.componentInstance as unknown as { draft: () => Record<string, unknown> }).draft();

  const type = (field: string, value: unknown): void => {
    (fixture.componentInstance as unknown as { set: (f: string, v: unknown) => void }).set(
      field,
      value
    );
    fixture.detectChanges();
  };

  const save = async (): Promise<void> => {
    await (fixture.componentInstance as unknown as { save: () => Promise<void> }).save();
    fixture.detectChanges();
  };

  const failure = (): string =>
    (fixture.componentInstance as unknown as { failed: () => string }).failed();

  beforeEach(() => {
    refuse = null;
  });

  describe('adding one', () => {
    it('opens on the kind of the section it was opened from', () => {
      build();

      expect(form()['kind']).toBe('collective');
    });

    it('will not save without a title', async () => {
      build();
      type('titleEn', '   ');

      await save();

      expect(created).toEqual([]);
    });

    /**
     * A conference has no venue, an online show has no city, and most of the
     * list has no link at all. An empty string sent for one of them is stored
     * as a venue, which renders as a stray comma on the page.
     */
    it('leaves out every field he left blank, rather than sending it empty', async () => {
      build();
      type('year', 2026);
      type('titleEn', 'Something new');

      await save();

      expect(created).toEqual([
        { kind: 'collective', year: 2026, title: { en: 'Something new' }, country: 'spain' },
      ]);
    });

    /**
     * Spanish absent means *the same sentence as the English*, which is the
     * common case here: most of the titles are Spanish proper nouns an English
     * page shows unchanged. Stored twice, the two drift apart.
     */
    it('does not store a Spanish that says the same as its English', async () => {
      build();
      type('titleEn', 'Interpaisajes');
      type('titleEs', 'Interpaisajes');
      type('venueEn', 'Zunino gallery');
      type('venueEs', 'Galería Zunino');

      await save();

      expect(created[0].title).toEqual({ en: 'Interpaisajes' });
      expect(created[0].venue).toEqual({ en: 'Zunino gallery', es: 'Galería Zunino' });
    });
  });

  describe('correcting one', () => {
    it('shows the entry it was opened on, in both languages', () => {
      build(SHOW);

      expect(form()['titleEn']).toBe('El valle inquietante');
      expect(form()['venueEs']).toBe('Galería Zunino');
      expect(form()['city']).toBe('Sevilla');
      expect(form()['kind']).toBe('solo');
    });

    /**
     * One form instance per section, so the pencil on a second line changes
     * the input rather than making a new form. A draft built once would have
     * left him correcting one show in another show's boxes.
     */
    it('follows the entry when the pencil moves to another line', () => {
      build(SHOW);

      fixture.componentRef.setInput('entry', { ...SHOW, id: 'b', title: { en: 'Transeúntes' } });
      fixture.detectChanges();

      expect(form()['titleEn']).toBe('Transeúntes');
    });

    it('sends it back under the same id, which does not move', async () => {
      build(SHOW);
      type('city', 'Sevilla, Spain');

      await save();

      expect(updated.length).toBe(1);
      expect(updated[0].id).toBe('aaaa000000000001');
      expect(updated[0].entry.city).toBe('Sevilla, Spain');
    });

    it('offers to take it off the cv, which adding one does not', () => {
      build(SHOW);
      const correcting = fixture.nativeElement.querySelector('.cv-delete');

      build();
      const adding = fixture.nativeElement.querySelector('.cv-delete');

      expect(correcting).not.toBeNull();
      expect(adding).toBeNull();
    });
  });

  describe('when the api refuses', () => {
    /**
     * The refusal names the paintings citing the entry, which is what says
     * which records to edit first. "It could not be deleted" would have sent
     * him looking through a hundred and eighty-six pages.
     */
    it('shows the sentence that names the paintings', async () => {
      build(SHOW);
      refuse = new HttpErrorResponse({
        status: 409,
        error: { success: false, message: '2 painting(s) still cite this: 40, 55' },
      });

      await (fixture.componentInstance as unknown as { remove: () => Promise<void> }).remove();
      fixture.detectChanges();

      expect(failure()).toBe('2 painting(s) still cite this: 40, 55');
      expect(removed).toEqual([]);
    });

    /** "Internal server error" on his own cv page is noise, not information. */
    it('says it in our own words when the api has not said anything useful', async () => {
      build();
      type('titleEn', 'Something new');
      refuse = new HttpErrorResponse({
        status: 500,
        error: { success: false, message: 'Internal server error' },
      });

      await save();

      expect(failure()).toBe('cv.saveFailed');
    });
  });
});
