import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../resource.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private resourceService: ResourceService,
    private alertService: AlertService
  ) {}
  formGroup: FormGroup;
  formPW: FormGroup;
  pwShow: boolean = false;
  hidePW: boolean = true;
  hideOld: boolean = true;
  hideNew: boolean = true;
  hideCheck: boolean = true;

  ngOnInit(): void {
    this.loadUserData();
    this.formGroup = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      oldPassword: new FormControl('', [Validators.required]), // has to be called oldPassword for server api
    });
    this.formPW = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      checkPw: new FormControl('', [Validators.required]),
    });
  }

  userData = {
    name: '',
    email: '',
  };

  loadUserData() {
    this.resourceService.getUserData().subscribe((result) => {
      const data = result.body;
      this.userData.name = data.name;
      this.userData.email = data.email;
    });
  }

  updateName() {
    if (this.formGroup.valid) {
      const data = {
        key: 'name',
        value: this.formGroup.value.name,
        oldPassword: this.formGroup.value.oldPassword,
      };
      this.resourceService.updateUser(data).subscribe(() => {
        this.alertService.successNotification('Updated Name!');
        console.log('Update succeeded');
      }),
        (error) => {
          console.log(error);
        };
    }
  }

  updateEmail() {
    if (this.formGroup.valid) {
      const data = {
        key: 'email',
        value: this.formGroup.value.email,
        oldPassword: this.formGroup.value.oldPassword,
      };
      this.resourceService.updateUser(data).subscribe(() => {
        this.alertService.successNotification('Updated Email!');
        console.log('Update succeeded');
      }),
        (error) => {
          console.log(error);
        };
    }
  }

  changePW() {
    if (this.formPW.value.password === this.formPW.value.checkPw) {
      if (this.formPW.valid) {
        const data = {
          oldPassword: this.formPW.value.oldPassword,
          password: this.formPW.value.password,
        };
        this.resourceService.changePw(data).subscribe(() => {
          this.alertService.successNotification('Updated password');
        });
      }
    } else {
      this.alertService.errorNotification('repeat the correct password');
    }
  }
}
