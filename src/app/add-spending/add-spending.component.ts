import { Component, OnInit, ElementRef  } from '@angular/core';
import { CommonModule, CurrencyPipe} from '@angular/common';
import { formatDate } from '@angular/common';
import { AlertService } from '../alert.service';
import { ResourceService } from '../resource.service';
import {Router} from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';


@Component({
  selector: 'app-add-spending',
  templateUrl: './add-spending.component.html',
  styleUrls: ['./add-spending.component.css']
})
export class AddSpendingComponent implements OnInit {
  format = 'yyyy-MM-dd';
  locale = 'en-US';

  constructor(
    private currencyPipe : CurrencyPipe,
    private alertService: AlertService,
    private resourceService: ResourceService,
    public router: Router,
    public dialogRef: MatDialogRef<AddSpendingComponent>,
    ) {
  }

  value: number=0; 
  date: Date=new Date((new Date().getTime()));
  type="";
  comment="";

  ngOnInit(): void {
    this.type ='general';
  }


  sendAdd(){
    console.log("ADD SPENDING (SEND TO SERVER!)")

    if(this.value===0){
      this.alertService.errorNotification('Spending can not be null');
    }
    else{
      let spending = 
      {
      value: this.value,
      date: formatDate(this.date, this.format, this.locale),
      type: this.type.toLowerCase(),
      comment: this.comment}

    
      this.resourceService.insertSpending(spending).subscribe(() =>{
        this.alertService.successNotification("new spending added");
      }) 

      this.dialogRef.close();
    }
  
  }

}
