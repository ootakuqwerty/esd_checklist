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
import { SgaCheckSheetListComponent } from './views/sga-check-sheet-list/sga-check-sheet-list.component';
import { SgaReportsComponent } from './views/sga-reports/sga-reports.component';
import { IsAuthorizedGuard } from './guard/is-authorized.guard';
import { EsdCheckSheetsListComponent } from './views/esd-check-sheets-list/esd-check-sheets-list.component';

const routes: Routes = [
  {
    path: 'views',
    component: DefaultLayoutComponent,
    children: [
      { path: 'esd-check-sheet', component: EsdCheckSheetsComponent, canActivate: [IsAuthorizedGuard] },
      { path: 'esd-check-sheet-list', component: EsdCheckSheetsListComponent, canActivate: [IsAuthorizedGuard] },
      { path: 'sga-check-sheet-list', component: SgaCheckSheetListComponent, canActivate: [IsAuthorizedGuard] },
      { path: 'sga-check-sheet', component: SgaCheckSheetComponent, canActivate: [IsAuthorizedGuard] },
      { path: 'sga-patrol-form', component: SgaPatrolFormComponent, canActivate: [IsAuthorizedGuard] },
      { path: 'role', component: RoleComponent, canActivate: [IsAuthorizedGuard] },
      { path: 'users', component: UsersComponent, canActivate: [IsAuthorizedGuard] },
      { path: 'esd-audit', component: AuditComponent, canActivate: [IsAuthorizedGuard] },
      { path: 'sga-reports', component: SgaReportsComponent, canActivate: [IsAuthorizedGuard] },
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