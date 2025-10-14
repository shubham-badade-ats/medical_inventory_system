// token.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './app/auth/auth.service';
// ✅ Correct relative path (adjust if needed)

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);



  const token = localStorage.getItem('jwtToken'); // or 'accessToken' if your login uses that key

  let clonedReq = req;

  // ✅ Add Authorization header if token exists
  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // 🧠 Handle 401 with expired token
      if (error.status === 401 && token && authService.isTokenExpired(token)) {
        console.warn('Access token expired, attempting refresh...');

        return authService.refreshAccessToken().pipe(
          switchMap(() => {
            const newToken = localStorage.getItem('jwtToken');
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next(newReq);
          }),
          catchError((refreshErr: HttpErrorResponse) => {
            console.error('Refresh failed:', refreshErr);
            authService.logout();
            router.navigate(['/login']);
            return throwError(() => refreshErr);
          })
        );
      }

      // 🧾 Handle other HTTP errors normally
      return throwError(() => error);
    })
  );
};
