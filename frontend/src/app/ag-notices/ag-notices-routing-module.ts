import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgNoticeList } from './components/ag-notice-list/ag-notice-list';
import { AgNoticeDetail } from './components/ag-notice-detail/ag-notice-detail';
import { AgNoticeForm } from './components/ag-notice-form/ag-notice-form';


const routes: Routes = [
  { path: '', component: AgNoticeList },
  { path: 'new', component: AgNoticeForm },
  { path: ':id', component: AgNoticeDetail },
  { path: ':id/edit', component: AgNoticeForm },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgNoticesRoutingModule {}
