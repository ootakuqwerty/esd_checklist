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
      Username: this.username,
      Password: this.password,
      Token: ""
    };
    this.spinner.show();
    this.loginService.login(payload).subscribe(
      (data: any) => {
        if (data.Success) {
          this.spinner.hide();
          localStorage.setItem("UserInfo", JSON.stringify(data))
          this.router.navigateByUrl('/views');
        } else {
          this.toastr.error(data.Message)
          this.spinner.hide();
        }
      }
    )
  }

  disabledLogin(){
    if(this.username == "" || this.password == "") return true
    return false
  }
}
