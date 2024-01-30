import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funds } from '../interface/funds';

@Component({
  selector: 'app-api-data-fetch',
  templateUrl: './api-data-fetch.component.html',
  styleUrls: ['./api-data-fetch.component.css']
})
export class APIDataFetchComponent implements OnInit {
  //List to store all fund from API
  fundList: Funds[] = [];

  httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.fetchAPI();
  }

  //Fetches the data from the API and inserts it into fundList
  fetchAPI() {
    this.httpClient.get('https://ivarpivar.netlify.app/api').subscribe(
      (res: any) => {
        this.fundList = res[0].data.map((item: any) => {
          return {
            fundName: item.fundName,
            change1m: item.change1m,
            change1y: item.change1y,
            change3m: item.change3m,
            change3y: item.change3y,
            currency: item.currency,
            fundType: item.fundType
          } as Funds;
        });
        console.log(this.fundList);
      },
      (error: any) => {
        console.error('API Error: ', error);
      }
    );
  }
  
}