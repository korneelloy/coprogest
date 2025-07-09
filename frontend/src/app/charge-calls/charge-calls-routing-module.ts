import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChargeCallList } from './components/charge-call-list/charge-call-list';
import { ChargeCallDetail } from './components/charge-call-detail/charge-call-detail';
import { ChargeCallForm } from './components/charge-call-form/charge-call-form';

const routes: Routes = [
  { path: '', component: ChargeCallList },
  { path: 'new', component: ChargeCallForm },
  { path: ':id', component: ChargeCallDetail },
  { path: ':id/edit', component: ChargeCallForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChargeCallsRoutingModule {}
