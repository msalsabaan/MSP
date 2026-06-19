import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';

/** Small EN / عربية switch that mirrors the theme toggle styling. */
@Component({
  selector: 'app-lang-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      (click)="i18n.toggle()"
      [attr.aria-label]="
        i18n.isArabic() ? 'Switch to English' : 'التبديل إلى العربية'
      "
      class="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-border px-3 font-mono text-xs font-medium uppercase tracking-[0.1em] text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {{ i18n.isArabic() ? 'EN' : 'ع' }}
    </button>
  `,
})
export class LangToggle {
  protected readonly i18n = inject(TranslationService);
}
