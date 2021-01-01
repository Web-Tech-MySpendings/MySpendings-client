import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, map, retry, retryWhen, tap } from 'rxjs/operators';
import { API } from './../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private authService: AuthServiceService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // intercept authentification error
    if (!req.url.endsWith('/token')) {
      let token: string = this.cookieService.get('token');
      let decoded: any = jwt_decode(token);
      let current_time = Date.now() / 1000;
      console.log(decoded);
      if (decoded.exp < current_time) {
        this.authService.tokenRefresh().subscribe((result) => {
          console.log('checking status');
          if (result.status === 200) {
            this.cookieService.set('token', result.body['token']);
            this.cookieService.set('refreshToken', result.body['refreshToken']);
          }
          return next.handle(this.setHeader(req));
        });
      } else {
        return next.handle(this.setHeader(req)).pipe(
          catchError((error: any) => {
            return throwError(error);
          })
        );
      }
    } else {
      return next.handle(req);
    }
  }

  private setHeader(req) {
    req = req.clone({
      headers: req.headers.set(
        'Authorization',
        this.cookieService.get('token')
      ),
    });
    req = req.clone({
      headers: req.headers.set('Content-Type', 'application/json'),
    });
    return req;
  }

  // private checkForInvalidAccess(response): boolean {
  //   if (response.status == 401) {
  //     return true;
  //   }
  //   return false;
  // }
}
