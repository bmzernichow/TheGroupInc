import {Component} from '@angular/core';
import {LookupService} from './lookup.service'
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css'],
  providers: [LookupService]
})

export class LookupComponent {

  valueOU: string = '';
  orgUnit = '';
  valueIndicator: string = '';
  indicator = '';
  period: string;
  open: boolean;

  data: any;

  constructor(private lookupService: LookupService) {}

  // Lookup async function for organisation units
  lookupOU = (query: string): Observable<any[]> => {
    return this.lookupService.getLookupUnit(query); 
  }

  // Lookup async function for indicators
  lookupIndicator = (query: string): Observable<any[]> => {
    return this.lookupService.getLookupIndicator(query); 
  }
  // items array for period menu
  items = [
    { value: 'LAST_6_MONTHS'},
    { value: 'LAST_12_MONTHS'},
  ];

  getStatistics(indicator: string, period: string, orgUnit: string) {
    this.lookupService.getStatistics(this.indicator, this.period, this.orgUnit).subscribe(data => {this.data = data});
  }

  getTest() {
    console.log(this.data);
    // this.table.toggleData();
  }

}