import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { AvailabilityService } from '@shared/services/availability.service';
import { SoldToggleComponent } from './sold-toggle.component';

describe('SoldToggleComponent', () => {
  let fixture: ComponentFixture<SoldToggleComponent>;
  let availability: { isSold: ReturnType<typeof vi.fn>; set: ReturnType<typeof vi.fn> };

  const setup = async (signedIn: boolean, sold = false) => {
    availability = { isSold: vi.fn().mockReturnValue(sold), set: vi.fn().mockResolvedValue(void 0) };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [SoldToggleComponent],
      providers: [
        provideTranslateService(),
        { provide: AvailabilityService, useValue: availability },
        { provide: AdminAuthService, useValue: { isAdmin: () => signedIn } },
      ],
    });

    TestBed.inject(TranslateService).setTranslation('en', {
      sold: 'Sold',
      availability: { available: 'Available', explain: 'Only you see this', failed: 'Not saved' },
    });
    TestBed.inject(TranslateService).use('en');

    fixture = TestBed.createComponent(SoldToggleComponent);
    fixture.componentRef.setInput('tokenId', '195');
    await fixture.whenStable();
    return fixture;
  };

  const toggle = () => fixture.nativeElement.querySelector('mat-slide-toggle');

  /**
   * The api refuses everybody else, which is what makes this safe. Not drawing
   * it for everybody else is what keeps a catalogue page a catalogue page.
   */
  it('is not there at all for a reader', async () => {
    await setup(false);

    expect(toggle()).toBeNull();
  });

  it('is there for the artist, and says which way it is set', async () => {
    await setup(true, true);

    expect(toggle()).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Sold');
  });

  it('reads Available when the painting is', async () => {
    await setup(true, false);

    expect(fixture.nativeElement.textContent).toContain('Available');
  });

  /**
   * It states the answer rather than asking for a flip, so a second impatient
   * press cannot land after the first and undo it.
   */
  it('tells the api which of the two it means', async () => {
    await setup(true, false);

    toggle().querySelector('button').click();
    await fixture.whenStable();

    expect(availability.set).toHaveBeenCalledWith('195', true);
  });

  /** A sale not recorded has to say so; the switch alone would look saved. */
  it('says when it could not be saved', async () => {
    await setup(true, false);
    availability.set.mockRejectedValue(new Error('no'));

    toggle().querySelector('button').click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Not saved');
  });
});
