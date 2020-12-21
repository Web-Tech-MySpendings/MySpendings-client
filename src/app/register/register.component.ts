import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  pw1: Text;
  pw2: Text;
  samePw: Boolean;

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
    this.initForm();
  }


  //Body of http-request:
  initForm(){
    this.formGroup=new FormGroup({
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),  
      pass1: new FormControl('', [Validators.required]),
      pass2: new FormControl('', [Validators.required])
    })
  }


  //TODO: remove if/else?
  registerProcess(){
    if(this.formGroup.valid){
      this.registerService.register(this.formGroup.value).subscribe(result=>{
        if(result.success){
          console.log(result);
          alert(result.message);  
        }else {
          alert(result.message);
        }
      })
    }
  }

  checkPassword(){
    if(this.pw1 == this.pw2){
      this.samePw = true;
    }else{
      this.samePw = false;
    }
  }

}
