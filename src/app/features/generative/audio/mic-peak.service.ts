import { Injectable, signal } from '@angular/core';
import { SoundPeakDetector } from '@domain/generative/sound-peak-detector';

// Kick/bass range: this is where a song's rhythm actually lives. Tracking
// this band instead of overall loudness is what makes a beat register as a
// clean peak even inside a loud, continuous concert mix — vocals, cymbals
// and crowd noise sit mostly above it and don't drown out the pulse.
const BASS_MIN_HZ = 20;
const BASS_MAX_HZ = 160;
// Music-presence gate: flux only counts while the bass band actually holds
// meaningful energy. A silent room's noise floor sits below the analyser's
// minDecibels cutoff, reading ~0 here, so its jitter can never fire a peak
// no matter how the relative thresholds are tuned.
const MIN_BASS_PRESENCE = 0.12;

/**
 * Turns microphone input into "peak" events tuned to a song's beat, so it can
 * drive video-mapping-style visuals at a live show.
 *
 * The key trick is that it detects bass *onsets* (a sudden rise in kick/bass
 * energy — see "flux" below) rather than the bass level itself. A steady loud
 * mix keeps the raw level pinned high, so a level-relative detector's average
 * catches up and beats stop standing out (the classic "reacts for a few
 * seconds then goes quiet" failure). Flux sidesteps that: sustained energy —
 * however loud, even clipping at the ceiling — has near-zero flux, while every
 * kick produces a sharp positive spike, so the pulse keeps registering
 * indefinitely. The relative peak detector then adapts to how punchy the
 * current section is (quiet verse vs. pounding drop).
 *
 * Opt-in only: nothing here touches the mic until enable() is called from a
 * user gesture, and disable() fully releases the stream and audio graph. This
 * is the only browser-facing (Web Audio / getUserMedia) piece; the
 * peak-detection math itself is pure domain code.
 */
@Injectable({ providedIn: 'root' })
export class MicPeakService {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private stream: MediaStream | null = null;
  private frequencyData: Uint8Array<ArrayBuffer> | null = null;
  private detector: SoundPeakDetector | null = null;
  private previousBassLevel = 0;
  private rafId = 0;
  private startTime = 0;
  private onPeak: (() => void) | null = null;

  readonly listening = signal(false);

  /** Requests mic access and starts sampling. Must be called from a user gesture. */
  async enable(onPeak: () => void): Promise<void> {
    if (this.audioContext) return; // already enabled

    // The processing browsers apply by default is tuned for voice calls —
    // noise suppression in particular treats anything that isn't speech
    // (claps, taps, ambient noise) as "noise" to be filtered out, and
    // auto-gain works against level-relative peak detection by constantly
    // renormalizing loudness. Asking for raw input surfaces every sound.
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    });
    this.audioContext = new AudioContext();
    const source = this.audioContext.createMediaStreamSource(this.stream);
    this.analyser = this.audioContext.createAnalyser();
    // 2048 gives ~20Hz-resolution bins even at 48kHz, so the bass band is
    // several bins wide. Minimal smoothing keeps each kick's onset a sharp
    // one-frame rise instead of smearing it across several frames (which
    // would shrink the flux we key off). Raised maxDecibels leaves headroom
    // so a loud room's bass isn't permanently pinned at 255 (which would
    // flatten flux to zero).
    // minDecibels is the anti-silence measure: anything quieter than -55dB
    // reads as byte 0, so a silent room's noise floor produces literally zero
    // bass level and zero flux — there is nothing left to false-trigger on.
    // Real music playback and concert bass sit far above this cutoff.
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.4;
    this.analyser.minDecibels = -55;
    this.analyser.maxDecibels = -15;
    source.connect(this.analyser);

    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    this.previousBassLevel = 0;
    // Params tuned for the flux signal (bass onsets), not raw level. The
    // absolute floor is the load-bearing part: between beats — and in a
    // silent room — flux hovers near zero, which makes the average-relative
    // test trivially satisfiable by mic-noise jitter ("X times average" means
    // nothing when the average is ~0). The floor is set above that jitter,
    // so only a genuine energy jump (a kick's attack) can fire at all; the
    // multiplier then keeps it relative to how punchy the current section is.
    // 0.25s cooldown still supports up to 240 BPM.
    this.detector = new SoundPeakDetector({
      windowSeconds: 2,
      peakMultiplier: 2.5,
      minAbsoluteLevel: 0.06,
      cooldownSeconds: 0.25,
    });
    this.onPeak = onPeak;
    this.startTime = performance.now();
    this.listening.set(true);
    this.sample();
  }

  /** Stops sampling and fully releases the mic stream and audio graph. */
  disable(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = 0;
    this.stream?.getTracks().forEach((track) => track.stop());
    void this.audioContext?.close();
    this.audioContext = null;
    this.analyser = null;
    this.stream = null;
    this.frequencyData = null;
    this.detector = null;
    this.onPeak = null;
    this.listening.set(false);
  }

  private readonly sample = (): void => {
    if (!this.analyser || !this.frequencyData || !this.detector || !this.audioContext) return;

    this.analyser.getByteFrequencyData(this.frequencyData);

    const binHz = this.audioContext.sampleRate / 2 / this.frequencyData.length;
    const lowBin = Math.max(1, Math.floor(BASS_MIN_HZ / binHz)); // skip bin 0 (DC)
    const highBin = Math.min(this.frequencyData.length - 1, Math.ceil(BASS_MAX_HZ / binHz));

    let sum = 0;
    for (let i = lowBin; i <= highBin; i++) sum += this.frequencyData[i];
    const bassLevel = sum / (highBin - lowBin + 1) / 255; // normalized 0..1

    // Flux = how much bass energy just *rose* since the previous frame; only
    // the rise counts (a decay isn't an onset). Sustained energy → ~0 flux,
    // an attack → a spike. This is what the detector actually thresholds.
    // Gated on actual bass presence: without music there is no rhythm to
    // react to, so whatever residue remains below the presence threshold is
    // fed to the detector as zero.
    const rawFlux = Math.max(0, bassLevel - this.previousBassLevel);
    this.previousBassLevel = bassLevel;
    const flux = bassLevel >= MIN_BASS_PRESENCE ? rawFlux : 0;

    const t = (performance.now() - this.startTime) / 1000;
    if (this.detector.addSample(t, flux)) {
      this.onPeak?.();
    }

    this.rafId = requestAnimationFrame(this.sample);
  };
}
