import { Component } from '@angular/core';
@Component({
	selector: 'my-app',
	template: `
		<h1>{{title}}</h1>
		<my-selector></my-selector>
		<my-statres></my-statres>
		<my-pretab></my-pretab>
	`
})
export class AppComponent {
	title = 'My App Component in Angular'
}
