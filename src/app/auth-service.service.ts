//import { baseUrl } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { API } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  login(data):Observable<any>{
    return this.http.post(API.baseUrl+'/login',data, {observe: 'response'});  //login to local server from ex7.1
  }

  register(data):Observable<any>{
    return this.http.post(API.baseUrl+'/register',data, {observe: 'response'});
  }
  
}


/*
    alter/insert        put, also einfügen von einem spending. im body den value das date (und category / comment -> optional);
    alter/delete        delete, löschen von spending         
    alter/update        patch, bearbeiten von spending
    /spendings          get, um alle spendings zu erhalten 
    /spendings/filter   get, nach category, value und date 

*/