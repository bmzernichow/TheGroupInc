import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }  from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }     from './app.component';
import { HomeComponent }    from './home.component';
import { SidenavComponent } from './sidenav.component';
import { StatResComponent } from './statres.component';
import { PreTabComponent }  from './pretab.component';



@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
	],
	declarations: [
		AppComponent,
		HomeComponent,
		SidenavComponent,
		StatResComponent,
		PreTabComponent,
	],
	bootstrap:    [ AppComponent ]
})
export class AppModule { }
