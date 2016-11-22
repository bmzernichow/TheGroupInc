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
  getStatistics(indicator: string, period: string, orgUnit: string) {
    var headers = new Headers();
    headers.append('Authorization', "Basic " + btoa("admin:district"));

    let ind = this.iterateId(indicator);
    let unit = this.iterateId(orgUnit);

    return this.http.get(`https://play.dhis2.org/test/api/analytics.json?dimension=dx:${ind}&dimension=pe:${period}&filter=ou:${unit}&displayProperty=NAME`, {headers: headers})
      .map((res: Response) => res.json())
      .map((response: any) => response.rows);
  }

}

