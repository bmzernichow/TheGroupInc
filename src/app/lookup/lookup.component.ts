import {Component, Output} from '@angular/core';
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
  open: boolean;
  open2: boolean;
  intervalMovingAverage: string;
  enableMovingAverage: boolean = true;

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
  // items array for the periodMovingAverage menu
  items2 = [
    {value: '3'},
    {value: '5'}
  ];


  // function for generating url from unit, indicator and period and returning http response
  getStatistics() {
    console.log(this.orgUnit);

    if(this.enableMovingAverage){
      this.sharedService.intervalMovingAverage = parseInt(this.intervalMovingAverage);
    }
    else{
      this.sharedService.intervalMovingAverage = 1;
      this.intervalMovingAverage = "1";
    }
       this.lookupService.getStatistics(this.indicator, this.intervalMovingAverage, this.orgUnit).subscribe(data => {
        //this.sharedService.dataRaw = data
        this.sharedService.getData(data)
      });
  }
}
