import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ManageRequestsComponent } from './manage-requests/manage-requests.component';
import { ManageTodoComponent } from './manage-todo/manage-todo.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

const routes: Routes = [

  // Admin and Login Guard has already been added in app-routing.module.ts
  {
    path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'manage-user' },
      { path: 'manage-user', component: ManageUserComponent },
      { path: 'manage-todo', component: ManageTodoComponent },
      { path: 'manage-requests', component: ManageRequestsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
