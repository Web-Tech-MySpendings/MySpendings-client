import { Component, OnInit, ElementRef  } from '@angular/core';
import { CommonModule, CurrencyPipe} from '@angular/common';
import { formatDate } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-add-spending',
  templateUrl: './add-spending.component.html',
  styleUrls: ['./add-spending.component.css']
})
export class AddSpendingComponent implements OnInit {

  formattedAmount;
  amount;

  constructor(private currencyPipe : CurrencyPipe) {
  }

  value: number=0; 
  date: string="";
  category="test";
  comment="test";

  ngOnInit(): void {
  }


  transformAmount(event){
    this.value=event.target.value;
    //console.log("onchange ",this.value)
    //this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, '€');
}

  setDate(event: MatDatepickerInputEvent<Date>){
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.date = formatDate(event.value, format, locale);
  }

  setCategory(value){
    this.category=value;
  }

  setComment(event){

    console.log("Event: ",event)
    console.log("setComment")
    //this.comment=event; 
  }




  sendAdd(){

    console.log(document.getElementById("commentID"))
    //this.comment=document.getElementById("commentID").textContent;
    console.log("Comment: ")

    console.log("ADD SPENDING (SEND TO SERVER!)")

    console.log("Value: "+this.value);
    console.log("Date: "+this.date);
    console.log("Category: "+this.category);
    console.log("comment: "+this.comment);
    /*
          value 
          category
          categories: this.filterCategory
    */




  }

}
