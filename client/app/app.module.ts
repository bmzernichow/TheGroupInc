import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import { SelectorComponent } from './selector.component';
import { StatResComponent } from './statres.component';
import { PreTabComponent } from './pretab.component';


@NgModule({
	imports:      [ BrowserModule ],
	declarations: [
		AppComponent,
		SelectorComponent,
		StatResComponent,
		PreTabComponent,
	],
	bootstrap:    [ AppComponent ]
})
export class AppModule { }
