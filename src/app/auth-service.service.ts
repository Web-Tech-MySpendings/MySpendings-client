//import { baseUrl } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  login(data):Observable<any>{
    return this.http.post('http://localhost:3000/login/',data);  //login to local server from ex7.1
  }
  
}
