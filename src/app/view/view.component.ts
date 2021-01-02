import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ResourceService } from '../resource.service';
import { Options, LabelType } from 'ng5-slider';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  //for Table
  elements: any = [];
  headElements = ['Value', 'Date', 'Category', 'Comment'];

  //total value
  total: number = 0;

  showDetail: boolean = false;

  constructor(
    private cookieService: CookieService,
    public router: Router,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  addSpending() {
    console.log('add spending!');
    this.router.navigate(['add']);
  }

  logout() {
    console.log('logout');
    this.cookieService.delete('token');
    this.cookieService.delete('refreshToken');
    this.router.navigate(['login']);
  }

  //Variables for filter request:
  startDate: string="1900-01-01";
  endDate: string="2100-01-01";
  minValue: number = 100;
  maxValue: number = 400;

  filterCategory: String[] = ['general', 'food', 'mobility', 'education', 'travel', 'entertainment'];
  activeFilterCategory: boolean [] = [true, true, true, true, true, true];

  activeFilter: String = 'month';
  changeFilter(value) {
    if (value === 'filter') {

      this.showDetail = !this.showDetail;
    } else {

      this.showDetail = false;
    }

    //To not send same request again
    if (value !== this.activeFilter) {
      this.updateTable(value);
      this.activeFilter = value;
    }
  }

  
  
  changeDate(type: string, event: MatDatepickerInputEvent<Date>) {
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';

    if (type === 'start') {
      this.startDate = formatDate(event.value, format, locale);
    } else if (type === 'end') {
      this.endDate = formatDate(event.value, format, locale);

      if (this.startDate !== null && this.endDate !== null) {
        this.updateTable('filter');
      }
    }
  }

  //for Slide-Bar

  options: Options = {
    floor: 0,
    ceil: 500, //TODO: get max value
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return 'min €' + value;

        case LabelType.High:
          return 'max €' + value;
        default:
          return '€' + value;
      }
    },
  };

  SetCategory(category: string, i: number) {
    this.activeFilterCategory[i]=!this.activeFilterCategory[i];
    let index=this.filterCategory.indexOf(category);

    if(index>=0){//-1 if it does not exist
      this.filterCategory=this.filterCategory.filter((cat)=>{return cat!==category});
    }
    else{
      this.filterCategory.push(category);
    }

    this.updateTable('filter');
  }

  updateTable(type) {
    switch (type) {
      case 'all':
        this.loadAll();
        break;

      case 'month':
        console.log('Send request for current month here');
        break;

      case 'filter':
        let filterParams = 
          {startDate: this.startDate,
          endDate: this.endDate,
          minValue: this.minValue,
          maxValue: this.maxValue,
          categories: this.filterCategory}
        
        

        this.loadFiltered(filterParams);
        console.log(filterParams);

        break;

      default:
        console.log('something went wrong when updating the tabe');
    }
  }

  private loadAll() {
    this.resourceService.getAllSpendings().subscribe((result) => {
      this.createTable(result);
    });
  }

  private loadFiltered(filterParams: Object) {
    this.resourceService.getFilteredSpendings(filterParams).subscribe(result =>{
      this.createTable(result);
    });
  }

  private createTable(result) {
    let data: any = result.body;
    this.total = 0;
    this.elements=[];
    for (let i = 0; i < data.length; i++) {
      this.total += data[i].value;
      this.elements.push({
        value: data[i].value,
        spending: data[i].sid,
        date: data[i].date.substring(0, 10),
        category: data[i].type,
        comment: data[i].comment,
      });
    }
  }
}
