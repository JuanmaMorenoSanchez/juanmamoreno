import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ThemeService } from './theme.service';

/** A system that either asks for a dark ground or does not. */
function systemPrefers(dark: boolean) {
  const listeners: ((event: { matches: boolean }) => void)[] = [];
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: query.includes('dark') ? dark : false,
      media: query,
      addEventListener: (_: string, listener: (event: { matches: boolean }) => void) =>
        listeners.push(listener),
      removeEventListener: () => {},
    }))
  );
  return { announce: (nowDark: boolean) => listeners.forEach((l) => l({ matches: nowDark })) };
}

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset['theme'];
    TestBed.resetTestingModule();
  });

  afterEach(() => vi.unstubAllGlobals());

  it('follows the system until the reader says otherwise', () => {
    systemPrefers(true);

    expect(TestBed.inject(ThemeService).theme()).toBe('dark');
  });

  // A reader on a dark system who has asked this site for light must get
  // light. The stamp is what wins the argument, in css as well as here.
  it('lets an explicit choice override the system in either direction', () => {
    systemPrefers(true);
    localStorage.setItem('juanmamoreno.theme', 'light');

    const service = TestBed.inject(ThemeService);

    expect(service.theme()).toBe('light');
    expect(service.isDark()).toBe(false);
  });

  it('remembers a choice and stamps it on the document', () => {
    systemPrefers(false);
    const service = TestBed.inject(ThemeService);

    service.toggle();

    expect(service.theme()).toBe('dark');
    expect(localStorage.getItem('juanmamoreno.theme')).toBe('dark');
    // What index.html reads before the first paint on the next visit, and what
    // the stylesheet keys the dark palette off.
    expect(document.documentElement.dataset['theme']).toBe('dark');
  });

  it('toggles back, rather than only ever going darker', () => {
    systemPrefers(false);
    const service = TestBed.inject(ThemeService);

    service.toggle();
    service.toggle();

    expect(service.theme()).toBe('light');
    expect(localStorage.getItem('juanmamoreno.theme')).toBe('light');
    expect(document.documentElement.dataset['theme']).toBe('light');
  });

  // Nothing is stamped until the reader has chosen, which is what leaves the
  // stylesheet's prefers-color-scheme rules in charge — including on a
  // prerendered page opened with no javascript at all.
  it('marks the document with nothing while it is still following the system', () => {
    systemPrefers(true);

    TestBed.inject(ThemeService);

    expect(document.documentElement.dataset['theme']).toBeUndefined();
  });

  it('follows a system that changes its mind mid-visit', () => {
    const system = systemPrefers(false);
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('light');

    system.announce(true);

    expect(service.theme()).toBe('dark');
  });

  it('stops following the system once a choice has been made', () => {
    const system = systemPrefers(false);
    const service = TestBed.inject(ThemeService);

    service.toggle();
    system.announce(false);

    expect(service.theme()).toBe('dark');
  });
});
