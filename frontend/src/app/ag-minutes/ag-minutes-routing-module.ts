import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgMinutesList } from './components/ag-minutes-list/ag-minutes-list';
import { AgMinutesDetail } from './components/ag-minutes-detail/ag-minutes-detail';
import { AgMinutesForm } from './components/ag-minutes-form/ag-minutes-form';

const routes: Routes = [
  { path: '', component: AgMinutesList },
  { path: 'new', component: AgMinutesForm },
  { path: ':id', component: AgMinutesDetail },
  { path: ':id/edit', component: AgMinutesForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgMinutesRoutingModule {}
