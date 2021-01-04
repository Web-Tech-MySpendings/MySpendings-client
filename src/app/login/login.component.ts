import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  

  constructor(
    private authService: AuthServiceService, 
    public router: Router,
    private cookieService: CookieService
    ) 
    {   
          
    }

  ngOnInit(): void {
    this.initForm();
  }

  //Body of http-request:
  initForm(){
    this.formGroup=new FormGroup({
      email: new FormControl('', [Validators.required]),  
      password: new FormControl('', [Validators.required])
    })
  }
  
  loginProcess(){
    if(this.formGroup.valid){
      this.authService.login(this.formGroup.value).subscribe(result=>{
        console.log("Login succeeded")
        

        //Cookies: https://www.npmjs.com/package/ngx-cookie-service
        this.cookieService.set( 'token', result.body.token   ); 
        this.cookieService.set( 'refreshToken', result.body.refreshToken ); 
        

        this.router.navigate(['view']);

      }), (error)=> {
          console.log(error)
          alert("Login failed");
      }
      }
    }
  
}
