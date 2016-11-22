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
  intervalMovingAverage: string;
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
    {value: 'MONTHS'},
    {value: 'WEEKS'},
  ];
  // items array for the periodMovingAverage menu
  items2 = [
    {value: '3'},
    {value: '5'},
  ];

  // function for generating url from unit, indicator and period and returning http response
  getStatistics(indicator: string, intervalMovingAverage: string, orgUnit: string) {
    

      
      this.lookupService.getStatistics(this.indicator, this.intervalMovingAverage, this.orgUnit).subscribe(data => {
        this.sharedService.data = data
      });
    
    this.sharedService.intervalMovingAverage = parseInt(this.intervalMovingAverage);
  }
}
