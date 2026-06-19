import { RenderMode, ServerRoute } from '@angular/ssr';
import { PROJECTS } from './core/data/projects';

export const serverRoutes: ServerRoute[] = [
  {
    // Prerender a static page for every project slug.
    path: 'projects/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PROJECTS.map((p) => ({ slug: p.slug })),
  },
  {
    // Admin CMS + auth: dynamic, auth-gated — client-rendered, never prerendered.
    path: 'admin',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'auth/**',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
