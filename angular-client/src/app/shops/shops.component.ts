import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  shops: any;
  constructor(private http: HttpClient) { 

  }

  ngOnInit() {
    const url = 'http://localhost:8091/api/shops?page=0&size=20';
    this.http.get(url, 
        {headers: new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjIiLCJleHAiOjE1MjE3Mzc4NTV9.4g31kmJuVHE-tIaSgUM2KNzxQo0I2l5Tj7lB4Vb_mChswAzgUsIHsvFvtR46ifogODO9nPLIx2drnrFm_ka8cw')})
        .subscribe(res => {
          this.shops = Object.keys(res).map(function(k) { return res[k] });
    },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
      }
    );
  }

}
