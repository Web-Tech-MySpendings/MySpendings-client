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

  getFilteredSpendings(filterParams: Object): Observable<any>{

    //get methode kann nur daten im header übergeben (oder direkt in URL)
    //bei get gibt es keinen body 
    //http.get(url + '/?criteria='+ encodeURIComponent( JSON.stringify(criteria)));

    console.log(encodeURIComponent(JSON.stringify(filterParams)));

    return this.http.get(API.baseUrl + '/filter/?filterParams='+ encodeURIComponent(JSON.stringify(filterParams))
    
    , { observe: 'response' });
      
  }


}
