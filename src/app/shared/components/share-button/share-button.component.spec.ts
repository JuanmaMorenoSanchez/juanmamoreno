import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTranslateService } from '@ngx-translate/core';
import { vi } from 'vitest';
import { ShareButtonComponent } from './share-button.component';

/**
 * It used to hand the operating system the same three lines wherever it was
 * pressed — the artist's name, the words "Contemporary Art", and whatever
 * address was showing — so passing on a particular painting produced a message
 * that did not name it.
 */
describe('ShareButtonComponent', () => {
  let fixture: ComponentFixture<ShareButtonComponent>;

  function setup(options: { canShare?: boolean } = {}) {
    const share = vi.fn().mockResolvedValue(undefined);
    const writeText = vi.fn().mockResolvedValue(undefined);

    if (options.canShare === false) {
      // Firefox has never had it. The button must still do something.
      Object.defineProperty(navigator, 'share', { value: undefined, configurable: true });
    } else {
      Object.defineProperty(navigator, 'share', { value: share, configurable: true });
    }
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });

    TestBed.configureTestingModule({
      imports: [ShareButtonComponent],
      providers: [provideTranslateService(), provideAnimations()],
    });
    fixture = TestBed.createComponent(ShareButtonComponent);
    fixture.componentRef.setInput('artworkName', 'Rockets win I');
    fixture.componentRef.setInput('details', '2024, Oil on canvas, 100 x 80 cm');
    fixture.detectChanges();
    return { share, writeText };
  }

  const press = async () => {
    (fixture.nativeElement as HTMLElement).querySelector('button')!.click();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('names the painting it is passing on', async () => {
    const { share } = setup();

    await press();

    expect(share).toHaveBeenCalledTimes(1);
    const shared = share.mock.calls[0][0];
    expect(shared.title).toBe('Rockets win I');
    expect(shared.text).toContain('Rockets win I');
    // The technical sheet, which is what somebody receiving the link needs.
    expect(shared.text).toContain('Oil on canvas');
    expect(shared.url).toBe(window.location.href);
  });

  /**
   * The old button hid itself where `navigator.share` was missing — a control
   * that existed for some readers and not others. Copying the address is the
   * same errand by other means.
   */
  it('is still there, and still useful, without the browser share sheet', async () => {
    const { writeText } = setup({ canShare: false });

    expect((fixture.nativeElement as HTMLElement).querySelector('button')).not.toBeNull();

    await press();

    expect(writeText).toHaveBeenCalledWith(window.location.href);
  });

  it('says it has copied, then goes back to offering', async () => {
    vi.useFakeTimers();
    setup({ canShare: false });

    (fixture.nativeElement as HTMLElement).querySelector('button')!.click();
    await Promise.resolve();
    await Promise.resolve();
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('check');

    vi.advanceTimersByTime(2000);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('share');
    vi.useRealTimers();
  });

  // Dismissing the share sheet is a decision, and answering it by copying to
  // the clipboard would be doing something the reader has just declined.
  it('does nothing more when the reader dismisses the share sheet', async () => {
    const { writeText } = setup();
    vi.mocked(navigator.share as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('AbortError')
    );

    await press();

    expect(writeText).not.toHaveBeenCalled();
  });

  it('falls back to the artist when there is no artwork yet', async () => {
    const { share } = setup();
    fixture.componentRef.setInput('artworkName', '');
    fixture.componentRef.setInput('details', '');
    fixture.detectChanges();

    await press();

    expect(share.mock.calls[0][0].title).toBe('Juanma Moreno Sánchez');
  });
});
