import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  constructor() { }

  data: any;
  data2 = [];

    parseLookupToTable() {
    console.log(this.data.length);
    //this.data2 = this.data;
    for (var i = 0; i < 7; i++) {
            this.data2.push({date: this.data[i][1], value: this.data[i][2]})
  }
          console.log(this.data2);
          this.data = this.data2;
}


}
