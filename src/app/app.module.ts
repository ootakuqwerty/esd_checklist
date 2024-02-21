import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { DefaultLayoutComponent } from './shared/default-layout/default-layout.component';
import { EsdCheckSheetsComponent } from './views/esd-check-sheets/esd-check-sheets.component';
import { RoleComponent } from './views/role/role.component';
import { UsersComponent } from './views/users/users.component';
import { AuditComponent } from './views/esd-audit/esd-audit.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { SgaCheckSheetComponent } from './views/sga-check-sheet/sga-check-sheet.component';
import { SgaPatrolFormComponent } from './views/sga-patrol-form/sga-patrol-form.component';
import { SgaCheckSheetListComponent } from './views/sga-check-sheet-list/sga-check-sheet-list.component';
import { SgaReportsComponent } from './views/sga-reports/sga-reports.component';
import { IsAuthorizedGuard } from './guard/is-authorized.guard';
import { EsdCheckSheetsListComponent } from './views/esd-check-sheets-list/esd-check-sheets-list.component';
import { DataTablesModule } from 'angular-datatables';
import { EsdReverificationComponent } from './views/esd-reverification/esd-reverification.component';
import { EsdReverificationListComponent } from './views/esd-reverification-list/esd-reverification-list.component';
import { EsdReportListComponent } from './views/esd-report-list/esd-report-list.component';
import { EsdReportComponent } from './views/esd-report/esd-report.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DefaultLayoutComponent,
    EsdCheckSheetsComponent,
    RoleComponent,
    UsersComponent,
    AuditComponent,
    SgaCheckSheetComponent,
    SgaPatrolFormComponent,
    SgaCheckSheetListComponent,
    SgaReportsComponent,
    EsdCheckSheetsListComponent,
    EsdReverificationComponent,
    EsdReverificationListComponent,
    EsdReportListComponent,
    EsdReportComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    DataTablesModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 5000, // 5 seconds
      progressBar: false,
    }),
    CommonModule,
    NgxSpinnerModule
  ],
  providers: [IsAuthorizedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
