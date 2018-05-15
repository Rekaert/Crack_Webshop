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
  x: any = document.querySelector('.container')['offsetWidth'];
  cost: number = 0;
  constructor(public httpreq: HttpLocalService) {
    this.httpreq.getOrders();
    this.httpreq.getUsers();
    this.httpreq.getProducts();
    console.log(this.monthlyIncome);
    this.httpreq.getCost().then((data) => {
      for (let x in data) {
        this.cost += parseInt(data[x].cost);
      }
      this.createDataForChart(data);
    });
  }
  chartData: any = [
    ['Task', 'Forint']
  ]

  monthlyIncome = {
    chartType: 'ColumnChart',
    dataTable: this.chartData,
    options: { 'title': 'Bevétel a hónapban', chartArea: { width: '100%' }, colors: ['#7ddc1f'], width: this.x * 1.33 },
  };

  createDataForChart(data) {
    const now = new Date();
    let found = false;
    for (let i in data) {
      let order = new Date(data[i].createdAt);
      if (now.getFullYear() == order.getFullYear() && now.getMonth() == order.getMonth()) {
        for (let j in this.chartData) {
          /*  console.log(this.chartData[j][0], this.chartData[j][1]) */
          if (this.chartData[j][0] == order.getDate()) {
            this.chartData[j][1] += parseInt(data[i].cost);
            found = true;
          }
        }
        if (!found) {
          this.chartData.push([order.getDate(), parseInt(data[i].cost)]);
        }
      }
    }
    this.formatChartData();
  }
  formatChartData() {
    this.chartData.sort((a, b) => { return a[0] - b[0]; });
    for (let i = 1; i < this.chartData.length; i++) {
      this.chartData[i][0] += '.';
    }
  }
  ngOnInit() {

  }
}




