import {Component} from '@angular/core';
import {SharedService} from '../shared.service';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {

  data: any;
  options: any;

  constructor(private sharedService: SharedService) {
    this.data = {
      labels: [],
      datasets: [
        {
          label: 'DHIS2 chart',
          data: [],
          fill: true,
          borderColor: '#4bc0c0'
        }
      ]
    }

    this.options = {
      responsive: true,
      legend: {
        position: 'top'
      }
    };
  }

  // get date and count values from shared.service.ts
  getChartData() {
    let _date = this.sharedService.getChartLabels(this.sharedService.data2, 'date');
    let _values = this.sharedService.getChartLabels(this.sharedService.data2, 'value');
    this.data = {
      labels: _date,
      datasets: [
        {
          label: 'DHIS2 chart',
          data: _values,
          fill: true,
          borderColor: '#4bc0c0'
        }
      ]
    }
  }

}
