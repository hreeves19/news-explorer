import { Component, OnInit, Output } from '@angular/core';
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
  isSearching = false;
  searchResults = 0;
  googleNews: any;
  guardian: any;
  newYorkTimes: any;

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
    keyWords: new FormControl('', [Validators.required]),
    source: new FormControl(this.newsSources[0].value),
    title: new FormControl(''),
    from: new FormControl(this.minDate),
    to: new FormControl(new Date()),
    language: new FormControl()
  });


  ngOnInit() {
    // this.countryService.getAllCountries().subscribe(
    //   (result) => {
    //     this.countries = result;

    //     let us = this.countries.find(item => {
    //       return item.Code === 'US';
    //     });

    //     // this.searchForm.listOfCountries.setValue(new Array(us.Code));
    //     this.searchForm.controls['country'].setValue(us.Code);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );

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

  onSubmit() {
    console.log(this.f.keyWords);
    if (!this.searchForm.valid) {
      return;
    }

    this.isSearching = true;
    this.searchResults = 0;
    this.isLoaded = false;

    this.searchGoogleHeadlines(this.searchNews.mapGoogleSearch(this.searchForm.value)); // Search Google
  }

  searchGoogleHeadlines(search: any) {
    this.googleNewsService.searchHeadlines(search).pipe(take(1)).subscribe(
      (result) => {
        this.googleNews = result;
        // Search New York
        this.searchNewYorkTimes(this.searchNews.mapNewYorkTimes(this.searchForm.value));
      },
      (error) => {
        console.error(error);
      }
    );
  }

  searchNewYorkTimes(search: any) {
    this.newYorkTimesService.searchArticles(search).pipe(take(1)).subscribe(
      (result) => {
        this.newYorkTimes = result;
        this.searchGuardian(this.searchNews.mapGaurdian(this.searchForm.value));
      },
      (error) => {
        console.error(error);
      }
    );
  }

  searchGuardian(search: any) {
    this.guardianService.search(search).pipe(take(1)).subscribe(
      (result) => {
        this.guardian = result;
        this.isLoaded = true;
        this.isSearching = false;
        console.log("here");
      },
      (error) => {
        console.error(error);
      }
    );
  }

  resetContentHeight() {
    let main = document.getElementById('mainContent');
  }

  get f() { return this.searchForm.controls; }
}
