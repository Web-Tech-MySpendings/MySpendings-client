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
