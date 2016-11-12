import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LookupService {

  value: string = '';
  orgUnit = '';
  
  constructor(private http: Http) { }

  getLookupAsync (query: string) {
    
    if (!query) {
      return null;
    }

    var headers = new Headers();
    headers.append('Authorization', "Basic " + btoa("admin:district"));

    return this.http.get(`https://play.dhis2.org/test/api/organisationUnits.json?paging=false&filter=displayName:ilike:${query}`, {headers: headers})
      .map((res: Response) => res.json())
      .map((response: any) => response.organisationUnits);
  }

}

