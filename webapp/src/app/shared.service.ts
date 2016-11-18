import {Injectable} from '@angular/core';

@Injectable()
export class SharedService {

  constructor() {
  }

  data: any;
  data2 = [];
  data3 = [];
  dataMovingAverages = [];
  intervalMovingAverage = 0;

  iterateId(objectToIterate, _key) {
    for (let key of Object.keys(objectToIterate)) {
      let value = objectToIterate[key];
      if (key == _key) {
        return value;
      }
    }
  }

  parseLookupToTable() {

    for (var i = 0; i < this.data.length; i++) {
      this.data2.push({date: this.data[i][1], value: this.data[i][2]})
    }
    console.log(this.data2);
    var d = this.data2.length;
    return this.data2.slice(d-5, d);
  }

  getChartLabels(objectToIterate, _key) {
    this.data3 = [];
    for (var i = 0; i < objectToIterate.length; i++) {
      for (let key of Object.keys(objectToIterate[i])) {
        let value = objectToIterate[i][key];
        if (key == _key) {
          this.data3.push(value);
        }
      }
    }
    return this.data3;

  }

  // function that calculates moving averages for an input array of objects
  getMovingAverage (data, key) {
      
    var tempArray = [];
    var i = 0;
    var j = 0;
    var temp = 0;

    for (i; i <= data.length; i++) {

        for (j = 0; j < this.intervalMovingAverage; j++) {
          if (i+j < data.length) {
            temp += parseInt(this.iterateId(data[i+j], key)); 
          }
        }
        if (temp != 0) {
          i += this.intervalMovingAverage - 1;
          console.log(temp);
          tempArray.push(temp / j);
          temp = 0;
        }
    }
    console.log(tempArray);
    this.parseToObject(this.intervalMovingAverage, tempArray);
  }

  parseToObject (interval, tempArray) {

    var counter = 0;

    for (var i = 0; i < this.data.length; i++) {
      
        var fromDate = this.data[i][1];
        var toDate = '';

      if (i + interval < this.data.length) {
        toDate = this.data[i+interval-1][1];
      }
      else {
        toDate = this.data[this.data.length - 1][1];
      }
      this.dataMovingAverages.push({date: fromDate + ' - ' + toDate, value: tempArray[counter]});
      i += interval - 1; 
      counter ++;
    }
    console.log(this.dataMovingAverages);
  }

}
