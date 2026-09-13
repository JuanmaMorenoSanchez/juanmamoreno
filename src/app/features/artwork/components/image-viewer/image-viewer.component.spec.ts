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
});
