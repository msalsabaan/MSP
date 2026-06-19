import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Container } from '../../../../shared/ui/container/container';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal.directive';
import { CountUp } from '../../../../shared/directives/count-up.directive';
import { TranslationService } from '../../../../core/services/translation.service';

interface Stat {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
}

/** Section 04 — By the Numbers: animated counters on the ink ground. */
@Component({
  selector: 'app-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Container, ScrollReveal, CountUp],
  template: `
    <section class="bg-ink py-20 text-bg sm:py-28">
      <app-container>
        <div
          class="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.18em] text-bg/50"
        >
          <span class="text-accent">(04)</span>
          <span>{{ i18n.pick(t.eyebrow) }}</span>
          <span class="h-px flex-1 bg-bg/15"></span>
        </div>

        <dl class="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          @for (stat of i18n.pick(t.stats); track stat.label; let i = $index) {
            <div appScrollReveal [revealDelay]="i * 90">
              <dt
                [appCountUp]="stat.value"
                class="font-display text-6xl font-medium leading-none tracking-[-0.02em] text-bg sm:text-7xl"
              >
                <span data-count>0</span><span class="text-accent">{{ stat.suffix }}</span>
              </dt>
              <dd
                class="mt-4 border-t border-bg/15 pt-4 font-mono text-xs uppercase tracking-[0.12em] text-bg/60"
              >
                {{ stat.label }}
              </dd>
            </div>
          }
        </dl>
      </app-container>
    </section>
  `,
})
export class Stats {
  protected readonly i18n = inject(TranslationService);

  protected readonly t = {
    eyebrow: { en: 'By the Numbers', ar: 'بالأرقام' },
    stats: {
      en: [
        { value: 240, suffix: '+', label: 'Projects delivered' },
        { value: 4, suffix: 'M m²', label: 'Built area designed' },
        { value: 12, suffix: ' yrs', label: 'In practice' },
        { value: 30, suffix: '', label: 'Awards & citations' },
      ],
      ar: [
        { value: 240, suffix: '+', label: 'مشروع مُنجَز' },
        { value: 4, suffix: ' مليون م²', label: 'مساحة مُصمَّمة' },
        { value: 12, suffix: ' عاماً', label: 'من الخبرة' },
        { value: 30, suffix: '', label: 'جائزة وتكريم' },
      ],
    },
  };
}
