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
}
