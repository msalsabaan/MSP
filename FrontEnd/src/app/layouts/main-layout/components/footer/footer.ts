import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Container } from '../../../../shared/ui/container/container';
import { TranslationService } from '../../../../core/services/translation.service';

interface NavLink {
  readonly path: string;
  readonly label: { en: string; ar: string };
}

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Container],
  template: `
    <footer class="border-t border-hairline bg-surface">
      <app-container>
        <div class="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a
              routerLink="/"
              class="font-display text-3xl font-semibold tracking-[-0.02em] text-ink"
            >
              MSP
            </a>
            <p class="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {{ i18n.pick(tagline) }}
            </p>
            <p class="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-muted">
              {{ i18n.pick(city) }}
            </p>
          </div>

          <div>
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {{ i18n.pick(navHeading) }}
            </p>
            <ul class="mt-5 space-y-3">
              @for (item of links; track item.path) {
                <li>
                  <a
                    [routerLink]="item.path"
                    class="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {{ i18n.pick(item.label) }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <div>
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {{ i18n.pick(contactHeading) }}
            </p>
            <ul class="mt-5 space-y-3 text-sm text-muted">
              <li>
                <a href="mailto:hello@msp.sa" class="transition-colors hover:text-ink">hello&#64;msp.sa</a>
              </li>
              <li dir="ltr">+966 11 000 0000</li>
              <li>{{ i18n.pick(address) }}</li>
            </ul>
          </div>
        </div>

        <div
          class="flex flex-col gap-3 border-t border-hairline py-6 font-mono text-xs uppercase tracking-[0.12em] text-muted sm:flex-row sm:items-center sm:justify-between"
        >
          <p>© {{ year }} {{ i18n.pick(legal) }}</p>
          <p>{{ i18n.pick(strap) }}</p>
        </div>
      </app-container>
    </footer>
  `,
})
export class Footer {
  protected readonly i18n = inject(TranslationService);
  protected readonly year = 2026;

  protected readonly tagline = {
    en: 'An architecture & engineering consultancy designing buildings, infrastructure, and cities that endure.',
    ar: 'بيتُ خبرةٍ في العمارة والهندسة، نُصمّم مبانٍ وبنىً تحتيةً ومدناً تدوم.',
  };
  protected readonly city = { en: 'Riyadh · Saudi Arabia', ar: 'الرياض · المملكة العربية السعودية' };
  protected readonly navHeading = { en: 'Navigate', ar: 'تصفّح' };
  protected readonly contactHeading = { en: 'Contact', ar: 'تواصل معنا' };
  protected readonly address = { en: 'King Fahd Road, Riyadh', ar: 'طريق الملك فهد، الرياض' };
  protected readonly legal = { en: 'MSP Consultants', ar: 'إم إس بي للاستشارات' };
  protected readonly strap = {
    en: 'Architecture · Structure · Infrastructure',
    ar: 'عمارة · إنشاءات · بنية تحتية',
  };

  protected readonly links: readonly NavLink[] = [
    { path: '/about', label: { en: 'Practice', ar: 'المكتب' } },
    { path: '/services', label: { en: 'Disciplines', ar: 'التخصصات' } },
    { path: '/projects', label: { en: 'Works', ar: 'الأعمال' } },
    { path: '/team', label: { en: 'Studio', ar: 'الفريق' } },
    { path: '/blog', label: { en: 'Journal', ar: 'المدوّنة' } },
    { path: '/careers', label: { en: 'Careers', ar: 'الوظائف' } },
  ];
}
