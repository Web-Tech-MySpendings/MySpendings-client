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
import { Observable, pipe, throwError, Subject } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  retry,
  retryWhen,
  tap,
  switchMap,
} from 'rxjs/operators';
import { API } from './../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { AlertService } from './alert.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private authService: AuthServiceService,
    private alertService: AlertService
  ) {}

  refreshingAccessToken: boolean;

  accessTokenRefreshed: Subject<any> = new Subject();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/token')) {
      return next.handle(req);
    } else {
      return next.handle(this.setHeader(req)).pipe(
        catchError((error) => {
          if (error.status == 401) {
            return this.refreshAccessToken().pipe(
              switchMap(() => {
                return next.handle(this.setHeader(req));
              })
            );
          } else {
            this.alertService.errorAlert('Error occured');
          }
          return throwError(error);
        })
      );
    }
  }

  refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable((observer) => {
        this.accessTokenRefreshed.subscribe(() => {
          // this code will run when the access token has been refreshed
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshingAccessToken = true;
      // we want to call a method in the auth service to send a request to refresh the access token
      return this.authService.tokenRefresh().pipe(
        tap(() => {
          console.log('Access Token Refreshed!');
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next();
        })
      );
    }
  }

  private setHeader(req) {
    return req.clone({
      setHeaders: {
        Authorization: this.cookieService.get('token'),
        'Content-Type': 'application/json',
      },
    });
  }
}
