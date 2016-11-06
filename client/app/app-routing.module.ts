import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }    from './home.component';
import { SidenavComponent } from './sidenav.component';
import { StatResComponent } from './statres.component';
import { PreTabComponent }  from './pretab.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'sidenav', component: SidenavComponent},
  { path: 'statres', component: StatResComponent},
  { path: 'pretab', component: PreTabComponent},
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
