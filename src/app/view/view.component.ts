import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ResourceService } from '../resource.service';
import { Options, LabelType } from 'ng5-slider';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from '../detail/detail.component';
import { AddSpendingComponent } from '../add-spending/add-spending.component';
import {ScrollingModule} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  //for Table
  type: string = 'all';
  elementsAll: any = [];
  elementsMonth: any = [];
  elementsFilter: any = [];

  headElements = ['Value', 'Date', 'Category', 'Comment'];

  //total value
  total: number = 0;
  showDetail: boolean = false;
  
  //for date formater
  format = 'yyyy-MM-dd';
  locale = 'en-US';

  selectedValue: string;

  constructor(
    private cookieService: CookieService,
    public router: Router,
    private resourceService: ResourceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAll();
    this.selectedValue = 'all';
  }

  addSpending() {
        const dialogRef = this.dialog.open(AddSpendingComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  logout() {
    console.log('logout');
    this.cookieService.delete('token');
    this.cookieService.delete('refreshToken');
    this.router.navigate(['login']);
  }

  //Variables for filter request:
  startDate: string = '1900-01-01';
  endDate: string = '2100-01-01';
  minValue: number = 0;
  maxValue: number = 1000000;

  filterCategory: String[] = [
    'general',
    'food',
    'mobility',
    'education',
    'travel',
    'entertainment',
  ];
  activeFilterCategory: boolean[] = [true, true, true, true, true, true];

  activeFilter: String = 'month';
  changeFilter(value) {
    if (value === 'filter') {
      this.showDetail = !this.showDetail;
    } else {
      this.showDetail = false;
    }

    //To not send same request again
 
    this.type = value;
    this.updateTable();
    this.activeFilter = value;
  }

  changeDate(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type === 'start') {
      this.startDate = formatDate(event.value, this.format, this.locale);
    } else if (type === 'end') {
      this.endDate = formatDate(event.value, this.format, this.locale);

      if (this.startDate !== null && this.endDate !== null) {
        this.type = 'filter';
        this.updateTable();
      }
    }
  }

  //for Slide-Bar

  options: Options = {
    floor: 0,
    ceil: 0, //TODO: get max value
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
    this.activeFilterCategory[i] = !this.activeFilterCategory[i];
    let index = this.filterCategory.indexOf(category);

    if (index >= 0) {
      //-1 if it does not exist
      this.filterCategory = this.filterCategory.filter((cat) => {
        return cat !== category;
      });
    } else {
      this.filterCategory.push(category);
    }

    this.type = 'filter';
    this.updateTable();
  }

  updateTable() {
    switch (this.type) {
      case 'all':
        this.loadAll();
        break;

      case 'month':
        console.log('Send request for current month here');

        var date = new Date(),
          y = date.getFullYear(),
          m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);

        let monthParams = {
          startDate: formatDate(firstDay, this.format, this.locale),
          endDate: formatDate(lastDay, this.format, this.locale),
          minValue: 0,
          maxValue: this.options.ceil, //this is the highest possible value
          categories: [
            'general',
            'food',
            'mobility',
            'education',
            'travel',
            'entertainment',
          ],
        };

        this.loadFiltered(monthParams);
        break;

      case 'filter':
        let filterParams = {
          startDate: this.startDate,
          endDate: this.endDate,
          minValue: this.minValue,
          maxValue: this.maxValue,
          categories: this.filterCategory,
        };

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
    this.resourceService
      .getFilteredSpendings(filterParams)
      .subscribe((result) => {
        this.createTable(result);
      });
  }

  private createTable(result) {
    let data: any = result.body;

    this.total = 0;

    switch(this.type){
      case 'all': 
        this.elementsAll = [];
        this.pushElements(this.elementsAll,data);
        break;
      
      case 'month': 
        this.elementsMonth = [];
        this.pushElements(this.elementsMonth,data);
        break;
      
      case 'filter': 
        this.elementsFilter = [];
        this.pushElements(this.elementsFilter,data);
        break; 
    }
  }

  private pushElements(elements: any, data: any){
    for (let i = 0; i < data.length; i++) {
      this.total += parseFloat(data[i].value);

      if (parseFloat(data[i].value) > this.options.ceil) {
        this.options.ceil = parseFloat(data[i].value);
      }
      elements.push({
        sid: data[i].sid,
        value: data[i].value,
        spending: data[i].sid,
        date: data[i].date.substring(0, 10),
        type: data[i].type,
        comment: data[i].comment,
      });
    }
  }


  openDetailView(sid, value, date, type, comment): void{
   
    const dialogRef = this.dialog.open(DetailComponent, {
      data: {sid: sid, value: value, date: date, type: type, comment: comment}
    });

    dialogRef.afterClosed().subscribe(result => {

      //TODO: Update Table !!
      this.updateTable();

    });

  }
}
