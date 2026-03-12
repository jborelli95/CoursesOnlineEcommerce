import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './modules/auth/service/auth-guard';

const routes: Routes = [
  {
    path:'',
    //canActivate: [authGuard],
    loadChildren: () => import("./modules/home/home-module").then(m => m.HomeModule)
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'error/404'
  },
  {
    path: 'auth',
    loadChildren: () => import("./modules/auth/auth-module").then(x => x.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
