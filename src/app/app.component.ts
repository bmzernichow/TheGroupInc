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
    // update table
    this.dataTable = this.sharedService.dataTable;
    // update chart arrays with values, including moving averages, from shared.service.ts
    let _data1 = this.sharedService.parseToChart(this.sharedService.dataMovingAverages, 'value');
    let _data2 = this.sharedService.parseToChart(this.sharedService.dataParsed, 'value');
    this.dataChartUpper = this.chartComponent.getDatasetChart(_data1, false);
    this.dataChartLower = this.chartComponent.getDatasetChart(_data2, true); 
  }

  // timer loop --> detects/ checks every 500ms if data is parsed to arrays
  timerLoop() {
    var counter = 10;
    for (var i = 0; i < counter; i++) {
      setTimeout(() => {
        if (this.sharedService.dataMovingAverages.length > 1) {
          this.getDataTableAndChart();
          i = 10;
        }
      },500);
    }
  }

  getData() {
    this.lookupComponent.getStatistics();
    this.timerLoop();
    }
  }
