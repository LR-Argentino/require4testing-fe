import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthenticationService} from '../services/authentication-service';
import {catchError, throwError} from 'rxjs';
import {Router} from '@angular/router';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authSerivce = inject(AuthenticationService);
  const router = inject(Router);

  const publicUrls = [
    '/api/auth/login',
    '/api/public'
  ];

  const isPublicUrl = publicUrls.some((url) => req.url.includes(url));

  if (isPublicUrl) {
    return next(req);
  }

  const token = authSerivce.token();

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authSerivce.clearAuthState();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
