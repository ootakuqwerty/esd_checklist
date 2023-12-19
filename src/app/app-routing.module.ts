import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DefaultLayoutComponent } from './shared/default-layout/default-layout.component';
import { CheckSheetsComponent } from './views/check-sheets/check-sheets.component'
import { RoleComponent } from './views/role/role.component';
import { UsersComponent } from './views/users/users.component';
import { AuditComponent } from './views/audit/audit.component'

const routes: Routes = [
  {
    path: 'views',
    component: DefaultLayoutComponent,
    children: [
      { path: 'check-sheet', component: CheckSheetsComponent },
      { path: 'role', component: RoleComponent },
      { path: 'users', component: UsersComponent },
      { path: 'audit', component: AuditComponent },
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }