import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';
import { ResourceService } from '../resource.service';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  constructor(
    private resourceService: ResourceService,
    private alertService: AlertService
  ) {}

  hideChart: boolean = true;
  options = {
    legend: {
      labels: {
        defaultFontSize: 24,
        fontColor: 'black',
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              return '€ ' + value;
            },
          },
        },
      ],
    },
  };

  myChart: Chart;
  backgroundColors = [
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ];
  borderColors = [
    'rgba(54, 162, 235, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ];

  ngOnInit(): void {
    this.myChart = new Chart('chart', {
      options: this.options,
    });
    // this.reportChart('all');
  }

  reportChart(type: string) {
    switch (type) {
      case 'all':
        this.resourceService.getAllSpendings().subscribe((result) => {
          this.createTypeChartAll(result.body);
        });
        break;
      case 'month':
        this.resourceService.getAllSpendings().subscribe((result) => {
          const monthlySum: any = {};
          const data = result.body;
          for (let i = 0; i < data.length; i++) {
            let month = data[i].date.substring(0, 7); // extract year and month
            if (monthlySum.hasOwnProperty(month)) {
              monthlySum[month] =
                parseInt(monthlySum[month]) + parseInt(data[i].value);
            } else {
              monthlySum[month] = parseInt(data[i].value);
            }
          }
          this.createMonthlyChart(monthlySum);
        });
        break;
      case 'day':
        let date = new Date();
        let sartMonth =
          date.getFullYear() + '-' + (date.getMonth() + 1) + '-01';
        let endMonth = date.getFullYear() + '-' + (date.getMonth() + 1) + '-31';

        let filterParams = { startDate: sartMonth, endDate: endMonth };
        this.resourceService
          .getSpendingsForMonth(filterParams)
          .subscribe((result) => {
            const data = result.body;
            this.createDailyChart(data);
          });
        break;
    }
  }

  createTypeChartAll(data: any) {
    let labels = [
      'general',
      'food',
      'mobility',
      'education',
      'travel',
      'entertainment',
    ];
    let spendings = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < data.length; i++) {
      let index = labels.indexOf(data[i].type);
      if (index !== -1) {
        spendings[index] = spendings[index] + data[i].value;
      }
    }
    console.log(spendings);

    this.myChart.destroy();
    this.myChart = new Chart('chart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'spendings by category',
            data: spendings,
            backgroundColor: this.backgroundColors,
            borderColor: this.borderColors,
            borderWidth: 2,
          },
        ],
      },
      options: this.options,
    });
  }

  createDailyChart(data: any) {
    let labels = [];
    for (let i = 1; i < 28; i++) {
      labels.push(i);
    }
    // determine how many days curr month has
    let date = new Date();
    if (date.getMonth() == 1) labels.push(28);
    else if ([0, 2, 4, 6, 7, 9, 11].indexOf(date.getMonth()) != -1)
      labels.push(28, 29, 30, 31);
    else labels.push(28, 29, 30);

    let spending = [];
    for (let i = 0; i < labels.length; i++) {
      spending.push(0);
    }
    for (let i = 0; i < data.length; i++) {
      spending[labels.indexOf(parseInt(data[i].date.substring(8, 10)))] =
        data[i].value;
    }
    this.myChart.destroy();
    this.myChart = new Chart('chart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'spenings per day for current month',
            data: spending,
            backgroundColor: this.backgroundColors[3],
            borderColor: this.borderColors[3],
            borderWidth: 2,
            fill: true,
            spanGaps: true,
            borderDash: [2.5, 5],
            lineTension: 0.35
          },
        ],
      },
      options: this.options,
    });
  }

  createMonthlyChart(data: any) {
    let labels = [];
    let spending = [];
    for (let key in data) {
      labels.push(key);
      spending.push(data[key]);
    }
    this.myChart.destroy();
    this.myChart = new Chart('chart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'monthly spendings',
            data: spending,
            backgroundColor: this.backgroundColors[0],
            borderColor: this.borderColors[0],
            borderWidth: 4,
            fill: false,
            lineTension: 0.2,
          },
        ],
      },
      options: this.options,
    });
  }
}
