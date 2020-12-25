import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css']
})
export class SaldoComponent implements OnInit {

  view: boolean = true; //used with *ngIf="view" in html to hide elements when entering a new spending 

  //for Table
  elements: any = [];
  headElements = ['Value', 'Spending', 'Date', 'Category'];

  constructor(
    private cookieService: CookieService,
    public router: Router,
    private resourceService: ResourceService
  ) { }

  ngOnInit(): void {
    this.loadTable();
  }

  addSpending() {
    console.log("add spending!")
    this.view = false;
    //console.log(this.cookieService.get("token"));
    //console.log(this.cookieService.get("refreshToken"));

  }

  logout() {
    console.log("logout")
    this.cookieService.delete('token');
    this.cookieService.delete('refreshToken');
    this.router.navigate(['login']);
  }

  //TODO: get this data from server
  private loadTable() {

    this.resourceService.getAllSpendings().subscribe(result => {

      console.log(result);
      let data: any = result.body;

      console.log(data[0])
      console.log(data[1])


      for (let i = 0; i < data.length; i++) {
        this.elements.push({
          value: data[i].value,
          spanding: data[i].sid,
          date: data[i].date,
          category: data[i].type,
        });
      }
    })

  }

}
