//import { baseUrl } from '../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, ReplaySubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { API } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(data): Observable<any> {
    return this.http.post(API.baseUrl + '/login', data, {
      observe: 'response',
    }); //login to local server from ex7.1
  }

  register(data): Observable<any> {
    return this.http.post(API.baseUrl + '/register', data, {
      observe: 'response',
    });
  }

  tokenRefresh(): Observable<any> {
    return this.http
      .get(API.baseUrl + '/token', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.cookieService.get('refreshToken'),
        }),
        observe: 'response',
      })
      .pipe(
        map((result) => {
          if (result.status === 200) {
            this.cookieService.set('token', result.body['token']);
            this.cookieService.set('refreshToken', result.body['refreshToken']);
          }
          return result;
        })
      );
  }
}


/*
    alter/insert        put, also einfügen von einem spending. im body den value das date (und category / comment -> optional);
    alter/delete        delete, löschen von spending         
    alter/update        patch, bearbeiten von spending
    /spendings          get, um alle spendings zu erhalten 
    /spendings/filter   get, nach category, value und date 

*/