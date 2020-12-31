import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ResourceService } from '../resource.service';
import { Options, LabelType } from 'ng5-slider';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  //for Table
  elements: any = [];
  headElements = ['Value', 'Date', 'Category', 'Comment'];

  //total value
  total: number = 0;

  showDetail: boolean=false; 

  constructor(
    private cookieService: CookieService,
    public router: Router,
    private resourceService: ResourceService
  ) { }

  ngOnInit(): void {
    this.loadAll();
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

  //Variables for filter request: 
  startDate: Date;
  endDate: Date;
  minValue: number = 100;
  maxValue: number = 400;

  filterCategory: boolean[] = [true,true,true,true,true,true]; 


  activeFilter:String ="month";
  changeFilter(value){
    if(value==="filter"){
      this.showDetail=!this.showDetail;
    }else{
      this.showDetail=false;
    }

    //To not send same request again
    if(value!==this.activeFilter){
      this.updateTable(value); 
      this.activeFilter=value;
    }

   
  }

  //out of unknown reasons it is not possible to rename this function 
  //this addEvent function is executed when the dateInput changes 
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {

    if(type==='start'){
      this.startDate=event.value; 

    }else if(type==='end'){
      this.endDate=event.value; 

      if(this.startDate!==null && this.endDate!==null){
      this.updateTable("filter");
      }

    }
  }


  //for Slide-Bar 

  options: Options = {
    floor: 0,
    ceil: 500,  //TODO: get max value 
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:       
          return 'min €' + value;

        case LabelType.High:
          return 'max €' + value;
        default:
          
        return '€' + value;
      }
    }
  };


  SetCategory(btn_ID){
    this.filterCategory[btn_ID]=!this.filterCategory[btn_ID];
    this.updateTable("filter")
  }

  updateTable(type){
    
    switch(type){
      case "all": 
          this.loadAll();
        break;

      case "month": 
        console.log("Send request for current month here"); 
        break;

      case "filter": 
      
      let httpBoddy= new Object({
            "startDate": this.startDate,  //TODO: correct format! 
            "endDate": this.endDate,
            "minVale": this.minValue,
            "macValue": this.maxValue,
            "categories": this.filterCategory
      });
    
      console.log(httpBoddy);





      break; 

      default: 
        console.log("something went wrong when updating the tabe")

    }

  }

  


  private loadAll() {
    this.resourceService.getAllSpendings().subscribe(result => {
      this.createTable(result);
    })
  }

  private loadFiltered(body: Object){
    this.resourceService.getAllSpendings().subscribe(result => {     //TODO: complete getFilteredSpendings
    //this.resourceService.getFilteredSpendings(body).subscribe(result =>{    
        this.createTable(result);
      })
  }

  private createTable(result){
    console.log(result);
    let data: any = result.body;
    this.total = 0;
    for (let i = 0; i < data.length; i++) {
      this.total+=data[i].value;
      this.elements.push({
        value: data[i].value,
        spending: data[i].sid,
        date: data[i].date.substring(0,10),
        category: data[i].type,
        comment: data[i].comment
      });
    }
  }

}