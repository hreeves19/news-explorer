import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { GoogleNewsService } from 'src/app/services/google-news.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchNews } from 'src/app/classes/search-news';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  countries: any;
  languages: any;
  searchNews: SearchNews;

  newsSources = [
    {name: "All", value: -1},
    {name: "Google News", value: 1},
    {name: "New York Times", value: 2},
    {name: "The Guardian", value: 3},
  ];

  sorts = [
    {name: 'Relevancy', value: 'relevancy'},
    {name: 'Popularity', value: 'popularity'},
    {name: 'Newest', value: 'publishedAt'}
  ];

  constructor(
    private countryService: CountryService,
    private googleNewsService: GoogleNewsService
  ) {
    this.searchNews = new SearchNews(this.googleNewsService);
  }

  searchForm = new FormGroup( {
    keyWords: new FormControl(''),
    source: new FormControl(this.newsSources[0].value),
    title: new FormControl(''),
    from: new FormControl(new Date()),
    to: new FormControl(new Date()),
    language: new FormControl(),
    country: new FormControl(),
    sortBy: new FormControl(this.sorts[2].value)
  });


  ngOnInit() {
    this.countryService.getAllCountries().subscribe(
      (result) => {
        this.countries = result;

        let us = this.countries.find(item => {
          return item.Code === 'US';
        });

        // this.searchForm.listOfCountries.setValue(new Array(us.Code));
        this.searchForm.controls['country'].setValue(us.Code);
      },
      (error) => {
        console.log(error);
      }
    );

    // Getting languages
    this.countryService.getAllLanguages().pipe(take(1)).subscribe(
      (result) => {
        this.languages = this.countryService.filterLanguages(result);

        // Getting english code
        let english = this.languages.find(item => {
          return item.value === 'eng';
        });

        // Setting the form control
        this.searchForm.controls['language'].setValue(english.value);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    console.log(this.searchForm.value);
    this.searchNews.mapGoogleSearch(this.searchForm.value);
  }
}
