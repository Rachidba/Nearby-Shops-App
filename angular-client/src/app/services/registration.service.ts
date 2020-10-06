import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const API_URL = environment.apiUrl;
@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient, private router: Router) { }
  public register(login): Observable<any> {
    const url = API_URL + '/api/sign-up';
    return this.http.post(url, login, {observe: 'response'})
      .pipe(
        map(res => res),
        catchError(err => err)
      );
  }
  registered(response) {
    this.router.navigate(['/login']);
  }
}
