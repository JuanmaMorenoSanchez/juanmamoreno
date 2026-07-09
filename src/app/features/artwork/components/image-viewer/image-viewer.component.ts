import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
  model,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
  imports: [MatIcon],
})
export class ImageViewerComponent {
  private artworkService = inject(ARTWORK_PORT);

  nfts = input<Nft[]>([]);
  description = input<string>('No description');
  displayIndex = model<number>(0);

  previewImage = signal<string>('none');

  isFullScreen = signal<boolean>(false);
  displayArrows = computed(() => this.nfts().length > 1);
  private currentNft = computed<Nft | undefined>(
    () => this.nfts()[this.displayIndex()]
  );

  // Hi-res fallback chain: every displayable url, best quality first. When
  // one fails to load (e.g. a firewall blocking IPFS) the viewer walks down
  // to the next best source instead of staying blurred forever.
  private readonly qualityCandidates = computed(() => {
    const nft = this.currentNft();
    return nft ? this.artworkService.getNftQualityUrls(nft.image) : [];
  });
  // Index of the candidate being displayed; resets when the artwork changes.
  private readonly qualityIndex = linkedSignal({
    source: this.qualityCandidates,
    computation: () => 0,
  });
  readonly qualityImage = computed(
    () => this.qualityCandidates()[this.qualityIndex()] ?? 'none'
  );
  // Re-blurs automatically every time a new quality url starts loading.
  readonly hiResLoaded = linkedSignal({
    source: this.qualityImage,
    computation: () => false,
  });

  readonly isImgVisible = signal<boolean>(true);
  hovering = false;
  displayExpand = false;

  @ViewChild('imageElement') imageElement!: ElementRef;

  constructor() {
    effect(() => {
      if (!this.currentNft() && this.nfts().length > 0) {
        this.displayIndex.set(0);
      }
    });

    // Cascade load: all preview sources race in parallel and the background
    // upgrades as better ones arrive. switchMap aborts in-flight downloads
    // when the displayed artwork changes.
    toObservable(
      computed(() => ({ nft: this.currentNft(), fullScreen: this.isFullScreen() }))
    )
      .pipe(
        switchMap(({ nft, fullScreen }) => {
          if (!nft || fullScreen) return of('none');
          return this.artworkService.getProgressiveImageUrls(nft).pipe(
            map((url) => `url(${url})`),
            startWith('none')
          );
        }),
        takeUntilDestroyed()
      )
      .subscribe((background) => this.previewImage.set(background));
  }

  public setHover(hovering: boolean) {
    this.hovering = hovering;
  }

  public nextNft(relativeIndex: number) {
    const newIndex =
      (this.displayIndex() + relativeIndex + this.nfts().length) %
      this.nfts().length;
    this.displayIndex.set(newIndex);
  }

  public handleImageClick() {
    if (this.displayExpand) {
      this.enterFullScreen();
    } else {
      if (!this.isFullScreen()) {
        this.displayExpand = true;
        setTimeout(() => {
          this.displayExpand = false;
        }, 2000);
      } else {
        this.exitFullScreen();
      }
    }
  }

  public handleDoubleClick() {
    if (!this.isFullScreen()) {
      this.enterFullScreen();
    }
  }

  public onHiResLoad() {
    this.hiResLoaded.set(true);
  }

  public onHiResLoadError() {
    const nextIndex = this.qualityIndex() + 1;
    if (nextIndex < this.qualityCandidates().length) {
      // This source failed (e.g. IPFS blocked by a firewall): fall back to
      // the next best quality url.
      this.qualityIndex.set(nextIndex);
    } else {
      // Nothing left to try: keep the preview and remove the blur.
      this.hiResLoaded.set(true);
    }
  }

  private enterFullScreen() {
    this.isFullScreen.set(true);
    const elem = this.imageElement.nativeElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((elem as any).webkitRequestFullscreen) {
      (elem as any).webkitRequestFullscreen();
    } else if ((elem as any).msRequestFullscreen) {
      (elem as any).msRequestFullscreen();
    }
  }

  private exitFullScreen() {
    this.isFullScreen.set(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  }
}
