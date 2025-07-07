import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgResolutionForm } from './components/ag-resolution-form/ag-resolution-form';


const routes: Routes = [
  { path: ':id/edit', component: AgResolutionForm },
  { path: 'new/:idagnotice', component: AgResolutionForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgResolutionsRoutingModule {}
