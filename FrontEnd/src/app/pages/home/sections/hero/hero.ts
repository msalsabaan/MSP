import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Container } from '../../../../shared/ui/container/container';
import { Button } from '../../../../shared/ui/button/button';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal.directive';
import { ProjectShowcase } from './project-showcase';
import { TranslationService } from '../../../../core/services/translation.service';

/**
 * Hero — oversized headline wiping up line by line, a monospace meta column,
 * and an interactive expanding-panels showcase of featured projects.
 */
@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Container, Button, ScrollReveal, ProjectShowcase],
  template: `
    <section class="relative overflow-hidden border-b border-hairline bg-bg">
      <app-container>
        <div class="relative grid gap-y-10 pt-14 pb-12 lg:grid-cols-12 lg:gap-8 lg:pt-20">
          <!-- Meta row -->
          <div
            class="col-span-12 flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-muted"
          >
            <span class="text-accent">MSP / {{ i18n.pick(t.kicker) }}</span>
            <span class="hidden sm:block">{{ i18n.pick(t.est) }}</span>
          </div>

          <!-- Headline -->
          <div class="col-span-12 lg:col-span-8">
            <h1
              class="t-display font-display font-medium tracking-[-0.035em] text-ink"
            >
              <span appScrollReveal revealType="line" class="block">{{ i18n.pick(t.line1) }}</span>
              <span appScrollReveal revealType="line" [revealDelay]="100" class="block">
                {{ i18n.pick(t.line2) }}
              </span>
              <span
                appScrollReveal
                revealType="line"
                [revealDelay]="200"
                class="block italic font-normal text-accent"
              >
                {{ i18n.pick(t.line3) }}
              </span>
            </h1>

            <p
              appScrollReveal
              [revealDelay]="380"
              class="mt-8 max-w-xl text-lg leading-relaxed text-muted"
            >
              {{ i18n.pick(t.intro) }}
            </p>

            <div appScrollReveal [revealDelay]="480" class="mt-9 flex flex-wrap gap-4">
              <app-button>{{ i18n.pick(t.ctaPrimary) }}</app-button>
              <app-button variant="outline">{{ i18n.pick(t.ctaSecondary) }}</app-button>
            </div>
          </div>

          <!-- Meta column -->
          <div class="col-span-12 lg:col-span-3 lg:col-start-10">
            <div
              class="flex h-full flex-col justify-between gap-8 border-s border-hairline ps-6 lg:ps-8"
            >
              <div class="font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-muted">
                <p class="text-accent">{{ i18n.pick(t.location) }}</p>
                <p class="mt-2 text-ink" dir="ltr">24°38'N · 46°43'E</p>
              </div>
              <div class="font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-muted">
                <p class="text-accent">{{ i18n.pick(t.disciplines) }}</p>
                <p class="mt-2 text-ink">{{ i18n.pick(t.disc1) }}</p>
                <p class="text-ink">{{ i18n.pick(t.disc2) }}</p>
              </div>
            </div>
          </div>
        </div>
      </app-container>

      <!-- Interactive featured-project showcase -->
      <app-project-showcase />
    </section>
  `,
})
export class Hero {
  protected readonly i18n = inject(TranslationService);

  protected readonly t = {
    kicker: { en: 'Consultants', ar: 'للاستشارات الهندسية' },
    est: { en: 'Est. 2012 — Riyadh, KSA', ar: 'الرياض · منذ ٢٠١٢' },
    line1: { en: 'Architecture', ar: 'نُصمّم' },
    line2: { en: '& engineering', ar: 'ونبني' },
    line3: { en: 'for what endures.', ar: 'ما يدوم.' },
    intro: {
      en: 'We are a multidisciplinary consultancy shaping buildings, infrastructure, and cities — uniting architectural vision with structural precision, from first sketch to final inspection.',
      ar: 'بيتُ خبرةٍ هندسيٌّ متعدّد التخصصات. نُصمّم المباني والبنى التحتية والمدن، فنجمع جرأةَ الرؤية المعمارية إلى دقّة الهندسة — من الفكرة الأولى حتى التسليم.',
    },
    ctaPrimary: { en: 'Start a project', ar: 'ابدأ مشروعك' },
    ctaSecondary: { en: 'Selected works', ar: 'تصفّح أعمالنا' },
    location: { en: 'Location', ar: 'الموقع' },
    disciplines: { en: 'Disciplines', ar: 'التخصصات' },
    disc1: { en: 'Architecture · Structure', ar: 'عمارة · إنشاءات' },
    disc2: { en: 'MEP · Urban · PM', ar: 'كهروميكانيكا · تخطيط · إدارة' },
    imageAlt: {
      en: 'A contemporary building by MSP Consultants',
      ar: 'مبنى معاصر من تصميم إم إس بي للاستشارات',
    },
  };
}
