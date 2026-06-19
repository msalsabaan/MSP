import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Section } from '../../../../shared/ui/section/section';
import { Container } from '../../../../shared/ui/container/container';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal.directive';
import { TranslationService } from '../../../../core/services/translation.service';

interface Member {
  readonly name: string;
  readonly role: string;
  readonly image: string;
}

/** Section 07 — Studio: the people behind the practice. */
@Component({
  selector: 'app-team',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Section, Container, SectionHeading, ScrollReveal],
  template: `
    <app-section tone="surface">
      <app-container>
        <app-section-heading
          index="07"
          [eyebrow]="i18n.pick(t.eyebrow)"
          [title]="i18n.pick(t.title)"
          [intro]="i18n.pick(t.intro)"
        />

        <div class="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          @for (member of i18n.pick(t.members); track member.image; let i = $index) {
            <article appScrollReveal [revealDelay]="i * 70" class="group">
              <div appScrollReveal revealType="line" class="aspect-[4/5] overflow-hidden">
                <img
                  [src]="member.image"
                  [alt]="member.name"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                />
              </div>
              <h3
                class="mt-5 font-display text-xl font-medium text-ink transition-colors group-hover:text-accent"
              >
                {{ member.name }}
              </h3>
              <p class="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted">
                {{ member.role }}
              </p>
            </article>
          }
        </div>
      </app-container>
    </app-section>
  `,
})
export class Team {
  protected readonly i18n = inject(TranslationService);

  protected readonly t = {
    eyebrow: { en: 'Studio', ar: 'الفريق' },
    title: { en: 'A senior team, by design.', ar: 'نخبةٌ من الخبراء، باختيارٍ دقيق.' },
    intro: {
      en: 'Principals lead every commission — supported by a tight group of architects and engineers.',
      ar: 'يقود الشركاءُ كلَّ مشروعٍ بأنفسهم، تسندهم نخبةٌ من المعماريين والمهندسين.',
    },
    members: {
      en: [
        { name: 'Mansour S. Pasha', role: 'Founding Principal · Architect', image: '/images/team-1.jpg' },
        { name: 'Dr. Reem Al-Sudairi', role: 'Principal · Structures', image: '/images/team-2.jpg' },
        { name: 'Karim Nasser', role: 'Associate · MEP', image: '/images/team-3.jpg' },
        { name: 'Hana Yousef', role: 'Associate · Urban Design', image: '/images/team-4.jpg' },
      ],
      ar: [
        { name: 'منصور س. باشا', role: 'الشريك المؤسس · معماري', image: '/images/team-1.jpg' },
        { name: 'د. ريم السديري', role: 'شريك · هندسة إنشائية', image: '/images/team-2.jpg' },
        { name: 'كريم ناصر', role: 'شريك مشارك · كهروميكانيكا', image: '/images/team-3.jpg' },
        { name: 'هناء يوسف', role: 'شريك مشارك · تصميم عمراني', image: '/images/team-4.jpg' },
      ],
    },
  };
}
