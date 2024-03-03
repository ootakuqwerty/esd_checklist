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
      fetch(this.url + 'api/DynamicData/GetAllEsdDivision', auth),
      fetch(this.url + 'api/DynamicData/GetAllSgaBuilding', auth),
      fetch(this.url + 'api/DynamicData/GetAllSgaFloor', auth),
      fetch(this.url + 'api/DynamicData/GetAllSgaDepartment', auth),
      fetch(this.url + 'api/DynamicData/GetAllSgaSection', auth),
      fetch(this.url + 'api/DynamicData/GetAllSgaPersonnel', auth),
      fetch(this.url + 'api/DynamicData/GetAllSgaUom', auth),
      fetch(this.url + 'api/DynamicData/GetAllSgaShiftOfLeaders', auth),
    ])
      .then(async ([
        divisions, 
        themeRegistrationContollers, 
        esdPersonels, 
        esdDivisions, 
        sgaBuildings,
        sgaFloors,
        sgaDepartments,
        sgaSections,
        sgaPersonnels,
        sgaUom,
        sgaShiftOfLeaders,
      ]) => {

        const divisionData = await divisions.json()
        const themeRegistrationContollersData = await themeRegistrationContollers.json()
        const esdPersonelData = await esdPersonels.json()
        const esdDivisionsData = await esdDivisions.json()
        const sgaBuildingsData = await sgaBuildings.json()
        const sgaFloorsData = await sgaFloors.json()
        const sgaDepartmentsData = await sgaDepartments.json()
        const sgaSectionsData = await sgaSections.json()
        const sgaPersonnelsData = await sgaPersonnels.json()
        const sgaUomData = await sgaUom.json()
        const sgaShiftOfLeadersData = await sgaShiftOfLeaders.json()

        return ({
          divisionData: divisionData.Data,
          themeRegistrationContollersData: themeRegistrationContollersData.Data,
          esdPersonelData: esdPersonelData.Data,
          esdDivisionsData: esdDivisionsData.Data,
          sgaBuildingsData: sgaBuildingsData.Data,
          sgaFloorsData: sgaFloorsData.Data,
          sgaDepartmentsData: sgaDepartmentsData.Data,
          sgaSectionsData: sgaSectionsData.Data,
          sgaPersonnelsData: sgaPersonnelsData.Data,
          sgaUomData: sgaUomData.Data,
          sgaShiftOfLeadersData: sgaShiftOfLeadersData.Data,
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
      fetch(this.url + 'api/DynamicTemplate/GetDynamicTemplate/esd_audit_check_sheet', auth),
    ])
      .then(async ([sgaVerification, esdCheckSheet]) => {
        const sgaVerificationData = await sgaVerification.json();
        const esdCheckSheetData = await esdCheckSheet.json();
        return ({
          sgaVerificationData: sgaVerificationData.Data,
          esdCheckSheetData: esdCheckSheetData.Data
        })
      })
      .catch(error => {
        console.log(error);
      });
  }
}
