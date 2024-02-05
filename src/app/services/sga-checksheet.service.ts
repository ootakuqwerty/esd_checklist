import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import axios from 'axios-observable';
import { UserAccountService } from './user-account.service';

@Injectable({
  providedIn: 'root'
})
export class SgaChecksheetService {
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

  public getCheckSheets() {
    return axios.get(this.url + 'api/SgaThemeRegistration/', this.auth)
      .pipe(map(response => {
        return response.data;
      }));
  }
  
  public addCheckSheet(payload: any) {
    return axios.post(this.url + 'api/SgaThemeRegistration', payload, this.auth)
      .pipe(map(response => {
        return response.data;
      }));
  }

  // public updateCheckSheet(id: any, payload: any) {
  //   return axios.put(this.url + 'api/EsdCheckSheet/' + id, payload, this.auth)
  //     .pipe(map(response => {
  //       return response.data;
  //     }));
  // }
}
