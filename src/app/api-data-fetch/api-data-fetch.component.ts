import { Component, OnInit, inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-api-data-fetch',
  templateUrl: './api-data-fetch.component.html',
  styleUrls: ['./api-data-fetch.component.css']
})
export class APIDataFetchComponent implements OnInit {
  //List to store all fund from API
  fundList: any[] = [];

  httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.fetchAPI();
  }

  //Fetches the data from the API and inserts it into fundList
  fetchAPI() {
    this.httpClient.get('https://ivarpivar.netlify.app/api').subscribe((fundList: any) => {
      console.log(fundList);
      this.fundList = fundList;
    });
  }
}
