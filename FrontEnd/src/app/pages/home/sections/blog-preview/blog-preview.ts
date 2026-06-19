import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Section } from '../../../../shared/ui/section/section';
import { Container } from '../../../../shared/ui/container/container';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal.directive';
import { TranslationService } from '../../../../core/services/translation.service';

interface Post {
  readonly title: string;
  readonly category: string;
  readonly date: string;
  readonly readingTime: string;
}

/** Section 09 — Journal: latest writing as an editorial index of rows. */
@Component({
  selector: 'app-blog-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Section, Container, ScrollReveal],
  template: `
    <app-section>
      <app-container>
        <div
          class="flex flex-wrap items-end justify-between gap-6 border-b border-hairline pb-8"
        >
          <div class="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <span class="text-accent">(09)</span>
            <span>{{ i18n.pick(t.eyebrow) }}</span>
          </div>
          <a
            href="/blog"
            class="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-ink"
          >
            {{ i18n.pick(t.all) }}
            <span class="dir-flip text-accent transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>

        <ul>
          @for (post of i18n.pick(t.posts); track post.title) {
            <li appScrollReveal class="group border-b border-hairline">
              <a
                href="/blog"
                class="grid grid-cols-12 items-baseline gap-4 py-8 transition-[padding] duration-500 hover:ps-3"
              >
                <span class="col-span-12 font-mono text-xs uppercase tracking-[0.12em] text-muted sm:col-span-3 lg:col-span-2">
                  {{ post.category }}
                </span>
                <h3
                  class="col-span-12 font-display text-2xl font-medium tracking-[-0.02em] text-ink transition-colors group-hover:text-accent sm:col-span-6 lg:col-span-7 sm:text-3xl"
                >
                  {{ post.title }}
                </h3>
                <span class="col-span-6 font-mono text-xs text-muted sm:col-span-2 sm:text-end lg:col-span-2">
                  {{ post.date }}
                </span>
                <span class="col-span-6 text-end font-mono text-xs text-muted sm:col-span-1">
                  {{ post.readingTime }}
                </span>
              </a>
            </li>
          }
        </ul>
      </app-container>
    </app-section>
  `,
})
export class BlogPreview {
  protected readonly i18n = inject(TranslationService);

  protected readonly t = {
    eyebrow: { en: 'Journal', ar: 'المدوّنة' },
    all: { en: 'All writing', ar: 'كل المقالات' },
    posts: {
      en: [
        { title: 'Designing for 50°C: passive cooling in the Gulf', category: 'Sustainability', date: 'May 2026', readingTime: '6 min' },
        { title: 'When structure becomes the architecture', category: 'Engineering', date: 'Apr 2026', readingTime: '8 min' },
        { title: 'Masterplanning for the city after oil', category: 'Urbanism', date: 'Mar 2026', readingTime: '5 min' },
      ],
      ar: [
        { title: 'التصميم عند الخمسين: التبريد السلبي في الخليج', category: 'الاستدامة', date: 'مايو ٢٠٢٦', readingTime: '٦ دقائق' },
        { title: 'حين يصبح الإنشاء عمارة', category: 'الهندسة', date: 'أبريل ٢٠٢٦', readingTime: '٨ دقائق' },
        { title: 'تخطيط المدن في عصر ما بعد النفط', category: 'العُمران', date: 'مارس ٢٠٢٦', readingTime: '٥ دقائق' },
      ],
    },
  };
}
