import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Shop } from '../models/shop';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  shops: Shop[];
  pageEvent: PageEvent;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  number: 0;
  size: 20;

  constructor(private apiService: ApiService) { 

  }

  ngOnInit() {
    this.loadShops(0);
  }

  loadShops(index: number) {
    this.apiService.getAllShops(index).subscribe(
      result => {
        this.shops = result.shops;
        this.totalElements = result.totalElements;
        this.totalPages = result.totalPages;
        this.last = result.last;
        this.size = result.size;
        this.number = result.number;
        console.log(result.shops);
      },
      error => {
        console.log(error);
      }
    );
  }

  onPaginateChange(event){
    //alert(JSON.stringify("Current page index: " + event.pageIndex));
    this.loadShops(event.pageIndex)
  }

}