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

  getEsdDivisions() {
    let dynamicData = localStorage.getItem("DynamicData")
    if (dynamicData != null) return (JSON.parse(dynamicData).esdDivisionsData)
  }

  gethemeRegistration() {
    let dynamicData = localStorage.getItem("DynamicData")
    if (dynamicData != null) return (JSON.parse(dynamicData).themeRegistrationContollersData)
  }

  getAllEsdPersonnelData() {
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

  getSGAAutoNumber(){
    return axios.get(this.url + 'api/AutoId', this.auth)
    .pipe(map(response => {
      return response.data;
    }));
  }

  getEsdDivisionByID(id: any): any{
    let division: any
    let dynamicData = localStorage.getItem("DynamicData")
    if (dynamicData != null) division = JSON.parse(dynamicData).esdDivisionsData
    return division.find((div: any) => div.ID == id);
  }


  getSgaDivisions() {
    let dynamicData = localStorage.getItem("DynamicData")
    if (dynamicData != null) return (JSON.parse(dynamicData).divisionData)
  }

  getSgaBuilding () {
    let dynamicData = localStorage.getItem("DynamicData")
    if (dynamicData != null) return (JSON.parse(dynamicData).sgaBuildingsData)
  }

  getSgaFloor () {
    let dynamicData = localStorage.getItem("DynamicData")
    if (dynamicData != null) return (JSON.parse(dynamicData).sgaFloorsData)
  }

  getSgaDepartment () {
    let dynamicData = localStorage.getItem("DynamicData")
    if (dynamicData != null) return (JSON.parse(dynamicData).sgaDepartmentsData)
  }

  getSgaSection () {
    let dynamicData = localStorage.getItem("DynamicData")
    if (dynamicData != null) return (JSON.parse(dynamicData).sgaSectionsData)
  }

  getSgaPersonnelData(){
    let dynamicData = localStorage.getItem("DynamicData")
    if (dynamicData != null) return (JSON.parse(dynamicData).sgaPersonnelsData)
  }

  getSgaUomData(){
    let dynamicData = localStorage.getItem("DynamicData")
    if (dynamicData != null) return (JSON.parse(dynamicData).sgaUomData)
  }

  getSgaSectionChief(){
    let dynamicData = localStorage.getItem("DynamicData")
    if (dynamicData != null) return (JSON.parse(dynamicData).sgaShiftOfLeadersData)
  }
}
