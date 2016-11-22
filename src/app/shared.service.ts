import {Injectable} from '@angular/core';

@Injectable()
export class SharedService {

  constructor() {
  }

  data: any;
  data2 = [];
  data3 = [];
  dataMovingAverages = [];
  intervalMovingAverage = 5;

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

    for (i; i <= data.length - this.intervalMovingAverage; i++) {

        for (j = 0; j < this.intervalMovingAverage; j++) {
          if (i+j < data.length) {
            temp += parseInt(this.iterateId(data[i+j], key)); 
          }
        }
        if (temp != 0) {
          // i += this.intervalMovingAverage - 1;
          console.log(temp);
          tempArray.push(Math.round(temp / j));
          temp = 0;
        }
    }
    console.log(this.data.length);
    console.log('Temparray length: ' + tempArray.length);
    this.parseToObject(data, this.intervalMovingAverage, tempArray);
  }

  parseToObject (data, interval, tempArray) {

    var counter = (interval - 1) / 2;

    for (var i = 0; i < tempArray.length; i++) {

      var _date = this.iterateId(data[counter], 'date');
      this.dataMovingAverages.push({date: _date, value: tempArray[i]}); 
      counter ++;
    }
    console.log('Parse function: ' + this.dataMovingAverages);
  }

}
