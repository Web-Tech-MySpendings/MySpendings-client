import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { API } from './../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {


  private tokenRefresh(callbackFunction): void {
    this.http.get(API.baseUrl + '/token', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get("refreshToken")
      }),
      observe: "response"
    }).subscribe(result => {
      if (result.status === 200) {
        this.cookieService.set('token', result.body['token']);
        this.cookieService.set('refreshToken', result.body['refreshToken']);
        callbackFunction();
      }
    })
  }

  private checkForInvalidAccess(response): boolean {
    if (response.status === 401) {
      return true;
    }
    return false;
  }

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getAllSpendings(): Observable<any> {

    //tokenRefresh();

    return this.http.get(API.baseUrl + '/spendings', {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get("token")
      }),
      observe: "response"

    }).pipe(
      map(response => {
        if (this.checkForInvalidAccess(response)) {
          this.tokenRefresh(this.getAllSpendings);
        }
        else {
          return response;
        }
      })

    );

  }

}
