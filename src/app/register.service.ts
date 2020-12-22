import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { API } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  register(data):Observable<any>{
    return this.http.post(API.baseUrl+'/register',data, {observe: 'response'});  
  }
}
