import {Component, ViewChild} from '@angular/core';
import {LookupComponent} from './lookup/lookup.component';
import {TableComponent} from './table/table.component';
import {ChartComponent} from './chart/chart.component';
import {LookupService} from './lookup/lookup.service';
import {SharedService} from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TableComponent, ChartComponent, LookupComponent, LookupService]
})

export class AppComponent {

  @ViewChild(LookupComponent) lookupComponent: LookupComponent;
  @ViewChild(TableComponent) tableComponent: TableComponent;

  dataTable: any;
  dataChartUpper: any;
  dataChartLower: any;

  tableInit = [
  {date: '-', value: '0'},
  {date: '-', value: '0'},
  {date: '-', value: '0'},
  {date: '-', value: '0'},
  {date: '-', value: '0'}
  ];

  chartInit = [];

  constructor(private sharedService: SharedService, private chartComponent: ChartComponent) {
    this.dataTable = this.tableInit;
    this.dataChartUpper = this.chartComponent.getDatasetChart(this.chartInit, false);
    this.dataChartLower = this.chartComponent.getDatasetChart(this.chartInit, false);
  }

  getDataTableAndChart() {
    // this.chartComponent.getChartData();
    var size = Math.floor(this.sharedService.intervalMovingAverage/2);
    console.log("durr1");
    console.log(this.sharedService.dataParsed);
    var dataWithNull = this.sharedService.getDatasetWithNull(this.sharedService.dataParsed, size);
    console.log("durr2");
    this.dataTable = this.sharedService.dataTable;
    console.log("durr3");
    let _data1 = this.sharedService.getMovingAverage(dataWithNull, size);
    console.log("durr4");
    let _data2 = dataWithNull.slice(size,dataWithNull.length);
    console.log("durr5");
    console.log(_data1);

    this.dataChartUpper = this.chartComponent.getDatasetChart(_data1, false);
    console.log("durr6");
    this.dataChartLower = this.chartComponent.getDatasetChart(_data2, true);
    console.log("durr7");

    //possibly unneeded
    this.sharedService.dataMovingAverages = _data1;
    console.log("durr8");



    // update table
    // this.dataTable = this.sharedService.dataTable;
    // // update chart arrays with values, including moving averages, from shared.service.ts
    // let _data1 = this.sharedService.parseToChart(this.sharedService.dataMovingAverages, 'value');
    // let _data2 = this.sharedService.parseToChart(this.sharedService.dataParsed, 'value');
    // this.dataChartUpper = this.chartComponent.getDatasetChart(_data1, false);
    // this.dataChartLower = this.chartComponent.getDatasetChart(_data2, true); 
  }

  // timer loop --> detects/ checks every 500ms if data is parsed to arrays
  // timerLoop() {
  //   var timer = setInterval(() => {
  //     if (this.sharedService.dataMovingAverages.length > 1) {
  //       this.getDataTableAndChart();
  //       clearInterval(timer);
  //     }
  //   },500);
  // }

  getData() {
    var p = this.lookupComponent.getStatistics();
    console.log("getStatistics end");
    p.then(
      ()=>{
        console.log("app.component got data from server");
        this.getDataTableAndChart();
        console.log("app.component returned from calculations");
      }
    ).catch(
      function(){

      }
    );
    // this.timerLoop();
  }
}