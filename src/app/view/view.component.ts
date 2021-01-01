import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

//for Table
elements: any = [];
headElements = ['Value', 'Date', 'Category', 'Comment'];

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
  this.router.navigate(['add']);

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
    let data: any = result.body;

    for (let i = 0; i < data.length; i++) {
      this.elements.push({
        value: data[i].value,
        spending: data[i].sid,
        date: data[i].date.substring(0,10),
        category: data[i].type,
        comment: data[i].comment
      });
    }
  })

}

}
