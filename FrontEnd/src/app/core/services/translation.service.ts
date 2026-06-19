import {
  Injectable,
  signal,
  computed,
  effect,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { STORAGE_KEYS } from '../constants/api.constants';

export type Lang = 'en' | 'ar';

/**
 * Manages the active language. Persists the choice to localStorage and keeps
 * `lang`/`dir` on <html> in sync (so the layout flips to RTL for Arabic).
 * SSR-safe: on the server it defaults to 'en' / 'ltr' and never touches the DOM.
 *
 * Components localize by passing a `{ en, ar }` record to `pick()`, usually
 * inside a `computed()` so the view updates when the language changes.
 */
@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly lang = signal<Lang>(this.initialLang());
  readonly dir = computed<'ltr' | 'rtl'>(() =>
    this.lang() === 'ar' ? 'rtl' : 'ltr',
  );
  readonly isArabic = computed(() => this.lang() === 'ar');

  constructor() {
    effect(() => {
      const lang = this.lang();
      const dir = this.dir();
      if (!this.isBrowser) return;
      const html = document.documentElement;
      html.setAttribute('lang', lang);
      html.setAttribute('dir', dir);
      try {
        localStorage.setItem(STORAGE_KEYS.lang, lang);
      } catch {
        // Storage unavailable (private mode / disabled) — ignore.
      }
    });
  }

  toggle(): void {
    this.lang.update((l) => (l === 'ar' ? 'en' : 'ar'));
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
  }

  /** Returns the value for the active language from a bilingual record. */
  pick<T>(record: { en: T; ar: T }): T {
    return record[this.lang()];
  }

  private initialLang(): Lang {
    if (!this.isBrowser) return 'en';
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.lang);
      if (stored === 'en' || stored === 'ar') return stored;
    } catch {
      // ignore
    }
    return 'en';
  }
}
