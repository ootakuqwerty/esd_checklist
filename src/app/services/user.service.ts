import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import axios from 'axios-observable';
import {UserAccountService} from './user-account.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.url;
  auth: any;


  constructor(private userAccountService: UserAccountService) {
    let userInfo = userAccountService.getUserAccount()
    if (userInfo != null) var token = userInfo.Token;
    this.auth = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  }

  public userList() {
    return axios.get(this.url + 'api/Users', this.auth)
      .pipe(map(response => {
        return response.data;
      }));
  }

  public addUser(payload: any) {
    return axios.post(this.url + 'api/Users', payload, this.auth)
      .pipe(map(response => {
        return response.data;
      }));
  }

  public updateUser(id: any, payload: any) {
    return axios.put(this.url + 'api/Users/' + id, payload, this.auth)
      .pipe(map(response => {
        return response.data;
      }));
  }
}
