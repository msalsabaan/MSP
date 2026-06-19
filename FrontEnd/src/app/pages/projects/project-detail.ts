import {
  Component,
  inject,
  computed,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Container } from '../../shared/ui/container/container';
import { ScrollReveal } from '../../shared/directives/scroll-reveal.directive';
import { Parallax } from '../../shared/directives/parallax.directive';
import { TranslationService } from '../../core/services/translation.service';
import { SeoService } from '../../core/services/seo.service';
import { PROJECTS, getProject } from '../../core/data/projects';

/** Project detail page — cover, specs, description, gallery, next project. */
@Component({
  selector: 'app-project-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, RouterLink, Container, ScrollReveal, Parallax],
  template: `
    @if (project(); as p) {
      <article>
        <!-- Header -->
        <section class="border-b border-hairline bg-bg pt-12 pb-10 sm:pt-16">
          <app-container>
            <a
              routerLink="/projects"
              class="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
            >
              <span class="dir-flip">&larr;</span> {{ i18n.pick(t.back) }}
            </a>

            <div class="mt-8 flex items-center gap-5 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <span class="text-accent">{{ p.no }}</span>
              <span>{{ i18n.pick(p.typology) }}</span>
              <span class="h-px flex-1 bg-hairline"></span>
              <span dir="ltr">{{ p.year }}</span>
            </div>

            <h1
              appScrollReveal
              revealType="line"
              class="mt-6 max-w-4xl t-display font-display font-medium tracking-[-0.035em] text-ink"
            >
              {{ i18n.pick(p.title) }}
            </h1>
            <p appScrollReveal [revealDelay]="120" class="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {{ i18n.pick(p.summary) }}
            </p>
          </app-container>
        </section>

        <!-- Cover -->
        <div class="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <div appScrollReveal revealType="line" class="aspect-[16/9] overflow-hidden">
            <div appParallax [parallaxSpeed]="0.05" class="-mt-[6%] h-[112%] w-full">
              <img
                [src]="p.cover"
                [alt]="i18n.pick(p.title)"
                class="h-full w-full object-cover"
                fetchpriority="high"
              />
            </div>
          </div>
        </div>

        <!-- Description + specs -->
        <section class="pb-16">
          <app-container>
            <div class="grid gap-12 lg:grid-cols-12 lg:gap-8">
              <div class="lg:col-span-7">
                @for (para of p.description; track $index) {
                  <p
                    appScrollReveal
                    class="mb-6 text-lg leading-relaxed text-ink/90"
                  >
                    {{ i18n.pick(para) }}
                  </p>
                }
              </div>

              <aside class="lg:col-span-4 lg:col-start-9">
                <dl class="border-t border-hairline">
                  @for (spec of p.specs; track $index) {
                    <div class="flex justify-between gap-6 border-b border-hairline py-4">
                      <dt class="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                        {{ i18n.pick(spec.label) }}
                      </dt>
                      <dd class="text-end text-sm text-ink">{{ i18n.pick(spec.value) }}</dd>
                    </div>
                  }
                </dl>

                <p class="mt-8 font-mono text-xs uppercase tracking-[0.15em] text-accent">
                  {{ i18n.pick(t.services) }}
                </p>
                <ul class="mt-4 space-y-2">
                  @for (svc of p.services; track $index) {
                    <li class="text-sm text-ink">{{ i18n.pick(svc) }}</li>
                  }
                </ul>
              </aside>
            </div>
          </app-container>
        </section>

        <!-- Gallery -->
        <section class="pb-16">
          <app-container>
            <div class="grid gap-6 sm:grid-cols-2">
              @for (img of p.gallery; track $index; let i = $index) {
                <div
                  appScrollReveal
                  revealType="line"
                  class="overflow-hidden"
                  [ngClass]="
                    i === 0
                      ? 'sm:col-span-2 aspect-[16/9]'
                      : 'aspect-[4/3]'
                  "
                >
                  <img
                    [src]="img"
                    [alt]="i18n.pick(p.title)"
                    loading="lazy"
                    decoding="async"
                    class="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
              }
            </div>
          </app-container>
        </section>

        <!-- Next project -->
        <section class="border-t border-hairline py-16 sm:py-20">
          <app-container>
            <a [routerLink]="['/projects', next().slug]" class="group block">
              <p class="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                {{ i18n.pick(t.next) }}
              </p>
              <div class="mt-4 flex items-baseline justify-between gap-6">
                <h2
                  class="t-section font-display font-medium tracking-[-0.03em] text-ink transition-colors group-hover:text-accent"
                >
                  {{ i18n.pick(next().title) }}
                </h2>
                <span class="dir-flip shrink-0 font-display text-3xl text-accent transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
              </div>
            </a>
          </app-container>
        </section>
      </article>
    } @else {
      <section class="flex min-h-[60vh] items-center">
        <app-container>
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">404</p>
          <h1 class="mt-4 font-display text-4xl font-medium text-ink sm:text-5xl">
            {{ i18n.pick(t.notFound) }}
          </h1>
          <a
            routerLink="/projects"
            class="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-ink hover:text-accent"
          >
            <span class="dir-flip">&larr;</span> {{ i18n.pick(t.back) }}
          </a>
        </app-container>
      </section>
    }
  `,
})
export class ProjectDetail {
  protected readonly i18n = inject(TranslationService);
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('slug') ?? '' },
  );

  protected readonly project = computed(() => getProject(this.slug()));

  /** Next project in the list, wrapping around. */
  protected readonly next = computed(() => {
    const current = this.project();
    if (!current) return PROJECTS[0];
    const idx = PROJECTS.findIndex((p) => p.slug === current.slug);
    return PROJECTS[(idx + 1) % PROJECTS.length];
  });

  protected readonly t = {
    back: { en: 'All works', ar: 'كل الأعمال' },
    services: { en: 'Services', ar: 'الخدمات' },
    next: { en: 'Next project', ar: 'المشروع التالي' },
    notFound: { en: 'Project not found.', ar: 'المشروع غير موجود.' },
  };

  constructor() {
    effect(() => {
      const p = this.project();
      if (p) {
        this.seo.update({
          title: this.i18n.pick(p.title),
          description: this.i18n.pick(p.summary),
          image: p.cover,
        });
      } else {
        this.seo.update({ title: 'Works' });
      }
    });
  }
}
