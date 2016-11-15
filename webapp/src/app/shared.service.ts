import {Injectable} from '@angular/core';

@Injectable()
export class SharedService {

  constructor() {
  }

  data: any;
  data2 = [];
  data3 = [];

  parseLookupToTable() {
    console.log(this.data);
    //this.data2 = this.data;
    for (var i = 0; i < this.data.length; i++) {
      this.data2.push({date: this.data[i][1], value: this.data[i][2]})
    }
    console.log(this.data2);
    this.data = this.data2.slice(0, 5);
  }

  getChartLabels(objectToIterate, _key) {
    this.data3 = [];
    for (var i = 0; i < objectToIterate.length; i++) {
      for (let key of Object.keys(objectToIterate[i])) {
        let value = objectToIterate[i][key];
        if (key == _key) {
          this.data3.push(value);
          console.log('Test' + this.data3);
        }
      }
    }
    return this.data3;

  }

  getMovingAverage(interval, data) {

    var movingAverages = [];
    var i = 0;
    var temp = 0;

    for (i; i < data.length; i++) {
            while (i > 0) {
              movingAverages.push(temp);
              temp = 0;
            }
        for (var j = 0; j <= interval; j++) {
            temp += data[j];
            i++;
        }
    }
            console.log(movingAverages);

  }

}
