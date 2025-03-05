import { Directive, ElementRef, EventEmitter, inject, Output } from '@angular/core';

@Directive({
    selector: '[appLazyLoad]',
    standalone: false
})
export class LazyLoadDirective {
  private el = inject(ElementRef);
  
  @Output() visible = new EventEmitter<void>();

  private observer: IntersectionObserver;

  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.visible.emit();
            this.observer.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: 0.1 }
    );
  }

  ngOnInit(): void {
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
