import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { GoogleNewsService } from 'src/app/services/google-news.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  countries: any;

  constructor(
    private countryService: CountryService,
    private googleNewsService: GoogleNewsService
  ) { }

  ngOnInit() {
    this.countryService.getAllCountries().subscribe(
      (result) => {
        console.log(result);
        this.countries = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }




}
