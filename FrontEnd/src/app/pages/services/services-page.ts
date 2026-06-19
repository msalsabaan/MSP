import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { Container } from '../../shared/ui/container/container';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { ScrollReveal } from '../../shared/directives/scroll-reveal.directive';
import { Cta } from '../home/sections/cta/cta';
import { TranslationService } from '../../core/services/translation.service';
import { SeoService } from '../../core/services/seo.service';

interface L {
  en: string;
  ar: string;
}

interface Discipline {
  no: string;
  title: L;
  summary: L;
  deliverables: readonly L[];
  image: string;
}

/** Services / Disciplines page — deep-dive into the five practices + process. */
@Component({
  selector: 'app-services-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, Container, Section, SectionHeading, ScrollReveal, Cta],
  template: `
    <!-- Header -->
    <section class="border-b border-hairline bg-bg pt-16 pb-14 sm:pt-20">
      <app-container>
        <div class="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span class="text-accent">{{ i18n.pick(t.eyebrow) }}</span>
          <span class="h-px flex-1 bg-hairline"></span>
          <span dir="ltr">05</span>
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

    <!-- Disciplines as alternating rows -->
    <app-section>
      <app-container>
        <div class="flex flex-col gap-20 lg:gap-28">
          @for (d of disciplines; track d.no; let i = $index) {
            <div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <!-- image -->
              <div
                appScrollReveal
                revealType="line"
                class="aspect-[4/3] overflow-hidden"
                [ngClass]="{ 'lg:order-2': i % 2 === 1 }"
              >
                <img
                  [src]="d.image"
                  [alt]="i18n.pick(d.title)"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
                />
              </div>

              <!-- text -->
              <div appScrollReveal [ngClass]="{ 'lg:order-1': i % 2 === 1 }">
                <span class="font-mono text-sm text-accent">{{ d.no }}</span>
                <h2 class="mt-3 t-section font-display font-medium tracking-[-0.03em] text-ink">
                  {{ i18n.pick(d.title) }}
                </h2>
                <p class="mt-5 max-w-md text-lg leading-relaxed text-muted">
                  {{ i18n.pick(d.summary) }}
                </p>
                <ul class="mt-7 grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2">
                  @for (item of d.deliverables; track item.en) {
                    <li class="bg-bg px-4 py-3 font-mono text-xs uppercase tracking-[0.1em] text-ink">
                      {{ i18n.pick(item) }}
                    </li>
                  }
                </ul>
              </div>
            </div>
          }
        </div>
      </app-container>
    </app-section>

    <!-- Process -->
    <app-section tone="surface">
      <app-container>
        <app-section-heading
          index="—"
          [eyebrow]="i18n.pick(t.processEyebrow)"
          [title]="i18n.pick(t.processTitle)"
          [intro]="i18n.pick(t.processIntro)"
        />
        <ol class="mt-14 grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          @for (step of process; track step.no; let i = $index) {
            <li appScrollReveal [revealDelay]="i * 60" class="bg-bg p-7 lg:p-8">
              <span class="font-mono text-xs text-accent">{{ step.no }}</span>
              <h3 class="mt-3 font-display text-xl font-medium text-ink">{{ i18n.pick(step.title) }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-muted">{{ i18n.pick(step.body) }}</p>
            </li>
          }
        </ol>
      </app-container>
    </app-section>

    <app-cta />
  `,
})
export class ServicesPage {
  protected readonly i18n = inject(TranslationService);
  private readonly seo = inject(SeoService);

  protected readonly t = {
    eyebrow: { en: 'Disciplines', ar: 'التخصصات' },
    title: { en: 'Five disciplines, one team.', ar: 'خمسة تخصّصات، فريقٌ واحد.' },
    intro: {
      en: 'Every capability to take a project from first idea to handover — coordinated in-house, so design and engineering never pull apart.',
      ar: 'كلُّ ما يلزم لأخذ المشروع من الفكرة الأولى إلى التسليم — بتنسيقٍ داخلي، فلا ينفصل التصميم عن الهندسة.',
    },
    processEyebrow: { en: 'Process', ar: 'منهجية العمل' },
    processTitle: { en: 'From brief to handover.', ar: 'من الفكرة إلى التسليم.' },
    processIntro: {
      en: 'A clear, milestone-driven path that keeps cost, programme, and quality in sight at every stage.',
      ar: 'مسارٌ واضحٌ بمحطّاتٍ محدّدة يُبقي التكلفة والبرنامج والجودة تحت العين في كل مرحلة.',
    },
  };

  protected readonly disciplines: readonly Discipline[] = [
    {
      no: '01',
      title: { en: 'Architecture', ar: 'العمارة' },
      summary: {
        en: 'Concept, schematic, and detailed design for buildings of every scale and use.',
        ar: 'تصميمٌ مفاهيميّ وتخطيطيّ وتفصيليّ للمباني على اختلاف أحجامها واستخداماتها.',
      },
      deliverables: [
        { en: 'Concept design', ar: 'التصميم المفاهيمي' },
        { en: 'Schematic design', ar: 'التصميم التخطيطي' },
        { en: 'Construction documents', ar: 'مخطّطات التنفيذ' },
        { en: 'Façade & detailing', ar: 'الواجهات والتفاصيل' },
      ],
      image: '/images/proj-1.jpg',
    },
    {
      no: '02',
      title: { en: 'Structural Engineering', ar: 'الهندسة الإنشائية' },
      summary: {
        en: 'Efficient, resilient structures in concrete, steel, and hybrid systems — optimised for cost and carbon.',
        ar: 'منشآتٌ متينةٌ واقتصادية بأنظمةٍ خرسانية وفولاذية وهجينة — محسّنةٌ للتكلفة والكربون.',
      },
      deliverables: [
        { en: 'Structural analysis', ar: 'التحليل الإنشائي' },
        { en: 'Foundation design', ar: 'تصميم الأساسات' },
        { en: 'Steel & concrete detailing', ar: 'تفصيل الفولاذ والخرسانة' },
        { en: 'Peer review', ar: 'المراجعة الفنية' },
      ],
      image: '/images/proj-7.jpg',
    },
    {
      no: '03',
      title: { en: 'MEP Engineering', ar: 'الهندسة الكهروميكانيكية' },
      summary: {
        en: 'Mechanical, electrical, and plumbing systems designed for performance, efficiency, and comfort.',
        ar: 'أنظمةٌ ميكانيكية وكهربائية وصحّية مصمّمة للأداء والكفاءة والراحة.',
      },
      deliverables: [
        { en: 'HVAC design', ar: 'تصميم التكييف' },
        { en: 'Electrical & lighting', ar: 'الكهرباء والإضاءة' },
        { en: 'Plumbing & drainage', ar: 'السباكة والصرف' },
        { en: 'Energy modelling', ar: 'نمذجة الطاقة' },
      ],
      image: '/images/gal-2.jpg',
    },
    {
      no: '04',
      title: { en: 'Urban Planning', ar: 'التخطيط العمراني' },
      summary: {
        en: 'Masterplans and mixed-use frameworks that shape how neighbourhoods live, move, and grow.',
        ar: 'مخطّطاتٌ شاملة وأطرٌ متعددة الاستخدامات تصوغ كيف تعيش الأحياء وتتحرّك وتنمو.',
      },
      deliverables: [
        { en: 'Masterplanning', ar: 'التخطيط الشامل' },
        { en: 'Feasibility studies', ar: 'دراسات الجدوى' },
        { en: 'Public realm', ar: 'الفضاء العام' },
        { en: 'Design guidelines', ar: 'أدلّة التصميم' },
      ],
      image: '/images/proj-4.jpg',
    },
    {
      no: '05',
      title: { en: 'Project Management', ar: 'إدارة المشاريع' },
      summary: {
        en: 'Cost, programme, and site supervision from groundbreaking to handover — your single point of accountability.',
        ar: 'إدارةُ التكلفة والبرنامج والإشراف الموقعي من البدء حتى التسليم — نقطةُ مسؤوليةٍ واحدة.',
      },
      deliverables: [
        { en: 'Cost management', ar: 'إدارة التكلفة' },
        { en: 'Programme control', ar: 'ضبط البرنامج' },
        { en: 'Site supervision', ar: 'الإشراف الموقعي' },
        { en: 'Handover', ar: 'التسليم' },
      ],
      image: '/images/gal-1.jpg',
    },
  ];

  protected readonly process: readonly { no: string; title: L; body: L }[] = [
    {
      no: '01',
      title: { en: 'Brief & feasibility', ar: 'الفكرة والجدوى' },
      body: { en: 'We frame the problem, test the site, and set the budget and ambition.', ar: 'نصوغ المسألة، ونختبر الموقع، ونحدّد الميزانية والطموح.' },
    },
    {
      no: '02',
      title: { en: 'Concept design', ar: 'التصميم المفاهيمي' },
      body: { en: 'A clear architectural idea, tested early against structure and cost.', ar: 'فكرةٌ معماريةٌ واضحة، تُختبر مبكراً أمام الإنشاء والتكلفة.' },
    },
    {
      no: '03',
      title: { en: 'Detailed design', ar: 'التصميم التفصيلي' },
      body: { en: 'Architecture and engineering resolved together, down to the junction.', ar: 'تُحلّ العمارة والهندسة معاً، حتى أدقّ وصلة.' },
    },
    {
      no: '04',
      title: { en: 'Documentation', ar: 'إعداد المستندات' },
      body: { en: 'Coordinated drawings and specifications ready for tender.', ar: 'مخطّطاتٌ ومواصفاتٌ منسّقة جاهزة للطرح.' },
    },
    {
      no: '05',
      title: { en: 'Construction', ar: 'التنفيذ' },
      body: { en: 'We supervise on site, protecting design intent, cost, and programme.', ar: 'نُشرف في الموقع، حمايةً لنيّة التصميم والتكلفة والبرنامج.' },
    },
    {
      no: '06',
      title: { en: 'Handover', ar: 'التسليم' },
      body: { en: 'A building delivered complete, documented, and ready to perform.', ar: 'مبنىً يُسلَّم مكتملاً وموثّقاً وجاهزاً للأداء.' },
    },
  ];

  constructor() {
    this.seo.update({
      title: 'Disciplines',
      description:
        'Architecture, structural and MEP engineering, urban planning, and project management — the five in-house disciplines of MSP Consultants.',
    });
  }
}
