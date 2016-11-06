import { Component } from '@angular/core';
@Component({
	selector: 'my-home',
	template: `
		<h2>{{title}}</h2>
		<!--<my-sidenav></my-sidenav>
		<my-statres></my-statres>
		<my-pretab></my-pretab> -->
		<nav>
			<a routerLink="/sidenav" routerLinkActive="active">Next</a>
		</nav>
	`
})
export class HomeComponent {
	title = 'My Home Component in Angular'
}
