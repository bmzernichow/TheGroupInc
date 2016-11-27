import {Component, Input} from '@angular/core';
import {SharedService} from '../shared.service';
import {INglDatatableSort, INglDatatableRowClick} from 'ng-lightning/ng-lightning';

const DATA = [
  {date: '-', value: '0'},
  {date: '-', value: '0'},
  {date: '-', value: '0'},
  {date: '-', value: '0'},
  {date: '-', value: '0'}
];

@Component({
  selector: 'datatable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class TableComponent {

  constructor(private sharedService: SharedService) {
  }

  @Input() data: any;
  border = true;

  // Initial sort
  sort: INglDatatableSort = {key: 'date', order: 'asc'};

  // Show loading overlay
  loading = false;

  // Toggle name column
  hideName = false;

  // Custom sort function
  onSort($event: INglDatatableSort) {
    const {key, order} = $event;
    this.data.sort((a: any, b: any) => {
      return (key === 'date' ? b[key] - a[key] : b[key].localeCompare(a[key])) * (order === 'desc' ? 1 : -1);
    });
  }

  onRowClick($event: INglDatatableRowClick) {
    console.log('clicked row', $event.data);
  }

  // fetch data to table
  getParsed() {
    this.data = this.sharedService.parseToTable();
    this.sharedService.getMovingAverage(this.sharedService.dataParsed, 'value');
  }
}