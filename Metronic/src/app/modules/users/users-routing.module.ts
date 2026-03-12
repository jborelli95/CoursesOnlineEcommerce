import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersListComponent } from 'src/app/modules/users/users-list/users-list.component';

const routes: Routes = [
  {
    path:'',
    component: UsersComponent,
    children: [
      {
        /**User list already exist... User-listS its the component we requiered */
        path: 'user-list',
        component: UsersListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
