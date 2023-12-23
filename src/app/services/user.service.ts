import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import axios from 'axios-observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.url;
  constructor() { }

  public userList() {
    return axios.get(this.url + 'api/Users')
      .pipe(map(response => {
        return response.data;
      }));
  }

  public addUser(payload: any) {
    return axios.post(this.url + 'api/Users', payload)
      .pipe(map(response => {
        return response.data;
      }));
  }

  public updateUser(id: any, payload: any) {
    return axios.put(this.url + 'api/Users/' + id, payload)
      .pipe(map(response => {
        return response.data;
      }));
  }
}
