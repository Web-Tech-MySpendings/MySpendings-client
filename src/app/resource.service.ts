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

  getFilteredSpendings(body: Object): Observable<any>{

    //Zusammen mit fabian fertig stellen 
      //Wie soll body genau ausschauen? 
      //Wie wurde das mit refresh-token gefixed? 
      
      //REST Convention:  put für Update/Replace
    return null; 
  }


}
