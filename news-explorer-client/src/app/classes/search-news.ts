import { GoogleNews } from '../interfaces/google-news';
import { GoogleNewsService } from '../services/google-news.service';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';

export class SearchNews {
  googleNews: GoogleNews;
  searchMapping = [
    {form: "keyWords", local: "q"},
    {form: "title", local: "qInTitle"},
    {form: "from", local: "from"},
    {form: "to", local: "to"},
    {form: "language", local: "language"},
    {form: "sortBy", local: "sortBy"}
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

  public searchHeadlines(search: any) {
    this.googleNewsService.searchHeadlines(search).pipe(take(1)).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public mapGoogleSearch(formData: any) {
    formData = this.clean(formData); // Removing nulls and empty quotes
  }

  public clean(obj: any) {
    for (let propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
        delete obj[propName];
      }
    }

    return obj;
  }

  public filterObjects(object, filter) {
    let keys = Object.keys(object);

    keys.forEach(element => {

    });
  }
}
