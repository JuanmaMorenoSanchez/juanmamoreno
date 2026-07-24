import { SoundPeakDetector } from './sound-peak-detector';

describe('SoundPeakDetector', () => {
  it('never reports a peak on the very first sample (no baseline yet)', () => {
    const detector = new SoundPeakDetector();
    expect(detector.addSample(0, 0.9)).toBe(false);
  });

  it('detects a loud spike against a quiet rolling average', () => {
    const detector = new SoundPeakDetector({ cooldownSeconds: 0 });
    for (let t = 0; t < 2; t += 0.2) detector.addSample(t, 0.05);
    expect(detector.addSample(2, 0.5)).toBe(true);
  });

  it('ignores near-silent readings even if technically above average', () => {
    const detector = new SoundPeakDetector({ minAbsoluteLevel: 0.02, cooldownSeconds: 0 });
    for (let t = 0; t < 2; t += 0.2) detector.addSample(t, 0.001);
    expect(detector.addSample(2, 0.01)).toBe(false);
  });

  it('does not fire again until the cooldown has passed', () => {
    const detector = new SoundPeakDetector({ cooldownSeconds: 0.6 });
    for (let t = 0; t < 2; t += 0.2) detector.addSample(t, 0.05);
    expect(detector.addSample(2, 0.5)).toBe(true);
    expect(detector.addSample(2.1, 0.5)).toBe(false); // too soon after the last peak
    expect(detector.addSample(2.7, 0.5)).toBe(true); // cooldown elapsed
  });

  it('forgets samples older than the rolling window', () => {
    const detector = new SoundPeakDetector({ windowSeconds: 2, peakMultiplier: 1.5, cooldownSeconds: 0 });
    // A loud baseline raises the rolling average, so matching it isn't a peak.
    for (let t = 0; t < 2; t += 0.2) detector.addSample(t, 0.5);
    expect(detector.addSample(2, 0.6)).toBe(false);

    // Once enough quiet time has passed for the loud samples to age out...
    for (let t = 5; t < 8; t += 0.2) detector.addSample(t, 0.05);
    // ...the same moderate reading is a clear peak against the new, quiet baseline.
    expect(detector.addSample(8, 0.6)).toBe(true);
  });
});
