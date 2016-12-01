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
  intervalMovingAverage = '3';
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
  getStatistics() {
    if(this.enableMovingAverage){
      this.sharedService.intervalMovingAverage = parseInt(this.intervalMovingAverage);
    }
    else{
      this.sharedService.intervalMovingAverage = 1;
      this.intervalMovingAverage = "1";
    }
    return new Promise((resolve,reject)=>{
      //get data from server
      this.lookupService.getStatistics(
        this.indicator,
        this.intervalMovingAverage,
        this.orgUnit
      )
      // .catch(this.handleError)
      .catch(
        error => {
          reject(error);
          return Observable.throw(null);
        }
      )
      .subscribe(
        data => {
          if(data == null || data == []){
            reject("no data recived");
          }
          else{
            this.sharedService.dataRaw = data;
            resolve("resolved");
          }
        },
        error => {
          reject(error);
        }
      )
    });
  }
}