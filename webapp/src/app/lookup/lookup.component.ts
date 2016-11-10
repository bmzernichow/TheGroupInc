import {Component} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent {

  superhero: string = null;
  value: string = '';
  address = '';
  hero: string = null;

  superheroes = ['Hulk', 'Flash', 'Superman', 'Batman', 'Spiderman', 'Iron Man', 'Thor', 'Wolverine', 'Deadpool'];
  superheroeines = ['Catwoman', 'She-Hulk', 'Wonder Woman', 'Batwoman', 'Invisible Woman'];

  scopes = [
    { value: 'All', icon: 'groups' },
    { value: 'Men', icon: 'user' },
    { value: 'Women', icon: 'lead' },
  ];

  scope = this.scopes[0];

  constructor(private http: Http) {}

  lookup = (query: string, source = this.superheroes): string[] => {
    if (!query) {
      return null;
    }

    return source.filter((d: string) => d.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }

  // This function is now safe to pass around
  lookupAsync = (query: string): Observable<any[]> => {
    if (!query) {
      return null;
    }

    return this.http.get(`//maps.googleapis.com/maps/api/geocode/json?address=${query}`)
      .map((res: Response) => res.json())
      .map((response: any) => response.results);
  }

  lookupPolymorphic = (query: string): string[] => {
    let heroes: string[];
    if (this.scope.value === 'Men') {
      heroes = [ ...this.superheroes ];
    } else if (this.scope.value === 'Women') {
      heroes = [ ...this.superheroeines ];
    } else {
      heroes = [ ...this.superheroes, ...this.superheroeines ];
    }

    return this.lookup(query, heroes);
  }
}
