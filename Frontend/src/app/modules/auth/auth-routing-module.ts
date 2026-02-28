import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Auth } from './auth';
import { LoginAndRegister } from './login-and-register/login-and-register';

const routes: Routes = [{
  path: "",
  component:Auth,
  children: [
    {
      path: 'login',
      component: LoginAndRegister
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
