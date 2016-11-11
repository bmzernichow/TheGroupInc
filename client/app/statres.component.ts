import { Component } from '@angular/core';
@Component({
	moduleId: module.id,
  selector: 'my-statres',
  //template: '<h2>My StatRes in Angular</h2>',
  templateUrl: 'statres.component.html',
})
export class StatResComponent {
	SUM = "Teststring 1";
	MIN = "Teststring 2";
	MAX = "Teststring 3";
	STDEV = "Teststring 4";
	COUNT = "Teststring 5";

	save(): void{
		// stub
		console.log("save pressed!");
	}
}