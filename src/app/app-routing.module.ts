import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path:'',component:LoginComponent
  },
  {
    path:'dashboard',component:DashboardComponent
  },
  {
    path:'employees',component:EmployeeListComponent,canActivate:[authGuard]
  },
  {
    path:'employee/add',component:EmployeeAddComponent,canActivate:[authGuard]
  },
  {
    path:'employee/edit/:id',component:EmployeeEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
