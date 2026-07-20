import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SKETCHES } from './sketches/registry';
import { Frame, Pointer, Sketch } from './sketches/sketch';

@Component({
  selector: 'app-generative-piece',
  templateUrl: './generative-piece.component.html',
  styleUrl: './generative-piece.component.scss',
  imports: [TranslatePipe],
})
export class GenerativePieceComponent implements AfterViewInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  readonly notFound = signal(false);

  private ctx: CanvasRenderingContext2D | null = null;
  private sketch: Sketch | null = null;
  private rafId = 0;
  private lastTime = 0;
  private startTime = 0;
  private dpr = 1;
  private readonly pointer: Pointer = { x: 0, y: 0, vx: 0, vy: 0, down: false, active: false };
  private resizeObserver?: ResizeObserver;

  ngAfterViewInit(): void {
    this.attachPointer();
    this.observeResize();
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      void this.loadSketch(params.get('id'));
    });
    this.destroyRef.onDestroy(() => this.teardown());
  }

  private async loadSketch(id: string | null): Promise<void> {
    this.stopLoop();
    this.sketch?.dispose?.();
    this.sketch = null;

    const entry = id ? SKETCHES[id] : undefined;
    if (!entry) {
      this.notFound.set(true);
      return;
    }
    this.notFound.set(false);

    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    this.resizeCanvas(); // also establishes the CSS-pixel base transform
    const sketch = entry.factory();
    await sketch.setup(this.ctx, this.cssWidth, this.cssHeight);
    // A newer route may have superseded this one while setup awaited.
    if (this.sketch !== null) return;
    this.sketch = sketch;

    this.startTime = performance.now();
    this.lastTime = this.startTime;
    this.rafId = requestAnimationFrame(this.loop);
  }

  private readonly loop = (now: number): void => {
    if (!this.ctx || !this.sketch) return;
    const dt = (now - this.lastTime) / 1000;
    this.lastTime = now;

    // Re-establish the CSS-pixel coordinate space each frame so a sketch that
    // forgets to balance save/restore can't corrupt the next frame.
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    const frame: Frame = {
      t: (now - this.startTime) / 1000,
      dt,
      width: this.cssWidth,
      height: this.cssHeight,
      pointer: this.pointer,
    };
    this.sketch.draw(this.ctx, frame);

    // Velocity decays so the pointer reads as "still" shortly after it stops.
    this.pointer.vx *= 0.85;
    this.pointer.vy *= 0.85;

    this.rafId = requestAnimationFrame(this.loop);
  };

  private get cssWidth(): number {
    return this.canvasRef.nativeElement.clientWidth;
  }
  private get cssHeight(): number {
    return this.canvasRef.nativeElement.clientHeight;
  }

  // Sizes the backing store to the display size × devicePixelRatio for crisp
  // rendering, then sets the base transform so sketches draw in CSS pixels.
  // Setting canvas.width/height resets the context, so the transform must be
  // (re)applied here — otherwise setup()/resize() paint in device pixels and,
  // on HiDPI, only cover a corner of the canvas.
  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = Math.round(w * this.dpr);
    canvas.height = Math.round(h * this.dpr);
    this.ctx?.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private observeResize(): void {
    this.resizeObserver = new ResizeObserver(() => {
      if (!this.ctx || !this.sketch) return;
      this.resizeCanvas();
      this.sketch.resize?.(this.ctx, this.cssWidth, this.cssHeight);
    });
    this.resizeObserver.observe(this.canvasRef.nativeElement);
  }

  private attachPointer(): void {
    const canvas = this.canvasRef.nativeElement;
    const toLocal = (event: PointerEvent): { x: number; y: number } => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    canvas.addEventListener('pointermove', (event) => {
      const { x, y } = toLocal(event);
      this.pointer.vx = x - this.pointer.x;
      this.pointer.vy = y - this.pointer.y;
      this.pointer.x = x;
      this.pointer.y = y;
      this.pointer.active = true;
    });
    canvas.addEventListener('pointerdown', (event) => {
      const { x, y } = toLocal(event);
      this.pointer.x = x;
      this.pointer.y = y;
      this.pointer.down = true;
      this.pointer.active = true;
      this.sketch?.pointerDown?.(x, y);
    });
    canvas.addEventListener('pointerup', () => (this.pointer.down = false));
    canvas.addEventListener('pointerleave', () => (this.pointer.down = false));
  }

  private stopLoop(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }

  private teardown(): void {
    this.stopLoop();
    this.resizeObserver?.disconnect();
    this.sketch?.dispose?.();
    this.sketch = null;
  }
}
