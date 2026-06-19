import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Container } from '../../shared/ui/container/container';
import { ScrollReveal } from '../../shared/directives/scroll-reveal.directive';
import { TranslationService } from '../../core/services/translation.service';
import { SeoService } from '../../core/services/seo.service';
import { PROJECTS, TYPOLOGIES } from '../../core/data/projects';

/** Works index — a filterable, uniform grid of all projects. */
@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Container, ScrollReveal],
  template: `
    <!-- Page header -->
    <section class="border-b border-hairline bg-bg pt-16 pb-12 sm:pt-20">
      <app-container>
        <div class="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span class="text-accent">{{ i18n.pick(t.eyebrow) }}</span>
          <span class="h-px flex-1 bg-hairline"></span>
          <span dir="ltr">{{ filtered().length }} / {{ projects.length }}</span>
        </div>
        <h1
          appScrollReveal
          revealType="line"
          class="mt-8 max-w-4xl t-display font-display font-medium tracking-[-0.035em] text-ink"
        >
          {{ i18n.pick(t.title) }}
        </h1>
        <p appScrollReveal [revealDelay]="120" class="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {{ i18n.pick(t.intro) }}
        </p>
      </app-container>
    </section>

    <!-- Filter chips -->
    <section class="sticky top-20 z-30 border-b border-hairline bg-bg/90 py-4 backdrop-blur-md">
      <app-container>
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            (click)="setFilter(null)"
            [class]="chipClass(activeKey() === null)"
          >
            {{ i18n.pick(t.all) }}
          </button>
          @for (typ of typologies; track typ.key) {
            <button
              type="button"
              (click)="setFilter(typ.key)"
              [class]="chipClass(activeKey() === typ.key)"
            >
              {{ i18n.pick(typ) }}
            </button>
          }
        </div>
      </app-container>
    </section>

    <!-- Grid -->
    <section class="py-16 sm:py-20">
      <app-container>
        <div class="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          @for (project of filtered(); track project.slug) {
            <a [routerLink]="['/projects', project.slug]" class="group block">
              <div appScrollReveal revealType="line" class="aspect-[4/3] overflow-hidden">
                <img
                  [src]="project.cover"
                  [alt]="i18n.pick(project.title)"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
              </div>
              <div class="mt-5 flex items-baseline justify-between gap-4">
                <h2
                  class="font-display text-xl font-medium tracking-[-0.02em] text-ink transition-colors group-hover:text-accent sm:text-2xl"
                >
                  <span class="font-mono text-xs align-top text-accent">{{ project.no }}&ensp;</span>
                  {{ i18n.pick(project.title) }}
                </h2>
                <span class="shrink-0 font-mono text-xs text-muted">{{ project.year }}</span>
              </div>
              <p class="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-muted">
                {{ i18n.pick(project.typology) }} · {{ i18n.pick(project.location) }}
              </p>
            </a>
          }
        </div>

        @if (filtered().length === 0) {
          <p class="py-16 text-center text-muted">{{ i18n.pick(t.empty) }}</p>
        }
      </app-container>
    </section>
  `,
})
export class Projects {
  protected readonly i18n = inject(TranslationService);
  private readonly seo = inject(SeoService);

  protected readonly projects = PROJECTS;
  protected readonly typologies = TYPOLOGIES.filter((typ) =>
    PROJECTS.some((p) => p.typology.key === typ.key),
  );

  protected readonly activeKey = signal<string | null>(null);
  protected readonly filtered = computed(() => {
    const key = this.activeKey();
    return key ? this.projects.filter((p) => p.typology.key === key) : this.projects;
  });

  protected readonly t = {
    eyebrow: { en: 'Works', ar: 'الأعمال' },
    title: { en: 'Selected works.', ar: 'أعمالٌ مختارة.' },
    intro: {
      en: 'Buildings, infrastructure, and places across the Kingdom — from civic landmarks to masterplans.',
      ar: 'مبانٍ وبنىً تحتية وأماكنُ في أنحاء المملكة — من المعالم العامة إلى المخطّطات الشاملة.',
    },
    all: { en: 'All', ar: 'الكل' },
    empty: { en: 'No projects in this category yet.', ar: 'لا توجد مشاريع في هذه الفئة بعد.' },
  };

  constructor() {
    this.seo.update({
      title: 'Works',
      description:
        'Selected architecture and engineering projects by MSP Consultants across Saudi Arabia.',
    });
  }

  protected setFilter(key: string | null): void {
    this.activeKey.set(key);
  }

  protected chipClass(active: boolean): string {
    const base =
      'rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors';
    return active
      ? `${base} border-ink bg-ink text-bg`
      : `${base} border-hairline text-muted hover:border-ink hover:text-ink`;
  }
}
