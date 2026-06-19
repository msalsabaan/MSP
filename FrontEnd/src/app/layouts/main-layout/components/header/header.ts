import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Container } from '../../../../shared/ui/container/container';
import { ThemeToggle } from '../../../../shared/ui/theme-toggle/theme-toggle';
import { LangToggle } from '../../../../shared/ui/lang-toggle/lang-toggle';
import { RiyadhClock } from '../../../../shared/ui/riyadh-clock/riyadh-clock';
import { TranslationService } from '../../../../core/services/translation.service';

interface NavLink {
  readonly path: string;
  readonly label: { en: string; ar: string };
}

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    Container,
    ThemeToggle,
    LangToggle,
    RiyadhClock,
  ],
  template: `
    <header
      class="sticky top-0 z-50 border-b border-hairline bg-bg/80 backdrop-blur-md"
    >
      <app-container>
        <nav class="flex h-20 items-center justify-between gap-6">
          <a routerLink="/" class="flex items-baseline gap-2.5 text-ink">
            <span class="font-display text-2xl font-semibold tracking-[-0.02em]">
              MSP
            </span>
            <span
              class="hidden font-mono text-[0.65rem] uppercase leading-tight tracking-[0.18em] text-muted sm:block"
              [innerHTML]="i18n.pick(brandSub)"
            ></span>
          </a>

          <ul
            class="hidden items-center gap-9 font-mono text-xs uppercase tracking-[0.12em] md:flex"
          >
            @for (item of navItems; track item.path) {
              <li>
                <a
                  [routerLink]="item.path"
                  routerLinkActive="text-ink"
                  [routerLinkActiveOptions]="{ exact: item.path === '/' }"
                  class="text-muted transition-colors hover:text-ink"
                >
                  {{ i18n.pick(item.label) }}
                </a>
              </li>
            }
          </ul>

          <div class="flex items-center gap-4">
            <app-riyadh-clock class="hidden lg:block" />
            <span class="hidden h-5 w-px bg-hairline lg:block" aria-hidden="true"></span>
            <app-lang-toggle />
            <app-theme-toggle />
          </div>
        </nav>
      </app-container>
    </header>
  `,
})
export class Header {
  protected readonly i18n = inject(TranslationService);

  protected readonly brandSub = {
    en: 'Architecture<br />+ Engineering',
    ar: 'عمارة<br />وهندسة',
  };

  protected readonly navItems: readonly NavLink[] = [
    { path: '/about', label: { en: 'Practice', ar: 'المكتب' } },
    { path: '/services', label: { en: 'Disciplines', ar: 'التخصصات' } },
    { path: '/projects', label: { en: 'Works', ar: 'الأعمال' } },
    { path: '/team', label: { en: 'Studio', ar: 'الفريق' } },
    { path: '/blog', label: { en: 'Journal', ar: 'المدوّنة' } },
    { path: '/contact', label: { en: 'Contact', ar: 'تواصل معنا' } },
  ];
}
