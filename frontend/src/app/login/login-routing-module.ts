import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginForm } from './components/login-form/login-form';


const routes: Routes = [
  { path: '', component: LoginForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
