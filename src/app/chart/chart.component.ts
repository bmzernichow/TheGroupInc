import {Component, Input} from '@angular/core';
import {SharedService} from '../shared.service';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {

  @Input() dataChartUpper: any;
  @Input() dataChartLower: any;
  emptyDataset = [];

  _labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];
  
  borderColorLastYear = '#565656';
  borderColorCurrentYear = '#2f96b4';
  barColorLastYear = '#565656';
  barColorCurrentYear = '#2f96b4';

  optionsUpper = [{
  responsive: true,
    title: {
      display: true,
      text: 'MOVING AVERAGES',
      fontSize: 16
      },
    legend: {
      display: false,
      }
    },
    {
    responsive: true,
    title: {
      display: true,
      text: 'RAW DATA FROM DHIS2',
      fontSize: 16
      },
    legend: {
      display: false,
      }
    }
  ];

  @Input() selectedOptionsUpper: any;

  selectedOptionsLower = {
  responsive: true,
  title: {
    display: true,
    text: 'RAW DATA FROM DHIS2',
    fontSize: 16
    },
  legend: {
    display: true,
    position: 'bottom'
    }
  }

  constructor(private sharedService: SharedService) { }

  // create dataset object which is consumed by chart component (html)
  getDatasetChart(_data, _fill) {
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth();

    var sliceLastYear: any;
    var sliceCurrentYear: any;


    if (_data.length > 0) {
      sliceLastYear = _data.slice(0,12);
      sliceCurrentYear = _data.slice(12,12+m+1);
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
}
