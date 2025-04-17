import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpRequest, HttpHandler, HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService:AuthService, private router: Router){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       const authToken = this.authService.getAuthToken();
       const refreshToken = this.authService.getRefreshToken();
  
       const excludedUrls = ['/authenticate', '/register'];
  
       if (excludedUrls.some(url => request.url.includes(url))) {
         return next.handle(request);
       }
  
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
  
      return next.handle(authRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            // Redirect to the login page on 403 Forbidden error
            this.router.navigate(['/login']);
          }
          return throwError(() => error); // Rethrow the error
        })
      );;
    }
}