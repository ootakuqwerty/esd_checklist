import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DefaultLayoutComponent } from './shared/default-layout/default-layout.component';
import { EsdCheckSheetsComponent } from './views/esd-check-sheets/esd-check-sheets.component'
import { SgaCheckSheetComponent } from './views/sga-check-sheet/sga-check-sheet.component'
import { RoleComponent } from './views/role/role.component';
import { UsersComponent } from './views/users/users.component';
import { AuditComponent } from './views/esd-audit/esd-audit.component';
import { SgaPatrolFormComponent } from './views/sga-patrol-form/sga-patrol-form.component';

const routes: Routes = [
  {
    path: 'views',
    component: DefaultLayoutComponent,
    children: [
      { path: 'esd-check-sheet', component: EsdCheckSheetsComponent },
      { path: 'sga-check-sheet', component: SgaCheckSheetComponent },
      { path: 'sga-patrol-form', component: SgaPatrolFormComponent },
      { path: 'role', component: RoleComponent },
      { path: 'users', component: UsersComponent },
      { path: 'esd-audit', component: AuditComponent },
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