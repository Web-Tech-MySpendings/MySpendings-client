import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { ResourceService } from '../resource.service';
import { AlertService } from '../alert.service';


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
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private resourceService: ResourceService,
    private alertService: AlertService,
    
  ) { }

  ngOnInit(): void {
  }

  updateData(){
    console.log("Update to: ")
    this.dialogData.date=formatDate(this.dialogData.date, this.format, this.locale);
    this.dialogData.type=this.dialogData.type.toLowerCase();

    

    //TODO: update only if parameter changed (#key value siehe server)

    console.log(this.dialogData)

    this.resourceService.updateSpending(this.dialogData).subscribe(()=>{
      this.alertService.successNotification("spending updated");
    })

    this.dialogRef.close();

  }

  deleteSpending(){
    console.log("Delete spending!")
    this.resourceService.deleteSpending(this.dialogData.sid).subscribe(()=>{
      this.alertService.successNotification("spending deleted"); 
    })

    this.dialogRef.close();
  }

}
