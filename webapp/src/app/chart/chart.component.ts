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
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December',],
      datasets: [
        {
          label: 'Year',
          data: [],
          fill: false,
          borderColor: '#565656'
        },
        {
          label: 'Year',
          data: [],
          fill: false,
          borderColor: '#00F'
        }
      ]
    }
    this.data2 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December',],
      datasets: [
        {
          label: 'Year',
          data: [],
          fill: true,
          borderColor: '#00F'
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

  getData(_date, _values, borderColor, _label){
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth();
    return  {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December',],
      datasets: [
        {
          label: y,
          data: _values.slice(12,12+m),
          fill: true,
          // backgroundColor: backgroundColor,
          borderColor: borderColor //'#4bc0c0'
        }
      ]
    }
  }
  getData2(_date, _values,borderColor){
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth();
    return  {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December',],
      datasets: [
        {
          label: (y-1),
          data: _values.slice(0,11),
          fill: true,
          // backgroundColor: '',
          borderColor: '#565656' //'#4bc0c0'
        },
        {
          label: y,
          data: _values.slice(12,12+m),
          fill: true,
          // backgroundColor: '',
          borderColor: borderColor  //'#4bc0c0'
        }
      ]
    }
  }

  // get date and count values from shared.service.ts
  getChartData() {
    let _date = this.sharedService.getChartLabels(this.sharedService.dataMovingAverages, 'date');
    let _values = this.sharedService.getChartLabels(this.sharedService.dataMovingAverages, 'value');
    // this.data = this.getData();
    this.data = this.getData2(_date, _values, '#00F');
    this.getChartData2();
  }

  getChartData2(){
    let _date = this.sharedService.getChartLabels(this.sharedService.data2, 'date');
    let _values = this.sharedService.getChartLabels(this.sharedService.data2, 'value');
    // this.data = this.getData();
    this.data2 = this.getData(_date,_values,'#00F', 'Average');
  }

}
