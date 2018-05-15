import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { HttpLocalService } from '../http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public httpreq: HttpLocalService) {
    this.httpreq.getOrders();
    this.httpreq.getUsers();
    this.httpreq.getProducts();
  }
  chartData = [
    ['Task', 'Forint'],
    ['Work', 11],

  ]

  monthlyIncome = {
    chartType: 'ColumnChart',
    dataTable: this.chartData,
    options: { 'title': 'Bevétel a hónapban', chartArea: { width: '100%' }, 'width': document.body.style.width },
  };

  createDataForChart() {
    for (let i = 0; i < 15; i++) {
      let a = [i, + Math.random() * 100];
      //console.log(this.chartData);
      this.chartData.push(a)
    }

  }

  ngOnInit() {
    this.createDataForChart()
  }

}
