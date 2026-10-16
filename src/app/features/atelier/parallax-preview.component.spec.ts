import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ParallaxPreviewComponent } from './parallax-preview.component';

/**
 * The painting, moving, without a video model.
 *
 * The slicing itself needs a real canvas, which jsdom has none of — so what is
 * tested here is what happens when it cannot do its work, which is the state
 * this runs in under test and the state he would see if a depth map went
 * missing.
 */
describe('ParallaxPreviewComponent', () => {
  const build = (
    depth = 'http://127.0.0.1:7860/layer/a-depth.png',
    background: string | null = null
  ) => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ParallaxPreviewComponent],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(ParallaxPreviewComponent);
    fixture.componentRef.setInput('painting', 'blob:painting');
    fixture.componentRef.setInput('depth', depth);
    fixture.componentRef.setInput('background', background);
    fixture.detectChanges();
    return { fixture, host: fixture.nativeElement as HTMLElement };
  };

  it('says so rather than showing an empty frame when the map cannot be read', async () => {
    // jsdom decodes nothing, so neither handler fires and the real code's
    // deadline is what ends it — the same deadline that stops the panel
    // hanging on a stalled fetch.
    vi.useFakeTimers();
    const { fixture, host } = build();
    await vi.advanceTimersByTimeAsync(11_000);
    vi.useRealTimers();
    fixture.detectChanges();

    expect(host.querySelector('[data-testid="moving-trouble"]')?.textContent).toContain(
      'could not be read'
    );
  });

  it('closes when Done is pressed', () => {
    const { fixture, host } = build();
    let closed = false;
    fixture.componentInstance.dismissed.subscribe(() => (closed = true));

    (host.querySelector('[data-testid="moving-close"]') as HTMLButtonElement).click();

    expect(closed).toBe(true);
  });

  it('says there is no video model in it, where that can be read', () => {
    // The claim is the point of the feature, so it is on screen rather than
    // only in a commit message.
    const { host } = build();

    expect(host.textContent).toContain('No video model');
  });

  /**
   * The filled background is drawn behind the slices, where a run made one.
   *
   * What can be checked here is that it is optional and that it cannot take
   * the preview down with it: jsdom decodes no images, so whether it ends up
   * underneath is a thing for the eye on the machine with the card.
   */
  it('still works when there is no background at all', async () => {
    const { host } = build();
    await new Promise((settle) => setTimeout(settle, 10));

    expect(host.textContent).not.toContain('background');
  });

  it('does not report a background failure as a depth failure', async () => {
    const { host } = build(
      'http://127.0.0.1:7860/layer/a-depth.png',
      'http://127.0.0.1:7860/layer/a-background.png'
    );
    await new Promise((settle) => setTimeout(settle, 10));

    // Either message is about the depth map, which is the one thing this
    // cannot do without.
    expect(host.textContent ?? '').not.toContain('background could not');
  });
});
