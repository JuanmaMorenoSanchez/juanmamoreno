import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CvEntry } from '@domain/cv/cv-entry.entity';
import { RecordEntry } from '@domain/artwork/record.entity';
import { provideTranslateService } from '@ngx-translate/core';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { ArtworkRecordService } from '@shared/services/artwork-record.service';
import { CvService } from '@shared/services/cv.service';
import { ArtworkRecordComponent } from './artwork-record.component';

const SHOW: CvEntry = {
  id: 'aaaa000000000001',
  kind: 'solo',
  year: 2024,
  title: { en: 'El valle inquietante' },
  venue: { en: 'Zunino gallery', es: 'Galería Zunino' },
  city: 'Sevilla',
  country: 'spain',
};

/**
 * What has happened to the painting, on the page.
 *
 * The two things worth asserting here are who sees it and who can change it.
 * The words themselves are `record.spec.ts`'s business, and the api's refusals
 * are the api's.
 */
describe('the record on an artwork page', () => {
  let fixture: ComponentFixture<ArtworkRecordComponent>;
  let admin: boolean;
  let entries: RecordEntry[];
  let saved: Array<{ tokenId: string; entries: unknown[] }>;

  function build(): void {
    saved = [];
    TestBed.configureTestingModule({
      imports: [ArtworkRecordComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTranslateService(),
        provideRouter([]),
        { provide: AdminAuthService, useValue: { isAdmin: () => admin, bearerToken: () => 't' } },
        {
          provide: ArtworkRecordService,
          useValue: {
            of: () => entries,
            refresh: async () => undefined,
            set: async (tokenId: string, next: unknown[]) => {
              saved.push({ tokenId, entries: next });
              return [];
            },
          },
        },
        { provide: CvService, useValue: { entries: () => [SHOW], refresh: async () => undefined } },
      ],
    });

    fixture = TestBed.createComponent(ArtworkRecordComponent);
    fixture.componentRef.setInput('tokenId', '165');
    fixture.detectChanges();
  }

  const text = (): string => fixture.nativeElement.textContent ?? '';
  const section = (): HTMLElement | null => fixture.nativeElement.querySelector('.artwork-record');

  beforeEach(() => {
    admin = false;
    entries = [];
  });

  /**
   * Most of the catalogue has no record, and a heading over an empty list is
   * worse than no heading at all.
   */
  it('is not on the page at all when there is nothing to say', () => {
    build();

    expect(section()).toBeNull();
  });

  it('shows the lines to a reader when there are some', () => {
    entries = [{ kind: 'exhibited', year: 2024, cv: SHOW }];
    build();

    expect(section()).not.toBeNull();
    expect(text()).toContain('El valle inquietante');
    expect(text()).toContain('2024');
  });

  /** The way in for a reader is the cv page, at the show's own place on it. */
  it('links an exhibition to where the cv says it is', () => {
    entries = [{ kind: 'exhibited', year: 2024, cv: SHOW }];
    build();

    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('.record-said a');

    expect(link.getAttribute('href')).toBe('/cv#2024-el-valle-inquietante');
  });

  it('offers a reader nothing to press', () => {
    entries = [{ kind: 'sold', year: 2025, who: { en: 'a private collector' } }];
    build();

    expect(fixture.nativeElement.querySelector('.record-add')).toBeNull();
    expect(fixture.nativeElement.querySelector('.record-remove')).toBeNull();
  });

  /** An empty record is the one he needs in order to add the first line to it. */
  it('is on the page for the artist even when it is empty', () => {
    admin = true;
    build();

    expect(section()).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.record-add')).not.toBeNull();
  });

  /**
   * The phrase is a choice and not something to type. Typed, it would arrive
   * in one language and print English on the Spanish page — and it was two
   * boxes, one per language, both filled in before anything had happened.
   */
  it('opens on the collector nobody names, with nothing to type', () => {
    admin = true;
    build();

    fixture.nativeElement.querySelector('.record-add').click();
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      draft: () => { buyer: string };
    };
    expect(component.draft().buyer).toBe('private');

    const inputs: HTMLInputElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.record-form input')
    );
    expect(inputs.some((input) => input.value.includes('collector'))).toBe(false);
    expect(inputs.some((input) => input.value.includes('coleccionista'))).toBe(false);
  });

  /**
   * The line as sent keeps the show by id and sends no year with it: the year
   * belongs to the show, and a second one could disagree with it.
   */
  it('sends a new line on top of the ones already there', async () => {
    admin = true;
    entries = [{ kind: 'exhibited', year: 2024, cv: SHOW }];
    build();

    fixture.nativeElement.querySelector('.record-add').click();
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      add: () => Promise<void>;
    };
    await component.add();

    expect(saved).toHaveLength(1);
    expect(saved[0].tokenId).toBe('165');
    expect(saved[0].entries).toEqual([
      { kind: 'exhibited', cv: SHOW.id },
      {
        kind: 'sold',
        who: { en: 'a private collector', es: 'un coleccionista privado' },
        year: new Date().getFullYear(),
      },
    ]);
  });

  it('takes a line back by sending what is left', async () => {
    admin = true;
    entries = [
      { kind: 'exhibited', year: 2024, cv: SHOW },
      { kind: 'sold', year: 2025, who: { en: 'a private collector' } },
    ];
    build();

    const component = fixture.componentInstance as unknown as {
      remove: (at: number) => Promise<void>;
    };
    await component.remove(0);

    expect(saved[0].entries).toEqual([
      { kind: 'sold', who: { en: 'a private collector' }, year: 2025 },
    ]);
  });

  /**
   * Naming anybody is optional: that a painting sold, and when, is a fact on
   * its own, and the line then reads "Sold" with nothing after it.
   */
  it('saves a sale with nobody named', async () => {
    admin = true;
    build();

    fixture.nativeElement.querySelector('.record-add').click();
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      set: (field: string, value: unknown) => void;
      add: () => Promise<void>;
    };
    component.set('buyer', 'named');
    await component.add();

    expect(saved[0].entries).toEqual([{ kind: 'sold', year: new Date().getFullYear() }]);
  });

  /**
   * An institution is a proper noun: one box, stored as English alone, which
   * is what the api keeps when there is no different Spanish — so the name
   * reads the same on both pages. It was two boxes, one per language, and the
   * Spanish one wanted a translation of a name.
   */
  it('names an institution from one box, in both languages at once', async () => {
    admin = true;
    build();

    fixture.nativeElement.querySelector('.record-add').click();
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      set: (field: string, value: unknown) => void;
      add: () => Promise<void>;
    };
    component.set('buyer', 'named');
    component.set('whoName', '  Museo Nacional Centro de Arte Reina Sofía  ');
    await component.add();

    expect(saved[0].entries).toEqual([
      {
        kind: 'sold',
        who: { en: 'Museo Nacional Centro de Arte Reina Sofía' },
        year: new Date().getFullYear(),
      },
    ]);
  });

  /**
   * The three kinds whose verb governs a name, and only those. A show and a
   * prize take their name from the cv entry the line cites, so a second one
   * here would be a name that could disagree with it — and the boxes were on
   * the form whatever had happened, asking who for a show that already said
   * where. "Acquired by" and "in the collection of" end in a preposition just
   * as "sold to" does, and asked on the sale alone they could only ever have
   * read short.
   */
  it('asks who for every kind whose verb governs a name, and no other', () => {
    admin = true;
    build();

    fixture.nativeElement.querySelector('.record-add').click();
    fixture.detectChanges();
    const whenSelling = fixture.nativeElement.querySelectorAll('mat-form-field').length;

    const component = fixture.componentInstance as unknown as {
      set: (field: string, value: unknown) => void;
      naming: () => boolean;
    };

    for (const kind of ['sold', 'acquired', 'collection']) {
      component.set('kind', kind);
      expect(component.naming()).toBe(true);
    }

    for (const kind of ['exhibited', 'awarded']) {
      component.set('kind', kind);
      fixture.detectChanges();
      expect(component.naming()).toBe(false);
      expect(fixture.nativeElement.querySelectorAll('mat-form-field').length).toBeLessThan(
        whenSelling,
      );
    }
  });

  /** The same one box, on the kind that reads "In the collection of". */
  it('names an institution on an acquisition too', async () => {
    admin = true;
    build();

    fixture.nativeElement.querySelector('.record-add').click();
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      set: (field: string, value: unknown) => void;
      add: () => Promise<void>;
    };
    component.set('kind', 'collection');
    component.set('buyer', 'named');
    component.set('whoName', 'Fundación Juan March');
    await component.add();

    expect(saved[0].entries).toEqual([
      {
        kind: 'collection',
        who: { en: 'Fundación Juan March' },
        year: new Date().getFullYear(),
      },
    ]);
  });

  /** Chosen on a sale and then changed to a show, it is not written down. */
  it('does not carry a name onto a line that cannot have one', async () => {
    admin = true;
    build();

    fixture.nativeElement.querySelector('.record-add').click();
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      set: (field: string, value: unknown) => void;
      add: () => Promise<void>;
    };
    component.set('buyer', 'named');
    component.set('whoName', 'The Hepworth Wakefield');
    component.set('kind', 'exhibited');
    component.set('cv', SHOW.id);
    await component.add();

    expect(saved[0].entries).toEqual([{ kind: 'exhibited', cv: SHOW.id }]);
  });

  /** It was asked for and taken out: more precision than anybody has. */
  it('asks for no month', () => {
    admin = true;
    build();

    fixture.nativeElement.querySelector('.record-add').click();
    fixture.detectChanges();

    expect(text().toLowerCase()).not.toContain('month');
    expect(text().toLowerCase()).not.toContain('mes');
  });

  /** There is no field for a figure, and this is the test that says so. */
  it('has nowhere on the form to type what it sold for', () => {
    admin = true;
    build();

    fixture.nativeElement.querySelector('.record-add').click();
    fixture.detectChanges();

    expect(text().toLowerCase()).not.toContain('price');
    expect(text().toLowerCase()).not.toContain('precio');
    expect(fixture.nativeElement.querySelector('input[type="number"][name="price"]')).toBeNull();
  });
});
