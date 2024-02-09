import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountService } from 'src/app/services/user-account.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  selectedScreen = "";
  userInfo: any
  constructor(private router: Router,
    private userAccountService: UserAccountService) {

  }

  ngOnInit(): void {
    this.userInfo = this.userAccountService.getUserAccount();
    this.selectedScreen = localStorage.getItem("selectedScreen") != null ? String(localStorage.getItem("selectedScreen")) : '';
  }

  logOut() {
    localStorage.clear();
    window.location.replace('/');
  }

  setSelection() {
    localStorage.setItem("selectedScreen", this.selectedScreen)
  }
}
