import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css']
})
export class SaldoComponent implements OnInit {

  view: boolean = true; //used with *ngIf="view" in html to hide elements when entering a new spending 

  constructor() { }

  ngOnInit(): void {
  }

  addSpending(){
    console.log("add spending!")
    this.view=false;
  }

}
