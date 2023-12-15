import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  // {
    // path: 'views',
    // component: DefaultLayoutComponent,
    // children: [
    //   { path: 'dashboard', component: DashboardComponent },
    //   { path: 'profile', component: ProfileComponent },
    //   { path: 'change-changepassword', component: ChangePasswordComponent },
    //   { path: 'change-changepassword/:id', component: ChangePasswordComponent },
    // ]
  // },

  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }