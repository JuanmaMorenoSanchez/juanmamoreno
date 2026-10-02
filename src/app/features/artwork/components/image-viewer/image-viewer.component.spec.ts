import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import type { Nft } from '@domain/artwork/artwork.entity';
import { ImageViewerComponent } from './image-viewer.component';

/**
 * The frame reserves the artwork's footprint before any pixels arrive, so the
 * page below never shifts. What shape to reserve is the question: the only
 * answer available that early is the painting's measured width and height.
 */
describe('ImageViewerComponent — the shape of the frame', () => {
  let fixture: ComponentFixture<ImageViewerComponent>;
  let component: ImageViewerComponent & { ratioOf(url: string): Promise<number | null> };
  let ref: ComponentRef<ImageViewerComponent>;

  /** A painting measured 100 wide by 50 high — a 2:1 canvas. */
  const painting = (tokenId: string): Nft =>
    ({ tokenId, name: 'A painting', image: {}, raw: { metadata: {} } }) as unknown as Nft;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ImageViewerComponent],
      providers: [
        provideTranslateService(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        provideRouter([]),
        {
          provide: ARTWORK_PORT,
          useValue: {
            // What the traits say: the painting is twice as wide as it is tall.
            getAspectRatio: () => 2,
            getProgressiveImageUrls: () => of('https://example.test/preview.jpg'),
            // The hi-res cascade, which this test is not about: offered nothing,
            // so the frame is left showing the preview.
            getNftQualityUrls: () => [],
          },
        },
      ],
    });

    fixture = TestBed.createComponent(ImageViewerComponent);
    component = fixture.componentInstance as typeof component;
    ref = fixture.componentRef;
  });

  const settle = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    await Promise.resolve();
    fixture.detectChanges();
  };

  it('reserves the shape the measurements imply before anything has loaded', async () => {
    vi.spyOn(component, 'ratioOf').mockResolvedValue(null);
    ref.setInput('nfts', [painting('1')]);

    await settle();

    expect(component.aspectRatio()).toBe(2);
  });

  it('takes the shape from the preview once it knows its own', async () => {
    // The fault this fixes: a second photograph of a painting is a different
    // crop of it, so the measurements describe the canvas and not the file. The
    // frame was that wrong shape for as long as the blurred preview showed, and
    // snapped straight only when the full file decoded.
    vi.spyOn(component, 'ratioOf').mockResolvedValue(0.75);
    ref.setInput('nfts', [painting('1')]);

    await settle();

    expect(component.aspectRatio()).toBeCloseTo(0.75);
  });

  it('keeps the measured shape when the preview cannot be read', async () => {
    vi.spyOn(component, 'ratioOf').mockResolvedValue(null);
    ref.setInput('nfts', [painting('1')]);

    await settle();

    expect(component.aspectRatio()).toBe(2);
  });

  it('asks nothing of a preview that is not there yet', async () => {
    const asked = vi.spyOn(component, 'ratioOf').mockResolvedValue(0.75);
    ref.setInput('nfts', []);

    await settle();

    // `none` is the placeholder before any source has answered.
    expect(asked).not.toHaveBeenCalledWith('none');
  });

  /**
   * The frame settles once and then holds, which is the whole of what the
   * artist asked for: the picture and the row of buttons above it are the same
   * width throughout, because the width is derived from this ratio.
   *
   * The hi-res file is the same photograph the preview was a thumbnail of, so
   * it has nothing new to say — and it used to say it anyway, moving the frame
   * at the exact moment the sharp image was fading in over the blur. The resize
   * is what the eye followed, so the fade read as a jump.
   */
  it('does not move the frame again when the sharp file arrives', async () => {
    vi.spyOn(component, 'ratioOf').mockResolvedValue(0.75);
    ref.setInput('nfts', [painting('1')]);
    await settle();
    expect(component.aspectRatio()).toBeCloseTo(0.75);

    // The hi-res measuring itself a hair differently, which is what rounding
    // on a different scaling of the same photograph looks like.
    component['decodedAspectRatio'].set(0.75);
    const settled = component.aspectRatio();
    component['loadBestCandidate'](['https://example.test/full.jpg'], component['loadToken']);
    await settle();

    expect(component.aspectRatio()).toBe(settled);
  });

  /**
   * Unless nothing has measured it at all — a preview that failed to decode
   * leaves the frame on the measurements, and then the sharp file is the first
   * thing that can correct them. Better one late settle than a frame that is
   * the wrong shape for good.
   */
  it('still takes the shape from the sharp file when the preview could not be read', async () => {
    vi.spyOn(component, 'ratioOf').mockResolvedValue(null);
    ref.setInput('nfts', [painting('1')]);
    await settle();
    expect(component.aspectRatio()).toBe(2);

    component['decodedAspectRatio'].set(null);
    expect(component.aspectRatio()).toBe(2);
  });
});

/**
 * Coming into focus, rather than washing out and back.
 *
 * The blurred preview used to be removed the moment the sharp image arrived,
 * which crossed two opacities: halfway through, both sat near half and the
 * painting visibly paled. Leaving it underneath makes the sharp one resolve
 * over it — the same thing the hero on the home page does, which is the effect
 * the artist asked for here.
 */
describe('ImageViewerComponent — the blurred preview underneath', () => {
  let fixture: ComponentFixture<ImageViewerComponent>;
  let component: ImageViewerComponent;
  let ref: ComponentRef<ImageViewerComponent>;

  const painting = (tokenId: string): Nft =>
    ({ tokenId, name: 'A painting', image: {}, raw: { metadata: {} } }) as unknown as Nft;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ImageViewerComponent],
      providers: [
        provideTranslateService(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        provideRouter([]),
        {
          provide: ARTWORK_PORT,
          useValue: {
            getAspectRatio: () => 2,
            getProgressiveImageUrls: () => of('https://example.test/preview.jpg'),
            getNftQualityUrls: () => [],
          },
        },
      ],
    });

    fixture = TestBed.createComponent(ImageViewerComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;
    ref.setInput('nfts', [painting('1')]);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  function preview(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.preview-layer');
  }

  it('shows the preview while there is nothing sharper', () => {
    component.previewImage.set('url(https://example.test/preview.jpg)');
    fixture.detectChanges();

    expect(preview()?.classList.contains('visible')).toBe(true);
  });

  /** The change: it stays, so the sharp image resolves over it. */
  it('keeps the preview once the sharp image is up', () => {
    component.previewImage.set('url(https://example.test/preview.jpg)');
    component.layerA.set('https://example.test/full.jpg');
    fixture.detectChanges();

    expect(component.hasImage()).toBe(true);
    expect(preview()?.classList.contains('visible')).toBe(true);
  });

  /**
   * Fullscreen is no longer a case of its own.
   *
   * It was hidden there because a `cover` preview under a `contain` painting
   * fills the letterbox bars with stretched blurred paint — which turned out to
   * happen out of fullscreen too, at any moment the frame is still the shape
   * the painting was *measured* as rather than the shape the photograph is.
   * Fitted to the same box as the image, it cannot bleed anywhere, so it stays
   * in both.
   */
  it('keeps the preview in fullscreen too, now it cannot bleed', () => {
    component.previewImage.set('url(https://example.test/preview.jpg)');
    component.layerA.set('https://example.test/full.jpg');
    component.isFullScreen.set(true);
    fixture.detectChanges();

    expect(preview()?.classList.contains('visible')).toBe(true);
  });

  it('shows nothing when there is no preview to show', () => {
    component.previewImage.set('none');
    fixture.detectChanges();

    expect(preview()?.classList.contains('visible')).toBe(false);
  });
});
