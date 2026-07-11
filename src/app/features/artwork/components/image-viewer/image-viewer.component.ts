import {
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  signal,
  untracked,
  ViewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { VALIDTRAITS } from '@domain/artwork/artwork.constants';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
  imports: [MatIcon, MatIconButton, MatTooltip, NgTemplateOutlet],
})
export class ImageViewerComponent {
  private artworkService = inject(ARTWORK_PORT);

  nfts = input<Nft[]>([]);
  description = input<string>('No description');
  displayIndex = model<number>(0);

  isFullScreen = signal<boolean>(false);
  displayArrows = computed(() => this.nfts().length > 1);

  private currentNft = computed<Nft | undefined>(
    () => this.nfts()[this.displayIndex()]
  );

  // Low-res preview shown only until the first hi-res image is ready: grey
  // placeholder -> progressive thumbnail. Once a hi-res layer is up it is
  // hidden, so it never bleeds through the letterbox bars in fullscreen.
  previewImage = signal<string>('none');
  readonly hasPreview = computed(() => this.previewImage() !== 'none');

  // Hi-res fallback chain: every displayable url, best quality first. When one
  // fails to decode (e.g. a firewall blocking IPFS) the loader walks down to
  // the next best source.
  private readonly qualityCandidates = computed(() => {
    const nft = this.currentNft();
    return nft ? this.artworkService.getNftQualityUrls(nft.image) : [];
  });

  // ── Double-buffered hi-res display ─────────────────────────────────────
  // Two stacked <img> layers. Each layer only ever receives a URL that has
  // already been decoded off-DOM, so a src swap can never paint a half-decoded
  // (torn) frame. Showing a new image writes it into the inactive layer and
  // flips `activeIsA`, cross-fading it over the previous one instead of
  // blur-flashing back through the preview.
  readonly layerA = signal<string>('none');
  readonly layerB = signal<string>('none');
  readonly activeIsA = signal<boolean>(true);
  readonly hasImage = computed(
    () => this.layerA() !== 'none' || this.layerB() !== 'none'
  );
  // True while the next hi-res image is decoding: drives a subtle spinner so a
  // slow source does not look frozen (the previous image stays up meanwhile).
  readonly loading = signal<boolean>(false);
  // Guards async decodes: bumped on every artwork change so results that land
  // after the user has already navigated away are discarded.
  private loadToken = 0;

  // The artwork's physical proportions are known from its traits before any
  // image byte arrives: the frame reserves its final footprint upfront so the
  // content below never jumps while images load.
  readonly aspectRatio = computed(() => {
    const nft = this.currentNft();
    if (!nft) return 0.8;
    const width = parseFloat(
      this.artworkService.getTraitValue(nft, VALIDTRAITS.WIDTH)
    );
    const height = parseFloat(
      this.artworkService.getTraitValue(nft, VALIDTRAITS.HEIGHT)
    );
    return width > 0 && height > 0 ? width / height : 0.8;
  });
  readonly frameWidth = computed(
    () => `min(100%, calc(100vh * ${this.aspectRatio()}))`
  );

  @ViewChild('imageElement') imageElement!: ElementRef;

  constructor() {
    effect(() => {
      if (!this.currentNft() && this.nfts().length > 0) {
        this.displayIndex.set(0);
      }
    });

    // Cascade load of the low-res preview: all sources race in parallel and the
    // background upgrades as better ones arrive. switchMap aborts in-flight
    // downloads when the displayed artwork changes.
    toObservable(this.currentNft)
      .pipe(
        switchMap((nft) => {
          if (!nft) return of('none');
          return this.artworkService.getProgressiveImageUrls(nft).pipe(
            map((url) => `url(${url})`),
            startWith('none')
          );
        }),
        takeUntilDestroyed()
      )
      .subscribe((background) => this.previewImage.set(background));

    // Hi-res loader: decode the best available candidate off-DOM, then hand it
    // to the double buffer to cross-fade in. Reacts to the artwork changing.
    effect(() => {
      const candidates = this.qualityCandidates();
      const token = ++this.loadToken;
      untracked(() => this.loadBestCandidate(candidates, token));
    });
  }

  public nextNft(relativeIndex: number) {
    if (!this.displayArrows()) return;
    const newIndex =
      (this.displayIndex() + relativeIndex + this.nfts().length) %
      this.nfts().length;
    this.displayIndex.set(newIndex);
  }

  public toggleFullScreen() {
    if (this.isFullScreen()) {
      this.exitFullScreen();
    } else {
      this.enterFullScreen();
    }
  }

  // Keep our flag in sync when the browser leaves fullscreen on its own (Esc).
  @HostListener('document:fullscreenchange')
  onFullscreenChange() {
    this.isFullScreen.set(!!document.fullscreenElement);
  }

  // Walks the quality chain, decoding each candidate off-DOM until one
  // succeeds. Only a fully decoded bitmap is ever promoted to a visible layer.
  private async loadBestCandidate(candidates: string[], token: number) {
    if (candidates.length === 0) return;
    this.loading.set(true);
    for (const url of candidates) {
      try {
        await this.decode(url);
      } catch {
        continue; // this source failed (e.g. IPFS blocked): try the next best
      }
      if (token !== this.loadToken) return; // superseded by a newer artwork
      this.promote(url);
      this.loading.set(false);
      return;
    }
    // Every hi-res candidate failed: keep the preview as the final image.
    if (token === this.loadToken) this.loading.set(false);
  }

  // Downloads and fully decodes an image off-screen; rejects if it cannot load.
  private decode(url: string): Promise<void> {
    if (!url) return Promise.reject(new Error('Empty image url'));
    const img = new Image();
    img.src = url;
    return img.decode();
  }

  // Cross-fade: write the ready image into whichever layer is hidden, then flip
  // which layer is active. Robust to rapid navigation — no transition callback
  // to miss, we just keep ping-ponging between the two layers.
  private promote(url: string) {
    if (this.activeIsA()) {
      if (this.layerA() === url) return;
      this.layerB.set(url);
      this.activeIsA.set(false);
    } else {
      if (this.layerB() === url) return;
      this.layerA.set(url);
      this.activeIsA.set(true);
    }
  }

  private enterFullScreen() {
    const elem = this.imageElement.nativeElement as HTMLElement & {
      webkitRequestFullscreen?: () => void;
      msRequestFullscreen?: () => void;
    };
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    this.isFullScreen.set(true);
  }

  private exitFullScreen() {
    const doc = document as Document & {
      webkitExitFullscreen?: () => void;
      msExitFullscreen?: () => void;
    };
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    }
    this.isFullScreen.set(false);
  }
}
