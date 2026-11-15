import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { CvEntry } from '@domain/cv/cv-entry.entity';
import { RecordEntry } from '@domain/artwork/record.entity';
import { provideTranslateService } from '@ngx-translate/core';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { ArtworkRecordService } from '@shared/services/artwork-record.service';
import { CvService } from '@shared/services/cv.service';
import { ArtworkRecordComponent } from './artwork-record.component';
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
  let opened: Array<{ component: unknown; data: unknown }>;

  function build(): void {
    saved = [];
    opened = [];
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
        // The form is a window of its own now, with its own spec. What this
        // page does is draw the lines and open it.
        {
          provide: MatDialog,
          useValue: {
            open: (component: unknown, config: { data: unknown }) => {
              opened.push({ component, data: config.data });
              return { close: () => undefined };
            },
          },
        },
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
   * The form is a window over the page now, not six fields opening inline
   * under the record — which pushed the painting, its essay and the strip of
   * nearby paintings down the screen every time a line was added.
   */
  it('opens the form in a window, on this painting', () => {
    admin = true;
    build();

    (fixture.nativeElement.querySelector('.record-add') as HTMLButtonElement).click();

    expect(opened).toHaveLength(1);
    expect(opened[0].component).toBe(RecordLineDialogComponent);
    expect(opened[0].data).toEqual({ tokenId: '165', artworkYear: null });
    expect(fixture.nativeElement.querySelector('.record-form')).toBeNull();
  });
});
