import { GoogleNews } from '../interfaces/google-news';
import { GoogleNewsService } from '../services/google-news.service';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { NewYorkTimesSearch } from '../interfaces/new-york-times-search';
import { GuardianSearch } from '../interfaces/guardian-search';

export class SearchNews {
  googleNews: any;
  newYorkTimesSearch: NewYorkTimesSearch;
  gaurdianSearch: GuardianSearch;
  googleTotal = 0;
  searchMappingGoogle = [
    {form: "keyWords", local: "q"},
    {form: "title", local: "qInTitle"},
    {form: "from", local: "from"},
    {form: "to", local: "to"},
    {form: "language", local: "language"},
    {form: "sortBy", local: "sortBy"}
  ];
  searchMappingNewYorkTimes = [
    {form: "keyWords", local: "q"},
    {form: "from", local: "begin_date"},
    {form: "to", local: "end_date"}
  ];
  searchGaurdianMapping = [
    {form: "keyWords", local: "q"},
    {form: "from", local: "from-date"},
    {form: "to", local: "to-date"},
    {form: "language", local: "lang"},
  ];

  constructor(
    private googleNewsService: GoogleNewsService
  ) {
    this.googleNews = {
      q: null,
      qInTitle: null,
      sources: null,
      domains: null,
      excludeDomains: null,
      from: null,
      to: null,
      language: null,
      pageSize: null,
      page: null,
      sortBy: null
    };

    this.newYorkTimesSearch = {
      begin_date: "", //matches ^\d{8}$; Begin date (e.g. 20120101)
      end_date: "",
      facet: "", // True or false; shows facet count
      facet_fields: "",
      facet_filter: "",
      f1: "",
      fq: "",
      page: null,// page number; integer between 0 <= value <= 100
      q: "",
      sort: "" // Can either be: newest; oldest; relevance
    };
    this.newYorkTimesSearch.sort = 'relevance'; // Always sort by relevance

    this.gaurdianSearch = {
      format: 'json', // json or xml
      q: '', // query user writes
      section: '',
      tag: '',
      lang: '', // Languages: en fr
      'star-rating': null,
      'order-by': 'newest', // newest (default), oldest, relevance
      'to-date': '',
      'from-date': ''
    }
  }

  public getHeadlines() {
    this.googleNewsService.getAllHeadlines().pipe(take(1)).subscribe(
      (news) => {
        console.log(news);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public mapGoogleSearch(formData: any) {
    formData = this.clean(formData); // Removing nulls and empty quotes
    return this.fixDate(this.filterObjects(formData, this.searchMappingGoogle), 1);

  }

  public mapNewYorkTimes(formData: any) {
    formData = this.clean(formData); // Removing nulls and empty quotes
    return this.fixDate(this.filterObjects(formData, this.searchMappingNewYorkTimes), 2);
  }

  public mapGaurdian(formData: any) {
    formData = this.clean(formData);
    return this.fixDate(this.filterObjects(formData, this.searchGaurdianMapping), 1);
  }

  public clean(obj: any) {
    for (let propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
        delete obj[propName];
      }
    }

    return obj;
  }

  public fixDate(object: any, choice: number) {
    let keys = Object.keys(object);

    for(let i = 0; i < keys.length; i++) {
      if (object[keys[i]] instanceof Date) {
        switch (choice) {
          // Google
          case 1:
            object[keys[i]] = this.googleDate(object[keys[i]]);
            continue;
          // New York times
          case 2:
            object[keys[i]] = this.newYorkTimesDate(object[keys[i]]);
            continue;
          // Guardian
          case 3:
            continue;
          default:
            continue;
        }
      }
    }

    return object;
  }

  public filterObjects(object, filter) {
    let keys = Object.keys(object);
    let filterKeys = Object.keys(filter);
    let filtered = {};

    keys.forEach(element => {
      filter.forEach(searchItem => {
        if (searchItem.form === element) {
          filtered[searchItem.local] = object[element];
        }
      });
    });

    return filtered;
  }

  public googleDate(date: Date) {
    const month = date.getUTCMonth() + 1; //months from 1-12
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return `${this.addZero(year)}-${this.addZero(month)}-${this.addZero(day)}`;
  }

  public newYorkTimesDate(date: Date) {
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return `${this.addZero(year)}${this.addZero(month)}${this.addZero(day)}`;
  }

  public addZero(num: number) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return `${num}`;
    }
  }
}
