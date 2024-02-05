import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funds } from '../interface/funds';
import { fundsAttributes } from './fundsAttributes';
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
  //Variable that hold the fund the user clicked on for to show more information about
  selectedFund: Funds | null = null

  httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.fetchAPI();
    this.search();
  }

  //Fetches the data from the API and inserts it into fundList
  //Only inserts the attributes stated in the fundsAttribute file to filter away unnecessary information
  fetchAPI() {
    this.httpClient.get('https://ivarpivar.netlify.app/api').subscribe(
      (res: any) => {
        this.fundList = (res[0].data as any[]).map((item: any) => {
          let fund: Partial<Funds> = {};
  
          //Loop through each attribute in the item
          for (let key in item) {
            //If the attribute is in the list of valid properties, add it to the fund
            if (fundsAttributes.includes(key)) {
              //If the attribute contains the word Date it will be converted to a date format
              //en-GB format = day/month/year
              if (key.includes('Date')) {
                const date = new Date(item[key]);
                fund[key as keyof Funds] = new Date(date).toLocaleDateString('en-GB');
              } else {
                fund[key as keyof Funds] = item[key];
              }
            }            
          }
          return fund as Funds;
        });
        //Sets selectedFund to the first item in fundList to display it at refresh
        if (this.fundList.length > 0) {
          this.selectedFund = this.fundList[0];
        }
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

  //Function to store the fund user clicked on
  selectFund(fund: Funds) {
    this.selectedFund = fund;
  }
}