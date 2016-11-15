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
  periodMovingAverage: string;
  open: boolean;
  open2: boolean;

  constructor(private lookupService: LookupService, private sharedService: SharedService) {
  }

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
    {value: 'LAST_6_MONTHS'},
    {value: 'LAST_12_MONTHS'},
  ];
  // items array for the periodMovingAverage menu
  items2 = [
    {value: '1'},
    {value: '2'},
    {value: '3'},
    {value: '4'},
    {value: '5'},
    {value: '6'},
    {value: '7'},
    {value: '8'},
    {value: '9'},
    {value: '10'},
    {value: '11'},
    {value: '12'},
  ];

  // function for generating url from unit, indicator and period and returning http response
  getStatistics(indicator: string, period: string, orgUnit: string) {
    this.lookupService.getStatistics(this.indicator, this.period, this.orgUnit).subscribe(data => {
      this.sharedService.data = data
    });
  }

}
