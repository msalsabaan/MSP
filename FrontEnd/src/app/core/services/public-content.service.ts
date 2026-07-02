import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ApiResponse, PaginatedResponse } from '../models/api-response.model';
import { Project } from '../data/projects';
import {
  BlogPostItem,
  CompanyInfo,
  Partner,
  ServiceItem,
  TeamMember,
  Testimonial,
} from '../models/content.model';

type Params = Record<string, string | number | boolean>;

/**
 * Read-only client for the public website. Wraps `ApiService`, hits the public
 * (unauthenticated) GET endpoints, and unwraps the backend `{ data }` /
 * `{ data, total, … }` envelopes. Returns the same view-model shapes the public
 * components render, so templates change minimally when switching off the old
 * static `core/data` arrays.
 */
@Injectable({ providedIn: 'root' })
export class PublicContentService {
  private readonly api = inject(ApiService);

  /** Unwraps a list envelope (works for paginated and plain `{ data: [] }`). */
  private list<T>(path: string, params?: Params): Observable<T[]> {
    return this.api
      .get<PaginatedResponse<T>>(path, params)
      .pipe(map((r) => r.data ?? []));
  }

  /** Unwraps a single-resource `{ data }` envelope. */
  private one<T>(path: string): Observable<T> {
    return this.api.get<ApiResponse<T>>(path).pipe(map((r) => r.data));
  }

  projects(): Observable<Project[]> {
    return this.list<Project>('projects', { pageSize: 100 });
  }

  featuredProjects(): Observable<Project[]> {
    return this.list<Project>('projects', { featured: 'true', pageSize: 8 });
  }

  projectBySlug(slug: string): Observable<Project> {
    return this.one<Project>(`projects/slug/${encodeURIComponent(slug)}`);
  }

  services(): Observable<ServiceItem[]> {
    return this.list<ServiceItem>('services', { pageSize: 100 });
  }

  team(): Observable<TeamMember[]> {
    return this.list<TeamMember>('team', { pageSize: 100 });
  }

  testimonials(): Observable<Testimonial[]> {
    return this.list<Testimonial>('testimonials', { pageSize: 100 });
  }

  partners(): Observable<Partner[]> {
    return this.list<Partner>('partners', { pageSize: 100 });
  }

  posts(): Observable<BlogPostItem[]> {
    return this.list<BlogPostItem>('blog', { pageSize: 100 });
  }

  postBySlug(slug: string): Observable<BlogPostItem> {
    return this.one<BlogPostItem>(`blog/slug/${encodeURIComponent(slug)}`);
  }

  /** All settings as one object (companyName, tagline, phone, email, social, …). */
  settings(): Observable<CompanyInfo> {
    return this.one<CompanyInfo | null>('settings').pipe(map((v) => v ?? {}));
  }
}
