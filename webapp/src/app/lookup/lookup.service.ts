import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LookupService {
  
  constructor(private http: Http) { }

  getLookupUnit (query: string) {
    var headers = new Headers();
    headers.append('Authorization', "Basic " + btoa("admin:district"));
    
    if (!query) {
      return null;
    }
    return this.http.get(`https://play.dhis2.org/test/api/organisationUnits.json?paging=false&filter=displayName:ilike:${query}`, {headers: headers})
                      .map((res: Response) => res.json())
                      .map((response: any) => response.organisationUnits);
  }

  getLookupIndicator (query: string) {
    var headers = new Headers();
    headers.append('Authorization', "Basic " + btoa("admin:district"));
    
    if (!query) {
      return null;
    }
    return this.http.get(`https://play.dhis2.org/test/api/organisationUnits.json?paging=false&filter=displayName:ilike:${query}`, {headers: headers})
                      .map((res: Response) => res.json())
                      .map((response: any) => response.organisationUnits);
  }

}

