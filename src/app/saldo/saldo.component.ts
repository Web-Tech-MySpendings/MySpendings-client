import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css']
})
export class SaldoComponent implements OnInit {

  view: boolean = true; //used with *ngIf="view" in html to hide elements when entering a new spending 

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  addSpending(){
    console.log("add spending!")
    this.view=false;
    console.log(this.cookieService.get("token"));
    console.log(this.cookieService.get("refreshToken"));

  }

}
