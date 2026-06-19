import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Section } from '../../../../shared/ui/section/section';
import { Container } from '../../../../shared/ui/container/container';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal.directive';
import { TranslationService } from '../../../../core/services/translation.service';

interface Principle {
  readonly no: string;
  readonly title: string;
  readonly description: string;
}

/** Section 05 — Approach: the studio's working principles. */
@Component({
  selector: 'app-why-us',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Section, Container, ScrollReveal],
  template: `
    <app-section tone="surface">
      <app-container>
        <div class="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div class="lg:col-span-4">
            <div class="lg:sticky lg:top-28">
              <div
                class="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.18em] text-muted"
              >
                <span class="text-accent">(05)</span>
                <span>{{ i18n.pick(t.eyebrow) }}</span>
              </div>
              <h2
                appScrollReveal
                revealType="line"
                class="mt-6 t-section font-display font-medium tracking-[-0.03em] text-ink"
              >
                {{ i18n.pick(t.headingPre)
                }}<span class="italic text-accent">{{ i18n.pick(t.headingEm) }}</span>
              </h2>
              <p appScrollReveal [revealDelay]="120" class="mt-6 max-w-sm text-muted">
                {{ i18n.pick(t.sub) }}
              </p>
            </div>
          </div>

          <ol class="lg:col-span-7 lg:col-start-6">
            @for (item of i18n.pick(t.principles); track item.no; let last = $last) {
              <li
                appScrollReveal
                class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-hairline py-8"
                [class.border-b]="last"
              >
                <span class="font-mono text-sm text-accent">{{ item.no }}</span>
                <h3 class="font-display text-2xl font-medium text-ink sm:text-3xl">
                  {{ item.title }}
                </h3>
                <p class="col-start-2 max-w-md leading-relaxed text-muted">
                  {{ item.description }}
                </p>
              </li>
            }
          </ol>
        </div>
      </app-container>
    </app-section>
  `,
})
export class WhyUs {
  protected readonly i18n = inject(TranslationService);

  protected readonly t = {
    eyebrow: { en: 'Approach', ar: 'منهجنا' },
    headingPre: { en: 'How we ', ar: 'كيف ' },
    headingEm: { en: 'work.', ar: 'نعمل.' },
    sub: {
      en: 'Four convictions that hold whether we are detailing a stair or planning a district.',
      ar: 'أربعُ قناعاتٍ ترافقنا في كل مشروع، من تفصيل دَرَجٍ إلى تخطيط حيٍّ كامل.',
    },
    principles: {
      en: [
        { no: '01', title: 'Integrated by default', description: 'Architects and engineers sit together from day one, so design and structure are never an argument — they are one decision.' },
        { no: '02', title: 'Evidence over ego', description: 'Every move is tested against site, climate, code, and cost. The brief leads; the drawing follows.' },
        { no: '03', title: 'Detail is the design', description: 'A building is only as good as its junctions. We resolve the hard parts before they reach the site.' },
        { no: '04', title: 'Built to endure', description: 'We design for the long life of a place — durable, efficient, and quietly generous to the people who use it.' },
      ],
      ar: [
        { no: '01', title: 'التكامل منذ البداية', description: 'يعمل المعماري والمهندس جنباً إلى جنب منذ اليوم الأول، فيغدو التصميم والإنشاء قراراً واحداً لا خياراً متعارضاً.' },
        { no: '02', title: 'الدليل قبل الرأي', description: 'نختبر كلَّ قرارٍ بالموقع والمناخ والكود والتكلفة؛ المتطلّبات تقود، والرسم يتبع.' },
        { no: '03', title: 'التفصيل هو التصميم', description: 'قيمةُ المبنى في تفاصيله. نحسم المسائل الصعبة قبل أن تصل إلى الموقع.' },
        { no: '04', title: 'نبني ليدوم', description: 'نُصمّم لعمرٍ طويلٍ للمكان: متانةٌ وكفاءةٌ وكرمٌ هادئٌ تجاه من يستخدمه.' },
      ],
    },
  };
}
