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

  fillCharts(dataParsed){

    let size = Math.floor(this.sharedService.intervalMovingAverage/2);
    let dataWithNull = this.sharedService.getDatasetWithNull(this.sharedService.dataParsed, size);
    
    //fill lowerChart
    let dataCharLowerSource = this.sharedService.generateChartLowerSource(dataWithNull,size);
    this.dataChartLower = this.chartComponent.getDatasetChart(dataCharLowerSource, true);

    //fill upperChart
    let dataChartUpperSource = this.sharedService.generateChartUpperSource(dataWithNull,size);
    this.dataChartUpper = this.chartComponent.getDatasetChart(dataChartUpperSource, false);
  }

  getData() {
    let p = this.lookupComponent.getStatistics();
    p.then(
      ()=>{
        //parse the raw data
        let dataParsed = this.sharedService.parseData(this.sharedService.dataRaw);
        
        //fill table
        this.dataTable = this.sharedService.getTableData(dataParsed);

        //fill charts
        this.fillCharts(dataParsed);
      }
    ).catch(
      ()=>{

      }
    );
  }
}