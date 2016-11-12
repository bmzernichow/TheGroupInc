import {Component} from '@angular/core';
import {LookupService} from './lookup.service'
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css'],
  providers: [LookupService]
})

export class LookupComponent {

  value: string = '';
  orgUnit = '';

  constructor(private lookupService: LookupService) {}

  // Lookup async function for organisation units
  lookupAsync = (query: string): Observable<any[]> => {
    return this.lookupService.getLookupAsync(query); 
  }

  runClick() {
    console.log(typeof(this.orgUnit));
    for (let key of Object.keys(this.orgUnit)) {  
      let value = this.orgUnit[key];
      if (key == 'id') {
          console.log(value);
    }
}
}
}