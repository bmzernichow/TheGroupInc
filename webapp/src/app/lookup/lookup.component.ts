import {Component} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})

export class LookupComponent {

  value: string = '';
  orgUnit = '';

  constructor(private http: Http) {}

  // Lookup async function for organisation units
  lookupAsync = (query: string): Observable<any[]> => {
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