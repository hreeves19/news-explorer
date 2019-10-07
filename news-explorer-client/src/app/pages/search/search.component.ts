import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { GoogleNewsService } from 'src/app/services/google-news.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  countries: any;
  newsSources = [
    {name: "All", value: -1},
    {name: "Google News", value: 1},
    {name: "New York Times", value: 2},
    {name: "The Guardian", value: 3},
  ];

  constructor(
    private countryService: CountryService,
    private googleNewsService: GoogleNewsService
  ) { }

  searchForm = new FormGroup( {
    keyWords: new FormControl(''),
    source: new FormControl(this.newsSources[0].value),
    title: new FormControl(''),
    from: new FormControl(new Date()),
    to: new FormControl(new Date()),
    language: new FormControl(),
    listOfCountries: new FormControl(new Array()),
    sortBy: new FormControl()
  });


  ngOnInit() {
    this.countryService.getAllCountries().subscribe(
      (result) => {
        console.log(result);
        this.countries = result;

        let us = this.countries.find(item => {
          return item.Code === 'US';
        });

        // this.searchForm.listOfCountries.setValue(new Array(us.Code));
        this.searchForm.controls['listOfCountries'].setValue(new Array(us.Code));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {

  }
}
