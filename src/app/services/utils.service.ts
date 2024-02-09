import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import axios from 'axios-observable';
import { UserAccountService } from './user-account.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
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

  getDivisions() {
    let dynamicData = localStorage.getItem("DynamicData")
    if (dynamicData != null) return (JSON.parse(dynamicData).divisionData)
  }

  getEsdDivisions() {
    let dynamicData = localStorage.getItem("DynamicData")
    if (dynamicData != null) return (JSON.parse(dynamicData).esdDivisionsData)
  }

  gethemeRegistration() {
    let dynamicData = localStorage.getItem("DynamicData")
    if (dynamicData != null) return (JSON.parse(dynamicData).themeRegistrationContollersData)
  }

  getAllEsdPersonelData() {
    let dynamicData = localStorage.getItem("DynamicData")
    if (dynamicData != null) return (JSON.parse(dynamicData).esdPersonelData)
  }

  getEsdTemplate() {
    let dynamicTemplate = localStorage.getItem("DynamicTemplate");
    if (dynamicTemplate != null) return (JSON.parse(dynamicTemplate).esdCheckSheetData)
  }

  getAutoNumber(id: any){
    return axios.get(this.url + 'api/AutoId/' + id, this.auth)
      .pipe(map(response => {
        return response.data;
      }));
  }
}
