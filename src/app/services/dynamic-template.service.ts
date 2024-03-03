import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import axios from 'axios-observable';
import { UserAccountService } from './user-account.service';

@Injectable({
  providedIn: 'root'
})
export class DynamicTemplateService {
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

  getDynamicTemplate(id: any) {
    return axios.get(this.url + 'api/DynamicTemplate/GetDynamicTemplate/' + id, this.auth)
      .pipe(map(response => {
        return response.data;
      }));
  }

  testAPI(){
    return axios.get(this.url + 'api/DynamicData/TestAPI', this.auth)
      .pipe(map(response => {
        return response.data;
      }));
  }
}

