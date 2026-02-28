import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { Auth } from './auth';
import { LoginAndRegister } from './login-and-register/login-and-register';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    Auth,
    LoginAndRegister
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    provideHttpClient()
  ]
})
export class AuthModule { }
