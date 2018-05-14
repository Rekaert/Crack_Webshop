import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardChartService } from '../dashboard-chart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _dashboardChart: DashboardChartService) { }

  ngOnInit() {
    this._dashboardChart.dailyForecast().subscribe(res => {
      console.log(res);
    })
  }

}
