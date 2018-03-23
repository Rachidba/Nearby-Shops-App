import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Shop } from '../models/shop';
import { PageEvent } from '@angular/material';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-preferred-shops',
  templateUrl: './preferred-shops.component.html',
  styleUrls: ['./preferred-shops.component.css']
})
export class PreferredShopsComponent implements OnInit {

  preferredShops: Shop[];
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
    this.loadPreferredShops(0);
  }

  loadPreferredShops(index: number) {
    this.apiService.getPreferredShops(index).subscribe(
      result => {
        this.preferredShops = result.shops;
        this.totalElements = result.totalElements;
        this.totalPages = result.totalPages;
        this.last = result.last;
        this.size = result.size;
        this.number = result.number;
      },
      error => {
      }
    );
  }

  onRemove(shop: Shop) {
    this.apiService.removeShop(shop)
      .subscribe(
        res => {
          var index = this.preferredShops.indexOf(shop, 0);
          if (index > -1) {
            this.preferredShops.splice(index, 1);
          }
        },
        error => {
      });
  }

  onPaginateChange(event) {
    this.loadPreferredShops(event.pageIndex)
  }

}
