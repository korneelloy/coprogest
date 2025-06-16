import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitGroupList } from './components/unit-group-list/unit-group-list';
import { UnitGroupDetail } from './components/unit-group-detail/unit-group-detail';
import { UnitGroupForm } from './components/unit-group-form/unit-group-form';

const routes: Routes = [
  { path: '', component: UnitGroupList },
  { path: 'new', component: UnitGroupForm },
  { path: ':id', component: UnitGroupDetail },
  { path: ':id/edit', component: UnitGroupForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class UnitGroupsRoutingModule { }
