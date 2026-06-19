import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Container } from '../../shared/ui/container/container';
import { ScrollReveal } from '../../shared/directives/scroll-reveal.directive';
import { TranslationService } from '../../core/services/translation.service';
import { SeoService } from '../../core/services/seo.service';

interface L {
  en: string;
  ar: string;
}

interface Post {
  title: L;
  excerpt: L;
  category: L;
  date: L;
  readingTime: L;
  image: string;
}

/** Journal index — editorial cards of articles (detail pages added later). */
@Component({
  selector: 'app-blog-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Container, ScrollReveal],
  template: `
    <section class="border-b border-hairline bg-bg pt-16 pb-14 sm:pt-20">
      <app-container>
        <div class="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span class="text-accent">{{ i18n.pick(t.eyebrow) }}</span>
          <span class="h-px flex-1 bg-hairline"></span>
          <span dir="ltr">{{ posts.length }}</span>
        </div>
        <h1
          appScrollReveal
          revealType="line"
          class="mt-8 max-w-4xl t-display font-display font-medium tracking-[-0.035em] text-ink"
        >
          {{ i18n.pick(t.title) }}
        </h1>
        <p appScrollReveal [revealDelay]="120" class="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {{ i18n.pick(t.intro) }}
        </p>
      </app-container>
    </section>

    <section class="py-16 sm:py-20">
      <app-container>
        <div class="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          @for (post of posts; track post.title.en; let i = $index) {
            <a href="/blog" appScrollReveal [revealDelay]="(i % 3) * 70" class="group block">
              <div appScrollReveal revealType="line" class="aspect-[16/10] overflow-hidden">
                <img
                  [src]="post.image"
                  [alt]="i18n.pick(post.title)"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                />
              </div>
              <div class="mt-4 flex items-center gap-3 font-mono text-xs text-muted">
                <span class="uppercase tracking-[0.12em] text-accent">{{ i18n.pick(post.category) }}</span>
                <span aria-hidden="true">·</span>
                <span>{{ i18n.pick(post.date) }}</span>
                <span aria-hidden="true">·</span>
                <span>{{ i18n.pick(post.readingTime) }}</span>
              </div>
              <h2 class="mt-3 font-display text-xl font-medium leading-snug tracking-[-0.015em] text-ink transition-colors group-hover:text-accent">
                {{ i18n.pick(post.title) }}
              </h2>
              <p class="mt-2 text-sm leading-relaxed text-muted">{{ i18n.pick(post.excerpt) }}</p>
            </a>
          }
        </div>
      </app-container>
    </section>
  `,
})
export class BlogPage {
  protected readonly i18n = inject(TranslationService);
  private readonly seo = inject(SeoService);

  protected readonly t = {
    eyebrow: { en: 'Journal', ar: 'المدوّنة' },
    title: { en: 'Ideas & field notes.', ar: 'أفكارٌ وملاحظاتٌ من الميدان.' },
    intro: {
      en: 'Writing on architecture, engineering, and building well in the Gulf.',
      ar: 'كتاباتٌ في العمارة والهندسة والبناء الجيّد في الخليج.',
    },
  };

  protected readonly posts: readonly Post[] = [
    {
      title: { en: 'Designing for 50°C: passive cooling in the Gulf', ar: 'التصميم عند الخمسين: التبريد السلبي في الخليج' },
      excerpt: { en: 'How orientation, mass, and shade do the heavy lifting before mechanical cooling.', ar: 'كيف يتحمّل التوجيه والكتلة والظل العبء الأكبر قبل التبريد الميكانيكي.' },
      category: { en: 'Sustainability', ar: 'الاستدامة' },
      date: { en: 'May 2026', ar: 'مايو ٢٠٢٦' },
      readingTime: { en: '6 min', ar: '٦ دقائق' },
      image: '/images/gal-2.jpg',
    },
    {
      title: { en: 'When structure becomes the architecture', ar: 'حين يصبح الإنشاء عمارة' },
      excerpt: { en: 'On exposed frames, honest spans, and letting engineering show.', ar: 'عن الهياكل المكشوفة والبحور الصادقة وإظهار الهندسة.' },
      category: { en: 'Engineering', ar: 'الهندسة' },
      date: { en: 'Apr 2026', ar: 'أبريل ٢٠٢٦' },
      readingTime: { en: '8 min', ar: '٨ دقائق' },
      image: '/images/proj-7.jpg',
    },
    {
      title: { en: 'Masterplanning the city after oil', ar: 'تخطيط المدن في عصر ما بعد النفط' },
      excerpt: { en: 'Density, walkability, and public life in the new Saudi districts.', ar: 'الكثافة والتمشّي والحياة العامة في الأحياء السعودية الجديدة.' },
      category: { en: 'Urbanism', ar: 'العُمران' },
      date: { en: 'Mar 2026', ar: 'مارس ٢٠٢٦' },
      readingTime: { en: '5 min', ar: '٥ دقائق' },
      image: '/images/proj-4.jpg',
    },
    {
      title: { en: 'The case for in-house engineering', ar: 'لماذا نُبقي الهندسة داخلياً' },
      excerpt: { en: 'Why we keep architects and engineers at the same table.', ar: 'لماذا نُبقي المعماريين والمهندسين إلى طاولةٍ واحدة.' },
      category: { en: 'Practice', ar: 'المكتب' },
      date: { en: 'Feb 2026', ar: 'فبراير ٢٠٢٦' },
      readingTime: { en: '4 min', ar: '٤ دقائق' },
      image: '/images/proj-5.jpg',
    },
    {
      title: { en: 'Detailing a desert façade', ar: 'تفصيل واجهةٍ صحراوية' },
      excerpt: { en: 'Materials and joints that survive heat, dust, and time.', ar: 'موادٌ ووصلاتٌ تصمد أمام الحرارة والغبار والزمن.' },
      category: { en: 'Detail', ar: 'التفاصيل' },
      date: { en: 'Jan 2026', ar: 'يناير ٢٠٢٦' },
      readingTime: { en: '7 min', ar: '٧ دقائق' },
      image: '/images/proj-1.jpg',
    },
    {
      title: { en: 'Building for Vision 2030', ar: 'البناء لرؤية ٢٠٣٠' },
      excerpt: { en: 'Lessons from working across giga-projects at speed and scale.', ar: 'دروسٌ من العمل في المشاريع العملاقة بسرعةٍ واتّساع.' },
      category: { en: 'Practice', ar: 'المكتب' },
      date: { en: 'Dec 2025', ar: 'ديسمبر ٢٠٢٥' },
      readingTime: { en: '6 min', ar: '٦ دقائق' },
      image: '/images/proj-8.jpg',
    },
  ];

  constructor() {
    this.seo.update({
      title: 'Journal',
      description: 'Writing on architecture, engineering, and building in the Gulf — from MSP Consultants.',
    });
  }
}
