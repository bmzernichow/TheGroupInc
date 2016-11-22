import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LookupService {

  constructor(private http: Http) {
  }

  // function that iterates an object and returns values from key/ value pairs
  iterateId(objectToIterate) {
    for (let key of Object.keys(objectToIterate)) {
      let value = objectToIterate[key];
      if (key == 'id') {
        return value;
      }
    }
  }

  // http request - returns organisation units for lookup function
  getLookupUnit(query: string) {
    var headers = new Headers();
    headers.append('Authorization', "Basic " + btoa("admin:district"));

    if (!query) {
      return null;
    }
    return this.http.get(`https://play.dhis2.org/test/api/organisationUnits.json?paging=false&filter=displayName:ilike:${query}`, {headers: headers})
      .map((res: Response) => res.json())
      .map((response: any) => response.organisationUnits);
  }

  // http request - returns indicators for lookup function
  getLookupIndicator(query: string) {
    var headers = new Headers();
    headers.append('Authorization', "Basic " + btoa("admin:district"));

    if (!query) {
      return null;
    }
    return this.http.get(`https://play.dhis2.org/test/api/indicators.json?paging=false&filter=displayName:ilike:${query}`, {headers: headers})
      .map((res: Response) => res.json())
      .map((response: any) => response.indicators);
  }

  // function for generating url from unit, indicator and period and returning http response
  getStatistics(indicator: string, intervalMovingAverage: string, orgUnit: string) {
    var timeperiod = "";
      var d = new Date();
      var y = d.getFullYear();
      var m = d.getMonth();
      // the amount of extra needed datapoints to calculate moving average.  
      var p = parseInt(intervalMovingAverage);
      // Making a string for the period in the format yyyymm for each month of from last year until current. 
      // Also adding p-1 extra months in front if this interfal
      for (var i = (m+12+p-1); i >= 0; i--){
        //the p-1 extra months
        if(i>m+12){
          if(24+m-i+1<10){
           timeperiod = timeperiod + (y-2) +"0" + (24+m-i+1)+";";
           }
         else{
           timeperiod = timeperiod + (y-2) +"" + (24+m-i+1)+";";
          }
        }
       //this year
       else if (i<m+1){
         if(m-i+1<10){
           timeperiod = timeperiod + y +"0" + (m-i+1)+";";
         }
         else{
           timeperiod = timeperiod + y +"" + (m-i+1)+";";
         }
       }
       // last year
       else {
         if(m+13-i<10){
           timeperiod = timeperiod + (y-1) +"0"+ (m+13-i)+";"
          }
         else {
           timeperiod = timeperiod + (y-1) +""+ (m+13-i)+";"
         }
       }
     }
    var headers = new Headers();
    headers.append('Authorization', "Basic " + btoa("admin:district"));

    let ind = this.iterateId(indicator);
    let unit = this.iterateId(orgUnit);

    return this.http.get(`https://play.dhis2.org/test/api/analytics.json?dimension=dx:${ind}&dimension=pe:${timeperiod}&filter=ou:${unit}&displayProperty=NAME`, {headers: headers})
      .map((res: Response) => res.json())
      .map((response: any) => response.rows);
  }

}

