import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page-component/landing-page-component';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class LandingpageRoutingModule { }


