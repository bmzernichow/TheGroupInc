import {Component} from '@angular/core';
import {SharedService} from '../shared.service';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {

  data: any;
  data2: any;
  options: any;
  options2: any;

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
    this.data2 = {
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
    this.options2 = {
      responsive: true,
      legend: {
        position: 'top'
      }
    };
  }

  getData(_date, _values,borderColor){
    return  {
      labels: _date,
      datasets: [
        {
          label: 'DHIS2 chart',
          data: _values,
          fill: true,
          // backgroundColor: '',
          borderColor: borderColor //'#4bc0c0'
        }
      ]
    }
  }

  // get date and count values from shared.service.ts
  getChartData() {
    let _date = this.sharedService.getChartLabels(this.sharedService.data2, 'date');
    let _values = this.sharedService.getChartLabels(this.sharedService.data2, 'value');
    // this.data = this.getData();
    this.data = this.getData(_date,_values,'#00F');
    this.getChartData2();
  }

  getChartData2(){
    let _date = this.sharedService.getChartLabels(this.sharedService.data2, 'date');
    let _values = this.sharedService.getChartLabels(this.sharedService.data2, 'value');
    // this.data = this.getData();
    this.data2 = this.getData(_date,_values,'#00F');
  }

}
