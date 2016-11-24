import {Component} from '@angular/core';
import {SharedService} from '../shared.service';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {

  dataChartUpper: any;
  dataChartLower: any;
  emptyDataset = [];

  _labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December',];
  
  borderColorLastYear = '#565656';
  borderColorCurrentYear = '#4bc0c0';
  barColorLastYear = '#565656';
  barColorCurrentYear = '#4bc0c0';

  optionsUpper = {
  responsive: true,
  title: {
    display: true,
    text: 'Moving averages',
    fontSize: 16
    },
  legend: {
    display: false,
    }
  }

  optionsLower = {
  responsive: true,
  title: {
    display: true,
    text: 'Raw data from DHIS2',
    fontSize: 16
    },
  legend: {
    display: true,
    position: 'bottom'
    }
  }

  constructor(private sharedService: SharedService) {
    this.dataChartUpper = this.getDatasetChart(this.emptyDataset, false);
    this.dataChartLower = this.getDatasetChart(this.emptyDataset, false);
  }

  // create dataset object which is consumed by chart component (html)
  getDatasetChart(_data, _fill) {
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth();

    var sliceLastYear: any;
    var sliceCurrentYear: any;


    if (_data.length > 0) {
      sliceLastYear = _data.slice(0,11);
      sliceCurrentYear = _data.slice(12,12+m);
    }
    else {
      sliceLastYear = _data
      sliceCurrentYear = _data
    }

      return {
        labels: this._labels,
        datasets: [
          {
            label: (y - 1),
            data: sliceLastYear,
            fill: _fill,
            backgroundColor: this.barColorLastYear,
            borderColor: this.borderColorLastYear
          },
          {
            label: y,
            data: sliceCurrentYear,
            fill: _fill,
            backgroundColor: this.barColorCurrentYear,
            borderColor: this.borderColorCurrentYear
          }
        ]
      }
  }

  // update chart arrays with values, including moving averages, from shared.service.ts
  getChartData() {
    let _data1 = this.sharedService.parseToChart(this.sharedService.dataMovingAverages, 'value');
    let _data2 = this.sharedService.parseToChart(this.sharedService.dataParsed, 'value');
    this.dataChartUpper = this.getDatasetChart(_data1, false);
    this.dataChartLower = this.getDatasetChart(_data2, true);
  }
}
