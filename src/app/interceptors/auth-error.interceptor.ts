import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

const PUBLIC_ROUTES = ['/auth/signin', '/auth/signup', '/auth/forgot-password'];

export const AuthErrorInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const isApi = request.url.startsWith(environment.apiUrl);
      const isPublicRoute = PUBLIC_ROUTES.some(route => request.url.includes(route));

      if (isApi && !isPublicRoute && error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
