import {Injectable} from '@angular/core';

@Injectable()
export class SharedService {
  //local variabls
  intervalMovingAverage;

  //array sets
  dataRaw: any;            //JSON fetched from server
  dataParsed = [];         //[[date,data], [date,data], [date,data],...]
  dataChartUpperSource = [];     // used in dataChartUpper [data | null, data | null, data | null,...]
  dataChartLowerSource = [];     // used in dataChartLower [data | null, data | null, data | null, ...] Beginning in january last year
  
  tableInit = [
    {date: '-', value: '0'},
    {date: '-', value: '0'},
    {date: '-', value: '0'},
    {date: '-', value: '0'},
    {date: '-', value: '0'}
  ];

  constructor() {
  }

  // iterates an object and returns values from key/ value pairs
  iterateId(objectToIterate, _key) {
    for (let key of Object.keys(objectToIterate)) {
      let value = objectToIterate[key];
      if (key == _key) {
        return value;
      }
    }
  }

 /**
  * Returns the parsed data, only including the period and value
  *
  * @param  {[[id,period,value], [id,period,value], ... ]}, dataRaw
  * @return {[[date: String,value: String], [date: String,value: String], ...]}
  */

  parseData(dataRaw){
    let dataParsed = [];
    for (var i = 0; i < dataRaw.length; i++) {
      dataParsed.push({date: dataRaw[i][1], value: dataRaw[i][2]})
    }
    this.dataParsed = dataParsed;
    return dataParsed;
  }

 /**
  * Extracts the part to be shown in the table.component from the parsed data 
  *
  * @param  {[[String, String], [String, String],...]}, dataParsed
  * @return {[[String, String], [String, String],...]}
  */
  getTableData(dataParsed) {
    //fill table
    let d = dataParsed.length;
    return dataParsed.slice(d-5, d);
  }

 /**
  * Generates the source data for chartUpper
  *
  * @param  {[Number | null, Number | null, ...]}, dataWithNull
  * @param  {Number}, size
  * @return {[Number | null, Number | null, ...]}
  */

  generateChartUpperSource(dataWithNull,size){
    this.dataChartUpperSource = this.getMovingAverage(dataWithNull, size);
    return this.dataChartUpperSource;
  }

 /**
  * Generates the source data for chartLower
  *
  * @param  {[Number | null, Number | null, ...]}, dataWithNull
  * @param  {Number}, size
  * @return {[Number | null, Number | null, ...]}
  */

  generateChartLowerSource(dataWithNull,size){
    this.dataChartLowerSource = dataWithNull.slice(size,dataWithNull.length);
    return this.dataChartLowerSource;
  }

 /**
  * Takes a array of parsed data ([[date,data], [date,data],...]), and
  * formats it into a desired set of only data, inserting null for missing dates
  * the data given must be ordered oldest -> newest
  *
  * @param  {[[String, String], [String, String],...]}, data
  * @param  {Number}, size
  * @return {[Number | null, Number | null, ...]}
  */
  getDatasetWithNull(data, size){
    var objectToReturn = [];
    var lastYearMonth = parseInt(data[data.length-1]["date"]);
    var lastYear = Math.floor(lastYearMonth/100);

    //used to figure out how many months use from two years before lastYear
    // var size = Math.floor(this.intervalMovingAverage/2);
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
 /**
  * Calculates moving averages for an input array of data
  * Sample:
  *   Input: [3,6,3,9,12,6]
  *     Size = 3
  *     Result: [null,4,6,8,9,null] 
  *
  * @param  {[Number | null, Number | null, ...]}, data
  * @param  {Number}, size
  * @return {[Number | null, Number | null, ...]}
  */
  getMovingAverage (data,size) {
    var arrayToReturn = [];
    //sample size
    // var size = Math.floor(this.intervalMovingAverage/2);

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
}
