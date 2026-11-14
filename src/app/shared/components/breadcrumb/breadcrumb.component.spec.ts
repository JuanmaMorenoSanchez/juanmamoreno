import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { provideTranslateService } from '@ngx-translate/core';
import { AvailabilityFilterService } from '@shared/services/availability-filter.service';
import { SessionQuery } from '@shared/store/session.query';
import { BreadcrumbComponent } from './breadcrumb.component';

/**
 * The picker beside the year: sold, available, or both.
 *
 * It sits in the breadcrumb because that is where the year already is and the
 * two read as one row of controls — but the grid it narrows is a component
 * nowhere near it, which is why the choice lives in a service rather than in
 * either of them.
 */
async function setup(at = '/artworks') {
  TestBed.configureTestingModule({
    imports: [BreadcrumbComponent],
    providers: [
      provideTranslateService(),
      provideAnimations(),
      // The whole trail, controls included, renders only when there is at
      // least one crumb to show — so the test has to stand on a real page.
      provideRouter([{ path: 'artworks', data: { breadcrumb: 'paintings' }, children: [] }]),
      {
        provide: ARTWORK_PORT,
        useValue: {
          getAvailableYears: () => new Set([2024, 2023]),
          getNftById: () => null,
        },
      },
      { provide: SessionQuery, useValue: { selectArtPieces: [] } },
    ],
  });

  await TestBed.inject(Router).navigateByUrl(at);
  const fixture = TestBed.createComponent(BreadcrumbComponent);
  fixture.detectChanges();
  return { fixture, filter: TestBed.inject(AvailabilityFilterService) };
}

/**
 * What each chip in the row says. The label element rather than the chip, so
 * the "cancel" of the remove button does not come with it.
 */
const chipText = (fixture: { nativeElement: HTMLElement }) =>
  Array.from(fixture.nativeElement.querySelectorAll('mat-chip .link-as-text'), (label) =>
    (label.textContent ?? '').replace(/\s+/g, ' ').trim()
  );

/**
 * The two pickers read as one pair of controls, or they read as a mistake.
 * Both carry their name above the box; the value underneath sits on the same
 * line as the words in the chips beside them.
 */
describe('BreadcrumbComponent — the year and availability pickers together', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => TestBed.resetTestingModule());

  const fields = (fixture: { nativeElement: HTMLElement }) =>
    Array.from(fixture.nativeElement.querySelectorAll('mat-form-field'));

  it('names both of them above the box', async () => {
    const { fixture } = await setup();

    const labels = fields(fixture).map((field) =>
      (field.querySelector('mat-label')?.textContent ?? '').trim()
    );
    expect(labels).toEqual(['year.label', 'availability.label']);
  });

  /**
   * The year picker empties itself after every pick — the year it took has
   * become a chip — so without this its label would drop into the middle of
   * the box as a placeholder and the two controls would look like different
   * kinds of thing.
   */
  it('keeps the year label up even though the picker is always empty', async () => {
    const { fixture } = await setup();

    expect(fields(fixture)[0].getAttribute('floatlabel')).toBe('always');
  });

  it('says "all" under the year until a year has been chosen', async () => {
    const { fixture } = await setup();

    expect(
      fixture.nativeElement.querySelector('mat-select[aria-label="Select year"]')?.textContent
    ).toContain('year.all');
  });

  // From then on the chips say which years, so repeating "all" would be false.
  it('says nothing under the year once one has been chosen', async () => {
    const { fixture } = await setup('/artworks?years=2024');

    expect(
      fixture.nativeElement.querySelector('mat-select[aria-label="Select year"]')?.textContent
    ).not.toContain('year.all');
  });
});

describe('BreadcrumbComponent — narrowing by availability', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => TestBed.resetTestingModule());

  it('offers all three answers, and only one can be held at a time', async () => {
    const { fixture } = await setup();

    expect(fixture.componentInstance.availabilityChoices).toEqual(['both', 'sold', 'available']);
    expect(fixture.componentInstance.availability()).toBe('both');
  });

  // "Both" is the absence of a filter; a chip saying so would mean nothing.
  it('shows no chip while the catalogue is showing everything', async () => {
    const { fixture } = await setup();

    expect(chipText(fixture).some((text) => text.includes('availability.'))).toBe(false);
  });

  it('adds a chip to the row when one is picked', async () => {
    const { fixture } = await setup();

    fixture.componentInstance.setAvailability('sold');
    fixture.detectChanges();

    // No dictionary is loaded here, so the chip renders its translation key.
    expect(chipText(fixture)).toContain('availability.sold');
  });

  it('replaces the chip rather than collecting them, unlike the years', async () => {
    const { fixture } = await setup();

    fixture.componentInstance.setAvailability('sold');
    fixture.detectChanges();
    fixture.componentInstance.setAvailability('available');
    fixture.detectChanges();

    const chips = chipText(fixture).filter((text) => text.startsWith('availability.'));
    expect(chips).toEqual(['availability.available']);
  });

  it('takes the chip off again, and shows everything', async () => {
    const { fixture } = await setup();
    fixture.componentInstance.setAvailability('sold');
    fixture.detectChanges();

    fixture.componentInstance.clearAvailability();
    fixture.detectChanges();

    expect(fixture.componentInstance.availability()).toBe('both');
    expect(chipText(fixture).some((text) => text.startsWith('availability.'))).toBe(false);
  });

  it('writes the choice down so the next visit starts where this one left off', async () => {
    const { fixture } = await setup();

    fixture.componentInstance.setAvailability('available');

    expect(localStorage.getItem('juanmamoreno.catalogue.availability')).toBe('available');
  });

  it('shows the chip on arrival for a reader who left one on', async () => {
    localStorage.setItem('juanmamoreno.catalogue.availability', 'sold');

    const { fixture } = await setup();

    expect(chipText(fixture)).toContain('availability.sold');
  });

  // The year is a place — it says which paintings a link is about — and stays
  // in the address. This is a way of looking, and does not.
  it('leaves the address alone', async () => {
    const { fixture } = await setup();

    fixture.componentInstance.setAvailability('sold');
    fixture.detectChanges();

    expect(window.location.search).not.toContain('availability');
  });
});
