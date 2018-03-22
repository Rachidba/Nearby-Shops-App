import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;
@Injectable()
export class RegistrationService {

  constructor(private http: HttpClient, private router: Router) { }

  register(login) {
    const url = API_URL + '/api/sign-up';
    this.http.post(url, login, {observe: 'response'})
            .subscribe(
              res => this.registered(res),
              err => console.log('Error')
            );
  }

  registered(response) {
    this.router.navigate(['/login']);
  }

}
