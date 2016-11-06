import { Component } from '@angular/core';
@Component({
	moduleId: module.id,
	selector: 'my-app',
	template: `
		<h1>{{title}}</h1>
		<nav>
			<a routerLink="/home" routerLinkActive="active">Home</a>
			<a routerLink="/sidenav" routerLinkActive="active">Sidenav</a>
			<a routerLink="/statres" routerLinkActive="active">Statres</a>
			<a routerLink="/pretab" routerLinkActive="active">Pretab</a>
		</nav>
		<router-outlet></router-outlet>
	`,
})
export class AppComponent {
	title = 'My App Component in Angular'
}
