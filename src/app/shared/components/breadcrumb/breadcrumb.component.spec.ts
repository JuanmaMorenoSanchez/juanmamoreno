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
async function setup() {
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

  await TestBed.inject(Router).navigateByUrl('/artworks');
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
