import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * On a 401, transparently refreshes the access token and retries the request
 * once. The access token is short-lived (15m); without this, any authenticated
 * write after expiry fails with "Unauthorized" even though the user is still
 * "logged in" (authGuard only checks token presence). If the refresh itself
 * fails, the user is logged out and sent to the login page.
 */
export const authRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthEndpoint =
        req.url.includes('/auth/login') || req.url.includes('/auth/refresh');

      if (error.status !== 401 || isAuthEndpoint) {
        return throwError(() => error);
      }

      return auth.refreshTokens().pipe(
        switchMap((newToken) =>
          next(
            req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } }),
          ),
        ),
        catchError((refreshError) => {
          auth.logout();
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};
