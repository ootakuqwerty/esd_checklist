import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor() { }

  getUserAccount() {
    let userInfo = localStorage.getItem("UserInfo")
    if (userInfo != null) {
      var userAccount = JSON.parse(userInfo)
      return userAccount
    };
    return null;
  }
}
