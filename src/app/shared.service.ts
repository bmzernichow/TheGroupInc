import {Injectable} from '@angular/core';

@Injectable()
export class SharedService {
  
  constructor() {
  }

  dataRaw: any;
  dataParsed = [];
  dataChart = [];
  dataMovingAverages = [];
  intervalMovingAverage = 3;

  // iterates an object and returns values from key/ value pairs
  iterateId(objectToIterate, _key) {
    for (let key of Object.keys(objectToIterate)) {
      let value = objectToIterate[key];
      if (key == _key) {
        return value;
      }
    }
  }

  // parses raw data from DHIS API, extracts key/ value pairs of 'date' and 'value'
  parseToTable() {
    for (var i = 0; i < this.dataRaw.length; i++) {
      this.dataParsed.push({date: this.dataRaw[i][1], value: this.dataRaw[i][2]})
    }
    var d = this.dataParsed.length;
    return this.dataParsed.slice(d-5, d);
  }

  // parse data to chart component array
  parseToChart(objectToIterate, _key) {
    this.dataChart = [];
    for (var i = 0; i < objectToIterate.length; i++) {
      for (let key of Object.keys(objectToIterate[i])) {
        let value = objectToIterate[i][key];
        if (key == _key) {
          this.dataChart.push(value);
        }
      }
    }
    return this.dataChart;
  }

  // calculates moving averages for an input array of objects
  getMovingAverage (data, key) {
    var tempArray = [];
    var i = 0;
    var j = 0;
    var temp = 0;
    for (i; i <= data.length - this.intervalMovingAverage; i++) {
        for (j = 0; j < this.intervalMovingAverage; j++) {
          if (i+j < data.length) {
            temp += parseInt(this.iterateId(data[i+j], key)); 
          }
        }
        if (temp != 0) {
          tempArray.push(Math.round(temp / j));
          temp = 0;
        }
    }
    this.parseToObject(data, this.intervalMovingAverage, tempArray);
  }

  // helper/ parser method for moving averages for an input array of objects
  parseToObject (data, interval, tempArray) {
    var counter = (interval - 1) / 2;
    for (var i = 0; i < tempArray.length; i++) {
      var _date = this.iterateId(data[counter], 'date');
      this.dataMovingAverages.push({date: _date, value: tempArray[i]}); 
      counter ++;
    }
  }
}
