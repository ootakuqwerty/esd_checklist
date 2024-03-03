import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import axios from 'axios-observable';
import { UserAccountService } from './user-account.service';

@Injectable({
  providedIn: 'root'
})
export class EsdChecksheetService {
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

  public getCheckSheetByDate(payload: any) {
    return axios.post(this.url + 'api/EsdAuditCheckSheet/GetAllEsdCheckSheetWithDateFilter', payload, this.auth)
      .pipe(map(response => {
        return response.data;
      }));
  }

  public getCheckSheetByTransactionNumber(transactionNumber: any){
    return axios.get(this.url + 'api/EsdAuditCheckSheet/' + transactionNumber, this.auth)
      .pipe(map(response => {
        return response.data;
      }));
  }

  public getCheckSheet(id: any) {
    return axios.get(this.url + 'api/EsdCheckSheet/' + id, this.auth)
      .pipe(map(response => {
        return response.data;
      }));
  }
  
  public addCheckSheet(payload: any) {
    return axios.post(this.url + 'api/EsdAuditCheckSheet', payload, this.auth)
      .pipe(map(response => {
        return response.data;
      }));
  }

  public updateCheckSheet(payload: any) {
    return axios.post(this.url + 'api/EsdAuditCheckSheet/Update', payload, this.auth)
      .pipe(map(response => {
        return response.data;
      }));
  }

  public updateEndTime(payload: any) {
    return axios.post(this.url + 'api/EsdAuditCheckSheet/UpdateEndTime', payload, this.auth)
      .pipe(map(response => {
        return response.data;
      }));
  }
}
