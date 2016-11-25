import {Injectable} from '@angular/core';

@Injectable()
export class SharedService {

  constructor() {
  }
  //local values
  intervalMovingAverage;

  //array sets
  dataRaw: any;
  dataParsed = [];         //[[date,data], [date,data], [date,data],...]
  dataChart = [];          // used in dataChartLower [data | null, data | null, data | null, ...] Beginning in january last year
  dataMovingAverages = []; // used in dataChartUpper [data | null, data | null, data | null,...]

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
    this.dataParsed = [];
    for (var i = 0; i < this.dataRaw.length; i++) {
      this.dataParsed.push({date: this.dataRaw[i][1], value: this.dataRaw[i][2]})
    }
    var d = this.dataParsed.length;
    return this.dataParsed.slice(d-5, d);
  }

  // takes a array of parsed data ([[date,data], [date,data],...]), and
  // formats it into a desired set of only data, inserting null for missing dates
  // the data given must be ordered oldest -> newest
  getDatasetWithNull(data){
    var objectToReturn = [];
    var lastYearMonth = parseInt(data[data.length-1]["date"]);
    var lastYear = Math.floor(lastYearMonth/100);

    //used to figure out how many months use from two years before lastYear
    var size = Math.floor(this.intervalMovingAverage/2);
    //find out where to start
    var firstYearMonth = 0;
    if(size == 0){
      //don't use any additional months
      firstYearMonth = (lastYear-1)*100 + 1;
    }
    else{
      //use additional months
      size--;
      firstYearMonth = (lastYear-2)*100 + (12-size);
    }

    //Missing: add check to see if currentYearMonth[currentYearMonthIndex]
    //is outside operating area. If so, report it in the console, then skip it.
    var currentYearMonthIndex = 0;

    for(var i = firstYearMonth; i <= lastYearMonth; i++){
      var currentYearMonth = parseInt(data[currentYearMonthIndex]["date"]);
      if(i == currentYearMonth){
        objectToReturn.push(parseInt(data[currentYearMonthIndex]["value"]));
        currentYearMonthIndex++;
      }
      else{
        objectToReturn.push(null);
      }

      var month = i-(Math.floor(i/100)*100);
      if(month == 12){
        i += 100;
        i -= 12;
      }
    }
    if(currentYearMonthIndex != data.length){
    }
    return objectToReturn;
  }

  // calculates moving averages for an input array of data
  // sample:
  //   input: [3,6,3,9,12,6]
  //     size = 3
  //     result: [null,4,6,8,9,null] 
  getMovingAverage (data) {
    var arrayToReturn = [];
    //sample size
    var size = Math.floor(this.intervalMovingAverage/2);

    if(size == 0){
      return data;
    }

    for(let i = size; i < data.length-size; i++){
      let temp = 0;
      let existing = true;
      for(let j = size*-1; j <= size; j++){
        if(data[i+j] == null){
          //if a sample value is null,
          //we cannot calculate a moving average for data[i]
          existing = false;
          arrayToReturn.push(null);
          break;
        }
        else{
          temp += data[i+j];
        }
      }
      if(existing){
        arrayToReturn.push(temp/(size*2+1));  
      }
    }
    return arrayToReturn;
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
