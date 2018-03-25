import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl;

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(login): Observable<any> {
    const url = API_URL + '/api/login';
    return this.http.post(url, login, {observe: 'response'})
      .map(
        res => this.setSession(res),
        err => err
      );
  }

  private setSession(authResult) {
    if (authResult.status == 200) {
      const id_token = authResult.headers.get("Authorization");
      const expires_at = authResult.headers.get("expiresAt");
      const expiresAt = moment().add(expires_at, 'second');
      localStorage.setItem('id_token', id_token);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
      this.router.navigate(['/shops']);
    }
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.router.navigate(['/login']);
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
