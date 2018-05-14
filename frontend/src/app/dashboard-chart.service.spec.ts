import { TestBed, inject } from '@angular/core/testing';

import { DashboardChartService } from './dashboard-chart.service';

describe('DashboardChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardChartService]
    });
  });

  it('should be created', inject([DashboardChartService], (service: DashboardChartService) => {
    expect(service).toBeTruthy();
  }));
});
