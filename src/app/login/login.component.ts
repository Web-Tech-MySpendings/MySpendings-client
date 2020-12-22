import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private authService: AuthServiceService, 
    public router: Router) 
    {   }

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
    console.log("try to login!!!!!!!!!!!!")
    if(this.formGroup.valid){
      this.authService.login(this.formGroup.value).subscribe(result=>{
        console.log(result)

        this.router.navigate(['saldo']);

      }), (error)=> {
          console.log(error)
          alert("Wrong Password");
      }
      }
    }
  
}
