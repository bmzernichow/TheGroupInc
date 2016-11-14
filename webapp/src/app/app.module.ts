import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NglModule} from 'ng-lightning/ng-lightning';
import {ChartModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { ChartComponent } from './chart/chart.component';
import { LookupComponent } from './lookup/lookup.component';
import {SharedService} from './shared.service';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ChartComponent,
    LookupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NglModule.forRoot(),
    ChartModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
