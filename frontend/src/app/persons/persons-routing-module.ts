import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonList } from './components/person-list/person-list';
import { PersonDetail } from './components/person-detail/person-detail';
import { PersonForm } from './components/person-form/person-form';

const routes: Routes = [
  { path: '', component: PersonList },
  { path: 'new', component: PersonForm },
  { path: ':id', component: PersonDetail },
  { path: ':id/edit', component: PersonForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonsRoutingModule {}
