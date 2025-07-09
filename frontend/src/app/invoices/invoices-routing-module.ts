import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceList } from './components/invoice-list/invoice-list';
import { InvoiceDetail } from './components/invoice-detail/invoice-detail';
import { InvoiceForm } from './components/invoice-form/invoice-form';

const routes: Routes = [
  { path: '', component: InvoiceList },
  { path: 'new', component: InvoiceForm },
  { path: ':id', component: InvoiceDetail },
  { path: ':id/edit', component: InvoiceForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesRoutingModule {}
