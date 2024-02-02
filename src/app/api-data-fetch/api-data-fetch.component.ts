import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funds } from '../interface/funds';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-api-data-fetch',
  templateUrl: './api-data-fetch.component.html',
  styleUrls: ['./api-data-fetch.component.css']
})
export class APIDataFetchComponent implements OnInit {
  //List to store all fund from API
  fundList: Funds[] = [];
  //Variable to store the current search input
  searchQuery = '';
  //Variable to store new data from the search
  searchResults: Funds[] = [];

  httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.fetchAPI();
    this.search();
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
        this.search();
      },
      (error: any) => {
        console.error('API Error: ', error);
      }
    );
  }

  //Function to handle the search input and update the searchResult array
  search(): void {
    let query = this.searchQuery;
    if (query) {
      this.searchResults = this.fundList.filter(fund => 
        fund.fundName.toLowerCase().includes(query.toLowerCase()) ||
        fund.currency.toLowerCase().includes(query.toLowerCase()) ||
        fund.fundType.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.searchResults = this.fundList;
    }
  }
  
  //Function to reset the search with the reset button
  resetSearch(event: Event): void {
    event.preventDefault();
    this.searchQuery = '';
    this.search();
  }
  
}