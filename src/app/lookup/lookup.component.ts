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
  // items array for period menu
  items = [
    {value: 'MONTHS'},
    {value: 'WEEKS'},
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
    
    if(this.period == "WEEKS"){
    }
    else{
      var timeperiod = "";
      var d = new Date();
      var y = d.getFullYear();
      var m = d.getMonth();
      var p = 1; 
      if(this.enableMovingAverage){
        p = parseInt(this.intervalMovingAverage);
      }
      // console.log("Month: "+m);
      // console.log("intervalMovingAverage:"+p);
      for (var i = (m+12+p-1); i >= 0; i--){
        // console.log(i);
        if(i>m+12){
          // console.log("i > m + 12; " + i + ">" + m + " " + 12);
          if(24+m-i+1<10){
           timeperiod = timeperiod + (y-2) +"0" + (24+m-i+1)+";";
           // console.log("p1: " +(24+m-i+1));
         }
         else{
           timeperiod = timeperiod + (y-2) +"" + (24+m-i+1)+";";
           // console.log("p2: " +(24+m-i+1));
         }
        }


       else if (i<m+1){
         // console.log("i < m + 1; " + i + "<" + m + " " + 1);
         if(m-i+1<10){
           timeperiod = timeperiod + y +"0" + (m-i+1)+";";
           // console.log("a1: " +(m-i+1));
         }
         else{
           timeperiod = timeperiod + y +"" + (m-i+1)+";";
           // console.log("a2: " +(m-i+1));
         }
       }
       else {
         if(m+13-i<10){
           timeperiod = timeperiod + (y-1) +"0"+ (m+13-i)+";"
           // console.log("b1: "+(m+13-i));
         }
         else {
           timeperiod = timeperiod + (y-1) +""+ (m+13-i)+";"
           // console.log("b2: "+(m+13-i));
         }

       }
      }
      this.lookupService.getStatistics(this.indicator, timeperiod, this.orgUnit).subscribe(data => {
        this.sharedService.data = data
      });
    }
    if(this.enableMovingAverage){
      this.sharedService.intervalMovingAverage = parseInt(this.intervalMovingAverage);
    }
    else{
      this.sharedService.intervalMovingAverage = 1;
    }
  }
}
