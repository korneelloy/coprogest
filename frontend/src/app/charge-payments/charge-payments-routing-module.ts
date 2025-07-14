import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChargePaymentList } from './components/charge-payment-list/charge-payment-list';
import { ChargePaymentDetail } from './components/charge-payment-detail/charge-payment-detail';
import { ChargePaymentForm } from './components/charge-payment-form/charge-payment-form';

const routes: Routes = [
  { path: '', component: ChargePaymentList },
  { path: 'new', component: ChargePaymentForm },
  { path: ':id', component: ChargePaymentDetail },
  { path: ':id/edit', component: ChargePaymentForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChargePaymentsRoutingModule {}
