import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactFormComponent } from './components/contact-form/contact-form';
import { ContactRoutingModule } from './contact-routing-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ContactFormComponent,
    ContactRoutingModule
  ]
})
export class ContactModule {}
