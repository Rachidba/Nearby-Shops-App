import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;
@Injectable()
export class RegistrationService {

  constructor(private http: HttpClient, private router: Router) { }

  public register(login): Observable<any> {
    const url = API_URL + '/api/sign-up';
    return this.http.post(url, login, {observe: 'response'})
      .map(res => res);
  }

  registered(response) {
    this.router.navigate(['/login']);
  }

}
