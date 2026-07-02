import { Component, inject, signal, computed, afterNextRender, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';
import { PublicContentService } from '../../../../core/services/public-content.service';

/** Section 08 — Clients: a quiet, continuous marquee of client wordmarks. */
@Component({
  selector: 'app-partners',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="overflow-hidden border-y border-hairline bg-bg py-10">
      <p
        class="mb-8 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted"
      >
        <span class="text-accent">(08)</span> &nbsp; {{ i18n.pick(label) }}
      </p>

      <div class="marquee relative">
        <div
          class="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent rtl:bg-gradient-to-l"
          aria-hidden="true"
        ></div>
        <div
          class="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent rtl:bg-gradient-to-r"
          aria-hidden="true"
        ></div>

        <div class="marquee-track">
          @for (client of marqueeItems(); track $index) {
            <span
              class="mx-10 font-display text-3xl font-medium tracking-[-0.01em] text-muted/60 transition-colors hover:text-ink"
            >
              {{ client }}
            </span>
          }
        </div>
      </div>
    </section>
  `,
})
export class Partners {
  protected readonly i18n = inject(TranslationService);
  private readonly content = inject(PublicContentService);

  protected readonly label = {
    en: 'Trusted across the Kingdom',
    ar: 'جهاتٌ رائدة تثق بنا',
  };

  /** Partner names from the API; falls back to the static bilingual list when empty. */
  private readonly fetched = signal<string[]>([]);

  private readonly clients = {
    en: ['NEOM', 'Qiddiya', 'Diriyah Gate', 'Red Sea Global', 'Roshn', 'Aramco'],
    ar: ['نيوم', 'القدية', 'بوابة الدرعية', 'البحر الأحمر', 'روشن', 'أرامكو'],
  };

  /** Doubled list so the marquee track loops seamlessly at -50%. */
  protected readonly marqueeItems = computed(() => {
    const fromApi = this.fetched();
    const list = fromApi.length ? fromApi : this.i18n.pick(this.clients);
    return [...list, ...list];
  });

  constructor() {
    afterNextRender(() => {
      this.content.partners().subscribe({
        next: (ps) => this.fetched.set(ps.map((p) => p.name).filter(Boolean)),
        error: () => {},
      });
    });
  }
}
