import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { CvEntry } from '@domain/cv/cv-entry.entity';
import { RecordEntry } from '@domain/artwork/record.entity';
import { provideTranslateService } from '@ngx-translate/core';
import { ArtworkRecordService } from '@shared/services/artwork-record.service';
import { CvService } from '@shared/services/cv.service';
import { RecordLineDialogComponent } from './record-line-dialog.component';

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
 * A foundation, as the cv writes one: its own name is the entry's title and
 * there is no venue, which is how every residency and prize on this cv reads.
 */
const GALA: CvEntry = {
  id: 'aaaa000000000003',
  kind: 'award',
  year: 2019,
  title: { en: 'Fundación Antonio Gala' },
  country: 'spain',
};

/**
 * Writing a line of a painting's record.
 *
 * The form itself, which was six fields opening inline under the record on
 * the artwork page until it became a window. What is asserted here is what
 * the form asks and what it sends: the shape of the line is the api's
 * business, and the words of a drawn line are `record.spec.ts`'s.
 */
describe('writing a line of the record', () => {
  let fixture: ComponentFixture<RecordLineDialogComponent>;
  let entries: RecordEntry[];
  let saved: Array<{ tokenId: string; entries: unknown[] }>;
  let closed: number;

  function build(): void {
    saved = [];
    closed = 0;
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [RecordLineDialogComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTranslateService(),
        provideRouter([]),
        { provide: MAT_DIALOG_DATA, useValue: { tokenId: '165', artworkYear: 2019 } },
        { provide: MatDialogRef, useValue: { close: () => (closed += 1) } },
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
        {
          provide: CvService,
          useValue: { entries: () => [SHOW, GALA], refresh: async () => undefined },
        },
      ],
    });

    fixture = TestBed.createComponent(RecordLineDialogComponent);
    fixture.detectChanges();
  }

  const text = (): string => fixture.nativeElement.textContent ?? '';

  beforeEach(() => {
    entries = [];
  });

  /**
   * The phrase is a choice and not something to type. Typed, it would arrive
   * in one language and print English on the Spanish page — and it was two
   * boxes, one per language, both filled in before anything had happened.
   */
  it('opens on the collector nobody names, with nothing to type', () => {
    build();

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
    entries = [{ kind: 'exhibited', year: 2024, cv: SHOW }];
    build();

    const component = fixture.componentInstance as unknown as {
      set: (field: string, value: unknown) => void;
      add: () => Promise<void>;
    };
    // The form opens on a show now, which is what most lines are.
    component.set('kind', 'sold');
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

  /**
   * The show, because almost every line is one: forty-eight of the sixty-five
   * written so far. It opened on a sale, which is the kind with the most to
   * fill in and a quarter of the lines.
   */
  it('opens on a show, with nothing to fill in but which one', () => {
    build();

    const component = fixture.componentInstance as unknown as {
      draft: () => { kind: string };
      fromTheCv: () => boolean;
    };
    expect(component.draft().kind).toBe('exhibited');
    expect(component.fromTheCv()).toBe(true);
    // What happened, and which show. No year, no note, nobody to name.
    expect(fixture.nativeElement.querySelectorAll('mat-form-field')).toHaveLength(2);
  });

  /**
   * Each kind asks for what it needs and nothing else. A show and a prize are
   * on the cv already and borrow its year and its name; a sale and a
   * collection are about somebody, so they ask who, when, and leave room for
   * a note. The form used to ask every question of every kind.
   */
  it('asks only what the kind needs', () => {
    build();

    const component = fixture.componentInstance as unknown as {
      set: (field: string, value: unknown) => void;
    };
    const fields = () =>
      [...fixture.nativeElement.querySelectorAll('mat-form-field')].map((field: HTMLElement) =>
        (field.querySelector('mat-label')?.textContent ?? '').trim()
      );

    for (const kind of ['exhibited', 'awarded']) {
      component.set('kind', kind);
      fixture.detectChanges();
      expect(fields()).toEqual(['record.kind', 'record.onTheCv']);
    }

    for (const kind of ['sold', 'collection']) {
      component.set('kind', kind);
      fixture.detectChanges();
      expect(fields()).toEqual(['record.kind', 'record.who', 'record.year', 'record.note']);
    }
  });

  /**
   * The draft keeps what was typed when the kind changes, and the kind decides
   * what is sent — so a note typed against a sale cannot ride along on a
   * prize, which is what taking the box off the form is for.
   */
  it('sends nothing the kind did not ask for', async () => {
    build();

    const component = fixture.componentInstance as unknown as {
      set: (field: string, value: unknown) => void;
      add: () => Promise<void>;
    };
    component.set('kind', 'sold');
    component.set('noteEn', 'bought at the fair');
    component.set('kind', 'awarded');
    component.set('cv', SHOW.id);
    await component.add();

    expect(saved[0].entries).toEqual([{ kind: 'awarded', cv: SHOW.id }]);
  });

  /**
   * Naming anybody is optional: that a painting sold, and when, is a fact on
   * its own, and the line then reads "Sold" with nothing after it.
   */
  it('saves a sale with nobody named', async () => {
    build();

    const component = fixture.componentInstance as unknown as {
      set: (field: string, value: unknown) => void;
      add: () => Promise<void>;
    };
    component.set('kind', 'sold');
    component.set('buyer', 'named');
    await component.add();

    expect(saved[0].entries).toEqual([{ kind: 'sold', year: new Date().getFullYear() }]);
  });

  /**
   * Chosen from the cv rather than typed, so it arrives in both languages
   * and with one spelling. Typed it was English alone, and "Galería Zunino"
   * and "Galeria Zunino" were two institutions on a page meant to be a
   * record.
   */
  it('names an institution from the cv, in both languages at once', async () => {
    build();

    const component = fixture.componentInstance as unknown as {
      set: (field: string, value: unknown) => void;
      add: () => Promise<void>;
    };
    component.set('kind', 'sold');
    component.set('buyer', 'named');
    component.set('whoCv', SHOW.id);
    await component.add();

    expect(saved[0].entries).toEqual([
      {
        kind: 'sold',
        who: { en: 'Zunino gallery', es: 'Galería Zunino' },
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
    build();

    const component = fixture.componentInstance as unknown as {
      set: (field: string, value: unknown) => void;
      naming: () => boolean;
    };

    component.set('kind', 'sold');
    fixture.detectChanges();
    const whenSelling = fixture.nativeElement.querySelectorAll('mat-form-field').length;

    for (const kind of ['sold', 'collection']) {
      component.set('kind', kind);
      expect(component.naming()).toBe(true);
    }

    for (const kind of ['exhibited', 'awarded']) {
      component.set('kind', kind);
      fixture.detectChanges();
      expect(component.naming()).toBe(false);
      expect(fixture.nativeElement.querySelectorAll('mat-form-field').length).toBeLessThan(
        whenSelling
      );
    }
  });

  /**
   * The same picker on the kind that reads "In the collection of" — and a
   * foundation, whose name the cv keeps as the entry's title because there
   * is no venue for it to have happened at.
   */
  it('names a foundation by its own title, where the cv has no venue', async () => {
    build();

    const component = fixture.componentInstance as unknown as {
      set: (field: string, value: unknown) => void;
      add: () => Promise<void>;
    };
    component.set('kind', 'collection');
    component.set('buyer', 'named');
    component.set('whoCv', GALA.id);
    await component.add();

    expect(saved[0].entries).toEqual([
      {
        kind: 'collection',
        who: { en: 'Fundación Antonio Gala' },
        year: new Date().getFullYear(),
      },
    ]);
  });

  /** Chosen on a sale and then changed to a show, it is not written down. */
  it('does not carry a name onto a line that cannot have one', async () => {
    build();

    const component = fixture.componentInstance as unknown as {
      set: (field: string, value: unknown) => void;
      add: () => Promise<void>;
    };
    component.set('buyer', 'named');
    component.set('whoCv', GALA.id);
    component.set('kind', 'exhibited');
    component.set('cv', SHOW.id);
    await component.add();

    expect(saved[0].entries).toEqual([{ kind: 'exhibited', cv: SHOW.id }]);
  });

  /** It was asked for and taken out: more precision than anybody has. */
  it('asks for no month', () => {
    build();

    expect(text().toLowerCase()).not.toContain('month');
    expect(text().toLowerCase()).not.toContain('mes');
  });

  /** There is no field for a figure, and this is the test that says so. */
  it('has nowhere on the form to type what it sold for', () => {
    build();

    expect(text().toLowerCase()).not.toContain('price');
    expect(text().toLowerCase()).not.toContain('precio');
    expect(fixture.nativeElement.querySelector('input[type="number"][name="price"]')).toBeNull();
  });

  /**
   * What paid for the painting: a grant or a residency, which is true of the
   * painting before it was finished.
   */
  describe('the support that paid for it', () => {
    it('does not ask for a year, because the painting is what dates it', () => {
      build();
      const component = fixture.componentInstance as unknown as {
        set: (field: string, value: unknown) => void;
      };

      component.set('kind', 'supported');
      fixture.detectChanges();

      expect(text()).toContain('2019');
      expect(fixture.nativeElement.querySelector('.record-year-field')).toBeNull();
    });

    // Nobody gives a grant anonymously, so there is no "a private collector"
    // to choose: the name is the whole of the line.
    it('asks for the name and nothing else', () => {
      build();
      const component = fixture.componentInstance as unknown as {
        set: (field: string, value: unknown) => void;
      };

      component.set('kind', 'supported');
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.record-cv')).not.toBeNull();
      expect(text()).not.toContain('record.privateCollector');
    });

    it('sends the year of the painting with it', async () => {
      build();
      const component = fixture.componentInstance as unknown as {
        set: (field: string, value: unknown) => void;
        add: () => Promise<void>;
      };

      component.set('kind', 'supported');
      component.set('whoCv', GALA.id);
      await component.add();

      expect(saved[0].entries).toEqual([
        { kind: 'supported', who: { en: 'Fundación Antonio Gala' }, year: 2019 },
      ]);
    });

    // A line reading only "created with support" says nothing worth storing.
    it('will not save without the name of whoever gave it', () => {
      build();
      const component = fixture.componentInstance as unknown as {
        set: (field: string, value: unknown) => void;
        ready: () => boolean;
      };

      component.set('kind', 'supported');

      expect(component.ready()).toBe(false);
    });
  });
});
