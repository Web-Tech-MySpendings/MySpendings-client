import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { API } from './../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllSpendings(): Observable<any> {
    return this.http.get(API.baseUrl + '/spendings', { observe: 'response' });
  }

  getFilteredSpendings(filterParams: Object): Observable<any> {
    return this.http.get(
      API.baseUrl +
        '/filter/?filterParams=' +
        encodeURIComponent(JSON.stringify(filterParams)),
      { observe: 'response' }
    );
  }

  //filter params only start and end date 
  getSpendingsForMonth(filterParams: Object): Observable<any> {
    return this.http.get(
      API.baseUrl +
        '/filter/date/?filterParams=' +
        encodeURIComponent(JSON.stringify(filterParams)),
      { observe: 'response' }
    );
  }

  getUserData(): Observable<any> {
    return this.http.get(API.baseUrl + '/user', { observe: 'response' });
  }

  updateUser(data: Object): Observable<any> {
    return this.http.patch(API.baseUrl + '/user', data, {
      observe: 'response',
    });
  }

  changePw(data: Object): Observable<any> {
    return this.http.patch(API.baseUrl + '/pw', data, { observe: 'response' });
  }

  insertSpending(data: Object): Observable<any> {
    return this.http.put(API.baseUrl + '/alter', data, { observe: 'response' });
  }

}
