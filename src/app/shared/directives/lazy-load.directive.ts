import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';

@Directive({ selector: '[appLazyLoad]' })
export class LazyLoadDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  // There is no IntersectionObserver when the pages are prerendered, and
  // nothing to be lazy about either: no one is scrolling a build.
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  @Output() visible = new EventEmitter<void>();

  private observer?: IntersectionObserver;

  constructor() {
    if (!this.isBrowser) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.visible.emit();
            this.observer?.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: 0.1 }
    );
  }

  ngOnInit(): void {
    this.observer?.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
