import {
  Directive,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Reveals an element with a subtle fade/rise as it scrolls into view.
 * Adds `.reveal` (or `.reveal-line` for a clip-wipe) immediately and
 * `.is-visible` once the element enters the viewport (see styles.scss).
 *
 * Visibility is detected with `getBoundingClientRect`, NOT IntersectionObserver:
 * the `line` variant clips itself to zero height, which would collapse an
 * observer's intersection area and prevent it from ever firing. A rect check
 * ignores `clip-path`, so it works for both variants.
 *
 * SSR-safe (renders final state on the server) and disabled under reduced motion.
 */
@Directive({
  selector: '[appScrollReveal]',
})
export class ScrollReveal implements OnDestroy {
  /** Optional stagger delay in milliseconds. */
  readonly revealDelay = input(0);

  /** `rise` fades/lifts the element; `line` clip-wipes it up (for headlines). */
  readonly revealType = input<'rise' | 'line'>('rise');

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private cleanup?: () => void;

  constructor() {
    if (!this.isBrowser) return;

    afterNextRender(() => {
      const el = this.host.nativeElement;
      el.classList.add(this.revealType() === 'line' ? 'reveal-line' : 'reveal');
      if (this.revealDelay()) {
        el.style.transitionDelay = `${this.revealDelay()}ms`;
      }

      let ticking = false;
      const reveal = () => {
        el.classList.add('is-visible');
        this.cleanup?.();
        this.cleanup = undefined;
      };
      const inView = () => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
      };
      const check = () => {
        ticking = false;
        if (inView()) reveal();
      };
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(check);
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      this.cleanup = () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };

      // Reveal immediately if already in view on load (e.g. above the fold).
      requestAnimationFrame(check);
    });
  }

  ngOnDestroy(): void {
    this.cleanup?.();
  }
}
