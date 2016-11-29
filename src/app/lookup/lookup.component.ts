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

  // function for generating url from unit, indicator and period and returning http response
// <<<<<<< HEAD
//   getStatistics() {
//   console.log(this.orgUnit);

// =======
  getStatistics() {  
// >>>>>>> promises
    if(this.enableMovingAverage){
      this.sharedService.intervalMovingAverage = parseInt(this.intervalMovingAverage);
    }
    else{
      this.sharedService.intervalMovingAverage = 1;
      this.intervalMovingAverage = "1";
    }
// <<<<<<< HEAD
//        this.lookupService.getStatistics(this.indicator, this.intervalMovingAverage, this.orgUnit).subscribe(data => {
//         //this.sharedService.dataRaw = data
//         this.sharedService.getData(data)
//       });
// =======

    return this.fetchFromServer();

    // return new Promise(
    //   function(resolve,reject){
    //     doAll(me);
    //     resolve(true);
    //   }
    //  );
    
    // this.lookupService.getStatistics(
    //   this.indicator,
    //   this.intervalMovingAverage,
    //   this.orgUnit
    // ).subscribe(data => {
    //   this.sharedService.dataRaw = data
    // });

    // this.fetchFromServer().subscribe(data => {
    //   this.sharedService.dataRaw = data
    // });

    // var me = this;
    // var p1 = new Promise(
    //   // The resolver function is called with the ability to resolve or
    //   // reject the promise
    //   function(resolve, reject) {
    //     console.log("running Promise p1");
    //     console.log(this);
    //     console.log(me);
    //     me.lookupService.getStatistics(
    //       me.indicator,
    //       me.intervalMovingAverage,
    //       me.orgUnit
    //     ).subscribe(data => {
    //       me.sharedService.dataRaw = data
    //     });
    //     // this.fetchFromServer();
    //     // this.lookupService.getStatistics(
    //     //   this.indicator,
    //     //   this.intervalMovingAverage,
    //     //   this.orgUnit
    //     // ).subscribe(data => {
    //     //   this.sharedService.dataRaw = data
    //     // });
    //     console.log("data fetched from server");
    //     if (1+1 == 2){
    //       console.log("if");
    //       resolve("resolved");
    //     }
    //     else{
    //       console.log("else");
    //       reject("rejected");
    //     }
    //     console.log("What happens here?");
    //     // window.setTimeout(
    //       // function() {
    //           // We fulfill the promise !
    //       // }, Math.random() * 2000 + 1000);
    //   }
    // // We define what to do when the promise is resolved/fulfilled with the then() call,
    // // and the catch() method defines what to do if the promise is rejected.
    // ).then(
    //     // Log the fulfillment value
    //   function(val) {
    //     console.log('Handle accepted promise ('+val+') here.');
    //     me.getStatistics2(me);
    //   }
    // ).then(
    //   function(val){
    //     console.log('Handle accepted promise ('+val+') here.');
    //   }
    // ).catch(
    //   // Log the rejection reason
    //   function(reason) {
    //     console.log('Handle rejected promise ('+reason+') here.');
    //     // this.getStatistics2();
    //   });

    
    // this.getStatistics2();
    // console.log("getStatistics end");
// >>>>>>> promises
  }

fetchFromServer(){
  console.log("fetchFromServer start");
  return new Promise((resolve,reject)=>{
    this.lookupService.getStatistics(
      this.indicator,
      this.intervalMovingAverage,
      this.orgUnit
    ).subscribe(data => {
      this.sharedService.getData(data);
      console.log("this.sharedService.dataRaw:");
      console.log(this.sharedService.dataRaw);
      resolve("resolved");
    });
  });
  // console.log("fetchFromServer end");
  // me.sharedService.dataRaw = temp;
  // return temp;
  // return this.sharedService.dataRaw;
}

// function getStatistics2(me){
//   console.log("getStatistics2 start");
//   console.log("this.sharedService.dataRaw:");
//   console.log(me.sharedService.dataRaw);
//   console.log("getStatistics2 end");
// }

// function emptyFunction(){
//   return true;
// }

// function doAll(me){
//   fetchFromServer(me)
//   .then(function(response){
//     console.log("first .then start");
//     getStatistics2(me);
//     console.log("second .then start");
//   })
//   .catch(function(error){
//     console.log("At catch");
//   });
//   console.log("doAll: DONE");
// }

}