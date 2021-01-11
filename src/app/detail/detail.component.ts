import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  format = 'yyyy-MM-dd';
  locale = 'en-US';

  constructor(
    public dialogRef: MatDialogRef<DetailComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
    
  ) { }

  ngOnInit(): void {
  }

  updateData(){
    console.log("Update to: ")
    this.dialogData.date=formatDate(this.dialogData.date, this.format, this.locale);

    //TODO: update only if parameter changed (#key value siehe server)

    console.log(this.dialogData)
  }

  deleteSpending(){
    console.log("Delete spending!")
  }

}
