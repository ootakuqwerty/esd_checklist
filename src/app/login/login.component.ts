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

  async login() {
    this.spinner.show();
    let payload = {
      Username: this.username,
      Password: this.password,
      Token: ""
    };
    this.loginService.login(payload).subscribe(
      async (data: any) => {
        if (data.Success) {
          localStorage.setItem("UserInfo", JSON.stringify(data.Data));

          let dynamicData = await this.loginService.loadAllDynamicData(JSON.stringify(data.Data));
          localStorage.setItem("DynamicData", JSON.stringify(dynamicData));

          let dynamicTempate = await this.loginService.loadAllDynamicTemplate(JSON.stringify(data.Data));
          localStorage.setItem("DynamicTemplate", JSON.stringify(dynamicTempate));

          this.spinner.hide();
          this.router.navigateByUrl('/views');
        } else {
          this.toastr.error(data.Message)
          this.spinner.hide();
        }
      }, (error: any) => {
        this.toastr.error(error.message)
        console.log(error);
      }
    )
  }

  disabledLogin() {
    if (this.username == "" || this.password == "") return true
    return false
  }
}
