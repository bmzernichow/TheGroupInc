import {Component} from '@angular/core';
import {LookupService} from './lookup.service'
import {SharedService} from '../shared.service';
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

  constructor(private lookupService: LookupService, private sharedService: SharedService) {}

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
    this.lookupService.getStatistics(this.indicator, this.period, this.orgUnit).subscribe(data => {this.sharedService.data = data});
    // console.log(this.sharedService.data2.length);
  }

  }