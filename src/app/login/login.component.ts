import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service'
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService, 
    private spinner: NgxSpinnerService,) { }

  username = "";
  password = "";
  ngOnInit(): void {

  }

  login() {
    let payload = {
      username: this.username,
      password: this.password,
    };
    this.spinner.show();
    this.loginService.login(payload).subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.spinner.hide();
          this.router.navigateByUrl('/views');
        } else {
          this.toastr.error("Invalid Login Credentials")
          this.spinner.hide();
        }
      },
      (error: any) => {
        this.toastr.error(error.code)
        this.spinner.hide();
      }
    )
  }
}
