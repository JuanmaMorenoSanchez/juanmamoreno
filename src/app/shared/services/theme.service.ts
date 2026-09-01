import { computed, Injectable, signal } from '@angular/core';
import {
  PREFERENCE_KEYS,
  readPreference,
  writePreference,
} from '@shared/constants/preferences.constants';

export type Theme = 'light' | 'dark';

export const THEMES: readonly Theme[] = ['light', 'dark'];

/**
 * Which of the two grounds the site is read on.
 *
 * Until the reader says otherwise the answer is whatever their system asks
 * for, and it follows a change to that made while they are reading. Only an
 * explicit choice is written down, and only an explicit choice stamps
 * `data-theme` on the document — so a prerendered page, opened with no
 * javascript at all, still honours `prefers-color-scheme` through css alone.
 *
 * The stamp is applied a second time before this service exists, by a few
 * lines inline in index.html: the alternative is a page that paints white and
 * turns dark once the application has booted, which is worse than either
 * theme.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  /** The choice made here, if one ever was. Null means "follow the system". */
  private readonly chosen = signal<Theme | null>(
    readPreference<Theme>(PREFERENCE_KEYS.THEME, THEMES)
  );

  private readonly systemPrefersDark = signal(false);

  readonly theme = computed<Theme>(
    () => this.chosen() ?? (this.systemPrefersDark() ? 'dark' : 'light')
  );

  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const query = window.matchMedia('(prefers-color-scheme: dark)');
    this.systemPrefersDark.set(query.matches);
    query.addEventListener('change', (event) => this.systemPrefersDark.set(event.matches));
  }

  toggle(): void {
    const next: Theme = this.isDark() ? 'light' : 'dark';
    this.chosen.set(next);
    writePreference(PREFERENCE_KEYS.THEME, next);
    if (typeof document !== 'undefined') {
      document.documentElement.dataset['theme'] = next;
    }
  }
}
