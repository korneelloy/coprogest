import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactForm } from './components/contact-form/contact-form';

const routes: Routes = [
  { path: 'new', component: ContactForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
