import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders, HttpResponseBase } from '@angular/common/http';
//import { Response} from '@angular/http';

import { Shop } from '../models/shop';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  // API: GET /api/shops
  public getAllShops(index: number) : Observable<Shop[]>{
    const url = API_URL + '/api/shops?lat=-73.965355&long=40.782865&d=20000&page=' + index + '&size=20';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.get(url, httpOptions)
      .map(res => { return { shops: res.content.map(this.toShop), totalElements: res.totalElements, totalPages: res.totalPages, last: res.last, size: res.size, number: res.number } })
      .catch(this.handleError);
  }

  // API: GET /api/shops/liked
  public getPreferredShops(index: number) : Observable<Shop[]>{
    const url = API_URL + '/api/shops/liked?lat=-73.965355&long=40.782865&d=20000&page=' + index + '&size=20';
    return this.http.get(url, {headers: new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAiLCJleHAiOjE1MjIxOTYzNzl9.6UMZnwMSCyzBW95Oi7_88wT-3s4CzMsSM6UW168qaRcMHRSn48cOF-ZZIynmC-M-q4jFISPG4ENdBgDHxCJpOg')})
      .map(res => { return { shops: res.content.map(this.toShop), totalElements: res.totalElements, totalPages: res.totalPages, last: res.last, size: res.size, number: res.number } })
      .catch(this.handleError);
  }

  public likeShop(shop: Shop) {
    const url = API_URL + '/api/like-shop'
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
    };

    return this.http.post<Shop>(url, shop, httpOptions)
      .map( res=> res)
      .catch(this.handleError);    
  }

  public removeShop(shop: Shop) {
    const url = API_URL + '/api/remove-shop'
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
    };

    return this.http.post<Shop>(url, shop, httpOptions)
      .map( res=> res)
      .catch(this.handleError);
  }

  /**
   * Convert Shop info from the API to our standard/format
   */
  private toShop(shop): Shop {
    return {
      id: shop.id,
      picture: shop.picture,
      name: shop.name,
      email: shop.email,
      city: shop.city,
      location: { type: shop.location.type, lat: shop.location[0], lng: shop.location[1]}
    };
  }

  /**
  * Handle any errors from the API
  */
  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      const body   = err.json() || '';
      const error  = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }
}