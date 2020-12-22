import { Component, OnInit, ElementRef  } from '@angular/core';
import { CommonModule, CurrencyPipe} from '@angular/common';


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

  ngOnInit(): void {
  }


  transformAmount(element){
    this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, '€');

    element.target.value = this.formattedAmount;
}

}
