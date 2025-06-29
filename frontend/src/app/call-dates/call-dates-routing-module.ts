import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallDateForm } from './components/call-date-form/call-date-form';


const routes: Routes = [
  { path: 'new/:idagresolution/:nbofinstalments', component: CallDateForm },  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallDatesRoutingModule { }
