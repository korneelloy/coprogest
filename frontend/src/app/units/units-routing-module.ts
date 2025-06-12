import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitList } from './components/unit-list/unit-list';
import { UnitDetail } from './components/unit-detail/unit-detail';
import { UnitForm } from './components/unit-form/unit-form';

const routes: Routes = [
  { path: '', component: UnitList },
  { path: 'new', component: UnitForm },
  { path: ':id', component: UnitDetail },
  { path: ':id/edit', component: UnitForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitsRoutingModule { }
