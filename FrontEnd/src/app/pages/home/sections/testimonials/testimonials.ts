import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Section } from '../../../../shared/ui/section/section';
import { Container } from '../../../../shared/ui/container/container';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal.directive';
import { TranslationService } from '../../../../core/services/translation.service';

interface Testimonial {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
}

/** Section 06 — Words: a lead client quote with two supporting notes. */
@Component({
  selector: 'app-testimonials',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Section, Container, ScrollReveal],
  template: `
    <app-section>
      <app-container>
        <div
          class="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.18em] text-muted"
        >
          <span class="text-accent">(06)</span>
          <span>{{ i18n.pick(t.eyebrow) }}</span>
          <span class="h-px flex-1 bg-hairline"></span>
        </div>

        <figure class="mt-12 max-w-4xl">
          <blockquote
            appScrollReveal
            class="font-display text-3xl font-medium leading-[1.25] tracking-[-0.02em] text-ink sm:text-4xl lg:text-5xl"
          >
            <span class="text-accent">&ldquo;</span>{{ i18n.pick(t.lead).quote
            }}<span class="text-accent">&rdquo;</span>
          </blockquote>
          <figcaption
            appScrollReveal
            [revealDelay]="120"
            class="mt-8 font-mono text-xs uppercase tracking-[0.15em] text-muted"
          >
            <span class="text-ink">{{ i18n.pick(t.lead).name }}</span> — {{ i18n.pick(t.lead).role }}
          </figcaption>
        </figure>

        <div class="mt-16 grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2">
          @for (item of i18n.pick(t.supporting); track item.name; let i = $index) {
            <figure appScrollReveal [revealDelay]="i * 90" class="bg-bg p-8 lg:p-10">
              <blockquote class="text-lg leading-relaxed text-ink">
                {{ item.quote }}
              </blockquote>
              <figcaption class="mt-6 font-mono text-xs uppercase tracking-[0.13em] text-muted">
                <span class="text-accent">{{ item.name }}</span> — {{ item.role }}
              </figcaption>
            </figure>
          }
        </div>
      </app-container>
    </app-section>
  `,
})
export class Testimonials {
  protected readonly i18n = inject(TranslationService);

  protected readonly t = {
    eyebrow: { en: 'Words', ar: 'آراء عملائنا' },
    lead: {
      en: {
        quote:
          'MSP held the architecture and the engineering to the same line. The result is a building that is beautiful, buildable, and exactly on budget.',
        name: 'Eng. Faisal Al-Otaibi',
        role: 'Director, Najd Development Authority',
      },
      ar: {
        quote:
          'وحّدت إم إس بي العمارة والهندسة على خطٍّ واحد، فجاء المبنى جميلاً وقابلاً للتنفيذ وضمن الميزانية تماماً.',
        name: 'م. فيصل العتيبي',
        role: 'مدير هيئة تطوير نجد',
      },
    },
    supporting: {
      en: [
        { quote: 'They resolved the difficult structural spans early, which kept the whole programme on track. A genuinely integrated team.', name: 'Lina Haddad', role: 'Project Lead, Marsa Holding' },
        { quote: 'Rigorous, responsive, and unusually calm under pressure. We hand them our most complex sites for a reason.', name: 'Omar Khan', role: 'Head of Assets, Qiddiya' },
      ],
      ar: [
        { quote: 'حسموا البحور الإنشائية الصعبة مبكراً، فبقي البرنامج كلّه في مساره. فريقٌ متكاملٌ بحق.', name: 'لينا حداد', role: 'قائدة مشروع — مرسى القابضة' },
        { quote: 'دقّةٌ وسرعةُ استجابةٍ وهدوءٌ لافتٌ تحت الضغط. نُسند إليهم أصعب مواقعنا لسبب.', name: 'عمر خان', role: 'رئيس الأصول — القدية' },
      ],
    },
  };
}
