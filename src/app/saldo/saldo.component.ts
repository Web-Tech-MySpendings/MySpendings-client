import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ResourceService } from '../resource.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css'],
})
export class SaldoComponent implements OnInit {
  matMenu: MatMenuModule;

  constructor(private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {}

  logout() {
    console.log('logout');
    this.cookieService.delete('token');
    this.cookieService.delete('refreshToken');
    this.router.navigate(['login']);
  }

  charts() {}

  profile() {
    this.router.navigate(['profile']);
  }

  home() {
    this.router.navigate(['view']);
  }
}
