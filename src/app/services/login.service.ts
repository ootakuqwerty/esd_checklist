import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import axios from 'axios-observable';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = environment.url;
  constructor() {

  }

  public login(payload: any) {
    return axios.post(this.url + 'api/Login', payload)
      .pipe(map(response => {
        return response.data;
      }));
  }

  async loadAllDynamicData(userInfo: any) {
    userInfo = JSON.parse(userInfo);
    var token = userInfo.Token;
    let auth = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
    return Promise.all([
      fetch(this.url + 'api/DynamicData/Divisions', auth),
      fetch(this.url + 'api/DynamicData/ThemeRegistrationContollers', auth),
      fetch(this.url + 'api/DynamicData/GetAllEsdPersonel', auth),
    ])
      .then(async ([divisions, themeRegistrationContollers, esdPersonel]) => {
        const divisionData = await divisions.json()
        const themeRegistrationContollersData = await themeRegistrationContollers.json()
        const esdPersonelData = await esdPersonel.json()
        return ({
          divisionData: divisionData.Data,
          themeRegistrationContollersData: themeRegistrationContollersData.Data,
          esdPersonelData: esdPersonelData.Data
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  async loadAllDynamicTemplate(userInfo: any) {
    userInfo = JSON.parse(userInfo);
    var token = userInfo.Token;
    let auth = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
    return Promise.all([
      fetch(this.url + 'api/DynamicTemplate/GetDynamicTemplate/sga_verification_patrol_sheet', auth),
    ])
      .then(async ([sgaVerification]) => {
        const sgaVerificationData = await sgaVerification.json()
        return ({
          sgaVerificationData: sgaVerificationData.Data
        })
      })
      .catch(error => {
        console.log(error);
      });
  }
}
