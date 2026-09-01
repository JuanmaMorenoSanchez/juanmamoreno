import { TestBed } from '@angular/core/testing';
import { AvailabilityFilterService } from './availability-filter.service';

describe('AvailabilityFilterService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('shows everything until the reader narrows it', () => {
    expect(TestBed.inject(AvailabilityFilterService).availability()).toBe('both');
  });

  it('remembers the choice on the device', () => {
    const service = TestBed.inject(AvailabilityFilterService);

    service.set('sold');

    expect(service.availability()).toBe('sold');
    expect(localStorage.getItem('juanmamoreno.catalogue.availability')).toBe('sold');
  });

  it('comes back to the catalogue narrowed the way it was left', () => {
    localStorage.setItem('juanmamoreno.catalogue.availability', 'available');

    expect(TestBed.inject(AvailabilityFilterService).availability()).toBe('available');
  });

  // A value edited by hand, or left behind by an older version of the site,
  // must read as no preference rather than as a state with no control for it.
  it('ignores a stored value it has no case for', () => {
    localStorage.setItem('juanmamoreno.catalogue.availability', 'reserved');

    expect(TestBed.inject(AvailabilityFilterService).availability()).toBe('both');
  });

  it('goes back to everything when the chip is taken off', () => {
    const service = TestBed.inject(AvailabilityFilterService);
    service.set('sold');

    service.clear();

    expect(service.availability()).toBe('both');
    expect(localStorage.getItem('juanmamoreno.catalogue.availability')).toBe('both');
  });
});
