import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders, HttpResponseBase } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of'; //proper way to import the 'of' operator
import 'rxjs/add/operator/share';

const API_URL = environment.apiUrl;

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(login) {
    const url = API_URL + '/api/login';
    console.log(login);
    this.http.post(url, login, {observe: 'response'})
            .subscribe((res: HttpResponse<any>) => this.setSession(res),
                      err => console.log('Error'));
  }

  private setSession(authResult) {
    if (authResult.status) {
      const id_token = authResult.headers.get("Authorization");
      const expires_at = authResult.headers.get("expiresAt");
      const expiresAt = moment().add(expires_at, 'second');
      localStorage.setItem('id_token', authResult.headers.get(id_token));
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
