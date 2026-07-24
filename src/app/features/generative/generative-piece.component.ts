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
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MicPeakService } from './audio/mic-peak.service';
import { SKETCHES } from './sketches/registry';
import { Frame, Pointer, Sketch } from './sketches/sketch';

@Component({
  selector: 'app-generative-piece',
  templateUrl: './generative-piece.component.html',
  styleUrl: './generative-piece.component.scss',
  imports: [TranslatePipe, MatIconButton, MatIcon, MatTooltip],
})
export class GenerativePieceComponent implements AfterViewInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly micPeak = inject(MicPeakService);

  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  readonly notFound = signal(false);
  // Whether the currently loaded sketch opts into sound reactivity at all
  // (shows/hides the toggle button) — distinct from whether the mic is
  // actually listening right now (micPeak.listening).
  readonly soundReactive = signal(false);
  readonly soundError = signal(false);
  readonly soundListening = this.micPeak.listening;

  private ctx: CanvasRenderingContext2D | null = null;
  private sketch: Sketch | null = null;
  private rafId = 0;
  private lastTime = 0;
  private startTime = 0;
  private dpr = 1;
  private readonly pointer: Pointer = { x: 0, y: 0, vx: 0, vy: 0, down: false, active: false };
  private resizeObserver?: ResizeObserver;

  // Idle wander: when the real pointer has been still for a while, drift it
  // slowly toward randomly chosen points instead of leaving the piece static.
  private static readonly IDLE_DELAY_MS = 1500;
  private static readonly IDLE_EASE = 0.01;
  private lastRealMoveTime = 0;
  private idleTargetX = 0;
  private idleTargetY = 0;
  private nextIdleTargetTime = 0;

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

    // A sketch that doesn't opt in never keeps the mic running behind it.
    if (!entry.soundReactive && this.micPeak.listening()) {
      this.micPeak.disable();
    }
    this.soundReactive.set(!!entry.soundReactive);
    this.soundError.set(false);

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
    this.updateIdlePointer(now);

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

  // Eases the pointer toward a randomly chosen point once real input has
  // been still for a while, so a piece left alone still reads as alive
  // instead of freezing at the last real position.
  private updateIdlePointer(now: number): void {
    if (now - this.lastRealMoveTime < GenerativePieceComponent.IDLE_DELAY_MS) return;

    if (now >= this.nextIdleTargetTime) {
      this.idleTargetX = Math.random() * this.cssWidth;
      this.idleTargetY = Math.random() * this.cssHeight;
      // 3-7s until the next wander target, so the drift reads as slow and lazy.
      this.nextIdleTargetTime = now + 3000 + Math.random() * 4000;
    }

    const prevX = this.pointer.x;
    const prevY = this.pointer.y;
    this.pointer.x += (this.idleTargetX - this.pointer.x) * GenerativePieceComponent.IDLE_EASE;
    this.pointer.y += (this.idleTargetY - this.pointer.y) * GenerativePieceComponent.IDLE_EASE;
    this.pointer.vx = this.pointer.x - prevX;
    this.pointer.vy = this.pointer.y - prevY;
    this.pointer.active = true;
  }

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
      this.lastRealMoveTime = performance.now();
    });
    canvas.addEventListener('pointerdown', (event) => {
      const { x, y } = toLocal(event);
      this.pointer.x = x;
      this.pointer.y = y;
      this.pointer.down = true;
      this.pointer.active = true;
      this.lastRealMoveTime = performance.now();
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
    if (this.micPeak.listening()) this.micPeak.disable();
  }

  // Mic access must be requested from a user gesture, so this is only ever
  // called from the toggle button's own click — never automatically.
  async toggleSound(): Promise<void> {
    if (this.micPeak.listening()) {
      this.micPeak.disable();
      return;
    }
    this.soundError.set(false);
    try {
      await this.micPeak.enable(() => {
        // A sound has no on-screen position of its own, so it gets one: jolt
        // the pointer to a fresh random spot exactly the way a real fast
        // swipe would (same vx/vy formula the real pointermove handler
        // uses, just one big jump instead of many small steps), then click
        // there — same reaction as tapping the canvas, at the spot the
        // "swipe" just landed on.
        const { x, y } = this.simulateViolentMovement();
        this.sketch?.pointerDown?.(x, y);
      });
    } catch {
      // Permission denied, no mic present, etc. — fail quietly back to off.
      this.soundError.set(true);
    }
  }

  private simulateViolentMovement(): { x: number; y: number } {
    const x = Math.random() * this.cssWidth;
    const y = Math.random() * this.cssHeight;
    this.pointer.vx = x - this.pointer.x;
    this.pointer.vy = y - this.pointer.y;
    this.pointer.x = x;
    this.pointer.y = y;
    this.pointer.active = true;
    // Keeps idle-wander from immediately smoothing the jolt back away.
    this.lastRealMoveTime = performance.now();
    return { x, y };
  }
}
