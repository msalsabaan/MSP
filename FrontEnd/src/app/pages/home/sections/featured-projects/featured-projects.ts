import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Section } from '../../../../shared/ui/section/section';
import { Container } from '../../../../shared/ui/container/container';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal.directive';
import { TranslationService } from '../../../../core/services/translation.service';
import { PROJECTS } from '../../../../core/data/projects';

/** Section 03 — Selected Works: a uniform, aligned grid of featured projects. */
@Component({
  selector: 'app-featured-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Section, Container, ScrollReveal],
  template: `
    <app-section>
      <app-container>
        <div
          class="flex flex-wrap items-end justify-between gap-6 border-b border-hairline pb-8"
        >
          <div class="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <span class="text-accent">(03)</span>
            <span>{{ i18n.pick(t.eyebrow) }}</span>
          </div>
          <a
            routerLink="/projects"
            class="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-ink"
          >
            {{ i18n.pick(t.all) }}
            <span class="dir-flip text-accent transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>

        <div class="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2">
          @for (project of projects; track project.slug) {
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
                <h3
                  class="font-display text-2xl font-medium tracking-[-0.02em] text-ink transition-colors group-hover:text-accent sm:text-3xl"
                >
                  <span class="font-mono text-sm align-top text-accent">{{ project.no }}&ensp;</span>
                  {{ i18n.pick(project.title) }}
                </h3>
                <span class="shrink-0 font-mono text-xs text-muted">{{ project.year }}</span>
              </div>
              <p class="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-muted">
                {{ i18n.pick(project.typology) }} · {{ i18n.pick(project.location) }}
              </p>
            </a>
          }
        </div>
      </app-container>
    </app-section>
  `,
})
export class FeaturedProjects {
  protected readonly i18n = inject(TranslationService);

  protected readonly projects = PROJECTS.filter((p) => p.featured).slice(0, 4);

  protected readonly t = {
    eyebrow: { en: 'Selected Works', ar: 'مختاراتٌ من أعمالنا' },
    all: { en: 'Full index', ar: 'الأرشيف الكامل' },
  };
}
