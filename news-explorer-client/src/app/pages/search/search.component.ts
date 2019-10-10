import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { GoogleNewsService } from 'src/app/services/google-news.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchNews } from 'src/app/classes/search-news';
import { take } from 'rxjs/operators';
import { NewYorkTimesService } from 'src/app/services/new-york-times.service';
import { GuardianService } from 'src/app/services/guardian.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  countries: any;
  languages: any;
  searchNews: SearchNews;
  maxDate: Date = new Date();
  minDate: Date = new Date();
  isLoaded = false;
  searchResults = 0;

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
    private googleNewsService: GoogleNewsService,
    private newYorkTimesService: NewYorkTimesService,
    private guardianService: GuardianService
  ) {
    this.minDate.setMonth(this.minDate.getMonth() - 1);
    this.searchNews = new SearchNews(this.googleNewsService);
  }

  searchForm = new FormGroup( {
    keyWords: new FormControl(''),
    source: new FormControl(this.newsSources[0].value),
    title: new FormControl(''),
    from: new FormControl(this.minDate),
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
          return item.value === 'en';
        });

        // Setting the form control
        this.searchForm.controls['language'].setValue(english.value);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  isValidDate() {
    return true;
  }

  async onSubmit() {
    this.searchResults = 0;
    this.searchGoogleHeadlines(this.searchNews.mapGoogleSearch(this.searchForm.value)); // Search Google
  }

  searchGoogleHeadlines(search: any) {
    console.log(search);
    this.googleNewsService.searchHeadlines(search).pipe(take(1)).subscribe(
      (result) => {
        console.log(result);
        this.searchNews.googleNews = result["articles"];
        this.searchResults += result['totalResults'];
        // Search New York
        this.searchNewYorkTimes(this.searchNews.mapNewYorkTimes(this.searchForm.value));
      },
      (error) => {
        console.error(error);
      }
    );
  }

  searchNewYorkTimes(search: any) {
    console.log(search);
    this.newYorkTimesService.searchArticles(search).pipe(take(1)).subscribe(
      (result) => {
        console.log(result);
        this.searchGuardian(this.searchForm.value);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  searchGuardian(search: any) {
    this.guardianService.search(search).pipe(take(1)).subscribe(
      (result) => {
        console.log(result);
        this.isLoaded = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  resetContentHeight() {
    let main = document.getElementById('mainContent');
  }
}
