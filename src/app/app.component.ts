import {Component, Directive} from '@angular/core';
import {TableComponent} from './table/table.component';
import {ChartComponent} from './chart/chart.component';
import {SharedService} from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TableComponent, ChartComponent]
})

export class AppComponent {
  updateData: any;
  dataChartUpper: any;
  dataChartLower: any;
  constructor(private sharedService: SharedService, private chartComponent: ChartComponent) {
    this.updateData = [{date: 'Test', value: '100'}];
    this.dataChartUpper = this.chartComponent.getDatasetChart([], false);
    this.dataChartLower = this.chartComponent.getDatasetChart([], false);
    // console.log(this.tb.data);
  }

  tester() {
    this.updateData = this.sharedService.parseToTable();
    this.sharedService.getMovingAverage(this.sharedService.dataParsed, 'value');
    let _data1 = this.sharedService.parseToChart(this.sharedService.dataMovingAverages, 'value');
    let _data2 = this.sharedService.parseToChart(this.sharedService.dataParsed, 'value');
    this.dataChartUpper = this.chartComponent.getDatasetChart(_data1, false);
    this.dataChartLower = this.chartComponent.getDatasetChart(_data2, true);
    // this.sharedService.getMovingAverage(this.sharedService.dataParsed, 'value');
  }

}