import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Container } from '../../shared/ui/container/container';
import { Button } from '../../shared/ui/button/button';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Container, Button],
  template: `
    <section class="flex min-h-[70vh] items-center text-center">
      <app-container>
        <p class="font-display text-7xl font-bold text-accent">404</p>
        <h1 class="mt-4 text-3xl font-bold text-ink">Page not found</h1>
        <p class="mx-auto mt-3 max-w-md text-muted">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <a routerLink="/" class="mt-8 inline-block">
          <app-button>Back to home</app-button>
        </a>
      </app-container>
    </section>
  `,
})
export class NotFound {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({ title: 'Page not found' });
  }
}
